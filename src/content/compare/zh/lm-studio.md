# LM Studio 替代：在一个桌面应用里同时用本地和云端模型

想在自己电脑上下载开源模型、跑起来，LM Studio 确实是最省事的工具之一。但模型跑起来之后的事，它就不太擅长了：Agent、文档库、本地模型和云端模型混着用。这部分正是 Cherry Studio 能够帮大家做的。它免费开源，本地模型通过 LM Studio 或 Ollama 接入，云端模型可以接 OpenAI、Anthropic、DeepSeek 等。很多人最后都是两个一起用。

## LM Studio 和 Cherry Studio 对比

| | LM Studio | Cherry Studio |
| --- | --- | --- |
| 主要用途 | 下载和运行本地模型 | 在任意模型上聊天、跑 Agent、处理文档 |
| 本地模型 | 自带（负责下载和运行） | 通过 LM Studio 或 Ollama 接入 |
| 云端模型 | LM Studio 本身不支持；它另出的 Bionic 应用可以用 LM Studio 云上的开源模型，按积分付费 | OpenAI、Anthropic、Gemini、DeepSeek、OpenRouter 等几十家 |
| 价格和许可 | 个人和工作使用都免费（闭源） | 免费开源（AGPL） |
| MCP 工具 | 支持 | 支持 |
| 带工作目录的 AI Agent | LM Studio 本身没有；另出的 Bionic 应用提供按项目组织的 Agent | 支持 |
| 文档问答（RAG） | 在对话里附加文件，长文件分块检索 | 长期保存的知识库，支持召回测试和引用 |
| 多模型同时对比 | 分屏可以并排开两个对话，但不能把一个问题同时发给多个模型 | 支持 |
| 平台 | Windows、macOS、Linux | Windows、macOS、Linux；另有 iOS 和 Android 版 |

## 继续用 LM Studio，在上面加一个 Cherry Studio

不用放弃 LM Studio。打开它的本地服务器，在 Cherry Studio 里把它添加为模型服务商，你已经下载好的模型就会直接出现在 Cherry Studio 的模型列表里。（具体步骤见[接入 LM Studio](/docs/zh-cn/pre-basic/providers/lm-studio/)）

小提示：如果 LM Studio 开着即时加载（JIT），发第一条消息时会稍微卡一会儿，因为模型要先载入内存。之后的回复速度就看你的硬件了。

习惯用 Ollama 也一样，接入方法见[接入 Ollama](/docs/zh-cn/pre-basic/providers/ollama/)。

## 本地模型和云端模型混着用

本地模型隐私好、不花钱，但能力不一定够用。在 Cherry Studio 里，敏感内容交给本地模型，难一点的问题交给云端模型，在同一个应用里就能搞定，甚至同一段对话里都能随时切换。

![Cherry Studio 本地模型设置：可直接下载本地语音、嵌入和 OCR 模型，支持硬件加速](/images/compare/lmstudio-local-models-zh.webp)

## 文件不出电脑的知识库

用 PDF、笔记和网页建一个知识库，搭配本地嵌入模型和本地对话模型，文档从头到尾都留在你自己的电脑上。提问之前，还能先做一次召回测试，看清楚模型到底会读到哪些段落。（详见[创建知识库](/docs/zh-cn/knowledge-base/create/)）

## Agent、MCP 和技能

Cherry Studio 能够运行 AI Agent：在你电脑上的文件夹里读写文件，调用 GitHub、浏览器等 MCP 服务器。本地模型能力够强的话，整个流程完全可以离线跑。（详见 [AI Agent](/docs/zh-cn/advanced-basic/agent-workspace/)、[MCP](/docs/zh-cn/advanced-basic/extensions/mcp/)）

## 只用 LM Studio 就够吗

如果你只是想试试新出的开源模型、调调参数，或者通过本地 API 提供服务，LM Studio 已经够用。

但一旦开始拿这些模型做日常工作，比如让 Agent 处理文件、用自己的文档做问答，或者想把云端模型也放在一起用，Cherry Studio 能帮你省掉很多来回切换的麻烦。两个都是免费的，搭配起来用也不冲突。

> **已经在用 LM Studio？再加一个 Cherry Studio**
>
> 免费开源，连上你的 LM Studio 服务器，本地模型和云端模型放在一起用，Agent、知识库、MCP 都能直接上手。
>
> [立即免费下载 →](/download) · [接入 LM Studio 教程](/docs/zh-cn/pre-basic/providers/lm-studio/)

## 常见问题

### Cherry Studio 能替代 LM Studio 吗？

不完全是。LM Studio 负责运行本地模型，Cherry Studio 是你使用模型的地方，本地和云端都行。如果只用云端模型，可以不装 LM Studio；也可以用 Ollama 代替它。

### Cherry Studio 能完全离线运行吗？

可以。用 LM Studio 或 Ollama 提供的本地模型，知识库再配一个本地嵌入模型就行。联网搜索和云端模型当然还是需要联网。

### 新手用哪个更好？

第一次跑本地模型，LM Studio 的模型浏览器很好上手。如果是日常在多个模型之间切换着用，Cherry Studio 能做的更多。

### LM Studio Bionic 又是什么？

Bionic 是 LM Studio 团队新出的一款独立应用，专门用来跑 Agent，按项目和会话组织工作。它可以用本地模型，也可以用 LM Studio 自家云上的开源模型（按积分付费）。Cherry Studio 的 Agent 同样能用这两类模型，还能用自己的 API key 接 GPT、Claude、Gemini 这些闭源模型。
