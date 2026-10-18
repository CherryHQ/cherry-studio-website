# 语音

数据来自 Cherry Studio 内置模型目录（[provider-registry](https://github.com/CherryHQ/cherry-studio/tree/main/packages/provider-registry)），随应用仓库自动同步；表中 `-` 表示数据源未提供该字段。

上下文长度与最大输出以 K / M 缩写并四舍五入（1K 约为 1,000～1,024 tokens，1M 约为 100 万 tokens），例如 131,072 与 128,000 均写作 128K。悬停可查看完整数值，精确限制请以模型服务商为准。

> **数据更新时间**: 2026-10-18 12:04:58 UTC / 2026-10-18 20:04:58 CST (北京时间)

<div data-models-table="num:2,3;sort:1;search:0,1;cap:4:函数调用,推理,识图,语音识别,语音生成,视频理解,结构化输出,文件输入;in:5:文本输入=文本,图片输入=图片,音频输入=音频,视频输入=视频;out:6:文本输出=文本,音频输出=音频">

| 模型名称 | 服务商 | 上下文长度 | 最大输出 | 能力 | 输入模态 | 输出模态 |
| --- | --- | --- | --- | --- | --- | --- |
| Qwen-Omni Turbo<br><code>qwen-omni-turbo</code> | alibaba | <span title="32,768">32K</span> | <span title="2,048">2K</span> | 函数调用、识图、语音识别、语音生成、视频理解 | 文本、图片、音频、视频 | 文本、音频 |
| Qwen-Omni Turbo Realtime<br><code>qwen-omni-turbo-realtime</code> | alibaba | <span title="32,768">32K</span> | <span title="2,048">2K</span> | 函数调用、识图、语音识别、语音生成 | 文本、图片、音频 | 文本、音频 |
| Qwen2.5-Omni 7B<br><code>qwen2-5-omni-7b</code> | alibaba | <span title="32,768">32K</span> | <span title="2,048">2K</span> | 函数调用、识图、语音识别、语音生成、视频理解 | 文本、图片、音频、视频 | 文本、音频 |
| Qwen3-ASR Flash<br><code>qwen3-asr-flash</code> | alibaba | <span title="53,248">52K</span> | <span title="4,096">4K</span> | 语音识别 | 音频 | 文本 |
| Qwen3-LiveTranslate Flash Realtime<br><code>qwen3-livetranslate-flash-realtime</code> | alibaba | <span title="53,248">52K</span> | <span title="4,096">4K</span> | 识图、语音识别、语音生成、视频理解 | 文本、图片、音频、视频 | 文本、音频 |
| Qwen3-Omni Flash<br><code>qwen3-omni-flash</code> | alibaba | <span title="65,536">64K</span> | <span title="16,384">16K</span> | 函数调用、推理、识图、语音识别、语音生成、视频理解 | 文本、图片、音频、视频 | 文本、音频 |
| Qwen3-Omni Flash Realtime<br><code>qwen3-omni-flash-realtime</code> | alibaba | <span title="65,536">64K</span> | <span title="16,384">16K</span> | 函数调用、识图、语音识别、语音生成、视频理解 | 文本、图片、音频、视频 | 文本、音频 |
| Qwen3.5 122B-A10B<br><code>qwen3-5-122b-a10b</code> | alibaba | <span title="262,144">256K</span> | <span title="65,536">64K</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Qwen3.5 27B<br><code>qwen3-5-27b</code> | alibaba | <span title="262,144">256K</span> | <span title="65,536">64K</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Qwen3.5 35B-A3B<br><code>qwen3-5-35b-a3b</code> | alibaba | <span title="262,144">256K</span> | <span title="65,536">64K</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Qwen3.5 397B-A17B<br><code>qwen3-5-397b-a17b</code> | alibaba | <span title="262,144">256K</span> | <span title="65,536">64K</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Qwen3.6 27B<br><code>qwen3-6-27b</code> | alibaba | <span title="262,144">256K</span> | <span title="256,000">256K</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Qwen3.6 35B-A3B<br><code>qwen3-6-35b-a3b</code> | alibaba | <span title="262,144">256K</span> | <span title="65,536">64K</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Inkling<br><code>inkling</code> | bailing | <span title="1,048,576">1.05M</span> | <span title="256,000">256K</span> | 函数调用、推理、识图、语音识别、结构化输出、文件输入 | 文本、图片、音频 | 文本 |
| Inkling Small<br><code>inkling-small</code> | bailing | <span title="1,048,576">1.05M</span> | <span title="1,000,000">1M</span> | 函数调用、推理、识图、语音识别、文件输入 | 文本、图片、音频 | 文本 |
| ElevenLabs Music<br><code>elevenlabs-music</code> | elevenlabs | - | - | 语音生成 | 文本 | 音频 |
| ElevenLabs v2.5 Turbo<br><code>elevenlabs-v2-5-turbo</code> | elevenlabs | - | - | 语音生成 | 文本 | 音频 |
| ElevenLabs v3<br><code>elevenlabs-v3</code> | elevenlabs | - | - | 语音生成 | 文本 | 音频 |
| Gemini 2.5 Flash<br><code>gemini-2-5-flash</code> | google | <span title="1,048,576">1.05M</span> | <span title="65,536">64K</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini 2.5 Flash Preview TTS<br><code>gemini-2-5-flash-preview-tts</code> | google | <span title="8,192">8K</span> | - | 语音生成 | 文本 | 音频 |
| Gemini 2.5 Flash TTS<br><code>gemini-2-5-flash-tts</code> | google | <span title="32,768">32K</span> | <span title="16,384">16K</span> | 语音生成 | 文本 | 音频 |
| Gemini 2.5 Flash-Lite<br><code>gemini-2-5-flash-lite</code> | google | <span title="1,048,576">1.05M</span> | <span title="65,536">64K</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini 2.5 Pro<br><code>gemini-2-5-pro</code> | google | <span title="1,048,576">1.05M</span> | <span title="65,536">64K</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini 2.5 Pro Preview TTS<br><code>gemini-2-5-pro-preview-tts</code> | google | <span title="8,192">8K</span> | - | 语音生成 | 文本 | 音频 |
| Gemini 2.5 Pro TTS<br><code>gemini-2-5-pro-tts</code> | google | <span title="32,768">32K</span> | <span title="16,384">16K</span> | 语音生成 | 文本 | 音频 |
| Gemini 3 Flash Preview<br><code>gemini-3-flash-preview</code> | google | <span title="1,048,576">1.05M</span> | <span title="65,536">64K</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini 3.1 Flash Lite<br><code>gemini-3-1-flash-lite</code> | google | <span title="1,048,576">1.05M</span> | <span title="65,536">64K</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini 3.1 Flash Lite Preview<br><code>gemini-3-1-flash-lite-preview</code> | google | <span title="1,048,576">1.05M</span> | <span title="65,536">64K</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini 3.1 Flash Live Preview<br><code>gemini-3-1-flash-live-preview</code> | google | <span title="131,072">128K</span> | <span title="65,536">64K</span> | 函数调用、推理、识图、语音识别、语音生成、视频理解、文件输入 | 文本、图片、音频、视频 | 文本、音频 |
| Gemini 3.1 Flash TTS Preview<br><code>gemini-3-1-flash-tts-preview</code> | google | <span title="8,192">8K</span> | - | 推理、语音生成 | 文本 | 音频 |
| Gemini 3.1 Pro Preview<br><code>gemini-3-1-pro-preview</code> | google | <span title="1,048,576">1.05M</span> | <span title="65,536">64K</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini 3.1 Pro Preview Custom Tools<br><code>gemini-3-1-pro-preview-customtools</code> | google | <span title="1,048,576">1.05M</span> | <span title="65,536">64K</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini 3.5 Flash<br><code>gemini-3-5-flash</code> | google | <span title="1,048,576">1.05M</span> | <span title="65,536">64K</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini 3.5 Flash Lite<br><code>gemini-3-5-flash-lite</code> | google | <span title="1,048,576">1.05M</span> | <span title="65,536">64K</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini 3.5 Live Translate Preview<br><code>gemini-3-5-live-translate-preview</code> | google | <span title="16,384">16K</span> | - | 语音识别、语音生成 | 音频 | 文本、音频 |
| Gemini 3.5 Transcribe<br><code>gemini-3-5-transcribe</code> | google | - | - | 语音识别 | 音频 | 文本 |
| Gemini 3.5 Transcribe Live<br><code>gemini-3-5-transcribe-live</code> | google | - | - | 语音识别 | 音频 | 文本 |
| Gemini 3.6 Flash<br><code>gemini-3-6-flash</code> | google | <span title="1,048,576">1.05M</span> | <span title="65,536">64K</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini 3.7 Flash<br><code>gemini-3-7-flash</code> | google | <span title="1,048,576">1.05M</span> | <span title="65,536">64K</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini 3.8 Flash<br><code>gemini-3-8-flash</code> | google | <span title="1,048,576">1.05M</span> | <span title="65,536">64K</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini 4 Argon<br><code>gemini-4-argon</code> | google | <span title="1,048,576">1.05M</span> | <span title="1,048,576">1.05M</span> | 推理、函数调用、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini Flash Latest<br><code>gemini-flash-latest</code> | google | <span title="1,048,576">1.05M</span> | <span title="65,536">64K</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Gemini Flash-Lite Latest<br><code>gemini-flash-lite-latest</code> | google | <span title="1,048,576">1.05M</span> | <span title="65,536">64K</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Google Gemini Pro Latest<br><code>gemini-pro-latest</code> | google | <span title="1,048,576">1.05M</span> | - | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Google: Gemini 2.5 Pro Preview 05-06<br><code>gemini-2-5-pro-preview-05-06</code> | google | <span title="1,048,576">1.05M</span> | - | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Google: Gemini 2.5 Pro Preview 06-05<br><code>gemini-2-5-pro-preview</code> | google | <span title="1,048,576">1.05M</span> | - | 函数调用、推理、识图、语音识别、结构化输出、文件输入 | 文本、图片、音频 | 文本 |
| Lyria 3 Clip Preview<br><code>lyria-3-clip-preview</code> | google | <span title="1,048,576">1.05M</span> | <span title="65,536">64K</span> | 识图、语音生成、结构化输出、文件输入 | 文本、图片 | 文本、音频 |
| Lyria 3 Pro Preview<br><code>lyria-3-pro-preview</code> | google | <span title="1,048,576">1.05M</span> | <span title="65,536">64K</span> | 识图、语音生成、结构化输出、文件输入 | 文本、图片 | 文本、音频 |
| Muse Spark 1.3<br><code>muse-spark-1-3</code> | meta | <span title="1,048,576">1.05M</span> | <span title="1,048,576">1.05M</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Muse Spark Open 816B A42B<br><code>muse-spark-open-816b-a42b</code> | meta | <span title="1,048,576">1.05M</span> | - | 函数调用、推理、识图、语音识别、视频理解、文件输入 | 文本、图片、音频、视频 | 文本 |
| Muse Spark Open 816B A42B NVFP4<br><code>muse-spark-open-816b-a42b-nvfp4</code> | meta | <span title="1,048,576">1.05M</span> | - | 函数调用、推理、识图、语音识别、视频理解、文件输入 | 文本、图片、音频、视频 | 文本 |
| Voxtral Mini (latest)<br><code>voxtral-mini-latest</code> | mistral | - | - | 语音识别 | 音频 | 文本 |
| Voxtral Mini 3B 2507<br><code>voxtral-mini-3b</code> | mistral | <span title="128,000">128K</span> | <span title="4,096">4K</span> | 函数调用、语音识别、结构化输出 | 文本、音频 | 文本 |
| Voxtral Mini TTS (latest)<br><code>voxtral-mini-tts-latest</code> | mistral | - | - | 语音生成 | 文本 | 音频 |
| Voxtral Small (latest)<br><code>voxtral-small-latest</code> | mistral | <span title="32,000">32K</span> | <span title="32,000">32K</span> | 函数调用、语音识别、文件输入 | 文本、音频 | 文本 |
| Voxtral Small 24B 2507<br><code>voxtral-small-24b</code> | mistral | <span title="32,768">32K</span> | <span title="8,192">8K</span> | 函数调用、语音识别、结构化输出、文件输入 | 文本、音频 | 文本 |
| magpie-tts-zeroshot<br><code>magpie-tts-zeroshot</code> | nvidia | - | <span title="4,096">4K</span> | 语音识别、语音生成、文件输入 | 文本、音频 | 音频 |
| Nemotron 3 Nano Omni<br><code>nemotron-3-nano-omni-30b-a3b</code> | nvidia | <span title="256,000">256K</span> | <span title="65,536">64K</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| nemotron-voicechat<br><code>nemotron-voicechat</code> | nvidia | <span title="128,000">128K</span> | <span title="8,192">8K</span> | 函数调用、语音识别、文件输入 | 文本、音频 | 文本 |
| Whisper Large v3<br><code>whisper-large-v3</code> | nvidia | - | <span title="4,096">4K</span> | 语音识别 | 音频 | 文本 |
| GPT-4o mini Transcribe<br><code>gpt-4o-mini-transcribe</code> | openai | - | - | 语音识别 | 音频 | 文本 |
| GPT-4o Transcribe<br><code>gpt-4o-transcribe</code> | openai | - | - | 语音识别 | 音频 | 文本 |
| GPT-Realtime mini<br><code>gpt-realtime-mini</code> | openai | - | - | 语音识别、语音生成 | 文本、音频 | 文本、音频 |
| GPT-Realtime-1.5<br><code>gpt-realtime-1-5</code> | openai | - | - | 语音识别、语音生成 | 文本、音频 | 文本、音频 |
| gpt-realtime-2<br><code>gpt-realtime-2</code> | openai | - | - | 语音识别、语音生成 | 文本、音频 | 文本、音频 |
| gpt-realtime-2.1<br><code>gpt-realtime-2-1</code> | openai | <span title="128,000">128K</span> | <span title="32,000">32K</span> | 函数调用、推理、识图、语音识别、语音生成、文件输入 | 文本、图片、音频 | 文本、音频 |
| gpt-realtime-whisper<br><code>gpt-realtime-whisper</code> | openai | - | - | 语音识别 | 音频 | 文本 |
| OpenAI: GPT Audio<br><code>gpt-audio</code> | openai | <span title="128,000">128K</span> | - | 函数调用、语音识别、语音生成、结构化输出 | 文本、音频 | 文本、音频 |
| OpenAI: GPT Audio Mini<br><code>gpt-audio-mini</code> | openai | <span title="128,000">128K</span> | - | 函数调用、语音识别、语音生成、结构化输出 | 文本、音频 | 文本、音频 |
| Step TTS 2<br><code>step-tts-2</code> | stepfun | - | - | 语音生成 | 文本 | 音频 |
| StepAudio 2.5 ASR<br><code>stepaudio-2-5-asr</code> | stepfun | - | - | 语音识别 | 音频 | 文本 |
| StepAudio 2.5 TTS<br><code>stepaudio-2-5-tts</code> | stepfun | - | - | 语音生成 | 文本 | 音频 |
| Suno v3<br><code>suno-v3</code> | suno | - | - | 语音生成 | 文本 | 音频 |
| Suno v3.5<br><code>suno-v3-5</code> | suno | - | - | 语音生成 | 文本 | 音频 |
| Suno v4<br><code>suno-v4</code> | suno | - | - | 语音生成 | 文本 | 音频 |
| Suno v4.5<br><code>suno-v4-5</code> | suno | - | - | 语音生成 | 文本 | 音频 |
| Muse Spark 1.1<br><code>muse-spark-1-1</code> | vercel | <span title="1,048,576">1.05M</span> | <span title="1,048,576">1.05M</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Muse Spark 1.2<br><code>muse-spark-1-2</code> | vercel | <span title="1,048,576">1.05M</span> | <span title="1,048,576">1.05M</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Muse Spark 1.2 Contributor<br><code>muse-spark-1-2-contributor</code> | vercel | <span title="1,048,576">1.05M</span> | <span title="1,048,576">1.05M</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| Muse Spark 1.3 Contributor<br><code>muse-spark-1-3-contributor</code> | vercel | <span title="1,048,576">1.05M</span> | <span title="1,048,576">1.05M</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| S1 (Free)<br><code>s1</code> | vercel | - | - | 语音生成 | 文本 | 音频 |
| S2 Pro<br><code>s2-pro</code> | vercel | - | - | 语音生成 | 文本 | 音频 |
| S2.1 Pro (Free)<br><code>s2-1-pro</code> | vercel | - | - | 语音生成 | 文本 | 音频 |
| Transcribe-1<br><code>transcribe-1</code> | vercel | - | - | 语音识别 | 音频 | 文本 |
| TTS-1<br><code>tts-1</code> | vercel | - | - | 语音生成 | 文本 | 音频 |
| TTS-1 HD<br><code>tts-1-hd</code> | vercel | - | - | 语音生成 | 文本 | 音频 |
| Whisper<br><code>whisper-1</code> | vercel | - | - | 语音识别 | 音频 | 文本 |
| Grok STT<br><code>grok-stt</code> | xai | - | - | 语音识别 | 音频 | 文本 |
| Grok TTS<br><code>grok-tts</code> | xai | - | - | 语音生成 | 文本 | 音频 |
| Grok Voice Think Fast 1.0<br><code>grok-voice-think-fast-1-0</code> | xai | - | - | 语音识别、语音生成 | 文本、音频 | 文本、音频 |
| Grok Voice Think Fast 2.0<br><code>grok-voice-think-fast-2-0</code> | xai | - | - | 语音识别、语音生成 | 文本、音频 | 文本、音频 |
| MiMo-V2-Omni<br><code>mimo-v2-omni</code> | xiaomi | <span title="262,144">256K</span> | <span title="131,072">128K</span> | 函数调用、推理、识图、语音识别、视频理解、文件输入 | 文本、图片、音频、视频 | 文本 |
| MiMo-V2.5<br><code>mimo-v2-5</code> | xiaomi | <span title="1,050,000">1.05M</span> | <span title="131,072">128K</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| MiMo-V2.6-Flash<br><code>mimo-v2-6-flash</code> | xiaomi | <span title="1,048,576">1.05M</span> | <span title="131,072">128K</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| MiMo-V2.6-Pro<br><code>mimo-v2-6-pro</code> | xiaomi | <span title="1,048,576">1.05M</span> | <span title="131,072">128K</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |
| MiMo-V2.6-Pro-UltraSpeed<br><code>mimo-v2-6-pro-ultraspeed</code> | xiaomi | <span title="1,048,576">1.05M</span> | <span title="131,072">128K</span> | 函数调用、推理、识图、语音识别、视频理解、结构化输出、文件输入 | 文本、图片、音频、视频 | 文本 |

</div>
