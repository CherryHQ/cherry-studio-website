---
icon: lightbulb
---
# Casos de uso de bases de conocimiento

La fiabilidad de una base de conocimiento no depende de la cantidad de materiales, sino de que los límites estén claros, que las fuentes sean mantenibles y que las preguntas reales puedan recuperar de forma estable la evidencia correcta.

{% hint style="info" %}
Los siguientes parámetros son solo un punto de partida. Primero, ejecute el flujo de importación, recuperación y uso con 3 a 10 materiales representativos, y luego amplíe según un conjunto fijo de preguntas.
{% endhint %}

## Diseñe primero con el mismo método

{% stepper %}
{% step %}
### 1. Defina la tarea final

Especifique el juicio o el entregable que el usuario debe realizar, por ejemplo, consultar políticas, diagnosticar fallas o generar informes de investigación.
{% endstep %}

{% step %}
### 2. Establezca los límites de los materiales

Solo los materiales que deben recuperarse juntos durante el uso deben colocarse en la misma base de conocimiento. Separe prioritariamente el contenido con diferentes permisos, ciclos de vida, modelos de producto o versiones.
{% endstep %}

{% step %}
### 3. Seleccione las fuentes y el método de actualización

Indique quién mantiene los documentos, notas, directorios y páginas web, cuándo se reemplazan y si es necesario conservar versiones históricas.
{% endstep %}

{% step %}
### 4. Prepare preguntas de aceptación

Prepare 3 a 10 preguntas reales que cubran hechos precisos, reglas condicionales, formulaciones coloquiales y versiones que suelen confundirse.
{% endstep %}

{% step %}
### 5. Ajuste la estrategia de recuperación

Mantenga primero una configuración simple. Añada embeddings si BM25 no es suficiente para manejar expresiones sinónimas; active la reordenación si los candidatos correctos aparecen pero el orden no es estable.
{% endstep %}

{% step %}
### 6. Integre con el chat o el Agent

Use el chat normal para una sola pregunta y respuesta; vincule un Agent cuando se requiera investigación en múltiples pasos, comparaciones o entrega de archivos. Verifique cada fuente individualmente antes del lanzamiento.
{% endstep %}
{% endstepper %}

## Caso de usuario 1: Preguntas sobre políticas de empleados

### Objetivo

Permitir a los empleados consultar la aprobación de viajes de negocios, los estándares de alojamiento y las excepciones de reembolso, y poder abrir la fuente para verificar el texto original.

### Organización de materiales

* Base de conocimiento: 【Política de viajes de negocios de empleados】
* Entrada: 【Proceso de aprobación de viajes】
* Entrada: 【Guía rápida de estándares de alojamiento】
* Entrada: 【Preguntas frecuentes sobre viajes】

<figure><img src="../../../assets/2414cfc005a860f127a4fd96.webp" alt="Mantenga separadas las cláusulas de la política y las preguntas frecuentes; al actualizar una de ellas, no es necesario rehacer todos los materiales."><figcaption><p>Mantenga separadas las cláusulas de la política y las preguntas frecuentes; al actualizar una de ellas, no es necesario rehacer todos los materiales.</p></figcaption></figure>

### Configuración recomendada

| Elemento | Punto de partida | Cuándo ajustar |
| ---- | ---------- | ----------------- |
| Recuperación | Usar BM25 primero | Añadir embeddings cuando la formulación de los empleados difiera significativamente del lenguaje de la política |
| Reordenación | No usar al inicio | Activar cuando los candidatos correctos aparezcan pero el orden no sea estable |
| Versión de materiales | Conservar solo la versión actual | Incluir el año en el nombre si la auditoría histórica requiere coexistencia |
| Requisitos de respuesta | Separar conclusión, condiciones y fuente | Marcar explícitamente cuando los materiales no lo especifiquen |

### Preguntas de aceptación

1. ¿Cuál es el máximo que se puede reembolsar por alojamiento en un viaje de negocios?
2. ¿Se puede reembolsar el alquiler de un coche en el extranjero?
3. ¿Quién aprueba cuando el costo total estimado supera los 5000 yuanes?
4. ¿Cómo se maneja si se reserva un hotel sin aprobación previa?

### Prompt de chat

> Responda solo basándose en la “Política de viajes de negocios de empleados”. Proporcione primero la conclusión, luego liste las condiciones aplicables y la fuente; si los materiales no lo especifican, escriba “La política no lo especifica”, no complete con conocimiento común.

{% hint style="success" %}
Al pasar la aceptación, la misma política debe recuperarse tanto con la formulación original como con la formulación coloquial, y los montos, roles y condiciones en la respuesta deben poder ser respaldados directamente por las citas.
{% endhint %}

## Caso de usuario 2: Asistente de posventa de producto

### Objetivo

Organizar manuales oficiales, códigos de falla y casos revisados para que el servicio al cliente proporcione primero sugerencias de diagnóstico seguras y trazables.

### Límites de materiales

| Base de conocimiento o grupo de materiales | Contenido | Principio de mantenimiento |
| ------- | ------------- | ------------- |
| Manual oficial | Especificaciones, límites de garantía, pasos estándar | Conservar modelo y versión del documento |
| Códigos de falla | Un subsección por falla | Indicar firmware y modelo de dispositivo aplicables |
| Casos revisados | Casos con causa y solución confirmadas | No importar directamente chats no revisados |

Cuando las reglas difieren significativamente entre modelos, divida en bases de conocimiento independientes por modelo para evitar que códigos de falla idénticos compiten entre sí.

### Configuración de recuperación y Agent

* Revise primero la tabla de contenido, las tablas y el texto de dos columnas en los PDF.
* Los códigos de falla dependen de términos precisos; mantenga BM25.
* Añada un modelo de embeddings cuando la descripción del cliente sea más coloquial.
* Vincule el manual oficial y los casos revisados al Agent de posventa, activando solo 【Búsqueda en base de conocimiento】.

> Diagnostique en tres pasos según el modelo del dispositivo, el código de falla y los síntomas. Indique en cada paso si la base proviene del manual oficial o de un caso revisado. Si involucra desmontaje, uso de electricidad o borrado de datos, indique primero el riesgo y espere confirmación.

### Criterios de aceptación

* No aplicar pasos de otros modelos al modelo actual.
* Las advertencias de seguridad deben aparecer antes de los pasos operativos.
* Separar las reglas oficiales de las sugerencias de casos.
* Transferir a un agente humano si no hay soporte de materiales; no suponer.

## Caso de usuario 3: Materiales de investigación e informes

### Objetivo

Extraer evidencia verificable de artículos, notas de entrevistas y capturas de páginas web, y luego generar un informe comparativo con fuentes mediante un Agent.

### Organización de materiales

* Cree bases por pregunta de investigación; no meta todos los artículos en una sola base grande.
* Incluya autor, año y título corto en el nombre del archivo.
* Indique en las notas de entrevista el rol del entrevistado, la fecha y si es citable.
* Registre la fecha de captura de los materiales web, ya que la base de conocimiento guarda la instantánea importada.

<figure><img src="../../../assets/8cd27fa50051cc96320b280a.webp" alt="Verifique primero la cobertura de fuentes con preguntas fijas en la base de investigación, y luego entregue al Agent la síntesis entre documentos."><figcaption><p>Verifique primero la cobertura de fuentes con preguntas fijas en la base de investigación, y luego entregue al Agent la síntesis entre documentos.</p></figcaption></figure>

### Prompt del Agent

> Busque evidencia en la base de conocimiento de investigación vinculada sobre “por qué los usuarios abandonan la configuración inicial”. Liste primero las opiniones originales y limitaciones por fuente, luego sintetice consensos, divergencias e hipótesis por verificar. Genere finalmente un informe en Markdown; no escriba inferencias como citas directas de los entrevistados.

### De la evidencia al entregable

<figure><img src="../../../assets/31b376b5d5a233eeb71ddf12.webp" alt="Conservar primero la evidencia y las limitaciones, y luego permitir que el Agent la organice en un informe; no deje que el producto final oculte las fuentes originales."><figcaption><p>Conservar primero la evidencia y las limitaciones, y luego permitir que el Agent la organice en un informe; no deje que el producto final oculte las fuentes originales.</p></figcaption></figure>

### Criterios de aceptación

* Los consensos deben estar respaldados por al menos dos fuentes independientes.
* Las divergencias deben conservar sus condiciones respectivas; no fusionarlas forzosamente.
* Las citas, inferencias y sugerencias deben tener identificadores claros.
* Las instantáneas web y las versiones de artículos deben ser trazables.

## Notas de configuración: Tabla de diseño reutilizable

| Elemento | Pregunta a responder |
| ---- | ---------------------- |
| Objetivo | ¿Qué juicio debe tomar el usuario o qué resultado debe entregar? |
| Límites | ¿Qué materiales deben recuperarse juntos y cuáles deben separarse? |
| Fuentes | ¿Cómo se actualizan los archivos, notas, directorios y páginas web? |
| Análisis | ¿Qué tipo de documento tiene más probabilidad de tener problemas de OCR, tablas o orden? |
| Recuperación | ¿Es suficiente BM25? ¿Cuándo se necesitan embeddings y reordenación? |
| Preguntas de aceptación | ¿Qué 3 a 10 preguntas representan el uso real? |
| Manejo de fallos | ¿Qué hacer ante resultados nulos, versiones en conflicto o falta de soporte de materiales? |
| Mantenimiento | ¿Quién es responsable de reemplazar materiales, reindexar y hacer copias de seguridad? |

{% hint style="warning" %}
No considere “importar muchos materiales” como criterio de finalización. A más materiales, más necesario es gestionar explícitamente las versiones duplicadas, la mezcla de permisos y la competencia de ruido.
{% endhint %}

## Preguntas frecuentes

<details>

<summary>¿Deben estar las políticas, manuales y casos en la misma base de conocimiento?</summary>

Depende de si deben recuperarse juntos en la misma pregunta y si los permisos y ciclos de actualización son consistentes. Si las diferencias son notables, dividir las bases facilita controlar los límites de las fuentes.

</details>

<details>

<summary>¿Se puede importar directamente todo el chat de atención al cliente en la base de casos?</summary>

No se recomienda. Primero revise la causa, la solución y el contenido de privacidad, e importe solo los casos confirmados y reutilizables.

</details>

<details>

<summary>¿Qué se debe hacer antes de ampliar los materiales?</summary>

Mantenga un conjunto fijo de preguntas de aceptación, importe por lotes y vuelva a probar. Si los nuevos materiales degradan los resultados, podrá localizar rápidamente qué lote de contenido causó el problema.

</details>

## Continuar leyendo

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Introducción a las bases de conocimiento</strong></td><td>Primero ejecute la creación, importación, recuperación y uso.</td><td><a href="knowledge-base.md">knowledge-base.md</a></td></tr><tr><td><strong>Uso con Agent</strong></td><td>Configure investigación en múltiples pasos y permisos de materiales.</td><td><a href="agent.md">agent.md</a></td></tr><tr><td><strong>Preguntas frecuentes</strong></td><td>Localice problemas de materiales, recuperación o respuestas desde los síntomas.</td><td><a href="troubleshooting.md">troubleshooting.md</a></td></tr></tbody></table>
