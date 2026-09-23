---
icon: arrow-right-arrow-left
---
# バージョンアップとダウングレード

V1 と V2 の間で切り替える場合は、まず該当する説明を選択してください：

* [機能の違い](../cherry-studio/installation/v1-v2-feature-differences.md)
* [V1 から V2 へのアップグレード](../cherry-studio/installation/v1-to-v2-migration.md)
* [V2 から V1 へのダウングレード](../cherry-studio/installation/v2-to-v1-downgrade.md)

{% hint style="danger" %}
バージョンを切り替える前に、アプリ内で完全なバックアップを作成し、Cherry Studio を完全に終了してからデータディレクトリ全体をコピーしてください。V1 と V2 のバックアップは互いに復元できません。
{% endhint %}

## V1 データの V2 への移行

V2 では、V1.9.13 から直接移行できるようになりました。特定の V2 リリースを経由する必要はありません。

| 現在の状況 | 対応方法 |
| --------------- | ---------------------------------- |
| まだ V1 を使用しており、データを保持したい | V1 を 1.9.13 に更新し、その後 V2 を直接インストールして移行を完了します。 |
| すでに V2 を使用している | V2 に通常通りアップグレードし、現在の V2 データを継続して使用します。 |
| 以前に V1 の移行が失敗した、またはデータが欠落している | 現在の V2 を完全にバックアップしてから、【再移行】を使用できます。 |
| V1 のデータは不要 | 【無視してデフォルト値を使用】を選択できますが、V1 のデータは移行されません。 |

{% hint style="danger" %}
【設定】→【データ】内の【再移行】は、現在の V2 データを完全に削除し、元の V1 データから再インポートします。両側のデータをマージすることはありません。V1 の移行が失敗した、またはデータが欠落していない場合は、絶対にクリックしないでください。
{% endhint %}

## ダウンロード入口

* [V1 公式ダウンロード](https://cherryai.com.cn/download/v1)
* V2 リリースページ：[GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases) · [GitHub](https://github.com/CherryHQ/cherry-studio/releases)
* [V2 公式ダウンロード](https://cherryai.com.cn/download)

バックアップ、移行失敗、データベースに関する注意事項の詳細は、[【アップグレードとダウングレード】](../cherry-studio/installation/upgrade-downgrade.md)を参照してください。
