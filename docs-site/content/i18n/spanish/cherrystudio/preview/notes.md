---
icon: note-sticky
---
# Notas

Las notas son el editor de Markdown integrado en Cherry Studio, que le permite organizar ideas, guardar resultados parciales y procesarlas aún más utilizando las capacidades de IA y la base de conocimientos, además de las conversaciones con la IA.

### Abrir notas

Haga clic en [Notas] en la barra de pestañas superior, o haga clic en el icono de la aplicación [Notas] en el [Launchpad].

<figure><img src="../../../../assets/14e04a73fa23719ebd35dde4.webp" alt=""><figcaption><p>Interfaz de notas: a la izquierda se encuentra el árbol de directorios y la lista de notas, y a la derecha, el editor de Markdown</p></figcaption></figure>

### Crear la primera nota

1. Haga clic en el primer icono [Nueva nota] en la esquina superior izquierda
2. Escriba el contenido en el editor de la derecha, que admite sintaxis de Markdown y una barra de herramientas de texto enriquecido
3. Haga clic con el botón derecho en la nota dentro de la lista de notas para asignarle un nombre

### Importar archivos Markdown existentes

* Arrastre directamente un archivo `.md` o un directorio que contenga archivos `.md` **arrastrando** al área de notas para importarlo como una nueva nota o un nuevo directorio
* También puede hacer clic en el segundo icono [Nuevo directorio] en la esquina superior izquierda para crear primero el directorio y luego arrastrar los archivos a su interior

### Funciones del editor

La barra de herramientas superior del editor de notas ofrece funciones comunes de texto enriquecido:

* **Formato**: Negrita (<kbd>B</kbd>), Cursiva (<kbd>I</kbd>), Subrayado (<kbd>U</kbd>), Tachado
* **Estructura**: Código en línea / Títulos H1–H3 / Lista sin viñetas / Lista numerada / Bloque de código / Cita / Lista de tareas / Fórmulas
* **Incrustación**: Tablas, Hipervínculos

<figure><img src="../../../../assets/d391f5ca5d92cb8fdf22ca63.webp" alt=""><figcaption><p>Editor después de crear una nueva nota y escribir el contenido</p></figcaption></figure>

La barra de estado inferior muestra el **número de caracteres** actual. El icono **A✓** en la esquina inferior izquierda permite activar o desactivar la revisión ortográfica. El menú desplegable en la esquina inferior derecha permite cambiar entre **Vista previa en vivo**, **Modo de código fuente** o **Modo de lectura**.

### Gestión de directorios

En la parte superior de la barra lateral izquierda se encuentran, en orden: [Nueva nota] / [Nuevo directorio] / [Ordenar] / [Favoritos] / [Buscar].

* **Ordenar**: 6 opciones — Nombre de archivo `A→Z` / `Z→A`, Fecha de actualización de más reciente a más antigua / de más antigua a más reciente, Fecha de creación de más reciente a más antigua / de más antigua a más reciente
* **Favoritos**: El botón de estrella cambia a la vista "Favoritos"
* **Buscar**: Botón de lupa, escriba en el cuadro de búsqueda. **La búsqueda coincide tanto con el título como con el contenido**, y las entradas que coincidan con el contenido mostrarán una etiqueta "Contenido" o "Nombre+Contenido" junto al título para indicar la fuente

### Menú contextual (Integración con IA + Exportación)

Al hacer clic con el botón **derecho** en cualquier nota del árbol de directorios izquierdo, se abrirá un menú de acciones, que es la entrada para la integración con IA y la exportación a múltiples formatos:

<figure><img src="../../../../assets/fd4004b475c63d7c924304e8.webp" alt=""><figcaption><p>Menú emergente al hacer clic con el botón derecho en una nota</p></figcaption></figure>

* **Generar nombre de nota** ✨: Permite que la IA genere automáticamente un título basándose en el contenido (solo disponible para archivos)
* **Renombrar** / **Abrir desde fuera** (Mostrar en Finder / Explorador de archivos)
* **Fijar nota** / **Quitar de favoritos**
* **Exportar nota a base de conocimientos**: Enviar a la [base de conocimientos](../../knowledge-base/knowledge-base.md) especificada
* **Exportar ›** Menú secundario: Markdown / Word (.docx) / Notion / Yuque / Obsidian / Joplin / Siyuan, así como "Copiar como imagen / Exportar como imagen" — La visibilidad de cada elemento puede activarse o desactivarse individualmente en [Configuración] → [Configuración de datos] → [Configuración del menú de exportación]
* **Eliminar**

> El menú contextual de los directorios es más sencillo y solo incluye: Nueva nota / Nuevo directorio / Renombrar / Abrir desde fuera / Eliminar.

### Menú [⋯] en la esquina superior derecha (Accesos rápidos de vista y exportación)

El [⋯] en la esquina superior derecha del título de la nota es el acceso rápido de **vista / exportación** para la **nota actual**. No lo confunda con el menú contextual:

<figure><img src="../../../../assets/b9b3ab0b2050382f16409b48.webp" alt=""><figcaption><p>Menú [⋯] en la esquina superior derecha</p></figcaption></figure>

* **Copiar contenido**: Copiar como texto plano
* **Exportar como Word**: Generar rápidamente `.docx` (para más formatos, use "Exportar ›" en el menú contextual)
* **Exportar como PDF**: Exportar la nota actual como archivo PDF
* **Imprimir**: Llamar a la impresión del sistema para la nota actual
* **Reducir ancho de columna**: Limitar el número máximo de caracteres por línea
* **Mostrar esquema de directorio**: Mostrar el árbol de títulos de la nota actual en el lado derecho
* **Configuración de fuente ›**: Fuente predeterminada / Fuente serif, tres tamaños de fuente (Pequeño / Mediano / Grande)
* **Más configuración**: Abrir el panel de configuración de notas (tres grupos de configuración: Datos / Editor / Visualización)

### Directorio de trabajo y copia de seguridad

El contenido de las notas se almacena como archivos locales. El **directorio de trabajo** se puede ver y modificar en [Configuración de datos] dentro del panel de configuración de notas (abrir desde [⋯] en la esquina superior derecha → [Más configuración]).

* Por defecto, se almacena en el directorio de datos de la aplicación Cherry Studio
* Primero seleccione una ruta personalizada con [Seleccionar], luego haga clic en [Aplicar] para cambiar (el cambio no migrará automáticamente los archivos existentes, debe copiarlos manualmente); haga clic en [Restablecer a predeterminado] para volver al directorio predeterminado
* Se recomienda realizar copias de seguridad combinando [WebDAV](../../pre-basic/data-settings/webdav.md) / [Almacenamiento compatible con S3](../../pre-basic/data-settings/s3-compatible.md)

### Configuración del editor y visualización

Abra el panel de configuración de notas desde [⋯] en la esquina superior derecha → [Más configuración]. Además de [Configuración de datos], hay dos grupos más:

**Configuración del editor**

* **Vista predeterminada**: Si las nuevas notas entran por defecto en [Modo de edición] o [Modo de lectura]
* **Vista de edición predeterminada**: Si en el modo de edición se usa por defecto [Vista previa en vivo] o [Modo de código fuente]

**Configuración de visualización**

* **Fuente**: Fuente predeterminada / Fuente serif
* **Tamaño de fuente**: Entre 10–30px
* **Reducir ancho de columna**: Limitar el número de caracteres por línea para evitar que las líneas largas ocupen toda la pantalla
* **Mostrar esquema de directorio**: Mostrar el árbol de títulos de la nota actual en el lado derecho para facilitar la navegación dentro del documento

> La fuente y el tamaño de fuente se pueden ajustar en este panel de configuración de visualización, o cambiar rápidamente desde [⋯] en la esquina superior derecha → [Configuración de fuente].

### Consejos y trucos

* Las notas admiten la sintaxis de listas de tareas `- [ ]`, útil para tareas diarias
* Arrastre archivos `.md` (o directorios que contengan `.md`) al árbol de directorios para importar en lote
* Si después de restaurar la configuración entre dispositivos encuentra que el directorio de notas está vacío, copie manualmente los archivos según la ruta indicada

{% hint style="info" %}
Si desea que la IA responda preguntas **directamente** basándose en el contenido de las notas, la forma más conveniente es **exportar la nota objetivo a la base de conocimientos** y luego activar esa base de conocimientos en la conversación.
{% endhint %}

***

### Obtener ayuda y enviar comentarios

Si tiene alguna duda, error o sugerencia de mejora de funciones durante la configuración o el uso, consulte los canales oficiales proporcionados en [Comentarios y sugerencias](../../question-contact/suggestions.md).
