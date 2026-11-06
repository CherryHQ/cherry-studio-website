# Cherry Studio vs Chatbox：两款 AI 桌面客户端怎么选？

Chatbox 和 Cherry Studio 做的是同一件事：把 GPT、Claude、Gemini、DeepSeek 这些模型放进一个桌面应用里，填上自己的 API key 就能用。真正用起来，差别主要在三个地方：Agent 能做到什么程度、MCP 和知识库能不能按自己的需要配置，以及软件开源到什么程度。

## 一张表看区别

| | Cherry Studio | Chatbox |
| --- | --- | --- |
| 开源 | 整个应用开源（AGPL） | 开源的是社区版（GPLv3） |
| MCP | 任意 MCP 服务器都能加，自己配置 | 支持，Agent 模式里也能用 MCP 服务器 |
| 知识库 | 本地知识库，嵌入模型自己选，支持召回测试 | 桌面端知识库 |
| Agent | 在本地文件夹里读写文件，支持技能、MCP、定时任务和频道触发 | Agent 模式：代码执行、技能、MCP、知识库 |
| 本地模型 | Ollama、LM Studio | Ollama |

![Cherry Studio 模型服务设置：已接入深度求索，列出 DeepSeek V4 Flash、DeepSeek V4 Pro 等模型](/images/compare/chatbox-providers-zh.webp)

## Agent：Cherry Studio 能直接改你电脑上的文件

Chatbox 的 Agent 模式可以执行代码、调用技能和 MCP。Cherry Studio 的 Agent 走得更远一步：给它指定一个本地文件夹，它就能在里面直接读写真实文件，比如整理资料、批量改文档、生成报告。任务还能设成定时自动跑，或者通过频道用外部消息触发。（详见 [Agent 工作区](/docs/zh-cn/advanced-basic/agent-workspace/)）

![Cherry Studio 智能体工作区：智能体打开本地文件夹里的文档并直接编辑](/images/compare/chatbox-agent.webp)

## 同一个问题，问好几个模型

换个模型，答案可能就差很多。Cherry Studio 可以把一条提问同时发给多个模型，回答并排显示，哪个模型更适合手头的任务，一眼就能看出来。（详见[多模型对比](/docs/zh-cn/advanced-basic/chat/model-compare-branches/)）

## 知识库：本地存储，模型自己选

两边都有桌面知识库。Cherry Studio 的知识库保存在本地，嵌入模型可以自己挑，搭配 Ollama 跑本地嵌入模型，向量化就在本机完成。提问前还能先做一次召回测试，看清楚模型会读到哪些段落。（详见[创建知识库](/docs/zh-cn/knowledge-base/create/)）

本地存储和本地嵌入不代表文档内容全程不出电脑。云端解析、OCR、重排或聊天仍可能把文件或相关片段发送给所选服务商。要让整个流程保持本地，需要各环节都使用本地能力，并避免调用会向外部发送内容的工具。（详见[数据、隐私与维护](/docs/zh-cn/knowledge-base/data/)）

## 日常用起来的小功能

- **划词助手**：在任何应用里选中文字，就能翻译、解释或总结。
- **快捷助手**：全局快捷键呼出一个小窗口，不用切到主界面。
- **国内服务商**：硅基流动、阿里云百炼、火山引擎、魔搭等都有现成的接入教程。

## 到底选哪个

如果你想自己决定接哪些 MCP 工具、用哪个嵌入模型建知识库，或者希望 Agent 直接处理本地文件，Cherry Studio 更合适，而且整个应用开源，代码谁都能看。

如果你更想要开箱即用，不想自己研究 MCP、嵌入模型这些设置，Chatbox 也是很省心的选择。

> **从 Chatbox 换过来，只要几分钟**
>
> 免费下载 Cherry Studio，把原来的 API key 填进去就能接着用，MCP、知识库和 Agent 都能直接上手。
>
> [立即免费下载 →](/download) · [支持的模型服务商](/docs/zh-cn/pre-basic/providers/quick-reference/)

## 常见问题

### Chatbox 里的 API key 能直接拿到 Cherry Studio 用吗？

可以。OpenAI、Anthropic、DeepSeek、硅基流动这些服务商的 key 不绑定客户端，在 Cherry Studio 的模型服务里填进去就行。

### Cherry Studio 能接哪些 MCP 服务器？

任意 MCP 服务器都可以，比如 GitHub、Notion、数据库、浏览器。在设置里添加后，聊天和 Agent 都能用。（详见 [MCP](/docs/zh-cn/advanced-basic/extensions/mcp/)）

### 不想申请 API key，能直接用吗？

可以先用内置的 CherryAI 免费模型体验，或者用 Ollama 跑本地模型。
