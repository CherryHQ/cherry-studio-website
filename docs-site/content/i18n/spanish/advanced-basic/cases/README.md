---
icon: lightbulb
---
# Casos de uso

Estos casos muestran cómo combinar conversaciones, Agent, bases de conocimientos, notas, dibujo, traducción, canales, tareas programadas y múltiples ventanas para crear flujos realmente operativos. Las configuraciones de los casos son un punto de partida; en la práctica, deben ajustarse según la sensibilidad de los datos, el volumen de uso y las normas del equipo.

<figure><img src="../../../../assets/fcd8d884c9294cbc845fdf9c.webp" alt="Primero, ejecute el flujo manualmente con materiales reales; luego, añada gradualmente bases de conocimientos, habilidades, MCP, canales y tareas programadas."><figcaption><p>Primero, ejecute el flujo manualmente con materiales reales; luego, añada gradualmente bases de conocimientos, habilidades, MCP, canales y tareas programadas. </p></figcaption></figure>

## Seleccione un caso

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Revisión de investigación con múltiples modelos</strong></td><td>Materiales internos, fuentes externas y verificación de conflictos</td><td><a href="research-review.md">research-review.md</a></td></tr><tr><td><strong>Revisión de documentos extensos</strong></td><td>Revisión por capítulos y generación de borrador revisado</td><td><a href="long-document-review.md">long-document-review.md</a></td></tr><tr><td><strong>Entrega de archivos de proyecto con Agent</strong></td><td>Control de directorios, permisos y alcance de los entregables</td><td><a href="project-delivery.md">project-delivery.md</a></td></tr><tr><td><strong>Kit de imágenes de marca</strong></td><td>De la dirección visual a imágenes en múltiples tamaños</td><td><a href="brand-image-kit.md">brand-image-kit.md</a></td></tr><tr><td><strong>Preguntas y respuestas con base de conocimiento privada</strong></td><td>Limitar el alcance de los materiales y rechazar suposiciones</td><td><a href="private-knowledge-qa.md">private-knowledge-qa.md</a></td></tr><tr><td><strong>Generación de informes semanales a partir de notas</strong></td><td>De registros diarios a informes semanales verificables</td><td><a href="notes-weekly-report.md">notes-weekly-report.md</a></td></tr><tr><td><strong>Organización de materiales multilingües</strong></td><td>Terminología, OCR, documentos y verificación de consistencia</td><td><a href="multilingual-materials.md">multilingual-materials.md</a></td></tr><tr><td><strong>Canales e informes diarios programados</strong></td><td>Agent, canales, planificación y registros de ejecución</td><td><a href="automated-daily-report.md">automated-daily-report.md</a></td></tr><tr><td><strong>Espacio de trabajo de investigación con múltiples ventanas</strong></td><td>Mantener simultáneamente materiales, comparaciones y tareas en ejecución</td><td><a href="multi-window-research.md">multi-window-research.md</a></td></tr></tbody></table>

## Orden general de implementación

<figure><img src="../../../../assets/2573aee0510e0d6abdabab7f.webp" alt="Los casos no son un conjunto de configuraciones aisladas, sino un flujo de trabajo completo que abarca la entrada, la ejecución, la revisión y la entrega."><figcaption><p>Los casos no son un conjunto de configuraciones aisladas, sino un flujo de trabajo completo que abarca la entrada, la ejecución, la revisión y la entrega. </p></figcaption></figure>

## Seleccione un caso según la tarea

| Su tarea | Recomendación inicial | Capacidades principales |
| ----------- | -------------- | -------------- |
| Comparar perspectivas y conservar el proceso de investigación | 【Revisión de investigación con múltiples modelos】 | Conversación, ramas, notas |
| Revisar grandes volúmenes de material y emitir opiniones | 【Revisión de documentos extensos】 | Agent, directorio de trabajo, archivos |
| Entregar documentación y entregables de proyecto | 【Entrega de archivos de proyecto con Agent】 | Agent, estado, archivos |
| Generar un conjunto de imágenes con estilo uniforme | 【Kit de imágenes de marca】 | Dibujo con Agent, plantillas de dibujo |
| Responder únicamente con base en materiales internos | 【Preguntas y respuestas con base de conocimiento privada】 | Base de conocimientos, pruebas de recuperación, Agent |
| Organizar informes semanales a partir de registros dispersos | 【Generación de informes semanales a partir de notas】 | Notas, Agent, archivos |
| Organizar archivos multilingües | 【Organización de materiales multilingües】 | Traducción, Agent, directorio de trabajo |
| Enviar informes fijos de forma programada | 【Canales e informes diarios programados】 | Agent, canales, tareas programadas |
| Observar simultáneamente materiales y tareas largas | 【Espacio de trabajo de investigación con múltiples ventanas】 | Pestañas, múltiples ventanas, búsqueda global |

{% stepper %}
{% step %}
### 1. Defina primero el entregable

Especifique qué archivo, tabla, imagen o mensaje debe obtenerse al final, y qué criterios definen la finalización.
{% endstep %}

{% step %}
### 2. Ejecute manualmente en 【Trabajo】

Verifique si el modelo, los prompts, el directorio de trabajo y los materiales son suficientes. Revise individualmente las operaciones que requieren aprobación.
{% endstep %}

{% step %}
### 3. Solo consolide las partes estables

Convierta los pasos repetitivos en habilidades, almacene los materiales de largo plazo en la base de conocimientos y mantenga los requisitos temporales en los prompts de la tarea.
{% endstep %}

{% step %}
### 4. Añada al final las conexiones externas y la automatización

Después de completar una aceptación manual, conecte MCP, canales o tareas programadas, y mantenga una vía de intervención manual en caso de fallo.
{% endstep %}
{% endstepper %}
