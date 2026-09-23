---
icon: gears
---
# Automatización y alcance externo

La automatización de Cherry Studio no es un conjunto aislado de "configuraciones de robots". El Agent se encarga de completar el trabajo, los canales se encargan de recibir y enviar mensajes desde plataformas externas, las tareas programadas inician el Agent en horas específicas y los latidos permiten que el Agent revise periódicamente su trabajo continuo.

<figure><img src="../../../../assets/c348e2cb27a028b3789ac09b.webp" alt="La activación, la ejecución, la notificación y el historial de ejecución son etapas distintas; primero ejecute el Agent manualmente para verificar su funcionamiento y luego integre los componentes de forma gradual."><figcaption><p>La activación, la ejecución, la notificación y el historial de ejecución son etapas distintas; primero ejecute el Agent manualmente para verificar su funcionamiento y luego integre los componentes de forma gradual. </p></figcaption></figure>

## Cómo colaboran los cuatro componentes

| Capacidad | Responsabilidad | Uso típico |
| ----- | --------------- | ------------------ |
| Agent | Ejecuta tareas y genera resultados | Resumen, verificación, redacción, procesamiento de archivos |
| Canal | Recibe mensajes externos y envía notificaciones | Bot de grupo en Feishu, chat privado de Telegram |
| Tarea programada | Ejecuta el Agent en horas específicas | Informes diarios, informes semanales, recordatorios únicos |
| Latido | El Agent revisa el trabajo continuo a intervalos | Monitoreo de flujos largos, verificación de pendientes |

<figure><img src="../../../../assets/e2328ba60a3ff5012831c39e.webp" alt="Los canales conectan el Agent con Feishu, Telegram, QQ, WeChat, Discord o Slack."><figcaption><p>Los canales conectan el Agent con Feishu, Telegram, QQ, WeChat, Discord o Slack. </p></figcaption></figure>

## Orden de configuración correcto

{% stepper %}
{% step %}
### 1. Primero, ejecute la tarea en [Trabajo]

Asegúrese de que el modelo, el prompt, el directorio de trabajo y las herramientas del Agent generen de forma estable los resultados esperados.
{% endstep %}

{% step %}
### 2. Luego, permita que el Agent guíe la configuración del canal

Indique la plataforma y el propósito en la conversación con el Agent, por ejemplo: "Conecta este Agent a un grupo de Feishu para recibir solicitudes de informes diarios". Prepare los permisos del bot y las credenciales según las indicaciones.
{% endstep %}

{% step %}
### 3. Verifique el estado mediante la configuración manual

Abra [Configuración] → [Canales], revise las credenciales, el Agent vinculado, el espacio de trabajo, el alcance de las sesiones permitidas y el modo de permisos del canal, y envíe un mensaje de prueba.
{% endstep %}

{% step %}
### 4. Finalmente, cree la tarea programada

Puede solicitar al Agent que la cree o abrir [Configuración] → [Tareas programadas] → [Nueva]. Seleccione el Agent verificado, el espacio de trabajo, la hora y el canal de notificación.
{% endstep %}
{% endstepper %}

## Verificación antes de la puesta en producción

* El canal solo permite los IDs de sesión o canal necesarios;
* La entrada externa utiliza [Heredar configuración del agente] o permisos más estrictos;
* El prompt de la tarea programada no contiene claves ni rutas que cambien;
* Ejecute manualmente [Ejecutar] una vez y revise el registro de ejecución;
* En caso de fallo, pueda localizar la tarea correspondiente en Cherry Studio, evitando confundir "no enviado" con "no ejecutado".

## Caso de usuario: Informe operativo diario

El Agent "Informe operativo" lee los datos del directorio de trabajo y genera el informe diario según las habilidades del equipo. El canal de Feishu se encarga de enviar el resultado al grupo designado, y la tarea programada se ejecuta cada mañana de día hábil. Antes de la puesta en producción, ejecute manualmente, luego envíe un mensaje al bot en Feishu para establecer el destino de recepción y finalmente active la programación.

<details>

<summary>¿Cuál es la diferencia entre latidos y tareas programadas? </summary>

Los latidos permiten que el Agent revise el trabajo continuo a intervalos, ideal para "¿hay novedades?"; las tareas programadas tienen un plan de ejecución y un historial de ejecución definidos, ideales para "qué hacer a qué hora cada día". Para informes diarios fijos, se recomienda priorizar las tareas programadas.

</details>
