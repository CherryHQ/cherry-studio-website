import assert from 'node:assert/strict'
import test from 'node:test'

import { slugFor, urlFor } from './content.mjs'
import { validateRedirects } from './redirects.mjs'

test('README aliases cannot replace the same named article with a self redirect', () => {
  const source = `/docs/zh-cn/${slugFor('pre-basic/providers/oneapi/README.md')}`
  const destination = urlFor('zh-cn', slugFor('pre-basic/providers/oneapi.md'))
  assert.deepEqual(validateRedirects({ [source]: destination }, [destination]), {})
})

test('self redirects compare decoded paths and ignore trailing slashes', () => {
  assert.deepEqual(
    validateRedirects(
      {
        '/docs/en/guide/': '/docs/en/guide',
        '/docs/zh-cn/安装': '/docs/zh-cn/%E5%AE%89%E8%A3%85/',
        '/docs/zh-cn/%e5%ae%89%e8%a3%85/': '/docs/zh-cn/安装/'
      },
      []
    ),
    {}
  )
})

test('valid legacy aliases and removed English OneAPI redirects keep their URLs', () => {
  const redirects = {
    '/docs/zh-cn/pre-basic/providers/oneapi/oneapi': '/docs/zh-cn/pre-basic/providers/oneapi/',
    '/docs/en/pre-basic/providers/oneapi': '/docs/en/pre-basic/providers/newapi/',
    '/i18n/english/pre-basic/providers/oneapi': '/docs/en/pre-basic/providers/newapi/'
  }
  assert.deepEqual(validateRedirects(redirects, Object.values(redirects)), redirects)
})

test('redirects cannot overwrite an existing article even with encoded paths', () => {
  assert.throws(
    () => validateRedirects({ '/docs/zh-cn/%E5%AE%89%E8%A3%85': '/docs/zh-cn/other/' }, ['/docs/zh-cn/安装/']),
    /Redirect would overwrite an article/
  )
})
