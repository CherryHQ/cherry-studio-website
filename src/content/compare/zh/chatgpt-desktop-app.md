# ChatGPT 桌面版替代：一个应用里用上所有模型

ChatGPT 桌面版用起来确实顺手，不用一直开着浏览器标签页。但它只能用 ChatGPT，好一点的模型还得订阅。Cherry Studio 是一款免费开源的桌面应用，支持 Windows、macOS 和 Linux，GPT、Claude、Gemini、DeepSeek、通义千问和本地模型都能放在同一个窗口里用，用多少付多少。

## ChatGPT 桌面版和 Cherry Studio 对比

| | ChatGPT 桌面版 | Cherry Studio |
| --- | --- | --- |
| 平台 | macOS、Windows | Windows、macOS、Linux；另有 iOS 和 Android 版 |
| 模型 | 只有 OpenAI 的模型 | GPT、Claude、Gemini、DeepSeek、Grok、通义千问、本地模型等 |
| 价格 | 免费版；Go 每月 8 美元；Plus 每月 20 美元；Pro 每月 100 美元起 | 免费开源；按 token 付费给模型服务商，或者直接用 ChatGPT 账号登录 |
| 离线使用 | 不支持 | 支持，用本地模型即可 |
| 多模型对比 | 不支持 | 同一个问题发给多个模型，回答并排看 |
| 数据存在哪 | 你的 OpenAI 账号里 | 你自己的电脑上 |
| 知识库 | Projects 和文件上传 | 本地知识库，嵌入模型可以自己选 |
| 扩展 | OpenAI 自带的工具 | MCP 服务器和技能 |

## 保留 GPT，再加上别的模型

已经在付 ChatGPT 的订阅？在 Cherry Studio 里添加 **OpenAI Codex** 服务商，用 ChatGPT 账号登录，GPT 模型就会出现在模型列表里，用的是你套餐里的 Codex 额度，不需要 API key。也可以改填 OpenAI API key 按 token 付费（设置方法见 [OpenAI 接入教程](/docs/zh-cn/pre-basic/providers/openai/)）。然后把 Claude、Gemini、DeepSeek 都加进来，下拉菜单就能切换，聊到一半也能随时换模型。

![Cherry Studio 模型服务设置：选中 OpenAI Codex 服务商，点「使用 ChatGPT 登录」即可接入](/images/compare/chatgpt-model-providers-zh.webp)

不想管一堆 key 的话，OpenRouter 一个 key 就能用几百个模型；国内用户也可以选硅基流动这类聚合平台（见 [OpenRouter](/docs/zh-cn/pre-basic/providers/openrouter/)、[硅基流动](/docs/zh-cn/pre-basic/providers/siliconcloud/) 接入教程）。

## 订阅制和按量付费

ChatGPT 每月收固定费用，打开两次还是两百次都一样。Cherry Studio 直接按服务商的 token 价格计费，各家服务商都有用量页面，上个月花了多少一清二楚。每天只用几次 AI 的话，一个月通常花不到 20 美元。用得多的人可以把日常任务交给便宜的模型，用 Ollama 跑本地模型更是一分钱不花（见 [Ollama 接入教程](/docs/zh-cn/pre-basic/providers/ollama/)）。

## 同一个问题，问多个模型

同一个问题，换个模型，答案可能差得很远。Cherry Studio 能够把一条提问同时发给多个模型，回答并排显示，哪个模型更适合手头的任务，一眼就能看出来。（详见[多模型对比](/docs/zh-cn/advanced-basic/chat/model-compare-branches/)）

![同一个问题「上海天气」分别发给 Claude Opus 和 GLM，两个回答并排显示](/images/compare/chatgpt-compare-zh.webp)

## 跟自己的文件对话，不用上传

Cherry Studio 的知识库直接在你自己的电脑上为 PDF、笔记和保存的网页建立索引，之后任何模型都能基于这些内容回答，还会标出引用来源。（详见[知识库](/docs/zh-cn/knowledge-base/knowledge-base/)）

![Cherry Studio 基于本地 PDF 回答问题，正文中标出引用来源](/images/compare/chatgpt-knowledge-base-zh.webp)

## 熟悉的桌面快捷功能

用过 ChatGPT 桌面版的话，下面这几个会觉得很眼熟：

- **快捷助手**：全局快捷键呼出一个小聊天窗口，浮在当前应用上面。
- **划词助手**：在任何地方选中文字，就能翻译、解释或总结。
- **截图和 OCR**：截取屏幕的一部分，直接提问。

## 不止聊天：Agent 和 MCP

Cherry Studio 还能运行 AI Agent，直接在你电脑上的文件夹里干活，调用各种 MCP 工具，也能定时自动运行。（详见 [MCP](/docs/zh-cn/advanced-basic/extensions/mcp/)）

## 要不要换

如果你想用的不止一个模型、希望花多少算多少，或者更放心把聊天记录留在自己电脑上，Cherry Studio 会是更顺手的选择，而且软件本身完全免费。

如果你只用 OpenAI 的模型，也觉得订阅值这个价，继续用 ChatGPT 桌面版也没问题。不过就算不换，也可以用 ChatGPT 账号登录 Cherry Studio，把别的模型也加进来试试。

> **一个应用，用上 GPT、Claude、Gemini 和 DeepSeek**
>
> 免费下载 Cherry Studio，用 ChatGPT 账号登录就能接着用 GPT，再把其他模型一起加进来，聊天记录都存在自己电脑上。
>
> [立即免费下载 →](/download) · [OpenAI 接入教程](/docs/zh-cn/pre-basic/providers/openai/)

## 常见问题

### 能在 Cherry Studio 里用 ChatGPT Plus 订阅吗？

可以。在设置里打开 OpenAI Codex 服务商，用 ChatGPT 账号登录。套餐里包含的 GPT 模型会出现在模型列表中，用量算在套餐的 Codex 额度里，不按 token 收费。额度用完后，可以再填一个 OpenAI API key 作为备用。

### 把 API key 填进 Cherry Studio 安全吗？

key 和聊天记录都存在你自己的电脑上。Cherry Studio 是开源的，任何人都可以在 GitHub 上查看代码。

### 支持 Linux 吗？

支持。Windows、macOS（Apple 芯片和 Intel）和 Linux 都有安装包。
