# MiniMax Coding Plan

**Coding Plan** は MiniMax が提供する高コストパフォーマンスのコーディング向けサブスクリプションサービス（Starter/Plus プランなど）です。Cherry Studio でこのプランを設定することで、非常に低い固定コスト（最低 ¥29/月）で `MiniMax-M2.1` モデルを利用できます。

{% hint style="success" %}
**主な利点**

* **対象ユーザー**：MiniMax Coding Plan（Starter / Plus / Max）のサブスクリプションを保有しているユーザー。
* **課金方式**：Token 課金ではなく、時間帯ごとにクォータがリフレッシュされる方式（例：5 時間ごとに 40 回の Prompt）です。消費速度を心配する必要はありません。
{% endhint %}

### 1. 準備

開始前に、プランを購入し、キーを取得していることを確認してください。

1. [**MiniMax オープンプラットフォーム**](https://platform.minimaxi.com/) にログインします。
2. [**Coding Plan** ページ](https://platform.minimaxi.com/subscribe/coding-plan?code=FYWiC6CtHy\&source=link) に移動し、プランが有効になっていることを確認します。

    <figure><img src="../../../../assets/e7c5f78ce7b02d24f47e524a.png" alt=""><figcaption></figcaption></figure>
3. **Coding Plan** から、あなた専用の `API Key`（`sk-` で始まるもの）をコピーします。

<figure><img src="../../../../assets/b7ad13e5818755c159e9cc7d.webp" alt=""><figcaption></figcaption></figure>

### 2. 設定手順

#### ステップ 1：プロバイダーの特定

Cherry Studio を開き、サイドバーの **設定** > **モデルサービス** をクリックし、リストから **MiniMax** を見つけてください。

{% hint style="info" %}
リストが長い場合は、上部の検索ボックスに `mini` と入力して素早く特定できます。
{% endhint %}

#### ステップ 2：設定の入力

複雑な API アドレスを変更する **必要はありません**。デフォルトの設定を使用し、以下の説明に従って入力してください。

<table><thead><tr><th width="128.20703125">パラメータ</th><th>入力説明</th></tr></thead><tbody><tr><td><strong>API Key</strong></td><td>Coding Plan 専用のキーを貼り付けます<br><em>(注意：プラン購入後に生成された Key である必要があります。余分なスペースがないことを確認してください)</em></td></tr><tr><td><strong>API アドレス</strong></td><td>デフォルトの <code>https://api.minimaxi.com/v1</code></td></tr><tr><td><strong>スイッチ</strong></td><td>右上のスイッチをクリックし、<strong>緑色 (ON) になっていることを確認してください</strong></td></tr></tbody></table>

<figure><img src="../../../../assets/d85a4215a6223242d859fc63.webp" alt=""><figcaption></figcaption></figure>

#### ステップ 3：指定モデルの追加 (重要)

Coding Plan は特定のモデルのみサポートしています。誤ったモデルを選択すると、使用できなかったり、追加費用が発生したりする可能性があります。

1. 設定ページの下部にある **管理 (Manage)** ボタンをクリックします。

<figure><img src="../../../../assets/a47dc9b50635537d2cca507d.png" alt=""><figcaption></figcaption></figure>

2. リストから **`MiniMax M2.1`** を見つけて追加します。

{% hint style="warning" %}
**必ず正しいモデルを選択してください！**

* ✅ **推奨**：`MiniMax M2.1` (Coding Plan 指定のメインモデル)。
{% endhint %}

#### ステップ 4：保存と検証 <a href="#headingcab61b6e3e264a4b8e56bc83923488d2-di-si-bu-bao-cun-bing-yan-zheng-0" id="headingcab61b6e3e264a4b8e56bc83923488d2-di-si-bu-bao-cun-bing-yan-zheng-0"></a>

1. API キー入力欄の横にある **検出 (Check)** ボタンをクリックします。
2. 緑色の **Success** が表示されれば、Coding Plan が正常に接続されています。

### 3. 使用量と制限について

Coding Plan は通常の API と課金方式が全く異なります。以下の仕組みを理解してください。

{% hint style="info" %}
**クォータのリフレッシュ機構** Coding Plan のクォータは **周期的にリフレッシュ** されます。例えば Starter プランでは：**5 時間ごと** に **40 回** の対話クォータが提供されます。

* **返信が止まった場合**：現在の 5 時間分のクォータが使い切られたことを意味します。
* **解決策**：数時間休憩し、クォータが自動的に回復するのを待てばよいです。追加費用はかかりません。
{% endhint %}

### 4. よくある問題のトラブルシューティング

{% hint style="danger" %}
**`429 Too Many Requests` エラーが発生しましたか？**

これはソフトウェアの故障ではなく、**Coding Plan のレート制限**がトリガーされたものです。

* 現在の時間帯の「メッセージ送信回数」を使い切ったことを意味します。
* 次の 5 時間周期のリフレッシュを辛抱強くお待ちください。
{% endhint %}

{% hint style="warning" %}
**`401 Unauthorized` エラーが発生しましたか？**

* API Key に余分なスペースがないか確認してください。
* MiniMax 公式サイトにログインし、Coding Plan のサブスクリプションの有効期限が切れていないか確認してください。
{% endhint %}

***

### ヘルプの取得とフィードバックの送信

設定や使用過程で疑問、Bug、機能改善の提案がある場合は、[フィードバックと提案](../../question-contact/suggestions.md) に記載されている公式チャネルを参照してください。
