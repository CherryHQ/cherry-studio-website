---
icon: file-code
---
# 文件處理

簡單來說：**這是 Cherry Studio 將「PDF / 複雜版面文件」讀取為整齊文本的中央設定。**

包含表格、多欄、掃描頁的 PDF（學術論文、合約、研究報告等）直接丟給模型往往會讀得亂七八糟。文件處理會先使用專門的解析引擎將它們轉換為結構清晰的文本，再交給對話或 [知識庫](../../knowledge-base/knowledge-base.md) 使用。

{% hint style="info" %}
**文件處理 vs OCR**：兩者是分開的兩頁設定。

* **文件處理**（本頁）：負責 **PDF / 複雜版面文件** 的結構化解析。
* **[OCR](ocr.md)**：負責 **圖片 / 掃描件** 中的文字識別。

一般純文本 PDF、`.md`/`.txt`/`.docx` 中的文字段落兩者都不需要，直接讀取即可。
{% endhint %}

### 設定入口

開啟【設定】→【文件處理】，在右上角的下拉選單中選擇解析引擎，**選中的引擎即作為預設**。

<figure><img src="../../../../assets/dbc7765b46b45fec4b345e04.webp" alt=""><figcaption><p>文件處理設定：① 右上角下拉選擇解析引擎（預設 MinerU）；下方填入所選引擎的 API 金鑰與 API 位址</p></figcaption></figure>

### 內建解析引擎

文件處理內建 5 個引擎，預設為 **MinerU**：

| 引擎 | 說明 | 接入方式 |
| --- | --- | --- |
| **MinerU**（預設） | OpenDataLab 開源的高品質 PDF 提取工具 | API 金鑰（[mineru.net/apiManage](https://mineru.net/apiManage)）|
| **PaddleOCR** | 百度飛桨 OCR 識別系統 | 填入 API 金鑰（[飛桨星河社群](https://aistudio.baidu.com/paddleocr/)）；如自行部署則將 API 位址指向您的服務 |
| **Doc2x** | 進階文件還原引擎 | API 金鑰（[open.noedgeai.com](https://open.noedgeai.com/apiKeys)）|
| **Mistral** | 文件解析與理解服務 | API 金鑰（[mistral.ai](https://mistral.ai/api-keys)）|
| **Open MinerU** | 可自行部署的 MinerU 服務，適合希望自行控制處理鏈路的團隊 | 自行部署後填入 API 位址（按需填入 API 金鑰）|

### 設定 MinerU（預設方案）

{% stepper %}
{% step %}
### 填入 API 金鑰

在【API 金鑰】欄位填入 MinerU 申請到的 key（點擊右側「取得金鑰」跳轉至申請頁面，多個金鑰可用逗號分隔）。
{% endstep %}

{% step %}
### 確認 API 位址

【API 位址】保持預設即可。
{% endstep %}

{% step %}
### 在知識庫 / 對話中直接使用

匯入複雜 PDF 時會自動使用此處的解析設定，切換到知識庫或對話時無需額外設定。
{% endstep %}
{% endstepper %}

{% hint style="info" %}
**改用其他引擎**：在下拉選單中選中它，填入該引擎的【API 金鑰】/【API 位址】即可，選中即成為預設。其中 **PaddleOCR** 和 **Open MinerU** 支援自行部署——部署後將【API 位址】填成您自己的服務位址。
{% endhint %}

### 與知識庫的關係

* 文件處理僅負責「複雜文件 → 整齊文本」這一步；
* 轉換後的文本繼續透過 [嵌入模型](../../knowledge-base/emb-models-info.md) 向量化、入庫；
* 詳細的「在知識庫中啟用」流程請見 [知識庫文件預處理](../../knowledge-base/document-preprocessing.md)。

### 提示與技巧

* MinerU 對包含表格 / 多欄排版的 PDF 效果顯著更好，遇到學術論文等首選；
* 需要識別的是 **圖片中的文字**（截圖、掃描件）而非 PDF 結構，請改用 [OCR](ocr.md)。

***

### 取得協助與提交回饋

如果您在設定或使用過程中遇到任何疑問、Bug 或有功能改進建議，請參考 [回饋與建議](../../question-contact/suggestions.md) 中提供的官方管道。
