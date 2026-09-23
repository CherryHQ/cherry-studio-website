---
icon: layer-group
---
# Conversaciones largas, contexto y mensajes en cola

A medida que la conversación se alarga, el modelo debe leer más historial. Cuando el uso del contexto se acerca al límite, es posible que el contenido anterior no pueda seguir participando en la respuesta. En lugar de seguir añadiendo "continúa" una y otra vez, es mejor organizar periódicamente las conclusiones y las preguntas pendientes.

<figure><img src="../../../../assets/e9e4f4f66770c61bcaf40ea6.webp" alt="Solo ajusta la configuración avanzada cuando necesites cambiar el estilo de respuesta o la forma de manejar conversaciones largas; si no estás seguro, mantén los valores actuales."><figcaption><p>Solo ajusta la configuración avanzada cuando necesites cambiar el estilo de respuesta o la forma de manejar conversaciones largas; si no estás seguro, mantén los valores actuales. </p></figcaption></figure>

### Gestión de conversaciones largas

{% stepper %}
{% step %}
#### 1. Observar las indicaciones de contexto

Cuando la interfaz indique que la presión de contexto está aumentando, deja de añadir adjuntos grandes y revisa qué parte del historial sigue siendo relevante para el objetivo actual.
{% endstep %}

{% step %}
#### 2. Pedir al modelo que genere un resumen de transición

Solicita que liste por separado "hechos confirmados, conclusiones actuales, problemas pendientes y restricciones que no se pueden perder". Esto es más adecuado para continuar el trabajo que un simple "resúmelo".
{% endstep %}

{% step %}
#### 3. Continuar en un nuevo tema

Coloca el resumen de transición y los archivos necesarios en un nuevo tema. En el primer mensaje, indica qué objetivo se va a tratar a continuación. Mantén el tema original como referencia.
{% endstep %}
{% endstepper %}

### Ajustar la gestión global del contexto

Ruta: [Configuración] → [General] → [Gestión de contexto]. Estos ajustes se aplican a las conversaciones con asistentes estándar; un asistente individual también puede sobrescribirlos en su propia configuración.

| Elemento de configuración | Valor predeterminado del producto | Punto de partida sugerido | Función | Escenarios aplicables | Consideraciones |
| -------- | -------- | ------- | ------------- | ------------- | --------------- |
| Número de mensajes recientes a conservar | Sin límite | Sin límite inicialmente | Envía solo los últimos mensajes al modelo | Tareas cortas con ventana fija | Un valor demasiado bajo hará que el modelo olvide requisitos aún vigentes |
| Habilitar gestión de contexto | Activado | Mantener activado | Gestiona resultados de herramientas muy largos y la compresión del historial | Conversaciones largas, tareas con muchas llamadas a herramientas | Si se desactiva, los resultados grandes ocuparán más fácilmente el contexto |
| Umbral de truncamiento de salida de herramientas | 50000 caracteres | Mantener predeterminado | Guarda los resultados grandes para que el modelo los lea por segmentos | Resultados de herramientas de páginas web, registros y documentos largos | No equivale a eliminar el resultado original |
| Compresión automática | Activado | Mantener activado | Resume el historial anterior al acercarse al límite de la ventana | Trabajo continuo en varias rondas | La compresión es un resumen y no garantiza conservar cada detalle |
| Modelo de compresión | Sigue al modelo actual | Seguir al modelo actual inicialmente | Selecciona el modelo que genera el resumen del historial | Cuando se necesita controlar la velocidad o el costo por separado | Cambiar el modelo añade variables a la depuración |

[Configuración] → [Modelo predeterminado] también ofrece [Reintentos de llamada al modelo]. Desactivado por defecto; si se activa, se intentará un máximo de 3 veces con retroceso exponencial y se pueden seleccionar modelos de respaldo en orden. Los reintentos y los respaldos solo son efectivos antes de que el modelo comience a generar salida; no cambian a otro modelo para continuar una respuesta que ya se ha generado a medias.

### Uso de la cola de mensajes

Mientras el modelo sigue respondiendo, puedes añadir el siguiente requisito a la cola. Es adecuado para añadir una acción posterior clara, por ejemplo "después de terminar, organízalo en tres conclusiones". Si necesitas corregir la dirección actual mientras Agent está en ejecución, usa [Atajos de guía]; si necesitas empezar de cero, detén la generación actual y vuelve a especificar el objetivo.

<figure><img src="../../../../assets/a62a413bccd43d18b59ee293.webp" alt="Al pausar, puedes verificar los resultados primero; al reanudar, los mensajes en cola se enviarán en orden de arriba hacia abajo."><figcaption><p>Al pausar, puedes verificar los resultados primero; al reanudar, los mensajes en cola se enviarán en orden de arriba hacia abajo. </p></figcaption></figure>

En la imagen: ① Dos mensajes en cola en el tema actual; ② Reanudar el envío automático. Al reanudar, los mensajes se enviarán en orden de arriba hacia abajo.

{% hint style="info" %}
La cola no es un plan de automatización. Solo gestiona los mensajes posteriores dentro del tema actual; si necesitas ejecutar algo en una hora fija, usa [Tareas programadas].
{% endhint %}

#### Caso de uso: Revisar un informe largo

Sube el informe y pide que liste los problemas por capítulo. Mientras el modelo procesa, añade a la cola "después de terminar, organiza una lista de riesgos" y "al final, genera una lista de verificación". Si necesitas verificar los resultados de la primera ronda, puedes pausar el envío automático; reanúdalo después de confirmar que todo está correcto. Así no tienes que estar frente a la conversación enviando mensajes uno por uno, y evitas que el siguiente requisito se ejecute antes de la verificación.

<details>

<summary>¿Por qué el modelo olvidó de repente los requisitos mencionados anteriormente? </summary>

Primero verifica si la conversación es demasiado larga, si se cambió el modelo y si los requisitos clave solo se mencionaron una vez. Escribe las reglas estables en la descripción clara de la tarea actual; si necesitas reutilizarlas a largo plazo, entrégalas al prompt de Agent o a una habilidad.

</details>

<details>

<summary>¿Por qué el modelo olvidó de repente los requisitos mencionados anteriormente? </summary>

Primero verifica si la conversación es demasiado larga, si se cambió el modelo y si los requisitos clave solo se mencionaron una vez. Escribe las reglas estables en la descripción clara de la tarea actual; si necesitas reutilizarlas a largo plazo, entrégalas al prompt de Agent o a una habilidad.

</details>
