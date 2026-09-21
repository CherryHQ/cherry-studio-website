---
icon: timeline
---
# Cadena de llamadas y modo de desarrollador

La cadena de llamadas se utiliza para ver las solicitudes de modelo, las llamadas a herramientas y las interacciones con MCP que ocurren dentro de una conversación o tarea de Agent. Es adecuada para la depuración y el análisis de rendimiento, pero no es una función que deba estar activada para el chat diario.

<figure><img src="../../../../assets/7cb797e89c5a180b57971c67.webp" alt="Al depurar llamadas a MCP, primero confirme el servidor y la autenticación, y luego use la cadena de llamadas para determinar si la solicitud entró en la fase de Agent y ejecución de herramientas."><figcaption><p>Al depurar llamadas a MCP, primero confirme el servidor y la autenticación, y luego use la cadena de llamadas para determinar si la solicitud entró en la fase de Agent y ejecución de herramientas. </p></figcaption></figure>

### Cómo activarlo

{% stepper %}
{% step %}
#### 1. Abra [Configuración] → [General]

En el área [Modo de desarrollador], active [Habilitar modo de desarrollador].
{% endstep %}

{% step %}
#### 2. Reinicie Cherry Studio

El modo de desarrollador entra en vigor tras el reinicio. Antes de reiniciar, debe confirmar el estado de las tareas de Agent que estén en ejecución.
{% endstep %}

{% step %}
#### 3. Reproduzca el problema

Envíe nuevamente un mensaje de prueba mínimo, manteniendo solo los modelos y herramientas necesarios para reducir las llamadas irrelevantes.
{% endstep %}

{% step %}
#### 4. Abra la cadena de llamadas

En el panel derecho de la conversación o Agent, acceda a [Cadena de llamadas], seleccione un nodo para ver la entrada, la salida, el tiempo transcurrido y el estado. En las tareas de Agent también puede ver el nombre del Agent, la operación y la cantidad de llamadas a herramientas.
{% endstep %}
{% endstepper %}

### Cómo leer los nodos comunes

| Nodo | Puntos clave a revisar | Problemas comunes |
| -------- | ------------------ | ---------------- |
| Solicitud de modelo | Modelo, entrada, salida, Token y estado | Errores del proveedor, contexto demasiado largo, salida vacía |
| Llamada a herramienta | Nombre de la herramienta, parámetros, resultado | Errores de parámetros, espera de permisos, resultado anómalo de la herramienta |
| Llamada a MCP | Nombre del servicio, tipo de conexión, entrada y salida | Desconexión del servidor, fallo de autenticación, error remoto |
| Ejecución de Agent | Agent, operación, cantidad de herramientas y estado | Fallo de subtareas, flujo no finalizado |
| Solicitud HTTP | Método, URL, estado y respuesta | Dirección incorrecta, problemas de red o autenticación |

{% hint style="danger" %}
La cadena de llamadas puede contener prompts, contenido de archivos, encabezados de solicitud y parámetros de herramientas. Antes de compartir capturas de pantalla o exportar información, debe eliminar la API Key, Authorization, Cookie, correo electrónico, rutas locales y datos de negocio.
{% endhint %}

### Caso de usuario: herramienta MCP devuelve resultado vacío

Primero confirme en la página de configuración de MCP que el servidor funciona correctamente, y luego haga que el Agent llame solo a una herramienta. Si la cadena de llamadas muestra que la solicitud llegó al servidor pero la salida está vacía, el problema es más probable que esté en los datos del servidor o en los parámetros, y no en que el Agent no esté vinculado; si no hay ningún nodo de MCP, vuelva a [MCP] del Agent para revisar la vinculación.

<details>

<summary>¿Por qué no veo la cadena de llamadas después de activarla? </summary>

Confirme que ha reiniciado la aplicación y que ha iniciado una nueva solicitud después del reinicio. Los mensajes históricos generados antes de la activación no se completarán automáticamente con datos de llamadas.

</details>

<details>

<summary>¿Por qué no veo la cadena de llamadas después de activarla? </summary>

Confirme que ha reiniciado la aplicación y que ha iniciado una nueva solicitud después del reinicio. Los mensajes históricos generados antes de la activación no se completarán automáticamente con datos de llamadas.

</details>
