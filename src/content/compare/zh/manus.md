# Cherry Studio VS. Manus：本地 AI Agent 还是云端 AI Agent？

Manus 和 Cherry Studio 都能让 AI Agent 替大家完成多步骤的任务，区别在于 Agent 跑在哪里。Manus 把它放在云端的虚拟电脑上，按任务扣积分；Cherry Studio 能够让它直接跑在你自己的 Windows、Mac 或 Linux 电脑上，模型随便接入。

## 一张表看区别

| | Cherry Studio | Manus |
| --- | --- | --- |
| Agent 在哪运行 | 你的电脑（Windows、macOS、Linux） | Manus 云端沙盒；桌面端也能访问本地文件 |
| 价格 | 免费开源（AGPL），模型费用直接付给模型服务商 | 免费版每天送积分；付费版每月约 20 美元起 |
| 计费方式 | 按模型服务商的 token 价格；本地模型不花钱 | 按任务扣积分，长时间的调研任务可能用掉几百 |
| 模型选择 | 任意服务商：OpenAI、Anthropic、Gemini、DeepSeek、硅基流动、阿里云百炼、Ollama、LM Studio 等 | 由 Manus 决定 |
| 文件和记录 | 存在本地 | 在 Manus 云端处理 |
| 工具 | MCP 服务器、技能、内置工具、知识库 | 沙盒里自带的浏览器、代码和文件工具 |
| 定时任务 | 支持 | 支持 |

## Agent 到底跑在哪

Manus 给每个任务单独开一个云端沙盒，浏览器、文件系统和常用工具都装好了。你什么都不用配，合上笔记本任务也照样在跑，这确实是很多人喜欢它的主要原因。

Cherry Studio 的 Agent 能够在你指定的本地文件夹里干活：直接改这个文件夹里的真实文件，调用你接好的工具，任务记录也存在本地。如果用的是云端模型，提问内容还是会发给对应的模型服务商，但你的文件不会被上传到别处。

![Cherry Studio 的 Agent 工作区：左侧是会话列表，右侧 Agent 正在处理本地文件夹里的文档](/images/compare/manus-agent-workspace-zh.webp)

## 积分和 token 的区别

Manus 按积分计费。每一步都要扣，任务失败或者原地打转也照扣，当月没用完的积分不会留到下个月。免费版每天刷新 300 积分，轻度使用够了；Standard 套餐每月 20 美元，含 4,000 积分，一个长一点的调研任务就可能用掉几百。

![Manus 定价页：每月 20、40、200 美元三档套餐及对应积分](/images/compare/manus-pricing.webp)

Cherry Studio 本身不收钱。你填一个 API key，按模型服务商的正常 token 价格付费，一个任务花多少，取决于你选的模型和任务跑了多久。跑完以后在 Agent 页面能看到用量，不用提前猜下一步要扣多少积分。用 Ollama 或 LM Studio 跑本地模型，就完全没有账单的担心。

## 模型自己挑

Manus 背后用什么模型由它决定，没办法选。在 Cherry Studio 里，可以让推理能力强的模型负责规划，把重复的步骤交给便宜又快的模型，敏感内容只交给本地模型。以后想换服务商，也不用把 Agent 重新搭一遍。（完整列表见[支持的模型服务商](/docs/zh-cn/pre-basic/providers/quick-reference/)）

## 工具和扩展

Manus 的工具是固定的一套，装在沙盒里。Cherry Studio 则是按需添加：任意 [MCP 服务器](/docs/zh-cn/advanced-basic/extensions/mcp/)（GitHub、Notion、数据库、浏览器等）、可复用的技能，以及用你自己的文档建的知识库。

![Cherry Studio 编辑智能体窗口：为 Agent 关联知识库，还可以配置内置工具、MCP 和技能](/images/compare/manus-agent-tools-zh.webp)

## 定时任务

两边都能定时跑任务。Cherry Studio 还会保留[定时任务的运行记录](/docs/zh-cn/advanced-basic/automation/scheduled-heartbeat/)，并支持频道，外部消息可以直接触发 Agent。

![Cherry Studio 新建定时任务：设置任务名称、提示词、绑定的智能体和执行频率](/images/compare/manus-scheduled-tasks-zh.webp)

## 到底选哪个

如果你在意文件放在哪、想按任务挑最合适的模型，或者希望每一笔花费都看得清清楚楚，Cherry Studio 会更顺手。软件本身免费，用本地模型的话连模型费用都省了，长期高频用 Agent 的话，算下来也更划算。

如果你只是偶尔跑几个任务，想完全不用配置，也不介意按积分计费，Manus 也是个省心的选择。

> **免费下载 Cherry Studio，在自己的电脑上跑第一个 Agent**
>
> 支持 Windows、macOS 和 Linux，免费开源。接上一个模型，照着教程就能搭好你的第一个 Agent，文件和记录都留在本地。
>
> [立即免费下载 →](/download) · [创建 Agent 教程](/docs/zh-cn/advanced-basic/agent-workspace/create-agent/)

## 常见问题

### Cherry Studio 真的免费吗？

是的。软件免费开源，你只需要付钱给接入的模型服务商；用本地模型的话一分钱不花。

### 没有网络也能跑 Agent 吗？

可以，通过 Ollama 或 LM Studio 用本地模型就行。联网搜索这类需要上网的功能，还是得联网。

### Manus 能处理本地文件吗？

它的桌面端可以让 Agent 访问本地文件，但 Agent 本身和模型仍然跑在 Manus 的云端。

### Cherry Studio 能用 Claude 或 GPT 吗？

可以。填入 Anthropic 或 OpenAI 的 API key，或者用 OpenRouter，一个 key 同时用两家。
