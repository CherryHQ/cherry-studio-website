---
icon: plug
---
# Extender las capacidades del Agent

El Agent ya incluye herramientas integradas para archivos, búsqueda, imágenes, memoria, flujos de trabajo y tareas programadas. Añade habilidades cuando necesites un método de trabajo fijo y añade MCP cuando necesites conectar con sistemas externos. Ambos resuelven problemas distintos; no es necesario instalarlos todos solo para tener "más funciones".

<figure><img src="../../../../assets/cc38d8a6378ca8270ceda746.webp" alt="Prioriza el camino más corto; solo añade MCP si el Agent realmente necesita acceder a un sistema externo."><figcaption><p>Prioriza el camino más corto; solo añade MCP si el Agent realmente necesita acceder a un sistema externo.</p></figcaption></figure>

## Determina primero qué necesitas

| Necesidad | Opción |
| ----------------- | ---------- |
| Fijar un conjunto de pasos, plantillas o listas de verificación | Habilidades |
| Consultar bases de datos, navegadores o sistemas de terceros | MCP |
| Buscar en tus propios documentos y recursos | Base de conocimientos |
| Leer/escribir archivos del proyecto actual, generar imágenes o enviar notificaciones | Herramientas integradas del Agent |

{% hint style="success" %}
La forma más conveniente es describir directamente el objetivo en [Trabajo] y dejar que el Agent te ayude a determinar si falta una habilidad, un MCP o una base de conocimientos. Si necesitas verificar fuentes, parámetros de conexión o permisos, gestiona manualmente en [Configuración].
{% endhint %}

## Último paso tras la instalación

Una instalación global o una conexión exitosa no significa que cada Agent pueda utilizarlo. Abre [Trabajo] → menú Agent → [Editar] y selecciona en [Habilidades], [MCP] o [Base de conocimientos] respectivamente. La configuración entra en vigor a partir del siguiente mensaje.

<figure><img src="../../../../assets/6be829efa6152cf0a3576cba.webp" alt="Las herramientas integradas, la base de conocimientos, el MCP y las habilidades del Agent se configuran por separado; actívalas según las necesidades de la tarea."><figcaption><p>Las herramientas integradas, la base de conocimientos, el MCP y las habilidades del Agent se configuran por separado; actívalas según las necesidades de la tarea.</p></figcaption></figure>

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Habilidades y biblioteca de capacidades</strong></td><td>Instala y reutiliza métodos de trabajo estables</td><td><a href="skills.md">skills.md</a></td></tr><tr><td><strong>MCP y herramientas externas</strong></td><td>Conecta herramientas y fuentes de datos adicionales</td><td><a href="../../../../advanced-basic/extensions/mcp">mcp</a></td></tr><tr><td><strong>Solución de problemas de MCP</strong></td><td>Localiza el problema paso a paso a lo largo de la cadena de conexión</td><td><a href="mcp/troubleshooting.md">troubleshooting.md</a></td></tr></tbody></table>
