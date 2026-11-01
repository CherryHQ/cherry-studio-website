# MCP 是什么？在 Cherry Studio 里给 AI 接上外部工具

MCP（Model Context Protocol，模型上下文协议）是一套让 AI 调用外部工具和数据的通用接口。有了它，AI 不只是回答问题，还能查数据库、操作浏览器、读写 GitHub、调用公司内部系统。Cherry Studio 是一个 MCP 客户端：你在设置里添加 MCP 服务器，再交给对话或智能体使用就行。

## MCP 解决什么问题

以前想让 AI 用某个工具，每个 AI 应用都要单独做一套对接。MCP 把这件事标准化了：工具方做一个 MCP 服务器，任何支持 MCP 的客户端都能直接接上。

可以把它理解成 AI 世界的 USB 接口：

| 角色 | 是什么 | 例子 |
| --- | --- | --- |
| MCP 服务器 | 提供工具、资源和提示词的一方 | GitHub、Notion、数据库、浏览器、文件系统 |
| MCP 客户端 | 连接服务器、把工具交给模型用的应用 | Cherry Studio |
| 模型 | 决定什么时候调用哪个工具 | 支持工具调用的模型，比如 Claude、GPT、DeepSeek、Qwen |

## 在 Cherry Studio 里添加 MCP 服务器

1. 打开 **设置 → MCP → MCP 服务器**，点「添加」。
2. 按服务提供方给的配置填写：本地服务器填命令、参数和环境变量（常见的是 `npx` 或 `uvx` 命令）；远程服务器填 SSE 或 HTTP 地址，有的还要授权。
3. 启用服务器，等状态正常后打开详情，看看它提供了哪些工具、资源和提示词。
4. 在智能体的编辑窗口里打开 **MCP**，只启用这个智能体需要的服务器。

不想自己写配置的话，可以先从 **内置 MCP** 和 **服务市场** 里挑现成的装。（完整步骤见 [MCP 与外部工具](/docs/zh-cn/advanced-basic/extensions/mcp/)）

![Cherry Studio 编辑智能体窗口：可以为智能体配置内置工具、知识库、MCP 和技能](/images/compare/manus-agent-tools-zh.webp)

## 几个实用的例子

- **查项目数据库**：管理员给一个只读的数据库 MCP，只绑定给「数据分析」智能体，让它查数据、把报告写进工作目录，不会改到业务库。
- **操作浏览器**：接一个浏览器 MCP，让智能体打开网页、截图、整理竞品信息。
- **管理代码仓库**：接 GitHub MCP，让智能体读 issue、汇总 PR、起草回复。

## 什么时候不需要 MCP

MCP 适合接外部系统。如果只是想让 AI 按固定步骤做事，用技能就够了；只想让 AI 查你自己的资料，直接绑定知识库更简单。不要为了「更高级」专门去搭 MCP。

## 用 MCP 要注意什么

- **控制权限**：会写入数据或产生费用的工具，保持需要确认后再执行。
- **只绑定需要的服务器**：工具越多，越占上下文，模型也越容易选错。
- **保护密钥**：API key 放在服务器的环境变量里，不要写进提示词或截图。

服务器连不上时，先看服务器日志，再对照 [MCP 故障排查](/docs/zh-cn/advanced-basic/extensions/mcp/troubleshooting/)。

> **免费下载 Cherry Studio，给 AI 接上你的工具**
>
> 支持 Windows、macOS 和 Linux，免费开源。添加 MCP 服务器，再交给智能体使用，GitHub、数据库、浏览器都能接。
>
> [立即免费下载 →](/download) · [MCP 设置教程](/docs/zh-cn/advanced-basic/extensions/mcp/)

## 常见问题

### MCP 和 API 有什么区别？

API 是某个服务自己定义的接口，每接一个都要单独开发。MCP 是一套统一的协议，工具方按 MCP 做一次，所有支持 MCP 的客户端都能用。

### 哪些模型能用 MCP？

需要支持工具调用（Function Calling）的模型，比如 Claude、GPT、Gemini、DeepSeek、Qwen 的主流版本。小模型调用工具的稳定性会差一些。

### MCP 服务器显示已连接，智能体却找不到工具怎么办？

先检查智能体有没有绑定这个服务器、对应工具有没有被关掉、是否有待批准的权限请求。改完智能体配置后，新发一条消息让它重新加载工具。

### MCP 和 Cherry Studio 的 API 网关有什么不同？

方向相反。MCP 是把外部工具接进 Cherry Studio；API 网关是把 Cherry Studio 里的模型以兼容 API 的形式提供给其他程序。
