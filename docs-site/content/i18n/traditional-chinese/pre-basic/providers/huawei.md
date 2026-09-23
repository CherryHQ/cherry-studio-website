
{% hint style="warning" %}
此文件由 AI 從中文翻譯而來，尚未經過審閱。
{% endhint %}

# 華為雲

一、前往[華為雲](https://auth.huaweicloud.com/authui/login)建立帳號登入

二、點擊[此連結](https://console.huaweicloud.com/modelarts/?region=cn-southwest-2#/model-studio/homepage)，進入ModelArts控制台

三、授權

<details>

<summary>授權步驟（已授權可跳過）</summary>

1.  進入(二)的連結頁面後，根據提示進入授權頁面(點擊IAM子用戶→新增委託→普通用戶)

![](<../../../../assets/aadd7fee72e30b44d96077f9.webp>)

2.  點擊建立後重新返回(二)處連結頁面
3.  會提示訪問權限不足，點擊提示裡的"點擊此處"
4.  追加已有授權並確認

![](<../../../../assets/3822fe0fbffa97d235be312a.webp>)

注意：該方法適用於新手，不用看過多內容，只需根據提示點擊，若可一次性授權成功則按自己方式操作即可。

</details>

四、點擊側欄鑒權管理，建立API Key（密鑰）並複製

<figure><img src="../../../../assets/3c0b273ede5384ab42e9a73f.webp" alt=""><figcaption></figcaption></figure>

然後在CherryStudio裡建立新服務商

<figure><img src="../../../../assets/bf41900ca20696ae6431dcbe.webp" alt="" width="300"><figcaption></figcaption></figure>

建立完成後填入密鑰

五、點擊側欄模型部署，全部領取

<figure><img src="../../../../assets/1873de6008f16a55b00da110.webp" alt=""><figcaption></figcaption></figure>

六、點擊呼叫

<figure><img src="../../../../assets/667fd368893b85c31630e57c.webp" alt=""><figcaption></figcaption></figure>

把①處的地址複製，貼上到CherryStudio的服務商地址中並在結尾加上「#」號

並在結尾加上「#」號

並在結尾加上「#」號

並在結尾加上「#」號

並在結尾加上「#」號

為什麼加「#」號[看這裡](https://docs.cherry-ai.com/cherrystudio/preview/settings/providers#api-di-zhi)

> 當然也可不看那裡，直接按照教程操作即可；
>
> 也可使用刪除v1/chat/completions的方法填寫，只要會填按自己方式怎麼填都行，不會填務必按照教程操作。

<figure><img src="../../../../assets/f52646aeb184a33d1ca5b707.webp" alt=""><figcaption></figcaption></figure>

然後把②處模型名稱複製，到CherryStudio中點「+添加」按鈕新建模型

<figure><img src="../../../../assets/92195d94e22636a89fa27e67.webp" alt=""><figcaption></figcaption></figure>

輸入模型名稱，不要自行增減內容，不帶引號，示例怎麼寫就怎麼抄。

<figure><img src="../../../../assets/88588390c9eae759a0319a2b.webp" alt=""><figcaption></figcaption></figure>

點擊添加模型按鈕即可完成。

{% hint style="info" %}
在華為雲中因每個模型的地址不同，所以每個模型都需要新建服務商，按照以上步驟重複操作即可。
{% endhint %}