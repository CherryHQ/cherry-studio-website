---
icon: lock
---
# Preguntas y respuestas sobre bases de conocimiento privadas

El equipo de recursos humanos desea que los colegas consulten las políticas vigentes, pero no quiere que el Agent complete las respuestas con conocimiento general. Este caso agrupa el alcance de los materiales, las pruebas de recuperación y las reglas de respuesta; si no se encuentra contenido, el Agent debe indicarlo explícitamente.

<figure><img src="../../../../assets/203ae7d1fc3c8b76bd8af0a8.webp" alt="Cree una base de conocimiento independiente para un único tema, evitando mezclar materiales vigentes con obsoletos."><figcaption><p>Cree una base de conocimiento independiente para un único tema, evitando mezclar materiales vigentes con obsoletos. </p></figcaption></figure>

<figure><img src="../../../../assets/24f5e32e3c72df907aaed3a6.webp" alt="Solo ajuste la configuración de RAG según la estructura de los materiales si los resultados de recuperación son inestables."><figcaption><p>Solo ajuste la configuración de RAG según la estructura de los materiales si los resultados de recuperación son inestables. </p></figcaption></figure>

<figure><img src="../../../../assets/c00520c08c9364fe13caad57.webp" alt="① Pruebe con preguntas reales; ② Verifique los materiales devueltos, los fragmentos de texto original y la relevancia. Solo cuando esto sea estable, entregue la base de conocimiento al Agent para su uso."><figcaption><p>① Pruebe con preguntas reales; ② Verifique los materiales devueltos, los fragmentos de texto original y la relevancia. Solo cuando esto sea estable, entregue la base de conocimiento al Agent para su uso. </p></figcaption></figure>

## Flujo de trabajo

{% stepper %}
{% step %}
### 1. Crear una base de conocimiento de tema único

Agrupe los materiales vigentes y elimine las versiones duplicadas y obsoletas. Indique claramente el tema y el alcance de vigencia en los nombres de archivo.
{% endstep %}

{% step %}
### 2. Realizar pruebas de recuperación con preguntas reales

Pruebe al menos con cláusulas confusas, formulaciones coloquiales y preguntas sin respuesta. Ajuste los materiales o la configuración de RAG hasta que los fragmentos devueltos sean estables.
{% endstep %}

{% step %}
### 3. Crear un Agent dedicado

Vincule únicamente esta base de conocimiento y exija en el prompt: "Priorice citar los materiales; indique si no se encuentra; no complete las políticas con conocimiento general". Mantenga los permisos al mínimo.
{% endstep %}

{% step %}
### 4. Comenzar con un alcance limitado

Úsela primero para búsquedas internas, sin reemplazar directamente la aprobación o el juicio profesional. Recopile las preguntas respondidas incorrectamente y corríjalas en los materiales y las pruebas de recuperación.
{% endstep %}
{% endstepper %}

## Reglas de preguntas de ejemplo

```
Da primero la conclusión y después indica el nombre del documento y el fragmento correspondiente. Si las fuentes se contradicen, enumera los conflictos sin elegir por nosotros. Si la base de conocimientos no contiene la respuesta, escribe claramente «No se encontró en los documentos actuales».
```

## Combinaciones recomendadas y criterios de finalización

| Elemento | Práctica recomendada |
| ----- | --------------------------- |
| Base de conocimiento | Un conjunto de materiales por tema, eliminar duplicados y versiones obsoletas |
| Prueba de recuperación | Probar simultáneamente formulaciones estándar, coloquiales y preguntas sin respuesta |
| Agent | Vincular solo las bases de conocimiento necesarias, exigir citar materiales y no completar |
| Criterio de finalización | Encontrar el párrafo correcto; listar materiales en conflicto; indicar explícitamente si no hay respuesta |

{% hint style="danger" %}
El contenido de la base de conocimiento privada será procesado por los modelos de incrustación y conversación que usted seleccione. Antes de usarlo, confirme los requisitos de confidencialidad de los materiales y el alcance del servicio, y no importe claves ni credenciales de cuenta como materiales de conocimiento.
{% endhint %}
