---
icon: key-round
---

# プロバイダーとモデル

モバイル版は、あなたが設定したプロバイダー経由でモデルを呼び出します。Cherry Studio が提供するのはクライアントの体験であり、モデルのクレジットを仲介したり、プロバイダー側の料金やデータの扱いを変更したりすることはありません。

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/iphone-add-provider.webp"><img src="../../../assets/mobile/iphone-add-provider.webp" alt="Cherry Studio モバイル版 iPhone のプロバイダー追加画面"></a><figcaption><p><strong>iPhone</strong> · プロバイダー一覧を検索するか、カスタムプロバイダーを作成</p></figcaption></figure>
<figure data-mobile-shot="tablet"><a href="../../../assets/mobile/ipad-add-provider.webp"><img src="../../../assets/mobile/ipad-add-provider.webp" alt="Cherry Studio モバイル版 iPad のプロバイダー追加画面"></a><figcaption><p><strong>iPad</strong> · 同じプロバイダー一覧のタブレット向けレイアウト</p></figcaption></figure>
</div>

## 組み込みプロバイダーを追加する

1. モデルサービス設定を開き、**プロバイダーを追加** を選びます。
2. 目的のプロバイダーを検索して選びます。
3. API キーを入力し、そのプロバイダーが必要とする追加項目があれば入力します。
4. モデルを取得または追加し、使用するモデルを有効にします。

## カスタムプロバイダーを使う

対応する API 形式を実装しているサービスであれば、**カスタムプロバイダー** を選び、名前・Base URL・API キー・モデル ID を入力します。Base URL にはプロバイダーのドキュメントに記載された API のアドレスを指定してください。管理コンソールの URL ではありません。

## モデルを選ぶ

チャットまたはエージェントの画面でモデル選択を開くと、有効にしたモデルを切り替えられます。画像の理解・ツール呼び出し・画像生成に対応しているかは、プロバイダーと個々のモデルによって決まります。

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/iphone-models.webp"><img src="../../../assets/mobile/iphone-models.webp" alt="Cherry Studio モバイル版 iPhone のモデル選択画面"></a><figcaption><p><strong>iPhone</strong> · プロバイダーごとに、有効なモデルを一覧表示</p></figcaption></figure>
<figure data-mobile-shot="tablet"><a href="../../../assets/mobile/ipad-models.webp"><img src="../../../assets/mobile/ipad-models.webp" alt="Cherry Studio モバイル版 iPad のモデル選択画面"></a><figcaption><p><strong>iPad</strong> · モデルの対応機能とコンテキスト情報を確認</p></figcaption></figure>
</div>

## よくある接続エラー

* **401 / 認証エラー**：API キーが完全か、期限が切れていないか、アカウントに権限があるかを確認します。
* **404 / モデルが見つからない**：Base URL とモデル ID を確認します。表示名をモデル ID として使わないでください。
* **429 / リクエスト過多**：レート制限が解除されるまで待ち、プロバイダーの残高とクォータを確認します。
* **タイムアウトまたは通信失敗**：現在のネットワークからプロバイダーに接続できるかを確認し、プロキシ設定を見直します。
