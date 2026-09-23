# Anthropic

Anthropic の Claude は、Agent が Anthropic プロトコルエンドポイントを必要とするため、[Cherry Agent](../../advanced-basic/agent.md) のバックエンドとして最も適したモデルの一つです。

## API キーの取得

* [Anthropic Console](https://console.anthropic.com/) にアクセスしてアカウントを登録します
* `Settings → API Keys` → `Create Key` に移動し、生成された `sk-ant-...` キーをコピーします

## Cherry Studio での設定

* `設定 → モデルサービス` を開き、**Anthropic** プロバイダーの詳細ページに移動します
* **API キー** に `sk-ant-...` を入力します
* **API アドレス** はデフォルトで `https://api.anthropic.com` であり、変更は不要です
* **モデルリストの取得** をクリックし、`claude-opus-4`、`claude-sonnet-4`、`claude-haiku-4` などのモデルを追加します

## 推奨される使用法

| モデル | 適したシナリオ |
|---|---|
| `claude-opus-4` | 高度な推論 / プログラミング / 複雑な Agent タスク |
| `claude-sonnet-4` | 一般的な対話と日常の Agent、コストパフォーマンス重視の選択 |
| `claude-haiku-4` | 高スループットシナリオ、低コストでの迅速な応答 |

## Agent シナリオの設定

このプロバイダーを [Cherry Agent](../../advanced-basic/agent.md) の設定でデフォルトのモデルソースとして選択すると、Anthropic プロトコル対応の Agent 機能を直接利用できます。

{% hint style="info" %}
* 中国本土からは Anthropic API に直接アクセスできないため、プロキシの準備が必要です（[一般設定 → プロキシモード](../settings/general.md) を参照）
* Claude Code にサブスクライブしているユーザーは、同じキーとエンドポイントを使用して Cherry Studio に接続できます
* Claude モデルはトークン単位で課金されるため、長いコンテキストでは使用量にご注意ください
{% endhint %}

***

### ヘルプの取得とフィードバックの送信

設定や使用過程で疑問、バグ、または機能改善の提案がある場合は、[フィードバックと提案](../../question-contact/suggestions.md) に記載されている公式チャネルをご利用ください。
