---
icon: plug
---
# 擴展 Agent 的能力

Agent 已內建檔案、搜尋、圖片、記憶、工作流、排程任務等工具。需要固定工作方法時新增技能，需要連接外部系統時新增 MCP。兩者解決的問題不同，不必為了「功能更多」而全部安裝。

<figure><img src="../../../../assets/cc38d8a6378ca8270ceda746.webp" alt="擴展 Agent 的能力 — 說明圖片"><figcaption><p>優先使用最短路徑；只有 Agent 確實需要存取外部系統時才新增 MCP。</p></figcaption></figure>

## 先判斷需要什麼

| 需求 | 選擇 |
| ----------------- | ---------- |
| 固定一套步驟、範本或檢查清單 | 技能 |
| 查詢資資庫、瀏覽器或第三方系統 | MCP |
| 檢索自己的文件資資 | 知識庫 |
| 讀寫目前專案檔案、產生圖片或發送通知 | Agent 內建工具 |

{% hint style="success" %}
最方便的做法是直接在【工作】中描述目標，讓 Agent 幫你判斷缺少的是技能、MCP 還是知識庫。需要核對來源、連接參數或權限時，再到【設定】手動管理。
{% endhint %}

## 安裝後的最後一步

全域安裝或連接成功，不代表每個 Agent 都能使用。開啟【工作】→ Agent 選單→【編輯】，分別在【技能】、【MCP】或【知識庫】中進行選擇。設定從下一則訊息開始生效。

<figure><img src="../../../../assets/6be829efa6152cf0a3576cba.webp" alt="擴展 Agent 的能力 — 說明圖片"><figcaption><p>Agent 的內建工具、知識庫、MCP 和技能分別設定，依任務需求啟用。</p></figcaption></figure>

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>技能與能力庫</strong></td><td>安裝並重用穩定工作方法</td><td><a href="skills.md">skills.md</a></td></tr><tr><td><strong>MCP 與外部工具</strong></td><td>連接額外工具和資資來源</td><td><a href="../../../../advanced-basic/extensions/mcp">mcp</a></td></tr><tr><td><strong>MCP 除錯</strong></td><td>依連接鏈路逐步定位問題</td><td><a href="mcp/troubleshooting.md">troubleshooting.md</a></td></tr></tbody></table>
