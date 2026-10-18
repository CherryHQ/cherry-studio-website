# 视频生成

数据来自 Cherry Studio 内置模型目录（[provider-registry](https://github.com/CherryHQ/cherry-studio/tree/main/packages/provider-registry)），随应用仓库自动同步；表中 `-` 表示数据源未提供该字段，模态列的 ✓ / — 表示是否支持该模态（仅列出本页出现的模态），信息仅供参考。

> **数据更新时间**: 2026-10-18 09:07:16 UTC / 2026-10-18 17:07:16 CST (北京时间)

<div data-models-table="num:3,4;cap:5:推理,识图,语音识别,识视频,文件输入;in:6:图片输入=图✓,音频输入=音✓,视频输入=视✓;out:7:文本输出=文✓">

| 模型名称 | API ID | 服务商 | 上下文长度 | 最大输出 | 能力 | 输入模态 | 输出模态 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Flux 3 | flux-3-video | black-forest-labs | - | - | 视频生成 | 文✓ 图— 音— 视— | 文— 图— 音— 视✓ |
| Doubao Seedance 1.0 Lite I2V | doubao-seedance-1-0-lite-i2v | bytedance | - | - | 识图、视频生成、文件输入 | 文✓ 图✓ 音— 视— | 文— 图— 音— 视✓ |
| Doubao Seedance 1.0 Lite T2V | doubao-seedance-1-0-lite-t2v | bytedance | - | - | 视频生成 | 文✓ 图— 音— 视— | 文— 图— 音— 视✓ |
| Doubao Seedance 1.0 Pro | doubao-seedance-1-0-pro | bytedance | - | - | 识图、视频生成、文件输入 | 文✓ 图✓ 音— 视— | 文— 图— 音— 视✓ |
| Doubao Seedance 1.0 Pro Fast | doubao-seedance-1-0-pro-fast | bytedance | - | - | 识图、视频生成、文件输入 | 文✓ 图✓ 音— 视— | 文— 图— 音— 视✓ |
| Doubao Seedance 2.0 | doubao-seedance-2-0 | bytedance | - | - | 识图、视频生成、文件输入 | 文✓ 图✓ 音✓ 视✓ | 文— 图— 音— 视✓ |
| Doubao Seedance 2.0 Fast | doubao-seedance-2-0-fast | bytedance | - | - | 识图、视频生成、文件输入 | 文✓ 图✓ 音✓ 视✓ | 文— 图— 音— 视✓ |
| Doubao Seedance 2.0 Mini | doubao-seedance-2-0-mini | bytedance | - | - | 识图、视频生成、文件输入 | 文✓ 图✓ 音— 视✓ | 文— 图— 音— 视✓ |
| Seedance 2.0 | seedance-2-0 | bytedance | - | - | 识图、视频生成、文件输入 | 文✓ 图✓ 音— 视— | 文— 图— 音— 视✓ |
| Seedance 2.0 Fast | seedance-2-0-fast | bytedance | - | - | 识图、视频生成、文件输入 | 文✓ 图✓ 音— 视— | 文— 图— 音— 视✓ |
| Seedance 2.0 Mini | seedance-2-0-mini | bytedance | - | - | 识图、视频生成、文件输入 | 文✓ 图✓ 音— 视— | 文— 图— 音— 视✓ |
| Seedance 2.5 | seedance-2-5 | bytedance | - | - | 视频生成 | 文✓ 图— 音— 视— | 文— 图— 音— 视✓ |
| Seedance v1.0 Pro | seedance-v1-0-pro | bytedance | - | - | 视频生成 | 文✓ 图— 音— 视— | 文— 图— 音— 视✓ |
| Seedance v1.0 Pro Fast | seedance-v1-0-pro-fast | bytedance | - | - | 视频生成 | 文✓ 图— 音— 视— | 文— 图— 音— 视✓ |
| Seedance v1.5 Pro | seedance-v1-5-pro | bytedance | - | - | 视频生成 | 文✓ 图— 音— 视— | 文— 图— 音— 视✓ |
| Gemini Omni 1.1 Flash | gemini-omni-1-1-flash | google | 1,048,576 | - | 识图、识视频、视频生成、文件输入 | 文✓ 图✓ 音— 视✓ | 文— 图— 音— 视✓ |
| Gemini Omni Flash Preview | gemini-omni-flash-preview | google | 1,000,000 | 65,536 | 推理、识图、识视频、视频生成、文件输入 | 文✓ 图✓ 音— 视✓ | 文✓ 图— 音— 视✓ |
| Veo 3.1 | veo-3-1-generate-preview | google | 480 | - | 识图、视频生成、文件输入 | 文✓ 图✓ 音— 视— | 文— 图— 音— 视✓ |
| Veo 3.1 fast | veo-3-1-fast-generate-preview | google | 480 | - | 识图、识视频、视频生成、文件输入 | 文✓ 图✓ 音— 视✓ | 文— 图— 音— 视✓ |
| Veo 3.1 lite | veo-3-1-lite-generate-preview | google | 480 | - | 识图、视频生成、文件输入 | 文✓ 图✓ 音— 视— | 文— 图— 音— 视✓ |
| Kling v1 | kling-v1 | kling | - | - | 视频生成 | 文✓ 图✓ 音— 视— | 文— 图— 音— 视✓ |
| Kling v1.5 | kling-v1-5 | kling | - | - | 视频生成 | 文✓ 图✓ 音— 视— | 文— 图— 音— 视✓ |
| Kling v1.6 | kling-v1-6 | kling | - | - | 视频生成 | 文✓ 图✓ 音— 视— | 文— 图— 音— 视✓ |
| Kling v2 Master | kling-v2-master | kling | - | - | 视频生成 | 文✓ 图✓ 音— 视— | 文— 图— 音— 视✓ |
| Kling v2.1 | kling-v2-1 | kling | - | - | 视频生成 | 文✓ 图✓ 音— 视— | 文— 图— 音— 视✓ |
| Kling v2.1 Master | kling-v2-1-master | kling | - | - | 视频生成 | 文✓ 图✓ 音— 视— | 文— 图— 音— 视✓ |
| Kling v2.5 Turbo | kling-v2-5-turbo | kling | - | - | 视频生成 | 文✓ 图✓ 音— 视— | 文— 图— 音— 视✓ |
| Kling v2.5 Turbo Image-to-Video | kling-v2-5-turbo-i2v | kling | - | - | 视频生成 | 文✓ 图— 音— 视— | 文— 图— 音— 视✓ |
| Kling v2.5 Turbo Text-to-Video | kling-v2-5-turbo-t2v | kling | - | - | 视频生成 | 文✓ 图— 音— 视— | 文— 图— 音— 视✓ |
| Kling v2.6 | kling-v2-6 | kling | - | - | 视频生成 | 文✓ 图✓ 音— 视— | 文— 图— 音— 视✓ |
| Kling v2.6 Image-to-Video | kling-v2-6-i2v | kling | - | - | 视频生成 | 文✓ 图— 音— 视— | 文— 图— 音— 视✓ |
| Kling v2.6 Motion Control | kling-v2-6-motion-control | kling | - | - | 视频生成 | 文✓ 图— 音— 视— | 文— 图— 音— 视✓ |
| Kling v2.6 Text-to-Video | kling-v2-6-t2v | kling | - | - | 视频生成 | 文✓ 图— 音— 视— | 文— 图— 音— 视✓ |
| Kling v3.0 Image-to-Video | kling-v3-0-i2v | kling | - | - | 视频生成 | 文✓ 图— 音— 视— | 文— 图— 音— 视✓ |
| Kling v3.0 Motion Control | kling-v3-0-motion-control | kling | - | - | 视频生成 | 文✓ 图— 音— 视— | 文— 图— 音— 视✓ |
| Kling v3.0 Text-to-Video | kling-v3-0-t2v | kling | - | - | 视频生成 | 文✓ 图— 音— 视— | 文— 图— 音— 视✓ |
| MiniMax H3 | minimax-h3 | minimax | - | - | 识图、视频生成、文件输入 | 文✓ 图✓ 音— 视— | 文— 图— 音— 视✓ |
| MiniMax H3 Max | minimax-h3-max | minimax | - | - | 识图、视频生成、文件输入 | 文✓ 图✓ 音— 视— | 文— 图— 音— 视✓ |
| cosmos-predict1-5b | cosmos-predict1-5b | nvidia | - | 4,096 | 识图、识视频、视频生成、文件输入 | 文✓ 图✓ 音— 视✓ | 文— 图— 音— 视✓ |
| cosmos-transfer1-7b | cosmos-transfer1-7b | nvidia | - | 4,096 | 识图、识视频、视频生成、文件输入 | 文✓ 图✓ 音— 视✓ | 文— 图— 音— 视✓ |
| cosmos-transfer2.5-2b | cosmos-transfer2-5-2b | nvidia | - | 4,096 | 识图、识视频、视频生成、文件输入 | 文✓ 图✓ 音— 视✓ | 文— 图— 音— 视✓ |
| Runway Aleph | runway-aleph | runway | - | - | 视频生成 | 文✓ 图✓ 音— 视— | 文— 图— 音— 视✓ |
| Runway Gen-3 Alpha Turbo | runway-gen-3a-turbo | runway | - | - | 视频生成 | 文✓ 图✓ 音— 视— | 文— 图— 音— 视✓ |
| Runway Gen-4 Turbo | runway-gen-4-turbo | runway | - | - | 视频生成 | 文✓ 图✓ 音— 视— | 文— 图— 音— 视✓ |
| Veo 3.0 | veo-3-0-generate-001 | vercel | - | - | 视频生成 | 文✓ 图— 音— 视— | 文— 图— 音— 视✓ |
| Veo 3.0 Fast Generate | veo-3-0-fast-generate-001 | vercel | - | - | 视频生成 | 文✓ 图— 音— 视— | 文— 图— 音— 视✓ |
| Veo 3.1 | veo-3-1-generate-001 | vercel | - | - | 视频生成 | 文✓ 图— 音— 视— | 文— 图— 音— 视✓ |
| Veo 3.1 Fast Generate | veo-3-1-fast-generate-001 | vercel | - | - | 视频生成 | 文✓ 图— 音— 视— | 文— 图— 音— 视✓ |
| Veo 3.1 Lite Generate | veo-3-1-lite-generate-001 | vercel | - | - | 视频生成 | 文✓ 图— 音— 视— | 文— 图— 音— 视✓ |
| Wan v2.5 Text-to-Video Preview | wan-v2-5-t2v-preview | vercel | - | - | 视频生成 | 文✓ 图— 音— 视— | 文— 图— 音— 视✓ |
| Wan v2.6 Image-to-Video | wan-v2-6-i2v | vercel | - | - | 视频生成 | 文✓ 图— 音— 视— | 文— 图— 音— 视✓ |
| Wan v2.6 Image-to-Video Flash | wan-v2-6-i2v-flash | vercel | - | - | 视频生成 | 文✓ 图— 音— 视— | 文— 图— 音— 视✓ |
| Wan v2.6 Reference-to-Video | wan-v2-6-r2v | vercel | - | - | 视频生成 | 文✓ 图— 音— 视— | 文— 图— 音— 视✓ |
| Wan v2.6 Reference-to-Video Flash | wan-v2-6-r2v-flash | vercel | - | - | 视频生成 | 文✓ 图— 音— 视— | 文— 图— 音— 视✓ |
| Wan v2.6 Text-to-Video | wan-v2-6-t2v | vercel | - | - | 视频生成 | 文✓ 图— 音— 视— | 文— 图— 音— 视✓ |
| Wan v2.7 Reference-to-Video | wan-v2-7-r2v | vercel | - | - | 视频生成 | 文✓ 图— 音— 视— | 文— 图— 音— 视✓ |
| Wan v2.7 Text-to-Video | wan-v2-7-t2v | vercel | - | - | 视频生成 | 文✓ 图— 音— 视— | 文— 图— 音— 视✓ |
| Wan v3.0 Video | wan-v3-0-video | vercel | - | - | 识图、视频生成、文件输入 | 文✓ 图✓ 音— 视— | 文— 图— 音— 视✓ |
| Wan v3.0 Video Prime | wan-v3-0-video-prime | vercel | - | - | 识图、视频生成、文件输入 | 文✓ 图✓ 音— 视— | 文— 图— 音— 视✓ |
| Vidu Q3 Pro | viduq3-pro | vidu | - | - | 视频生成 | 文✓ 图✓ 音— 视— | 文— 图— 音— 视✓ |
| Vidu Q3 Pro Fast | viduq3-pro-fast | vidu | - | - | 视频生成 | 文✓ 图✓ 音— 视— | 文— 图— 音— 视✓ |
| Vidu Q3 Turbo | viduq3-turbo | vidu | - | - | 视频生成 | 文✓ 图✓ 音— 视— | 文— 图— 音— 视✓ |
| Grok Imagine | grok-imagine-video | xai | 1,024 | - | 识图、识视频、视频生成、文件输入 | 文✓ 图✓ 音— 视✓ | 文— 图— 音— 视✓ |
| Grok Imagine Video 1.5 | grok-imagine-video-1-5 | xai | 1,024 | - | 识图、语音识别、视频生成、文件输入 | 文✓ 图✓ 音✓ 视— | 文— 图— 音— 视✓ |

</div>
