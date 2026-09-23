---
icon: robot
---
# Cherry Agent 操作ガイド


Cherry Studio v1.7.0.alpha バージョンでは Agent 機能が導入され、Cherry Studio 内で Claude Code を使用できるようになりました。本チュートリアルでは設定と起動の完全な手順を説明します。

### 1. Anthropic タイプのプロバイダーを作成する

&#x20;Anthropic エンドポイントをサポートするサービスプロバイダーならどれでも使用可能です。例として CherryIn を使い、新しい Agent サービスプロバイダーを作成し、キーとアドレスを入力し、任意のモデルを追加します。(⚠️Agent モードではトークンを大量に消費しますので、トークン使用量にご注意ください)

> Claude Code のサブスクリプション契約済みユーザーは、キーと URL アドレスを入力してモデルを取得することもできます

<figure><img src="../../../assets/0ee97a14dd6d07fb66daeb63.webp" alt=""><figcaption></figcaption></figure>

### 2. API サーバーを有効化する

<figure><img src="../../../assets/12db3239749425ba5b13d258.webp" alt=""><figcaption></figcaption></figure>

### 3. Agent を作成する

<figure><img src="../../../assets/43251ee7a7c9efe0a83c1b7f.webp" alt=""><figcaption></figcaption></figure>

Agent を右クリックすると編集画面に入り、Agent の権限や使用可能なツール/MCP サービスを編集できます。

<figure><img src="../../../assets/f6156d4fdb933e796cd6a1eb.webp" alt=""><figcaption></figcaption></figure>

### 結果表示

<figure><img src="../../../assets/3ce62a6c9016deabf2613443.webp" alt=""><figcaption></figcaption></figure>