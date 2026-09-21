# Moonshot AI (Kimi)

Moonshot AI 是國內知名大模型團隊，主打產品是 **Kimi**，以 **超長上下文**（最長可達 200 萬字）見長，適合塞入大段文件 / 程式碼讓 AI 協助處理。

## 取得 API Key

* 前往 [Moonshot 開放平台](https://platform.moonshot.cn/) 註冊帳號
* 進入 `API Key 管理` 建立 `sk-...` 金鑰
* 儲值任意金額開通（最低金額很少）

## 在 Cherry Studio 設定

* 開啟 `設定 → 模型服務`，找到 **Moonshot AI** Provider 進入詳細頁面
* 填入 `sk-...` 金鑰
* API 位址預設為 `https://api.moonshot.cn`
* 點擊 **取得模型清單**

## 推薦用法

| 模型 | 適合場景 |
|---|---|
| `moonshot-v1-8k` | 短上下文，便宜快速 |
| `moonshot-v1-32k` | 中等上下文，日常足夠 |
| `moonshot-v1-128k` | 長上下文，文件分析、程式碼審查 |
| `kimi-k2-* / k2.5-*` | 最新旗艦，推理能力更強 |

## 適合的場景

* **超長 PDF / 文件分析**：Moonshot 長上下文優勢最明顯
* **大段程式碼審查**：可以一次塞入完整檔案不需切分
* **整本電子書摘要**：長上下文模型省去手動切片的麻煩

{% hint style="info" %}
* Moonshot 的「上下文快取」功能可顯著降低重複對話的 token 消耗，參考其官方文件
* Kimi 在網頁端有自己的對話介面，但透過 Cherry Studio 接入 API 可以使用 Cherry Studio 的助手、知識庫、MCP 工具等擴充功能
{% endhint %}

***

### 取得協助與提交回饋

如果您在設定或使用過程中遇到任何疑問、Bug 或有功能改進建議，請參考 [回饋與建議](../../question-contact/suggestions.md) 中提供的官方管道。
