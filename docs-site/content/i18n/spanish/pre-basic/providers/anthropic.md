# Anthropic

Claude de Anthropic es uno de los modelos más adecuados para actuar como backend de [Cherry Agent](../../advanced-basic/agent.md), ya que Agent requiere un punto de final de protocolo de Anthropic.

## Obtener la API Key

* Regístrese en [Anthropic Console](https://console.anthropic.com/)
* Vaya a `Settings → API Keys` → `Create Key` y copie la clave `sk-ant-...` generada

## Configuración en Cherry Studio

* Abra `Configuración → Servicios de modelos`, busque el proveedor **Anthropic** y acceda a la página de detalles
* En **clave API**, ingrese `sk-ant-...`
* La **Dirección de la API** predeterminada es `https://api.anthropic.com`, no es necesario modificarla
* Haga clic en **Obtener lista de modelos** y agregue modelos como `claude-opus-4`, `claude-sonnet-4`, `claude-haiku-4`, etc.

## Uso recomendado

| Modelo | Escenarios adecuados |
|---|---|
| `claude-opus-4` | Razonamiento más fuerte / programación / tareas complejas de Agent |
| `claude-sonnet-4` | Conversación general y Agent diario, mejor relación calidad-precio |
| `claude-haiku-4` | Escenarios de alto rendimiento, respuestas rápidas de bajo costo |

## Configuración para escenarios de Agent

Al configurar este proveedor en [Cherry Agent](../../advanced-basic/agent.md) como fuente de modelo predeterminada, podrá obtener directamente las capacidades de Agent del protocolo de Anthropic.

{% hint style="info" %}
* En China continental no se puede acceder directamente a la API de Anthropic; es necesario usar un proxy propio (consulte [Configuración general → Modo proxy](../settings/general.md))
* Los usuarios con suscripción a Claude Code también pueden conectarse a Cherry Studio utilizando la misma clave y punto de final
* Los modelos Claude se cobran por token; en contextos largos, preste atención al uso
{% endhint %}

***

### Obtener ayuda y enviar comentarios

Si tiene alguna duda, detecta un error o tiene sugerencias de mejora de funciones durante la configuración o el uso, consulte los canales oficiales proporcionados en [Comentarios y sugerencias](../../question-contact/suggestions.md).
