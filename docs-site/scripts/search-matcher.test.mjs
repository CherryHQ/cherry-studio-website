import assert from 'node:assert/strict'
import test from 'node:test'

import { buildMatcher } from '../src/lib/search-matcher.ts'

// Row text arrives either as `${name}${id} ${provider}` (in-page cells) or `${name} ${id} ${provider}`.
const pageRow = 'Gemini 3.8 Flashgemini-3-8-flash google'
const indexRow = 'Gemini 3.8 Flash gemini-3-8-flash google'

test('buildMatcher treats separators as interchangeable in both directions', () => {
  for (const query of ['gemini3.8', 'gemini 3.8', 'gemini-3.8']) {
    const matcher = buildMatcher(query)
    assert.ok(matcher, `${query} should build a matcher`)
    assert.ok(matcher(pageRow), `${query} should match the in-page row`)
    assert.ok(matcher(indexRow), `${query} should match the index row`)
  }
})

test('buildMatcher keeps short queries literal', () => {
  const matcher = buildMatcher('3.7')
  assert.ok(matcher)
  assert.ok(!matcher('Llama-3.3-70B llama-3-3-70b meta'), 'compact fallback must not merge digits')
  assert.ok(matcher('Qwen3.7 Max qwen3-7-max alibaba'))
})

test('buildMatcher matches dashed ids from compact queries', () => {
  const matcher = buildMatcher('gpt4')
  assert.ok(matcher)
  assert.ok(matcher('GPT-4o gpt-4o openai'))
  assert.ok(matcher('GPT-4.1 Mini gpt-4-1-mini openai'))
})

test('buildMatcher returns null for blank queries and stays literal otherwise', () => {
  assert.equal(buildMatcher('   '), null)
  const matcher = buildMatcher('a.b')
  assert.ok(matcher)
  assert.ok(matcher('a.b model'))
  assert.ok(!matcher('axb model'), 'the dot must stay literal, not act as a wildcard')
})

test('buildMatcher spans the joined name and id in page rows', () => {
  const matcher = buildMatcher('max qwen3')
  assert.ok(matcher)
  assert.ok(matcher('Qwen3.7 Maxqwen3-7-max alibaba'))
})
