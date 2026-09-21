# Moonshot AI (Kimi)

Moonshot AI es un equipo destacado de modelos de lenguaje de gran escala en China. Su producto principal es **Kimi**, que destaca por su **contexto ultralargo** (hasta 2 millones de caracteres), ideal para procesar grandes volúmenes de documentos o código con ayuda de la IA.

## Obtener la API Key

* Registre una cuenta en la [Plataforma abierta de Moonshot](https://platform.moonshot.cn/)
* Acceda a `Administración de claves API` para crear una clave `sk-...`
* Realice un cargo de cualquier monto para activar el servicio (el mínimo es muy bajo)

## Configuración en Cherry Studio

* Abra `Configuración → Servicios de modelos`, busque el proveedor **Moonshot AI** y acceda a la página de detalles
* Introduzca la clave `sk-...`
* La dirección de la API es `https://api.moonshot.cn` por defecto
* Haga clic en **Obtener lista de modelos**

## Usos recomendados

| Modelo | Escenarios adecuados |
|---|---|
| `moonshot-v1-8k` | Contexto corto, económico y rápido |
| `moonshot-v1-32k` | Contexto medio, suficiente para el uso diario |
| `moonshot-v1-128k` | Contexto largo, análisis de documentos, revisión de código |
| `kimi-k2-* / k2.5-*` | Bandera más reciente, mayor capacidad de razonamiento |

## Escenarios adecuados

* **Análisis de PDF / documentos ultralargos**: La ventaja de contexto largo de Moonshot es más evidente aquí
* **Revisión de grandes bloques de código**: Permite cargar archivos completos de una sola vez sin dividirlos
* **Resumen de libros electrónicos completos**: Los modelos de contexto largo eliminan la molestia de segmentación manual

{% hint style="info" %}
* La función de "caché de contexto" de Moonshot puede reducir significativamente el consumo de tokens en conversaciones repetidas; consulte su documentación oficial
* Kimi tiene su propia interfaz de chat en la web, pero al conectarse a la API a través de Cherry Studio, puede aprovechar las capacidades de extensión de Cherry Studio, como asistentes, bases de conocimiento y herramientas MCP
{% endhint %}

***

### Obtener ayuda y enviar comentarios

Si tiene cualquier duda, error o sugerencia de mejora durante la configuración o el uso, consulte los canales oficiales proporcionados en [Comentarios y sugerencias](../../question-contact/suggestions.md).
