---
icon: plug
---
# Agent の機能拡張

Agent には、ファイル、検索、画像、メモリ、ワークフロー、スケジュールタスクなどの組み込みツールが既に備わっています。固定された作業手順が必要な場合はスキルを追加し、外部システムとの接続が必要な場合は MCP を追加します。両者が解決する問題は異なります。「機能が多いから」という理由だけですべてインストールする必要はありません。

<figure><img src="../../../../assets/cc38d8a6378ca8270ceda746.webp" alt="Agent の機能拡張 — 説明画像"><figcaption><p>最短のパスを優先してください。Agent が実際に外部システムにアクセスする必要がある場合のみ、MCP を追加します。</p></figcaption></figure>

## まず必要なものを判断する

| 要件 | 選択 |
| ----------------- | ---------- |
| 手順、テンプレート、チェックリストを固定する | スキル |
| データベース、ブラウザ、サードパーティシステムを照会する | MCP |
| 自社のドキュメントや資料を検索する | ナレッジベース |
| 現在のプロジェクトファイルの読み書き、画像生成、通知送信 | Agent の組み込みツール |

{% hint style="success" %}
最も手軽な方法は、【ワーク】で目標を直接記述し、Agent にスキル、MCP、ナレッジベースのいずれかが不足しているかを判断させることです。ソース、接続パラメータ、権限の確認が必要な場合は、【設定】で手動管理してください。
{% endhint %}

## インストール後の最終ステップ

グローバルインストールや接続が成功しても、すべての Agent で使用できるわけではありません。【ワーク】→ Agent メニュー →【編集】を開き、【スキル】、【MCP】、または【ナレッジベース】でそれぞれを選択してください。設定は次のメッセージから有効になります。

<figure><img src="../../../../assets/6be829efa6152cf0a3576cba.webp" alt="Agent の機能拡張 — 説明画像"><figcaption><p>Agent の組み込みツール、ナレッジベース、MCP、スキルはそれぞれ個別に設定し、タスクに応じて有効化してください。</p></figcaption></figure>

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>スキルと能力ライブラリ</strong></td><td>安定した作業手順のインストールと再利用</td><td><a href="skills.md">skills.md</a></td></tr><tr><td><strong>MCP と外部ツール</strong></td><td>追加ツールとデータソースの接続</td><td><a href="../../../../advanced-basic/extensions/mcp">mcp</a></td></tr><tr><td><strong>MCP のトラブルシューティング</strong></td><td>接続経路に沿って段階的に問題を特定する</td><td><a href="mcp/troubleshooting.md">troubleshooting.md</a></td></tr></tbody></table>
