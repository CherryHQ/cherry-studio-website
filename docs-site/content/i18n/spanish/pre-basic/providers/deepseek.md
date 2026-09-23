# DeepSeek

DeepSeek es uno de los principales proveedores de modelos de lenguaje a gran escala en China, reconocido por su rendimiento en tareas de programación e inferencia con las series V3 / R1, y ofrece precios accesibles.

## Obtener la clave API

* Registre una cuenta en [DeepSeek Platform](https://platform.deepseek.com/)
* `API Keys` → `Crear clave API`, copie la clave `sk-...`
* Realice un recargo de cualquier cantidad (el mínimo para activar es ¥1)

## Configuración en Cherry Studio

* Abra `Configuración → Servicios de modelos`, encuentre el proveedor **deepseek** y acceda a la página de detalles
* En **Clave API**, ingrese `sk-...`
* La **Dirección API** predeterminada es `https://api.deepseek.com`, no es necesario modificarla
* Haga clic en **Obtener lista de modelos**

## Uso recomendado

| Modelo | Escenarios adecuados |
| ------------------- | ---------------------------------- |
| `deepseek-chat` | Conversación general, excelente relación calidad-precio |
| `deepseek-reasoner` | Matemáticas, código, inferencia compleja. Tenga en cuenta que la salida incluirá bloques de pensamiento `<thinking>` |

## Búsqueda web nativa

Los modelos de DeepSeek que admiten la capacidad de búsqueda web pueden utilizar directamente la búsqueda web nativa del proveedor. Al seleccionar un modelo, verifique si hay un icono 🌐 junto al nombre; el alcance específico de la compatibilidad puede cambiar con las actualizaciones del proveedor, por lo que no se recomienda basarse únicamente en el nombre del modelo.

Si activa 🌐 en la conversación y la opción 【Usar preferentemente el servicio de búsqueda configurado】 en 【Configuración】→【Búsqueda web】 permanece activada, Cherry Studio priorizará el uso del servicio de búsqueda configurado; solo si desactiva esta opción, se priorizará la búsqueda web nativa del modelo. Consulte el modo de búsqueda web.

## Combinación con la memoria global

DeepSeek no cuenta con modelos de incrustación propios. Si desea utilizar una base de conocimientos:

* Se recomienda utilizar modelos de incrustación de otros proveedores (como `bge-m3` de [SiliconFlow](siliconcloud.md) o `text-embedding-3-small` de [OpenAI](openai.md))
* El modelo de conversación puede seguir siendo DeepSeek

{% hint style="info" %}
- Los precios de DeepSeek se cobran por token; los aciertos en la caché pueden reducir significativamente el costo (consulte su documentación oficial)
- El contenido de pensamiento de `deepseek-reasoner` se renderiza por defecto en la conversación; puede alternar "Plegado automático del contenido de pensamiento" en [Configuración de la conversación](../../cherrystudio/preview/chat.md#dui-hua-she-zhi)
{% endhint %}

***

### Obtener ayuda y enviar comentarios

Si tiene alguna duda, detecta un error o tiene sugerencias de mejora de funciones durante la configuración o el uso, consulte los canales oficiales proporcionados en [Comentarios y sugerencias](../../question-contact/suggestions.md).
