---
icon: arrow-right-arrow-left
---
# V1 升級到 V2

{% hint style="danger" %}
遷移是單向的：V1 資資可以進入 V2，V2 新資資不會同步回 V1。升級前請同時保留 V1 完整備份和完全退出應用後複製的整個 V1 資資目錄。
{% endhint %}

{% hint style="warning" %}
保留資資的正確路徑是：**V1.9.13 → V2.0.2（直接完成資資遷移）**。不再需要先安裝 V2.0.0。
{% endhint %}

## 根據目前情況選擇

| 目前情況 | 操作 |
| --------------- | ------------------------------------ |
| 仍在 V1，需要保留資資 | 將 V1 更新到 1.9.13，按本頁步驟直接安裝 V2.0.2。 |
| 已經在使用 V2 | 正常升級 V2.0.2，繼續使用目前 V2 資資；不要點擊【重新遷移】。 |
| 之前遷移 V1 失敗或遺漏資資 | 完整備份目前 V2 後，才可使用【重新遷移】從 V1 重新開始。 |
| 不需要 V1 資資 | 可以選擇【忽略並使用預設值】，從預設設定開始；V1 資資不會遷入。 |

## 升級前確認

* V1 不低於 1.9.12，建議先更新到最終版 1.9.13 並至少啟動一次。
* 首次遷移可以直接使用 V2.0.2。
* 自訂資資目錄或外接磁碟可以正常讀寫。
* 對話、Agent、知識庫匯入和檔案處理任務均已結束。

{% hint style="warning" %}
遷移嚮導讀取目前 V1 資資目錄，不讀取 V1 備份 ZIP。備份用於意外恢復，不能代替原資資目錄參與遷移。
{% endhint %}

## 操作步驟

{% stepper %}
{% step %}
### 更新並備份 V1

將 V1 更新到 1.9.13。在資資備份頁面關閉【精簡備份】，建立完整備份，並把備份儲存在應用資資目錄之外。
{% endstep %}

{% step %}
### 複製整個 V1 資資目錄

在 V1 的資資設定中確認目錄位置，完全退出 Cherry Studio 後複製整個目錄。不要只複製資資庫檔案。
{% endstep %}

{% step %}
### 檢查自訂目錄

使用行動硬碟、網路磁碟機或其他自訂位置時，確認路徑已掛載且可讀寫。路徑無法存取時不要改用預設目錄繼續遷移。
{% endstep %}

{% step %}
### 首次啟動 V2.0.2

從 [V2 官方下載](https://cherryai.com.cn/download) 取得匹配系統和晶片的 V2.0.2 安裝包，也可以使用 [GitCode 發布頁](https://gitcode.com/CherryHQ/cherry-studio/releases/v2.0.2) 或 [GitHub 發布頁](https://github.com/CherryHQ/cherry-studio/releases/tag/v2.0.2)。完全退出 V1 後安裝並啟動。
{% endstep %}

{% step %}
### 完成【資資遷移嚮導】

核對嚮導顯示的資資位置，再選擇【開始遷移】。遷移期間不要關閉應用、移動資資目錄或斷開外接磁碟。
{% endstep %}

{% step %}
### 查看結果並重新啟動

遷移完成後先展開警告訊息，再選擇【重新啟動應用】。
{% endstep %}
{% endstepper %}

## 升級後檢查

* 檢查常用模型服務、API Key 和預設模型。
* 檢查助手分組、提示詞、Agent 權限和知識庫綁定。
* 開啟常用對話、知識庫和檔案；只重建顯示失敗的知識來源。
* 在【設定】→【網路搜尋】重新確認關鍵字搜尋和網址讀取服務。
* 檢查側欄收藏和自訂 CSS。
* 在【設定】→【資資】建立新的 V2 完整備份。

更多入口變化見 [【功能差異】](v1-v2-feature-differences.md)。

## 只有遷移失敗才使用【重新遷移】

如果此前 V1 遷移失敗或遺漏資資，V2.0.2 可在【設定】→【資資】選擇【重新遷移】。該操作會重新啟動應用，並從保留的 V1 資資重新執行遷移。

{% hint style="danger" %}
【重新遷移】會永久刪除目前 V2 資資，不會把 V1 與 V2 資資合併。除非此前 V1 遷移失敗或遺漏資資，否則一定不要點擊。操作前必須建立目前 V2 的完整備份；需要保留的 V2 新內容還應單獨匯出。
{% endhint %}

## 遷移失敗時

| 選項 | 什麼時候用 | 注意事項 |
| ---------- | --------------- | ---------------------------------------------- |
| 【重試】 | 修復目錄、磁碟或臨時資資問題後 | 優先選擇，不會退出遷移流程。 |
| 【儲存問題資訊】 | 重試仍失敗，需要求助 | 檔案只儲存在本地，可能包含路徑、內容或憑證，只提供給 Cherry Studio 支援團隊。 |
| 【忽略並使用預設值】 | 明確放棄匯入 V1 資資 | 清除本次已寫入的部分 V2 資資並從預設設定開始；之後不再自動提示遷移。 |
| 【繼續使用 V1】 | 暫時無法遷移，需要恢復工作 | 重新安裝 V1 並繼續使用原 V1 資資目錄。 |

{% hint style="danger" %}
遷移失敗或誤選【忽略並使用預設值】時，不要自行刪除資資庫，也不要反覆覆蓋安裝。保留 V1 原資資與備份並聯繫 Cherry Studio 支援團隊。
{% endhint %}

## 常見問題

<details>

<summary>只有 V1 備份 ZIP，可以直接遷移嗎？</summary>

不可以。先在相容的 V1 中恢復並確認資資正常，再保留完整資資目錄，然後啟動 V2 遷移。

</details>

<details>

<summary>知識庫都要重建索引嗎？</summary>

不需要。有效索引會遷移；只處理顯示失敗、缺少嵌入模型或無法讀取的來源。

</details>

## 參考資資

* [Cherry Studio V2 官方下載](https://cherryai.com.cn/download)
* [Cherry Studio V1 官方下載](https://cherryai.com.cn/download/v1)
* V2.0.2 發布頁：[GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases/v2.0.2) · [GitHub](https://github.com/CherryHQ/cherry-studio/releases/tag/v2.0.2)
* [官方遷移設計說明](https://github.com/CherryHQ/cherry-studio/blob/main/src/main/data/migration/v2/README.md#version-compatibility-gate)
* [問題回饋與功能建議](../../question-contact/suggestions.md)
