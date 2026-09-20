---
description: 如何在 Cherry Studio 使用联网模式
icon: globe
---

# Modo online

{% hint style="warning" %}
Este documento ha sido traducido del chino por IA y aún no ha sido revisado.
{% endhint %}

***

### icon: cherries

## Modo de Conexión a Internet

{% hint style="info" %}
Ejemplos de situaciones que requieren conexión a internet:

* Información con caducidad temporal: como los precios de futuros del oro de hoy/esta semana/recientemente.
* Datos en tiempo real: como clima, tipos de cambio y otros valores dinámicos.
* Conocimiento emergente: como nuevas tendencias, conceptos, tecnologías, etc.
{% endhint %}

#### 1. Cómo Activar la Conexión a Internet

En la ventana de preguntas de Cherry Studio, haz clic en el ícono 【Globo Terrestre】 para activar la conexión a internet.

<figure><img src="../../../assets/4d79d767b5fccfcde524f25e.webp" alt=""><figcaption><p>Haz clic en el ícono del globo - Activar conexión</p></figcaption></figure>

<figure><img src="../../../assets/b64a0ae89be7c23149f8a4b8.webp" alt=""><figcaption><p>Indicador - Función de conexión activada</p></figcaption></figure>

#### 2. Atención Especial: Dos Modos de Conexión

**Modo 1: Modelos con función integrada de conexión**

Cuando el modelo del proveedor incluye conectividad nativa, solo debes activarla para usarla inmediatamente.

{% hint style="warning" %}
Puedes identificar rápidamente si un modelo admite conexión verificando si aparece el ícono de mapa pequeño junto a su nombre en la interfaz.
{% endhint %}

<figure><img src="../../../assets/eb60943cb4662c13bfecafec.webp" alt=""><figcaption></figcaption></figure>

Este método también funciona en la página de gestión de modelos para filtrar rápidamente.

<figure><img src="../../../assets/4c3ee46f56cfa1dae47db9bb.webp" alt=""><figcaption></figcaption></figure>

> <mark style="color:green;">**Proveedores actualmente compatibles en Cherry Studio**</mark>
>
> * <mark style="color:green;">Google Gemini</mark>
> * <mark style="color:green;">OpenRouter (todos los modelos)</mark>
> * <mark style="color:green;">Tencent Hunyuan</mark>
> * <mark style="color:green;">Zhipu AI</mark>
> * <mark style="color:green;">Alibaba Cloud Bailian, etc.</mark>

{% hint style="danger" %}
¡Atención!\
Existe un caso especial donde el modelo muestra conectividad sin el ícono, como se explica en esta guía.
{% endhint %}

{% content-ref url="volcengine.md" %}
[volcengine.md](volcengine.md)
{% endcontent-ref %}

***

**Modo 2: Conexión mediante Tavily**

Cuando usas un modelo sin función nativa (sin ícono de globo) pero necesitas datos en tiempo real, utiliza el servicio de búsqueda Tavily.

**Primer uso de Tavily**: Aparecerá un pop-up para configurar la API. ¡Sigue las instrucciones!

<figure><img src="../../../assets/b5d51c1c354249bb738d1960.webp" alt=""><figcaption><p>Pop-up - Haz clic: Configurar</p></figcaption></figure>

<figure><img src="../../../assets/927e47e5a21109bfaa141de7.webp" alt=""><figcaption><p>Haz clic para obtener clave</p></figcaption></figure>

Se redirigirá a la página de registro de **Tavily**. Después de registrarte, crea una API Key y pégala en Cherry Studio.

{% hint style="danger" %}
¿Problemas con el registro? Consulta el tutorial de Tavily en este directorio.
{% endhint %}

**Documento de registro de Tavily:**

{% content-ref url="tavily.md" %}
[tavily.md](tavily.md)
{% endcontent-ref %}

Esta interfase confirma el registro exitoso:

<figure><img src="../../../assets/299733a54b223b710fcf69ab.webp" alt=""><figcaption><p>Copia la clave</p></figcaption></figure>

<figure><img src="../../../assets/19ed88b40a667f9980b07016.webp" alt=""><figcaption><p>Pega la clave - ¡Listo!</p></figcaption></figure>

Prueba el resultado: La búsqueda muestra 5 resultados (valor predeterminado).

<figure><img src="../../../assets/d94183d765526cafc91913e7.webp" alt=""><figcaption></figcaption></figure>

{% hint style="danger" %}
Aviso: Tavily tiene límites mensuales gratuitos. ¡Requiere pago tras excederlos!
{% endhint %}

<figure><img src="../../../assets/fb0388b3f67840064a4101c0.webp" alt=""><figcaption></figcaption></figure>

> PD: Reporta errores contactándonos en cualquier momento.
