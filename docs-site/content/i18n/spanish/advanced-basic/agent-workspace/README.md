---
icon: robot
---
# Espacio de trabajo de Agent

Agent es adecuado para tareas con objetivos claros, que requieren el uso de herramientas o archivos y que pueden extenderse a lo largo de varios pasos. La entrada es la sección 【Trabajo】 en la barra de navegación izquierda, no la pestaña superior de los tutoriales antiguos.

{% hint style="success" %}
La forma más sencilla de configurar es primero indicarle a Agent qué desea lograr y luego permitirle que verifique los modelos, herramientas, bases de conocimiento o canales que faltan. Cuando se necesite un control preciso, abra la ventana de edición de Agent o 【Configuración】 para realizar ajustes manuales.
{% endhint %}

<figure><img src="../../../../assets/2573aee0510e0d6abdabab7f.webp" alt="Espacio de trabajo de Agent — Ilustración"><figcaption></figcaption></figure>

<figure><img src="../../../../assets/e7c3b90701b9b2b38da25043.webp" alt="Espacio de trabajo de Agent — Ilustración"><figcaption></figcaption></figure>

### ¿De qué está compuesto el espacio de trabajo?

| Componente | Función | Cuándo prestar atención |
| ----- | ----------------- | ----------------- |
| Agent | Almacena el rol, el modelo, los prompts y las capacidades | Cuando se repiten tareas del mismo tipo |
| Tarea | Registro de una secuencia continua de trabajo | Abra una tarea por cada objetivo para preservar el contexto |
| Directorio de trabajo | Alcance de archivos que Agent puede procesar directamente | Tareas de archivos como código, organización de recursos o generación de documentos |
| Área de entrada | Envía objetivos, adjuntos e invoca herramientas | Para iniciar tareas o añadir requisitos |
| Panel derecho | Visualiza estado, archivos, subtareas y flujo de mensajes | Para seguir tareas largas, revisar resultados o depurar |

### Iniciar una tarea

{% stepper %}
{% step %}
#### 1. Abra 【Trabajo】 y seleccione un Agent

Si ya existe un Agent adecuado, selecciónelo directamente; si no, haga clic en 【Agregar agente】, seleccione primero el modo de ejecución en 【Información básica】 y complete las cuatro etapas de creación: prompt del sistema, habilidades y base de conocimiento. El modo de ejecución no se puede cambiar después de la creación.
{% endstep %}

{% step %}
#### 2. Seleccione el directorio de trabajo

Si necesita procesar archivos locales, seleccione el directorio correspondiente a la tarea actual; si no involucra archivos, puede utilizar el espacio de trabajo predeterminado creado por la aplicación. Una tarea corresponde a un espacio de trabajo, evitando que Agent busque entre directorios no relacionados.
{% endstep %}

{% step %}
#### 3. Describa la tarea mediante el resultado esperado

Indique a Agent qué debe entregar, qué recursos puede utilizar, qué limitaciones existen y cómo se considera completada. Por ejemplo:

```
Lee las actas de reunión del directorio actual, organiza las decisiones, los responsables y los plazos, y genera action-items.md. No modifiques los archivos originales.
```
{% endstep %}

{% step %}
#### 4. Revise el proceso y los resultados en el panel derecho

【Estado】 muestra tareas activas, subagentes, flujos de trabajo y comandos en segundo plano; 【Archivos】 permite previsualizar y editar productos de texto; con el modo desarrollador activado, también puede ver la 【Cadena de llamadas】.
{% endstep %}
{% endstepper %}

### Aviso sobre la pasarela de API

La ejecución de Agent depende de la pasarela de API de Cherry Studio. Si la pasarela no está habilitada, la aplicación mostrará un aviso para 【Habilitar e iniciar】; también puede ir a 【Configuración】 → 【Pasarela de API】 para verificar el puerto, el estado de ejecución y las bloqueos por software de seguridad local.

{% hint style="warning" %}
La pasarela de API es una dependencia de ejecución de Agent, pero no significa que la interfaz deba exponerse a la red. Mantenga el uso local predeterminado; solo si necesita explícitamente que otros programas la llamen, copie la URL y la clave de API.
{% endhint %}

### ¿Un solo Agent o varios Agents?

* Mismo rol, mismo conjunto de capacidades pero tareas diferentes: reutilice un Agent y cree varias tareas.
* Diferentes roles, alcances de recursos o permisos: divida en varios Agents.
* Un objetivo que requiere investigación paralela o colaboración en múltiples pasos: primero permita que un Agent use subagentes o flujos de trabajo, sin necesidad de crear manualmente muchos Agents de inmediato.

### Caso de usuario: organizar recursos de proyecto

Un gerente de producto coloca las especificaciones de requisitos, registros de entrevistas y recursos de la competencia en el mismo directorio, crea un Agent de "Organización de requisitos", vincula la base de conocimiento de producto y utiliza el permiso de 【Confirmación por turno】. Agent primero lee los recursos y luego escribe la lista de requisitos y las preguntas pendientes de confirmación en un nuevo archivo. El gerente de producto revisa directamente el texto en 【Archivos】 del panel derecho, manteniendo los recursos originales sin cambios.

<details>

<summary>¿Por qué Agent no ve las capacidades recién vinculadas?</summary>

El contenido editado en Agent se guarda automáticamente. Las respuestas en generación no se interrumpen; los cambios en modelos, habilidades, MCP y bases de conocimiento surtirán efecto a partir del siguiente mensaje. Si aún no aparecen, confirme primero que la capacidad esté habilitada y luego envíe un nuevo mensaje.

</details>

<details>

<summary>¿Eliminar el directorio de trabajo también elimina los archivos del disco?</summary>

Al eliminar el directorio de trabajo en la lista de tareas, solo se elimina el registro del directorio en Cherry Studio y los registros de tareas bajo ese directorio, sin eliminar el directorio real en el disco. Las operaciones de archivos realizadas por Agent durante la ejecución de la tarea siguen estando sujetas al modo de permisos seleccionado.

</details>

<details>

<summary>¿Eliminar el directorio de trabajo también elimina los archivos del disco?</summary>

Al eliminar el directorio de trabajo en la lista de tareas, solo se elimina el registro del directorio en Cherry Studio y los registros de tareas bajo ese directorio, sin eliminar el directorio real en el disco. Las operaciones de archivos realizadas por Agent durante la ejecución de la tarea siguen estando sujetas al modo de permisos seleccionado.

</details>
