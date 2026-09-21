---
icon: brain
---
# 知識ベースとコンテンツワークフロー

知識ベース、ノート、描画、翻訳は互いに孤立したツールではありません。それぞれが資料の整理、コンテンツの蓄積、ビジュアル素材の作成、多言語ファイルの処理を担当し、いずれも Agent に引き継ぐことができます。

<figure><img src="../../../../assets/31b376b5d5a233eeb71ddf12.webp" alt="知識ベースとコンテンツワークフロー — 説明画像"><figcaption><p>まず実際の質問でリコールテストを行い、その後 Agent に資料に基づいてレポート、翻訳、または画像を作成させます。</p></figcaption></figure>

## 4つの入口の役割分担

| 入口 | 用途 | 一般的な次のステップ |
| ----- | ---------------------- | -------------- |
| 【知識ベース】 | 質問に基づいて資料を検索可能にする | 対話アシスタントまたは Agent にバインド |
| 【ノート】 | Markdown コンテンツの作成、整理、長期メンテナンス | ドキュメントのエクスポートまたは知識ベースへの追加 |
| 【描画】 | 画像の生成、編集、マージ、強化 | ダウンロード、またはコンテンツタスクで使用 |
| 【翻訳】 | テキスト、画像、ドキュメントの処理 | 結果の保存、履歴の再利用、または編集の継続 |

{% hint style="success" %}
目標が「これらの資料で成果物を完成させること」であれば、【作業】で Agent に資料の場所と成果物の内容を直接指示してください。資料ベースの手動整理、画像の調整、翻訳の逐次確認が必要な場合は、該当するモジュールに入ってください。
{% endhint %}

<figure><img src="../../../../assets/203ae7d1fc3c8b76bd8af0a8.webp" alt="知識ベースとコンテンツワークフロー — 説明画像"><figcaption><p>新しい知識ベースを作成する際は、まず名前を付け、次に検索用の埋め込みモデルを選択します。</p></figcaption></figure>

## 資料から成果物へ

{% stepper %}
{% step %}
### 1. まずソースを整理する

長期的な参考資料は知識ベースに追加し、修正中の下書きはノートまたは作業ディレクトリに配置します。未確認の一時チャットをすべて知識ベースにインポートしないでください。
{% endstep %}

{% step %}
### 2. 重要情報の検索可能性を検証する

知識ベースでリコールテストを使用し、実際の質問で正しい断片が見つかることを確認します。検索できない場合は、まず資料と設定を修正し、Agent に推測させないでください。
{% endstep %}

{% step %}
### 3. 次にテキスト、翻訳、画像を作成する

Agent に資料に基づいてコンテンツの起草を行わせます。画像と翻訳はそれぞれ【描画】と【翻訳】で精細化します。最後に人間が事実と表現を確認します。
{% endstep %}
{% endstepper %}

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>知識ベースとリコールテストの構築</strong></td><td>資料のインポートから検索の検証まで</td><td><a href="knowledge-base.md">knowledge-base.md</a></td></tr><tr><td><strong>ノート、知識ベースと Agent</strong></td><td>下書き、資料、タスクの円滑なフローを実現</td><td><a href="notes-knowledge-agent.md">notes-knowledge-agent.md</a></td></tr><tr><td><strong>画像の生成、編集、強化</strong></td><td>テンプレートから利用可能な画像を作成</td><td><a href="painting-workflow.md">painting-workflow.md</a></td></tr><tr><td><strong>ファイル、画像、長文の翻訳</strong></td><td>異なる形式を処理し、履歴結果を再利用</td><td><a href="translation-workflow.md">translation-workflow.md</a></td></tr></tbody></table>
