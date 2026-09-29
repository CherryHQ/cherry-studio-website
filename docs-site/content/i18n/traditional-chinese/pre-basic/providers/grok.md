# Grok

Grok 是 xAI 推出的大型模型，以「語氣更隨性 + 接入 X (Twitter) 即時數據」著稱。

## 取得 API Key

* 前往 [xAI Console](https://console.x.ai/) 註冊帳號
* `API Keys` → `Create API Key`，複製 `xai-...` 金鑰

## 在 Cherry Studio 中設定

* 開啟 `設定 → 模型服務`，找到 **Grok** Provider 進入詳細頁面
* **API 金鑰** 填入 `xai-...`
* **API 位址** 預設為 `https://api.x.ai`，無需修改
* 點擊 **取得模型清單**，新增 `grok-4`、`grok-4-fast` 等模型

## 推薦用法

| 模型 | 適用情境 |
|---|---|
| `grok-4` | 綜合能力最強，複雜任務首選 |
| `grok-4-fast` | 高吞吐量、低延遲情境 |
| `grok-3-mini` | 低成本日常對話 |

## 聯網搜尋

部分 Grok 模型內建聯網功能，模型名稱後會顯示小地球圖示。可直接在對話框開啟「聯網」使用，詳見 [聯網模式](../websearch)。

{% hint style="info" %}
* Grok 需透過海外網路存取，國內使用者請設定代理
* xAI 提供免費額度（按月重置），日常體驗足夠
{% endhint %}

***

### 取得協助與提交回饋

如果您在設定或使用過程中遇到任何疑問、Bug 或有功能改進建議，請參考 [回饋與建議](../../question-contact/suggestions.md) 中提供的官方管道。
