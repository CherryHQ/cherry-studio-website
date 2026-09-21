---
icon: lightbulb
---
# 応用例

これらのケースは、対話、Agent、ナレッジベース、ノート、描画、翻訳、チャンネル、スケジュールタスク、マルチウィンドウを組み合わせ、実際に成果物を提供できるワークフローを構築する方法を示しています。ケース内の設定は出発点であり、実際の使用時には資料の機密性、使用量、チームのルールに応じて調整する必要があります。

<figure><img src="../../../../assets/fcd8d884c9294cbc845fdf9c.webp" alt="応用例 — 説明画像"><figcaption><p>まず実際の資料を用いて手動で実行し、その後段階的にナレッジベース、スキル、MCP、チャンネル、スケジュールタスクを追加します。</p></figcaption></figure>

## ケースの選択

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>マルチモデル研究レビュー</strong></td><td>社内資料、外部ソース、矛盾点の確認</td><td><a href="research-review.md">research-review.md</a></td></tr><tr><td><strong>長文書レビュー</strong></td><td>章ごとに確認し、修正稿を生成</td><td><a href="long-document-review.md">long-document-review.md</a></td></tr><tr><td><strong>Agentによるプロジェクトファイル納品</strong></td><td>ディレクトリ、権限、成果物の範囲を制御</td><td><a href="project-delivery.md">project-delivery.md</a></td></tr><tr><td><strong>ブランド画像キット</strong></td><td>ビジュアル方向性から複数サイズの完成画像へ</td><td><a href="brand-image-kit.md">brand-image-kit.md</a></td></tr><tr><td><strong>プライベートナレッジベースQ&A</strong></td><td>資料範囲を限定し、推測を拒否</td><td><a href="private-knowledge-qa.md">private-knowledge-qa.md</a></td></tr><tr><td><strong>ノートから週報を生成</strong></td><td>日常記録から確認可能な週報へ</td><td><a href="notes-weekly-report.md">notes-weekly-report.md</a></td></tr><tr><td><strong>多言語資料の整理</strong></td><td>用語、OCR、文書、一貫性チェック</td><td><a href="multilingual-materials.md">multilingual-materials.md</a></td></tr><tr><td><strong>チャンネルとスケジュール日報</strong></td><td>Agent、チャンネル、計画、実行ログ</td><td><a href="automated-daily-report.md">automated-daily-report.md</a></td></tr><tr><td><strong>マルチウィンドウ研究ワークベンチ</strong></td><td>資料の保持、比較、タスク実行を同時に行う</td><td><a href="multi-window-research.md">multi-window-research.md</a></td></tr></tbody></table>

## 一般的な構築順序

<figure><img src="../../../../assets/2573aee0510e0d6abdabab7f.webp" alt="応用例 — 説明画像"><figcaption><p>ケースは孤立した設定の集合ではなく、入力、実行、レビュー、納品までの完全なワークフローです。</p></figcaption></figure>

## 業務に応じたケースの選択

| タスク | 優先的に確認すべき項目 | 主な機能 |
| ----------- | -------------- | -------------- |
| 意見を比較し、研究プロセスを保持 | 【マルチモデル研究レビュー】 | 対話、ブランチ、ノート |
| 大量の資料をレビューし、意見を出力 | 【長文書レビュー】 | Agent、作業ディレクトリ、ファイル |
| プロジェクト文書と成果物を納品 | 【Agentによるプロジェクトファイル納品】 | Agent、状態、ファイル |
| スタイル統一の画像セットを生成 | 【ブランド画像キット】 | Agent描画、描画テンプレート |
| 社内資料に基づいてのみ回答 | 【プライベートナレッジベースQ&A】 | ナレッジベース、リコールテスト、Agent |
| 断片的な記録から週報を整理 | 【ノートから週報を生成】 | ノート、Agent、ファイル |
| 多言語ファイルを整理 | 【多言語資料の整理】 | 翻訳、Agent、作業ディレクトリ |
| 定期的に固定レポートを送信 | 【チャンネルとスケジュール日報】 | Agent、チャンネル、スケジュールタスク |
| 資料と長時間タスクを同時に監視 | 【マルチウィンドウ研究ワークベンチ】 | タブ、マルチウィンドウ、グローバル検索 |

{% stepper %}
{% step %}
### 1. まず成果物を定義する

最終的にどのファイル、表、画像、メッセージを取得し、どのように完成とみなすかを説明します。
{% endstep %}

{% step %}
### 2. 【作業】で手動実行する

モデル、プロンプト、作業ディレクトリ、資料が十分かを検証します。承認が必要な操作は項目ごとに確認します。
{% endstep %}

{% step %}
### 3. 安定した部分のみを蓄積する

繰り返し手順はスキル化し、長期資料はナレッジベースに、一時的な要件はタスクプロンプトに残します。
{% endstep %}

{% step %}
### 4. 最後に外部接続と自動化を追加する

一度の手動検収完了後、MCP、チャンネル、スケジュールタスクを接続し、失敗時の手動処理入口を保持します。
{% endstep %}
{% endstepper %}
