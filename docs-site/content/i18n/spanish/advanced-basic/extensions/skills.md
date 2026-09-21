---
icon: graduation-cap
---
# Habilidades y biblioteca de capacidades

Una habilidad es un conjunto de instrucciones de trabajo reutilizables y recursos asociados. No se encarga de conectar con sistemas externos, sino de indicar al Agent qué flujo, estándares y formato debe seguir para completar una tarea.

{% hint style="success" %}
Cuando necesites un método de trabajo específico, primero indica tu objetivo al Agent en [Trabajo] y pídele que busque o instale la habilidad adecuada. Solo abre [Configuración] → [Habilidades] si necesitas verificar el origen, gestionarlas en lote o importarlas desde local.
{% endhint %}

<figure><img src="../../../../assets/cc38d8a6378ca8270ceda746.webp" alt="Los métodos que se usan repetidamente son adecuados para consolidarlos como habilidades; los recursos, las operaciones integradas y los sistemas externos deben utilizarse a través de sus respectivas entradas."><figcaption><p>Los métodos que se usan repetidamente son adecuados para consolidarlos como habilidades; los recursos, las operaciones integradas y los sistemas externos deben utilizarse a través de sus respectivas entradas. </p></figcaption></figure>

### Instalar habilidades

Ruta manual: [Configuración] → [Habilidades].

La página admite cuatro orígenes:

* Búsqueda en el registro de habilidades en línea;
* En la búsqueda en línea, selecciona [GitHub] y pega el enlace del archivo `SKILL.md` de una habilidad;
* Instalación desde un archivo ZIP local;
* Instalación desde una carpeta que contenga `SKILL.md`.

<figure><img src="../../../../assets/f0dcb151fa939ce15cda1e00.webp" alt="① Después de seleccionar [GitHub], pega el enlace del archivo SKILL.md de la habilidad objetivo; la página analizará primero la habilidad específica y luego ofrecerá la instalación."><figcaption><p>① Después de seleccionar [GitHub], pega el enlace del archivo `SKILL.md` de la habilidad objetivo; la página analizará primero la habilidad específica y luego ofrecerá la instalación. </p></figcaption></figure>

{% stepper %}
{% step %}
#### 1. Confirmar primero el propósito

Describe en una frase el problema que deseas que la habilidad resuelva, por ejemplo: "Organizar las actas de reunión en decisiones, responsables y fechas límite". Que los nombres sean similares no significa que los flujos sean iguales; lee la descripción antes de instalar.
{% endstep %}

{% step %}
#### 2. Verificar el origen y el contenido

Abre los detalles de la habilidad y confirma qué acciones requiere del Agent, si incluye scripts, si necesita herramientas adicionales o cuentas externas. No utilices directamente habilidades de origen desconocido en directorios sensibles.
{% endstep %}

{% step %}
#### 3. Vincular al Agent

Primero, en [Configuración] → [Habilidades], asegúrate de que el interruptor global de la habilidad esté activado. Luego, abre [Trabajo] → Menú del Agent → [Editar] → [Habilidades] y actívala para este Agent. El cambio de habilidades se guarda automáticamente con la configuración del Agent y entra en vigor desde el siguiente mensaje.
{% endstep %}

{% step %}
#### 4. Validar con tareas reales

Proporciona al Agent una muestra pequeña y verifica que los pasos, el formato de salida y los límites cumplan las expectativas antes de usarla en tareas por lotes o programadas.
{% endstep %}
{% endstepper %}

### Activación global y activación por Agent

<figure><img src="../../../../assets/a05d3125f16b5cb41dd2e05b.webp" alt="① El interruptor a la derecha de la tarjeta controla si la habilidad está disponible para todos los Agents; si se desactiva, la ventana de edición del Agent ya no mostrará esa habilidad."><figcaption><p>① El interruptor a la derecha de la tarjeta controla si la habilidad está disponible para todos los Agents; si se desactiva, la ventana de edición del Agent ya no mostrará esa habilidad. </p></figcaption></figure>

| Estado | Función | Cuándo usarlo |
| -------- | ------------------------ | ------------------------- |
| Activación global | Hace que la habilidad aparezca en el directorio de habilidades disponibles del Agent | El origen de la habilidad es confiable y puede ser utilizada por uno o más Agents |
| Desactivación global | Pausa el uso de la habilidad por todos los Agents, pero conserva el contenido instalado | Desactivación temporal, depuración de errores o espera de verificación de seguridad |
| Activación por Agent | Solo permite que el Agent actual cargue la habilidad | El flujo coincide con las responsabilidades a largo plazo del Agent actual |

<figure><img src="../../../../assets/f0dcb151fa939ce15cda1e00.webp" alt="Habilidades y biblioteca de capacidades — Ilustración"><figcaption></figcaption></figure>

Desactivar el interruptor global no desinstala la habilidad; al reactivarlo, aún debes verificar el estado de activación de cada Agent. Desinstalar eliminará el contenido de la habilidad y limpiará las asociaciones.

### ¿Cómo elegir entre habilidades, prompts y MCP?

| Necesidad | Opción recomendada | Razón |
| -------------- | ----------- | ------------- |
| Un requisito temporal | Prompt de la tarea actual | No es necesario añadir configuración a largo plazo |
| Reutilizar el mismo flujo varias veces | Habilidad | Permite guardar instrucciones, plantillas y recursos simultáneamente |
| Definir el rol a largo plazo del Agent | Prompt de sistema del Agent | Debe seguirse en cada tarea |
| Acceder a bases de datos o servicios externos | MCP | La habilidad en sí no proporciona capacidad de conexión |

### Caso de usuario: Habilidad de informe semanal de equipo

El equipo convierte las secciones del informe semanal, el tono, la verificación de datos y las expresiones prohibidas en una habilidad, vinculándola al Agent "Organización de informes semanales". Cada semana solo es necesario proporcionar los materiales de la semana; el Agent genera una estructura fija según la habilidad. Si los datos provienen de sistemas externos, se combina con MCP, en lugar de escribir los detalles de cuentas e interfaces en el cuerpo de la habilidad.

{% hint style="danger" %}
Desinstalar una habilidad la elimina de la biblioteca de capacidades global y limpia las asociaciones en el espacio de trabajo del Agent. Antes de ejecutar, asegúrate de que no haya tareas en curso que utilicen esa habilidad; las habilidades personalizadas por el equipo deben conservar archivos de origen recuperables.
{% endhint %}

<details>

<summary>¿Por qué el Agent no usa la habilidad después de instalarla? </summary>

Primero, confirma que la habilidad no esté desactivada globalmente. Luego, actívala en [Habilidades] dentro de la ventana de edición del Agent, o pide al Agent que complete la vinculación. Después, envía un nuevo mensaje para probar.

</details>

<details>

<summary>¿Puede una habilidad incluir programas? </summary>

El paquete de habilidades puede incluir instrucciones, recursos y scripts. Si se pueden ejecutar scripts depende de las herramientas del Agent, el directorio de trabajo, las dependencias del entorno y el modo de permisos.

</details>

<details>

<summary>¿Puede una habilidad incluir programas? </summary>

El paquete de habilidades puede incluir instrucciones, recursos y scripts. Si se pueden ejecutar scripts depende de las herramientas del Agent, el directorio de trabajo, las dependencias del entorno y el modo de permisos.

</details>
