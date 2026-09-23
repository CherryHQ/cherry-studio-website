# MiniMax Coding Plan

**Coding Plan** 是 MiniMax 推出的高性價比程式設計訂閱服務（如 Starter/Plus 方案）。透過在 Cherry Studio 中設定該方案，你可以以極低的固定成本（最低 ¥29/月）使用 `MiniMax-M2.1` 模型。

{% hint style="success" %}
**核心優勢**

* **適用對象**：擁有 MiniMax Coding Plan 訂閱（Starter / Plus / Max）的使用者。
* **計費模式**：按時段刷新額度（如每 5 小時 40 次 Prompt），而非按 Token 計費，無需擔心消耗過快。
{% endhint %}

### 1. 準備工作

在開始之前，請確保你已經購買了方案並取得了金鑰：

1. 登入 [**MiniMax 開放平台**](https://platform.minimaxi.com/)。
2. 進入 [**Coding Plan** 頁面](https://platform.minimaxi.com/subscribe/coding-plan?code=FYWiC6CtHy\&source=link)，確保方案已生效。

    <figure><img src="../../../../assets/e7c5f78ce7b02d24f47e524a.png" alt=""><figcaption></figcaption></figure>
3. 在 **Coding Plan** 中複製你的專屬 `API Key`（以 `sk-` 開頭）。

<figure><img src="../../../../assets/b7ad13e5818755c159e9cc7d.webp" alt=""><figcaption></figcaption></figure>

### 2. 設定步驟

#### 第一步：定位服務供應商

進入 Cherry Studio，點擊側邊欄的 **設定** > **模型服務**，在清單中找到 **MiniMax**。

{% hint style="info" %}
如果清單較長，可以在頂部的搜尋框輸入 `mini` 快速定位。
{% endhint %}

#### 第二步：填寫設定

**不需要** 修改複雜的 API 位址，使用預設設定即可，請參考以下說明填寫：

<table><thead><tr><th width="128.20703125">參數項</th><th>填寫說明</th></tr></thead><tbody><tr><td><strong>API Key</strong></td><td>貼上你的 Coding Plan 專屬金鑰<br><em>(注意：必須是購買方案後產生的 Key，不要有多餘空格)</em></td></tr><tr><td><strong>API 位址</strong></td><td>保持預設 <code>https://api.minimaxi.com/v1</code></td></tr><tr><td><strong>開關</strong></td><td>點擊右上角開關，確保為 <strong>綠色 (ON)</strong></td></tr></tbody></table>

<figure><img src="../../../../assets/d85a4215a6223242d859fc63.webp" alt=""><figcaption></figcaption></figure>

#### 第三步：新增指定模型 (關鍵)

Coding Plan 方案僅支援特定的模型，選錯模型將無法使用或產生額外費用。

1. 點擊設定頁底部的 **管理 (Manage)** 按鈕。

<figure><img src="../../../../assets/a47dc9b50635537d2cca507d.png" alt=""><figcaption></figcaption></figure>

2. 在清單中找到並新增 **`MiniMax M2.1`**。

{% hint style="warning" %}
**請務必選擇正確模型！**

* ✅ **推薦**：`MiniMax M2.1` (Coding Plan 指定主力模型)。
{% endhint %}

#### 第四步：儲存並驗證 <a href="#headingcab61b6e3e264a4b8e56bc83923488d2-di-si-bu-bao-cun-bing-yan-zheng-0" id="headingcab61b6e3e264a4b8e56bc83923488d2-di-si-bu-bao-cun-bing-yan-zheng-0"></a>

1. 點擊 API 金鑰輸入框旁邊的 **檢測 (Check)** 按鈕。
2. 如果顯示綠色 **Success**，說明你的 Coding Plan 方案已成功連線！

### 3. 用量與限制說明

Coding Plan 與一般 API 的計費模式完全不同，請務必理解以下機制：

{% hint style="info" %}
**額度刷新機制** Coding Plan 的額度是 **週期性刷新** 的。例如 Starter 方案：**每 5 小時** 提供 **40 次** 對話額度。

* **如果不回覆了**：說明你當前 5 小時的額度已耗盡。
* **解決辦法**：休息幾個小時，等待額度自動恢復即可，無需額外付費。
{% endhint %}

### 4. 常見問題排查

{% hint style="danger" %}
**遇到 `429 Too Many Requests` 報錯？**

這不是軟體故障，而是觸發了 **Coding Plan 的頻控限制**。

* 這表示您目前時段的「發送訊息次數」已用完。
* 請耐心等待下一個 5 小時週期刷新。
{% endhint %}

{% hint style="warning" %}
**遇到 `401 Unauthorized` 錯誤？**

* 檢查 API Key 是否有多餘的空格。
* 登入 MiniMax 官方網站，確認您的 Coding Plan 訂閱是否已過期。
{% endhint %}

***

### 取得協助與提交回饋

如果您在設定或使用過程中遇到任何疑問、Bug 或有功能改進建議，請參考 [回饋與建議](../../question-contact/suggestions.md) 中提供的官方管道。
