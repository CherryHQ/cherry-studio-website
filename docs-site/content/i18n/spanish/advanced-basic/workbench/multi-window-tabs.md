---
icon: window-restore
---
# Ventanas múltiples y pestañas

Los temas de conversación, las tareas de Agent y las pestañas normales se pueden extraer de la ventana actual. La operación no duplica el contenido, solo cambia la ubicación de visualización.

<figure><img src="../../../../assets/b695c03a2d68db6c3e947867.webp" alt="Haz clic derecho en la pestaña de destino y selecciona [Abrir en nueva ventana]; las páginas que se usan con frecuencia pueden fijarse primero para evitar cierres accidentales."><figcaption><p>Haz clic derecho en la pestaña de destino y selecciona [Abrir en nueva ventana]; las páginas que se usan con frecuencia pueden fijarse primero para evitar cierres accidentales. </p></figcaption></figure>

## Abrir desde un tema o tarea

{% stepper %}
{% step %}
### 1. Encontrar el tema o la tarea de Agent de destino

Haz clic derecho en el elemento de destino en la lista de temas de la izquierda o en la lista de tareas de Agent.
{% endstep %}

{% step %}
### 2. Seleccionar el método de apertura

Seleccionar [Abrir en nueva pestaña] lo mantiene en la ventana principal; seleccionar [Abrir en nueva ventana] crea directamente una ventana independiente, y la lista actual sigue estando disponible.
{% endstep %}

{% step %}
### 3. Gestionar la ventana independiente

Haz clic en [Mantener al frente] en la parte superior para mantenerla por delante de otras ventanas; haz clic en [Volver a la ventana principal] para devolver el contenido actual a la ventana principal y cerrar la ventana independiente.
{% endstep %}
{% endstepper %}

## Extraer desde una pestaña

Haz clic derecho en la pestaña de la parte superior de la ventana principal y selecciona [Abrir en nueva ventana]. Esta operación mueve la pestaña a una ventana independiente y la elimina de la barra de pestañas de la ventana principal.

## Operaciones comunes de pestañas

* [Mover al extremo izquierdo]: mueve la pestaña actual al principio de las pestañas normales;
* [Fijar pestaña]: la reduce a un icono fijo y la mantiene en el lado izquierdo de la barra de pestañas;
* [Cerrar otras pestañas]: solo conserva la página actual;
* [Cerrar pestañas a la derecha]: organiza un lote de páginas temporales;
* Arrastrar pestañas: ajusta el orden de las pestañas del mismo tipo.

## Escenario de uso: consultar información y ver tareas al mismo tiempo

Deja la conversación de información en la ventana principal, abre la tarea de Agent en ejecución con [Abrir en nueva ventana] y luego mantén la ventana de la tarea al frente. La información sigue en la conversación original y la tarea no se reinicia por la extracción de la ventana. Al finalizar la tarea, haz clic en [Volver a la ventana principal] para evitar la acumulación prolongada de ventanas independientes.

### Disposición recomendada

La ventana principal se encarga de la información y la búsqueda, y la ventana independiente solo conserva una tarea que requiera observación continua; usa [Fijar pestaña] para las pestañas comunes de proyectos similares y cierra las páginas temporales a tiempo una vez completadas.

### Criterios de finalización

La información puede volver a la conversación original, la tarea de Agent no se ha reiniciado por la extracción de la ventana y, al finalizar la tarea, se ha vuelto a la ventana principal o se ha cerrado la ventana independiente.

{% hint style="warning" %}
Mantener al frente solo cambia el nivel de visualización, no aumenta la prioridad de la tarea ni impide el modo de suspensión del sistema. Si se requiere ejecución continua en segundo plano, se deben verificar el estado de Agent y la configuración de energía del sistema.
{% endhint %}

<details>

<summary>¿Por qué no se pueden abrir más pestañas internas ocultas en una ventana independiente? </summary>

Una ventana independiente funciona en torno a un solo contenido. Para abrir otros temas o tareas, usa el menú contextual para abrir una nueva ventana, o primero haz clic en [Volver a la ventana principal] y luego gestiona las pestañas.

</details>
