---
icon: table-columns
---
# Diferencias de funciones

V2 ajustó la estructura de datos y varios puntos de entrada de funciones. Antes de actualizar, revise los elementos que requieren reconfiguración; consulte los pasos específicos en [【De V1 a V2】](v1-to-v2-migration.md).

## Cambios de migración en V2

| Situación | Método de manejo en V2 | Notas |
| --------- | ----------------------- | ------------------------------ |
| Migración inicial desde V1 | Se puede instalar V2 directamente desde V1.9.13 | No es necesario instalar primero una versión intermedia específica de V2. |
| Actualización normal de V2 | Actualice directamente y continúe usando los datos actuales de V2 | No haga clic en [Re-migrar]. |
| Re-migración de V1 | En [Configuración] → [Datos], seleccione [Re-migrar] | Los datos actuales de V2 se eliminarán permanentemente; solo se utiliza si la migración anterior falló o si faltan datos. |

{% hint style="danger" %}
[Re-migrar] no combina ni complementa los datos de V1 con los datos actuales de V2. Primero elimina los datos actuales de V2 y luego vuelve a importar desde los datos de V1 conservados. Si no se trata de un fallo de migración de V1 o de datos omitidos, no haga clic en esta opción bajo ninguna circunstancia.
{% endhint %}

## Cómo se manejan los datos

| Método de manejo | Alcance de los datos | Qué hacer después de la actualización |
| ---- | --------------------------------------------------------------------- | ------------- |
| Migración automática | Configuración, servicios de modelos y modelos, asistentes y grupos, sesiones y mensajes, Agent y sesiones, MCP, base de conocimientos e índices válidos, archivos, dibujo, traducción, notas, prompts, registros de uso | Verifique que los elementos de uso frecuente se abran correctamente. |
| Requiere revisión | Credenciales de Anthropic, servicio predeterminado de búsqueda web, permisos de herramientas de Agent y vinculaciones con base de conocimientos, orden de prompts, elementos fallidos de la base de conocimientos, CSS personalizado, favoritos de la barra lateral, archivos faltantes | Confirme nuevamente según la tabla siguiente. |
| No se hereda | Historial de tareas programadas de Agent, resultados de despliegue de mapas del sitio de versiones anteriores, algunas referencias de imágenes temporales, estado de apertura actual de las notas, configuración de funciones eliminadas | Recréelos si es necesario. |

{% hint style="info" %}
La migración no elimina los datos originales de V1. Los nuevos datos de V2 no se sincronizan de vuelta a V1, y las copias de seguridad de ambas versiones no pueden restaurarse mutuamente.
{% endhint %}

## Diferencias principales

| Función | V1 | V2 | Qué hacer después de la actualización |
| --------------- | ------------------------------- | --------------------------------------------- | -------------------------------- |
| Asistentes y prompts | Biblioteca de asistentes independiente; las frases rápidas pueden asociarse con asistentes | Los asistentes se gestionan en el chat y en Agent; las frases rápidas se combinan en prompts globales | Revise los grupos de asistentes y el orden de los prompts. |
| Agent | Algunas configuraciones y el espacio de trabajo siguen la sesión; las autorizaciones antiguas pueden aprobar herramientas automáticamente | La identidad, la memoria y la configuración principal pertenecen a Agent; el espacio de trabajo queda fijo tras la creación de la sesión; las herramientas pueden solicitar autorización nuevamente | Revise los modelos, el espacio de trabajo, las herramientas y los permisos. |
| Base de conocimientos de Agent | La herramienta de conocimiento puede acceder a la base de conocimientos global | Solo accede a las bases de conocimientos vinculadas explícitamente | Revise nuevamente la vinculación de la base de conocimientos para cada Agent. |
| Búsqueda en base de conocimientos | Se puede seleccionar manualmente el modo de búsqueda y la fuente del mapa del sitio | Usa BM25 si no hay modelo de incrustación, y búsqueda híbrida si hay modelo de incrustación; el mapa del sitio se trata como una URL normal | Revise los modelos de incrustación y reordenamiento; reconstruya las fuentes fallidas. |
| Búsqueda web | Se puede seleccionar el servicio en el asistente o en el área de entrada; incluye búsqueda local, compresión RAG y lista negra de suscripciones | Configure la búsqueda por palabras clave y la lectura de URLs por separado en [Configuración] → [Búsqueda web]; se eliminaron las opciones antiguas relacionadas | Seleccione nuevamente los dos servicios predeterminados y verifique las credenciales. |
| MCP | Los servicios añadidos y el mercado de descubrimiento de terceros coexisten | Los servicios añadidos continúan migrando; el antiguo mercado de descubrimiento de terceros ya no está disponible | Verifique el estado de los servicios; añada nuevos servicios desde el mercado actual o mediante JSON. |
| Servicios de modelos | Anthropic puede guardar credenciales OAuth | Las credenciales OAuth de Anthropic no se migran; se conserva la región de AWS Bedrock; los nuevos servicios están desactivados por defecto | Vuelva a ingresar la API Key para Anthropic y active los servicios según sea necesario. |
| Archivos | La relación de referencia entre las copias de archivos y los objetos de negocio es débil | Los archivos administrados se gestionan por referencia; la copia administrada se limpia con retraso tras eliminar la última referencia | Coloque los archivos de retención a largo plazo en [Archivos] o expórtelos; los archivos originales del usuario no se eliminarán. |
| Dibujo, Mini App y barra lateral | Los parámetros y puntos de entrada están en el área de la versión anterior | Los parámetros de dibujo se movieron a la barra de herramientas de prompts; Mini App está en la barra de pestañas superior; los favoritos de la barra lateral se restablecieron | Familiarícese con los nuevos puntos de entrada y configure nuevamente los favoritos. |
| CSS personalizado | Los selectores de V1 se aplican directamente | El contenido se conserva, pero está desactivado por defecto tras la migración | Adáptelo a los selectores de V2 antes de activarlo. |
| Code CLI | Se puede seleccionar iFlow | iFlow es reemplazado por Qoder | Use Qoder si necesita flujos de trabajo relacionados. |

## Compatibilidad para desarrolladores

<details>

<summary>¿Qué cambios hay en la API y las integraciones externas?</summary>

* El identificador de modelo de API Gateway cambió de `provider::model` a `provider:model`.
* Knowledge API devuelve entradas que utilizan campos de V2.
* El punto de acceso MCP-over-HTTP se eliminó, sin afectar a MCP dentro de la aplicación.
* El fallo de inicio de SSE puede devolver directamente un error HTTP normal; el cliente debe ser compatible simultáneamente con las rutas de error HTTP y SSE.
* Los parámetros de la interfaz de tareas programadas han cambiado y los registros de ejecución históricos no se migran.

</details>

## Referencias

* [De V1 a V2](v1-to-v2-migration.md)
* [Descarga oficial de Cherry Studio V2](https://cherryai.com.cn/download)
* Página de lanzamiento de V2: [GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases) · [GitHub](https://github.com/CherryHQ/cherry-studio/releases)
