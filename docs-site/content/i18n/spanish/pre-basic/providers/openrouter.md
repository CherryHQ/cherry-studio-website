# OpenRouter

OpenRouter es una **pasarela unificada** que permite acceder a modelos de conversación de más de 200 proveedores (GPT, Claude, Gemini, Llama, DeepSeek, etc.) con una sola clave, con facturación por token. Es ideal para comparar múltiples modelos o para usuarios que no pueden registrarse individualmente en cada proveedor.

## Obtener la clave API

* Registre una cuenta en [OpenRouter](https://openrouter.ai/)
* `Settings → Keys` → `Create Key`, copie la clave `sk-or-...`
* Realice un recargo de cualquier cantidad (mínimo $1)

## Configuración en Cherry Studio

* Abra `Configuración → Servicios de modelos`, encuentre el proveedor **OpenRouter** y acceda a la página de detalles
* En **Clave API**, ingrese `sk-or-...`
* La **Dirección API** predeterminada es `https://openrouter.ai/api`, no es necesario modificarla
* Haga clic en **Obtener lista de modelos**, OpenRouter devolverá cientos de modelos disponibles

## Uso recomendado

Los ID de modelo de OpenRouter tienen el formato `<vendor>/<model>`:

| Ejemplo de ID de modelo | Proveedor real |
| ----------------------------------- | ------------------------- |
| `openai/gpt-4o` | OpenAI GPT-4o |
| `anthropic/claude-sonnet-4` | Anthropic Claude Sonnet 4 |
| `google/gemini-2.0-flash` | Google Gemini Flash |
| `meta-llama/llama-3.3-70b-instruct` | Meta Llama 3.3 70B |
| `deepseek/deepseek-chat` | DeepSeek V3 |
| `x-ai/grok-4` | xAI Grok |

## Casos de uso

* **Comparación A/B de múltiples modelos**: Cambie de modelo libremente bajo el mismo proveedor de Cherry Studio, sin necesidad de cambiar de proveedor
* **Evitar registros individuales**: Con una sola clave y una sola factura puede usar más de 200 modelos
* **Modelos menos comunes**: Muchos proveedores pequeños solo están disponibles a través de OpenRouter (como Cohere, Reka, etc.)

## Búsqueda web nativa y lectura de URLs

Los modelos de conversación de OpenRouter pueden utilizar la búsqueda web nativa y la lectura de contenido de URLs. Al seleccionar un modelo, busque el icono 🌐 junto al nombre y active 🌐 en la barra de entrada de la conversación.

Si la opción 【Usar preferentemente el servicio de búsqueda configurado】 en 【Configuración】→【Búsqueda web】 permanece activada, Cherry Studio priorizará el uso del servicio de búsqueda externo; solo si desactiva esta opción, se priorizarán las capacidades nativas del modelo de OpenRouter. Los proveedores pueden cobrar por separado las solicitudes de búsqueda web; los costos reales se basarán en la factura de OpenRouter.

## Relación con el protocolo de Anthropic

OpenRouter encapsula todos los modelos upstream utilizando por defecto el formato de protocolo de OpenAI. Esto significa:

* ✅ La conversación normal, la base de conocimientos y los asistentes rápidos están disponibles
* ⚠️ [Cherry Agent](../../advanced-basic/agent.md) **se recomienda usar directamente** Anthropic / CherryIN, no a través de OpenRouter (Agent requiere el protocolo nativo de Anthropic)

{% hint style="info" %}
- OpenRouter aplica un pequeño recargo sobre el precio del proveedor original (generalmente 5-10%), a cambio de "una cuenta universal"
- Algunos modelos tienen una versión "free" (gratis con límite de velocidad); al filtrar, preste atención a las entradas con el sufijo `(free)`
- Consulte la tabla de precios detallada en [OpenRouter Models](https://openrouter.ai/models)
{% endhint %}

***

### Obtener ayuda y enviar comentarios

Si tiene cualquier duda, error o sugerencia de mejora durante la configuración o el uso, consulte los canales oficiales proporcionados en [Comentarios y sugerencias](../../question-contact/suggestions.md).
