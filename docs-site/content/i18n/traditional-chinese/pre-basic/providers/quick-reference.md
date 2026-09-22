---
icon: list
---
# 全部 Provider 快速參考

Cherry Studio 內建 **60+ 家 Provider**，本頁提供總覽表，找到目標 Provider 後 **按指引填寫金鑰即可使用**。已有專題文件的 Provider 提供跳轉連結，其餘按通用步驟（[Provider 總覽](README.md)）設定。

## 使用步驟

1. **查找目標 Provider**（可用 Ctrl/⌘+F 快速搜尋）
2. 點擊 **官網** 註冊帳號並取得 API Key
3. 在 Cherry Studio `設定 → 模型服務` 中找到對應 Provider，填寫金鑰後點擊「取得模型清單」
4. 完成設定

## 一句話決策

| 你的需求 | 推薦方向 |
|---|---|
| **新手快速上手**，避免複雜流程 | [CherryIN](cherryin-1.md) 或 [CherryAI](../../../../pre-basic/providers/cherryai) |
| **國內存取最方便** | DeepSeek / Moonshot / 矽基流動 / 智譜 |
| **海外最強模型** | OpenAI / Anthropic / Gemini |
| **一個 key 通用 200 家** | [OpenRouter](openrouter.md) |
| **完全本地、隱私敏感** | [Ollama](ollama.md) / [LM Studio](lm-studio.md) |
| **企業合規** | [Azure OpenAI](azure-openai.md) / AWS Bedrock |
| **使用 [智能體](../../advanced-basic/agent.md)** | [Anthropic](anthropic.md) / [CherryIN](cherryin-1.md)（需支援 Anthropic 協定） |

## 國內大廠自營模型

無需翻牆、有中文優勢、價格相對便宜。

| Provider | 一句話特點 | 官網 | 專題文件 |
|---|---|---|---|
| **DeepSeek** | 編程與推理性價比之王 | [deepseek.com](https://platform.deepseek.com/) | [→](deepseek.md) |
| **Moonshot AI (Kimi)** | 超長上下文（最長 200 萬字） | [moonshot.cn](https://platform.moonshot.cn/) | [→](moonshot.md) |
| **ZhiPu (智譜)** | GLM 系列，多模態，相容 Anthropic 可跑智能體 | [bigmodel.cn](https://open.bigmodel.cn/) | [→](zhipu.md) |
| **doubao (豆包/火山引擎)** | 字節出品，價格親民 | [volcengine.com](https://www.volcengine.com/product/doubao) | [→](doubao.md) |
| **Baidu Cloud (文心一言)** | 百度 ERNIE 系列 | [cloud.baidu.com](https://cloud.baidu.com/) | — |
| **Bailian (阿裡百鍊)** | Qwen 系列、有海量模型 | [bailian.console.aliyun.com](https://bailian.console.aliyun.com/) | [→](a-li-yun-bai-lian.md) |
| **BAICHUAN AI** | 百川大模型 | [baichuan-ai.com](https://platform.baichuan-ai.com/) | — |
| **MiniMax** | 國內多模態（語音、影片） | [minimaxi.com](https://platform.minimaxi.com/) | [→](minimax.md) |
| **StepFun** | 階躍星辰 | [stepfun.com](https://platform.stepfun.com/) | — |
| **LongCat** | 美團 LongCat 系列 | [longcat.chat](https://longcat.chat/) | — |
| **Xiaomi MiMo** | 小米大模型 | [mimo.mi.com](https://mimo.mi.com/) | — |

## 海外大廠自營模型

效果第一梯隊，國內存取通常需要代理。

| Provider | 一句話特點 | 官網 | 專題文件 |
|---|---|---|---|
| **OpenAI** | GPT 系列 | [openai.com](https://platform.openai.com/) | [→](openai.md) |
| **Anthropic** | Claude 系列，智能體首選 | [anthropic.com](https://console.anthropic.com/) | [→](anthropic.md) |
| **Gemini (Google)** | Google 大模型 | [aistudio.google.com](https://aistudio.google.com/) | [→](google-gemini.md) |
| **Azure OpenAI** | 微軟託管的 OpenAI，企業合規 | [portal.azure.com](https://portal.azure.com/) | [→](azure-openai.md) |
| **VertexAI** | Google Cloud 託管 | [cloud.google.com](https://cloud.google.com/vertex-ai) | [→](vertex-ai.md) |
| **AWS Bedrock** | 亞馬遜託管多家模型 | [aws.amazon.com/bedrock](https://aws.amazon.com/bedrock/) | — |
| **Mistral** | 歐洲開源模型代表 | [mistral.ai](https://console.mistral.ai/) | [→](mistral.md) |
| **Grok (xAI)** | 馬斯克 xAI，自帶聯網 | [x.ai](https://console.x.ai/) | [→](grok.md) |
| **Perplexity** | 搜尋增強對話 | [perplexity.ai](https://www.perplexity.ai/) | [→](perplexity.md) |

## 閘道 / 聚合

一個 key 接入多家模型，帳號集中管理。

| Provider | 一句話特點 | 官網 | 專題文件 |
|---|---|---|---|
| **CherryAI** | Cherry 官方免費體驗 | — | [→](../../../../pre-basic/providers/cherryai) |
| **CherryIN** | Cherry 官方付費閘道，雙端點（OpenAI + Anthropic）| [open.cherryin.cc](https://open.cherryin.cc/) | [→](cherryin-1.md) |
| **OpenRouter** | 海外最大聚合，200+ 模型 | [openrouter.ai](https://openrouter.ai/) | [→](openrouter.md) |
| **AiHubMix** | 海外聚合 | [aihubmix.com](https://aihubmix.com/) | — |
| **DMXAPI** | 國內聚合 | [dmxapi.cn](https://dmxapi.cn/) | — |
| **302.AI** | 國內聚合 | [302.ai](https://302.ai/) | — |
| **NewAPI** | 自建閘道（開源） | [newapi.pro](https://docs.newapi.pro/) | [→](newapi.md) |
| **OneAPI** | 自建閘道（開源） | — | [→](oneapi.md) |
| **PPIO 派歐雲** | 國內雲算力 + 模型 | [ppio.com](https://ppio.com/) | [→](ppio.md) |
| **BurnCloud** | 國內聚合 | [burncloud.com](https://ai.burncloud.com/) | — |
| **AIOnly** | 國內聚合 | [aiionly.com](https://www.aiionly.com/) | — |
| **ocoolAI** | 國內聚合 | [ocoolai.com](https://one.ocoolai.com/) | — |
| **Poe** | Quora 旗下 AI 集市 | [poe.com](https://poe.com/) | — |
| **Vercel AI Gateway** | Vercel 旗下閘道 | [vercel.com/ai](https://vercel.com/ai) | — |

## 超低延遲 / 高吞吐推理服務

適合需要「速度感」的場景（IM 機器人、即時翻譯等）。

| Provider | 一句話特點 | 官網 | 專題文件 |
|---|---|---|---|
| **Groq** | LPU 硬體，毫秒級回應 | [groq.com](https://console.groq.com/) | [→](groq.md) |
| **Cerebras AI** | 自研晶片，超大上下文 | [cerebras.ai](https://cerebras.ai/) | — |
| **Together** | 開源模型集中託管 | [together.ai](https://www.together.ai/) | — |
| **Fireworks** | 開源模型推理最佳化 | [fireworks.ai](https://fireworks.ai/) | — |

## 國產雲 + 算力服務

| Provider | 一句話特點 | 官網 | 專題文件 |
|---|---|---|---|
| **Silicon (矽基流動)** | 國內最大開源模型託管 | [siliconflow.cn](https://cloud.siliconflow.cn/) | [→](siliconcloud.md) |
| **ModelScope (魔搭)** | 阿裡旗下開源模型平台 | [modelscope.cn](https://modelscope.cn/) | [→](modelscope.md) |
| **AlayaNew** | 國內推理服務 | [alayanew.com](https://www.alayanew.com/) | — |
| **Qiniu (七牛)** | 七牛雲 AI | [qiniu.com](https://www.qiniu.com/) | — |
| **LANYUN** | 國內推理 | [lanyun.net](https://maas.lanyun.net/) | — |
| **Xirang** | 天翼雲息壤 | [ctyun.cn](https://www.ctyun.cn/) | — |

## 嵌入 / 重排專用

僅用於執行嵌入或重排，搭配知識庫 / 全域記憶使用。

| Provider | 一句話特點 | 官網 | 專題文件 |
|---|---|---|---|
| **Jina** | 嵌入、重排、CLIP，免費額度大 | [jina.ai](https://jina.ai/) | — |
| **VoyageAI** | 嵌入 / 重排專家 | [voyageai.com](https://www.voyageai.com/) | — |

## 本地推理

完全離線，保護隱私。

| Provider | 一句話特點 | 官網 | 專題文件 |
|---|---|---|---|
| **Ollama** | 命令列本地推理，最流行 | [ollama.com](https://ollama.com/) | [→](ollama.md) |
| **LM Studio** | GUI 本地推理，Apple Silicon 友善 | [lmstudio.ai](https://lmstudio.ai/) | [→](lm-studio.md) |
| **GPUStack** | 企業級本地推理 | [gpustack.ai](https://gpustack.ai/) | — |
| **OpenVINO Model Server** | Intel 加速本地推理 | [openvino.ai](https://www.openvino.ai/) | — |

## 模型平台 / 其他

| Provider | 一句話特點 | 官網 | 專題文件 |
|---|---|---|---|
| **Hugging Face** | 全球最大開源模型社群 | [huggingface.co](https://huggingface.co/) | — |
| **GitHub Copilot** | 微軟 GitHub 程式設計助手 | [github.com/features/copilot](https://github.com/features/copilot) | [→](github-copilot.md) |
| **GitHub Models** | GitHub 模型市場（Beta）| [github.com/marketplace/models](https://github.com/marketplace/models) | — |
| **MiniMax Global** | MiniMax 海外版 | [minimax.io](https://platform.minimax.io/) | — |
| **SophNet** | 國內模型託管 | [sophnet.com](https://sophnet.com/) | — |
| **PH8** | 國內推理 | [ph8.co](https://ph8.co/) | — |
| **Z.ai** | 智譜國際版 | [z.ai](https://z.ai/) | — |
| **nvidia** | NVIDIA NIM 推理 | [nvidia.com](https://www.nvidia.com/ai/) | — |

## 自訂服務商

如果您使用的服務不在上述清單中，但提供 **OpenAI 相容 / Anthropic 相容 / Gemini 相容** 任一協定，都可以透過 [自訂服務商](zi-ding-yi-fu-wu-shang.md) 新增。

## 還是不知道選哪個？

直接使用 [**CherryIN**](cherryin-1.md) 或 [**CherryAI**](../../../../pre-basic/providers/cherryai) —— 最適合新手快速上手。需要進階時再更換。

***

### 取得協助與提交回饋

如果您在設定或使用過程中遇到任何疑問、Bug 或有功能改進建議，請參考 [回饋與建議](../../question-contact/suggestions.md) 中提供的官方管道。
