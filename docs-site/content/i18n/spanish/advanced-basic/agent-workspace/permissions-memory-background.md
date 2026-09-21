---
icon: shield-halved
---
# Permisos, memoria y tareas en segundo plano

El Agent puede ejecutar operaciones de archivos, terminal y red, además de invocar subagentes y tareas en segundo plano. Los permisos determinan "si debe preguntar primero", la memoria determina "si lo recordará la próxima vez" y el panel de estado en el lado derecho le indica "qué se está haciendo ahora".

<figure><img src="../../../../assets/ccb5ce9eb543d9f9d2ccccbd.webp" alt="Para el uso diario, comience con los permisos predeterminados; el modo solo planificación es adecuado para revisar el plan primero, y el acceso total solo debe usarse para tareas con límites claros y recuperables."><figcaption><p>Para el uso diario, comience con los permisos predeterminados; el modo solo planificación es adecuado para revisar el plan primero, y el acceso total solo debe usarse para tareas con límites claros y recuperables. </p></figcaption></figure>

### Modos de permisos

| Modo | Comportamiento | Escenarios de uso | Consideraciones |
| -------- | ------------- | ------------- | ---------------- |
| 【Confirmación por operación】 | Pregunta antes de editar archivos o ejecutar comandos | Punto de partida predeterminado, directorios de proyectos reales | Las confirmaciones frecuentes pueden ser molestivas si hay muchas operaciones, pero es el más fácil de controlar |
| 【Aceptación automática de ediciones】 | Puede editar archivos, pero pregunta antes de ejecutar comandos | Organización de documentos, modificaciones de código recuperables | Verifique primero el directorio de trabajo y el estado del control de versiones |
| 【Aprobación inteligente】 | Decide si permite la operación según la seguridad | El modelo lo soporta y los límites de la tarea son claros | Algunos modelos aún pueden preguntar por cada operación |
| 【Solo planificación】 | Solo planifica, no edita archivos | Revisión de propuestas, auditoría antes del lanzamiento | Adecuado para ver el plan antes de ejecutarlo |
| 【Acceso total】 | Omite las comprobaciones de permisos | Entornos aislados, de confianza y recuperables | Puede eliminar archivos o acceder a la red, con el mayor riesgo |

El alcance de permisos proporcionado por los diferentes modos de ejecución no es exactamente el mismo: Pi no ofrece 【Solo planificación】, al crear un nuevo Agent de Pi se usa 【Aprobación inteligente】 por defecto; DeepSeek Harness no ofrece 【Aprobación inteligente】; 【Mejorado: Claude Agent】 ofrece los cinco modos completos.

Ruta de configuración: Navegación izquierda 【Trabajo】→ Menú Agent →【Editar】→【Básico】→【Modo de permisos】.

{% hint style="danger" %}
Los canales pueden sobrescribir individualmente el modo de permisos del Agent. Las entradas de chat externas son más propensas a recibir instrucciones inesperadas; generalmente se debe elegir 【Heredar configuración del agente】 o un modo más estricto que el del Agent. No abra el acceso total solo para evitar algunas confirmaciones.
{% endhint %}

### Memoria del Agent

La memoria del Agent sigue al Agent, no a una tarea o directorio de trabajo específico. Es adecuada para guardar preferencias de larga duración, hechos del proyecto, decisiones técnicas y experiencia; el progreso de una sola vez se registra como un registro con marca de tiempo para su recuperación en tareas posteriores.

Indíquele directamente al Agent en 【Trabajo】:

```
Recuerda esta regla: todo texto en chino destinado a publicación debe usar puntuación de ancho completo y evitar títulos exagerados. Aplícala en las tareas relacionadas.
```

Si necesita corregir algo, indique claramente que la información anterior ya no es válida y solicite actualizar la memoria. No escriba contraseñas, claves API, información de identidad privada o contenido irrelevante a corto plazo en la memoria de larga duración.

### Subagentes, flujos de trabajo y comandos en segundo plano

En tareas complejas, el Agent puede asignar investigación, organización y verificación a subagentes, o orquestar múltiples pasos a través de flujos de trabajo. Los comandos que consumen mucho tiempo pueden ejecutarse en segundo plano sin bloquear toda la conversación. El Agent también puede crear una nueva sesión tras su confirmación o enviar tareas a una sesión existente; la solicitud se devuelve inmediatamente, y el resultado de la finalización vuelve a la sesión de origen, conservando la procedencia y el estado de entrega.

En el panel 【Estado】 del lado derecho puede ver:

* Tareas en curso y completadas;
* Subagentes y flujos de trabajo;
* Comandos en segundo plano y la opción para detenerlos;
* Éxito, fallo y cantidad de llamadas a herramientas;
* Uso del contexto y artefactos declarados.

Al activar 【Configuración】→【Notificaciones】→【Notificación de finalización de conversación】, al trabajar en otras pestañas o ventanas, recibirá notificaciones del sistema cuando la respuesta del asistente se complete, la tarea del Agent finalice o se espere aprobación; al hacer clic en la notificación, volverá a la conversación correspondiente.

<figure><img src="../../../../assets/401d6b23759ab97ded47c2b5.webp" alt="En tareas largas, puede ver los artefactos, subtareas, comandos en segundo plano y el uso del contexto en 【Estado】."><figcaption><p>En tareas largas, puede ver los artefactos, subtareas, comandos en segundo plano y el uso del contexto en 【Estado】. </p></figcaption></figure>

### Caso de usuario: Mantenimiento continuo de normas del proyecto

El equipo escribe las convenciones de código estables en la memoria del Agent y crea habilidades con los pasos detallados de revisión. Cada vez que se revisa una nueva rama, se inicia una tarea para que el Agent use subagentes para verificar la interfaz, la migración de datos y las pruebas por separado, y luego el Agent principal consolida las conclusiones. Cuando cambian las reglas, se actualiza la memoria, sin necesidad de modificar el historial de cada tarea.

<details>

<summary>¿Puede la memoria reemplazar a la base de conocimientos? </summary>

No. La memoria es adecuada para un número pequeño de hechos y experiencias estables que se usan entre tareas; la base de conocimientos es adecuada para documentación sistemática y permite controlar el alcance de búsqueda del Agent.

</details>

<details>

<summary>La tarea parece atascada, ¿dónde mirar primero? </summary>

Abra primero el panel 【Estado】 del lado derecho y verifique si está esperando permisos, si un comando en segundo plano sigue ejecutándose, si una subtarea falló o si el proveedor está reintentando. Si necesita más detalles de la solicitud, abra el modo desarrollador para ver la cadena de llamadas.

</details>

<details>

<summary>La tarea parece atascada, ¿dónde mirar primero? </summary>

Abra primero el panel 【Estado】 del lado derecho y verifique si está esperando permisos, si un comando en segundo plano sigue ejecutándose, si una subtarea falló o si el proveedor está reintentando. Si necesita más detalles de la solicitud, abra el modo desarrollador para ver la cadena de llamadas.

</details>
