---
icon: scanner-image
---
# OCR

OCR（Optical Character Recognition，光學字元識別）負責將**圖片中的文字轉換為可複製、可被 AI 讀取的文本**。以下情境皆依賴此功能：

* 將截圖或掃描檔拖曳至對話框，希望 AI 能理解其中的文字
* 將圖片格式的發票、文件放入[知識庫](../../knowledge-base/knowledge-base.md)，以便日後搜尋
* [智能體](../../advanced-basic/agent.md) 開啟本機圖片進行分析

OCR 是一個獨立的設定頁面。在【設定】→【OCR】中設定一次識別引擎後，所有涉及圖片文字辨識的功能都會使用同一套設定。

<figure><img src="../../../../assets/31140d519a5957ff8945fd3a.webp" alt=""><figcaption><p>OCR 設定：① 右上角下拉選單選擇識別引擎（圖示為 Mistral），下方填入所選引擎的 API 金鑰與 API 位址</p></figcaption></figure>

### 選擇識別引擎

面板右上角的下拉選單用於切換 OCR 引擎，**選中的引擎即為預設值**。內建引擎如下：

| 引擎 | 接入 / 執行方式 | 適用對象 |
| --- | --- | --- |
| **System OCR** | 離線、免設定 | 借用系統內建識別功能（macOS Live Text / Windows OCR），開箱即用、速度最快 |
| **PaddleOCR** | 填入 API 金鑰（[飛潑星河社群](https://aistudio.baidu.com/paddleocr/)）；若自行部署，請將 API 位址指向您的服務。可選擇解析模型 | 不想佔用本機資源，又希望獲得 Paddle 的識別效果 |
| **本地 PaddleOCR** | 離線，需先在【設定】→【本地模型】下載本地 OCR 模型（約 140MB）| 中文識別效果好且完全在本機執行，隱私優先 |
| **Tesseract OCR** | 離線、已內建 | 經典開源 OCR，支援多語言，可作為備援方案 |
| **Mistral** | Mistral API 金鑰 | 借助多模態大型模型進行識別，對複雜版面 / 手寫體等更具智慧 |
| **Intel OV OCR** | 本機執行（Intel OpenVINO，NPU 加速）| **僅在 Windows + Intel Core Ultra（配備 NPU）、且已部署 OV 模型時才會出現**，其他裝置無法看到此選項 |

{% hint style="success" %}
不確定該選哪個？建議先使用 **System OCR**——絕大多數截圖、清晰的掃描檔都能直接處理，且無需任何設定。若識別效果不理想，再改用本地 PaddleOCR 或 Mistral。
{% endhint %}

選中 System OCR 時，面板會顯示 <mark style="color:green;">偵測到 macOS Live Text / Windows OCR 引擎可用</mark>（若系統不支援，該選項不會出現在下拉選單中）。

{% hint style="warning" %}
* 選擇「本地 PaddleOCR」前，請先在【設定】→【本地模型】下載「本地 OCR 模型」，否則無法呼叫。
* **Tesseract**（以及 Windows 上的 System OCR）可在面板的「語言」下拉選單中勾選要識別的語言。
{% endhint %}

### 與文件處理的差異

許多人會將 OCR 與[文件處理](doc-process.md)混淆，簡單區分如下：

* **OCR**：處理**圖片 / 掃描檔**中的文字識別（圖 → 字）。
* **文件處理**：處理**PDF / 複雜版面文件**的結構化解析（含表格、多欄的 PDF → 規範化文本）。

兩者相互獨立，各自設定。純文字 PDF、`.md`/`.txt`/`.docx` 中的文字段落不經過這兩者，直接讀取即可。

***

### 取得協助與提交回饋

如果您在設定或使用過程中遇到任何疑問、Bug 或有功能改進建議，請參考[回饋與建議](../../question-contact/suggestions.md)中提供的官方管道。
