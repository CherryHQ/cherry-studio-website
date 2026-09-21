---
icon: wand-magic-sparkles
---
# Creación de Agent y división de modelos

Punto de entrada: en la navegación izquierda, selecciona [Trabajo] → [Agregar agente].

El asistente de creación nueva se divide en cuatro pasos: [Información básica], [Prompt del sistema], [Habilidades] y [Base de conocimientos]. En el primer paso también debes seleccionar el modo de ejecución; este modo determina la división de modelos disponibles para el Agent, el modo de permisos y algunas herramientas, y no se puede cambiar después de la creación.

<figure><img src="../../../../assets/0797ee2c9878cf471b44fe2e.webp" alt="Creación de Agent y división de modelos — Ilustración"><figcaption></figcaption></figure>

### Cómo elegir el modo de ejecución

| Modo de ejecución | Características principales | Configuración de modelos | Permisos y restricciones |
| ------------------ | ------------------- | -------------------- | ------------------------------------ |
| [Mejorado: Claude Agent] | Funcionalidad completa, adecuado para tareas complejas y de múltiples pasos | Modelo principal, Modelo Plan, Modelo Small | Soporta todos los modos de permisos y la detección de latido |
| [Rápido: Pi] | Respuesta rápida y bajo consumo, adecuado para tareas diarias de archivos y codificación | Solo se configura el modelo principal | No ofrece [Solo planificación]; al crear, el valor predeterminado es [Aprobación inteligente] |
| [DeepSeek Harness] | Compatible con varios servicios de modelos, soporta ejecución orientada a objetivos | Solo se configura el modelo principal | No ofrece [Aprobación inteligente] ni detección de latido; soporta `/compact`, `/goal` |

{% hint style="warning" %}
El modo de ejecución no se puede modificar después de la creación. Si los objetivos, la compatibilidad de modelos o las necesidades de permisos cambian fundamentalmente, crea un nuevo Agent en lugar de seguir modificando el Agent anterior.
{% endhint %}

### Cómo completar los cuatro pasos

{% stepper %}
{% step %}
#### 1. Información básica

Escribe el nombre como el puesto o tipo de tarea, por ejemplo, "Revisión de contratos" o "Planificación de contenido". Primero selecciona el modo de ejecución y luego elige los modelos compatibles listados en la página. La descripción solo sirve para ayudar a identificar el uso; el modelo principal se encarga del razonamiento y la ejecución principales.
{% endstep %}

{% step %}
#### 2. Redactar el prompt del sistema

Especifica claramente el rol, los objetivos, los límites y el formato de salida. En lugar de acumular adjetivos, es mejor proporcionar reglas ejecutables: primero lista los riesgos, luego cita el texto original y finalmente ofrece sugerencias de modificación; cuando la información sea insuficiente, márcalo explícitamente, no supongas.
{% endstep %}

{% step %}
#### 3. Seleccionar habilidades

Solo selecciona las habilidades relacionadas con la forma de trabajo a largo plazo de este Agent. Las habilidades se pueden instalar en [Configuración] → [Habilidades], o bien puedes pedirle al Agent que las busque e instale más tarde.
{% endstep %}

{% step %}
#### 4. Vincular base de conocimientos

Solo vincula las bases de conocimientos que el Agent necesite realmente para la búsqueda. Si no se vincula ninguna base de conocimientos, las herramientas de búsqueda y gestión de bases de conocimientos no aparecerán en la lista de herramientas de ese Agent.
{% endstep %}
{% endstepper %}

<figure><img src="../../../../assets/0d33fc961386a770a40db97d.webp" alt="Primero selecciona el modelo principal; solo configura el Modelo Plan y el Modelo Small si la tarea realmente requiere división de planificación o procesamiento ligero."><figcaption><p>Primero selecciona el modelo principal; solo configura el Modelo Plan y el Modelo Small si la tarea realmente requiere división de planificación o procesamiento ligero.</p></figcaption></figure>

### Configuración continua después de la creación

En la lista de Agents, abre el menú y selecciona Editar para ajustar lo siguiente:

* [Básico]: Ver el modo de ejecución y ajustar los modelos, permisos y configuración de latido soportados por ese modo;
* [Prompt]: Descripción del rol, reglas de procesamiento y límites de comportamiento;
* [Herramientas integradas]: Archivos, búsqueda, imágenes, notificaciones, tareas programadas, memoria, subagentes y flujos de trabajo, entre otros;
* [Base de conocimientos]: Limitar las bases de conocimientos a las que el Agent puede acceder;
* [MCP]: Vincular servidores MCP ya conectados;
* [Habilidades]: Seleccionar habilidades instaladas;
* [Avanzado]: Configurar variables de entorno para las herramientas que realmente se necesiten.

{% hint style="info" %}
La ventana de edición actual guarda los cambios automáticamente. Si aún hay contenido pendiente de guardar antes de cerrar la ventana, la aplicación completará el guardado primero; si el guardado falla, la ventana permanecerá abierta y mostrará un error.
{% endhint %}

### Punto de partida recomendado

| Elemento de configuración | Valor predeterminado del producto | Punto de partida sugerido | Función | Escenarios aplicables | Notas |
| --------------- | ----------------------------- | ----------------------- | -------------- | ------------------ | ---------------------------------- |
| Modo de ejecución | [Mejorado: Claude Agent] | Si no estás seguro, usa primero [Mejorado: Claude Agent] | Determina la división de modelos, permisos y alcance de herramientas | Todos los Agents | No se puede cambiar después de la creación |
| Modelo principal | Usa el modelo seleccionado al crear | Elige un modelo verificado que pueda llamar a herramientas de forma estable | Razonamiento y ejecución principales | Todos los Agents | El selector filtra los modelos incompatibles según el modo de ejecución |
| Modelo Plan / Small | Mismo que el modelo principal | Mantén primero la consistencia con el modelo principal | Descomposición de tareas, juicios simples y formateo | Solo [Mejorado: Claude Agent] | Pi y DeepSeek Harness no muestran estos dos campos |
| Modo de permisos | Claude/DSH es [Confirmación por acción]; Pi es [Aprobación inteligente] | Para directorios de proyectos reales, usa preferentemente [Confirmación por acción] | Determina si las herramientas requieren aprobación | Tareas de archivos, terminal y red | [Acceso completo] puede eliminar archivos o acceder a la red |
| Detección de latido | Activada inicialmente en los modos de ejecución soportados, intervalo de 30 minutos | Se puede desactivar si no hay tareas continuas | Permite al Agent revisar periódicamente el trabajo | Claude Agent, Pi | DeepSeek Harness no ofrece detección de latido; usa tareas programadas para horarios fijos |

### Caso de usuario: Agent de revisión de contratos

Crea un Agent de "Revisión de contratos", selecciona como modelo principal uno ya verificado, exige en el prompt que la salida siga el formato "cláusulas de riesgo, ubicación en el texto original, impacto, sugerencia", vincula la base de conocimientos de políticas de la empresa y mantén los permisos en [Confirmación por acción]. Crea una nueva tarea para cada contrato y selecciona el directorio de archivos correspondiente, evitando que los materiales de diferentes clientes se mezclen en el mismo contexto.

<details>

<summary>¿Por qué no vi la configuración completa de MCP y permisos al crear?</summary>

El asistente de creación solo conserva los pasos más comunes. Después de completar la creación, abre la ventana de edición del Agent para continuar configurando en [Básico], [Herramientas integradas], [Base de conocimientos], [MCP], [Habilidades] y [Avanzado]; las pestañas específicas varían según las capacidades del modo de ejecución.

</details>
