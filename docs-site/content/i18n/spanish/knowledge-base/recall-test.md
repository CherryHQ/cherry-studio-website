---
icon: flask
---
# Verificación de recursos y recuperación

La prueba de recuperación verifica directamente si la pregunta puede encontrar el fragmento correcto, sin pasar primero por el modelo de chat para pulir la respuesta. Te ayuda a determinar si el problema reside en los recursos, el análisis, la segmentación o la configuración de búsqueda.

{% hint style="info" %}
Prepara de 3 a 5 preguntas reales cuyas respuestas ya conozcas y reutilízalas cada vez que actualices los recursos, el modelo o la segmentación. Es más fácil detectar regresiones con preguntas fijas que con consultas improvisadas.
{% endhint %}

## Preparar preguntas de prueba

Se recomienda cubrir simultáneamente tres tipos de preguntas:

* Hechos precisos, por ejemplo: «¿Cuál es el límite de alojamiento en las ciudades de primera línea del país?»
* Reglas condicionales, por ejemplo: «¿En qué circunstancias se puede reembolsar el alquiler de un vehículo en el extranjero?»
* Temas propensos a confusión, por ejemplo: «¿Quién debe aprobar adicionalmente los viajes de negocios superiores a 5000 yuanes?»

No utilices solo los títulos de los recursos o el texto original completo para las pruebas, ya que esto sobreestima el rendimiento en el uso real.

## Completar una prueba de recuperación

{% stepper %}
{% step %}
### 1. Abrir la prueba de recuperación

Abre la navegación lateral [Base de conocimientos] → selecciona la base de conocimientos → entra en [Prueba de recuperación].
{% endstep %}

{% step %}
### 2. Introducir una pregunta real

Introduce una pregunta con una respuesta clara y ejecuta la prueba. La pregunta debe ser cercana al lenguaje cotidiano; no copies deliberadamente el texto original de los recursos.
{% endstep %}

{% step %}
### 3. Revisar la fuente y el fragmento

Confirma que la fuente sea correcta y que el fragmento contenga simultáneamente las condiciones y la conclusión necesarias para la respuesta.

<figure><img src="../../../assets/b44776524449cdefe62eaed3.webp" alt="No mires solo si hay resultados; también verifica la fuente, la integridad del fragmento y el orden."><figcaption><p>No mires solo si hay resultados; también verifica la fuente, la integridad del fragmento y el orden. </p></figcaption></figure>
{% endstep %}

{% step %}
### 4. Identificar el problema según los síntomas

Si no aparece ningún fragmento correcto, revisa primero los recursos, el análisis y la segmentación. Si los fragmentos correctos aparecen pero el orden es inestable, considera entonces la incrustación, la reordenación o el Top K.
{% endstep %}

{% step %}
### 5. Ajustar un elemento y volver a probar

Modifica solo una configuración por turno. Si el ajuste afecta al análisis, la segmentación o el índice, ejecuta primero [Reindexar] y luego vuelve a probar con el mismo conjunto de preguntas.
{% endstep %}
{% endstepper %}

## Cómo interpretar los resultados

| Síntoma | Descripción | Siguiente paso |
| ------------- | --------------------- | ---------------------- |
| La fuente correcta aparece al principio y el fragmento es completo | La recuperación es básicamente adecuada | Prueba con varias formulaciones diferentes |
| No hay ningún resultado correcto | Los recursos no están listos, falta contenido, gran diferencia en la formulación o umbral demasiado alto | Revisa secuencialmente los recursos, el texto, los Chunks y la configuración de búsqueda |
| La fuente es correcta, pero el fragmento carece de frases clave | Los límites de análisis o segmentación no son óptimos | Revisa los Chunks, ajusta y reindexa |
| Aparecen simultáneamente versiones antiguas y nuevas | Se han conservado todos los recursos con el mismo nombre | Elimina las entradas antiguas o vuelve a importar usando [Reemplazar] |
| Los elementos correctos suelen aparecer al final | Hay demasiados candidatos o la clasificación es inestable | Limpia los recursos y considera un modelo de incrustación o reordenación |
| La recuperación es correcta, pero la respuesta del chat no es precisa | El problema probablemente reside en el prompt o en el modelo de chat | Mantén la configuración de recuperación y ajusta la pregunta y el modelo de chat |

{% hint style="warning" %}
El modelo de chat no puede recuperar los recursos clave que no se encontraron en la fase de recuperación. Si los resultados de recuperación no son adecuados, no intentes depurar cambiando repetidamente el modelo de chat.
{% endhint %}

## Ciclo de optimización

<figure><img src="../../../assets/8cd27fa50051cc96320b280a.webp" alt="Preguntas fijas → Revisar resultados → Identificar nivel → Ajustar un elemento → Reindexar si es necesario → Volver a probar."><figcaption><p>Preguntas fijas → Revisar resultados → Identificar nivel → Ajustar un elemento → Reindexar si es necesario → Volver a probar. </p></figcaption></figure>

Orden recomendado:

1. Confirma que los recursos son correctos y no hay versiones duplicadas o desactualizadas.
2. Revisa el texto analizado y los Chunks.
3. Si la diferencia entre la formulación y el texto original es grande, considera el modelo de incrustación.
4. Si los candidatos son aproximadamente correctos pero el orden es inestable, considera entonces el modelo de reordenación.
5. Reindexa tras los ajustes y repite el mismo conjunto de pruebas.

<figure><img src="../../../assets/5bd8c12bd8d08e785c6a4c42.webp" alt="Si los fragmentos no son completos, revisa la configuración de segmentación; los cambios solo afectan a los nuevos recursos, los antiguos necesitan reindexación."><figcaption><p>Si los fragmentos no son completos, revisa la configuración de segmentación; los cambios solo afectan a los nuevos recursos, los antiguos necesitan reindexación. </p></figcaption></figure>

## Descripción de la configuración

| Elemento de configuración | Valor predeterminado del producto | Punto de partida sugerido | Función | Escenario aplicable | Precauciones |
| ------ | ------------ | -------- | ---------- | ---------- | ----------------- |
| Número de preguntas de prueba | — | 3 a 5 | Establecer una línea base de calidad repetible | Todas las bases de conocimientos | Cubrir hechos precisos, reglas condicionales y preguntas propensas a confusión |
| Top K | 6, opcional 1 a 50 | Mantener 6 inicialmente | Controlar la cantidad final de fragmentos | Equilibrio entre cobertura y ruido | Aumentarlo puede ocupar más contexto |
| Umbral de similitud | 0.0, solo se muestra tras configurar reordenación | Comenzar con 0.0 | Filtrar resultados de baja puntuación tras la reordenación | Aún hay ruido tras la reordenación | Un valor demasiado alto eliminará fragmentos correctos |
| Método de reprobación | — | Cambiar solo un elemento por turno | Determinar de dónde proviene el cambio de configuración | Optimización, actualización de recursos o modelos | Reindexar primero tras modificar la segmentación o el modelo |

## Resultados esperados

* La fuente correcta aparece de forma estable en los primeros resultados.
* El fragmento contiene las condiciones y la conclusión necesarias para responder a la pregunta.
* Los resultados siguen siendo estables al usar una formulación natural diferente.
* Tras actualizar los recursos o la configuración, no hay regresiones significativas en las preguntas fijas.

## Caso de usuario

Xiaolin descubrió que «estándar de alojamiento» se encontraba usando el texto original, pero «¿cuánto se puede reembolsar por máximo por hotel?» era inestable. Primero confirmó que los recursos y los Chunks eran normales, luego configuró el modelo de incrustación y volvió a probar. Cuando los fragmentos correctos aparecían pero a veces se ubicaban al final, entonces añadió el modelo de reordenación.

El criterio de finalización es: que tres formulaciones diferentes encuentren el mismo estándar de alojamiento en los primeros resultados, y que el fragmento incluya las ciudades aplicables y el límite de monto.

## Preguntas frecuentes

<details>

<summary>No hay ningún fragmento correcto, ¿debo aumentar el Top K primero? </summary>

Revisa primero el texto de los recursos y los Chunks. Si hay errores de análisis o segmentación, aumentar el Top K solo devolverá más fragmentos incorrectos o incompletos.

</details>

<details>

<summary>¿Por qué no veo el umbral de similitud? </summary>

Solo tras seleccionar un modelo de reordenación, la configuración de la base de conocimientos mostrará [Umbral de similitud].

</details>

<details>

<summary>La recuperación es correcta, pero la respuesta del chat sigue siendo imprecisa, ¿qué hago? </summary>

Mantén la configuración de recuperación actual y revisa la expresión de la pregunta, el contexto de la conversación y el modelo de chat. En este punto, el problema generalmente ya no reside en la capa de búsqueda de recursos.

</details>

## Seguir leyendo

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Modelos y configuración de búsqueda </strong></td><td> Ajustar incrustación, reordenación, Top K y segmentación. </td><td><a href="emb-models-info.md">emb-models-info.md </a></td></tr><tr><td><strong>Análisis de documentos y OCR </strong></td><td> Procesar texto faltante, caracteres ilegibles y contenido escaneado. </td><td><a href="document-preprocessing.md">document-preprocessing.md </a></td></tr><tr><td><strong>Uso en conversaciones </strong></td><td> Usar la base de conocimientos para preguntas tras una recuperación adecuada. </td><td><a href="chat.md">chat.md </a></td></tr></tbody></table>
