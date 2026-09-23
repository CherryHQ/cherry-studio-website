# Azure OpenAI

Azure OpenAI 是微軟在 Azure 上託管的 OpenAI 模型服務，適合需要企業合規、資資駐留承諾，或微軟生態的團隊。

## 前置準備

* 已開通 Azure 訂閱
* 已在 Azure Portal 中申請並通過 Azure OpenAI Service 存取審批
* 已建立至少一個 **資源（Resource）** 與 **部署（Deployment）**

## 取得 API Key

* Azure Portal → 你的 Azure OpenAI 資源 → `Keys and Endpoint`
* 複製 `KEY 1` 或 `KEY 2`，記下 `Endpoint`（形如 `https://<your-name>.openai.azure.com/`）

## 在 Cherry Studio 設定

* 開啟 `設定 → 模型服務`，找到 **Azure OpenAI** Provider 進入詳情頁
* **API 金鑰**：填入複製的 KEY
* **API 位址**：填入資源的 Endpoint（無需帶末尾路徑）
* **API Version**：在專屬欄位填入你的部署的 API 版本（例如 `2024-08-01-preview`）
* 點擊 **取得模型清單**，或手動新增你已在 Azure 上部署的模型名稱（即 Deployment Name，而非 OpenAI 原始模型 ID）

{% hint style="warning" %}
**Deployment Name vs Model ID**：Azure 使用的是你給部署起的名字（如 `gpt-4o-prod`），不是 `gpt-4o` 這種原始 ID。填錯會 404。
{% endhint %}

## 推薦用法

* **gpt-4o / gpt-4o-mini**：通用對話、Agent
* **gpt-4 turbo**：長上下文
* **text-embedding-3-**\*：嵌入模型，可用於知識庫

## 常見問題

* **401 Unauthorized**：檢查 Key 是否正確、Endpoint 末尾是否多餘斜槓
* **404 Not Found**：檢查 Deployment Name 是否與 Azure 上一致、API Version 是否填寫
* **429 Throttled**：檢查 Azure 配額（Quota & Limits 頁）

***

### 取得協助與提交回饋

如果您在設定或使用過程中遇到任何疑問、Bug 或有功能改進建議，請參考 [回饋與建議](../../question-contact/suggestions.md) 中提供的官方管道。
