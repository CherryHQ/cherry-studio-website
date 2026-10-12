import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import test from 'node:test'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'esbuild'
import { JSDOM } from 'jsdom'
import { act, createElement } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'

// Compile the real shared component against each app's own React dependency.
async function loadSiteHeader(require) {
  const { outputFiles } = await build({
    entryPoints: [fileURLToPath(new URL('../../shared/SiteHeader.tsx', import.meta.url))],
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'node',
    jsx: 'automatic',
    plugins: [
      {
        name: 'app-dependencies',
        setup(builder) {
          builder.onResolve({ filter: /^[^./]/ }, ({ path, kind }) => {
            if (kind === 'entry-point') return
            return { path: pathToFileURL(require.resolve(path)).href, external: true }
          })
        }
      }
    ]
  })
  return import(`data:text/javascript;base64,${Buffer.from(outputFiles[0].text).toString('base64')}`)
}
const { SiteHeader } = await loadSiteHeader(createRequire(import.meta.url))
const websiteRequire = createRequire(new URL('../../package.json', import.meta.url))
const { SiteHeader: WebsiteSiteHeader } = await loadSiteHeader(websiteRequire)
const { act: websiteAct, createElement: websiteElement } = websiteRequire('react')
const { createRoot: createWebsiteRoot } = websiteRequire('react-dom/client')
const cacheKey = 'cherry-studio:github-stars'
const freshCount = 52_600
const props = {
  logo: '/logo.svg',
  mobileLogo: '/logo.svg',
  githubIcon: '/github.svg',
  links: [],
  downloadLabel: 'Download',
  menuLabel: 'Menu',
  closeLabel: 'Close'
}

async function withBrowser(run) {
  const dom = new JSDOM('<div id="root"></div>', { url: 'https://cherryai.com/docs/en/' })
  const originals = new Map()
  for (const [key, value] of Object.entries({
    window: dom.window,
    document: dom.window.document,
    IS_REACT_ACT_ENVIRONMENT: true
  })) {
    originals.set(key, Object.getOwnPropertyDescriptor(globalThis, key))
    Object.defineProperty(globalThis, key, { value, configurable: true, writable: true })
  }
  let root
  let rootAct = act
  try {
    await run({
      window: dom.window,
      container: dom.window.document.getElementById('root'),
      setRoot(value, actForRoot = act) {
        root = value
        rootAct = actForRoot
      }
    })
  } finally {
    if (root) await rootAct(() => root.unmount())
    dom.window.close()
    for (const [key, descriptor] of originals) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor)
      else delete globalThis[key]
    }
  }
}

function cache(storage, count = freshCount, age = 0) {
  storage.setItem(cacheKey, JSON.stringify({ count, updatedAt: Date.now() - age }))
}

function displayedCount(container) {
  return container.querySelector('.tabular-nums').textContent
}

// Generate the static HTML with no browser globals or browser storage.
const serverHTML = renderToString(createElement(SiteHeader, props))

for (const storage of ['localStorage', 'sessionStorage']) {
  test(`fresh ${storage} updates hydrated docs without fetching`, async (t) => {
    const fetchMock = t.mock.method(globalThis, 'fetch', async () => {
      throw new Error('Fresh cache must not fetch')
    })
    await withBrowser(async ({ window, container, setRoot }) => {
      cache(window[storage])
      container.innerHTML = serverHTML
      assert.equal(displayedCount(container), '52.1k')
      const errors = []
      await act(() =>
        setRoot(
          hydrateRoot(container, createElement(SiteHeader, props), {
            onRecoverableError: (error) => errors.push(error)
          })
        )
      )
      assert.equal(displayedCount(container), '52.6k')
      assert.equal(fetchMock.mock.callCount(), 0)
      assert.deepEqual(errors, [])
    })
  })
}

for (const fresh of [false, true]) {
  test(`React 18 homepage to React 19 docs with ${fresh ? 'fresh' : 'empty'} cache`, async (t) => {
    const fetchMock = t.mock.method(globalThis, 'fetch', async () => ({
      ok: true,
      json: async () => ({ stargazers_count: freshCount })
    }))
    await withBrowser(async ({ window, container, setRoot }) => {
      if (fresh) cache(window.localStorage)
      window.history.replaceState(null, '', '/')
      const home = createWebsiteRoot(container)
      setRoot(home, websiteAct)
      await websiteAct(() => home.render(websiteElement(WebsiteSiteHeader, props)))
      assert.equal(displayedCount(container), '52.6k')
      await websiteAct(() => home.unmount())
      setRoot(null)
      window.history.replaceState(null, '', '/docs/en/')
      container.innerHTML = serverHTML
      await act(() => setRoot(hydrateRoot(container, createElement(SiteHeader, props))))
      assert.equal(displayedCount(container), '52.6k')
      assert.equal(fetchMock.mock.callCount(), fresh ? 0 : 1)
    })
  })
}

for (const existing of [false, true]) {
  for (const outcome of ['success', 'http-error', 'network-error', 'invalid-response']) {
    test(`${existing ? 'expired' : 'empty'} cache with API ${outcome}`, async (t) => {
      const fetchMock = t.mock.method(globalThis, 'fetch', async () => {
        if (outcome === 'network-error') throw new Error('Offline')
        return {
          ok: outcome !== 'http-error',
          json: async () => (outcome === 'invalid-response' ? {} : { stargazers_count: 53_000 })
        }
      })
      await withBrowser(async ({ window, container, setRoot }) => {
        if (existing) cache(window.localStorage, freshCount, 24 * 60 * 60 * 1000 + 1000)
        container.innerHTML = serverHTML
        await act(() => setRoot(hydrateRoot(container, createElement(SiteHeader, props))))
        assert.equal(displayedCount(container), outcome === 'success' ? '53.0k' : existing ? '52.6k' : '52.1k')
        assert.equal(fetchMock.mock.callCount(), 1)
        if (outcome === 'success') {
          for (const storage of [window.localStorage, window.sessionStorage]) {
            assert.equal(JSON.parse(storage.getItem(cacheKey)).count, 53_000)
          }
        }
      })
    })
  }
}

test('blocked local storage can still hydrate from session storage', async (t) => {
  const fetchMock = t.mock.method(globalThis, 'fetch', async () => {
    throw new Error('Unexpected fetch')
  })
  await withBrowser(async ({ window, container, setRoot }) => {
    cache(window.sessionStorage)
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('Storage blocked')
      }
    })
    container.innerHTML = serverHTML
    await act(() => setRoot(hydrateRoot(container, createElement(SiteHeader, props))))
    assert.equal(displayedCount(container), '52.6k')
    assert.equal(fetchMock.mock.callCount(), 0)
  })
})

test('unavailable storage does not prevent an API update', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => ({ ok: true, json: async () => ({ stargazers_count: freshCount }) }))
  await withBrowser(async ({ window, container, setRoot }) => {
    for (const storage of ['localStorage', 'sessionStorage']) {
      Object.defineProperty(window, storage, {
        get() {
          throw new Error('Storage blocked')
        }
      })
    }
    container.innerHTML = serverHTML
    await act(() => setRoot(hydrateRoot(container, createElement(SiteHeader, props))))
    assert.equal(displayedCount(container), '52.6k')
  })
})

test('malformed cache is ignored and refreshed', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => ({ ok: true, json: async () => ({ stargazers_count: freshCount }) }))
  await withBrowser(async ({ window, container, setRoot }) => {
    window.localStorage.setItem(cacheKey, '{broken')
    window.sessionStorage.setItem(cacheKey, JSON.stringify({ count: 'invalid', updatedAt: Date.now() }))
    container.innerHTML = serverHTML
    await act(() => setRoot(hydrateRoot(container, createElement(SiteHeader, props))))
    assert.equal(displayedCount(container), '52.6k')
  })
})

test('expired cache is displayed even when the API returns the same count', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => ({ ok: true, json: async () => ({ stargazers_count: freshCount }) }))
  await withBrowser(async ({ window, container, setRoot }) => {
    cache(window.localStorage, freshCount, 24 * 60 * 60 * 1000 + 1000)
    container.innerHTML = serverHTML
    await act(() => setRoot(hydrateRoot(container, createElement(SiteHeader, props))))
    assert.equal(displayedCount(container), '52.6k')
  })
})
