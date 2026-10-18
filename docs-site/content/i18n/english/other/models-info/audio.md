# Audio

Data comes from the model catalog bundled with Cherry Studio ([provider-registry](https://github.com/CherryHQ/cherry-studio/tree/main/packages/provider-registry)), synced automatically with the application repository. A `-` means the source data does not provide that field; in the modality columns ✓ means a modality is supported and — means it is not (only modalities that appear on this page are listed). Information is for reference only.

> **Data updated**: 2026-10-18 09:07:16 UTC / 2026-10-18 17:07:16 CST (Beijing time)

<div data-models-table="num:3,4;cap:5:Function calling,Reasoning,Image recognition,Speech recognition,Speech generation,Video recognition,Structured output,File input;in:6:Text input=Text✓,Image input=Image✓,Audio input=Audio✓,Video input=Video✓;out:7:Text output=Text✓,Audio output=Audio✓">

| Model | API ID | Provider | Context | Max output | Capabilities | Input modalities | Output modalities |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Qwen-Omni Turbo | qwen-omni-turbo | alibaba | 32,768 | 2,048 | Function calling, Image recognition, Speech recognition, Speech generation, Video recognition | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio✓ Video— |
| Qwen-Omni Turbo Realtime | qwen-omni-turbo-realtime | alibaba | 32,768 | 2,048 | Function calling, Image recognition, Speech recognition, Speech generation | Text✓ Image✓ Audio✓ Video— | Text✓ Image— Audio✓ Video— |
| Qwen2.5-Omni 7B | qwen2-5-omni-7b | alibaba | 32,768 | 2,048 | Function calling, Image recognition, Speech recognition, Speech generation, Video recognition | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio✓ Video— |
| Qwen3-ASR Flash | qwen3-asr-flash | alibaba | 53,248 | 4,096 | Speech recognition | Text— Image— Audio✓ Video— | Text✓ Image— Audio— Video— |
| Qwen3-LiveTranslate Flash Realtime | qwen3-livetranslate-flash-realtime | alibaba | 53,248 | 4,096 | Image recognition, Speech recognition, Speech generation, Video recognition | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio✓ Video— |
| Qwen3-Omni Flash | qwen3-omni-flash | alibaba | 65,536 | 16,384 | Function calling, Reasoning, Image recognition, Speech recognition, Speech generation, Video recognition | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio✓ Video— |
| Qwen3-Omni Flash Realtime | qwen3-omni-flash-realtime | alibaba | 65,536 | 16,384 | Function calling, Image recognition, Speech recognition, Speech generation, Video recognition | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio✓ Video— |
| Qwen3.5 122B-A10B | qwen3-5-122b-a10b | alibaba | 262,144 | 65,536 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Qwen3.5 27B | qwen3-5-27b | alibaba | 262,144 | 65,536 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Qwen3.5 35B-A3B | qwen3-5-35b-a3b | alibaba | 262,144 | 65,536 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Qwen3.5 397B-A17B | qwen3-5-397b-a17b | alibaba | 262,144 | 65,536 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Qwen3.6 27B | qwen3-6-27b | alibaba | 262,144 | 256,000 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Qwen3.6 35B-A3B | qwen3-6-35b-a3b | alibaba | 262,144 | 65,536 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Inkling | inkling | bailing | 1,048,576 | 256,000 | Function calling, Reasoning, Image recognition, Speech recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video— | Text✓ Image— Audio— Video— |
| Inkling Small | inkling-small | bailing | 1,048,576 | 1,000,000 | Function calling, Reasoning, Image recognition, Speech recognition, File input | Text✓ Image✓ Audio✓ Video— | Text✓ Image— Audio— Video— |
| ElevenLabs Music | elevenlabs-music | elevenlabs | - | - | Speech generation | Text✓ Image— Audio— Video— | Text— Image— Audio✓ Video— |
| ElevenLabs v2.5 Turbo | elevenlabs-v2-5-turbo | elevenlabs | - | - | Speech generation | Text✓ Image— Audio— Video— | Text— Image— Audio✓ Video— |
| ElevenLabs v3 | elevenlabs-v3 | elevenlabs | - | - | Speech generation | Text✓ Image— Audio— Video— | Text— Image— Audio✓ Video— |
| Gemini 2.5 Flash | gemini-2-5-flash | google | 1,048,576 | 65,536 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Gemini 2.5 Flash Preview TTS | gemini-2-5-flash-preview-tts | google | 8,192 | - | Speech generation | Text✓ Image— Audio— Video— | Text— Image— Audio✓ Video— |
| Gemini 2.5 Flash TTS | gemini-2-5-flash-tts | google | 32,768 | 16,384 | Speech generation | Text✓ Image— Audio— Video— | Text— Image— Audio✓ Video— |
| Gemini 2.5 Flash-Lite | gemini-2-5-flash-lite | google | 1,048,576 | 65,536 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Gemini 2.5 Pro | gemini-2-5-pro | google | 1,048,576 | 65,536 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Gemini 2.5 Pro Preview TTS | gemini-2-5-pro-preview-tts | google | 8,192 | - | Speech generation | Text✓ Image— Audio— Video— | Text— Image— Audio✓ Video— |
| Gemini 2.5 Pro TTS | gemini-2-5-pro-tts | google | 32,768 | 16,384 | Speech generation | Text✓ Image— Audio— Video— | Text— Image— Audio✓ Video— |
| Gemini 3 Flash Preview | gemini-3-flash-preview | google | 1,048,576 | 65,536 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Gemini 3.1 Flash Lite | gemini-3-1-flash-lite | google | 1,048,576 | 65,536 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Gemini 3.1 Flash Lite Preview | gemini-3-1-flash-lite-preview | google | 1,048,576 | 65,536 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Gemini 3.1 Flash Live Preview | gemini-3-1-flash-live-preview | google | 131,072 | 65,536 | Function calling, Reasoning, Image recognition, Speech recognition, Speech generation, Video recognition, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio✓ Video— |
| Gemini 3.1 Flash TTS Preview | gemini-3-1-flash-tts-preview | google | 8,192 | - | Reasoning, Speech generation | Text✓ Image— Audio— Video— | Text— Image— Audio✓ Video— |
| Gemini 3.1 Pro Preview | gemini-3-1-pro-preview | google | 1,048,576 | 65,536 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Gemini 3.1 Pro Preview Custom Tools | gemini-3-1-pro-preview-customtools | google | 1,048,576 | 65,536 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Gemini 3.5 Flash | gemini-3-5-flash | google | 1,048,576 | 65,536 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Gemini 3.5 Flash Lite | gemini-3-5-flash-lite | google | 1,048,576 | 65,536 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Gemini 3.5 Live Translate Preview | gemini-3-5-live-translate-preview | google | 16,384 | - | Speech recognition, Speech generation | Text— Image— Audio✓ Video— | Text✓ Image— Audio✓ Video— |
| Gemini 3.5 Transcribe | gemini-3-5-transcribe | google | - | - | Speech recognition | Text— Image— Audio✓ Video— | Text✓ Image— Audio— Video— |
| Gemini 3.5 Transcribe Live | gemini-3-5-transcribe-live | google | - | - | Speech recognition | Text— Image— Audio✓ Video— | Text✓ Image— Audio— Video— |
| Gemini 3.6 Flash | gemini-3-6-flash | google | 1,048,576 | 65,536 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Gemini 3.7 Flash | gemini-3-7-flash | google | 1,048,576 | 65,536 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Gemini 3.8 Flash | gemini-3-8-flash | google | 1,048,576 | 65,536 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Gemini 4 Argon | gemini-4-argon | google | 1,048,576 | 1,048,576 | Reasoning, Function calling, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Gemini Flash Latest | gemini-flash-latest | google | 1,048,576 | 65,536 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Gemini Flash-Lite Latest | gemini-flash-lite-latest | google | 1,048,576 | 65,536 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Google Gemini Pro Latest | gemini-pro-latest | google | 1,048,576 | - | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Google: Gemini 2.5 Pro Preview 05-06 | gemini-2-5-pro-preview-05-06 | google | 1,048,576 | - | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Google: Gemini 2.5 Pro Preview 06-05 | gemini-2-5-pro-preview | google | 1,048,576 | - | Function calling, Reasoning, Image recognition, Speech recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video— | Text✓ Image— Audio— Video— |
| Lyria 3 Clip Preview | lyria-3-clip-preview | google | 1,048,576 | 65,536 | Image recognition, Speech generation, Structured output, File input | Text✓ Image✓ Audio— Video— | Text✓ Image— Audio✓ Video— |
| Lyria 3 Pro Preview | lyria-3-pro-preview | google | 1,048,576 | 65,536 | Image recognition, Speech generation, Structured output, File input | Text✓ Image✓ Audio— Video— | Text✓ Image— Audio✓ Video— |
| Muse Spark 1.3 | muse-spark-1-3 | meta | 1,048,576 | 1,048,576 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Muse Spark Open 816B A42B | muse-spark-open-816b-a42b | meta | 1,048,576 | - | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Muse Spark Open 816B A42B NVFP4 | muse-spark-open-816b-a42b-nvfp4 | meta | 1,048,576 | - | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Voxtral Mini (latest) | voxtral-mini-latest | mistral | - | - | Speech recognition | Text— Image— Audio✓ Video— | Text✓ Image— Audio— Video— |
| Voxtral Mini 3B 2507 | voxtral-mini-3b | mistral | 128,000 | 4,096 | Function calling, Speech recognition, Structured output | Text✓ Image— Audio✓ Video— | Text✓ Image— Audio— Video— |
| Voxtral Mini TTS (latest) | voxtral-mini-tts-latest | mistral | - | - | Speech generation | Text✓ Image— Audio— Video— | Text— Image— Audio✓ Video— |
| Voxtral Small (latest) | voxtral-small-latest | mistral | 32,000 | 32,000 | Function calling, Speech recognition, File input | Text✓ Image— Audio✓ Video— | Text✓ Image— Audio— Video— |
| Voxtral Small 24B 2507 | voxtral-small-24b | mistral | 32,768 | 8,192 | Function calling, Speech recognition, Structured output, File input | Text✓ Image— Audio✓ Video— | Text✓ Image— Audio— Video— |
| magpie-tts-zeroshot | magpie-tts-zeroshot | nvidia | - | 4,096 | Speech recognition, Speech generation, File input | Text✓ Image— Audio✓ Video— | Text— Image— Audio✓ Video— |
| Nemotron 3 Nano Omni | nemotron-3-nano-omni-30b-a3b | nvidia | 256,000 | 65,536 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| nemotron-voicechat | nemotron-voicechat | nvidia | 128,000 | 8,192 | Function calling, Speech recognition, File input | Text✓ Image— Audio✓ Video— | Text✓ Image— Audio— Video— |
| Whisper Large v3 | whisper-large-v3 | nvidia | - | 4,096 | Speech recognition | Text— Image— Audio✓ Video— | Text✓ Image— Audio— Video— |
| GPT-4o mini Transcribe | gpt-4o-mini-transcribe | openai | - | - | Speech recognition | Text— Image— Audio✓ Video— | Text✓ Image— Audio— Video— |
| GPT-4o Transcribe | gpt-4o-transcribe | openai | - | - | Speech recognition | Text— Image— Audio✓ Video— | Text✓ Image— Audio— Video— |
| GPT-Realtime mini | gpt-realtime-mini | openai | - | - | Speech recognition, Speech generation | Text✓ Image— Audio✓ Video— | Text✓ Image— Audio✓ Video— |
| GPT-Realtime-1.5 | gpt-realtime-1-5 | openai | - | - | Speech recognition, Speech generation | Text✓ Image— Audio✓ Video— | Text✓ Image— Audio✓ Video— |
| gpt-realtime-2 | gpt-realtime-2 | openai | - | - | Speech recognition, Speech generation | Text✓ Image— Audio✓ Video— | Text✓ Image— Audio✓ Video— |
| gpt-realtime-2.1 | gpt-realtime-2-1 | openai | 128,000 | 32,000 | Function calling, Reasoning, Image recognition, Speech recognition, Speech generation, File input | Text✓ Image✓ Audio✓ Video— | Text✓ Image— Audio✓ Video— |
| gpt-realtime-whisper | gpt-realtime-whisper | openai | - | - | Speech recognition | Text— Image— Audio✓ Video— | Text✓ Image— Audio— Video— |
| OpenAI: GPT Audio | gpt-audio | openai | 128,000 | - | Function calling, Speech recognition, Speech generation, Structured output | Text✓ Image— Audio✓ Video— | Text✓ Image— Audio✓ Video— |
| OpenAI: GPT Audio Mini | gpt-audio-mini | openai | 128,000 | - | Function calling, Speech recognition, Speech generation, Structured output | Text✓ Image— Audio✓ Video— | Text✓ Image— Audio✓ Video— |
| Step TTS 2 | step-tts-2 | stepfun | - | - | Speech generation | Text✓ Image— Audio— Video— | Text— Image— Audio✓ Video— |
| StepAudio 2.5 ASR | stepaudio-2-5-asr | stepfun | - | - | Speech recognition | Text— Image— Audio✓ Video— | Text✓ Image— Audio— Video— |
| StepAudio 2.5 TTS | stepaudio-2-5-tts | stepfun | - | - | Speech generation | Text✓ Image— Audio— Video— | Text— Image— Audio✓ Video— |
| Suno v3 | suno-v3 | suno | - | - | Speech generation | Text✓ Image— Audio— Video— | Text— Image— Audio✓ Video— |
| Suno v3.5 | suno-v3-5 | suno | - | - | Speech generation | Text✓ Image— Audio— Video— | Text— Image— Audio✓ Video— |
| Suno v4 | suno-v4 | suno | - | - | Speech generation | Text✓ Image— Audio— Video— | Text— Image— Audio✓ Video— |
| Suno v4.5 | suno-v4-5 | suno | - | - | Speech generation | Text✓ Image— Audio— Video— | Text— Image— Audio✓ Video— |
| Muse Spark 1.1 | muse-spark-1-1 | vercel | 1,048,576 | 1,048,576 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Muse Spark 1.2 | muse-spark-1-2 | vercel | 1,048,576 | 1,048,576 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Muse Spark 1.2 Contributor | muse-spark-1-2-contributor | vercel | 1,048,576 | 1,048,576 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| Muse Spark 1.3 Contributor | muse-spark-1-3-contributor | vercel | 1,048,576 | 1,048,576 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| S1 (Free) | s1 | vercel | - | - | Speech generation | Text✓ Image— Audio— Video— | Text— Image— Audio✓ Video— |
| S2 Pro | s2-pro | vercel | - | - | Speech generation | Text✓ Image— Audio— Video— | Text— Image— Audio✓ Video— |
| S2.1 Pro (Free) | s2-1-pro | vercel | - | - | Speech generation | Text✓ Image— Audio— Video— | Text— Image— Audio✓ Video— |
| Transcribe-1 | transcribe-1 | vercel | - | - | Speech recognition | Text— Image— Audio✓ Video— | Text✓ Image— Audio— Video— |
| TTS-1 | tts-1 | vercel | - | - | Speech generation | Text✓ Image— Audio— Video— | Text— Image— Audio✓ Video— |
| TTS-1 HD | tts-1-hd | vercel | - | - | Speech generation | Text✓ Image— Audio— Video— | Text— Image— Audio✓ Video— |
| Whisper | whisper-1 | vercel | - | - | Speech recognition | Text— Image— Audio✓ Video— | Text✓ Image— Audio— Video— |
| Grok STT | grok-stt | xai | - | - | Speech recognition | Text— Image— Audio✓ Video— | Text✓ Image— Audio— Video— |
| Grok TTS | grok-tts | xai | - | - | Speech generation | Text✓ Image— Audio— Video— | Text— Image— Audio✓ Video— |
| Grok Voice Think Fast 1.0 | grok-voice-think-fast-1-0 | xai | - | - | Speech recognition, Speech generation | Text✓ Image— Audio✓ Video— | Text✓ Image— Audio✓ Video— |
| Grok Voice Think Fast 2.0 | grok-voice-think-fast-2-0 | xai | - | - | Speech recognition, Speech generation | Text✓ Image— Audio✓ Video— | Text✓ Image— Audio✓ Video— |
| MiMo-V2-Omni | mimo-v2-omni | xiaomi | 262,144 | 131,072 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| MiMo-V2.5 | mimo-v2-5 | xiaomi | 1,050,000 | 131,072 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| MiMo-V2.6-Flash | mimo-v2-6-flash | xiaomi | 1,048,576 | 131,072 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| MiMo-V2.6-Pro | mimo-v2-6-pro | xiaomi | 1,048,576 | 131,072 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |
| MiMo-V2.6-Pro-UltraSpeed | mimo-v2-6-pro-ultraspeed | xiaomi | 1,048,576 | 131,072 | Function calling, Reasoning, Image recognition, Speech recognition, Video recognition, Structured output, File input | Text✓ Image✓ Audio✓ Video✓ | Text✓ Image— Audio— Video— |

</div>
