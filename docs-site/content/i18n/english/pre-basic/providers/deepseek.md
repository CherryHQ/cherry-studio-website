# DeepSeek

DeepSeek is one of the leading domestic large model providers, well-regarded for its V3 / R1 series in coding and reasoning tasks, with affordable pricing.

## Get API Key

* Register an account on the [DeepSeek Platform](https://platform.deepseek.com/)
* `API Keys` → `Create API Key`, copy the `sk-...` key
* Top up any amount (minimum ¥1 to activate)

## Configure in Cherry Studio

* Open `Settings → Model Provider`, find the **deepseek** Provider and enter the details page
* Enter your `sk-...` in **API Key**
* **API Base URL** defaults to `https://api.deepseek.com`, no modification needed
* Click **Fetch Model List**

## Recommended Usage

| Model | Suitable Scenarios |
| ------------------- | ---------------------------------- |
| `deepseek-chat` | General conversation, excellent cost-performance |
| `deepseek-reasoner` | Math, code, complex reasoning. Note: output includes `<thinking>` thinking blocks |

## Native Web Search

Models with web search capabilities in DeepSeek can directly use the provider's native network search. When selecting a model, check for the 🌐 icon next to the name; specific support may vary with provider updates, so do not rely solely on model names.

After enabling 🌐 in the conversation, if **Settings** → **Web Search** → **Prefer Configured Search Service** remains enabled, Cherry Studio will prioritize the configured search service. Disable this option to prioritize the model's native web search. See Web Search Mode.

## Pairing with Global Memory

DeepSeek does not have its own embedding models. If you want to use a knowledge base:

* Use an embedding model from another Provider (e.g., `bge-m3` from [SiliconFlow](siliconcloud.md) or `text-embedding-3-small` from [OpenAI](openai.md))
* You can still use DeepSeek for the chat model

{% hint style="info" %}
- DeepSeek pricing is token-based; cache hits can significantly reduce costs (refer to official documentation)
- `deepseek-reasoner` thinking content is rendered in the conversation by default; you can toggle "Auto-collapse thinking content" in [Chat Settings](../../cherrystudio/preview/chat.md#dui-hua-she-zhi)
{% endhint %}

***

### Get Help and Submit Feedback

If you have any questions, bugs, or feature improvement suggestions during configuration or usage, please refer to the official channels provided in [Feedback and Suggestions](../../question-contact/suggestions.md).
