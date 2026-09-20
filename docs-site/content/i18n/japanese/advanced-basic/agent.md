---
icon: robot
---
# Cherry Agent の使い方ガイド


{% hint style="warning" %}
このドキュメントはAIによって中国語から翻訳されており、まだレビューされていません。
{% endhint %}




Cherry Studio v1.7.0.alpha バージョンで Agent が導入されました。Cherry Studio 内で Cherry Agent を使用できます。このチュートリアルでは、設定から起動までの手順を案内します。

### 1. Anthropic タイプのプロバイダを作成する

Anthropic エンドポイントをサポートする任意のサービスプロバイダを使用できます。例として CherryIn を使用し、新しい Agent サービスプロバイダを作成し、キーとアドレスを入力し、任意のモデルを追加します。

{% hint style="warning" %}
Agent モードではトークンの消費量が非常に大きいため、トークンの使用量にご注意ください
{% endhint %}

{% hint style="info" %}
Claude Code にサブスクライブしているユーザーも、キーと URL アドレスを入力してモデルを取得できます
{% endhint %}

<figure><img src="../../../assets/0ee97a14dd6d07fb66daeb63.webp" alt=""><figcaption></figcaption></figure>

### 2. API サーバーを有効化する

<figure><img src="../../../assets/12db3239749425ba5b13d258.webp" alt=""><figcaption></figcaption></figure>

### 3. Agent を作成する

<figure><img src="../../../assets/43251ee7a7c9efe0a83c1b7f.webp" alt=""><figcaption></figcaption></figure>

Agent を右クリックすると編集画面に入り、Agent の権限や利用可能なツール、mcp サービスを編集できます。

<figure><img src="../../../assets/f6156d4fdb933e796cd6a1eb.webp" alt=""><figcaption></figcaption></figure>

### 結果表示

<figure><img src="../../../assets/3ce62a6c9016deabf2613443.webp" alt=""><figcaption></figcaption></figure>