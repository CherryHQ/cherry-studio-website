import assert from 'node:assert/strict'
import { test } from 'node:test'
import { getDesktopReleaseUrl } from '../src/utils/desktopReleaseUrl.ts'

const assetName = 'Cherry-Studio-2.2.2-win-x64-setup.exe'
const version = 'v2.2.2'
const path = `/CherryHQ/cherry-studio/releases/download/${version}/${assetName}`
const globalUrl = `https://github.com${path}`

test('accepts the expected release and filename on the regional mirrors', () => {
  assert.equal(getDesktopReleaseUrl(globalUrl, version, assetName, 'global'), globalUrl)

  const legacyName = 'Cherry-Studio-1.9.13-x64-setup.exe'
  const cnUrl = `https://gitcode.com/CherryHQ/cherry-studio/releases/download/v1.9.13/${legacyName}`
  assert.equal(getDesktopReleaseUrl(cnUrl, 'v1.9.13', legacyName, 'cn'), cnUrl)
})

test('rejects URLs outside the expected origin and attachment path', () => {
  const rejected = [
    `http://github.com${path}`,
    `https://gitcode.com${path}`,
    `https://example.invalid${path}`,
    `https://github.com:8443${path}`,
    globalUrl.replace('/CherryHQ/', '/another-owner/'),
    globalUrl.replace('/v2.2.2/', '/v2.2.1/'),
    globalUrl.replace(assetName, 'other.exe'),
    `${globalUrl}?extra=1`,
    `${globalUrl}#fragment`,
    path,
    ''
  ]
  for (const url of rejected) {
    assert.equal(getDesktopReleaseUrl(url, version, assetName, 'global'), null, url)
  }
})
