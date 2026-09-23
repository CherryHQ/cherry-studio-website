# Groq

Groq (Nota: no es Grok de xAI) es un servicio de inferencia destacado por su **aceleración de hardware LPU y latencia ultrabaja**. Principalmente aloja modelos de código abierto como Llama / Mixtral / Whisper, y su velocidad de salida suele ser varias veces superior a la de la inferencia en la nube convencional.

## Obtener la API Key

* Registre una cuenta en [GroqCloud](https://console.groq.com/)
* `API Keys` → `Create API Key`, copie la clave `gsk_...`

## Configuración en Cherry Studio

* Abra `Configuración → Servicios de modelos`, encuentre el proveedor **Groq** y acceda a la página de detalles
* En **Clave API**, ingrese `gsk_...`
* La **Dirección API** predeterminada es `https://api.groq.com/openai/v1`, no es necesario modificarla
* Haga clic en **Obtener lista de modelos**

## Uso recomendado

| Modelo | Escenarios adecuados |
| ------------------------- | ---------- |
| `llama-3.3-70b-versatile` | Conversación general, velocidad extremadamente rápida |
| `llama-3.1-8b-instant` | Tareas simples, respuesta en milisegundos |
| `mixtral-8x7b-32768` | Contexto largo |
| `whisper-large-v3` | Transcripción de voz a texto |

## Escenarios de aplicación

* **Chatbots en tiempo real**: La "respuesta casi instantánea" de Groq es ideal para la integración con IM (en combinación con [canales](../../advanced-basic/automation/channels.md))
* **Alta concurrencia**: El número de tokens por segundo es significativamente superior al de la inferencia en la nube convencional
* **Indiferencia ante la novedad del modelo**: Groq aloja principalmente modelos de código abierto de la familia Llama, sin modelos propietarios como GPT-5 / Claude-4

## Diferencia entre Grok y Groq

| | [Grok](grok.md) | Groq |
| -- | --------------- | --------------- |
| Empresa | xAI (Musk) | Groq Inc. |
| Enfoque | Modelos de gran escala propietarios + conexión a internet | Hardware LPU + inferencia de modelos de código abierto |
| Modelos | Propios como `grok-4` | De código abierto como `llama-3.x` |

{% hint style="warning" %}
Grok (xAI) y Groq suelen confundirse. En la lista de proveedores de Cherry Studio son dos entradas independientes, tenga cuidado de distinguirlos.
{% endhint %}

***

### Obtener ayuda y enviar comentarios

Si tiene alguna duda, detecta un error o tiene sugerencias de mejora de funciones durante la configuración o el uso, consulte los canales oficiales proporcionados en [Comentarios y sugerencias](../../question-contact/suggestions.md).
