# Free AI Models You Can Use in Cherry Studio

You don't have to pay to start using AI models. There's a free model built into the app, providers with free tiers, models marked free on OpenRouter, and open models you can run on your own computer. All of them work in Cherry Studio, and you can switch between them in one app.

## Free options at a glance

| Source | How it's free | Good for | Keep in mind |
| --- | --- | --- | --- |
| CherryAI | Built into Cherry Studio, no sign-up or API key | Trying the app, everyday questions | Currently Qwen3-8B, suited to basic tasks |
| OpenRouter | Some models have a free variant marked "free" | Trying many open models with one key | Free variants are rate-limited |
| Google Gemini | Free tier through Google AI Studio | Strong general-purpose model | Limits and data terms differ from the paid tier |
| Groq | Free tier with rate limits | Very fast open models | Daily and per-minute limits apply |
| Ollama / LM Studio | Runs on your own computer | Private or offline work | Needs capable hardware |

Free tiers and model lists change often, so check each provider's site before you rely on one.

## No sign-up: CherryAI

After installing Cherry Studio, CherryAI is already listed under **Settings → Model Provider**. Open a chat and start, without registering anywhere or entering an API key. It's a good way to get to know the app and handle everyday questions and simple text tasks. (See [CherryAI](/docs/en/pre-basic/providers/cherryai/).)

## Free tiers: OpenRouter, Gemini and Groq

For stronger models, sign up with one of these providers and paste the API key into Cherry Studio:

- **OpenRouter**: one key for hundreds of models; the ones ending in "free" cost nothing. ([OpenRouter setup](/docs/en/pre-basic/providers/openrouter/))
- **Google Gemini**: create a key in Google AI Studio and use the free tier. ([Gemini setup](/docs/en/pre-basic/providers/google-gemini/))
- **Groq**: very fast inference for open models, with a free tier. ([Groq setup](/docs/en/pre-basic/providers/groq/))

![Cherry Studio model provider settings listing several providers](/images/compare/chatgpt-model-providers.webp)

## Completely free and offline: local models

Run open models such as DeepSeek-R1 distills, Qwen or Llama on your own computer with Ollama or LM Studio. There are no usage limits and your data stays local. A GPU with 8 GB of VRAM, or a Mac with 16 GB of memory, handles 7B and 8B models. ([Ollama setup](/docs/en/pre-basic/providers/ollama/))

## Getting the most out of free models

- **Split the work**: use a free model for everyday questions and switch to a stronger one for hard problems. You can change models mid-conversation.
- **Ask several models at once**: free models have different strengths. Send one question to several of them and keep the best answer. ([Model comparison](/docs/en/advanced-basic/chat/model-compare-branches/))
- **Keep sensitive work local**: contracts and internal documents are safest with a local model.

> **Download Cherry Studio and start with free models right away**
>
> For Windows, macOS and Linux. A free model is built in, and OpenRouter, Gemini, Groq and local models plug into the same app.
>
> [Download free →](/download) · [Supported providers](/docs/en/pre-basic/providers/quick-reference/)

## FAQ

### How big is the gap between free and paid models?

For everyday questions, translation and rewriting, free models are usually enough. For complex reasoning, long-form writing and coding, the large paid models are clearly better. Start free and switch when you hit a wall.

### What if I run out of free usage?

Switch to another provider's free tier or to a local model. Add several providers in Cherry Studio and pick from the model menu.

### What hardware do local models need?

For 7B and 8B models, a GPU with 8 GB of VRAM or a Mac with 16 GB of memory runs smoothly. Larger models need more memory.

### Are free models safe to use?

With cloud models, your prompts go to that provider and are handled under its privacy policy; free tiers sometimes have different data terms. If your data shouldn't leave your computer, use a local model.
