---
icon: list
---
# Referencia rápida de todos los proveedores

Cherry Studio incluye **más de 60 proveedores**. Esta página ofrece una tabla de resumen. Una vez que encuentre el proveedor deseado, **complete la clave según las instrucciones para comenzar a usarlo**. Los proveedores con documentación específica tienen un enlace de salto; los demás se configuran siguiendo los pasos generales ([Visión general de proveedores](README.md)).

## Pasos de uso

1. **Busque el proveedor deseado** (puede usar Ctrl/⌘+F para buscar rápidamente)
2. Haga clic en **Sitio web oficial** para registrar una cuenta y obtener la API Key
3. En Cherry Studio `Configuración → Servicios de modelos`, encuentre el proveedor correspondiente, complete la clave y haga clic en "Obtener lista de modelos"
4. Complete la configuración

## Decisión en una frase

| Su necesidad | Dirección recomendada |
|---|---|
| **Inicio rápido para principiantes**, evitando procesos complejos | [CherryIN](cherryin-1.md) o [CherryAI](../../../../pre-basic/providers/cherryai) |
| **Acceso más conveniente en China** | DeepSeek / Moonshot / SiliconFlow / Zhipu |
| **Mejores modelos internacionales** | OpenAI / Anthropic / Gemini |
| **Una clave para 200 proveedores** | [OpenRouter](openrouter.md) |
| **Totalmente local, sensible a la privacidad** | [Ollama](ollama.md) / [LM Studio](lm-studio.md) |
| **Cumplimiento empresarial** | [Azure OpenAI](azure-openai.md) / AWS Bedrock |
| **Uso de [Agentes](../../advanced-basic/agent.md)** | [Anthropic](anthropic.md) / [CherryIN](cherryin-1.md) (debe soportar el protocolo de Anthropic) |

## Modelos propios de grandes empresas chinas

Sin necesidad de proxy, ventaja en chino, precios relativamente bajos.

| Proveedor | Característica en una frase | Sitio web oficial | Documentación específica |
|---|---|---|---|
| **DeepSeek** | El rey de la relación calidad-precio en programación e inferencia | [deepseek.com](https://platform.deepseek.com/) | [→](deepseek.md) |
| **Moonshot AI (Kimi)** | Contexto ultralargo (hasta 2 millones de palabras) | [moonshot.cn](https://platform.moonshot.cn/) | [→](moonshot.md) |
| **ZhiPu (智谱)** | Serie GLM, multimodal, compatible con Anthropic para ejecutar agentes | [bigmodel.cn](https://open.bigmodel.cn/) | [→](zhipu.md) |
| **doubao (豆包/火山引擎)** | De ByteDance, precios accesibles | [volcengine.com](https://www.volcengine.com/product/doubao) | [→](doubao.md) |
| **Baidu Cloud (文心一言)** | Serie ERNIE de Baidu | [cloud.baidu.com](https://cloud.baidu.com/) | — |
| **Bailian (阿里百炼)** | Serie Qwen, gran cantidad de modelos | [bailian.console.aliyun.com](https://bailian.console.aliyun.com/) | [→](aliyun-bailian.md) |
| **BAICHUAN AI** | Modelo grande de Baichuan | [baichuan-ai.com](https://platform.baichuan-ai.com/) | — |
| **MiniMax** | Multimodal en China (voz, video) | [minimaxi.com](https://platform.minimaxi.com/) | [→](minimax.md) |
| **StepFun** | StepFun | [stepfun.com](https://platform.stepfun.com/) | — |
| **LongCat** | Serie LongCat de Meituan | [longcat.chat](https://longcat.chat/) | — |
| **Xiaomi MiMo** | Modelo grande de Xiaomi | [mimo.mi.com](https://mimo.mi.com/) | — |

## Modelos propios de grandes empresas internacionales

Primera línea en rendimiento, el acceso desde China generalmente requiere proxy.

| Proveedor | Característica en una frase | Sitio web oficial | Documentación específica |
|---|---|---|---|
| **OpenAI** | Serie GPT | [openai.com](https://platform.openai.com/) | [→](openai.md) |
| **Anthropic** | Serie Claude, preferido para agentes | [anthropic.com](https://console.anthropic.com/) | [→](anthropic.md) |
| **Gemini (Google)** | Modelo grande de Google | [aistudio.google.com](https://aistudio.google.com/) | [→](google-gemini.md) |
| **Azure OpenAI** | OpenAI alojado por Microsoft, cumplimiento empresarial | [portal.azure.com](https://portal.azure.com/) | [→](azure-openai.md) |
| **VertexAI** | Alojamiento de Google Cloud | [cloud.google.com](https://cloud.google.com/vertex-ai) | [→](vertex-ai.md) |
| **AWS Bedrock** | Amazon aloja modelos de varios proveedores | [aws.amazon.com/bedrock](https://aws.amazon.com/bedrock/) | — |
| **Mistral** | Representante de modelos abiertos europeos | [mistral.ai](https://console.mistral.ai/) | [→](mistral.md) |
| **Grok (xAI)** | xAI de Musk, con acceso a internet integrado | [x.ai](https://console.x.ai/) | [→](grok.md) |
| **Perplexity** | Conversación mejorada con búsqueda | [perplexity.ai](https://www.perplexity.ai/) | [→](perplexity.md) |

## Pasarelas / Agregadores

Una clave para acceder a múltiples modelos, gestión centralizada de cuentas.

| Proveedor | Característica en una frase | Sitio web oficial | Documentación específica |
|---|---|---|---|
| **CherryAI** | Prueba gratuita oficial de Cherry | — | [→](../../../../pre-basic/providers/cherryai) |
| **CherryIN** | Pasarela de pago oficial de Cherry, doble punto de conexión (OpenAI + Anthropic) | [open.cherryin.cc](https://open.cherryin.cc/) | [→](cherryin-1.md) |
| **OpenRouter** | Mayor agregador internacional, más de 200 modelos | [openrouter.ai](https://openrouter.ai/) | [→](openrouter.md) |
| **AiHubMix** | Agregador internacional | [aihubmix.com](https://aihubmix.com/) | — |
| **DMXAPI** | Agregador en China | [dmxapi.cn](https://dmxapi.cn/) | — |
| **302.AI** | Agregador en China | [302.ai](https://302.ai/) | — |
| **NewAPI** | Pasarela autoalojada (código abierto) | [newapi.pro](https://docs.newapi.pro/) | [→](newapi.md) |
| **OneAPI** | Pasarela autoalojada (código abierto) | — | [→](oneapi.md) |
| **PPIO 派欧云** | Computación en la nube + modelos en China | [ppio.com](https://ppio.com/) | [→](ppio.md) |
| **BurnCloud** | Agregador en China | [burncloud.com](https://ai.burncloud.com/) | — |
| **AIOnly** | Agregador en China | [aiionly.com](https://www.aiionly.com/) | — |
| **ocoolAI** | Agregador en China | [ocoolai.com](https://one.ocoolai.com/) | — |
| **Poe** | Mercado de IA de Quora | [poe.com](https://poe.com/) | — |
| **Vercel AI Gateway** | Pasarela de Vercel | [vercel.com/ai](https://vercel.com/ai) | — |

## Servicios de inferencia de ultra baja latencia / alto rendimiento

Adecuado para escenarios que requieren "sensación de velocidad" (bots de mensajería instantánea, traducción en tiempo real, etc.).

| Proveedor | Característica en una frase | Sitio web oficial | Documentación específica |
|---|---|---|---|
| **Groq** | Hardware LPU, respuesta en milisegundos | [groq.com](https://console.groq.com/) | [→](groq.md) |
| **Cerebras AI** | Chip propio, contexto muy grande | [cerebras.ai](https://cerebras.ai/) | — |
| **Together** | Alojamiento centralizado de modelos abiertos | [together.ai](https://www.together.ai/) | — |
| **Fireworks** | Optimización de inferencia de modelos abiertos | [fireworks.ai](https://fireworks.ai/) | — |

## Nube nacional + servicios de computación

| Proveedor | Característica principal | Sitio web | Documentación específica |
|---|---|---|---|
| **Silicon (硅基流动)** | Mayor plataforma de alojamiento de modelos de código abierto en China | [siliconflow.cn](https://cloud.siliconflow.cn/) | [→](siliconcloud.md) |
| **ModelScope (魔搭)** | Plataforma de modelos de código abierto de Alibaba | [modelscope.cn](https://modelscope.cn/) | [→](modelscope.md) |
| **AlayaNew** | Servicio de inferencia en China | [alayanew.com](https://www.alayanew.com/) | — |
| **Qiniu (七牛)** | Qiniu Cloud AI | [qiniu.com](https://www.qiniu.com/) | — |
| **LANYUN** | Inferencia en China | [lanyun.net](https://maas.lanyun.net/) | — |
| **Xirang** | Tianyi Cloud Xirang | [ctyun.cn](https://www.ctyun.cn/) | — |

## Exclusivo para embeddings / reordenamiento

Se utiliza únicamente para generar embeddings o reordenar, en combinación con bases de conocimiento / memoria global.

| Proveedor | Característica principal | Sitio web | Documentación específica |
|---|---|---|---|
| **Jina** | Embeddings, reordenamiento, CLIP, gran cuota gratuita | [jina.ai](https://jina.ai/) | — |
| **VoyageAI** | Especialista en embeddings / reordenamiento | [voyageai.com](https://www.voyageai.com/) | — |

## Inferencia local

Totalmente sin conexión, protege la privacidad.

| Proveedor | Característica principal | Sitio web | Documentación específica |
|---|---|---|---|
| **Ollama** | Inferencia local por línea de comandos, la más popular | [ollama.com](https://ollama.com/) | [→](ollama.md) |
| **LM Studio** | Inferencia local con interfaz gráfica, compatible con Apple Silicon | [lmstudio.ai](https://lmstudio.ai/) | [→](lm-studio.md) |
| **GPUStack** | Inferencia local de nivel empresarial | [gpustack.ai](https://gpustack.ai/) | — |
| **OpenVINO Model Server** | Inferencia local acelerada por Intel | [openvino.ai](https://www.openvino.ai/) | — |

## Plataformas de modelos / Otros

| Proveedor | Característica principal | Sitio web | Documentación específica |
|---|---|---|---|
| **Hugging Face** | Mayor comunidad de modelos de código abierto del mundo | [huggingface.co](https://huggingface.co/) | — |
| **GitHub Copilot** | Asistente de programación de Microsoft para GitHub | [github.com/features/copilot](https://github.com/features/copilot) | [→](github-copilot.md) |
| **GitHub Models** | Mercado de modelos de GitHub (Beta) | [github.com/marketplace/models](https://github.com/marketplace/models) | — |
| **MiniMax Global** | Versión internacional de MiniMax | [minimax.io](https://platform.minimax.io/) | — |
| **SophNet** | Alojamiento de modelos en China | [sophnet.com](https://sophnet.com/) | — |
| **PH8** | Inferencia en China | [ph8.co](https://ph8.co/) | — |
| **Z.ai** | Versión internacional de Zhipu | [z.ai](https://z.ai/) | — |
| **nvidia** | Inferencia NVIDIA NIM | [nvidia.com](https://www.nvidia.com/ai/) | — |

## Proveedor personalizado

Si el servicio que utiliza no está en la lista anterior, pero ofrece cualquiera de los protocolos **compatible con OpenAI / compatible con Anthropic / compatible con Gemini**, puede agregarlo a través de [Proveedor personalizado](custom-provider.md).

## ¿Aún no sabe cuál elegir?

Utilice directamente [**CherryIN**](cherryin-1.md) o [**CherryAI**](../../../../pre-basic/providers/cherryai) —— la opción más adecuada para principiantes que desean comenzar rápidamente. Cambie a otra opción cuando necesite funciones avanzadas.

***

### Obtener ayuda y enviar comentarios

Si tiene alguna duda, detecta un error o tiene sugerencias de mejora de funciones durante la configuración o el uso, consulte los canales oficiales proporcionados en [Comentarios y sugerencias](../../question-contact/suggestions.md).
