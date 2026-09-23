# Groq

Groq（注意：不是 xAI 的 Grok）是一個以 **LPU 硬體加速、超低延遲** 見長的推理服務，主要託管 Llama / Mixtral / Whisper 等開源模型，輸出速度通常是普通雲推理的幾倍。

## 取得 API Key

* 前往 [GroqCloud](https://console.groq.com/) 註冊帳號
* `API Keys` → `Create API Key`，複製 `gsk_...` 金鑰

## 在 Cherry Studio 設定

* 開啟 `設定 → 模型服務`，找到 **Groq** Provider 進入詳細頁
* **API 金鑰** 填入 `gsk_...`
* **API 位址** 預設 `https://api.groq.com/openai/v1`，無需修改
* 點擊 **取得模型清單**

## 推薦用法

| 模型 | 適合場景 |
| ------------------------- | ---------- |
| `llama-3.3-70b-versatile` | 通用對話，速度極快 |
| `llama-3.1-8b-instant` | 簡單任務，毫秒級回應 |
| `mixtral-8x7b-32768` | 長上下文 |
| `whisper-large-v3` | 語音轉文字 |

## 適用場景

* **即時聊天機器人**：Groq 的「幾乎即時回應」很適合 IM 接入（搭配 [頻道](../../advanced-basic/automation/channels.md)）
* **大量並發**：每秒 token 數顯著高於普通雲推理
* **不追求模型最新**：Groq 主要託管 Llama 系等開源模型，沒有 GPT-5 / Claude-4 這種閉源模型

## 區分 Grok vs Groq

| | [Grok](grok.md) | Groq |
| -- | --------------- | --------------- |
| 公司 | xAI（馬斯克） | Groq Inc. |
| 主打 | 自研大模型 + 聯網 | LPU 硬體 + 開源模型推理 |
| 模型 | `grok-4` 等自研 | `llama-3.x` 等開源 |

{% hint style="warning" %}
Grok（xAI）和 Groq 經常被混淆。在 Cherry Studio Provider 清單中是兩個獨立項目，請注意區分。
{% endhint %}

***

### 取得協助與提交回饋

如果您在設定或使用過程中遇到任何疑問、Bug 或有功能改進建議，請參考 [回饋與建議](../../question-contact/suggestions.md) 中提供的官方管道。
