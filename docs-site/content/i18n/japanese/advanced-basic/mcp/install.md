# MCP環境インストール


**MCP(Model Context Protocol)** はオープンソースプロトコルであり、大規模言語モデル（LLM）に標準化された方法でコンテキスト情報を提供することを目的としています。MCPの詳細については[#shen-me-shi-mcpmodel-context-protocol](../../question-contact/knowledge.md#shen-me-shi-mcpmodel-context-protocol "mention")を参照してください。

## Cherry StudioでのMCPの使用

以下では`fetch`機能を例に、Cherry StudioでMCPを使用する方法をデモンストレーションします。詳細は[ドキュメント](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch)で確認できます。

### **準備作業: uvとbunのインストール**

{% hint style="warning" %}
Cherry Studioは現在、組み込みの[uv](https://github.com/astral-sh/uv)と[bun](https://github.com/oven-sh/bun)のみを使用しており、システムに既にインストールされているuvとbunを**再利用しません**。
{% endhint %}

`設定 - MCPサーバー`で`インストール`ボタンをクリックすると、自動的にダウンロードとインストールが行われます。GitHubから直接ダウンロードするため速度が遅くなる可能性があり、失敗する可能性も高くなります。インストールの成否は、後述のフォルダ内にファイルがあるかどうかで判断してください。

<figure><img src="../../../../assets/38ba4e28ad7b127dfc076bdd.webp" alt=""><figcaption></figcaption></figure>

**実行可能ファイルのインストールディレクトリ:**

Windows: `C:\Users\ユーザー名\.cherrystudio\bin`

macOS、Linux: `~/.cherrystudio/bin`

<figure><img src="../../../../assets/4530467354bd83755e92e34f.webp" alt=""><figcaption><p>binディレクトリ</p></figcaption></figure>

**正常にインストールできない場合:**

システム内の対応するコマンドをソフトリンクでここにリンクできます。対応するディレクトリがない場合は手動で作成してください。または手動で実行可能ファイルをダウンロードしてこのディレクトリに配置することも可能です:

Bun: [https://github.com/oven-sh/bun/releases](https://github.com/oven-sh/bun/releases)\
UV: [https://github.com/astral-sh/uv/releases](https://github.com/astral-sh/uv/releases)