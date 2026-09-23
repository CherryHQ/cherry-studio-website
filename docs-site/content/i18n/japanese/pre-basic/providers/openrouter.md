# OpenRouter

OpenRouter は **統合ゲートウェイ** であり、1 つのキーで 200 以上のベンダーの対話モデル（GPT、Claude、Gemini、Llama、DeepSeek など）に接続できます。トークン単位の課金方式を採用しており、複数モデルの比較や、各ベンダーへの個別アカウント登録が困難なユーザーに適しています。

## API キーの取得

* [OpenRouter](https://openrouter.ai/) にアクセスしてアカウントを登録します
* `Settings → Keys` → `Create Key` に移動し、`sk-or-...` キーをコピーします
* 任意の金額（最低 $1）をチャージします

## Cherry Studio での設定

* `設定 → モデルサービス` を開き、**OpenRouter** プロバイダーの詳細ページに移動します
* **API キー** に `sk-or-...` を入力します
* **API アドレス** はデフォルトで `https://openrouter.ai/api` であり、変更は不要です
* **モデルリストの取得** をクリックすると、OpenRouter から数百の利用可能なモデルが返されます

## 推奨される使い方

OpenRouter のモデル ID は `<vendor>/<model>` のような形式です：

| モデル ID の例 | 実際のモデル |
| ----------------------------------- | ------------------------- |
| `openai/gpt-4o` | OpenAI GPT-4o |
| `anthropic/claude-sonnet-4` | Anthropic Claude Sonnet 4 |
| `google/gemini-2.0-flash` | Google Gemini Flash |
| `meta-llama/llama-3.3-70b-instruct` | Meta Llama 3.3 70B |
| `deepseek/deepseek-chat` | DeepSeek V3 |
| `x-ai/grok-4` | xAI Grok |

## 適用シーン

* **複数モデルの A/B 比較**：同じ Cherry Studio プロバイダー内でモデルを自由に切り替えられ、プロバイダーの切り替えは不要です
* **個別登録の回避**：1 つのキーと 1 つの請求書で 200 以上のモデルを利用できます
* **ニッチなモデル**：多くの小規模ベンダーは OpenRouter 経由でのみ提供しています（Cohere、Reka など）

## ネイティブなウェブ検索と URL 読み取り

OpenRouter の対話モデルは、ネイティブなウェブ検索と URL コンテンツの読み取りを利用できます。モデルを選択する際は、名称の横にある 🌐 アイコンを確認し、対話入力欄で 🌐 を有効にしてください。

【設定】→【ウェブ検索】内の【設定済み検索サービスを優先使用】がオンになっている場合、Cherry Studio は外部検索サービスを優先的に使用します。このオプションをオフにすると、OpenRouter のモデルのネイティブ機能が優先的に使用されます。プロバイダーはウェブ接続リクエストに対して別途課金する場合があります。実際の費用は OpenRouter の請求書に基づきます。

## Anthropic プロトコルとの関係

OpenRouter はデフォルトで OpenAI プロトコル形式を使用してすべてのアップストリームモデルをラップします。これは以下のことを意味します：

* ✅ 通常の対話、ナレッジベース、クイックアシスタントはすべて利用可能です
* ⚠️ [Cherry Agent](../../advanced-basic/agent.md) には **Anthropic / CherryIN を直接使用することを推奨** します。OpenRouter 経由にしないでください（Agent は Anthropic ネイティブプロトコルが必要です）

{% hint style="info" %}
- OpenRouter は元のベンダー価格に少量の追加料金（通常 5-10%）を上乗せしていますが、「1 つのアカウントで共通利用可能」な利便性を提供しています
- 一部のモデルは "free" バージョン（無料だがレート制限あり）を利用できます。フィルタリングする際は `(free)` サフィックス付きのエントリに注意してください
- 詳細な価格表は [OpenRouter Models](https://openrouter.ai/models) を参照してください
{% endhint %}

***

### ヘルプの取得とフィードバックの送信

設定や使用過程で疑問、バグ、または機能改善の提案がある場合は、[フィードバックと提案](../../question-contact/suggestions.md) に記載されている公式チャネルを参照してください。
