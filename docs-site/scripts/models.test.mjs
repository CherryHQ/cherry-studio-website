import assert from 'node:assert/strict'
import test from 'node:test'

import { abbreviate, categoryOf } from '../../.github/scripts/fetch_models.mjs'

// Model shapes are synthetic; they lock the classification rules, not the live catalog.
const model = ({ input = [], output = [], capabilities = [] }) => ({
  inputModalities: input,
  outputModalities: output,
  capabilities
})

test('categoryOf puts generation before conversation', () => {
  const cases = [
    // Image generation wins even for conversational models (Nano Banana shape).
    [
      model({ input: ['text'], output: ['text', 'image'], capabilities: ['image-generation', 'reasoning'] }),
      'image-generation.md'
    ],
    [model({ output: ['image'] }), 'image-generation.md'],
    // Generation capabilities also cover rows without modality data (wan2.6-image shape).
    [model({ input: ['text'], output: [], capabilities: ['image-generation'] }), 'image-generation.md'],
    [model({ output: ['video'] }), 'video-generation.md'],
    // Audio generation wins over chat (Qwen-Omni shape), and TTS stays audio.
    [model({ input: ['text'], output: ['text', 'audio'], capabilities: ['audio-generation'] }), 'audio.md'],
    [model({ output: ['audio'] }), 'audio.md'],
    // Speech recognition without text input stays audio instead of falling into chat.
    [model({ input: ['audio'], output: ['text'], capabilities: ['audio-recognition'] }), 'audio.md'],
    // Plain text output splits the chat pages by input modality.
    [model({ input: ['text'], output: ['text'] }), 'chat-text.md'],
    [model({ input: ['text', 'image'], output: ['text'] }), 'chat-multimodal.md'],
    // Missing modality data and non-audio, non-chat models keep their fallbacks.
    [model({}), 'chat-text.md'],
    [model({ input: ['video'], output: ['text'], capabilities: ['video-recognition'] }), 'chat-multimodal.md'],
    // Embedding and rerank never fall through to the chat tables.
    [model({ input: ['text'], output: [], capabilities: ['rerank'] }), 'embedding-rerank.md'],
    [model({ output: ['vector'] }), 'embedding-rerank.md']
  ]
  for (const [input, expected] of cases) {
    assert.equal(categoryOf(input), expected, `${JSON.stringify(input)} should map to ${expected}`)
  }
})

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
