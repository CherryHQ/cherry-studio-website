---
icon: microchip
---
# Modelos locales

Los modelos locales son modelos pequeños integrados en Cherry Studio que **funcionan de forma offline una vez descargados**: no utilizan la API de ningún proveedor de servicios ni requieren introducir una API Key. Son de tamaño reducido, se ejecutan en su propio equipo y están diseñados para cubrir capacidades básicas que "no justifican configurar un modelo en la nube por separado".

Abra `Configuración → Modelos locales` para gestionarlos:

<figure><img src="../../../../assets/3ef4a2e692da5a39fccf7406.webp" alt=""><figcaption><p>Modelos locales: ① Dos modelos locales integrados: modelo de incrustación local + modelo OCR local (en la imagen, ambos muestran «Listo», y pueden eliminarse haciendo clic en el icono de eliminación de la derecha)</p></figcaption></figure>

Actualmente se incluyen dos tipos de modelos locales:

| Modelo local | Base | Tamaño | Uso |
| ------------- | -------------------- | -------- | --------------------------------------------------------------- |
| **Modelo de incrustación local** | Qwen3 Embedding 0.6B | Aprox. 614 MB | Convierte texto en vectores para escenarios de recuperación y consulta en [bases de conocimiento](../../knowledge-base/knowledge-base.md) |
| **Modelo OCR local** | PaddleOCR PP-OCRv6 | Aprox. 140 MB | Reconoce texto de forma offline en imágenes / documentos escaneados, para su uso por la función [OCR](ocr.md) |

### Descarga y estado

* Junto al nombre del modelo se muestra una insignia de estado: las tarjetas sin descargar tienen un botón de ancho completo «**Descargar**» en la **parte inferior**; haga clic para iniciar la descarga. Una vez completada, la insignia cambia a **Listo**.
* Los modelos en estado **Listo** pueden eliminarse haciendo clic en el icono de **Eliminar** a la derecha para liberar espacio en disco; pueden volver a descargarse cuando sea necesario. (Si el modelo de incrustación sigue en uso por una base de conocimiento, la eliminación se denegará y los pesos se conservarán.)
* En algunas plataformas / arquitecturas no se admite la inferencia local; en ese caso, el panel mostrará «**La plataforma actual no admite modelos locales**» y no se ofrecerá la descarga.

Durante la descarga, si un espejo no está disponible, Cherry Studio intentará automáticamente otras fuentes de descarga. Una vez completada, el proceso de inferencia del modelo de incrustación local se ejecuta en el equipo local y no requiere conexión a Internet.

{% hint style="warning" %}
Si la página muestra el mensaje «El archivo del modelo no está completo, vuelva a descargarlo para repararlo.», significa que falta algún archivo necesario en la caché local. Elimine o vuelva a descargar el modelo para solucionarlo; no intente unir manualmente los archivos del modelo.
{% endhint %}

{% hint style="info" %}
Los modelos locales son **opcionales**. Si ya ha configurado un modelo de incrustación en la nube en [Servicios de modelos](providers.md) o si el OCR del sistema es suficiente, puede optar por no descargarlos.
{% endhint %}

### Cuándo usar modelos locales

* **No tiene un modelo de incrustación en la nube / no desea pagar por separado por la base de conocimiento**: descargue el modelo de incrustación local para que la base de conocimiento pueda indexar y recuperar información completamente sin conexión.
* **Necesita OCR offline**: en escenarios sin red o donde no desee subir imágenes a terceros, descargue el modelo OCR local y seleccione «PaddleOCR local» en [Configuración de OCR](ocr.md).
* **Privacidad prioritaria**: todos los cálculos se realizan en el equipo local y el contenido no sale de su computadora.

{% hint style="warning" %}
Los modelos locales son una solución ligera de «suficiente para el uso». Si requiere alta precisión en la recuperación o en la tasa de reconocimiento, los [modelos de incrustación](../../knowledge-base/emb-models-info.md) en la nube y los servicios OCR más avanzados suelen ofrecer mejores resultados.
{% endhint %}

***

### Obtener ayuda y enviar comentarios

Si tiene cualquier duda, detecta un error o tiene sugerencias de mejora durante la configuración o el uso, consulte los canales oficiales proporcionados en [Comentarios y sugerencias](../../question-contact/suggestions.md).
