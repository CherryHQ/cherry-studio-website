# OpenRouter

OpenRouter 是一個 **統一閘道**，使用一把金鑰即可接入 200+ 家廠商的對話模型（GPT、Claude、Gemini、Llama、DeepSeek 等），按 token 計費，適合需要多模型對比或無法逐一註冊各家帳號的使用者。

## 取得 API Key

* 前往 [OpenRouter](https://openrouter.ai/) 註冊帳號
* `Settings → Keys` → `Create Key`，複製 `sk-or-...` 金鑰
* 儲值任意金額（最低 $1）

## 在 Cherry Studio 中設定

* 開啟 `設定 → 模型服務`，找到 **OpenRouter** Provider 進入詳細頁面
* **API 金鑰** 填入 `sk-or-...`
* **API 位址** 預設為 `https://openrouter.ai/api`，無需修改
* 點擊 **取得模型清單**，OpenRouter 會回傳數百個可用模型

## 推薦用法

OpenRouter 的模型 ID 格式如 `<vendor>/<model>`：

| 模型 ID 範例 | 實際是哪個模型 |
| ----------------------------------- | ------------------------- |
| `openai/gpt-4o` | OpenAI GPT-4o |
| `anthropic/claude-sonnet-4` | Anthropic Claude Sonnet 4 |
| `google/gemini-2.0-flash` | Google Gemini Flash |
| `meta-llama/llama-3.3-70b-instruct` | Meta Llama 3.3 70B |
| `deepseek/deepseek-chat` | DeepSeek V3 |
| `x-ai/grok-4` | xAI Grok |

## 適用情境

* **多模型 A/B 對比**：在同一個 Cherry Studio Provider 下隨意切換模型，無需切換 Provider
* **避免逐一註冊**：一把金鑰、一張發票即可使用 200+ 模型
* **小眾模型**：許多小型廠商僅在 OpenRouter 上提供服務（如 Cohere、Reka 等）

## 原生聯網與網址讀取

OpenRouter 的對話模型可使用原生網路搜尋和 URL 內容讀取。選擇模型時查看名稱旁的 🌐 圖示，並在對話輸入欄開啟 🌐。

如果【設定】→【網路搜尋】中的【優先使用已設定的搜尋服務】保持開啟，Cherry Studio 會優先使用外部搜尋服務；關閉該選項後，才會優先使用 OpenRouter 的模型原生能力。服務商可能對聯網請求單獨計費，實際費用以 OpenRouter 帳單為準。

## 與 Anthropic 協定的關係

OpenRouter 預設使用 OpenAI 協定格式封裝所有上游模型。這意味著：

* ✅ 一般對話、知識庫、快捷助手皆可正常使用
* ⚠️ [Cherry Agent](../../advanced-basic/agent.md) **建議直接使用** Anthropic / CherryIN，不要透過 OpenRouter（Agent 需要 Anthropic 原生協定）

{% hint style="info" %}
- OpenRouter 在原廠價格基礎上有少量加價（通常 5-10%），換取「一個帳號通用」的便利性
- 部分模型可使用 "free" 版本（免費但有限速），篩選時注意帶有 `(free)` 後綴的項目
- 詳細價格表請見 [OpenRouter Models](https://openrouter.ai/models)
{% endhint %}

***

### 取得協助與提交回饋

如果您在設定或使用過程中遇到任何疑問、Bug 或有功能改進建議，請參考 [回饋與建議](../../question-contact/suggestions.md) 中提供的官方管道。
