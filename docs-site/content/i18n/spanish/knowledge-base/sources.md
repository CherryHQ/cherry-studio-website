---
icon: box-archive
---
# Añadir y organizar recursos

La base de conocimientos admite archivos, notas de Cherry Studio, directorios locales y direcciones web individuales. Después de la importación, debe verificar el estado de procesamiento, el contenido principal y los Chunks, y volver a indexar cuando los recursos se actualicen.

{% hint style="info" %}
El criterio de finalización no es que "el archivo aparezca en la lista", sino que el recurso sea legible, los Chunks estén completos y las preguntas reales recuperen la fuente correcta.
{% endhint %}

## Seleccionar la entrada correcta

<figure><img src="../../../assets/4622da2093d43942d7ee443e.webp" alt="Seleccione la entrada según la fuente del recurso: use [Archivos] para pocos archivos, [Directorio] para conjuntos de archivos del mismo tipo, [Notas] para contenido de Cherry Studio y [Enlace] para páginas web públicas."><figcaption><p>Seleccione la entrada según la fuente del recurso: use [Archivos] para pocos archivos, [Directorio] para conjuntos de archivos del mismo tipo, [Notas] para contenido de Cherry Studio y [Enlace] para páginas web públicas. </p></figcaption></figure>

| Entrada | Tipo de recurso adecuado | Relación tras la importación | Consideraciones principales |
| -- | ----------------------- | ----------- | ------------------ |
| Archivos | PDF, Office, Markdown, texto, etc. | Se guarda una copia administrada | Seleccionar un máximo de 20 elementos por operación |
| Notas | Contenido ya organizado en Cherry Studio | Se importa una instantánea del contenido en ese momento | Las modificaciones posteriores a la nota original no se sincronizan automáticamente |
| Directorio | Un lote de archivos locales bajo el mismo tema | Se crean entradas de recursos según el contenido del directorio | No importar directorios completos que contengan contenido no relacionado |
| Enlace | Una página web individual de acceso público | Se guarda una instantánea de la página web en el momento de la captura | Las páginas de inicio de sesión, renderizadas por scripts o con restricciones de acceso pueden ser incompletas |

{% hint style="warning" %}
Los archivos admitidos incluyen PDF, DOCX, DOC, PPTX, XLSX, XLS, MD, TXT, CSV, HTML y EPUB. Para PDF escaneados o contenido basado en imágenes, también es necesario verificar el OCR.
{% endhint %}

## Añadir y validar recursos

{% stepper %}
{% step %}
### 1. Seleccionar la fuente del recurso

Abra la base de conocimientos, haga clic en el botón para añadir recursos y seleccione [Archivos], [Notas], [Directorio] o [Enlace].
{% endstep %}

{% step %}
### 2. Confirmar el contenido seleccionado

Los archivos y las notas se pueden seleccionar en lotes; el máximo para una adición interactiva es de 20 elementos. Si hay más recursos, añádalos por lotes o use la entrada de directorio.
{% endstep %}

{% step %}
### 3. Gestionar conflictos de nombres

Si el nuevo recurso tiene el mismo nombre que una entrada existente, seleccione [Conservar todo] o [Reemplazar]. Al actualizar reglamentos, manuales e instantáneas de notas, generalmente se selecciona [Reemplazar].

{% hint style="warning" %}
Seleccionar [Conservar todo] hará que el contenido antiguo y nuevo participe simultáneamente en la recuperación. Solo hágalo si realmente necesita consultar diferentes versiones en paralelo, e indique la fecha o la versión en el nombre.
{% endhint %}
{% endstep %}

{% step %}
### 4. Esperar a que finalice el procesamiento

El recurso pasará por etapas de copia, lectura, segmentación e indexación. Si no se ha configurado un modelo de incrustación, no se crearán vectores, pero sí se creará un índice de palabras clave.

<figure><img src="../../../assets/2414cfc005a860f127a4fd96.webp" alt="Una vez que el recurso esté en estado disponible, verifique el contenido principal y los Chunks."><figcaption><p>Una vez que el recurso esté en estado disponible, verifique el contenido principal y los Chunks. </p></figcaption></figure>
{% endstep %}

{% step %}
### 5. Verificar el contenido principal y los Chunks

Abra el recurso para ver el contenido principal o consulte los Chunks desde el menú de la fila del recurso. Revise especialmente el orden de los títulos, las tablas, el texto OCR y si las frases clave se han dividido incorrectamente.
{% endstep %}

{% step %}
### 6. Completar la prueba de recuperación

Use una pregunta con una respuesta clara para verificar la fuente correcta y el fragmento. Después de actualizar el recurso, también debe volver a probar con el mismo conjunto de preguntas.

<figure><img src="../../../assets/b44776524449cdefe62eaed3.webp" alt="La validación final debe centrarse en la fuente, la integridad del fragmento y el orden, no solo en si se devuelve un resultado."><figcaption><p>La validación final debe centrarse en la fuente, la integridad del fragmento y el orden, no solo en si se devuelve un resultado. </p></figcaption></figure>
{% endstep %}
{% endstepper %}

## Estado de los recursos y métodos de tratamiento

| Fenómeno | Posible causa | Método de tratamiento |
| ----------- | ------------------ | ------------------ |
| Procesamiento prolongado | Archivo grande, analizador o modelo no disponible | Verificar el archivo original, el procesamiento de documentos y el modelo de incrustación |
| Se muestra un error | Fallo en la copia, lectura, segmentación o indexación | Abrir el mensaje de error y tratarlo según la etapa fallida |
| Contenido principal ausente o ilegible | El procesador de archivos no es compatible, el contenido escaneado no tiene OCR | Cambiar el método de procesamiento de documentos o configurar OCR |
| El Chunk carece de frases clave | Los límites de segmentación no son adecuados | Ajustar la segmentación y ejecutar [Volver a indexar] |
| Se recuperan versiones antigua y nueva simultáneamente | Se seleccionó [Conservar todo] para recursos con el mismo nombre | Eliminar la entrada antigua o volver a importar y seleccionar [Reemplazar] |

## Volver a indexar y eliminar

Después de cambiar la segmentación, el analizador o la configuración de incrustación, las entradas antiguas no aplicarán automáticamente la nueva configuración. Use [Volver a indexar] para un recurso individual o seleccione varios recursos en lote y vuelva a indexarlos.

{% hint style="danger" %}
Eliminar una entrada eliminará la copia administrada y el índice de la base de conocimientos actual. No eliminará el archivo original ni la nota original, pero aún debe confirmar si la base de conocimientos contiene la única copia antes de eliminar.
{% endhint %}

## Configuración

| Elemento de configuración | Valor predeterminado del producto | Punto de partida sugerido | Función | Escenario aplicable | Consideraciones |
| ------ | ------- | ---------- | --------------- | ---------- | ---------------- |
| Cantidad de adición por operación | Máximo 20 elementos | Añadir primero una pequeña cantidad de recursos representativos | Controlar la escala de una importación | Creación inicial de la base o depuración | Verificar el análisis y la recuperación antes de importar en gran volumen |
| Tratamiento de nombres duplicados | Seleccionar al ocurrir un conflicto | Priorizar [Reemplazar] para actualizar recursos | Determinar si las entradas antiguas y nuevas coexisten | Actualización de reglamentos, manuales y notas | [Conservar todo] puede hacer que el contenido antiguo participe en la recuperación |
| Volver a indexar | Ejecución manual | Ejecutar después de cambios en la configuración | Permitir que los recursos antiguos usen el nuevo análisis, segmentación o modelo | Ajuste fino o reparación de recursos | Debe realizar nuevamente la prueba de recuperación después de completar |

## Caso de usuario

Xiaolin actualiza el reglamento de viajes de negocios cada mes. Importa el nuevo archivo con el mismo nombre y selecciona [Reemplazar]. Una vez que el procesamiento del recurso finaliza, verifica el contenido principal y los Chunks, y luego prueba las reglas de alojamiento, transporte y aprobación con preguntas fijas.

El criterio de finalización es: las reglas antiguas ya no aparecen en los resultados de recuperación, y las condiciones y montos de las nuevas reglas se recuperan de manera estable.

## Preguntas frecuentes

<details>

<summary>¿La base de conocimientos se actualiza automáticamente después de modificar la nota original? </summary>

No. La nota importa una instantánea del contenido en ese momento. Después de modificarla, debe volver a añadirla y seleccionar [Reemplazar], o ejecutar [Volver a indexar] para el recurso correspondiente.

</details>

<details>

<summary>¿Por qué la página web solo captura parte del contenido? </summary>

Las páginas web que requieren inicio de sesión, dependen de la renderización por scripts o tienen restricciones de acceso pueden no capturarse por completo. Puede usar archivos o notas para guardar el contenido principal antes de importar.

</details>

<details>

<summary>¿Eliminar una entrada de la base de conocimientos eliminará el archivo original? </summary>

No eliminará el archivo original ni la nota original, pero eliminará la copia administrada y el índice de la base de conocimientos.

</details>

## Continuar leyendo

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Análisis de documentos y OCR </strong></td><td>Tratar contenido principal ausente, ilegible y contenido escaneado. </td><td><a href="document-preprocessing.md">document-preprocessing.md </a></td></tr><tr><td><strong>Verificar recursos y recuperación </strong></td><td>Validar la calidad de la búsqueda con preguntas fijas. </td><td><a href="recall-test.md">recall-test.md </a></td></tr><tr><td><strong>Datos, privacidad y mantenimiento </strong></td><td>Comprender copias de seguridad, eliminación y límites del servicio. </td><td><a href="data.md">data.md </a></td></tr></tbody></table>
