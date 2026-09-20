# MCPの設定と使用


{% hint style="warning" %}
このドキュメントはAIによって中国語から翻訳されており、まだレビューされていません。
{% endhint %}




<figure><img src="../../../../assets/7529abac38faff7ba6c35df7.webp" alt=""><figcaption></figcaption></figure>

1. Cherry Studioの設定を開きます。
2. `MCP サーサーバー`オプションを探します。
3. `サーサーバーを追加`をクリックします。
4. MCP Serverの関連パラメータを入力します（[参考リンク](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch)）。入力が必要な内容には以下が含まれます：
   * 名称：任意の名前（例：`fetch-server`）
   * タイプ：`STDIO`を選択
   * コマンド：`uvx`を入力
   * 引数：`mcp-server-fetch`を入力
   * （他に必要なパラメータがある場合、具体的なServerに応じて入力）
5. `保存`をクリックします。

{% hint style="success" %}
上記設定完了後、Cherry Studioは必要なMCP Server（`fetch server`）を自動的にダウンロードします。ダウンロード完了後、すぐに使用を開始できます！注意：mcp-server-fetchの設定が成功しない場合は、コンコンピュータの再起動をお試しください。
{% endhint %}

### チャットボックスでMCPサービスを有効化

<figure><img src="../../../../assets/42ef06ac095d111eb764046e.webp" alt=""><figcaption></figcaption></figure>

* `MCP サーサーバー`設定でMCPサーサーバーが正常に追加された状態

<figure><img src="../../../../assets/0f6c6755dd8f927b51689b82.webp" alt=""><figcaption></figcaption></figure>

### **使用効果のデモ**

<figure><img src="../../../../assets/378dc7f7981305276902ad01.webp" alt=""><figcaption></figcaption></figure>

上図が示す通り、MCPの`fetch`機能を統合することで、Cherry Studioはユーザーの検索意図をより正確に理解し、ウェブから関連情報を取得して、より正確で包括的な回答を提供できます。