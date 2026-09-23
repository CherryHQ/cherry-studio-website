---
icon: message-circle
---

# Conversaciones y archivos

Utilice una conversación para un tema y un agente para elegir su modelo e instrucciones reutilizables. Temas distintos pueden tener conversaciones distintas con el mismo agente.

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/iphone-conversation.webp"><img src="../../../assets/mobile/en/iphone-conversation.webp" alt="Conversación Cherry Studio Mobile en iPhone"></a><figcaption><p><strong>iPhone · Interfaz en inglés</strong> · Mensajes, detalles del modelo y acciones de respuesta en una columna</p></figcaption></figure>
<figure data-mobile-shot="tablet"><a href="../../../assets/mobile/en/ipad-conversation.webp"><img src="../../../assets/mobile/en/ipad-conversation.webp" alt="Conversación Cherry Studio Mobile en iPad"></a><figcaption><p><strong>iPad · Interfaz en inglés</strong> · Un área de lectura más amplia para respuestas largas y contenido de archivos</p></figcaption></figure>
</div>

## Iniciar una conversación o cambiar de modelo.

Elija **Nuevo chat** en la barra lateral, seleccione un agente y modelo, luego envíe un mensaje. Una nueva conversación comienza como un borrador; enviar el primer mensaje crea su historia.

Cambie los modelos desde el selector de modelos de la conversación. Esto actualiza el modelo del agente actual para la siguiente solicitud; Las respuestas existentes no se reescriben.

Coloque preferencias duraderas, como "Dar la conclusión antes de los pasos", en [instrucciones del agente](agents-and-tools.md). Coloque los requisitos para una pregunta en el mensaje mismo.

## Encuentra conversaciones anteriores

* Explore conversaciones recientes en la barra lateral o use su menú de lista reciente para agruparlas por agente. Toque el nombre de un agente para expandir/contraer sus conversaciones. El modo de visualización elegido persiste al iniciar la aplicación.
* El botón de búsqueda al lado del título de la barra lateral busca **títulos de conversaciones y contenido de mensajes**. Antes de escribir, muestra conversaciones recientes.
* El resultado de un mensaje abre la conversación en ese mensaje. Explora el historial cercano o elige **Volver a los últimos mensajes**.
* Mantenga presionada una conversación de la barra lateral para cambiarle el nombre o eliminarla. [Exportar](sharing-and-export.md) todo lo que quieras conservar primero.

La búsqueda localiza el mensaje completo sin resaltar cada palabra clave que contiene. Busca conversaciones, no todos los archivos de su teléfono.

## Agregar imágenes

Toque **＋** junto a la entrada para elegir fotos, tomar una fotografía o agregar una imagen a través de Archivos. Seleccione un modelo que comprenda las imágenes; El filtro Vision puede ayudar.

Por ejemplo, adjunte una foto y pregunte “Convierta la lista de verificación de esta imagen en una tabla”. Especifique qué parte importa.

Los formatos de solicitud admitidos son JPEG, PNG, GIF y WebP. El límite actual de la aplicación es de 9 imágenes, 10 MB por imagen y 20 MB combinados; Los modelos individuales pueden tener límites más bajos. Convierta formatos incompatibles a JPEG o PNG.

La aplicación puede comprimir imágenes y volver a intentar una solicitud de gran tamaño, pero la compresión no soluciona los modelos no compatibles, demasiadas imágenes ni todos los errores de red.

## Adjuntar documentos o archivos existentes

1. Toca **＋ → Archivos**.
2. Elija un archivo existente o cargue uno usando el selector del sistema.
3. Asigne una tarea específica, como "Resumir la segunda sección y enumerar sus elementos de acción".

Los archivos de texto sin formato tienen un límite de 1 MB por archivo; Los documentos tienen un límite de 20 MB. El contenido extenso puede acortarse para ajustarse a los límites de lectura o del modelo, con un aviso. No asuma que se incluyó todo el archivo. La extracción de texto PDF procesa como máximo las primeras 100 páginas.

### ¿Qué analizador de documentos debo elegir?

Abra **Configuración → Analizador de documentos**. La selección se guarda inmediatamente y se aplica al procesamiento de documentos posterior; no reescribe las respuestas anteriores.

| Opción | Lo mejor para | Compensación |
| --- | --- | --- |
| Incorporado | Resúmenes y preguntas sobre documentos en su mayoría basados en texto. | Extrae texto de PDF, DOCX, XLSX y PPTX con un uso de modelo inferior. |
| AnyDoc | Documentos complejos donde los títulos y las tablas importan | Conserva más estructura para documentos que no son PDF, generalmente usando más tokens |

Los archivos PDF todavía utilizan la extracción de texto del sistema. Cambiar de analizador no convierte las páginas escaneadas en texto seleccionable. Si no se encuentra ningún texto, proporcione una copia basada en texto o envíe las páginas relevantes como imágenes a un modelo de visión.

**La compatibilidad con la vista previa es diferente de la compatibilidad con la entrada del modelo.** Los modelos reciben el contenido del documento analizado. Los archivos de audio, vídeo o archivo no se convierten en archivos adjuntos utilizables simplemente cambiando los indicadores de capacidad del modelo.

## Copiar, reintentar, bifurcar o eliminar

| acción | Cuando usarlo | Resultado |
| --- | --- | --- |
| Seleccionar texto o copiar | Conservar parte o la totalidad de una respuesta | Utilice la selección de texto o la acción de copiar la respuesta. |
| Responde de nuevo | La última respuesta falló, fue interrumpida o no es satisfactoria | Procesa la pregunta original nuevamente y reemplaza la última respuesta existente. |
| Pasar a un nuevo chat | Explora otra dirección desde un punto anterior | Continúa en una conversación separada, conservando el original. |
| Eliminar este turno | Eliminar un intercambio | Elimina sus registros de preguntas, respuestas y herramientas de intervención. |

Responder nuevamente está disponible solo para la última respuesta después de que se haya detenido la generación. No mantiene múltiples versiones de respuestas seleccionables. Utilice una rama para puntos anteriores.

Los resultados completos de la herramienta se pueden conservar al reanudar una respuesta interrumpida. Reintentar o eliminar **no deshace los cambios de calendario, los archivos editados ni el contenido enviado**. Volver a intentarlo puede generar cargos adicionales. Copie, comparta o ramifique primero si necesita la respuesta anterior.

La eliminación de turnos es permanente y no reembolsa el uso. Espere a que finalicen la generación/operaciones, o deténgalas, antes de eliminarlas.

## Pensamiento profundo y largas conversaciones.

Los modelos compatibles proporcionan un control de **Profundidad de pensamiento**. Los niveles disponibles dependen del modelo; No todos permiten desactivar el razonamiento ni ofrecen el mismo número de niveles. Utilice los niveles predeterminados o más rápidos para preguntas simples y considere pensar más para análisis complejos. Los niveles más altos pueden tardar más y utilizar más tokens.

**Contexto compactado / Contexto compactado** significa que la información anterior se resume para dejar espacio para la conversación continua o el trabajo con herramientas. La historia permanece visible, pero el resumen puede omitir detalles. Vuelva a expresar restricciones importantes, números o citas exactas en el siguiente mensaje cuando sea necesario.

La compactación no permite que un archivo adjunto de cualquier tamaño quepa dentro de los límites del modelo. Reduzca el contenido o inicie una conversación nueva si la solicitud sigue superando esos límites.

Consulte [respuestas y notificaciones en segundo plano](settings-and-usage.md) para interrupciones y [compartir y exportar](sharing-and-export.md) para compartir varios mensajes juntos.

Para obtener resultados guardados y revisiones, consulte [Crear y editar archivos](file-generation.md). Para convertir un archivo HTML guardado en una imagen o presentación, consulte [HTML a imagen y PPT](html-export.md).
