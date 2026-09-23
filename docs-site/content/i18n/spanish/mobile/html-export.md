---
icon: presentation
---

# Convertir HTML en imágenes o PPT

Los archivos HTML pueden contener diseños, colores e imágenes diseñados. Abra un archivo HTML guardado en Cherry Studio para compartirlo como una imagen o PPT, útil para propuestas, tarjetas de estudio y presentaciones breves.

## Prepare un archivo HTML

Cargue un archivo existente o solicite a un modelo que admita llamadas a herramientas que cree uno:

> Convierta la descripción general del proyecto anterior en una presentación HTML independiente con tres páginas: objetivos, plan y próximos pasos. Utilice una proporción de 16:9, tipografía legible y no utilice imágenes ni fuentes en línea. Guárdelo como project-overview.html. Asigne a cada página su propio contenedor con class="slide".

La última oración le dice al modelo cómo marcar las páginas. Puedes copiarlo sin escribir código tú mismo. Una única tarjeta de información no necesita marcadores de página.

Espere a que el archivo termine de guardarse, luego abra su tarjeta o búsquelo en **Archivos** en la barra lateral. Si solo tiene un bloque de código HTML en el chat, primero pídale al modelo que [lo guarde como un archivo](file-generation.md).

## Compartir como imagen o PPT

1. Abra el archivo HTML completo y revise su texto, imágenes y diseño.
2. Toca **Más** en la esquina superior derecha.
3. Elija **Compartir como imagen** o **Compartir como PPT**.
4. Espere la preparación, la captura de páginas y la escritura de archivos. Utilice **Cancelar** en el área de progreso para detenerse si es necesario.
5. Elija un destino en la menú del sistema para compartir.

El PNG o PPTX generado también permanece en **Archivos** para abrirlo o compartirlo posteriormente. Descartar la menú para compartir no significa que se haya guardado en otro destino.

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/html-preview.webp"><img src="../../../assets/mobile/en/html-preview.webp" alt="Abra un archivo HTML guardado; este es un archivo de demostración escrito"></a><figcaption><p><strong>iPhone · Interfaz en inglés</strong> · Abra un archivo HTML guardado; este es un archivo de demostración escrito</p></figcaption></figure>
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/html-export-menu.webp"><img src="../../../assets/mobile/en/html-export-menu.webp" alt="Utilice el menú de archivos para compartir como imagen o PPT"></a><figcaption><p><strong>iPhone · Interfaz en inglés</strong> · Utilice el menú de archivos para compartir como imagen o PPT</p></figcaption></figure>
</div>

## ¿En qué se diferencian los formatos?

| Formato | Lo mejor para | Resultado |
| --- | --- | --- |
| Imagen (PNG) | Tarjetas de visualización rápida e información. | Una imagen de todo el documento; varias páginas se apilan verticalmente |
| PPT (PPTX) | Presentar una página a la vez | Una imagen de cada página colocada en una diapositiva 16:9 |

**El texto y los gráficos del PPT son parte de las imágenes de la página, no objetos editables individualmente.** Para cambiar el contenido, revise el HTML y vuelva a convertirlo. Comparta también el HTML si el destinatario necesita la fuente editable original.

HTML con marcadores de página explícitos se convierte página por página. Una página larga normal se divide verticalmente en secciones de 16:9, que pueden cortar párrafos o tablas; no se rediseña automáticamente como presentación. Pídale al modelo páginas separadas y menos abarrotadas si esto sucede.

Las páginas con diferentes proporciones conservan sus proporciones y pueden tener márgenes blancos. La conversión utiliza un diseño de página más amplio, por lo que puede diferir de la vista previa estrecha del teléfono.

## ¿Qué pasa con las marcas de agua y el contenido interactivo?

La conversión sigue a **Configuración → General → Marca de agua al compartir**. Cuando está habilitado, agrega un pie de página a la imagen o a la diapositiva final PPT. La configuración afecta a los archivos recién generados; cambiarlo más tarde no reconstruye los resultados guardados.

La conversión abre una copia nueva del HTML guardado. No copia los botones en los que hizo clic, los paneles que expandió ni los formularios que completó durante la vista previa. Las animaciones y los vídeos no se convierten en contenido PPT reproducible. Pídale al modelo que guarde el estado deseado como contenido de página estática.

## ¿Por qué la conversión no está disponible o falla?

* **El archivo no es HTML:** Los bloques Markdown, texto sin formato y código de chat no tienen estas acciones de conversión.
* **Solo se cargó una parte de un archivo largo:** El HTML incompleto no se puede convertir. Acortarlo o dividirlo. El contenido vacío tampoco se puede convertir.
* **No se pudieron cargar las imágenes o fuentes:** los recursos en línea deben ser accesibles. Solicite una versión sin dependencias externas.
* **El documento es demasiado largo:** PPT admite como máximo 64 páginas y las imágenes tienen límites de tamaño. Reduzca el contenido, divida archivos o utilice páginas de presentación separadas en lugar de una imagen larga.
* **El diseño sigue cambiando o la aplicación pasó a segundo plano:** las páginas dinámicas complejas pueden fallar. Mantenga la aplicación en primer plano y utilice diseños estáticos cuando sea necesario.

El HTML original permanece disponible después de un fallo o cancelación. Aborde la causa informada antes de volver a intentarlo. Después de compartir un archivo importante, confirme el recuento de páginas y el contenido en la aplicación receptora.
