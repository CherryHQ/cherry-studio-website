# Grok

Grok es un modelo de lenguaje grande desarrollado por xAI, conocido por su "tono más informal + acceso a datos en tiempo real de X (Twitter)".

## Obtener la clave API

* Registre una cuenta en [xAI Console](https://console.x.ai/)
* `API Keys` → `Create API Key`, copie la clave `xai-...`

## Configuración en Cherry Studio

* Abra `Configuración → Servicios de modelos`, encuentre el proveedor **Grok** y acceda a la página de detalles
* En **Clave API**, ingrese `xai-...`
* La **Dirección API** predeterminada es `https://api.x.ai`, no es necesario modificarla
* Haga clic en **Obtener lista de modelos** y agregue modelos como `grok-4`, `grok-4-fast`, etc.

## Usos recomendados

| Modelo | Escenarios adecuados |
|---|---|
| `grok-4` | El más versátil, ideal para tareas complejas |
| `grok-4-fast` | Escenarios de alto rendimiento y baja latencia |
| `grok-3-mini` | Conversaciones cotidianas de bajo costo |

## Búsqueda en línea

Algunos modelos de Grok incluyen capacidad de búsqueda en línea; se mostrará un pequeño icono de globo terráqueo después del nombre del modelo. Puede activar directamente la opción "Búsqueda en línea" en el cuadro de diálogo para usarla. Para más información, consulte [Modo de búsqueda en línea](../websearch).

{% hint style="info" %}
* Grok requiere acceso a redes internacionales; los usuarios de China deben configurar un proxy
* xAI ofrece una cuota gratuita (que se renueva mensualmente), suficiente para el uso diario
{% endhint %}

***

### Obtener ayuda y enviar comentarios

Si tiene alguna duda, detecta un error o tiene sugerencias de mejora de funciones durante la configuración o el uso, consulte los canales oficiales proporcionados en [Comentarios y sugerencias](../../question-contact/suggestions.md).
