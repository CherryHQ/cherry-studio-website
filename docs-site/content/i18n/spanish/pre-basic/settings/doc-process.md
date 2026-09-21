---
icon: file-code
---
# Procesamiento de documentos

En pocas palabras: **esta es la configuración central de Cherry Studio para leer "PDF / documentos con formato complejo" y convertirlos en texto ordenado.**

Los PDF con tablas, columnas múltiples o páginas escaneadas (artículos académicos, contratos, informes de investigación, etc.) suelen leerse de manera desordenada si se envían directamente al modelo. El procesamiento de documentos utiliza primero un motor de análisis especializado para convertirlos en texto con una estructura clara, y luego lo entrega para su uso en la conversación o en la [base de conocimientos](../../knowledge-base/knowledge-base.md).

{% hint style="info" %}
**Procesamiento de documentos vs OCR**: son dos páginas de configuración separadas.

* **Procesamiento de documentos** (esta página): gestiona el análisis estructurado de **PDF / documentos con formato complejo**.
* **[OCR](ocr.md)**: gestiona el reconocimiento de texto en **imágenes / documentos escaneados**.

Para PDF de texto plano, `.md`/`.txt`/`.docx`, no se necesita ninguno de los dos; basta con leerlos directamente.
{% endhint %}

### Punto de configuración

Abra [Configuración] → [Procesamiento de documentos] y seleccione el motor de análisis en el menú desplegable de la esquina superior derecha. **El motor seleccionado se convierte en el predeterminado**.

<figure><img src="../../../../assets/dbc7765b46b45fec4b345e04.webp" alt=""><figcaption><p>Configuración del procesamiento de documentos: ① Seleccione el motor de análisis en el menú desplegable de la esquina superior derecha (MinerU por defecto); debajo, ingrese la clave API y la dirección API del motor seleccionado</p></figcaption></figure>

### Motores de análisis integrados

El procesamiento de documentos incluye 5 motores integrados, siendo **MinerU** el predeterminado:

| Motor | Descripción | Método de conexión |
| --- | --- | --- |
| **MinerU** (predeterminado) | Herramienta de extracción de PDF de alta calidad de código abierto de OpenDataLab | Clave API ([mineru.net/apiManage](https://mineru.net/apiManage)) |
| **PaddleOCR** | Sistema de reconocimiento OCR de Baidu Paddle | Ingrese la clave API ([Comunidad Paddle Xinghe](https://aistudio.baidu.com/paddleocr/)); si se autoaloja, dirija la dirección API a su servicio |
| **Doc2x** | Motor avanzado de restauración de archivos | Clave API ([open.noedgeai.com](https://open.noedgeai.com/apiKeys)) |
| **Mistral** | Servicio de análisis y comprensión de archivos | Clave API ([mistral.ai](https://mistral.ai/api-keys)) |
| **Open MinerU** | Servicio MinerU que puede autoalojarse, adecuado para equipos que desean controlar la cadena de procesamiento | Ingrese la dirección API después de autoalojar (ingrese la clave API según sea necesario) |

### Configuración de MinerU (solución predeterminada)

{% stepper %}
{% step %}
### Ingresar la clave API

En el campo [Clave API], ingrese la clave obtenida de MinerU (haga clic en "Obtener clave" a la derecha para ir a la página de solicitud; puede separar varias claves con comas).
{% endstep %}

{% step %}
### Confirmar la dirección API

Mantenga [Dirección API] con el valor predeterminado.
{% endstep %}

{% step %}
### Uso directo en la base de conocimientos / conversación

Al importar PDF complejos, se aplicará automáticamente la configuración de análisis de esta sección; no se requiere configuración adicional al cambiar a la base de conocimientos o a la conversación.
{% endstep %}
{% endstepper %}

{% hint style="info" %}
**Cambiar a otro motor**: selecciónelo en el menú desplegable e ingrese su [Clave API] / [Dirección API]; al seleccionarlo, se convierte en el predeterminado. **PaddleOCR** y **Open MinerU** admiten autoalojamiento: después de desplegar, ingrese la dirección de su propio servicio en [Dirección API].
{% endhint %}

### Relación con la base de conocimientos

* El procesamiento de documentos solo se encarga del paso "documento complejo → texto ordenado";
* El texto convertido continúa con la vectorización mediante el [modelo de incrustación](../../knowledge-base/emb-models-info.md) y su almacenamiento en la base de datos;
* Para el proceso detallado de "habilitación en la base de conocimientos", consulte [Preprocesamiento de documentos en la base de conocimientos](../../knowledge-base/document-preprocessing.md).

### Consejos y trucos

* MinerU ofrece resultados significativamente mejores para PDF con tablas / diseño de columnas múltiples; es la primera opción para artículos académicos, etc.;
* Si necesita reconocer **texto en imágenes** (capturas de pantalla, documentos escaneados) en lugar de la estructura del PDF, use [OCR](ocr.md).

***

### Obtener ayuda y enviar comentarios

Si tiene alguna duda, encuentra un error o tiene sugerencias de mejora de funciones durante la configuración o el uso, consulte los canales oficiales proporcionados en [Comentarios y sugerencias](../../question-contact/suggestions.md).
