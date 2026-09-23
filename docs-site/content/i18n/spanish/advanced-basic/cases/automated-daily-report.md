---
icon: newspaper
---
# Canales y reporte diario programado

El equipo de operaciones desea que, cada día laborable por la mañana, se resuma automáticamente el material designado, se genere un reporte diario y se envíe al canal del equipo. Antes de automatizar, es recomendable ejecutar manualmente un reporte para detectar a tiempo la falta de datos, errores de ruta y problemas con el destino de las notificaciones.

## Preparación previa

* Un Agent de reportes diarios ya validado en [Trabajo];
* Fuentes de datos claras y un directorio de trabajo que contenga únicamente el material necesario;
* Un formato fijo que pueda implementarse como habilidad;
* Un canal conectado con el alcance de los mensajes restringido;
* Una tarea programada para días laborables.

<figure><img src="../../../../assets/e2328ba60a3ff5012831c39e.webp" alt="En primer lugar, asocie el reporte diario con un canal probado y, a continuación, seleccione dicho canal como destino de notificación para la tarea programada."><figcaption><p>En primer lugar, asocie el reporte diario con un canal probado y, a continuación, seleccione dicho canal como destino de notificación para la tarea programada. </p></figcaption></figure>

<figure><img src="../../../../assets/401d6b23759ab97ded47c2b5.webp" alt="Después de la primera ejecución automática, verifique si la tarea se completó realmente revisando el estado del Agent y los registros de ejecución."><figcaption><p>Después de la primera ejecución automática, verifique si la tarea se completó realmente revisando el estado del Agent y los registros de ejecución. </p></figcaption></figure>

<figure><img src="../../../../assets/005c0418156c52d0a531192b.webp" alt="① La tarea está habilitada y muestra la hora de la próxima ejecución; ② El prompt especifica la estructura de cuatro secciones, el manejo de datos faltantes y las condiciones de envío al canal."><figcaption><p>① La tarea está habilitada y muestra la hora de la próxima ejecución; ② El prompt especifica la estructura de cuatro secciones, el manejo de datos faltantes y las condiciones de envío al canal. </p></figcaption></figure>

## Pasos de configuración

{% stepper %}
{% step %}
### 1. Generar manualmente un reporte diario

Solicite al Agent que produzca cuatro secciones: "avances, métricas, riesgos y pendientes". Verifique que, ante la falta de datos, se indique explícitamente en lugar de inventar contenido.
{% endstep %}

{% step %}
### 2. Configurar el canal de notificación

Indique preferentemente en la conversación con el Agent la plataforma y el grupo a conectar, y luego verifique en [Configuración] → [Canales] las credenciales, los ID de sesión permitidos, el espacio de trabajo y el modo de permisos.
{% endstep %}

{% step %}
### 3. Crear la tarea programada

Pida al Agent que cree un plan para días laborables, o abra [Configuración] → [Tareas programadas] → [Nueva]. Seleccione el Agent de reportes diarios, el directorio de trabajo, la hora de ejecución y el canal de notificación.
{% endstep %}

{% step %}
### 4. Probar de inmediato

Después de guardar, haga clic en [Ejecutar] y revise la sesión generada, el historial de ejecución y los mensajes del canal. No espere al día siguiente para descubrir errores de ruta o de destino de recepción.
{% endstep %}

{% step %}
### 5. Observar y ajustar

En las primeras ejecuciones, revise el tiempo de ejecución, el consumo y las causas de los fallos. Si cambian las fuentes de datos o el formato del equipo, actualice la habilidad o el prompt de la tarea; no mantenga reglas contradictorias en múltiples ubicaciones.
{% endstep %}
{% endstepper %}

## Ejemplo de prompt para la tarea

```
Lee los datos añadidos ayer al directorio de trabajo y genera un informe operativo diario en chino con progreso, indicadores clave, anomalías y tareas de hoy. Si faltan datos, escribe «Sin datos» y enumera los archivos ausentes sin inventar cifras. Envía el resultado al canal de equipo configurado y guarda una copia Markdown en el directorio.
```

## Manejo de fallos

| Fenómeno | Ubicación de verificación |
| ------ | --------------------- |
| No se ejecutó | Estado de la tarea programada, hora de la próxima ejecución, suspensión del sistema |
| Fallo en la ejecución | [Historial de ejecución] → [Ver sesión] |
| No se generó el archivo | Directorio de trabajo, solicitud de permisos y herramientas de archivos del Agent |
| El mensaje no llegó | Estado del canal, destino de recepción y registros de la plataforma |
| Contenido duplicado | Si se habilitó simultáneamente el latido y varios planes idénticos |

## Combinaciones recomendadas y criterios de finalización

| Elemento | Práctica recomendada |
| ----- | ---------------------------------- |
| Agent | Primero ejecute manualmente el mismo reporte diario y luego asigne la tarea programada |
| Plan | Prefiera usar [Diario] o [Días laborables] y confirme la hora de la próxima ejecución |
| Canal | Primero envíe a una sesión de prueba y luego cambie al grupo oficial |
| Criterio de finalización | El historial de ejecución muestra éxito; el archivo del informe se puede abrir; el canal recibe solo un mensaje; no se inventan resultados cuando faltan datos |

{% hint style="warning" %}
Las tareas programadas se ejecutan sin supervisión. Antes de ponerlas en producción, mantenga el alcance de archivos al mínimo y permisos adecuados, evitando asignar escrituras de alto riesgo o modificaciones externas al modo de acceso total.
{% endhint %}

{% hint style="info" %}
El entorno de demostración de la captura de pantalla no tiene un canal externo vinculado, por lo que solo muestra la tarea guardada y habilitada. Para el uso formal, también debe hacer clic en [Ejecutar], confirmar que el [Historial de ejecución] muestra éxito y ver un mensaje real en el canal de prueba antes de incorporarlo a la operación diaria.
{% endhint %}
