# Plan de Codificación de MiniMax

**Coding Plan** es un servicio de suscripción de programación de alto rendimiento lanzado por MiniMax (como los planes Starter/Plus). Al configurar este plan en Cherry Studio, puedes utilizar el modelo `MiniMax-M2.1` con un costo fijo muy bajo (desde ¥29/mes).

{% hint style="success" %}
**Ventajas principales**

* **Público objetivo**: Usuarios con una suscripción a MiniMax Coding Plan (Starter / Plus / Max).
* **Modelo de facturación**: Los límites se renuevan por períodos (por ejemplo, 40 Prompts cada 5 horas), en lugar de facturarse por Token, por lo que no hay que preocuparse por un consumo excesivamente rápido.
{% endhint %}

### 1. Preparativos

Antes de comenzar, asegúrate de haber comprado el plan y de haber obtenido la clave:

1. Inicia sesión en [**MiniMax Open Platform**](https://platform.minimaxi.com/).
2. Ve a la [**página de Coding Plan**](https://platform.minimaxi.com/subscribe/coding-plan?code=FYWiC6CtHy\&source=link) y asegúrate de que el plan esté activo.

    <figure><img src="../../../../assets/e7c5f78ce7b02d24f47e524a.png" alt=""><figcaption></figcaption></figure>
3. En **Coding Plan**, copia tu `API Key` exclusiva (que comienza con `sk-`).

<figure><img src="../../../../assets/b7ad13e5818755c159e9cc7d.webp" alt=""><figcaption></figcaption></figure>

### 2. Pasos de configuración

#### Paso 1: Localizar el proveedor

Entra en Cherry Studio, haz clic en **Configuración** > **Servicios de modelos** en la barra lateral y busca **MiniMax** en la lista.

{% hint style="info" %}
Si la lista es larga, puedes escribir `mini` en el cuadro de búsqueda superior para localizarlo rápidamente.
{% endhint %}

#### Paso 2: Completar la configuración

**No es necesario** modificar la compleja dirección de la API; utiliza la configuración predeterminada. Sigue las siguientes instrucciones para completar los campos:

<table><thead><tr><th width="128.20703125">Parámetro</th><th>Instrucciones de llenado</th></tr></thead><tbody><tr><td><strong>API Key</strong></td><td>Pega tu clave exclusiva de Coding Plan<br><em>(Nota: debe ser la Key generada tras la compra del plan; no debe tener espacios en blanco adicionales)</em></td></tr><tr><td><strong>Dirección de la API</strong></td><td>Mantener el valor predeterminado <code>https://api.minimaxi.com/v1</code></td></tr><tr><td><strong>Interruptor</strong></td><td>Haz clic en el interruptor de la esquina superior derecha para asegurarte de que esté en <strong>verde (ON)</strong></td></tr></tbody></table>

<figure><img src="../../../../assets/d85a4215a6223242d859fc63.webp" alt=""><figcaption></figcaption></figure>

#### Paso 3: Agregar el modelo especificado (crucial)

El plan Coding Plan solo admite modelos específicos; seleccionar el modelo incorrecto impedirá su uso o generará costos adicionales.

1. Haz clic en el botón **Manage** en la parte inferior de la página de configuración.

<figure><img src="../../../../assets/a47dc9b50635537d2cca507d.png" alt=""><figcaption></figcaption></figure>

2. Busca y agrega **`MiniMax M2.1`** en la lista.

{% hint style="warning" %}
**¡Asegúrate de seleccionar el modelo correcto!**

* ✅ **Recomendado**: `MiniMax M2.1` (modelo principal designado para Coding Plan).
{% endhint %}

#### Paso 4: Guardar y verificar <a href="#headingcab61b6e3e264a4b8e56bc83923488d2-di-si-bu-bao-cun-bing-yan-zheng-0" id="headingcab61b6e3e264a4b8e56bc83923488d2-di-si-bu-bao-cun-bing-yan-zheng-0"></a>

1. Haz clic en el botón **Check** junto al campo de entrada de la clave API.
2. Si se muestra **Success** en verde, ¡tu plan Coding Plan se ha conectado con éxito!

### 3. Descripción del uso y las limitaciones

El modelo de facturación de Coding Plan es completamente diferente al de la API estándar. Asegúrate de comprender los siguientes mecanismos:

{% hint style="info" %}
**Mecanismo de renovación de límites** Los límites de Coding Plan se **renuevan periódicamente**. Por ejemplo, el plan Starter ofrece **40** conversaciones cada **5 horas**.

* **Si deja de responder**: significa que has agotado tu límite de las 5 horas actuales.
* **Solución**: descansa unas horas y espera a que el límite se restablezca automáticamente; no es necesario pagar más.
{% endhint %}

### 4. Solución de problemas frecuentes

{% hint style="danger" %}
**¿Encuentras el error `429 Too Many Requests`?**

No es un fallo del software, sino que se ha activado la **limitación de frecuencia de Coding Plan**.

* Esto significa que has agotado el número de "mensajes enviados" para el período actual.
* Espera pacientemente a que se renueve el siguiente ciclo de 5 horas.
{% endhint %}

{% hint style="warning" %}
**¿Encuentras el error `401 Unauthorized`?**

* Revisa si la API Key tiene espacios en blanco adicionales.
* Inicia sesión en el sitio web oficial de MiniMax para confirmar si tu suscripción a Coding Plan ha caducado.
{% endhint %}

***

### Obtener ayuda y enviar comentarios

Si tienes cualquier duda, encuentras un error o tienes sugerencias de mejora de funciones durante la configuración o el uso, consulta los canales oficiales proporcionados en [Comentarios y sugerencias](../../question-contact/suggestions.md).
