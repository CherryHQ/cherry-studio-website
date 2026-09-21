---
hidden: True
icon: globe-pointer
---


# 火山エンジンでのネットワーク接続方法

### 1、「火山エンジン」アカウントのログイン/登録 <a href="#rclz7" id="rclz7"></a>

公式サイトにアクセス：[https://www.volcengine.com/](https://www.volcengine.com/)

<figure><img src="../../../assets/98bfb5c300d7cd815aedf4c7.webp" alt=""><figcaption><p>火山エンジン公式サイト</p></figcaption></figure>

### 2、ネットワーク接続可能な「マイアプリ」を作成 <a href="#gvzaa" id="gvzaa"></a>

2.1、 火山エンジンにログインし、「火山方舟」ページへ移動： [https://console.volcengine.com/ark](https://console.volcengine.com/ark)

2.2、 **順番にクリック：**<mark style="color:red;">**「マイアプリ」→「アプリ作成」→「ノーコード」→「シングルチャット」**</mark> 

<figure><img src="../../../assets/ee60f999a4dccbbdce8881e5.webp" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../assets/fec0d788d8d23f729247d79d.webp" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../assets/9e4bb430ed758a3ffe559a59.webp" alt=""><figcaption></figcaption></figure>

### 3、情報入力とアプリ公開 <a href="#zzdfe" id="zzdfe"></a>

**アプリ名**：任意の名前を指定（<mark style="color:red;">**\*必須項目**</mark>、他は空欄可）

<mark style="color:red;">**重要：ネットワークプラグインを有効化（事前にアクティベートが必要）**</mark>

<figure><img src="../../../assets/5235ef3b0757059a7fd00447.webp" alt=""><figcaption></figcaption></figure>

#### 3.1、 ネットワークプラグイン機能のアクティベート（費用制限と無料枠に注意） <a href="#mwn38" id="mwn38"></a>

<figure><img src="../../../assets/c4170cccee5de8c993b0b586.webp" alt=""><figcaption><p>「今すぐ購入」をクリックし、以下の画面が表示されるまで手順を進めるとアクティベーション完了</p></figcaption></figure>

<figure><img src="../../../assets/2d729a056d0bd71aa627b48a.webp" alt=""><figcaption><p>ステータスを確認、これでアクティベーション成功</p></figcaption></figure>

その後、先ほどの「アプリ情報入力」画面に戻って操作を続行

<figure><img src="../../../assets/47360c539ee128f39b86020c.webp" alt=""><figcaption></figcaption></figure>

#### 3.2、ネットワーク検索「詳細設定」説明 <a href="#sp6uz" id="sp6uz"></a>

推奨設定：

* 入出力を精密制御する場合：「**カスタム呼び出し**」を選択
* 簡便化したい場合：デフォルトの「**自動呼び出し**」を使用
* 情報鮮度を最優先する場合：「**強制有効化**」を選択

<figure><img src="../../../assets/e886e47fc99c10deaf5e80e3.webp" alt=""><figcaption></figcaption></figure>

#### 3.3、アプリ公開 <a href="#fe1gf" id="fe1gf"></a>

右上の「公開」ボタンをクリックしアプリ作成完了

<figure><img src="../../../assets/09b6fa788839c08e605d9128.webp" alt=""><figcaption></figcaption></figure>

### 4、API Keyの取得 <a href="#jtqlu" id="jtqlu"></a>

**「API呼び出しガイド」→「API Key選択＆コピー」→「表示して選択」**

API Keyをコピーし、cherry studioに貼り付け（詳細は以下画面参照）

<figure><img src="../../../assets/8322870a4161de7ff5d860f5.webp" alt=""><figcaption></figcaption></figure>

注意：API Keyがない場合、ポップアップ右上の「**API Key作成**」から生成後コピー

<figure><img src="../../../assets/9100d8ab913d8976f53cd0c7.webp" alt=""><figcaption></figcaption></figure>

### 5、cherry studioでAPI Keyを使用したdeepseek-R1ネットワークアクセス <a href="#lrefj" id="lrefj"></a>

#### 5.1、cherry studio起動 → 「設定」→「任意名称入力」→「タイプ：openAI」 <a href="#dvrbv" id="dvrbv"></a>

<figure><img src="../../../assets/6b84bd9cf3e91737c3b3a7a3.webp" alt="" width="375"><figcaption></figcaption></figure>

<figure><img src="../../../assets/dacbd055825146aa4031a7e7.webp" alt="" width="375"><figcaption></figcaption></figure>

#### 5.2、URLとキーの設定 <a href="#mt8y0" id="mt8y0"></a>

<figure><img src="../../../assets/d85bb2796ec18d77b27164e3.webp" alt=""><figcaption></figcaption></figure>

<mark style="color:purple;">注意：URLが見つからない/北京ノードでない場合、こちらで確認（末尾の「/」忘れずに）：</mark>

<figure><img src="../../../assets/ef3bcae1b0f5e786077b2373.webp" alt=""><figcaption></figcaption></figure>

#### 5.3、モデル名の追加 <a href="#qmh3i" id="qmh3i"></a>

注：小文字表記のモデル名をコピー（誤るとエラー発生）

<figure><img src="../../../assets/53b0e97b6a0b9680e673974e.webp" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../assets/7a43cd735df850805b24394c.webp" alt=""><figcaption></figcaption></figure>

### 6、 動作プレビュー <a href="#peb2p" id="peb2p"></a>

<figure><img src="../../../assets/769e08e7462e840976de738b.webp" alt=""><figcaption></figcaption></figure>