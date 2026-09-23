---
icon: comment-dots
---
# Canales

Un canal conecta un Agent con una plataforma de mensajería externa. Actualmente se pueden configurar Feishu, Telegram, QQ, WeChat, Discord y Slack; cada plataforma requiere credenciales de bot e identificadores de sesión distintos.

{% hint style="success" %}
Se recomienda indicar primero al Agent en [Trabajo]: "Configura un canal de Feishu para el Agent actual, para recibir mensajes de grupo y enviar resultados de tareas." El Agent preguntará la información necesaria según el uso, lo cual es más rápido que enfrentar todos los campos de todas las plataformas directamente. Para realizar modificaciones precisas, utiliza [Configuración] → [Canales].
{% endhint %}

<figure><img src="../../../../assets/ba51e18db6977f0202c709b4.webp" alt="Selecciona primero la plataforma que deseas conectar y luego haz clic en [Agregar]; las cuentas y credenciales que debes preparar varían según la plataforma."><figcaption><p>Selecciona primero la plataforma que deseas conectar y luego haz clic en [Agregar]; las cuentas y credenciales que debes preparar varían según la plataforma. </p></figcaption></figure>

## Ruta de configuración manual

[Configuración] → [Canales] → Selecciona la plataforma → [Agregar].

{% stepper %}
{% step %}
### 1. Preparar la cuenta de la plataforma

Crea el bot o la aplicación según las reglas de la plataforma. Si Feishu y WeChat admiten flujos relacionados con códigos QR, puedes completarlos siguiendo las indicaciones de la interfaz después de habilitar el canal; en otras plataformas, completa el Token correspondiente o las credenciales de la aplicación.
{% endstep %}

{% step %}
<figure><img src="../../../../assets/c074e4e1278ff6cd86f433ed.webp" alt="Vincula primero un Agent probado y limita el alcance de los chats permitidos; las credenciales y permisos deben abrirse solo en la medida necesaria para completar la tarea."><figcaption><p>Vincula primero un Agent probado y limita el alcance de los chats permitidos; las credenciales y permisos deben abrirse solo en la medida necesaria para completar la tarea. </p></figcaption></figure>

### 2. Vincular Agent y espacio de trabajo

Selecciona un Agent que ya haya sido verificado como funcional y asigna un espacio de trabajo para los mensajes del canal. Los mensajes externos se ejecutarán en este contexto; no selecciones directorios que contengan archivos sensibles no relacionados.
{% endstep %}

{% step %}
### 3. Limitar las fuentes de mensajes

Completa los Chat ID, IDs de canal o IDs de usuario permitidos. Dejarlo en blanco podría significar que se permite todo, según la descripción de los campos de la plataforma actual. Puedes enviar `/whoami` al bot para obtener el identificador en el formato correcto.
{% endstep %}

{% step %}
### 4. Seleccionar el modo de permisos y habilitar

Por defecto se utiliza [Heredar configuración del Agent]. Para grupos públicos, grupos con múltiples personas o fuentes no confiables, se debe utilizar un modo más estricto. Después de habilitarlo, envía primero un mensaje de prueba sin efectos secundarios.
{% endstep %}
{% endstepper %}

## Configuración recomendada

| Elemento de configuración | Valor predeterminado del producto | Punto de partida sugerido | Función | Escenarios aplicables | Precauciones |
| -------- | --------- | --------------- | ------------ | --------- | ---------------- |
| Agent vinculado | Se requiere selección | Prepara un Agent dedicado para el canal | Determina quién procesa los mensajes | Chats de grupo, chat privado con bot | No mezclar con Agent de desarrollo con altos permisos |
| Espacio de trabajo | Se requiere selección | Utiliza un directorio dedicado sin datos personales | Limita los archivos procesables | Recopilación en grupo, entrega de informes diarios | No seleccionar el directorio principal del usuario |
| Fuentes de mensajes permitidas | Depende de los campos de la plataforma | Inicialmente, permite solo cuentas de prueba o grupos de prueba | Limita quién puede activar el Agent | Pruebas internas, grupos de equipo | Lee la descripción de los campos antes de dejarlos en blanco |
| Modo de permisos | [Heredar configuración del Agent] | Usa una aprobación más estricta para entradas externas | Controla las operaciones de herramientas | Grupos públicos, grupos con múltiples personas | No se recomienda usar [Acceso completo] |

## Escenario de uso: Grupo de guardia de equipo

Crea un Agent que solo procese el manual de guardia, vincula una base de conocimiento probada con pruebas de recuperación y un espacio de trabajo dedicado, y permite que solo el grupo de guardia lo active. Primero prueba dos tipos de mensajes: "consultar una política" y "no encontrar respuesta", y luego prueba la generación de un resumen de traspaso que no contenga información sensible.

### Criterios de finalización

Las fuentes no permitidas no pueden activar tareas; las respuestas deben llegar al grupo designado; si la base de conocimiento no tiene contenido, se debe indicar claramente; la escritura de archivos aún solicitará aprobación.

## Puntos clave de configuración por plataforma

| Plataforma | Credenciales principales | Enfoque del alcance de la sesión |
| --------- | ----------------------- | ------------------ |
| Feishu / Lark | App ID, App Secret, o flujo de código QR | Chat ID y dominio nacional/internacional |
| Telegram | Bot Token | Chat ID |
| QQ | App ID, Client Secret | Formato de identificación para chat privado, grupo o canal |
| WeChat | Inicio de sesión con código QR o ruta de credenciales | IDs de usuario permitidos |
| Discord | Bot Token | ID de canal o chat privado |
| Slack | Bot Token, App Token | Socket Mode e ID de canal |

{% hint style="danger" %}
Los Tokens de bot, App Secret y tokens de verificación son equivalentes a contraseñas de cuenta. No los escribas en la memoria a largo plazo del Agent, en las indicaciones de tareas, capturas de pantalla o Issues públicos; si se filtran, revócalos y regénralos inmediatamente en la plataforma.
{% endhint %}

<details>

<summary>¿Qué hacer si no puedo seleccionar el canal como destino de recepción en una tarea programada? </summary>

Primero envía un mensaje al bot en la plataforma correspondiente para que Cherry Studio registre el Chat ID disponible, y luego vuelve a la tarea programada para seleccionar el destino de notificación.

</details>

<details>

<summary>¿Qué hacer si el canal está conectado pero no responde? </summary>

Revisa los IDs de sesión permitidos, el Agent vinculado, el espacio de trabajo y el modo de permisos, y luego consulta los registros del canal. Si la plataforma recibió el mensaje pero el Agent no lo ejecutó, continúa revisando la pasarela de API y el estado de la tarea del Agent.

</details>
