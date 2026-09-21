---
icon: brain
---
# Flujo de trabajo de conocimiento y contenido

Las bases de conocimiento, las notas, la pintura y la traducción no son herramientas aisladas. Cada una se encarga de organizar recursos, consolidar contenido, crear material visual y procesar archivos multilingües, y todas pueden seguir utilizándose por el Agent.

<figure><img src="../../../../assets/31b376b5d5a233eeb71ddf12.webp" alt="Pruebe primero con preguntas reales mediante pruebas de recuperación, y luego permita que el Agent elabore informes, traducciones o imágenes basándose en los recursos."><figcaption><p>Pruebe primero con preguntas reales mediante pruebas de recuperación, y luego permita que el Agent elabore informes, traducciones o imágenes basándose en los recursos. </p></figcaption></figure>

## Cómo se dividen las funciones de las cuatro entradas

| Entrada | Para qué es adecuada | Siguiente paso habitual |
| ----- | ---------------------- | -------------- |
| 【Base de conocimiento】 | Permitir la búsqueda de recursos por pregunta | Vincular a un asistente de chat o a un Agent |
| 【Notas】 | Redactar, organizar y mantener a largo plazo contenido en Markdown | Exportar documentos o añadirlos a la base de conocimiento |
| 【Pintura】 | Generar, editar, combinar y mejorar imágenes | Descargarlas o entregarlas para tareas de contenido |
| 【Traducción】 | Procesar texto, imágenes y documentos | Guardar resultados, reutilizar historial o continuar editando |

{% hint style="success" %}
Si el objetivo es "completar un entregable con estos recursos", indíquele directamente al Agent en 【Trabajo】 dónde están los recursos y qué debe producir. Entre en el módulo correspondiente solo cuando sea necesario organizar manualmente la base de datos, ajustar imágenes o confirmar traducciones párrafo por párrafo.
{% endhint %}

<figure><img src="../../../../assets/203ae7d1fc3c8b76bd8af0a8.webp" alt="Al crear una nueva base de conocimiento, primero nómbrala y luego seleccione el modelo de incrustación para la búsqueda."><figcaption><p>Al crear una nueva base de conocimiento, primero nómbrala y luego seleccione el modelo de incrustación para la búsqueda. </p></figcaption></figure>

## De los recursos al entregable

{% stepper %}
{% step %}
### 1. Primero organice las fuentes

Añada los recursos de referencia a largo plazo a la base de conocimiento y coloque los borradores en edición en las notas o en el directorio de trabajo. No importe todas las conversaciones temporales no confirmadas a la base de conocimiento.
{% endstep %}

{% step %}
### 2. Verifique si puede recuperar la información clave

Utilice pruebas de recuperación en la base de conocimiento para confirmar que las preguntas reales encuentren los fragmentos correctos. Si no se encuentra nada, primero corrija los recursos y la configuración; no deje que el Agent adivine.
{% endstep %}

{% step %}
### 3. Luego cree texto, traducciones e imágenes

Permita que el Agent redacte el contenido basándose en los recursos; las imágenes y las traducciones se refinan en 【Pintura】 y 【Traducción】 respectivamente. Finalmente, una persona revisa los hechos y la expresión.
{% endstep %}
{% endstepper %}

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Construcción de bases de conocimiento y pruebas de recuperación</strong></td><td>De la importación de recursos a la verificación de la búsqueda</td><td><a href="knowledge-base.md">knowledge-base.md</a></td></tr><tr><td><strong>Notas, bases de conocimiento y Agent</strong></td><td>Permitir el flujo fluido de borradores, recursos y tareas</td><td><a href="notes-knowledge-agent.md">notes-knowledge-agent.md</a></td></tr><tr><td><strong>Generación, edición y mejora de imágenes</strong></td><td>Crear imágenes utilizables a partir de plantillas</td><td><a href="painting-workflow.md">painting-workflow.md</a></td></tr><tr><td><strong>Traducción de archivos, imágenes y textos largos</strong></td><td>Procesar diferentes formatos y reutilizar resultados anteriores</td><td><a href="translation-workflow.md">translation-workflow.md</a></td></tr></tbody></table>
