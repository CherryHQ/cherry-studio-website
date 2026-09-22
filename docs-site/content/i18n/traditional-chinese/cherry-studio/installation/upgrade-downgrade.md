---
icon: arrows-rotate
---
# 升級與降級

根據目前版本與目標選擇對應說明。V1 與 V2 使用不同的資資結構，跨大版本切換前必須先備份。

{% hint style="danger" %}
V1 與 V2 的資資與備份格式不互通。V2 中新增的對話、Agent、設定與檔案不會自動回寫到 V1。
{% endhint %}

## V2 升級與遷移

{% hint style="warning" %}
需要保留 V1 資資時，正確路徑是：**V1.9.13 → V2（直接完成資資遷移）**，無需先安裝特定的 V2 中轉版本。
{% endhint %}

| 目前狀況 | 應該怎麼做 |
| --------------- | ------------------------------------ |
| 仍在 V1，需要保留資資 | 將 V1 更新到 1.9.13，再直接安裝 V2 完成遷移。 |
| 已經在使用 V2 | 正常升級 V2，繼續使用目前 V2 資資；不要點擊【重新遷移】。 |
| 之前遷移 V1 失敗或遺漏資資 | 完整備份目前 V2 後，才可在【設定】→【資資】使用【重新遷移】。 |
| 不需要 V1 資資 | 可以選擇【忽略並使用預設值】，但 V1 資資不會遷入。 |

{% hint style="danger" %}
【重新遷移】會永久刪除目前 V2 資資，再從原始 V1 資資重新匯入，不會合併或保留兩邊的資資。除非此前 V1 遷移失敗或遺漏資資，否則一定不要點擊。
{% endhint %}

## 選擇路徑

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>破壞性更新提醒</strong></td><td>先確認資資不互通、重新遷移和回退限制。</td><td><a href="v2-breaking-update-notice.md">v2-breaking-update-notice.md</a></td></tr><tr><td><strong>功能差異</strong></td><td>了解介面、Agent、知識庫等變化與升級後需要覆核的項目。</td><td><a href="v1-v2-feature-differences.md">v1-v2-feature-differences.md</a></td></tr><tr><td><strong>V1 升級到 V2</strong></td><td>備份 V1 資資，直接使用 V2 完成遷移。</td><td><a href="v1-to-v2-migration.md">v1-to-v2-migration.md</a></td></tr><tr><td><strong>V2 降級到 V1</strong></td><td>返回原 V1 資資，並了解什麼時候才需要處理 V2 資資庫。</td><td><a href="v2-to-v1-downgrade.md">v2-to-v1-downgrade.md</a></td></tr></tbody></table>

## 切換前準備

1. 結束正在運行的對話、Agent、知識庫匯入與檔案處理任務。
2. 為目前版本建立一份新的完整備份，並儲存在應用程式資資目錄之外。
3. 記錄目前應用程式資資目錄；使用自訂目錄或外接磁碟時，確認路徑可以正常存取。

{% hint style="warning" %}
不要為了「徹底卸載」手動刪除應用程式資資。資資庫處理只適用於明確放棄全部 V2 資資或重新遷移的情況，詳見 [【V2 降級到 V1】](v2-to-v1-downgrade.md)。
{% endhint %}

## 下載入口

* [Cherry Studio V2 官方下載](https://cherryai.com.cn/download)
* [Cherry Studio V1 官方下載](https://cherryai.com.cn/download/v1)
* V2 發布頁：[GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases) · [GitHub](https://github.com/CherryHQ/cherry-studio/releases)
