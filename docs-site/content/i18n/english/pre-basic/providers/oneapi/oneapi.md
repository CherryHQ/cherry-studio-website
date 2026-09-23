

# OneAPI

* Log in and navigate to the tokens page

<figure><img src="../../../../../assets/68288a2c3a095035189e8d25.webp" alt=""><figcaption></figcaption></figure>

* Create a new token (you can also directly use the default token ↑)

<figure><img src="../../../../../assets/b52ed2463a5c1ea3de393a3e.webp" alt="" width="563"><figcaption></figcaption></figure>

* Copy the token

<figure><img src="../../../../../assets/e485ab0dd933dd974e8648e3.webp" alt="" width="563"><figcaption></figcaption></figure>

* Open CherryStudio's service provider settings and click `Add` at the bottom of the provider list
* Enter a note name, select OpenAI as the provider, and click OK

<figure><img src="../../../../../assets/50df1585fd248479a6cb76c5.webp" alt="" width="291"><figcaption></figcaption></figure>

* Paste the key you just copied
* Return to the API Key page, copy the root address from the browser's address bar, for example:

<figure><img src="../../../../../assets/15e84703b85e9e47c3de65e4.webp" alt="" width="563"><figcaption><p><strong>Only copy https://xxx.xxx.com - do not include content after "/"</strong></p></figcaption></figure>

{% hint style="info" %}
* When the address is IP + port, fill in http://IP:port, e.g., http://127.0.0.1:3000
* Strictly distinguish between `http` and `https` - don't use https if SSL isn't enabled
{% endhint %}

* Add models (click Manage to auto-fetch or enter manually) and toggle the switch in the top right corner to start using.

{% hint style="success" %}
The interface may differ in other OneAPI themes, but the addition method follows the same workflow as above.
{% endhint %}