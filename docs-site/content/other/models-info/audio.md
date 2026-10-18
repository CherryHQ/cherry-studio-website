# 语音

数据来自 Cherry Studio 内置模型目录（[provider-registry](https://github.com/CherryHQ/cherry-studio/tree/main/packages/provider-registry)），随应用仓库自动同步；表中 `-` 表示数据源未提供该字段，信息仅供参考。

> **数据更新时间**: 2026-10-18 10:11:36 UTC / 2026-10-18 18:11:36 CST (北京时间)

<div data-models-table="num:3,4;sort:2;cap:5:函数调用,推理,识图,语音识别,语音生成,识视频,结构化输出,文件输入;in:6:文本输入=文本,图片输入=图片,音频输入=音频,视频输入=视频;out:7:文本输出=文本,音频输出=音频">

| 模型名称 | API ID | 服务商 | 上下文长度 | 最大输出 | 能力 | 输入模态 | 输出模态 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Qwen-Omni Turbo | qwen-omni-turbo | alibaba | 32,768 | 2,048 | 函数调用、识图、语音识别、语音生成、识视频 | 文本、图片、音频、视频 | 文本、音频 |
| Qwen-Omni Turbo Realtime | qwen-omni-turbo-realtime | alibaba | 32,768 | 2,048 | 函数调用、识图、语音识别、语音生成 | 文本、图片、音频 | 文本、音频 |
| Qwen2.5-Omni 7B | qwen2-5-omni-7b | alibaba | 32,768 | 2,048 | 函数调用、识图、语音识别、语音生成、识视频 | 文本、图片、音频、视频 | 文本、音频 |
| Qwen3-ASR Flash | qwen3-asr-flash | alibaba | 53,248 | 4,096 | 语音识别 | 音频 | 文本 |
| Qwen3-LiveTranslate Flash Realtime | qwen3-livetranslate-flash-realtime | alibaba | 53,248 | 4,096 | 识图、语音识别、语音生成、识视频 | 文本、图片、音频、视频 | 文本、音频 |
| Qwen3-Omni Flash | qwen3-omni-flash | alibaba | 65,536 | 16,384 | 函数调用、推理、识图、语音识别、语音生成、识视频 | 文本、图片、音频、视频 | 文本、音频 |
| Qwen3-Omni Flash Realtime | qwen3-omni-flash-realtime | alibaba | 65,536 | 16,384 | 函数调用、识图、语音识别、语音生成、识视频 | 文本、图片、音频、视频 | 文本、音频 |
| Qwen3.5 122B-A10B | qwen3-5-122b-a10b | alibaba | 262,144 | 65,536 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Qwen3.5 27B | qwen3-5-27b | alibaba | 262,144 | 65,536 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Qwen3.5 35B-A3B | qwen3-5-35b-a3b | alibaba | 262,144 | 65,536 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Qwen3.5 397B-A17B | qwen3-5-397b-a17b | alibaba | 262,144 | 65,536 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Qwen3.6 27B | qwen3-6-27b | alibaba | 262,144 | 256,000 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Qwen3.6 35B-A3B | qwen3-6-35b-a3b | alibaba | 262,144 | 65,536 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Inkling | inkling | bailing | 1,048,576 | 256,000 | 函数调用、推理、识图、语音识别、结构化输出、文件输入 | 文本、图片、音频 | 文本 |
| Inkling Small | inkling-small | bailing | 1,048,576 | 1,000,000 | 函数调用、推理、识图、语音识别、文件输入 | 文本、图片、音频 | 文本 |
| ElevenLabs Music | elevenlabs-music | elevenlabs | - | - | 语音生成 | 文本 | 音频 |
| ElevenLabs v2.5 Turbo | elevenlabs-v2-5-turbo | elevenlabs | - | - | 语音生成 | 文本 | 音频 |
| ElevenLabs v3 | elevenlabs-v3 | elevenlabs | - | - | 语音生成 | 文本 | 音频 |
| Gemini 2.5 Flash | gemini-2-5-flash | google | 1,048,576 | 65,536 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini 2.5 Flash Preview TTS | gemini-2-5-flash-preview-tts | google | 8,192 | - | 语音生成 | 文本 | 音频 |
| Gemini 2.5 Flash TTS | gemini-2-5-flash-tts | google | 32,768 | 16,384 | 语音生成 | 文本 | 音频 |
| Gemini 2.5 Flash-Lite | gemini-2-5-flash-lite | google | 1,048,576 | 65,536 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini 2.5 Pro | gemini-2-5-pro | google | 1,048,576 | 65,536 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini 2.5 Pro Preview TTS | gemini-2-5-pro-preview-tts | google | 8,192 | - | 语音生成 | 文本 | 音频 |
| Gemini 2.5 Pro TTS | gemini-2-5-pro-tts | google | 32,768 | 16,384 | 语音生成 | 文本 | 音频 |
| Gemini 3 Flash Preview | gemini-3-flash-preview | google | 1,048,576 | 65,536 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini 3.1 Flash Lite | gemini-3-1-flash-lite | google | 1,048,576 | 65,536 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini 3.1 Flash Lite Preview | gemini-3-1-flash-lite-preview | google | 1,048,576 | 65,536 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini 3.1 Flash Live Preview | gemini-3-1-flash-live-preview | google | 131,072 | 65,536 | 函数调用、推理、识图、语音识别、语音生成、识视频、文件输入 | 文本、图片、音频、视频 | 文本、音频 |
| Gemini 3.1 Flash TTS Preview | gemini-3-1-flash-tts-preview | google | 8,192 | - | 推理、语音生成 | 文本 | 音频 |
| Gemini 3.1 Pro Preview | gemini-3-1-pro-preview | google | 1,048,576 | 65,536 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini 3.1 Pro Preview Custom Tools | gemini-3-1-pro-preview-customtools | google | 1,048,576 | 65,536 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini 3.5 Flash | gemini-3-5-flash | google | 1,048,576 | 65,536 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini 3.5 Flash Lite | gemini-3-5-flash-lite | google | 1,048,576 | 65,536 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini 3.5 Live Translate Preview | gemini-3-5-live-translate-preview | google | 16,384 | - | 语音识别、语音生成 | 音频 | 文本、音频 |
| Gemini 3.5 Transcribe | gemini-3-5-transcribe | google | - | - | 语音识别 | 音频 | 文本 |
| Gemini 3.5 Transcribe Live | gemini-3-5-transcribe-live | google | - | - | 语音识别 | 音频 | 文本 |
| Gemini 3.6 Flash | gemini-3-6-flash | google | 1,048,576 | 65,536 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini 3.7 Flash | gemini-3-7-flash | google | 1,048,576 | 65,536 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini 3.8 Flash | gemini-3-8-flash | google | 1,048,576 | 65,536 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini 4 Argon | gemini-4-argon | google | 1,048,576 | 1,048,576 | 推理、函数调用、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini Flash Latest | gemini-flash-latest | google | 1,048,576 | 65,536 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini Flash-Lite Latest | gemini-flash-lite-latest | google | 1,048,576 | 65,536 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Google Gemini Pro Latest | gemini-pro-latest | google | 1,048,576 | - | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Google: Gemini 2.5 Pro Preview 05-06 | gemini-2-5-pro-preview-05-06 | google | 1,048,576 | - | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Google: Gemini 2.5 Pro Preview 06-05 | gemini-2-5-pro-preview | google | 1,048,576 | - | 函数调用、推理、识图、语音识别、结构化输出、文件输入 | 文本、图片、音频 | 文本 |
| Lyria 3 Clip Preview | lyria-3-clip-preview | google | 1,048,576 | 65,536 | 识图、语音生成、结构化输出、文件输入 | 文本、图片 | 文本、音频 |
| Lyria 3 Pro Preview | lyria-3-pro-preview | google | 1,048,576 | 65,536 | 识图、语音生成、结构化输出、文件输入 | 文本、图片 | 文本、音频 |
| Muse Spark 1.3 | muse-spark-1-3 | meta | 1,048,576 | 1,048,576 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Muse Spark Open 816B A42B | muse-spark-open-816b-a42b | meta | 1,048,576 | - | 函数调用、推理、识图、语音识别、识视频、文件输入 | 文本、图片、音频、视频 | 文本 |
| Muse Spark Open 816B A42B NVFP4 | muse-spark-open-816b-a42b-nvfp4 | meta | 1,048,576 | - | 函数调用、推理、识图、语音识别、识视频、文件输入 | 文本、图片、音频、视频 | 文本 |
| Voxtral Mini (latest) | voxtral-mini-latest | mistral | - | - | 语音识别 | 音频 | 文本 |
| Voxtral Mini 3B 2507 | voxtral-mini-3b | mistral | 128,000 | 4,096 | 函数调用、语音识别、结构化输出 | 文本、音频 | 文本 |
| Voxtral Mini TTS (latest) | voxtral-mini-tts-latest | mistral | - | - | 语音生成 | 文本 | 音频 |
| Voxtral Small (latest) | voxtral-small-latest | mistral | 32,000 | 32,000 | 函数调用、语音识别、文件输入 | 文本、音频 | 文本 |
| Voxtral Small 24B 2507 | voxtral-small-24b | mistral | 32,768 | 8,192 | 函数调用、语音识别、结构化输出、文件输入 | 文本、音频 | 文本 |
| magpie-tts-zeroshot | magpie-tts-zeroshot | nvidia | - | 4,096 | 语音识别、语音生成、文件输入 | 文本、音频 | 音频 |
| Nemotron 3 Nano Omni | nemotron-3-nano-omni-30b-a3b | nvidia | 256,000 | 65,536 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| nemotron-voicechat | nemotron-voicechat | nvidia | 128,000 | 8,192 | 函数调用、语音识别、文件输入 | 文本、音频 | 文本 |
| Whisper Large v3 | whisper-large-v3 | nvidia | - | 4,096 | 语音识别 | 音频 | 文本 |
| GPT-4o mini Transcribe | gpt-4o-mini-transcribe | openai | - | - | 语音识别 | 音频 | 文本 |
| GPT-4o Transcribe | gpt-4o-transcribe | openai | - | - | 语音识别 | 音频 | 文本 |
| GPT-Realtime mini | gpt-realtime-mini | openai | - | - | 语音识别、语音生成 | 文本、音频 | 文本、音频 |
| GPT-Realtime-1.5 | gpt-realtime-1-5 | openai | - | - | 语音识别、语音生成 | 文本、音频 | 文本、音频 |
| gpt-realtime-2 | gpt-realtime-2 | openai | - | - | 语音识别、语音生成 | 文本、音频 | 文本、音频 |
| gpt-realtime-2.1 | gpt-realtime-2-1 | openai | 128,000 | 32,000 | 函数调用、推理、识图、语音识别、语音生成、文件输入 | 文本、图片、音频 | 文本、音频 |
| gpt-realtime-whisper | gpt-realtime-whisper | openai | - | - | 语音识别 | 音频 | 文本 |
| OpenAI: GPT Audio | gpt-audio | openai | 128,000 | - | 函数调用、语音识别、语音生成、结构化输出 | 文本、音频 | 文本、音频 |
| OpenAI: GPT Audio Mini | gpt-audio-mini | openai | 128,000 | - | 函数调用、语音识别、语音生成、结构化输出 | 文本、音频 | 文本、音频 |
| Step TTS 2 | step-tts-2 | stepfun | - | - | 语音生成 | 文本 | 音频 |
| StepAudio 2.5 ASR | stepaudio-2-5-asr | stepfun | - | - | 语音识别 | 音频 | 文本 |
| StepAudio 2.5 TTS | stepaudio-2-5-tts | stepfun | - | - | 语音生成 | 文本 | 音频 |
| Suno v3 | suno-v3 | suno | - | - | 语音生成 | 文本 | 音频 |
| Suno v3.5 | suno-v3-5 | suno | - | - | 语音生成 | 文本 | 音频 |
| Suno v4 | suno-v4 | suno | - | - | 语音生成 | 文本 | 音频 |
| Suno v4.5 | suno-v4-5 | suno | - | - | 语音生成 | 文本 | 音频 |
| Muse Spark 1.1 | muse-spark-1-1 | vercel | 1,048,576 | 1,048,576 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Muse Spark 1.2 | muse-spark-1-2 | vercel | 1,048,576 | 1,048,576 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Muse Spark 1.2 Contributor | muse-spark-1-2-contributor | vercel | 1,048,576 | 1,048,576 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Muse Spark 1.3 Contributor | muse-spark-1-3-contributor | vercel | 1,048,576 | 1,048,576 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| S1 (Free) | s1 | vercel | - | - | 语音生成 | 文本 | 音频 |
| S2 Pro | s2-pro | vercel | - | - | 语音生成 | 文本 | 音频 |
| S2.1 Pro (Free) | s2-1-pro | vercel | - | - | 语音生成 | 文本 | 音频 |
| Transcribe-1 | transcribe-1 | vercel | - | - | 语音识别 | 音频 | 文本 |
| TTS-1 | tts-1 | vercel | - | - | 语音生成 | 文本 | 音频 |
| TTS-1 HD | tts-1-hd | vercel | - | - | 语音生成 | 文本 | 音频 |
| Whisper | whisper-1 | vercel | - | - | 语音识别 | 音频 | 文本 |
| Grok STT | grok-stt | xai | - | - | 语音识别 | 音频 | 文本 |
| Grok TTS | grok-tts | xai | - | - | 语音生成 | 文本 | 音频 |
| Grok Voice Think Fast 1.0 | grok-voice-think-fast-1-0 | xai | - | - | 语音识别、语音生成 | 文本、音频 | 文本、音频 |
| Grok Voice Think Fast 2.0 | grok-voice-think-fast-2-0 | xai | - | - | 语音识别、语音生成 | 文本、音频 | 文本、音频 |
| MiMo-V2-Omni | mimo-v2-omni | xiaomi | 262,144 | 131,072 | 函数调用、推理、识图、语音识别、识视频、文件输入 | 文本、图片、音频、视频 | 文本 |
| MiMo-V2.5 | mimo-v2-5 | xiaomi | 1,050,000 | 131,072 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| MiMo-V2.6-Flash | mimo-v2-6-flash | xiaomi | 1,048,576 | 131,072 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| MiMo-V2.6-Pro | mimo-v2-6-pro | xiaomi | 1,048,576 | 131,072 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| MiMo-V2.6-Pro-UltraSpeed | mimo-v2-6-pro-ultraspeed | xiaomi | 1,048,576 | 131,072 | 函数调用、推理、识图、语音识别、识视频、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |

</div>
