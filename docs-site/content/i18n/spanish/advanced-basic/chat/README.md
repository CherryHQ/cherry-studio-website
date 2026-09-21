---
icon: comments
---
# Conversación avanzada

【Conversación】 es ideal para organizar ideas mientras se interactúa. Además de las preguntas y respuestas con un solo modelo, permite comparar varios modelos lado a lado, crear ramas desde cualquier mensaje, gestionar el contexto de conversaciones largas y seguir utilizando los archivos, imágenes, código y citas de las respuestas como artefactos.

{% hint style="info" %}
Si la tarea requiere lectura y escritura continua de archivos locales, la invocación de múltiples herramientas o una ejecución prolongada, utilice el Agent en 【Trabajo】. La conversación es más adecuada para discutir, comparar y finalizar, mientras que el Agent es más adecuado para ejecutar.
{% endhint %}

<figure><img src="../../../../assets/5c0f5f563432facacf7942d6.webp" alt="Redacte primero la pregunta y los requisitos de salida de forma completa; solo añada la comparación de modelos o las ramas de mensajes cuando sea necesario validar de forma cruzada."><figcaption><p>Redacte primero la pregunta y los requisitos de salida de forma completa; solo añada la comparación de modelos o las ramas de mensajes cuando sea necesario validar de forma cruzada. </p></figcaption></figure>

## Selección de capacidades según el objetivo

| Objetivo | Práctica recomendada |
| ------------- | --------------------- |
| Comparar las perspectivas de diferentes modelos | Seleccione varios modelos en el área de entrada y envíe la misma pregunta |
| Conservar la discusión original y explorar otra línea de pensamiento | Cree una rama desde el mensaje clave |
| Continuar una discusión muy larga | Revise el uso del contexto y, si es necesario, resuma y abra un nuevo tema |
| Enviar la siguiente pregunta más tarde | Utilice la cola de mensajes, sin interrumpir la respuesta actual |
| Seguir procesando archivos o código de la respuesta | Abra la vista previa de artefactos y luego descargue, copie o continúe en una nueva tarea |

<figure><img src="../../../../assets/290e0288048d57cd868cb443.webp" alt="El selector de modelos permite seleccionar uno o varios modelos para la misma pregunta."><figcaption><p>El selector de modelos permite seleccionar uno o varios modelos para la misma pregunta. </p></figcaption></figure>

## Orden recomendado

{% stepper %}
{% step %}
### 1. Redacte primero la pregunta de forma completa

Describa el objetivo, los materiales, las restricciones y el formato de salida deseado. Varios modelos solo amplificarán las diferencias de la pregunta original, no completarán automáticamente la información faltante.
{% endstep %}

{% step %}
### 2. Luego decida si es necesario comparar

Seleccione varios modelos solo cuando necesite perspectivas diferentes. Para las preguntas y respuestas cotidianas, mantenga un solo modelo; la interfaz será más clara y el uso será más fácil de controlar.
{% endstep %}

{% step %}
### 3. Fije las conclusiones válidas

Guarde los materiales reutilizables en notas o en la base de conocimientos; asigne al Agent el trabajo que requiere ejecución continua, adjuntando las conclusiones ya confirmadas.
{% endstep %}
{% endstepper %}

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Comparación de varios modelos y ramas de mensajes </strong></td><td>Compare las respuestas y conserve al mismo tiempo las rutas de exploración </td><td><a href="model-compare-branches.md">model-compare-branches.md </a></td></tr><tr><td><strong>Conversaciones largas, contexto y mensajes en cola </strong></td><td>Mantenga las conversaciones largas claras y controlables </td><td><a href="context-queue.md">context-queue.md </a></td></tr><tr><td><strong>Artefactos, citas y exportación </strong></td><td>Revise y lleve consigo los resultados realmente útiles </td><td><a href="artifacts-export.md">artifacts-export.md </a></td></tr></tbody></table>
