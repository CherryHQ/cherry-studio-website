---
icon: code
---
# Desarrollo y diagnóstico

Este conjunto de funciones está dirigido a usuarios que necesitan gestionar CLIs de programación, permitir que otros programas locales invoquen modelos o diagnosticar problemas de solicitudes. No es necesario activar el modo de desarrollador para el chat diario y el trabajo con contenido.

### Dos puntos de entrada

| Punto de entrada | Uso | Verificar antes de usar |
| ----------------- | ---------------------------- | -------------- |
| Lanzador【Compañero de código】 | Instalar, configurar e iniciar CLIs de programación comunes | Origen de la instalación, conexión del modelo y directorio de trabajo |
| 【Configuración】→【API Gateway】 | Proporcionar una API compatible a programas locales; también es una dependencia de ejecución para Agent | Estado, puerto y seguridad de las credenciales |
| 【Configuración】→【General】→【Modo de desarrollador】 | Ver la cadena de llamadas y localizar errores de modelos y herramientas | Los registros pueden contener contenido sensible |

<figure><img src="../../../../assets/1fc9d6c1360e640958305d57.webp" alt="La página de API Gateway muestra de forma centralizada el estado de ejecución, la dirección, el puerto y las credenciales."><figcaption><p>La página de API Gateway muestra de forma centralizada el estado de ejecución, la dirección, el puerto y las credenciales. </p></figcaption></figure>

{% hint style="warning" %}
Las claves de API Gateway y el contenido de las solicitudes en la cadena de llamadas pueden implicar información sensible. En capturas de pantalla, Issues y chats de grupo, comparta solo los fragmentos necesarios con la información sensible oculta.
{% endhint %}

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>API Gateway</strong></td><td>Comprender las dependencias de Agent y las llamadas a la API local</td><td><a href="api-gateway.md">api-gateway.md</a></td></tr><tr><td><strong>Cadena de llamadas y modo de desarrollador</strong></td><td>Reproducir y localizar una solicitud específica</td><td><a href="trace.md">trace.md</a></td></tr></tbody></table>
