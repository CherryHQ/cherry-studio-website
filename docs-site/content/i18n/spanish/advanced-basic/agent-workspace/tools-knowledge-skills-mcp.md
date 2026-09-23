---
icon: puzzle-piece
---
# Herramientas integradas, base de conocimientos, habilidades y MCP

Estas cuatro capacidades pueden mejorar el Agent, pero resuelven problemas distintos: las herramientas integradas se encargan de operaciones comunes, la base de conocimientos limita los materiales recuperables, las habilidades proporcionan métodos de trabajo y MCP conecta herramientas y datos externos.

### Diferencias y combinaciones

<figure><img src="../../../../assets/6be829efa6152cf0a3576cba.webp" alt="Herramientas integradas, base de conocimientos, habilidades y MCP — Ilustración"><figcaption></figcaption></figure>

| Capacidad | Problema que resuelve | Ejemplos |
| ---- | ----------------------------- | ------------------------- |
| Herramientas integradas | Qué puede hacer directamente el Agent dentro de Cherry Studio | Lectura y escritura de archivos, búsqueda web, generación de imágenes, memoria, notificaciones, tareas programadas |
| Base de conocimientos | Qué materiales privados puede recuperar el Agent | Normas de producto, plantillas de contratos, manuales de equipo |
| Habilidades | Según qué flujo y estándares debe trabajar el Agent | Formato de informes semanales, listas de revisión de código, normas de redacción |
| MCP | Qué herramientas y recursos externos puede conectar el Agent | Bases de datos, navegadores, sistemas de negocio de terceros |

Ruta de configuración: navegación izquierda 【Trabajo】→ abrir el menú Agent →【Editar】→【Herramientas integradas】.

### Herramientas integradas

Las herramientas integradas se agrupan por contexto, archivos, multimedia, orquestación, búsqueda y terminal. Las capacidades habituales incluyen:

* 【Generar imagen】: utiliza el modelo de dibujo configurado;
* 【Búsqueda en base de conocimientos】 y 【Gestión de base de conocimientos】: solo aparecen tras vincular una base de conocimientos;
* 【Búsqueda web】 y 【Extracción de páginas web】: utilizan la capacidad de conexión a internet configurada en Cherry Studio;
* 【Memoria】: guarda y recupera información estable entre tareas;
* 【Tareas programadas】 y 【Notificaciones】: permiten al Agent gestionar planes y enviar resultados a canales;
* 【Task】 y 【Flujo de trabajo】: procesan tareas complejas mediante subagentes u orquestación;
* 【Convertir archivo a Markdown】: lee PDF, Word, PowerPoint, Excel, OpenDocument, RTF, EPUB y CSV del directorio de trabajo o de los adjuntos de la sesión actual, y entrega el contenido estructurado al Agent para su procesamiento por segmentos;
* Herramientas de coordinación de sesión: buscan sesiones de Agent existentes, crean sesiones independientes, envían tareas y reciben resultados de finalización rastreables;
* Herramientas de archivos y Bash: leen, crean, modifican archivos y ejecutan comandos.

{% hint style="info" %}
【Convertir archivo a Markdown】 no modifica el archivo original ni ofrece OCR para PDF escaneados. Para los escaneos, primero utilice 【OCR】 o capacidades de procesamiento de documentos, y luego entréguelos al Agent.
{% endhint %}

### Alcance de la base de conocimientos

La base de conocimientos seleccionada en 【Base de conocimientos】 define el límite de recuperación de ese Agent. Si no se selecciona ninguna, la herramienta de base de conocimientos no se cargará; si se seleccionan varias, el Agent solo trabajará dentro de esas bases de conocimientos y no leerá automáticamente otros repositorios.

### Habilidades

Active en 【Habilidades】 las habilidades ya instaladas. El contenido de las habilidades entra en el entorno de trabajo del Agent para regular el flujo y la salida. Si necesita una habilidad nueva, puede pedirle directamente al Agent en 【Trabajo】 que la busque e instale; la ruta de gestión manual es 【Configuración】→【Habilidades】.

### MCP

Primero conecte e inicie el servidor en 【Configuración】→【MCP】, luego regrese a la ventana de edición del Agent y vincúlelo en 【MCP】. Los servidores no en ejecución no pueden activarse; tras la conexión, las herramientas que proporcionan entrarán en el directorio de herramientas del Agent y seguirán sujetas al control del modo de permisos. Si el servidor también proporciona recursos o indicaciones, puede seleccionarlas directamente desde el panel 【+】 del área de entrada para usarlas.

{% hint style="danger" %}
Abrir una herramienta no significa que deba omitirse la aprobación. Para escritura de archivos, terminal, modificación de datos externos y generación de imágenes que pueda generar cargos, mantenga preferentemente 【Confirmación por cada uso】; utilice permisos más amplios solo para herramientas de origen confiable y riesgo claro.
{% endhint %}

### Combinaciones recomendadas

| Necesidad de la tarea | Combinación sugerida | Cuándo añadir más | Precauciones |
| -------- | ------------- | ------------- | ------------- |
| Procesar archivos locales | Herramientas de archivos + directorio de trabajo dedicado | Añadir habilidad si se requiere un formato fijo | Mantener primero 【Confirmación por cada uso】 |
| Responder según materiales internos | Base de conocimientos + Búsqueda en base de conocimientos | Entregar al canal después de que la recuperación sea estable | Realizar primero pruebas con preguntas sin respuesta |
| Ejecutar flujos fijos repetidamente | Habilidad + herramientas integradas necesarias | Añadir MCP si se requieren datos externos | No almacenar claves de cuenta en la habilidad |
| Llamar a sistemas externos | MCP + credenciales con permisos mínimos | Ampliar la aprobación después de que la tarea sea estable | Confirmar operaciones de escritura, eliminación y facturación |

### Caso de usuario: Agent de investigación de mercado

Vincule al Agent una base de conocimientos de materiales de producto, active la habilidad “Informe de investigación”, conecte un MCP de búsqueda web confiable y mantenga las herramientas integradas de extracción de páginas web y escritura de archivos. El Agent primero determina el alcance del producto a partir de los materiales internos, luego busca información externa y finalmente escribe en el directorio de trabajo según la estructura definida por la habilidad. Los materiales internos, las fuentes externas y el formato de salida tienen cada uno un ámbito claro, lo que facilita el mantenimiento posterior.

<details>

<summary>¿Por qué no hay resultados de recuperación después de vincular la base de conocimientos?</summary>

Confirme que la base de conocimientos ha completado su procesamiento y contiene contenido recuperable, y luego verifique si la vinculación sigue presente en la ventana de edición del Agent. Si la base de conocimientos se elimina, las vinculaciones relacionadas se quitarán automáticamente.

</details>

<details>

<summary>¿Es necesario reiniciar la tarea después de activar una habilidad?</summary>

No es necesario cerrar la tarea. Tras editar el Agent, la nueva configuración de habilidades se cargará a partir del siguiente mensaje; la respuesta en curso no se interrumpirá.

</details>

<details>

<summary>¿Es necesario reiniciar la tarea después de activar una habilidad?</summary>

No es necesario cerrar la tarea. Tras editar el Agent, la nueva configuración de habilidades se cargará a partir del siguiente mensaje; la respuesta en curso no se interrumpirá.

</details>
