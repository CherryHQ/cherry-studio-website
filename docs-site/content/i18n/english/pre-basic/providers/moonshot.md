# Moonshot AI (Kimi)

Moonshot AI is a prominent domestic large model team. Its flagship product, **Kimi**, is known for its **ultra-long context** (up to 2 million characters), making it ideal for processing large documents or code snippets.

## Get API Key

* Register an account on the [Moonshot Open Platform](https://platform.moonshot.cn/)
* Go to `API Key management` to create a `sk-...` key
* Top up any amount to activate (minimum is very low)

## Configure in Cherry Studio

* Open `Settings → Model Provider`, find the **Moonshot AI** Provider, and enter the details page
* Enter your `sk-...` key
* The API address defaults to `https://api.moonshot.cn`
* Click **Sync models**

## Recommended Usage

| Model | Suitable Scenarios |
|---|---|
| `moonshot-v1-8k` | Short context, cheap and fast |
| `moonshot-v1-32k` | Medium context, sufficient for daily use |
| `moonshot-v1-128k` | Long context, document analysis, code review |
| `kimi-k2-* / k2.5-*` | Latest flagship, stronger reasoning capabilities |

## Suitable Scenarios

* **Ultra-long PDF / Document Analysis**: Moonshot's long-context advantage is most evident here
* **Large Code Review**: You can input complete files at once without splitting
* **E-book Summarization**: Long-context models eliminate the need for manual chunking

{% hint style="info" %}
* Moonshot's "context caching" feature can significantly reduce token consumption for repeated conversations. Refer to their official documentation
* Kimi has its own web interface, but connecting via Cherry Studio API allows you to leverage Cherry Studio's extensions, such as assistants, knowledge bases, and MCP tools
{% endhint %}

***

### Get Help and Submit Feedback

If you have any questions, bugs, or feature improvement suggestions during configuration or usage, please refer to the official channels provided in [Feedback and Suggestions](../../question-contact/suggestions.md).
