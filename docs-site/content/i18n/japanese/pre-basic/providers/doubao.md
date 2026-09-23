# バイトダンス（豆包）


* [火山引擎](https://console.volcengine.com/)にログイン
* 直接 [ここからアクセス](https://console.volcengine.com/ark/region:ark+cn-beijing/openManagement?LLM=%7B%7D)

<figure><img src="../../../../assets/748f7813cf1fde645a968c13.webp" alt=""><figcaption></figcaption></figure>

### APIキーの取得

* サイドバー下部の [API Key管理](https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey)をクリック
* APIキーを作成

<figure><img src="../../../../assets/565501695d6ec77af56b0d94.webp" alt=""><figcaption></figcaption></figure>

* 作成後、生成されたAPIキーの「👁️」アイコンをクリックして表示・コピー

<figure><img src="../../../../assets/abead8dd3efc80aa8dfe9b88.webp" alt=""><figcaption></figcaption></figure>

* コピーしたAPIキーをCherryStudioに入力後、プロバイダーのトグルを有効化

<figure><img src="../../../../assets/fec7f5e64d98a659fa27ff9c.webp" alt=""><figcaption></figcaption></figure>

### モデルの有効化と追加

* 方舟コンソールのサイドバー最下部の [开通管理](https://console.volcengine.com/ark/region:ark+cn-beijing/openManagement?LLM=%7B%7D\&OpenTokenDrawer=false) で使用するモデル（豆包シリーズやDeepSeekなど）を有効化

<figure><img src="../../../../assets/b921f99f2e21714c0ef9cafb.webp" alt=""><figcaption></figcaption></figure>

* [モデルリストドキュメント](https://www.volcengine.com/docs/82379/1330310#%E6%96%87%E6%9C%AC%E7%94%9F%E6%88%90) から対象モデルのモデルIDを確認

<figure><img src="../../../../assets/cba9e28d82aef11147fc01c6.webp" alt="バイトダンス（豆包） — 説明画像"><figcaption></figcaption></figure>

* Cherry Studioの [モデルサービス設定](../../cherrystudio/preview/settings/providers.md) で火山エンジンを選択
* 「追加」をクリックし、取得したモデルIDを入力

<figure><img src="../../../../assets/70c3827ffb29455676fb2fb0.webp" alt=""><figcaption></figcaption></figure>

* 同様の手順でモデルを追加

### APIエンドポイント

APIエンドポイントは2種類の形式が利用可能:

* クライアントデフォルト: `https://ark.cn-beijing.volces.com/api/v3/`
* 代替形式: `https://ark.cn-beijing.volces.com/api/v3/chat/completions#`

{% hint style="info" %}
両形式に機能差はありません。デフォルト設定のままで変更不要です。

末尾の`/`と`#`の違いについては、プロバイダー設定の[APIエンドポイントセクション](../../cherrystudio/preview/settings/providers.md#api-アドレス)を参照
{% endhint %}

<figure><img src="../../../../assets/91ce519c471ef98b7840a33e.webp" alt=""><figcaption><p>公式ドキュメントのcURL例</p></figcaption></figure>
