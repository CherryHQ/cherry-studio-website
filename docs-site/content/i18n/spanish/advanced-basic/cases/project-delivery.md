---
icon: folder
---
# Entrega de archivos de proyecto con Agent

Un compañero de operaciones debe organizar un conjunto de materiales dispersos en un índice, resúmenes y archivos de entrega. Para evitar modificaciones accidentales de los originales, es necesario definir previamente el directorio de trabajo de Agent, el alcance de las modificaciones permitidas y el método de aceptación.

## Tareas adecuadas

* Organizar materiales dispersos en un catálogo y un índice;
* Generar múltiples documentos a partir de una plantilla;
* Modificar código y dejar una descripción de los cambios;
* Renombrar, convertir o verificar archivos en lote.

<figure><img src="../../../../assets/2573aee0510e0d6abdabab7f.webp" alt="El espacio de trabajo de Agent agrupa la tarea, el modelo, el directorio de trabajo y los archivos de entrega en la misma página."><figcaption><p>El espacio de trabajo de Agent agrupa la tarea, el modelo, el directorio de trabajo y los archivos de entrega en la misma página.</p></figcaption></figure>

<figure><img src="../../../../assets/401d6b23759ab97ded47c2b5.webp" alt="En tareas largas, primero revise el panel de [Estado] para ver si se está ejecutando, está esperando aprobación o ya se ha completado."><figcaption><p>En tareas largas, primero revise el panel de [Estado] para ver si se está ejecutando, está esperando aprobación o ya se ha completado.</p></figcaption></figure>

<figure><img src="../../../../assets/4e1d6cc47405edfe8d6fe315.webp" alt="Después de generar los entregables, ábralos realmente para inspeccionarlos. La vista previa de la página web en la imagen ya muestra el título, los elementos de verificación y las sugerencias; no es un marcador de posición vacío."><figcaption><p>Después de generar los entregables, ábralos realmente para inspeccionarlos. La vista previa de la página web en la imagen ya muestra el título, los elementos de verificación y las sugerencias; no es un marcador de posición vacío.</p></figcaption></figure>

## Flujo de operación

{% stepper %}
{% step %}
### 1. Seleccionar el directorio de trabajo mínimo

Seleccione solo el directorio del proyecto actual. Asegúrese de que los archivos importantes tengan una copia de seguridad o un registro de versiones, y comience con permisos de [Confirmación por cada acción].
{% endstep %}

{% step %}
### 2. Definir claramente el alcance modificable y no modificable

Especifique qué archivos son solo de lectura, dónde se colocarán los productos, qué operaciones requieren confirmación previa y los criterios de finalización.
{% endstep %}

{% step %}
### 3. Pedir primero a Agent que liste el plan

Para tareas de alto riesgo, puede usar [Solo planificación]. Después de confirmar la lista de archivos y los pasos, cambie al modo que permite la edición para ejecutar la tarea.
{% endstep %}

{% step %}
### 4. Revisar el estado y los archivos en el panel derecho

En tareas largas, primero verifique si [Estado] está esperando aprobación; después de generar los productos, prévisualícelos en [Archivos]. Confirme que todo esté correcto antes de transferirlos; no sustituya la aceptación por el "fin de la tarea".
{% endstep %}
{% endstepper %}

## Tarea de ejemplo

```
Organiza el directorio actual. Los archivos de raw/ son de solo lectura; crea en deliverables/ un índice, un resumen y una lista de documentos faltantes. Solicita confirmación antes de eliminar, sobrescribir o renombrar archivos en lote. Al final, enumera los archivos añadidos y modificados.
```

## Combinaciones recomendadas

| Capacidad | Uso sugerido | Razón |
| ---- | ------------ | ----------------- |
| Directorio de trabajo | Usar un directorio independiente para cada proyecto | Los límites de archivos y la ubicación de entrega son claros |
| Permisos | Mantener [Confirmación por cada acción] para modificar archivos | Facilita detectar eliminaciones accidentales, sobrescrituras y escrituras fuera de alcance |
| Panel de estado | Revisar los productos y los pasos fallidos antes de finalizar | No basarse únicamente en que "Agent dice que está completado" |
| Nueva tarea | Abrir una nueva tarea para una nueva fase o un nuevo cliente | Evita que los requisitos históricos afecten la entrega actual |

{% hint style="danger" %}
[Acceso completo] reduce las confirmaciones, pero también amplía el impacto de los errores de operación. Solo se debe considerar su uso temporal en directorios aislados, confiables y recuperables.
{% endhint %}
