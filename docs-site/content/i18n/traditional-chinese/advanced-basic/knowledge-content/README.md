---
icon: brain
---
# 知識與內容工作流

知識庫、筆記、繪圖和翻譯不是彼此孤立的工具。它們分別負責整理資資、沉澱內容、製作視覺素材和處理多語言文件，並且都能繼續交給 Agent 使用。

<figure><img src="../../../../assets/31b376b5d5a233eeb71ddf12.webp" alt="知識與內容工作流 — 說明圖片"><figcaption><p>先用真實問題通過召回測試，再讓 Agent 根據資資製作報告、譯文或配圖。</p></figcaption></figure>

## 四個入口怎麼分工

| 入口 | 適合做什麼 | 常見下一步 |
| ----- | ---------------------- | -------------- |
| 【知識庫】 | 讓資資可以按問題檢索 | 綁定給對話助手或 Agent |
| 【筆記】 | 撰寫、整理和長期維護 Markdown 內容 | 匯出文件或加入知識庫 |
| 【繪圖】 | 生成、編輯、合併和增強圖片 | 下載，或交給內容任務使用 |
| 【翻譯】 | 處理文本、圖片和文件 | 收藏結果、重用歷史或繼續編輯 |

{% hint style="success" %}
如果目標是「用這些資資完成一份交付物」，直接在【工作】中告訴 Agent 資資在哪裡、要產出什麼。需要人工整理資資庫、調整圖片或逐段確認譯文時，再進入對應模組。
{% endhint %}

<figure><img src="../../../../assets/203ae7d1fc3c8b76bd8af0a8.webp" alt="知識與內容工作流 — 說明圖片"><figcaption><p>新建知識庫時先命名，再選擇用於檢索的嵌入模型。</p></figcaption></figure>

## 從資資到交付物

{% stepper %}
{% step %}
### 1. 先整理來源

把長期參考資資加入知識庫，把正在修改的草稿放在筆記或工作目錄。不要把未確認的臨時聊天全部匯入知識庫。
{% endstep %}

{% step %}
### 2. 驗證能否找回關鍵資訊

在知識庫中使用召回測試，確認真實問題能找到正確片段。檢索不到時先修資資和設定，不讓 Agent 猜。
{% endstep %}

{% step %}
### 3. 再製作文字、譯文和圖片

讓 Agent 根據資資起草內容；圖片和譯文分別在【繪圖】與【翻譯】中精修。最後由人檢查事實與表達。
{% endstep %}
{% endstepper %}

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>構建知識庫與召回測試</strong></td><td>從匯入資資到驗證檢索</td><td><a href="knowledge-base.md">knowledge-base.md</a></td></tr><tr><td><strong>筆記、知識庫與 Agent</strong></td><td>讓草稿、資資和任務順暢流轉</td><td><a href="notes-knowledge-agent.md">notes-knowledge-agent.md</a></td></tr><tr><td><strong>圖片生成、編輯與增強</strong></td><td>從模板出發製作可用圖片</td><td><a href="painting-workflow.md">painting-workflow.md</a></td></tr><tr><td><strong>文件、圖片與長文翻譯</strong></td><td>處理不同格式並重用歷史結果</td><td><a href="translation-workflow.md">translation-workflow.md</a></td></tr></tbody></table>
