---
icon: code
---
# 開發與診斷

這組功能面向需要管理程式設計 CLI、讓其他本機程式呼叫模型，或排查請求問題的用戶。日常聊天和內容工作不需要開啟開發者模式。

### 兩個入口

| 入口 | 用途 | 使用前先確認 |
| ----------------- | ---------------------------- | -------------- |
| 啟動台【編碼搭檔】 | 安裝、設定和啟動常見程式設計 CLI | 安裝來源、模型連線與工作目錄 |
| 【設定】→【API 閘道】 | 向本機程式提供相容 API，也是 Agent 的執行依賴 | 狀態、埠號與金鑰安全 |
| 【設定】→【一般】→【開發者模式】 | 檢視呼叫鏈，定位模型與工具錯誤 | 日誌中可能含敏感內容 |

<figure><img src="../../../../assets/1fc9d6c1360e640958305d57.webp" alt="開發與診斷 — 說明圖片"><figcaption><p>API 閘道頁面集中顯示執行狀態、位址、埠號和憑證。</p></figcaption></figure>

{% hint style="warning" %}
API 閘道的金鑰和呼叫鏈中的請求內容都可能涉及敏感資訊。截圖、Issue 和群聊中只分享已遮蔽的必要片段。
{% endhint %}

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>API 閘道</strong></td><td>理解 Agent 依賴與本機 API 呼叫</td><td><a href="api-gateway.md">api-gateway.md</a></td></tr><tr><td><strong>呼叫鏈與開發者模式</strong></td><td>重現並定位一次具體請求</td><td><a href="trace.md">trace.md</a></td></tr></tbody></table>
