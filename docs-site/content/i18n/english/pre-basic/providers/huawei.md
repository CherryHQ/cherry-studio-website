# Huawei Cloud

I. Go to [Huawei Cloud](https://auth.huaweicloud.com/authui/login) to create an account and log in.

II. Click [this link](https://console.huaweicloud.com/modelarts/?region=cn-southwest-2#/model-studio/homepage) to enter the Maa S console.

III. Authorization

<details>

<summary>Authorization Steps (Skip if already authorized)</summary>

1. After entering the link page from step (II), follow the prompts to enter the authorization page (click IAM Sub-user → New Delegation → Ordinary User).

![](<../../../../assets/aadd7fee72e30b44d96077f9.webp>)

2. After clicking Create, return to the link page from step (II).
3. If prompted with insufficient access permissions, click "Click here" in the prompt.
4. Add existing authorization and confirm.

![](<../../../../assets/3822fe0fbffa97d235be312a.webp>)

&#x20;Note: This method is suitable for beginners. You don't need to read too much content; just click according to the prompts. If you can authorize successfully in one go, you can do it your way.

</details>

IV. Click "Authentication Management" in the sidebar, create an API Key, and copy it.

<figure><img src="../../../../assets/3c0b273ede5384ab42e9a73f.webp" alt=""><figcaption></figcaption></figure>

Then, create a new provider in CherryStudio.

<figure><img src="../../../../assets/bf41900ca20696ae6431dcbe.webp" alt="" width="300"><figcaption></figcaption></figure>

After creation, fill in the API Key.

V. Click "Model Deployment" in the sidebar and claim all.

<figure><img src="../../../../assets/1873de6008f16a55b00da110.webp" alt=""><figcaption></figcaption></figure>

VI. Click "Invoke".

<figure><img src="../../../../assets/667fd368893b85c31630e57c.webp" alt=""><figcaption></figcaption></figure>

Copy the address from ①, paste it into the CherryStudio provider address, and add a "#" at the end.

And add a "#" at the end.

And add a "#" at the end.

And add a "#" at the end.

And add a "#" at the end.

Why add "#"? [See here](../settings/providers.md#api-di-zhi)

> Of course, you can also skip reading that and just follow the tutorial;
>
> You can also fill it in by deleting "v1/chat/completions". If you know how to fill it, you can do it your way. If not, be sure to follow the tutorial.

<figure><img src="../../../../assets/f52646aeb184a33d1ca5b707.webp" alt=""><figcaption></figcaption></figure>

Then, copy the model name from ②, and click the "+ Add" button in CherryStudio to create a new model.

<figure><img src="../../../../assets/92195d94e22636a89fa27e67.webp" alt=""><figcaption></figcaption></figure>

Enter the model name, do not embellish or add quotes; copy it exactly as shown in the example.

<figure><img src="../../../../assets/88588390c9eae759a0319a2b.webp" alt=""><figcaption></figcaption></figure>

Click the "Add Model" button to complete the addition.

{% hint style="info" %}
In Huawei Cloud, since the address for each model is different, each model requires a new provider. You can repeat the steps above.
{% endhint %}