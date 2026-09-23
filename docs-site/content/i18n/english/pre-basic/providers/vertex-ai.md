---
description: Claude models are not supported for now
---
# Vertex AI

## Tutorial Overview

### 1. Get API Key

* Before getting a Gemini API Key, you need to have a Google Cloud project (if you already have one, this step can be skipped).
* Go to [Google Cloud](https://console.cloud.google.com/projectcreate) to create a project, fill in the project name, and click "Create Project".

<figure><img src="../../../../assets/8f9c0115bb319f382af9a285.webp" alt=""><figcaption></figcaption></figure>

* Go to the [Vertex AI console](https://console.cloud.google.com/vertex-ai).
* Enable the [Vertex AI API](https://console.cloud.google.com/apis/library/aiplatform.googleapis.com?inv=1\&invt=Ab0iBA) in the created project.

<figure><img src="../../../../assets/96e82ac0955b37a74db6b69a.webp" alt=""><figcaption></figcaption></figure>

## 2. Set API Access Permissions

* Open the [Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts) permission interface and create a service account.

<figure><img src="../../../../assets/30f5231c6907a019ae7b9250.webp" alt=""><figcaption></figcaption></figure>

* On the service account management page, find the newly created service account, click `Keys`, and create a new JSON format key.

<figure><img src="../../../../assets/d320ae7c346ac2b623a4a8ef.webp" alt=""><figcaption></figcaption></figure>

* After successful creation, the key file will be automatically saved to your computer in JSON format. Please **keep it safe**.

## 3. Configure Vertex AI in Cherry Studio

* Select Vertex AI as the service provider.
* Fill in the corresponding fields from the JSON file.

<figure><img src="../../../../assets/7e6fa74e4cec7ed09526cc60.webp" alt=""><figcaption></figcaption></figure>

Click "Add" [Model](https://console.cloud.google.com/vertex-ai/model-garden) and start enjoying it!