# What Is MCP? How to Use MCP Tools in Cherry Studio

MCP (Model Context Protocol) is a common way for AI models to use external tools and data. With it, AI can do more than answer questions: it can query a database, drive a browser, work with GitHub or call your company's internal systems. Cherry Studio is an MCP client. You add MCP servers in settings, then let chats or agents use them.

## What problem MCP solves

Before MCP, every AI app needed its own integration for every tool. MCP standardizes that: a tool provider builds one MCP server, and any MCP client can connect to it.

Think of it as a USB port for AI:

| Role | What it is | Examples |
| --- | --- | --- |
| MCP server | Provides tools, resources and prompts | GitHub, Notion, databases, browsers, file systems |
| MCP client | Connects to servers and hands their tools to the model | Cherry Studio |
| Model | Decides when to call which tool | Models with tool calling, such as Claude, GPT, DeepSeek and Qwen |

## Add an MCP server in Cherry Studio

1. Open **Settings → MCP → MCP Servers** and click Add.
2. Fill in the configuration from the server's provider. Local servers need a command, arguments and environment variables (often an `npx` or `uvx` command); remote servers need an SSE or HTTP URL, and some need authorization.
3. Enable the server, wait until it shows as running, and open its details to see the tools, resources and prompts it offers.
4. In the agent's edit window, open **MCP** and enable only the servers that agent needs.

If you'd rather not write configuration by hand, start with **Built-in MCP** and the **Marketplace**. (Full steps: [MCP and external tools](/docs/en/advanced-basic/extensions/mcp/).)

![Cherry Studio Edit Agent window with built-in tools, knowledge, MCP and skills settings](/images/compare/manus-agent-tools.webp)

## A few practical examples

- **Query a project database**: an admin provides a read-only database MCP server, bound only to a "Data analysis" agent. It pulls data and writes a report to its working folder without touching production data.
- **Drive a browser**: connect a browser MCP server and let an agent open pages, take screenshots and collect competitor information.
- **Work with a code repository**: connect a GitHub MCP server and have an agent read issues, summarize pull requests and draft replies.

## When you don't need MCP

MCP is for connecting external systems. If you only want AI to follow fixed steps, a skill is enough. If you only want it to search your own documents, bind a knowledge base instead. Don't set up MCP just because it sounds more advanced.

## Things to watch

- **Keep approvals on** for tools that write data or cost money.
- **Bind only the servers you need.** More tools take up more context and make it easier for the model to pick the wrong one.
- **Protect keys.** Put API keys in the server's environment variables, never in prompts or screenshots.

If a server won't connect, check its logs first, then see [MCP troubleshooting](/docs/en/advanced-basic/extensions/mcp/troubleshooting/).

> **Download Cherry Studio and connect AI to your tools**
>
> Free and open source for Windows, macOS and Linux. Add MCP servers and hand them to agents: GitHub, databases, browsers and more.
>
> [Download free →](/download) · [MCP setup guide](/docs/en/advanced-basic/extensions/mcp/)

## FAQ

### How is MCP different from an API?

An API is defined by one service, so each one needs its own integration. MCP is a shared protocol: a tool provider implements it once and every MCP client can use it.

### Which models can use MCP?

Models that support tool calling (function calling), such as current versions of Claude, GPT, Gemini, DeepSeek and Qwen. Small models are less reliable at calling tools.

### The server shows as connected, but the agent can't find its tools. What now?

Check that the agent has the server enabled, that the tool isn't switched off, and that no permission request is waiting. After changing the agent's settings, send a new message so it reloads its tools.

### How is MCP different from Cherry Studio's API Gateway?

They work in opposite directions. MCP brings external tools into Cherry Studio; the API Gateway exposes Cherry Studio's models to other programs through a compatible API.
