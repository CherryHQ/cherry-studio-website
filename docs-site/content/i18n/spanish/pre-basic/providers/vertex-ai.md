---
description: 暂时不支持Claude模型
---
# Vertex AI


{% hint style="warning" %}
Este documento ha sido traducido del chino por IA y aún no ha sido revisado.
{% endhint %}




## Resumen del tutorial

### 1. Obtener la clave de API

* Antes de obtener la clave de API de Gemini, necesitas tener un proyecto de Google Cloud (puedes omitir este paso si ya tienes uno)
* Ve a [Google Cloud](https://console.cloud.google.com/projectcreate) para crear un proyecto, completa el nombre del proyecto y haz clic en "Crear proyecto"

<figure><img src="../../../../assets/8f9c0115bb319f382af9a285.webp" alt=""><figcaption></figcaption></figure>

* Accede a la [consola de Vertex AI](https://console.cloud.google.com/vertex-ai)
* En el proyecto creado, habilita la [API de Vertex AI](https://console.cloud.google.com/apis/library/aiplatform.googleapis.com?inv=1\&invt=Ab0iBA)

<figure><img src="../../../../assets/96e82ac0955b37a74db6b69a.webp" alt=""><figcaption></figcaption></figure>

## 2. Configurar los permisos de acceso a la API

* Abre la interfaz de permisos de [cuentas de servicio](https://console.cloud.google.com/iam-admin/serviceaccounts) y crea una cuenta de servicio

<figure><img src="../../../../assets/30f5231c6907a019ae7b9250.webp" alt=""><figcaption></figcaption></figure>

* En la página de administración de cuentas de servicio, localiza la cuenta que acabas de crear, haz clic en `Claves` y genera una nueva clave en formato JSON

<figure><img src="../../../../assets/d320ae7c346ac2b623a4a8ef.webp" alt=""><figcaption></figcaption></figure>

* Una vez creada, el archivo de clave se guardará automáticamente en tu computadora en formato JSON. **Consérvalo adecuadamente**

## 3. Configurar Vertex AI en Cherry Studio

* Selecciona el proveedor Vertex AI
* Completa los campos correspondientes con el contenido del archivo JSON

<figure><img src="../../../../assets/7e6fa74e4cec7ed09526cc60.webp" alt=""><figcaption></figcaption></figure>

Haz clic en "Añadir [modelo](https://console.cloud.google.com/vertex-ai/model-garden)" y ¡podrás comenzar a usarlo con gusto!