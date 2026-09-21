---
icon: arrows-rotate
---
# アップグレードとダウングレード

現在のバージョンと目標バージョンに応じて、該当する説明を選択してください。V1 と V2 は異なるデータ構造を使用しているため、メジャーバージョンをまたぐ切り替えを行う前に必ずバックアップを作成してください。

{% hint style="danger" %}
V1 と V2 のデータおよびバックアップ形式は互換性がありません。V2 で新規作成されたセッション、Agent、設定、ファイルは自動的に V1 に書き戻されません。
{% endhint %}

## V2.0.2 へのアップグレードと移行

{% hint style="warning" %}
V1 のデータを保持する必要がある場合、正しい手順は以下の通りです：**V1.9.13 → V2.0.2（直接データ移行を実行）**。先に V2.0.0 をインストールする必要はありません。
{% endhint %}

| 現在の状況 | 対応方法 |
| --------------- | ------------------------------------ |
| まだ V1 を使用しており、データを保持したい | V1 を 1.9.13 に更新し、その後 V2.0.2 を直接インストールして移行を完了します。 |
| すでに V2 を使用している | V2.0.2 に通常通りアップグレードし、現在の V2 データを継続して使用してください。「再移行」をクリックしないでください。 |
| 以前に V1 からの移行が失敗した、またはデータが欠落している | 現在の V2 を完全にバックアップした後、「設定」→「データ」で「再移行」を使用できます。 |
| V1 のデータは不要 | 「無視してデフォルト値を使用」を選択できますが、V1 のデータは移行されません。 |

{% hint style="danger" %}
「再移行」を実行すると、現在の V2 データが完全に削除され、元の V1 データから再インポートされます。両側のデータをマージしたり保持したりすることはありません。以前に V1 からの移行が失敗した、またはデータが欠落している場合を除き、絶対にクリックしないでください。
{% endhint %}

## パスの選択

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>破壊的更新に関する注意</strong></td><td>データ非互換性、再移行、およびロールバックの制限について先に確認してください。</td><td><a href="v2-breaking-update-notice.md">v2-breaking-update-notice.md</a></td></tr><tr><td><strong>機能の違い</strong></td><td>インターフェース、Agent、ナレッジベースなどの変更点と、アップグレード後に確認が必要な項目を理解してください。</td><td><a href="v1-v2-feature-differences.md">v1-v2-feature-differences.md</a></td></tr><tr><td><strong>V1 から V2 へのアップグレード</strong></td><td>V1 データをバックアップし、V2.0.2 を直接使用して移行を完了します。</td><td><a href="v1-to-v2-migration.md">v1-to-v2-migration.md</a></td></tr><tr><td><strong>V2 から V1 へのダウングレード</strong></td><td>元の V1 データに戻し、V2 データベースの処理が必要となるタイミングを理解してください。</td><td><a href="v2-to-v1-downgrade.md">v2-to-v1-downgrade.md</a></td></tr></tbody></table>

## 切り替え前の準備

1. 実行中の対話、Agent、ナレッジベースのインポート、ファイル処理タスクを終了してください。
2. 現在のバージョンについて新しい完全なバックアップを作成し、アプリケーションデータディレクトリ以外に保存してください。
3. 現在のアプリケーションデータディレクトリを記録してください。カスタムディレクトリや外付けディスクを使用している場合は、パスが正常にアクセス可能であることを確認してください。

{% hint style="warning" %}
「完全なアンインストール」のためにアプリケーションデータを手動で削除しないでください。データベースの処理は、すべての V2 データを明確に放棄する場合や再移行する場合にのみ適用されます。詳細は [【V2 から V1 へのダウングレード】](v2-to-v1-downgrade.md) を参照してください。
{% endhint %}

## ダウンロード入口

* [Cherry Studio V2 公式ダウンロード](https://cherryai.com.cn/download)
* [Cherry Studio V1 公式ダウンロード](https://cherryai.com.cn/download/v1)
* V2.0.2 リリースページ：[GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases/v2.0.2) · [GitHub](https://github.com/CherryHQ/cherry-studio/releases/tag/v2.0.2)
