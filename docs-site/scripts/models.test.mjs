import assert from 'node:assert/strict'
import test from 'node:test'

import { abbreviate } from '../../.github/scripts/fetch_models.mjs'

test('abbreviate keeps small values and picks the cleaner K convention', () => {
  const cases = {
    512: '512',
    1536: '1.5K',
    4096: '4K',
    8192: '8K',
    16384: '16K',
    32000: '32K',
    32768: '32K',
    65536: '64K',
    128000: '128K',
    131072: '128K',
    200000: '200K',
    256000: '256K',
    262144: '256K',
    400000: '400K'
  }
  for (const [value, expected] of Object.entries(cases)) {
    assert.equal(abbreviate(Number(value)), expected, `${value} should read ${expected}`)
  }
})

test('abbreviate uses decimal M above one million and stays monotonic there', () => {
  const values = [1000000, 1000192, 1024000, 1040000, 1047576, 1048576, 1050000, 1310720, 2000000, 3500000, 10000000]
  const key = (text) => Number.parseFloat(text) * (text.endsWith('M') ? 1000000 : text.endsWith('K') ? 1000 : 1)
  for (let index = 1; index < values.length; index += 1) {
    assert.ok(
      key(abbreviate(values[index - 1])) <= key(abbreviate(values[index])),
      `${values[index - 1]} (${abbreviate(values[index - 1])}) should not sort above ${values[index]} (${abbreviate(values[index])})`
    )
  }
  assert.equal(abbreviate(1048576), '1.05M')
  assert.equal(abbreviate(1000000), '1M')
})
