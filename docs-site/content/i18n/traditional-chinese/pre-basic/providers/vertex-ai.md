---
---
# Vertex AI


{% hint style="warning" %}
此文件由 AI 從中文翻譯而來，尚未經過審閱。
{% endhint %}


## 教程概述

### 1. 取得 API 金鑰

* 取得 Gemini 的 API 金鑰前，您需要有一個 Google Cloud 專案（若已有專案可跳過此步驟）
* 前往 [Google Cloud](https://console.cloud.google.com/projectcreate) 建立專案，填寫專案名稱並點擊建立專案

<figure><img src="../../../../assets/96f8921000b0e49a48a28947.webp" alt=""><figcaption></figcaption></figure>

* 進入 [Vertex AI 控制台](https://console.cloud.google.com/vertex-ai)
* 在建立的專案中啟用 [Vertex AI API](https://console.cloud.google.com/apis/library/aiplatform.googleapis.com?inv=1\&invt=Ab0iBA)

<figure><img src="../../../../assets/96e82ac0955b37a74db6b69a.webp" alt=""><figcaption></figcaption></figure>

## 2. 設定 API 存取權限

* 開啟 [服務帳號](https://console.cloud.google.com/iam-admin/serviceaccounts) 權限介面，建立服務帳號

<figure><img src="../../../../assets/30f5231c6907a019ae7b9250.webp" alt=""><figcaption></figcaption></figure>

* 在服務帳號管理頁面找到新建的服務帳號，點擊`金鑰`並建立新的 JSON 格式金鑰

<figure><img src="../../../../assets/d320ae7c346ac2b623a4a8ef.webp" alt=""><figcaption></figcaption></figure>

* 建立成功後，金鑰檔案將以 JSON 格式自動儲存到您的電腦，請 **妥善保存**

## 3. 在Cherry Studio中設定Vertex AI

* 選擇Vertex AI服務供應商
* 將JSON檔案的對應欄位填入

<figure><img src="../../../../assets/7e6fa74e4cec7ed09526cc60.webp" alt=""><figcaption></figcaption></figure>

點擊新增 [模型](https://console.cloud.google.com/vertex-ai/model-garden)，即可開始使用！