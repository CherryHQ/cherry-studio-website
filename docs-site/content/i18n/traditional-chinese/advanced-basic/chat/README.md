---
icon: comments
---
# 對話進階

【對話】適合邊交流邊整理思路。除了單模型問答，還可以並排比較多個模型、從任意訊息建立分支、管理長對話上下文，並將回覆中的檔案、圖片、程式碼和引用作為產物繼續使用。

{% hint style="info" %}
如果任務需要連續讀寫本機檔案、呼叫多種工具或長時間執行，改用【工作】中的 Agent。對話更適合討論、比較和定稿，Agent 更適合執行。
{% endhint %}

<figure><img src="../../../../assets/5c0f5f563432facacf7942d6.webp" alt="對話進階 — 說明圖片"><figcaption><p>問題和輸出要求先寫完整；只有需要交叉驗證時再增加模型比較或訊息分支。</p></figcaption></figure>

## 依目標選擇能力

| 目標 | 建議做法 |
| ------------- | --------------------- |
| 比較不同模型的觀點 | 在輸入區選擇多個模型後發送同一個問題 |
| 保留原討論並探索另一條思路 | 從關鍵訊息建立分支 |
| 繼續很長的討論 | 查看上下文用量，必要時總結後新開話題 |
| 讓下一條問題稍後發送 | 使用訊息佇列，不必打斷目前回覆 |
| 繼續處理回覆中的檔案或程式碼 | 開啟產物預覽，再下載、複製或在新任務中繼續 |

<figure><img src="../../../../assets/290e0288048d57cd868cb443.webp" alt="對話進階 — 說明圖片"><figcaption><p>模型選擇器可以為同一個問題選擇一個或多個模型。</p></figcaption></figure>

## 建議順序

{% stepper %}
{% step %}
### 1. 先把問題寫完整

說明目標、材資、限制和希望的輸出方式。多個模型只會放大原問題的差異，不會自動補齊缺少的資訊。
{% endstep %}

{% step %}
### 2. 再決定是否需要比較

需要不同視角時再選多個模型。日常問答保持單模型，介面更清楚，用量也更容易控制。
{% endstep %}

{% step %}
### 3. 把有效結論沉澱下來

可重用的資資存入筆記或知識庫；需要繼續執行的工作交給 Agent，並附上已經確認的結論。
{% endstep %}
{% endstepper %}

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>多模型對比與訊息分支</strong></td><td>比較答案，同時保留探索路徑</td><td><a href="model-compare-branches.md">model-compare-branches.md</a></td></tr><tr><td><strong>長對話、上下文與排隊訊息</strong></td><td>讓長對話保持清楚、可控</td><td><a href="context-queue.md">context-queue.md</a></td></tr><tr><td><strong>產物、引用與匯出</strong></td><td>檢查並帶走真正有用的結果</td><td><a href="artifacts-export.md">artifacts-export.md</a></td></tr></tbody></table>
