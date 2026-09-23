---
icon: file-text
---

# Crear y editar archivos

Un agente puede guardar texto como un archivo para que usted pueda obtener una vista previa, revisarlo y compartirlo. Esto se adapta a listas de verificación, notas de reuniones, datos de tablas y páginas web simples.

## Guardar una respuesta como un archivo

Seleccione un modelo de texto que admita llamadas a herramientas y solicite explícitamente un **archivo guardado** con un nombre de archivo:

> Convierta los consejos de viaje anteriores en una lista de verificación Markdown. Guárdelo como Weekend-packing-list.md y proporcione un archivo que pueda abrir.

Markdown es un formato de texto para encabezados, listas y tablas. Para texto sin formato, solicite un archivo `.txt`.

El texto que se muestra durante la generación es contenido que se está preparando, no un archivo ya guardado. Espere a que finalice y luego abra la tarjeta de archivo resultante. También puede encontrarlo en **Archivos** en la barra lateral.

Si la respuesta solo contiene un bloque de código, continúe con: "Guarde este contenido como un archivo real, no solo muéstrelo en la respuesta".

## ¿Qué formato debo elegir?

| Resultado deseado | Formato | Ejemplo |
| --- | --- | --- |
| Texto sin formato | TXT | "Guárdalo como call-notes.txt". |
| Un artículo con títulos, listas y tablas. | Markdown | "Guárdelo como Meeting-notes.md". |
| Datos para una aplicación de hoja de cálculo | CSV | "Utilice las columnas de artículo, cantidad y notas; guárdelas como lista de compras.csv". |
| Una página o presentación diseñada | HTML | "Cree un archivo HTML independiente llamado project-overview.html". |

La herramienta de escritura de archivos incorporada guarda texto, hasta 1 MB por archivo. **Nombrar un archivo `.docx`, `.xlsx` o `.pptx` no lo convierte en un documento original de Office.** CSV se abre en aplicaciones de hojas de cálculo, pero no contiene hojas de libro, estilos ni gráficos.

Para PPT, cree una presentación HTML y use [HTML para imagen y PPT](html-export.md). Un complemento conectado puede ofrecer otras funciones de creación de documentos; sus capacidades reales determinan lo que está disponible.

## Leer y editar un archivo existente

1. En la conversación, elija **＋ → Archivo** y seleccione o cargue un archivo.
2. Especifique exactamente qué cambiar, el reemplazo y qué debe permanecer sin cambios.
3. Abra el archivo revisado y verifique el resultado.

Por ejemplo:

> En el archivo shopping-list.csv adjunto, cambie la cantidad de Umbrella de 1 a 2. Mantenga todas las demás filas sin cambios.

> En el archivo Meeting-notes.md que acaba de crear, reemplace "Entregar el próximo lunes" por "Entregar el próximo miércoles". Conserva todo lo demás.

Los archivos de texto se pueden editar directamente. Los documentos PDF y Office compatibles pueden proporcionar contenido extraído para que el modelo lo lea, pero el editor integrado no puede modificar directamente su diseño original ni su estructura de archivos. Pídale que extraiga y organice el contenido en un nuevo archivo Markdown. Consulte [Chat y archivos](chat-and-files.md) para conocer los formatos de archivos adjuntos y los límites de lectura.

### ¿La edición sobrescribe el original?

* La edición de un archivo cargado o uno creado mediante una respuesta anterior guarda una nueva versión, como `meeting-notes v2.md`, y conserva la fuente.
* En una respuesta, el agente puede refinar su borrador actual repetidamente y terminar con un archivo, en lugar de producir una nueva versión para cada cambio.

Esto no es una sincronización continua. Editar una copia importada en Cherry Studio no actualiza el original en ninguna otra parte de su teléfono o en el almacenamiento en la nube.

### ¿Por qué no puede encontrar el texto para reemplazar?

La edición coincide con el texto original. Los cambios de redacción, las oraciones repetidas y las diferencias en los espacios o la puntuación pueden impedir una coincidencia clara. Pídale al agente que vuelva a leer el pasaje relevante e identifique una oración más larga o el contexto circundante. Solicite el reemplazo de cada ocurrencia sólo cuando eso sea lo que pretende.

## ¿Leer parte de un archivo significa leerlo todo?

No. Los archivos grandes pueden necesitar varias lecturas y la extracción de documentos tiene sus propios límites. Para una revisión completa, pídale al agente que continúe con las secciones no leídas y que indique cualquier parte que no haya podido leer. Si la extracción ya omitió parte de la fuente, las lecturas posteriores no pueden recuperarla; dividir el documento y proporcionarlo nuevamente.

Las herramientas de lectura utilizan archivos adjuntos accesibles o archivos generados en esta conversación. No escanean todos los archivos de su teléfono. Para continuar en una nueva conversación, seleccione el archivo nuevamente a través del menú de archivos adjuntos.

## Busque, obtenga una vista previa y comparta archivos

Abra **Archivos** desde la barra lateral para buscar por tipo y cambiar entre vistas de lista y cuadrícula. Toque un archivo para obtener una vista previa. Los formatos sin vista previa interna se pueden abrir en otra aplicación del sistema.

El menú **Más** superior derecho de la vista previa ofrece compartir y abrir con otras aplicaciones. Los archivos de texto también ofrecen copia. Cuando un archivo largo se muestra sólo parcialmente, la copia incluye sólo la parte visible; compartir utiliza el archivo original completo.

Los archivos se almacenan en este dispositivo. Guarde material importante en la aplicación Archivos del sistema u otro almacenamiento compartiéndolo y confirme que puede abrirlo antes de limpiar los archivos locales o desinstalar Cherry Studio. La exportación de mensajes de chat utiliza un flujo de trabajo independiente: [Compartir y exportar](sharing-and-export.md).

La lectura, creación y edición de archivos de texto integrados generalmente se ejecutan directamente, incluso en el modo **Preguntar cuando sea necesario**. Consulte [Aprobación de herramienta](using-tools.md).
