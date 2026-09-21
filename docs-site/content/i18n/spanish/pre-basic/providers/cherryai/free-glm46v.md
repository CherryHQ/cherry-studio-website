# Zhipu GLM-4.6V

Los usuarios de Cherry Studio ahora pueden experimentar gratuitamente **Zhipu GLM-4.6V** a través del servicio integrado **CherryIN**. Este es el modelo insignia de visión lanzado por Z.ai (Zhipu AI) en diciembre de 2025, con arquitectura MoE, contexto multimodal nativo de 128K y llamadas a herramientas multimodales nativas, lo que lo convierte en la opción preferida para la comprensión de imágenes y texto y para escenarios de Agentes multimodales.

***

## ¿Qué es GLM-4.6V?

GLM-4.6V es la última generación de modelos de lenguaje visual de la serie GLM-V de Z.ai. Admite de forma nativa la modelización unificada de texto + imagen y amplía aún más las capacidades de contexto y llamadas a herramientas sobre la base de GLM-4.5V.

- Arquitectura: Mixture-of-Experts (MoE)
- Parámetros totales: 106B
- Parámetros activos: aproximadamente 12B
- Longitud de contexto: 128K tokens
- Licencia de código abierto: MIT
- Fecha de lanzamiento: 8–9 de diciembre de 2025
- Codificador visual: admite imágenes de múltiples resoluciones (hasta 4K)

La serie también incluye **GLM-4.6V-Flash (9B)**, orientado a escenarios locales y de baja latencia, gratuito para uso comercial.

<figure><img src="../../../../../assets/05dc257d349bcc5aa0d51f78.webp" alt=""><figcaption></figcaption></figure>

***

## Sistema de entrenamiento multimodal de la serie GLM-V

GLM-4.6V sigue la línea técnica de GLM-4.1V-Thinking / GLM-4.5V y refuerza aún más las capacidades en dirección visual y de Agentes:

1. **Modelización multimodal nativa**: entrenamiento conjunto de texto e imagen, admite entradas mixtas de texto e imagen
2. **Expansión de contexto**: el contexto de entrenamiento se amplía a 128K tokens, permitiendo procesar en una sola vez aproximadamente 150 páginas de documentos densos, 200 páginas de diapositivas o 1 hora de video
3. **Llamadas a herramientas multimodales nativas**: las herramientas pueden recibir y devolver imágenes directamente, procesando productos multimodales mediante URL basado en el protocolo MCP extendido
4. **Refuerzo por aprendizaje**: mantiene el flujo de RL escalable de la serie GLM-V

<figure><img src="../../../../../assets/15737d0c9c7d3f0a6bfcd9fd.jpeg" alt=""><figcaption></figcaption></figure>

***

## Multimodalidad nativa para escenarios reales

Las capacidades multimodales de GLM-4.6V cubren escenarios cotidianos y profesionales:

- ✅ **Comprensión de contenido de texto enriquecido**: documentos largos, texto de múltiples páginas y mezclas de texto e imagen
- ✅ **Búsqueda web visual**: búsqueda y comprensión en línea combinando entrada visual
- ✅ **Replicación de frontend**: generación de código frontend a partir de maquetas de diseño o capturas de pantalla de UI
- ✅ **Análisis de documentos multimodales de contexto largo**: entrada completa de PDF / diapositivas / nivel de video
- ✅ **Análisis de gráficos y tablas**: extracción de información estructurada

***

## Llamadas a herramientas multimodales nativas y capacidades de Agente

Una de las mejoras clave de GLM-4.6V es el ciclo cerrado de **"percepción visual → acción ejecutable"**: las llamadas a herramientas admiten nativamente la imagen como entrada y salida, permitiendo que los Agentes multimodales se implementen en negocios reales.

| Escenario | Uso recomendado | Ejemplo |
| --- | --- | --- |
| Preguntas y respuestas simples de texto e imagen | Diálogo directo | "¿Qué hay en esta imagen?" |
| Tareas de complejidad media | Activar llamadas a herramientas | Leer un gráfico y luego buscar datos |
| Agente multimodal complejo | Múltiples herramientas + MCP | Captura de pantalla → comprensión → llamada a API → generación de informe |

***

## MoE eficiente, disponible de forma abierta

- ⚡ Activación esparsa MoE: 106B parámetros totales, solo se activan aproximadamente 12B
- 💰 **Uso gratuito** en Cherry Studio a través de CherryIN
- 🖥️ Los pesos, el código de inferencia y las herramientas MCP están disponibles de forma abierta en GitHub y Hugging Face, con licencia MIT

***

## Enfoque en capacidades prácticas: Asistente multimodal

GLM-4.6V es adecuado para los siguientes escenarios en el uso práctico:

- **Asistente de documentos**: lectura y resumen completos de documentos largos, escaneos y diapositivas
- **Análisis de datos**: identificación e interpretación de gráficos y capturas de paneles de control
- **Frontend y diseño**: generación o modificación de código frontend según capturas de pantalla de UI
- **Búsqueda visual**: búsqueda en línea e integración de información combinando imágenes
- **Agente multimodal**: completar tareas complejas combinando herramientas como navegador, ejecución de código y búsqueda

***

## ¿Cómo usarlo en Cherry Studio?

1. Abra Cherry Studio y vaya a **Configuración → Servicios de modelos**.
2. Encuentre el proveedor **CherryIN** y actívelo.
3. Seleccione **Zhipu GLM-4.6V** en la lista de modelos.
4. Vuelva a la interfaz de chat, cambie a **GLM-4.6V** en el selector de modelos superior y podrá subir imágenes directamente en la conversación para interactuar con texto e imagen.

> 💡 Sugerencia: La cuota de modelos gratuitos proporcionada por CherryIN es asumida oficialmente por Cherry Studio, adecuada para experiencia diaria y evaluación; para entornos de producción, se recomienda usar en combinación con la API oficial de Z.ai (Zhipu).

***

📘 **Experimente Zhipu GLM-4.6V ahora mismo y desbloquee las capacidades multimodales nativas y de Agente visual.**

***

### Obtener ayuda y enviar comentarios

Si tiene alguna duda, encuentra un error o tiene sugerencias de mejora de funciones durante la configuración o el uso, consulte los canales oficiales proporcionados en [Comentarios y sugerencias](../../../question-contact/suggestions.md).
