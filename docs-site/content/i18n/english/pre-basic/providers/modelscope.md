# ModelScope (MaDap) Platform Access Guide


{% hint style="warning" %}
This document was translated from Chinese by AI and has not yet been reviewed.
{% endhint %}



## What is ModelScope?
> ModelScope is a new generation open-source Model-as-a-Service (MaaS) sharing platform, dedicated to providing general AI developers with **flexible, easy-to-use, and low-cost** one-stop model service solutions, making model application simpler!
>
> Through its **API-Inference as a service capability**, the platform standardizes open-source models into callable API interfaces. Developers can lightly and quickly integrate model capabilities into various AI applications, supporting innovative scenarios such as tool calling and prototype development.

### Core Advantages
- ✅ **Free Quota**: Provides **2000 free API calls** daily ([Billing Rules](##计费与额度规则))
- ✅ **Rich Model Library**: Covers over 1000+ open-source models in NLP, CV, speech, multimodal, etc.
- ✅ **Ready-to-Use**: No deployment needed, quick invocation via RESTful API

---

## Cherry Studio Access Process
### Step 1: Obtain ModelScope API Token
1. **Log in to the Platform**
   - Visit [ModelScope Official Website](https://modelscope.cn) → Click **Login** in the top right corner → Select authentication method
   ![登录界面](../../../../assets/81ab1f79d9eb105d47adeb7c.webp)
2. **Create Access Token**
   - Go to **[Account Settings → Access Token](https://modelscope.cn/my/myaccesstoken)**
   - Click **`New Token`** → Fill in description → **Copy the generated token** (*See page example below*)
   ![新建令牌示例](../../../../assets/183749676e4437e61ed9168f.webp)
   > 🔑 **Important Tip**: Token leakage will compromise account security!

### Step 2: Configure Cherry Studio
- Open **Cherry Studio** → **Settings → Model Services → ModelScope**
- Paste the copied token into the `API Key` field
  ![配置界面](../../../../assets/6c187aa7fa2ce14286cce6e6.webp)
- Click **`Save`** to complete authorization

### Step 3: Call Model API
1. **Find API-supported Models**
   - Visit [ModelScope Model Hub](https://modelscope.cn/models)
   - Filter conditions: **Check `API-Inference`** (or look for the `API` icon on the model card)
   ![API 模型筛选](../../../../assets/e74196f9b0677f509232b2a7.webp)
   > The coverage of API-Inference models is primarily determined by their popularity within the MaDap community (referencing data like likes and downloads). Therefore, the list of supported models will continuously iterate as more powerful and highly-regarded next-generation open-source models are released.
2. **Obtain Model ID**
   - Go to the target model's detail page → Copy the **Model ID** (format like `damo/nlp_structbert_sentiment-classification_chinese-base`)
   ![复制 Model ID](../../../../assets/b280b347b848c9336100c083.webp)
3. **Enter into Cherry Studio**
   - On the model service configuration page, enter the ID in the `Model ID` field → Select task type → Complete configuration
   ![填入模型ID](../../../../assets/a5685729023ae084554989bd.webp)

---

## Billing and Quota Rules
### Important Notes
- 🎫 **Free Quota**: Each user gets **2000 API calls daily** (*subject to the latest rules on the official website*)
- 🔁 **Quota Reset**: Automatically resets daily at UTC+8 00:00, **does not support cross-day accumulation or upgrades**
- 💡 **Exceeding Quota**:
  - API will return `429 error` after reaching the daily limit
  - Solutions: Switch to a backup account / Use other platforms / Optimize call frequency

### View Remaining Quota
- Log in to ModelScope → Click **`Username`** in the top right corner → **`API Usage`**
  ![额度查看位置](../../../../assets/cf9952cb6a67762a088ade28.webp)

> ⚠️ Note: The inference API-Inference has a free daily quota of 2000 calls. For more calling needs, consider using cloud services like Alibaba Cloud Bailian.