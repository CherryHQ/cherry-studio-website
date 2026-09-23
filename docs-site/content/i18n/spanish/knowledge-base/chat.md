---
icon: comments
---
# Uso en el chat

Una vez que la prueba de recuperación sea satisfactoria, puede seleccionar uno o varios bases de conocimientos en una conversación normal para que el modelo responda basándose en los fragmentos recuperados y muestre las fuentes.

{% hint style="info" %}
El chat organiza la respuesta, mientras que la base de conocimientos proporciona la evidencia. Primero, confirme los fragmentos correctos en la [Prueba de recuperación] y luego determine si es necesario ajustar el prompt o el modelo de chat.
{% endhint %}

## Requisitos previos

| Elemento de verificación | Estado satisfactorio |
| ----- | ---------------- |
| Modelo de chat | Soporta llamadas a herramientas |
| Materiales de la base de conocimientos | Al menos un material está listo |
| Mensaje actual | No tiene archivos adjuntos simultáneamente |
| Calidad de recuperación | Las preguntas clave pueden encontrar la fuente correcta y el fragmento completo |

{% hint style="warning" %}
Cuando el mensaje actual tiene archivos adjuntos, la selección de la base de conocimientos se deshabilita. Primero, elimine los archivos adjuntos y luego seleccione la base de conocimientos desde el área de entrada.
{% endhint %}

## Completar una pregunta y respuesta con fuentes

{% stepper %}
{% step %}
### 1. Seleccione un modelo que soporte llamadas a herramientas

Cree o abra una conversación normal y confirme en el selector de modelos que el modelo actual soporta llamadas a herramientas. Si la entrada de la base de conocimientos indica capacidad insuficiente, cambie el modelo primero.
{% endstep %}

{% step %}
### 2. Abra la selección de base de conocimientos

Haga clic en el botón de añadir en la esquina inferior izquierda del área de entrada, seleccione [Base de conocimientos] y luego marque una o varias bases de conocimientos objetivo.
{% endstep %}

{% step %}
### 3. Confirme el estado de la selección

El nombre de la base de conocimientos debe aparecer en el área de entrada. Si la pregunta solo involucra un tema, priorice seleccionar solo una base de conocimientos para reducir la competencia de fragmentos irrelevantes.

<figure><img src="../../../assets/5baecf3a1e479cb5a9627b45.webp" alt="Antes de enviar, confirme que la base de conocimientos seleccionada y la pregunta actual pertenecen al mismo alcance de materiales."><figcaption><p>Antes de enviar, confirme que la base de conocimientos seleccionada y la pregunta actual pertenecen al mismo alcance de materiales. </p></figcaption></figure>
{% endstep %}

{% step %}
### 4. Especifique claramente la tarea, el alcance y el formato

Por ejemplo: `Responde únicamente con la base de conocimientos seleccionada sobre los límites de alojamiento en las principales ciudades de China. Desglosa por nivel de puesto e indica la fuente de cada elemento.`
{% endstep %}

{% step %}
### 5. Abra la verificación de fuentes

Revise el nombre de la fuente, el contenido del fragmento y las condiciones de aplicabilidad. El contenido no especificado en los materiales no debe completarse como hecho.
{% endstep %}

{% step %}
### 6. Si falla, regrese a la prueba de recuperación

Use la misma pregunta para verificar los fragmentos devueltos por la base de conocimientos. Si la recuperación es incorrecta, primero corrija los materiales, el análisis o la búsqueda; si la recuperación es correcta, luego ajuste el prompt y el modelo de chat.

<figure><img src="../../../assets/b44776524449cdefe62eaed3.webp" alt="Cuando la respuesta del chat no es ideal, los resultados de recuperación ayudan a determinar si el problema está en la capa de búsqueda o en la capa de respuesta."><figcaption><p>Cuando la respuesta del chat no es ideal, los resultados de recuperación ayudan a determinar si el problema está en la capa de búsqueda o en la capa de respuesta. </p></figcaption></figure>
{% endstep %}
{% endstepper %}

## Cómo se forma la respuesta

<figure><img src="../../../assets/192b7298d3bc060e6d5897c9.webp" alt="El modelo de chat ve los fragmentos finales recuperados, no lee automáticamente todos los materiales de la base de conocimientos."><figcaption><p>El modelo de chat ve los fragmentos finales recuperados, no lee automáticamente todos los materiales de la base de conocimientos. </p></figcaption></figure>

## Plantillas de preguntas recomendadas

### Consultar una regla específica

> Responda solo según la base de conocimientos seleccionada: ¿Cuál es el límite de alojamiento en las ciudades de primera línea de China? Si los estándares difieren según el nivel de puesto, enumérelos por separado y indique la fuente después de cada ítem.

### Comparar varios materiales

> Compare las diferencias de aprobación entre viajes de negocios nacionales e internacionales. Organícelos en una tabla según "condiciones de activación, aprobador, materiales antes del viaje"; marque como "No especificado" lo que no esté escrito en los materiales.

### Exigir distinguir entre hechos y sugerencias

> Primero, liste los hechos respaldados por el texto original de la política, luego proporcione sugerencias operativas por separado. Las sugerencias no deben escribirse como requisitos de la política; mantenga el nombre de la fuente para cada hecho.

{% hint style="success" %}
Una buena pregunta contiene simultáneamente cuatro elementos: la tarea a completar, el alcance de los materiales permitidos, el formato de salida esperado y cómo manejar la falta de información en los materiales.
{% endhint %}

## ¿Seleccionar una o varias bases de conocimientos?

| Situación | Recomendación | Razón |
| --------- | -------------- | --------------- |
| Pregunta sobre una sola política o producto | Seleccione solo una base de conocimientos | Reduce la competencia de fragmentos irrelevantes |
| Comparación entre departamentos o productos | Seleccione varias bases de conocimientos y especifique el uso de cada una | Ayuda al modelo a mantener los límites de las fuentes |
| Resultados mezclados de varias bases de conocimientos | Divida en varias preguntas y verifique por separado | Confirme primero que cada base de conocimientos pueda recuperar de forma independiente |
| Investigación a largo plazo y en múltiples pasos | Use un Agente vinculado a la base de conocimientos | Más adecuado para búsqueda continua, organización y entrega de archivos |

## Notas de configuración

| Elemento de configuración | Punto de partida recomendado | Función | Precauciones |
| ----- | ----------- | --------- | ------------ |
| Cantidad de bases de conocimientos | 1 | Controla el alcance de los materiales | Aumente solo si hay una necesidad real de cruzar bases de conocimientos |
| Alcance de la pregunta | Escriba explícitamente "solo según la base de conocimientos" | Reduce la suposición por conocimiento general | Las conclusiones importantes aún deben verificarse con las fuentes |
| Formato de salida | Tabla o lista por ítems | Facilita la verificación ítem por ítem | Exija "No especificado" en lugar de suposiciones |
| Pregunta de regresión | Use la misma pregunta que en la prueba de recuperación | Distingue entre problemas de búsqueda y de respuesta | Cambie solo una variable por iteración |

## Consolidar el contenido del chat en la base de conocimientos

Cherry Studio puede guardar mensajes, temas o notas en la base de conocimientos. Antes de guardar, elimine las suposiciones del modelo, el contenido duplicado y las discusiones temporales, y use títulos que indiquen el tema y la versión.

Después de guardar, se forma una nueva instantánea de materiales, que no se sincroniza en tiempo real con la conversación o nota original. Cuando el contenido se actualice, es necesario volver a guardar o reemplazar.

## Caso de usuario

Xiao Lin preguntó sobre el límite de alojamiento en la [Política de viajes de negocios de empleados]. La primera respuesta incluyó conocimiento general del modelo; cambió el prompt a "escriba 'No especificado' si no está en los materiales" y exigió mantener la fuente para cada ítem. Luego abrió cada cita para verificar el nivel de la ciudad, el nivel de puesto y los montos.

El criterio de finalización es: cada monto debe ser directamente respaldado por el fragmento citado, y las excepciones no especificadas en la política no deben ser completadas por el modelo por su cuenta.

## Preguntas frecuentes

<details>

<summary>¿Por qué la entrada de la base de conocimientos está en gris? </summary>

Primero, seleccione un modelo que soporte llamadas a herramientas y elimine los archivos adjuntos del mensaje actual; luego confirme que existe al menos una base de conocimientos con materiales listos.

</details>

<details>

<summary>¿Por qué la respuesta no tiene fuentes? </summary>

Confirme que el área de entrada aún muestra la base de conocimientos seleccionada y luego coloque la misma pregunta en la prueba de recuperación. Si no hay una recuperación correcta, primero repare la base de conocimientos.

</details>

<details>

<summary>¿Qué hacer si la fuente es correcta pero la conclusión no es precisa? </summary>

Exija al modelo que responda solo según las citas, divida la tarea en ítems de hechos más pequeños y verifique manualmente las conclusiones importantes. En este caso, suele ser un problema de prompt, capacidad del modelo o organización del contexto.

</details>

## Continuar leyendo

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Verificar materiales y recuperación </strong></td><td>Confirme primero que los fragmentos correctos puedan encontrarse de manera estable. </td><td><a href="recall-test.md">recall-test.md </a></td></tr><tr><td><strong>Uso con Agente </strong></td><td>Permita que la base de conocimientos participe en tareas de múltiples pasos y entrega de archivos. </td><td><a href="agent.md">agent.md </a></td></tr><tr><td><strong>Caso de aplicación de base de conocimientos </strong></td><td>Reutilice casos de políticas, servicio postventa e investigación. </td><td><a href="cases.md">cases.md </a></td></tr></tbody></table>
