---
icon: triangle-exclamation
---
# 破壞性更新提醒

V2 不是普通的覆蓋更新。它更換了資資結構，也調整了助手、Agent、知識庫、網路搜尋和檔案等功能的入口與行為。

{% hint style="danger" %}
V1 資資只能單向遷移到 V2。V2 中新增的對話、Agent、設定和檔案不會同步回 V1，V1 與 V2 的備份也不能互相還原。
{% endhint %}

## V2 可以直接遷移 V1

需要保留 V1 資資時，按 **V1.9.13 → V2（直接完成資資遷移）** 操作，無需經過特定的 V2 中轉版本。

| 目前情況 | 應該怎麼做 |
| --------------- | --------------------------------- |
| 仍在 V1，需要保留資資 | 將 V1 更新到 1.9.13，完整備份後直接安裝 V2。 |
| 已經在使用 V2 | 正常升級 V2，繼續使用目前 V2 資資。 |
| 之前遷移 V1 失敗或遺漏資資 | 先完整備份目前 V2，再考慮使用【重新遷移】。 |
| 不需要 V1 資資 | 可以選擇【忽略並使用預設值】，但 V1 資資不會遷入。 |

{% hint style="danger" %}
正常升級 V2 不需要點擊【重新遷移】。該操作會永久刪除目前 V2 資資，再從原始 V1 資資重新匯入；除非此前 V1 遷移失敗或遺漏資資，否則一定不要點擊。
{% endhint %}

## 升級前必須完成

1. 將 V1 更新到 1.9.13，並至少正常啟動一次。
2. 關閉【精簡備份】，建立 V1 完整備份。
3. 完全退出 Cherry Studio，再複製整個 V1 資資目錄。
4. 使用自訂目錄或外接磁碟時，確認路徑已掛載且可以讀寫。

遷移嚮導讀取目前 V1 資資目錄，不讀取備份 ZIP。備份用於意外還原，不能代替原資資目錄參與遷移。

## 【重新遷移】不是資資合併

V2 在【設定】→【資資】中增加【重新遷移】。它只用於修復此前 V1 遷移失敗或遺漏資資的情況。

操作前會要求確認以下事項：

* 目前 V2 資資將被永久刪除，且無法撤銷。
* 原始 V1 資資會保留，並在重啟後重新匯入。
* 必須先為目前 V2 建立完整備份。

完整備份不會讓 V1 與 V2 資資自動合併。需要保留的 V2 新內容，請先單獨匯出或保留完整備份。

{% hint style="danger" %}
【設定】→【資資】→【清除快取】中的【v1 版本遺留資資】會刪除【重新遷移】所需的原始 V1 資資。確認遷移結果完整並保留獨立備份前，不要清理這一項。
{% endhint %}

## 升級後重點檢查

* 模型服務、API Key 和預設模型；Anthropic OAuth 不會遷移，需要改用 API Key。
* 助手分組、提示詞順序、Agent 工具權限和知識庫綁定。
* 知識庫失敗來源、網路搜尋的關鍵字搜尋與網址讀取服務。
* 自訂 CSS、側欄收藏和缺失檔案。

完整對照見 [【功能差異】](v1-v2-feature-differences.md)。

## 遷移失敗或需要回退

* 優先使用【重試】，修復資資目錄、磁碟或資資問題後繼續。
* 【儲存問題資訊】只會儲存到本地；檔案可能包含路徑、內容或憑證，只提供給 Cherry Studio 支援團隊。
* 【忽略並使用預設值】會從預設設定開始，V1 資資不會遷入。
* 正常返回 V1 不需要刪除資資庫，也不要把 V2 備份還原到 V1。

{% hint style="danger" %}
不要自行刪除或替換資資庫。誤操作、無法確認資資目錄，或需要重新遷移時，請先保留所有備份和資資目錄，再聯繫 Cherry Studio 支援團隊。
{% endhint %}

## 繼續閱讀

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>功能差異</strong></td><td>查看自動遷移、需要覆核和不會繼承的內容。</td><td><a href="v1-v2-feature-differences.md">v1-v2-feature-differences.md</a></td></tr><tr><td><strong>V1 升級到 V2</strong></td><td>按正確版本順序完成備份、遷移和驗證。</td><td><a href="v1-to-v2-migration.md">v1-to-v2-migration.md</a></td></tr><tr><td><strong>V2 降級到 V1</strong></td><td>了解回退、備份和資資庫處理注意事項。</td><td><a href="v2-to-v1-downgrade.md">v2-to-v1-downgrade.md</a></td></tr></tbody></table>

## 下載入口

* [V1 官方下載](https://cherryai.com.cn/download/v1)
* V2 發布頁：[GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases) · [GitHub](https://github.com/CherryHQ/cherry-studio/releases)
* [V2 官方下載](https://cherryai.com.cn/download)
