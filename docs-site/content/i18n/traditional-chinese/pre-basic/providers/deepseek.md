# DeepSeek

DeepSeek 是國內主流大模型廠商之一，以 V3 / R1 系列在程式設計與推理任務上享有盛譽，且價格親民。

## 取得 API Key

* 前往 [DeepSeek Platform](https://platform.deepseek.com/) 註冊帳號
* `API Keys` → `创建 API Key`，複製 `sk-...` 金鑰
* 儲值任意金額（最低 ¥1 即可開通）

## 在 Cherry Studio 中設定

* 開啟 `設定 → 模型服務`，找到 **deepseek** Provider 進入詳細頁面
* **API 金鑰** 填入 `sk-...`
* **API 位址** 預設為 `https://api.deepseek.com`，無需修改
* 點擊 **取得模型清單**

## 推薦用法

| 模型 | 適合場景 |
| ------------------- | ---------------------------------- |
| `deepseek-chat` | 通用對話，性價比極高 |
| `deepseek-reasoner` | 數學、程式碼、複雜推理。注意輸出會帶 `<thinking>` 思考區塊 |

## 原生聯網

DeepSeek 中支援聯網能力的模型可以直接使用服務商原生網路搜尋。選擇模型時查看名稱旁是否有 🌐 圖示；具體支援範圍可能隨服務商更新，不建議只按模型名稱判斷。

在對話中開啟 🌐 後，如果【設定】→【網路搜尋】裡的【優先使用已設定的搜尋服務】保持開啟，Cherry Studio 會優先使用已設定的搜尋服務；關閉該選項後，才會優先使用模型原生聯網。詳見 聯網模式。

## 與全域記憶的搭配

DeepSeek 自家沒有嵌入模型。如果你要用知識庫：

* 嵌入模型推薦用其他 Provider 的（如 [硅基流動](siliconcloud.md) 的 `bge-m3` 或 [OpenAI](openai.md) 的 `text-embedding-3-small`）
* 對話模型仍可用 DeepSeek

{% hint style="info" %}
- DeepSeek 價格按 token 計費，快取命中可大幅降價（參考其官方文件）
- `deepseek-reasoner` 的思考內容預設會渲染在對話中，可在 [對話設定](../../cherrystudio/preview/chat.md#dui-hua-she-zhi) 中切換「思考內容自動摺疊」
{% endhint %}

***

### 取得協助與提交回饋

如果您在設定或使用過程中遇到任何疑問、Bug 或有功能改進建議，請參考 [回饋與建議](../../question-contact/suggestions.md) 中提供的官方管道。
