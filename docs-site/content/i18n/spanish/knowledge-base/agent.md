---
icon: robot
---
# Uso con Agent

Una vez que se vincula una base de conocimientos a un Agent, este puede buscar y leer materiales autorizados en tareas de múltiples pasos; cuando se requiere actualizar los materiales de forma explícita, también se puede habilitar la gestión de la base de conocimientos.

{% hint style="info" %}
Las conversaciones ordinarias son adecuadas para una sola pregunta y respuesta, mientras que los Agent son adecuados para investigación continua, comparación, generación de archivos y aceptación por pasos. El Agent solo accede a las bases de conocimientos vinculadas en la configuración.
{% endhint %}

## Diferencias entre conversación ordinaria y Agent

| Conversación ordinaria | Agent |
| ------------ | --------------- |
| Selección temporal de la base de conocimientos antes de cada mensaje | Vinculación a largo plazo en la configuración del Agent |
| Adecuado para preguntas y respuestas inmediatas y comparaciones breves | Adecuado para investigación de múltiples pasos y entrega de archivos |
| Principalmente responde usando fragmentos recuperados | Puede buscar materiales y gestionar la base de conocimientos según los permisos |
| La conversación actual determina el alcance de los materiales | La configuración del Agent determina el alcance accesible |

## Configuración de un Agent de solo lectura de la base de conocimientos

{% stepper %}
{% step %}
### 1. Primero, asegúrese de que la base de conocimientos esté aprobada

Confirme que los materiales objetivo estén listos y complete pruebas de recuperación con preguntas reales. El Agent no puede remediar el texto principal faltante o la segmentación incorrecta.
{% endstep %}

{% step %}
### 2. Abra la ventana de edición del Agent

Vaya a [Trabajo], seleccione el Agent objetivo y abra [Editar agente] en el menú.
{% endstep %}

{% step %}
### 3. Vincule la base de conocimientos mínima necesaria

Abra la pestaña [Base de conocimientos] y haga clic en [Agregar base de conocimientos]. Solo vincule las bases necesarias para esta tarea, evitando interferencias entre materiales de diferentes departamentos o versiones.
{% endstep %}

{% step %}
### 4. Habilite la búsqueda en la base de conocimientos

Abra [Herramientas integradas] y habilite [Búsqueda en base de conocimientos]. Para investigación de solo lectura, preguntas y respuestas, resúmenes y comparaciones, generalmente esto es suficiente.

<figure><img src="../../../assets/39a4ea66c712c2736e5ccf34.webp" alt="La búsqueda se utiliza para leer, la gestión se utiliza para modificar los materiales; comience con el mínimo permiso por defecto."><figcaption><p>La búsqueda se utiliza para leer, la gestión se utiliza para modificar los materiales; comience con el mínimo permiso por defecto. </p></figcaption></figure>
{% endstep %}

{% step %}
### 5. Pruebe con tareas de límites claros

Requiera que el Agent primero liste las fuentes y luego dé las conclusiones; si los materiales no lo respaldan, indíquelo explícitamente, no se permite completar con sentido común.
{% endstep %}

{% step %}
### 6. Acepte las fuentes y los entregables

Verifique de qué base de conocimientos proviene cada conclusión, si los hechos y las recomendaciones en los archivos están separados, y si las partes que faltan de evidencia están marcadas.
{% endstep %}
{% endstepper %}

## Cómo elegir entre herramientas integradas, base de conocimientos, habilidades y MCP

<figure><img src="../../../assets/cc38d8a6378ca8270ceda746.webp" alt="Use la base de conocimientos para consultar materiales, las habilidades para métodos repetitivos y MCP para acceder a sistemas externos; no use la ampliación de permisos en lugar de tareas claras."><figcaption><p>Use la base de conocimientos para consultar materiales, las habilidades para métodos repetitivos y MCP para acceder a sistemas externos; no use la ampliación de permisos en lugar de tareas claras. </p></figcaption></figure>

## Búsqueda y gestión de la base de conocimientos

| Capacidad | Qué puede hacer | Tareas aplicables | Sugerencia por defecto |
| ----- | -------------- | ----------- | ----------- |
| Búsqueda en base de conocimientos | Buscar, listar y leer bases de conocimientos vinculadas | Preguntas y respuestas, investigación, resúmenes, comparaciones | Mantener habilitado |
| Gestión de base de conocimientos | Agregar, eliminar o actualizar documentos de la base de conocimientos | Mantenimiento de materiales aprobado | Desactivado por defecto, habilitar temporalmente según necesidad |

{% hint style="warning" %}
Vincular una base de conocimientos solo otorga el alcance de acceso, no crea una copia adicional de la base de conocimientos. Después de actualizar o reindexar los materiales, el Agent usará el contenido actualizado en la próxima búsqueda.
{% endhint %}

{% hint style="danger" %}
Al habilitar [Gestión de base de conocimientos], agregar, eliminar y actualizar modificarán los materiales o el índice. Antes de aprobar, confirme la base de conocimientos objetivo, las entradas específicas, el método de resolución de conflictos de nombres y el plan de reversión.
{% endhint %}

## Cómo interactúan las configuraciones del Agent

<figure><img src="../../../assets/4c243884204ecf445fc42f9d.webp" alt="El modelo determina la comprensión y la generación, la base de conocimientos proporciona evidencia, y los permisos determinan hasta qué punto puede ejecutar el Agent."><figcaption><p>El modelo determina la comprensión y la generación, la base de conocimientos proporciona evidencia, y los permisos determinan hasta qué punto puede ejecutar el Agent. </p></figcaption></figure>

## Plantillas de tareas recomendadas

### Investigación y generación de informe

> Encuentre todas las regulaciones sobre aprobación de viajes de negocios al extranjero y seguros en las bases de conocimientos vinculadas. Primero liste las fuentes y los puntos de conflicto, luego genere una lista de verificación en Markdown. No complete el contenido que no esté respaldado por los materiales.

### Actualización de preguntas frecuentes

> Busque las entradas existentes sobre reembolsos de alojamiento, compare el sistema más reciente con el antiguo FAQ. Primero proporcione una lista de modificaciones propuestas; después de obtener la aprobación, actualice los documentos relevantes.

### Comparación de múltiples bases de conocimientos

> Busque evidencia en las bases de conocimientos "Manual de producto" y "Casos de posventa" respectivamente, y organícela en tres columnas: "Reglas oficiales / Casos reales / Guion sugerido". Mantenga el nombre de la fuente en cada conclusión.

## Notas de configuración

| Elemento de configuración | Punto de partida recomendado | Cuándo aumentar | Control de riesgos |
| ----- | ---------- | ------------ | ------------- |
| Base de conocimientos vinculada | 1 base relacionada con la tarea | Solo si hay necesidad real de comparación entre bases | Especifique claramente el propósito de cada base en el prompt |
| Búsqueda en base de conocimientos | Habilitado | Solo si la tarea requiere consultar materiales | Verifique si las fuentes provienen del alcance vinculado |
| Gestión de base de conocimientos | Desactivado | Cuando se requiera explícitamente agregar, eliminar o actualizar | Aprobación individual y respaldo previo de materiales importantes |
| Requisitos de salida | Separar hechos, inferencias y recomendaciones | Cuando se necesite generar informes o archivos | Mantener el nombre de la fuente en cada hecho |

## Caso de usuario

Xiaolin vinculó [Manual oficial] y [Casos de revisión] para el Agent de posventa, habilitando solo la búsqueda en la base de conocimientos. Exigió que el Agent liste advertencias de seguridad, pasos oficiales y recomendaciones de casos por modelo de equipo, y que separen los tres. Solo cuando descubrió que los casos antiguos necesitaban actualización, habilitó temporalmente la herramienta de gestión, revisó primero la lista de modificaciones propuestas y luego aprobó.

El criterio de finalización es: el Agent no accede a materiales no vinculados, no escribe las recomendaciones de casos como reglas oficiales, y todas las operaciones de escritura tienen un objetivo claro y un resultado de aceptación.

## Aceptación de resultados

* Las fuentes provienen solo de las bases de conocimientos vinculadas al Agent actual.
* Los resultados de búsqueda cubren cada condición de la tarea.
* El entregable separa los hechos de los materiales, las inferencias del Agent y las recomendaciones.
* Las operaciones de gestión explican el objetivo, el impacto y el resultado.
* Después de actualizar los materiales, vuelva a ejecutar las preguntas de recuperación fijas.

## Preguntas frecuentes

<details>

<summary>Si la conversación ordinaria puede encontrarlo, ¿por qué el Agent no lo encuentra? </summary>

Verifique si la base de conocimientos objetivo está vinculada al Agent actual y si [Búsqueda en base de conocimientos] está habilitada. El alcance de vinculación de diferentes Agent no se hereda entre sí.

</details>

<details>

<summary>¿Cuándo no se debe habilitar la gestión de la base de conocimientos? </summary>

Para investigación de solo lectura, bases de conocimientos de sistemas compartidos por el equipo y bases de conocimientos que conservan versiones históricas, por defecto solo se habilita la búsqueda. Cuando se necesite actualizar, habilite temporalmente la gestión y apruebe individualmente.

</details>

<details>

<summary>¿Qué hacer si el Agent quiere operar una base de conocimientos no vinculada? </summary>

No amplíe a todas las bases de conocimientos. Después de confirmar que la tarea realmente lo requiere, agregue la base objetivo al Agent actual o use un Agent que ya tenga esa base vinculada.

</details>

## Continuar leyendo

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Uso en la conversación </strong></td><td>Complete una pregunta y respuesta inmediata con fuentes. </td><td><a href="chat.md">chat.md </a></td></tr><tr><td><strong>Datos, privacidad y mantenimiento </strong></td><td>Comprenda los límites de permisos, servicios en la nube y respaldos. </td><td><a href="data.md">data.md </a></td></tr><tr><td><strong>Casos de aplicación de la base de conocimientos </strong></td><td>Referencia a flujos de trabajo de posventa e investigación. </td><td><a href="cases.md">cases.md </a></td></tr></tbody></table>
