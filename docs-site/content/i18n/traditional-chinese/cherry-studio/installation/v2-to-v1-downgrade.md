---
icon: arrow-rotate-left
---
# V2 降級到 V1

降級適合 V2 暫時影響關鍵工作、且你仍保留可用 V1 資資的情況。它不會把 V2 資資轉換成 V1 格式。

{% hint style="danger" %}
V2 中新增的對話、Agent、設定和檔案不會回到 V1。V2 備份也不能還原到 V1；降級前請分別保留最新 V2 備份和原始 V1 備份或資資目錄副本。
{% endhint %}

## 正常降級

{% stepper %}
{% step %}
### 停止任務並備份 V2

結束正在運行的對話、Agent 和檔案處理任務。在【設定】→【資資】建立新的 V2 完整備份，並儲存到應用程式資資目錄之外。
{% endstep %}

{% step %}
### 確認 V1 資資仍在

找到升級前保留的 V1 資資目錄副本或 V1 備份。只有 V1 備份時，需在相容的 V1 中還原，不能匯入 V2。
{% endstep %}

{% step %}
### 下載並安裝 V1

完全退出 V2，從 [V1 官方下載](https://cherryai.com.cn/download/v1) 取得與目前系統相符的安裝包並完成安裝。
{% endstep %}

{% step %}
### 使用原 V1 資資啟動

啟動 V1，並使用升級前的 V1 資資目錄。不要用 V2 資資庫或 V2 備份覆蓋它。
{% endstep %}

{% step %}
### 檢查後再繼續工作

檢查常用對話、模型服務、知識庫和檔案。確認 V1 資資正常前，不要刪除任何 V1 或 V2 備份。
{% endstep %}
{% endstepper %}

{% hint style="info" %}
正常降級不需要刪除資資庫。保留 V2 資資可以方便以後返回 V2，也能避免誤刪尚未匯出的內容。
{% endhint %}

{% hint style="danger" %}
V2.0.2 中的【設定】→【資資】→【重新遷移】不是降級入口。它會永久刪除目前 V2 資資，再從原始 V1 資資重新匯入；除非此前 V1 遷移失敗或遺漏資資，否則一定不要點擊。
{% endhint %}

## 什麼時候才處理 V2 資資庫

只有以下情況才需要處理：

* 明確放棄目前全部 V2 資資，只保留 V1 資資；
* 需要重新執行一次 V1 → V2 遷移。

這不是普通降級步驟。操作會影響 V2 的全部對話、Agent、設定和其他資資，不是只清理某一批測試記錄。

### 安全處理方法

1. 完全退出 V1 和 V2，確認沒有背景任務。
2. 開啟 V1 1.9.13 的【設定】→【資資】→【應用程式資資】，進入目前應用程式資資目錄。
3. 將以下項目移到桌面或其他安全位置，不要直接刪除：
   * `Data/cherrystudio.sqlite`
   * `Data/cherrystudio.sqlite-shm` 和 `Data/cherrystudio.sqlite-wal`（如存在）
   * `Data/Agents/.claude`
4. 啟動 V1 並檢查原 V1 資資。需要重新遷移時，再啟動 V2 完成遷移。
5. 只有確認 V1 資資可用、V2 備份也能找到後，才決定是否刪除此前移出的檔案。

{% hint style="danger" %}
不要在應用程式運行時移動資資庫，不要只移動 `cherrystudio.sqlite` 而遺漏同目錄下的 `-shm` 或 `-wal` 檔案，也不要把 V2 資資庫替換成 V1 資資庫。無法判斷目前資資目錄或檔案用途時，停止操作並聯繫 Cherry Studio 支援團隊。
{% endhint %}

## 常見問題

<details>

<summary>V2 的新對話可以帶回 V1 嗎？</summary>

不可以。請在 V2 中匯出需要保留的內容，V1 只繼續使用原 V1 資資。

</details>

<details>

<summary>下載 V1 會自動轉換 V2 資資嗎？</summary>

不會。安裝包只安裝應用程式，不會轉換資資或備份格式。

</details>

<details>

<summary>可以直接刪除資資庫再試嗎？</summary>

不建議。先移出並保留，完成驗證後再決定是否刪除；誤刪且沒有可用備份時，V2 資資可能無法還原。

</details>

<details>

<summary>降級後再次回到 V2，應該安裝哪個版本？</summary>

如果繼續使用此前的 V2 資資，可以直接安裝 V2.0.2，且不要點擊【重新遷移】。如果此前 V1 遷移失敗或遺漏資資，可在完整備份目前 V2 後使用【設定】→【資資】→【重新遷移】；該操作會永久刪除目前 V2 資資，再從 V1 重新匯入。

</details>

## 參考資資

* [Cherry Studio V1 官方下載](https://cherryai.com.cn/download/v1)
* [Cherry Studio V2 官方下載](https://cherryai.com.cn/download)
* V2.0.2 發布頁：[GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases/v2.0.2) · [GitHub](https://github.com/CherryHQ/cherry-studio/releases/tag/v2.0.2)
* [問題回饋與功能建議](../../question-contact/suggestions.md)
