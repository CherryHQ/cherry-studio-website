# 免费 AI 模型有哪些？在 Cherry Studio 里不花钱用大模型

想用 AI 但不想先付费，其实有不少办法：应用自带的免费模型、各家平台的免费额度、带免费标记的模型，还有在自己电脑上跑的本地模型。下面这些都能接进 Cherry Studio，在同一个应用里切换着用。

## 一张表看免费的选择

| 来源 | 免费方式 | 适合 | 注意 |
| --- | --- | --- | --- |
| CherryAI | Cherry Studio 内置，不用注册、不用填 key | 第一次体验、日常问答 | 目前提供 Qwen3-8B，能力适合基础任务 |
| 魔搭 ModelScope | 每天 2000 次免费 API 调用 | 想试很多开源模型 | 额度以魔搭官网规则为准 |
| 智谱 | GLM Flash 系列可以免费调用 | 中文对话、写作 | 具体模型和限速以智谱开放平台为准 |
| OpenRouter | 部分模型有带「free」标记的免费版 | 想用海外开源模型 | 免费版有速率限制 |
| Ollama / LM Studio | 在自己电脑上运行 | 隐私敏感、离线使用 | 需要电脑配置跟得上 |

免费额度和可用模型经常调整，用之前在各家官网确认一下。

## 不注册也能用：CherryAI

装好 Cherry Studio 后，**设置 → 模型服务** 里已经内置了 CherryAI，打开就能聊，不用去任何平台注册，也不用填 API key。它适合先熟悉一下应用，处理日常问答和简单的文本任务。（详见 [CherryAI](/docs/zh-cn/pre-basic/providers/cherryai/)）

## 免费额度：魔搭、智谱、OpenRouter

想用能力更强的模型，可以注册这几家平台，拿到 API key 填进 Cherry Studio：

- **魔搭 ModelScope**：每天 2000 次免费调用，覆盖大量开源模型。（[接入魔搭](/docs/zh-cn/pre-basic/providers/modelscope/)）
- **智谱**：GLM Flash 系列模型可以免费调用，中文表现不错。（[接入智谱](/docs/zh-cn/pre-basic/providers/zhipu/)）
- **OpenRouter**：一个 key 能用几百个模型，其中带「free」后缀的是免费版。（[接入 OpenRouter](/docs/zh-cn/pre-basic/providers/openrouter/)）

![Cherry Studio 模型服务设置：可以同时添加多家模型服务商](/images/compare/chatgpt-model-providers-zh.webp)

## 完全免费、不联网：本地模型

用 Ollama 或 LM Studio 在自己电脑上跑开源模型，比如 DeepSeek-R1 蒸馏版、Qwen、Llama，不限次数，资料也不出电脑。8GB 显存或 16GB 内存的 Mac 就能跑 7B、8B 这个级别的模型。（[接入 Ollama](/docs/zh-cn/pre-basic/providers/ollama/)）

## 把免费模型用好的几个办法

- **按任务分工**：日常问答用免费模型，难一点的问题再换更强的模型。Cherry Studio 里聊到一半也能切换。
- **同一个问题问几个模型**：免费模型各有长处，用多模型对比把同一个问题发给几个模型，挑最好的回答。（[多模型对比](/docs/zh-cn/advanced-basic/chat/model-compare-branches/)）
- **敏感内容交给本地模型**：合同、内部资料用本地模型处理，最放心。

> **免费下载 Cherry Studio，打开就能用免费模型**
>
> 支持 Windows、macOS 和 Linux。内置免费模型，魔搭、智谱、OpenRouter 和本地模型都能接进来，在一个应用里切换着用。
>
> [立即免费下载 →](/download) · [支持的模型服务商](/docs/zh-cn/pre-basic/providers/quick-reference/)

## 常见问题

### 免费模型和付费模型差别大吗？

处理日常问答、翻译、改写，免费模型通常够用。复杂推理、长文写作和编程，付费的大模型会明显更好。可以先用免费模型，遇到搞不定的再换。

### 免费额度用完了怎么办？

可以换一家平台的免费额度，或者切到本地模型继续用。在 Cherry Studio 里多加几个服务商，下拉菜单就能切换。

### 本地模型需要什么配置？

7B、8B 的模型，有 8GB 显存的显卡或者 16GB 内存的 Mac 就能跑得比较顺。模型越大，需要的显存越多。

### 免费模型安全吗？

用云端免费模型时，提问内容会发给对应的服务商，处理方式以各家的隐私政策为准。不想让资料离开电脑，就用本地模型。
