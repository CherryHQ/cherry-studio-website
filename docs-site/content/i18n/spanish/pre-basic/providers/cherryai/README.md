# CherryAI (gratis)

**CherryAI** es el servicio de modelo gratuito integrado en Cherry Studio. No requiere registrarse en una plataforma de terceros ni introducir una clave API, y está pensado para probar el chat y las tareas de texto básicas.

### Dónde usarlo

Abra `Configuración → Servicios de modelos` y seleccione **CherryAI** en la lista integrada. El servicio viene preconfigurado con la aplicación y normalmente no requiere ajustes adicionales.

### Modelo disponible actualmente

Según la configuración actual del servidor de CherryAI, solo se ofrece **Qwen3-8B**.

{% hint style="warning" %}
La disponibilidad del modelo, la cuota gratuita y los límites de uso pueden cambiar con la configuración del servidor. Consulte el modelo que realmente aparece y está disponible en Cherry Studio. Esta página no garantiza su disponibilidad a largo plazo.
{% endhint %}

Para usar otros modelos o un servicio más estable, elija [CherryIN](../cherryin-1.md) u otro [proveedor](../README.md).

## Qwen3-8B

**La reconocida plataforma de servicios MaaS "SiliconFlow" ofrece gratuitamente el servicio de invocación del modelo Qwen3-8B**. Como un miembro de alta relación costo-beneficio de la serie Tongyi Qianwen Qwen3, Qwen3-8B logra capacidades potentes con un tamaño compacto, siendo la elección ideal para aplicaciones inteligentes y desarrollo eficiente.

***

**🚀 ¿Qué es Qwen3-8B?**

Qwen3-8B es un **modelo denso de 8 mil millones de parámetros** de la tercera generación de la serie de modelos de gran escala Tongyi Qianwen, lanzado por Alibaba en abril de 2025. Utiliza la **licencia de código abierto Apache 2.0**, lo que permite su uso libre en escenarios comerciales y de investigación.

* **Parámetros totales: 8 mil millones**
* **Tipo de arquitectura: Dense (estructura puramente densa)**
* **Longitud de contexto: 128K tokens**
* **Soporte multilingüe: cubre 119 idiomas y dialectos**

A pesar de su tamaño compacto, Qwen3-8B muestra un rendimiento estable en razonamiento, código, matemáticas y capacidades de Agent, con un desempeño comparable al de modelos más grandes de generaciones anteriores, demostrando una alta practicidad en aplicaciones reales.

<figure><img src="../../../../../assets/618d119a9dbc9045fe192b52.webp" alt=""><figcaption></figcaption></figure>

***

**📚 Base de entrenamiento sólida, gran inteligencia en un modelo pequeño**

Qwen3-8B completó su preentrenamiento con **aproximadamente 36 billones de tokens de datos multilingües de alta calidad**, que abarcan texto web, documentación técnica, repositorios de código y datos sintéticos de dominios profesionales, con una amplia cobertura de conocimiento.

En su etapa de posentrenamiento se introdujo un **flujo de refuerzo de cuatro fases**, optimizando especialmente las siguientes capacidades:

✅ Comprensión y generación de lenguaje natural\
✅ Razonamiento matemático y análisis lógico\
✅ Traducción y expresión multilingüe\
✅ Invocación de herramientas y planificación de tareas

Gracias a la mejora integral del sistema de entrenamiento, **el rendimiento real de Qwen3-8B se acerca e incluso supera al de Qwen2.5-14B**, logrando una transición significativa en la eficiencia de parámetros.\\

<figure><img src="../../../../../assets/aa1fd23eb171a4a3e65366a2.webp" alt=""><figcaption></figcaption></figure>

***

**💡 Modo de razonamiento híbrido: ¿razonar o responder rápidamente?**

Qwen3-8B permite conmutar flexiblemente entre el **"modo de razonamiento" y el "modo sin razonamiento"**, permitiendo a los usuarios elegir el método de respuesta según la complejidad de la tarea.

Controle el modo mediante los siguientes métodos:

* **Configuración de parámetros de API**: `enable_thinking=True/False`
* **Instrucciones de prompt**: agregue `/think` o `/no_think` en la entrada

| Modo | Escenarios aplicables | Ejemplos |
| --------- | -------------- | ----------------------------- |
| **Modo de razonamiento** | Razonamiento complejo, problemas matemáticos, tareas de planificación | <p>- Resolver problemas geométricos<br>- Escribir una arquitectura de proyecto completa</p> |
| **Modo sin razonamiento** | Preguntas y respuestas rápidas, traducción, resúmenes | <p>- Consultar el clima<br>- Traducción entre chino e inglés</p> |

Este diseño permite a los usuarios **equilibrar libremente entre la velocidad de respuesta y la profundidad del razonamiento**, mejorando la experiencia de uso.

***

**⚙️ Soporte nativo para capacidades de Agent, potenciando aplicaciones inteligentes**

Qwen3-8B cuenta con excelentes **capacidades de Agentización**, lo que facilita su integración en diversos sistemas de automatización:

🔹 **Invocación de funciones (Function Calling)**: soporta invocaciones estructuradas de herramientas\
🔹 **Compatibilidad con el protocolo MCP**: soporta nativamente el protocolo de contexto de modelo, facilitando la extensión de capacidades externas\
🔹 **Colaboración de múltiples herramientas**: puede conectarse a plugins como búsqueda, calculadora y ejecución de código

Se recomienda su uso combinado con el **marco Qwen-Agent** para construir rápidamente asistentes inteligentes con capacidades de memoria, planificación y ejecución.

***

**🌐 Amplio soporte de idiomas, orientado a aplicaciones globales**

Qwen3-8B soporta **119 idiomas y dialectos**, incluidos chino, inglés, árabe, español, japonés, coreano e indonesio, y es adecuado para escenarios como desarrollo de productos internacionalizados, atención al cliente translingüe y generación de contenido multilingüe.

Destaca especialmente en la comprensión del chino, soportando expresiones en chino simplificado, tradicional y cantonés, siendo adecuado para los mercados de Hong Kong, Macao, Taiwán y la comunidad china en el extranjero.

***

**🧠 Alta capacidad práctica, amplia cobertura de escenarios**

Qwen3-8B muestra un rendimiento excelente en varios escenarios de aplicación de alta frecuencia:

✅ **Generación de código**: soporta lenguajes principales como Python, JavaScript y Java, y puede generar código ejecutable según los requisitos\
✅ **Razonamiento matemático**: muestra un rendimiento estable en benchmarks como GSM8K, adecuado para aplicaciones educativas\
✅ **Creación de contenido**: redacción de correos electrónicos, informes y textos publicitarios, con estructura clara y lenguaje natural\
✅ **Asistente inteligente**: permite construir asistentes de IA ligeros para preguntas y respuestas sobre bases de conocimiento personales, gestión de agendas y extracción de información

***

Experimente Qwen3-8B gratis a través de **SiliconFlow** ahora mismo y comience su viaje de aplicaciones de IA ligeras!\\

📘 Úselo de inmediato, ¡haga que la IA esté al alcance de su mano!

***

### Obtener ayuda y enviar comentarios

Si tiene preguntas, encuentra un error o desea proponer una mejora, utilice los canales oficiales indicados en [Comentarios y sugerencias](../../../question-contact/suggestions.md).
