# Azure OpenAI

Azure OpenAI は、Microsoft が Azure 上でホスティングする OpenAI モデルサービスです。エンタープライズコンプライアンス、データリテンションの保証、または Microsoft エコシステムを必要とするチームに適しています。

## 事前準備

* Azure サブスクリプションを有効化済み
* Azure Portal で Azure OpenAI Service のアクセス承認を申請し、承認済み
* 少なくとも 1 つの **リソース（Resource）** と **デプロイメント（Deployment）** を作成済み

## API キーの取得

* Azure Portal → 対象の Azure OpenAI リソース → `Keys and Endpoint`
* `KEY 1` または `KEY 2` をコピーし、`Endpoint`（`https://<your-name>.openai.azure.com/` の形式）を記録してください

## Cherry Studio での設定

* `設定 → モデルサービス` を開き、**Azure OpenAI** プロバイダーの詳細ページに移動します
* **API キー**：コピーした KEY を入力します
* **API アドレス**：リソースの Endpoint を入力します（末尾のパスは不要です）
* **API Version**：専用フィールドにデプロイメントの API バージョンを入力します（例：`2024-08-01-preview`）
* **モデルリストの取得**をクリックするか、Azure にデプロイ済みモデル名（OpenAI の元のモデル ID ではなく、Deployment Name）を手動で追加します

{% hint style="warning" %}
**Deployment Name と Model ID の違い**：Azure では、デプロイメントに付けた名前（例：`gpt-4o-prod`）を使用します。`gpt-4o` のような元の ID は使用しません。誤って入力すると 404 エラーが発生します。
{% endhint %}

## 推奨される使用法

* **gpt-4o / gpt-4o-mini**：汎用対話、Agent
* **gpt-4 turbo**：長いコンテキスト
* **text-embedding-3-**\*：埋め込みモデル。ナレッジベースに使用可能

## よくある質問

* **401 Unauthorized**：キーが正しいか、Endpoint の末尾に余分なスラッシュがないか確認してください
* **404 Not Found**：Deployment Name が Azure 上のものと一致するか、API Version が入力されているか確認してください
* **429 Throttled**：Azure のクォータ（Quota & Limits ページ）を確認してください

***

### ヘルプの取得とフィードバックの送信

設定や使用過程で疑問、バグ、または機能改善の提案がある場合は、[フィードバックと提案](../../question-contact/suggestions.md) に記載されている公式チャネルをご参照ください。
