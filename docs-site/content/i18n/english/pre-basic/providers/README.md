---
icon: cloud-plus
---

# Model Service Configuration

Cherry Studio ships with connection templates for 60+ providers (model service vendors), covering most mainstream models in China and abroad as well as local inference frameworks. This section provides a separate configuration guide for each provider.

### Provider Types

Cherry Studio groups providers by protocol into the following types, which behave slightly differently:

| Type | Compatible protocol | Typical examples |
|---|---|---|
| **OpenAI-compatible** | `/v1/chat/completions` | OpenAI, DeepSeek, SiliconFlow, OpenRouter, most third-party gateways |
| **Anthropic-compatible** | `/v1/messages` | Anthropic, CherryIN, some gateways. **Cherry Agent requires this type** |
| **Gemini** | Google AI Studio / Vertex | Google Gemini, Vertex AI |
| **Bedrock** | AWS Bedrock SDK | AWS Bedrock |
| **Azure OpenAI** | Azure OpenAI Service | Azure OpenAI |
| **Local inference** | Local HTTP service | Ollama, LM Studio, GPUStack, OpenVINO Model Server |
| **Special gateways** | Vendor-specific protocols | NewAPI, OneAPI, AiHubMix, DMXAPI, etc. |

### General Steps to Add a Provider

1. Open `Settings → Model Provider`
2. Find the provider in the built-in list and click it to open its details page
3. Enter the **API Key** (required) and change the **API Host** if needed (it defaults to the provider's official address)
4. Click **Sync models** and add the chat, embedding or vision models you use
5. (Optional) Click **Model Check** to verify the connection with any chat model

### Provider Guides

#### General / Gateways
* [CherryAI (Free)](cherryai)
* [CherryIN](cherryin-1.md) — dual endpoints (OpenAI + Anthropic), recommended for Cherry Agent
* [NewAPI](newapi.md) — self-hosted / third-party gateway

#### International Providers
* [OpenAI](openai.md)
* [Google Gemini](google-gemini.md)
* [Mistral](mistral.md)
* [Perplexity](perplexity.md)
* [GitHub Copilot](github-copilot.md)
* [MiniMax Coding Plan](minimax-coding-plan.md)

#### Chinese Providers
* [DeepSeek](deepseek.md)
* [ZhiPu (Z.ai)](zhipu.md)
* [Moonshot AI (Kimi)](moonshot.md)
* [MiniMax](minimax.md)
* [SiliconFlow](siliconcloud.md)

#### Local Inference
* [Ollama](ollama.md)

#### Custom Providers
* [Custom Provider](zi-ding-yi-fu-wu-shang.md) — any OpenAI / Anthropic / Gemini-compatible endpoint

{% hint style="info" %}
**Can't find the provider you use?**

Cherry Studio has templates for 60+ providers — **far more than this section currently documents**. If you use Anthropic (Claude), Azure OpenAI, DeepSeek, Grok, Groq, LM Studio, OpenRouter, Mistral, Perplexity, Together and others, **they are all in the provider list** — just add your key. Dedicated pages for these providers will be added over time.
{% endhint %}

### API Key and API Host

See [Model Service Settings](../settings/providers.md) for details, including advanced usage such as rotating multiple keys and ending the host with `#` to use a fixed path.

***

### Get Help and Submit Feedback

If you have any questions, bugs, or feature suggestions during configuration or use, please use the official channels listed in [Feedback and Suggestions](../../question-contact/suggestions.md).
