---
icon: lightbulb
---
# 應用案例

這些案例展示如何將對話、Agent、知識庫、筆記、繪圖、翻譯、頻道、排程任務與多視窗組合為真正可交付的流程。案例中的設定為起點，實際使用時仍需依據資資敏感度、用量與團隊規範進行調整。

<figure><img src="../../../../assets/fcd8d884c9294cbc845fdf9c.webp" alt="應用案例 — 說明圖片"><figcaption><p>先使用真實素材人工跑通，再逐步加入知識庫、技能、MCP、頻道與排程任務。</p></figcaption></figure>

## 選擇一個案例

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>多模型研究覆盤</strong></td><td>內部資資、外部來源與衝突核對</td><td><a href="research-review.md">research-review.md</a></td></tr><tr><td><strong>長文件審閱</strong></td><td>依章節檢查並生成修訂稿</td><td><a href="long-document-review.md">long-document-review.md</a></td></tr><tr><td><strong>Agent 專案檔案交付</strong></td><td>控制目錄、權限與產出範圍</td><td><a href="project-delivery.md">project-delivery.md</a></td></tr><tr><td><strong>品牌配圖套件</strong></td><td>從視覺方向到多尺寸成圖</td><td><a href="brand-image-kit.md">brand-image-kit.md</a></td></tr><tr><td><strong>私有知識庫問答</strong></td><td>限定資資範圍並拒絕猜測</td><td><a href="private-knowledge-qa.md">private-knowledge-qa.md</a></td></tr><tr><td><strong>筆記生成週報</strong></td><td>從日常記錄到可核對週報</td><td><a href="notes-weekly-report.md">notes-weekly-report.md</a></td></tr><tr><td><strong>多語言資資整理</strong></td><td>術語、OCR、文件與一致性檢查</td><td><a href="multilingual-materials.md">multilingual-materials.md</a></td></tr><tr><td><strong>頻道與排程日報</strong></td><td>Agent、頻道、計畫與執行記錄</td><td><a href="automated-daily-report.md">automated-daily-report.md</a></td></tr><tr><td><strong>多視窗研究工作台</strong></td><td>同時保留資資、對比與執行任務</td><td><a href="multi-window-research.md">multi-window-research.md</a></td></tr></tbody></table>

## 通用建置順序

<figure><img src="../../../../assets/2573aee0510e0d6abdabab7f.webp" alt="應用案例 — 說明圖片"><figcaption><p>案例不是一組孤立設定，而是從輸入、執行、複核到交付的完整工作流。</p></figcaption></figure>

## 依工作選擇案例

| 你的任務 | 建議先看 | 主要能力 |
| ----------- | -------------- | -------------- |
| 比較觀點並保留研究過程 | 【多模型研究覆盤】 | 對話、分支、筆記 |
| 審閱大量資資並輸出意見 | 【長文件審閱】 | Agent、工作目錄、檔案 |
| 交付專案文件與產出 | 【Agent 專案檔案交付】 | Agent、狀態、檔案 |
| 生成一組風格統一的圖片 | 【品牌配圖套件】 | Agent 繪圖、繪圖模板 |
| 僅依內部資資回答 | 【私有知識庫問答】 | 知識庫、召回測試、Agent |
| 從零散記錄整理週報 | 【筆記生成週報】 | 筆記、Agent、檔案 |
| 整理多語言檔案 | 【多語言資資整理】 | 翻譯、Agent、工作目錄 |
| 排程發送固定報告 | 【頻道與排程日報】 | Agent、頻道、排程任務 |
| 同時觀察資資與長任務 | 【多視窗研究工作台】 | 分頁、多視窗、全域搜尋 |

{% stepper %}
{% step %}
### 1. 先定義交付物

說明最終要得到哪個檔案、表格、圖片或訊息，以及如何判定完成。
{% endstep %}

{% step %}
### 2. 在【工作】中手動跑通

驗證模型、提示詞、工作目錄與資資是否足夠。需要核准的操作逐項檢查。
{% endstep %}

{% step %}
### 3. 只沉澱穩定部分

重複步驟做成技能，長期資資放知識庫，臨時要求留在任務提示詞。
{% endstep %}

{% step %}
### 4. 最後增加外部連接與自動化

完成一次人工驗收後，再接入 MCP、頻道或排程任務，並保留失敗時的人工處理入口。
{% endstep %}
{% endstepper %}
