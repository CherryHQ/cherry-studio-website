# Azure OpenAI

Azure OpenAI es el servicio de modelos de OpenAI alojado por Microsoft en Azure, adecuado para equipos que requieren cumplimiento empresarial, compromisos de residencia de datos o integración con el ecosistema de Microsoft.

## Preparación previa

* Suscripción a Azure activada
* Solicitud y aprobación de acceso al servicio Azure OpenAI completadas en Azure Portal
* Al menos un **recurso (Resource)** y una **implementación (Deployment)** creados

## Obtener la API Key

* Azure Portal → Tu recurso de Azure OpenAI → `Keys and Endpoint`
* Copia `KEY 1` o `KEY 2` y anota `Endpoint` (formato: `https://<your-name>.openai.azure.com/`)

## Configuración en Cherry Studio

* Abre `Configuración → Servicios de modelos`, encuentra el proveedor **Azure OpenAI** y entra en la página de detalles
* **Clave API**: introduce la KEY copiada
* **Dirección API**: introduce el Endpoint del recurso (sin la ruta final)
* **Versión API**: introduce la versión de API de tu implementación en el campo específico (por ejemplo, `2024-08-01-preview`)
* Haz clic en **Obtener lista de modelos** o añade manualmente el nombre de los modelos que ya hayas implementado en Azure (es decir, el Deployment Name, no el ID de modelo original de OpenAI)

{% hint style="warning" %}
**Deployment Name vs Model ID**: Azure utiliza el nombre que hayas asignado a la implementación (por ejemplo, `gpt-4o-prod`), no el ID original como `gpt-4o`. Si se introduce incorrectamente, se producirá un error 404.
{% endhint %}

## Uso recomendado

* **gpt-4o / gpt-4o-mini**: conversación general, Agent
* **gpt-4 turbo**: contexto largo
* **text-embedding-3-**\*: modelos de incrustación, útiles para bases de conocimiento

## Preguntas frecuentes

* **401 Unauthorized**: verifica que la Key sea correcta y que no haya barras diagonales finales adicionales en el Endpoint
* **404 Not Found**: verifica que el Deployment Name coincida con el de Azure y que se haya introducido la Versión API
* **429 Throttled**: verifica las cuotas de Azure (página Quota & Limits)

***

### Obtener ayuda y enviar comentarios

Si tienes cualquier duda, detectas un error o tienes sugerencias de mejora de funciones durante la configuración o el uso, consulta los canales oficiales proporcionados en [Comentarios y sugerencias](../../question-contact/suggestions.md).
