---
description: cherry studio使用「火山引擎」接入deepseekR1联网功能，喂饭教程。
hidden: True
icon: globe-pointer
---
# Volcengine Internet Access Integration


{% hint style="warning" %}
This document was translated from Chinese by AI and has not yet been reviewed.
{% endhint %}




### 1. Log in/Register for a "Volcengine" account <a href="#rclz7" id="rclz7"></a>

Visit official website: [https://www.volcengine.com/](https://www.volcengine.com/)

<figure><img src="../../../assets/98bfb5c300d7cd815aedf4c7.webp" alt=""><figcaption><p>Volcengine Official Website</p></figcaption></figure>

### 2. Create "My Application" with Internet Access <a href="#gvzaa" id="gvzaa"></a>

2.1. Log in to Volcengine, go to the "Volcengine Ark" page, portal: [https://console.volcengine.com/ark](https://console.volcengine.com/ark)

2.2. **Click in order:** <mark style="color:red;">**"My Applications" - "Create Application" - "No-Code" - "Single Chat"**</mark> &#x20;

<figure><img src="../../../assets/ee60f999a4dccbbdce8881e5.webp" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../assets/fec0d788d8d23f729247d79d.webp" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../assets/9e4bb430ed758a3ffe559a59.webp" alt=""><figcaption></figcaption></figure>

### 3. Fill in Information and Publish Application <a href="#zzdfe" id="zzdfe"></a>

**Application Name**: You can name it anything according to the requirements. (Fields marked with <mark style="color:red;">**\* are required**</mark>, others can be left blank)

<mark style="color:red;">**Key point: The Internet Access Plugin must be enabled (needs to be activated first)**</mark>

<figure><img src="../../../assets/5235ef3b0757059a7fd00447.webp" alt=""><figcaption></figcaption></figure>

#### 3.1. Enable Internet Access Plugin (Note costs and free usage) <a href="#mwn38" id="mwn38"></a>

<figure><img src="../../../assets/c4170cccee5de8c993b0b586.webp" alt=""><figcaption><p>Click "Buy Now" and follow the steps until the interface below is displayed, indicating successful activation.</p></figcaption></figure>

<figure><img src="../../../assets/2d729a056d0bd71aa627b48a.webp" alt=""><figcaption><p>Note the status, activation is successful.</p></figcaption></figure>

Then return to the "Fill in Application Information" interface and continue.

<figure><img src="../../../assets/47360c539ee128f39b86020c.webp" alt=""><figcaption></figcaption></figure>

#### 3.2. Internet Search "Advanced Configuration" Description <a href="#sp6uz" id="sp6uz"></a>

Choose according to actual needs, personal suggestions:

*   If you want precise control over input and output, you can use "**Custom Call**" for internet access;
*   If you find it troublesome, you can leave it unchanged and use "**Auto Call**" - default value;
*   If budget is not an issue and real-time information is critical, you can "**Force Enable**".

<figure><img src="../../../assets/e886e47fc99c10deaf5e80e3.webp" alt=""><figcaption></figcaption></figure>

#### 3.3. Publish Application <a href="#fe1gf" id="fe1gf"></a>

Click the "Publish" button in the upper right corner to successfully create the application.

<figure><img src="../../../assets/09b6fa788839c08e605d9128.webp" alt=""><figcaption></figcaption></figure>

### 4. Obtain API Key <a href="#jtqlu" id="jtqlu"></a>

Click in order: **"API Calling Guide" - "Select API Key and Copy" - "View and Select"**

Copy the API key first, then go to cherry studio and paste it. (For operation details, see the interface below)

<figure><img src="../../../assets/8322870a4161de7ff5d860f5.webp" alt=""><figcaption></figcaption></figure>

Note: If there is no API key, click "**Create API Key**" in the upper right corner of the pop-up window, then copy the API key.

<figure><img src="../../../assets/9100d8ab913d8976f53cd0c7.webp" alt=""><figcaption></figcaption></figure>

### 5. Use API Key in cherry studio to enable internet access for deepseek-R1 <a href="#lrefj" id="lrefj"></a>

#### 5.1. Open cherry studio - "Settings" - "Name it anything" - "Type: openAI" <a href="#dvrbv" id="dvrbv"></a>

<figure><img src="../../../assets/6b84bd9cf3e91737c3b3a7a3.webp" alt="" width="375"><figcaption></figcaption></figure>

<figure><img src="../../../assets/dacbd055825146aa4031a7e7.webp" alt="" width="375"><figcaption></figcaption></figure>

#### 5.2. Configure URL and Key <a href="#mt8y0" id="mt8y0"></a>

<figure><img src="../../../assets/d85bb2796ec18d77b27164e3.webp" alt=""><figcaption></figcaption></figure>

<mark style="color:purple;">Note, if you can't find the address, or if it's not a Beijing node, you can find the specific address here. Don't forget the "/" character:</mark>

<figure><img src="../../../assets/ef3bcae1b0f5e786077b2373.webp" alt=""><figcaption></figcaption></figure>

#### 5.3. Add Model Name <a href="#qmh3i" id="qmh3i"></a>

Note, copy the small text below as the model name, otherwise it will cause an error.

<figure><img src="../../../assets/53b0e97b6a0b9680e673974e.webp" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../assets/7a43cd735df850805b24394c.webp" alt=""><figcaption></figcaption></figure>

### 6. Preview of Effect <a href="#peb2p" id="peb2p"></a>

<figure><img src="../../../assets/769e08e7462e840976de738b.webp" alt=""><figcaption></figcaption></figure>