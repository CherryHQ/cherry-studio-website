---
icon: circle-question
---
# 常見問題

遇到知識庫問題時，先判斷失敗發生在匯入、解析、分塊、召回還是回答層。一次只改變一個變數，才能知道哪項調整真正有效。

{% hint style="info" %}
最快的定位方法是用同一個真實問題貫穿檢查：正文有沒有答案、Chunk 是否完整、召回是否正確、回答是否忠於來源。
{% endhint %}

## 5 步快速定位

{% stepper %}
{% step %}
### 1. 檢查資資狀態

資資應為【就緒】。如果長期處理中或顯示錯誤，先查看錯誤訊息，並確認檔案、處理器與模型服務可用。
{% endstep %}

{% step %}
### 2. 檢查解析正文

開啟正文預覽，確認答案確實存在，掃描文字已經識別，雙欄和表格沒有錯序。
{% endstep %}

{% step %}
### 3. 檢查 Chunks

確認問題需要的條件和結論位於可理解的片段中；不要讓頁眉、頁腳和目錄佔滿結果。

<figure><img src="../../../assets/5bd8c12bd8d08e785c6a4c42.webp" alt="常見問題 — 說明圖片"><figcaption><p>正文正確但片段不完整時，再調整分塊，並重新索引舊資資。</p></figcaption></figure>
{% endstep %}

{% step %}
### 4. 執行召回測試

檢查來源名稱、相關度和片段內容。完全沒有正確片段與正確片段排序靠後，是兩類不同問題。

<figure><img src="../../../assets/b44776524449cdefe62eaed3.webp" alt="常見問題 — 說明圖片"><figcaption><p>先證明檢索層返回了正確證據，再調整對話提示詞。</p></figcaption></figure>
{% endstep %}

{% step %}
### 5. 檢查對話或 Agent

召回正確但回答錯誤時，確認已選擇或綁定知識庫，要求只依據來源回答，並把問題拆成更小的事實項。
{% endstep %}
{% endstepper %}

## 問題應該回饋到哪裡

<figure><img src="../../../assets/66f4111676793ffe87e7a979.webp" alt="常見問題 — 說明圖片"><figcaption><p>先完成最小排查；可穩定重現時附上脫敏步驟、錯誤和預期結果。</p></figcaption></figure>

{% hint style="danger" %}
截圖、日誌和示例資資中不要公開 API Key、內部檔案內容、電子郵件或本地敏感路徑。
{% endhint %}

## 建立與匯入

<details>

<summary>沒有嵌入模型能建立知識庫嗎？</summary>

可以。選擇【不使用】後仍會使用 BM25 關鍵詞檢索。需要匹配不同表達時再增加嵌入模型。

</details>

<details>

<summary>支援哪些來源和檔案格式？</summary>

來源包括檔案、Cherry Studio 筆記、本地目錄和網頁連結。檔案格式包括 PDF、DOCX、DOC、PPTX、XLSX、XLS、Markdown、TXT、CSV、HTML 和 EPUB。

</details>

<details>

<summary>一次可以新增多少項？</summary>

一次互動式選擇最多 20 項。更多資資可以分批新增，或使用目錄入口。

</details>

<details>

<summary>同名資資選【全部保留】還是【取代】？</summary>

更新制度、手冊或筆記快照時通常選【取代】。只有確實需要並存的版本才選【全部保留】，並在名稱中加入日期或版本。

</details>

<details>

<summary>資資一直停在處理中怎麼辦？</summary>

檢查檔案能否開啟、處理器和 OCR 是否可用、模型服務是否已設定。根據錯誤訊息判斷失敗在讀取、解析還是嵌入階段。

</details>

## 解析與召回

<details>

<summary>掃描 PDF 為什麼沒有文字？</summary>

掃描件需要 OCR。開啟【設定】→【文件處理】選擇可用 OCR，再重新索引文件。複雜版式可嘗試專用文件處理器。

</details>

<details>

<summary>修改 Chunk 設定後為什麼結果沒變化？</summary>

新設定不會自動重做舊資資。對相關項目執行【重新索引】，再用同一問題複測。

</details>

<details>

<summary>召回測試完全沒有結果怎麼辦？</summary>

依序檢查資資狀態、正文是否包含答案、原文關鍵詞能否命中、嵌入是否完成、重排閾值是否過高，以及 Top K 是否過小。

</details>

<details>

<summary>來源正確但片段不完整怎麼辦？</summary>

查看 Chunks，確認條件與結論是否被切開。適當增大 Chunk 或重疊，或把結構混亂的源資資整理成清晰筆記後重新索引。

</details>

<details>

<summary>正確結果排得太後怎麼辦？</summary>

先刪除重複和過期資資，再考慮嵌入模型。候選大致正確但順序不穩時，可以增加重排並重新調節閾值。

</details>

<details>

<summary>Top K 應該設定多少？</summary>

可以從 6 開始，用固定問題比較漏召回、雜訊和耗時。Top K 可在 1～50 之間調整，不要把調大當成通用修復。

</details>

## 對話與 Agent

<details>

<summary>對話中的知識庫入口不可用怎麼辦？</summary>

選擇支援工具呼叫的模型，並移除目前訊息附件。還要確認至少有一個知識庫包含就緒資資。

</details>

<details>

<summary>回答沒有顯示來源怎麼辦？</summary>

確認輸入區確實選中了知識庫，再把相同問題放入召回測試。召回沒有正確片段時先修復知識庫。

</details>

<details>

<summary>召回正確，回答仍然不準怎麼辦？</summary>

要求模型只依據引用回答，把任務拆成更小的事實項，並人工核對重要結論。此時問題通常在提示詞、模型或上下文組織。

</details>

<details>

<summary>Agent 為什麼看不到知識庫？</summary>

開啟【編輯智能體】→【知識庫】，把目標庫綁定到目前 Agent，並在【內建工具】中啟用【知識庫搜尋】。

</details>

<details>

<summary>知識庫管理會改變資資嗎？</summary>

會。【知識庫管理】支援新增、刪除或刷新文件。唯讀任務不要啟用；寫操作前檢查目標、影響和回退方式。

</details>

## 模型、資資與備份

<details>

<summary>更換嵌入模型為什麼要求重建？</summary>

不同嵌入模型生成的向量不能直接混用。先確認新模型可用並保留完整備份，再重建已有向量索引。

</details>

<details>

<summary>重排和相似度閾值是什麼關係？</summary>

重排對候選片段重新打分，閾值過濾重排後的低分結果。未設定重排時，知識庫設定中不會顯示相似度閾值。

</details>

<details>

<summary>本地嵌入模型下載後就完全離線了嗎？</summary>

不一定。解析、OCR、重排和聊天也必須全部使用本地能力，才是完全離線流程。

</details>

<details>

<summary>修改原檔案或網頁會自動更新嗎？</summary>

不會。檔案、筆記和網頁按匯入時內容建立資資。重新新增同名資資並選擇【取代】，再完成召回測試。

</details>

<details>

<summary>精簡備份包含知識庫檔案嗎？</summary>

不包含完整知識庫資資檔案。遷移或刪除前使用完整備份，並在還原後驗證資資與召回。

</details>

## 設定說明：診斷基線

| 項目 | 推薦起點 | 只在什麼情況下調整 |
| ----- | ------------- | ---------------- |
| Top K | 6 | 正確片段被截掉或雜訊過多 |
| 相似度閾值 | 設定重排後從 0.0 開始 | 低分雜訊明顯，且正確片段仍有多餘空間 |
| Chunk | 保留預設智慧分段 | 條件與結論被切開或片段過長 |
| 嵌入模型 | BM25 不足時再增加 | 口語問法、同義表達無法穩定命中 |
| 重排模型 | 候選正確但順序不穩時增加 | 不用於修復解析錯誤或缺失正文 |

## 使用者案例

小林發現「住宿費標準」在聊天裡回答錯誤。他先用相同問題做召回測試，看到正確來源根本沒有出現；開啟正文後發現雙欄 PDF 已錯序。更換處理器並重新索引後，召回正確，聊天回答也恢復正常。

這個過程只改變了解析器的一個變數，因此能確認根本原因，而不是靠同時調大 Top K、Chunk 和閾值碰運氣。

{% hint style="warning" %}
若仍無法解決，請記錄應用程式版本、作業系統、處理器、嵌入與重排模型、完整錯誤訊息、脫敏最小樣本、召回結果以及預期來源。
{% endhint %}

## 繼續閱讀

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>文件解析與 OCR</strong></td><td>解決掃描、錯序和表格遺失問題。</td><td><a href="document-preprocessing.md">document-preprocessing.md</a></td></tr><tr><td><strong>模型與檢索設定</strong></td><td>理解嵌入、重排、閾值和重建。</td><td><a href="emb-models-info.md">emb-models-info.md</a></td></tr><tr><td><strong>資資、隱私與維護</strong></td><td>確認備份與雲端服務邊界。</td><td><a href="data.md">data.md</a></td></tr></tbody></table>
