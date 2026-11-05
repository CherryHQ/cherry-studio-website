# Claude Code 替代：Claude 和其他模型放在一个应用里用

Claude Code 写代码确实很强，前提是你只用 Claude，而且 Pro 套餐的用量限制够你用。Cherry Studio 是一款免费开源的桌面应用，支持 Windows、macOS 和 Linux：电脑上已经登录了 Claude Code 的话，Agent 可以直接用你的 Claude Code 订阅；聊天时填上 Anthropic API key 就能用 Claude，GPT、Gemini、DeepSeek、通义千问和本地模型也都能放在同一个窗口里。

## Claude Code 和 Cherry Studio 对比

| | Claude Code | Cherry Studio |
| --- | --- | --- |
| 怎么用 | 命令行工具，也能在 Claude 桌面版和 IDE 插件里用 | 桌面应用，Windows、macOS、Linux；另有 iOS 和 Android 版 |
| 模型 | 只有 Claude | Claude、GPT、Gemini、DeepSeek、通义千问、本地模型等 |
| 价格 | 需要 Pro（每月 20 美元，按年付每月 17 美元）或 Max（每月 100 美元起），也可以用 API key | 免费开源；Agent 可以直接用 Claude Code 订阅，其他按 token 付费给模型服务商 |
| 用量限制 | 按 5 小时滚动窗口重置，付费版还有每周上限 | 用 API key 时应用本身不限量；用 Claude Code 订阅时和订阅共用额度 |
| 擅长 | 写代码、改项目 | 聊天、知识库、处理各种文件的 Agent、多模型对比 |
| 扩展 | MCP、技能、插件 | MCP 服务器和技能 |
| 多模型对比 | 不支持 | 同一个问题发给多个模型，回答并排看 |
| 离线使用 | 不支持 | 支持，用本地模型即可 |

## 用 Claude Code 订阅跑 Agent，再加上别的模型

已经在付 Claude Pro 或 Max？先在电脑上登录 Claude Code，再到 Cherry Studio 的 **设置 → 模型服务 → Claude Code** 打开开关，显示已登录后同步模型，Agent 就会直接用你的 Claude Code 订阅，不需要 API key。

![Cherry Studio 模型服务设置：Claude Code 服务商已开启并显示已登录，Agent 使用 Claude Code 订阅凭据](/images/compare/claude-code-provider-zh.webp)

平时在终端里写代码的话，也可以在 Cherry Studio 的「编码搭档」里直接安装和启动 Claude Code。

![Cherry Studio 编码搭档：左侧列出 Claude Code、OpenAI Codex 等编码工具，右侧选择模型服务商后一键启动 Claude Code](/images/compare/claude-code-partner-zh.webp)

## 订阅额度用完了怎么办

Claude Code 的套餐按 5 小时滚动窗口计算用量，上面还有每周上限，写代码写到一半撞上限，就只能等着，或者升级到 Max。在 Cherry Studio 里，Agent 可以先用订阅额度，额度用完了换成 API key 按量付费，或者把日常步骤交给更便宜的模型，活不用停下来。

如果你每天从早到晚都在高强度用 Claude，订阅可能更划算。但大多数一天用几次的人，按量付费通常更省，日常任务还可以交给便宜的模型，或者用本地模型一分钱不花。

## Agent 用哪个模型，你说了算

Claude Code 本身就是在你电脑上干活的 Agent，主要面向写代码。Cherry Studio 的 Agent 不只写代码：在你指定的文件夹里整理资料、批量改文档、生成报告，调用 MCP 工具，还能定时自动运行。模型也可以自己挑：规划交给 Claude（直接用 Claude Code 订阅），重复步骤交给便宜的模型，敏感文件只交给本地模型。（详见 [Agent 工作区](/docs/zh-cn/advanced-basic/agent-workspace/)）

## 同一个问题，问 Claude Code 也问 DeepSeek

Claude Code 不是每件事都最强。Cherry Studio 能够把一条提问同时发给 Claude、DeepSeek 等多个模型，回答并排显示，哪个模型更适合手头的任务，一眼就能看出来。（详见[多模型对比](/docs/zh-cn/advanced-basic/chat/model-compare-branches/)）

![Cherry Studio 多模型对比：同一个问题同时发给 Claude Opus 和 GLM，两边的回答并排显示](/images/compare/claude-model-compare-zh.webp)

## 跟自己的文件对话，不用上传

Claude Code 读的是项目目录里的代码，翻一堆 PDF 和笔记就不太顺手。Cherry Studio 的知识库直接在你自己的电脑上为 PDF、笔记和网页建立索引，任何模型都能基于这些内容回答，还会标出引用。再配一个本地嵌入模型，文档从头到尾都不出电脑。（详见[知识库](/docs/zh-cn/knowledge-base/knowledge-base/)）

## 写代码以外的日常小功能

- **快捷助手**：全局快捷键呼出一个小聊天窗口，浮在当前应用上面。
- **划词助手**：在任何应用里选中文字，就能翻译、解释或总结。
- **截图和 OCR**：截取屏幕的一部分，直接提问。

## 要不要换

如果你想用的不止 Claude Code 一个模型、不想再被 5 小时额度卡住，或者想让 Agent 帮你处理代码以外的工作，Cherry Studio 会更顺手。软件本身免费，还能直接用你的 Claude Code 订阅跑 Agent。

如果你主要在终端里写代码、只用 Claude，对 Pro 或 Max 套餐也满意，继续用 Claude Code 也没问题。两个也可以一起用：写代码用 Claude Code，其他事交给 Cherry Studio。

> **一个应用，用上 Claude Code、Codex 和 DeepSeek**
>
> 免费下载 Cherry Studio，用 Claude Code 订阅跑 Agent，再把其他模型一起加进来，聊天记录都存在自己电脑上。
>
> [立即免费下载 →](/download) · [Anthropic 接入教程](/docs/zh-cn/pre-basic/providers/anthropic/)

## 常见问题

### 能在 Cherry Studio 里用 Claude Pro 订阅吗？

可以，用在 Agent 上。先在电脑上登录 Claude Code，再到设置 → 模型服务 → Claude Code 打开开关，Agent 就会使用 Claude Code 的订阅凭据。聊天和助手用不了这个服务商，需要另外填 Anthropic API key 或用 OpenRouter。

### Cherry Studio 能替代 Claude Code 吗？

写代码的话不能完全替代，Claude Code 在终端和代码库里的体验更深入。Cherry Studio 更适合把 Claude 和其他模型放在一起用，处理聊天、知识库和各种文件任务；在「编码搭档」里也能直接启动 Claude Code。

### 支持 Linux 吗？

支持。Windows、macOS（Apple 芯片和 Intel）和 Linux 都有安装包。
