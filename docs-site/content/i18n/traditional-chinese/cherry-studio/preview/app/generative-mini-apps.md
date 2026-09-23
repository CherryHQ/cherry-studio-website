---
icon: wand-magic-sparkles
---
# 生成式小程式

生成式小程式是運行在 Cherry Studio【小程式】中的本機 Web 應用程式。它的介面與業務流程由您自訂，並可透過 `window.cherry` 呼叫 Cherry Studio 已設定的 AI 模型，將一個通用模型轉化為寫作助手、資訊擷取器、學習工具或專用業務應用。

它與一般網站型小程式的差異不在外觀，而在能力來源：網站型小程式僅是開啟一個 URL；生成式小程式需打包為 `.miniapp`，安裝並取得授權後，才能呼叫 Cherry 的 AI、沙箱資資、檔案、通知、網路與剪貼簿能力。

{% hint style="info" %}
Cherry Studio 提供執行環境、授權機制與 AI 介面。您可以自行撰寫小程式，也可以讓 AI 編程工具先生成 HTML、CSS 和 JavaScript，再依本頁說明進行打包安裝。
{% endhint %}

## 目標與前置條件

完成本頁後，您可以：

* 安裝並使用他人提供的生成式小程式；
* 從一個簡單需求製作自己的 `.miniapp` 包；
* 讓小程式呼叫 Cherry Studio 的【預設模型】或【快速模型】；
* 檢查權限、活動日誌、儲存、更新與解除安裝狀態。

使用現成小程式只需準備可信的 `.miniapp` 檔案或安裝網址。自行製作時，還需能編輯網頁檔案並建立 ZIP 壓縮檔；若要測試 AI 功能，請先在 Cherry Studio 中設定一個可用的對話模型。

## 術語

| 術語 | 介面名稱 | 本頁含義 |
| ------ | ------------- | ----------------------------------------- |
| 生成式小程式 | 【生成式小程式】 | 可自訂介面與流程，並呼叫 Cherry Studio AI 能力的小程式 |
| 本機小程式 | 【本機小程式】 | 以 `.miniapp` 包安裝、在獨立沙箱中運行的小程式類型 |
| 網站型小程式 | 【網站】 | 透過 URL 開啟的網頁，不具備 `window.cherry` 能力 |
| 權限 | 【權限】 | 小程式安裝時申請、由使用者審閱的能力範圍 |
| 模型槽位 | 【預設模型】、【快速模型】 | 由使用者為該小程式選擇的兩個模型位置，小程式無法看到服務商、模型名稱與 API Key |

## 操作路徑

使用現成小程式：`【啟動台】→【生成式小程式】→【本機小程式】→選擇檔案或輸入安裝網址→檢閱權限→【安裝】`

也可以從小程式頁進入：`【啟動台】→【小程式】→右上角【新增小程式】→【本機小程式】`

管理已安裝小程式：`【小程式】→以滑鼠右鍵按一下目標小程式→【檢視詳細資資】`

## 操作步驟

### 安裝並首次使用

{% stepper %}
{% step %}
### 開啟安裝入口

在【啟動台】點擊【生成式小程式】，或進入【小程式】後點擊右上角的【新增小程式】。在彈出的面板中切換至【本機小程式】。
{% endstep %}

{% step %}
### 選擇安裝來源

將一個 `.miniapp` 包拖入安裝區，或點擊【選擇檔案…】。如果開發者提供了 HTTPS 安裝網址，也可以貼上網址後點擊【載入】。
{% endstep %}

{% step %}
### 審閱權限

安裝確認頁會顯示小程式名稱、版本、說明與全部權限。必要權限無法取消；選用權限預設勾選，您可以在安裝前取消，也可以安裝後再調整。

僅在小程式用途與權限相符、來源可信時才繼續。需要 AI 的小程式通常會顯示【AI 能力】→【對話】。
{% endstep %}

{% step %}
### 安裝並開啟

點擊【安裝】。安裝完成後，小程式會出現在【小程式】網格中；點擊圖示即可執行。
{% endstep %}
{% endstepper %}

### 為小程式選擇 AI 模型

1. 在【小程式】網格中右鍵目標小程式，選擇【檢視詳細資訊】。
2. 切換至【設定】，找到【AI 模型】。
3. 根據小程式用途設定【預設模型】和【快速模型】。留空時分別跟隨 Cherry Studio 的全域預設模型和全域快速模型。
4. 重新開啟小程式並觸發一次 AI 操作。如果沒有可用模型，小程式應提示 AI 暫時無法使用。

【預設模型】適合長文生成、複雜分析等主要任務；【快速模型】適合標題建議、短句改寫、標籤擷取等低延遲任務。最終使用哪個槽位由小程式設計決定。

### 製作一個最小版本

生成式小程式本質上是一個靜態網頁專案。最小目錄只需要兩個檔案：

```
my-writer/
├── manifest.json
└── index.html
```

先建立 `manifest.json`，宣告應用程式資訊與 `ai.chat` 權限：

```json
{
  "id": "com.example.my-writer",
  "name": { "zh": "靈感改寫", "en": "Rewrite Helper" },
  "description": "輸入一段文字，呼叫 Cherry Studio 的 AI 模型進行改寫。",
  "version": "1.0.0",
  "entry": "index.html",
  "permissions": ["ai.chat"]
}
```

`id` 建議使用自己控制的反向域名格式，只能包含小寫字母、數字、點和連字號。`com.cherrystudio.*` 是官方保留範圍，請勿使用。

再在 `index.html` 中透過全域物件 `cherry` 呼叫 AI。以下範例會先確認【預設模型】可用，再將串流文字逐段顯示出來：

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="/__cherry/theme.css" />
    <title>靈感改寫</title>
  </head>
  <body>
    <textarea id="source" placeholder="輸入要改寫的文字"></textarea>
    <button id="rewrite">開始改寫</button>
    <pre id="result"></pre>

    <script>
      const button = document.querySelector('#rewrite')
      const source = document.querySelector('#source')
      const result = document.querySelector('#result')

      button.addEventListener('click', async () => {
        const capability = await cherry.ai.getCapabilities({ model: 'default' })
        if (!capability.available) {
          result.textContent = '請先在小程式詳細資資中設定可用模型。'
          return
        }

        result.textContent = ''
        await cherry.ai.chat(
          {
            model: 'default',
            reasoning: 'off',
            messages: [
              { role: 'system', content: '你是中文編輯，請保留原意並讓表達更清楚。' },
              { role: 'user', content: source.value }
            ]
          },
          {
            callId: `rewrite-${Date.now()}`,
            onChunk: (text) => {
              result.textContent += text
            }
          }
        )
      })
    </script>
  </body>
</html>
```

`window.cherry` 和 `cherry` 指向同一套宿主介面，不需要引入 SDK。小程式只能傳送文字訊息，目前不支援圖片輸入或工具呼叫。它僅指定使用 `default` 或 `quick` 槽位，不會取得模型名稱、服務商資訊或 API Key。

### 打包並測試

1. 確認 `manifest.json` 位於專案根目錄，入口檔案與 `entry` 一致。
2. 在專案目錄內執行壓縮；macOS 或 Linux 可使用：

```bash
zip -r ../my-writer.miniapp . -x '.*' -x '__MACOSX/*'
```

Windows PowerShell 可先生成 ZIP，再改為 `.miniapp` 副檔名：

```powershell
Compress-Archive -Path .\* -DestinationPath ..\my-writer.zip
Rename-Item ..\my-writer.zip my-writer.miniapp
```

3. 在 Cherry Studio 的【本機小程式】安裝區選擇生成的 `my-writer.miniapp`。
4. 確認安裝頁僅申請預期權限，安裝後開啟並測試輸入、AI 輸出、異常提示與重新進入後的狀態。
5. 需要除錯時，開啟小程式工具列中的【開發者工具】，檢視頁面錯誤和被沙箱阻止的請求。

{% hint style="warning" %}
請勿從外層目錄壓縮整個專案資資夾，確保壓縮包根目錄能直接看到 `manifest.json`。Cherry Studio 也能識別只有一層目錄包裹的壓縮包，但清晰的根目錄結構更容易除錯。
{% endhint %}

## 預期結果

安裝完成後，您應能在【小程式】網格中看到新圖示。開啟後，輸入文字並點擊按鈕，結果區會持續出現模型回傳的文字。右鍵小程式進入【檢視詳細資訊】，可以看到它申請的【AI 能力】權限、所用模型槽位和最近的呼叫記錄。

如果安裝成功但 AI 無法使用，先檢查【檢視詳細資訊】→【設定】中的模型，再檢查【權限】中是否允許【AI 能力】→【對話】。

## 關鍵截圖

<figure><img src="../../../../../assets/e5eba0b497cc060dda3fe81c.webp" alt="生成式小程式 — 說明圖片"><figcaption><p>啟動台中的【生成式小程式】入口。</p></figcaption></figure>

1. 點擊【生成式小程式】開啟【新增小程式】面板。

<figure><img src="../../../../../assets/68bb09ec12fa8bbc76f5056c.webp" alt="生成式小程式 — 說明圖片"><figcaption><p>本機小程式支援從檔案或網址安裝。</p></figcaption></figure>

1. 拖入 `.miniapp` 包或點擊【選擇檔案…】。
2. 也可以填寫開發者提供的 HTTPS 安裝網址。

<figure><img src="../../../../../assets/de4dd1594767eab1bc306a63.webp" alt="生成式小程式 — 說明圖片"><figcaption><p>【權限】頁列出小程式獲准呼叫的宿主能力。</p></figcaption></figure>

1. 核對【AI 能力】以及網路、剪貼簿、檔案、資資和通知等授權是否符合小程式用途。

<figure><img src="../../../../../assets/c6d6fce45e39a96b639f24ee.webp" alt="生成式小程式 — 說明圖片"><figcaption><p>在小程式詳細資訊中管理 AI 模型槽位。</p></figcaption></figure>

1. 【預設模型】處理小程式的主要 AI 請求，留空時跟隨全域預設模型。
2. 【快速模型】處理小程式指定的低延遲請求，留空時跟隨全域快速模型。

{% hint style="info" %}
小程式的實際介面與輸出由小程式本身決定；上圖使用官方能力測試範例說明安裝後的權限與模型管理位置。
{% endhint %}

## 設定說明

| 設定項 | 產品預設值 | 建議起點 | 作用 | 適用場景 | 注意事項 |
| ----- | --------------------- | ------------------------ | ----------------------- | -------------- | ----------------------- |
| 安裝來源 | — | 首次測試使用本機 `.miniapp` 檔案 | 決定從本機包還是 HTTPS 網址安裝 | 自用測試、團隊分發 | 第三方小程式先核對發布者、原始碼和權限 |
| AI 權限 | 由小程式宣告；選用權限安裝時預設勾選 | 僅授予完成功能必要的權限 | 允許呼叫 `cherry.ai.chat()` | 所有 AI 功能 | 必要權限無法單獨撤銷；不再信任時應解除安裝 |
| 預設模型 | 跟隨全域預設模型 | 使用您已驗證可用的對話模型 | 處理主要生成與分析任務 | 長文、複雜指令、結構化輸出 | 呼叫會計入對應模型服務的用量 |
| 快速模型 | 跟隨全域快速模型 | 為短任務選擇回應更快的模型 | 處理低延遲任務 | 改標題、補全、分類、擷取標籤 | 小程式必須明確選擇 `quick` 才會使用 |
| 推理模式 | 小程式不傳時為關閉 | 普通改寫先關閉 | 允許支援推理的模型先進行推理 | 複雜分析、規劃 | 不支援切換的模型會忽略此項 |
| 主題樣式 | 跟隨 Cherry Studio 明暗主題 | 引用 `/__cherry/theme.css` | 使用宿主提供的顏色變數 | 所有自訂介面 | 外部 CDN 資源會被沙箱阻止，應打包到應用程式內 |

### 還能呼叫哪些能力

| 能力 | 用途 | 宣告方式 |
| --------------------- | ----------------------- | ---------------------------------- |
| `cherry.storage` | 儲存字串形式的設定與狀態 | `storage.*` 或具體方法 |
| `cherry.file` | 在小程序自己的沙箱中儲存、讀取與匯出檔案 | `file.*` 或具體方法 |
| `cherry.notification` | 透過 Cherry Studio 發送系統通知 | `notification.show` |
| `cherry.network` | 存取清單中宣告的 HTTPS 網域 | `network.fetch`，並填寫 `network` 網域清單 |
| `cherry.clipboard` | 在小程序可見且取得鍵盤焦點時讀寫純文字 | `clipboard.read`、`clipboard.write` |
| `cherry.app` | 讀取應用程式版本、語言與目前權限 | 無需宣告 |

本機小程序不能直接使用 `localStorage`、瀏覽器 `fetch`、Cookie、彈出視窗或外部 CDN。需要儲存狀態時使用 `cherry.storage`，需要連線時使用 `cherry.network.fetch` 並在清單中宣告允許的網域。

## 使用者案例

| 場景 | 輸入 | 小程序如何處理 | 完成標記 |
| ------- | ----------- | ------------------------- | -------------- |
| 寫作與改寫 | 草稿、語氣與字數要求 | 使用【預設模型】生成正文，使用【快速模型】提供標題備選 | 能保留原意並快速切換不同表達 |
| 會議紀錄整理 | 貼上的會議記錄 | 提取結論、負責人與截止時間，依固定版式輸出 | 每項行動都有負責人與時間欄位 |
| 多語言翻譯 | 原文、目標語言與術語表 | 在系統訊息中固定術語與輸出格式，串流顯示譯文 | 專有名詞一致，段落結構保留 |
| 結構化資訊提取 | 合約、履歷或回饋文字 | 要求模型依固定欄位回傳結果，再由頁面驗證缺失項目 | 必填欄位完整，異常內容被標出 |
| 學習練習 | 筆記、題型與難度 | 生成題目、提示與講解，並使用沙箱資資儲存進度 | 重新開啟後仍能繼續上次練習 |
| 垂直工作流 | 團隊範本與業務規則 | 將輸入、AI 處理、人工確認與匯出組合在同一介面 | 重複任務能依同一流程穩定完成 |

{% hint style="warning" %}
生成式小程序的結果仍由所選模型生成。醫療、法律、財務等高風險用途，以及會影響正式業務的資資，必須由具備相應資格的人員複核。
{% endhint %}

## 常見問題

<details>

<summary>為什麼我填寫了一個網頁 URL，卻不能呼叫 Cherry AI？</summary>

【網站】只負責開啟網頁，不會向網頁注入 `window.cherry`。請將應用程式製作成 `.miniapp` 套件，並從【本機小程序】安裝。

</details>

<details>

<summary>小程序能看到我的 API Key 或模型供應商嗎？</summary>

不能。小程序只請求【預設模型】或【快速模型】槽位。Cherry Studio 代為執行呼叫，不會將模型名稱、供應商資訊或 API Key 暴露給小程序。

</details>

<details>

<summary>為什麼安裝後提示 AI 不可用？</summary>

先開啟【檢視詳情】→【設定】，確認對應模型槽位有可用模型；再到【權限】確認【AI 能力】→【對話】已授權。若權限屬於必要權限但你不再信任該應用程式，請直接解除安裝。

</details>

<details>

<summary>如何確認小程序呼叫了哪些能力？</summary>

開啟【檢視詳情】→【活動日誌】。這裡會記錄 AI、網路、剪貼簿、檔案匯出等對外呼叫及被拒絕的呼叫，但不會記錄提示詞、模型回覆、剪貼簿內容或檔案內容。

</details>

<details>

<summary>更新、回滾與清除資資有什麼區別？</summary>

更新會保留沙箱資資，並在新增權限時再次請求確認；更新後可回滾到上一個版本。清除資資會刪除該小程序儲存的資資與檔案，但保留應用程式；解除安裝會同時刪除應用程式、授權與資資。

</details>

## 參考資資

* [Cherry Studio MiniApps 開發文件與社群清單](https://github.com/CherryHQ/cherry-studio-miniapps/blob/main/README.zh-CN.md)
* [MiniApp 官方參考文件](https://github.com/CherryHQ/cherry-studio/tree/main/docs/references/mini-app)
* [清單格式](https://github.com/CherryHQ/cherry-studio/blob/main/docs/references/mini-app/manifest.md)
* [能力介面](https://github.com/CherryHQ/cherry-studio/blob/main/docs/references/mini-app/capabilities.md)
* [打包、更新與解除安裝](https://github.com/CherryHQ/cherry-studio/blob/main/docs/references/mini-app/packaging.md)
