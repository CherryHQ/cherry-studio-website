# Cherry Studio vs Chatbox: Which AI Desktop Client Fits You?

Chatbox and Cherry Studio do the same basic job: they put GPT, Claude, Gemini, DeepSeek and other models into one desktop app that runs on your own API keys. The differences show up in three places: how far the agent can go, how much control you get over MCP tools and knowledge bases, and how much of the app is open source.

## Quick comparison

| | Cherry Studio | Chatbox |
| --- | --- | --- |
| Open source | The whole app (AGPL) | The Community Edition (GPLv3) |
| MCP | Add any MCP server and configure it yourself | Supported, including MCP servers in Agent Mode |
| Knowledge base | Local, with your choice of embedding model and recall testing | Desktop knowledge base |
| Agents | Work in a local folder, with skills, MCP, scheduled tasks and channel triggers | Agent Mode with code execution, skills, MCP and knowledge bases |
| Local models | Ollama, LM Studio | Ollama |

![Cherry Studio model provider settings listing models from Anthropic, DeepSeek and other providers](/images/compare/chatgpt-model-providers.webp)

## Agents that work on your actual files

Chatbox's Agent Mode can run code and call skills and MCP tools. Cherry Studio's agents go a step further: point one at a local folder and it reads and writes the real files there, so it can sort research, edit documents in bulk or build reports. Tasks can run on a schedule or be triggered by messages from a channel. (See [Agent workspace](/docs/en/advanced-basic/agent-workspace/).)

![Cherry Studio agent workspace with an agent opening and editing a document from a local folder](/images/compare/chatbox-agent.webp)

## Ask several models at once

Different models often give very different answers. Cherry Studio can send one prompt to several models and show the replies side by side, so you can see which one suits the task. (See [Model comparison](/docs/en/advanced-basic/chat/model-compare-branches/).)

## A knowledge base that stays on your computer

Both apps have a desktop knowledge base. In Cherry Studio you pick the embedding model, so with a local embedding model in Ollama your documents never leave your machine. A recall test shows which passages the model will read before you ask. (See [Create a knowledge base](/docs/en/knowledge-base/create/).)

## Which one should you pick?

Choose Cherry Studio if you want to pick your own MCP tools and embedding models, or want an agent that works directly on local files. The whole app is open source, so anyone can read the code.

Choose Chatbox if you want something that works out of the box and would rather not deal with settings like MCP servers or embedding models.

> **Switching from Chatbox takes a few minutes**
>
> Download Cherry Studio for free, paste in the API keys you already use, and start using MCP, knowledge bases and agents right away.
>
> [Download free →](/download) · [Supported providers](/docs/en/pre-basic/providers/quick-reference/)

## FAQ

### Can I reuse my Chatbox API keys in Cherry Studio?

Yes. Keys from OpenAI, Anthropic, DeepSeek and other providers aren't tied to a client. Add them under Model Provider settings.

### Which MCP servers can I use in Cherry Studio?

Any MCP server, such as GitHub, Notion, a database or a browser. Add it in settings and use it in chats and agents. (See [MCP](/docs/en/advanced-basic/extensions/mcp/).)
