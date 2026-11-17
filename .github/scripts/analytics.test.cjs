const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const path = require('node:path')
const { test } = require('node:test')
const { runInNewContext } = require('node:vm')
const ts = require('typescript')

// Exercise the actual app module with a fake SDK and browser. No analytics
// requests or production credentials are used by these configuration tests.
const source = readFileSync(path.join(__dirname, '../../src/utils/analytics.ts'), 'utf8')
const code = ts.transpileModule(source.replaceAll('import.meta.env', '({})'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true }
}).outputText

function harness({ search = '', stored = false, key = 'phc_test_only', fail = false, browser = true } = {}) {
  let options
  let initializations = 0
  const captured = []
  const replacements = []
  const opened = []
  const gaEvents = []
  const sdk = {
    init: (_key, config) => {
      if (fail) throw new Error('Test SDK failure')
      options = config
      initializations += 1
    },
    register: () => {},
    capture: (event, properties = {}) => {
      captured.push(options.before_send({ event, properties }))
    },
    get_distinct_id: () => options.bootstrap?.distinctID || 'anonymous-test-person',
    get_session_id: () => options.bootstrap?.sessionID || 'test-session'
  }
  const exports = {}
  runInNewContext(code, {
    exports,
    require: (name) => {
      if (name === 'posthog-js') return sdk
      if (name === './urls') {
        return {
          getEnterpriseUrl: (language) =>
            language.startsWith('en') ? 'https://enterprise.cherryai.com' : 'https://enterprise.cherryai.com.cn',
          getSiteRegion: () => 'cn'
        }
      }
      throw new Error(`Unexpected import: ${name}`)
    },
    URL,
    URLSearchParams,
    console: { warn: () => {} },
    localStorage: { getItem: () => (stored ? '{}' : null) },
    document: { cookie: '' },
    ...(browser
      ? {
          window: {
            env: { POSTHOG_KEY: key, POSTHOG_HOST: 'https://analytics.invalid' },
            location: { search, pathname: '/', hash: '#features' },
            history: { replaceState: (_state, _title, url) => replacements.push(url) },
            open: (...args) => opened.push(args),
            gtag: (...args) => gaEvents.push(args)
          }
        }
      : {})
  })
  return {
    api: exports,
    config: () => options,
    initializations: () => initializations,
    captured,
    replacements,
    opened,
    gaEvents
  }
}

test('only control clicks are auto-captured; all non-click interaction channels are disabled', () => {
  const h = harness()
  h.api.initPosthog()
  const config = h.config()
  assert.deepEqual(Array.from(config.autocapture.dom_event_allowlist), ['click'])
  assert.deepEqual(Array.from(config.autocapture.css_selector_allowlist), [
    'button',
    'a[href]',
    'summary',
    'input[type="checkbox"]',
    '[role="button"]',
    '[role="menuitem"]',
    '[role="tab"]',
    '[role="option"]',
    '[data-analytics-click]'
  ])
  for (const selector of [
    '.ph-no-autocapture',
    '[data-ph-no-autocapture]',
    '[data-analytics-manual]',
    '[disabled]',
    '[aria-disabled="true"]'
  ]) {
    assert.ok(config.autocapture.css_selector_ignorelist.includes(selector))
  }
  assert.equal(config.autocapture.capture_copied_text, false)
  assert.equal(config.enable_heatmaps, false)
  assert.equal(config.rageclick, false)
  assert.equal(config.capture_dead_clicks, false)
  assert.equal(config.disable_session_recording, true)
})

test('page lifecycle, segmentation and identity settings are retained', () => {
  const h = harness()
  h.api.initPosthog()
  assert.equal(h.config().capture_pageview, 'history_change')
  assert.equal(h.config().capture_pageleave, true)
  assert.equal(h.config().person_profiles, 'identified_only')
  assert.equal(h.config().before_send(null), null)
  h.api.capturePosthog('example', { location: 'footer' })
  assert.equal(h.captured[0].properties.location, 'footer')
  assert.equal(h.captured[0].properties.analytics_surface, 'community_website')
  assert.equal(h.captured[0].properties.customer_type, 'anonymous')
})

test('fresh cross-domain visits retain the handed-over IDs and clean only handover parameters', () => {
  const h = harness({ search: '?ph_did=visitor-A&ph_sid=session-A&utm_source=test' })
  h.api.initPosthog()
  assert.equal(h.config().bootstrap.distinctID, 'visitor-A')
  assert.equal(h.config().bootstrap.sessionID, 'session-A')
  assert.deepEqual(h.replacements, ['/?utm_source=test#features'])
  const target = new URL(h.api.trackEnterpriseNavigation('header', 'zh-CN'))
  assert.equal(target.origin, 'https://enterprise.cherryai.com.cn')
  assert.equal(target.searchParams.get('ph_did'), 'visitor-A')
  assert.equal(target.searchParams.get('ph_sid'), 'session-A')
  assert.equal(target.searchParams.get('utm_source'), 'test')
  assert.equal(target.searchParams.get('source'), 'community_website')
  assert.equal(h.captured.length, 1)
  assert.equal(h.captured[0].event, 'cta_to_enterprise')
})

test('existing identities are not overwritten and English enterprise routing is retained', () => {
  const h = harness({ search: '?ph_did=other-visitor&ph_sid=other-session', stored: true })
  h.api.initPosthog()
  assert.equal(h.config().bootstrap, undefined)
  const target = new URL(h.api.trackEnterpriseNavigation('footer', 'en-US'))
  assert.equal(target.origin, 'https://enterprise.cherryai.com')
  assert.equal(target.searchParams.get('ph_did'), 'anonymous-test-person')
  assert.equal(target.searchParams.get('ph_sid'), 'test-session')
})

test('enterprise CTA helper keeps its event and safe new-tab navigation', () => {
  const h = harness()
  h.api.initPosthog()
  h.api.goToEnterprise('team_collaboration_section')
  assert.equal(h.captured.length, 1)
  assert.equal(h.captured[0].event, 'cta_to_enterprise')
  assert.equal(h.captured[0].properties.location, 'team_collaboration_section')
  assert.equal(h.opened[0][1], '_blank')
  assert.equal(h.opened[0][2], 'noopener')
})

test('SDK initialization is idempotent; missing config and SDK failure never block the app', () => {
  const h = harness()
  h.api.initPosthog()
  h.api.initPosthog()
  assert.equal(h.initializations(), 1)
  for (const opts of [{ key: '' }, { fail: true }, { browser: false }]) {
    const unavailable = harness(opts)
    assert.doesNotThrow(() => unavailable.api.initPosthog())
    assert.doesNotThrow(() => unavailable.api.capturePosthog('click'))
    assert.equal(unavailable.captured.length, 0)
  }
})

test('existing GA4 download tracking is unchanged and does not add a PostHog click', () => {
  const h = harness()
  h.api.initPosthog()
  h.api.trackDownload({ platform: 'windows', packageName: 'installer.exe', trigger: 'button' })
  assert.equal(h.gaEvents.length, 1)
  assert.equal(h.gaEvents[0][1], 'download_click')
  assert.equal(h.gaEvents[0][2].transport_type, 'beacon')
  assert.equal(h.captured.length, 0)
})
