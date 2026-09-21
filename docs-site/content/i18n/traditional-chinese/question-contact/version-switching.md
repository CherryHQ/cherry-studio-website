---
icon: arrow-right-arrow-left
---
# 版本升級與降級

跨 V1、V2 切換時，請先選擇對應說明：

* [功能差異](../cherry-studio/installation/v1-v2-feature-differences.md)
* [V1 升級到 V2](../cherry-studio/installation/v1-to-v2-migration.md)
* [V2 降級到 V1](../cherry-studio/installation/v2-to-v1-downgrade.md)

{% hint style="danger" %}
切換版本前，先在應用內建立完整備份，再完全退出 Cherry Studio 並複製整個資資目錄。V1 與 V2 的備份不能互相還原。
{% endhint %}

## V1 資資遷移到 V2

V2.0.2 已支援從 V1.9.13 直接遷移，不再需要 V2.0.0 中轉。

| 目前情況 | 應該怎麼做 |
| --------------- | ---------------------------------- |
| 仍在 V1，需要保留資資 | 將 V1 更新到 1.9.13，再直接安裝 V2.0.2 完成遷移。 |
| 已經在使用 V2 | 正常升級 V2.0.2，繼續使用目前 V2 資資。 |
| 之前遷移 V1 失敗或遺漏資資 | 完整備份目前 V2 後，才可使用【重新遷移】。 |
| 不需要 V1 資資 | 可以選擇【忽略並使用預設值】，但 V1 資資不會遷入。 |

{% hint style="danger" %}
【設定】→【資資】中的【重新遷移】會永久刪除目前 V2 資資，再從原始 V1 資資重新匯入。它不會合併兩邊的資資；不是 V1 遷移失敗或遺漏資資時，一定不要點擊。
{% endhint %}

## 下載入口

* [V1 官方下載](https://cherryai.com.cn/download/v1)
* V2.0.2 發布頁：[GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases/v2.0.2) · [GitHub](https://github.com/CherryHQ/cherry-studio/releases/tag/v2.0.2)
* [V2 官方下載](https://cherryai.com.cn/download)

更多備份、遷移失敗與資資庫注意事項見 [【升級與降級】](../cherry-studio/installation/upgrade-downgrade.md)。
