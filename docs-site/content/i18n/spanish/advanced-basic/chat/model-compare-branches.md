---
icon: code-branch
---
# Comparación de múltiples modelos y ramas de mensajes

La comparación de múltiples modelos es adecuada para abordar preguntas que no tienen una única respuesta, como la revisión de propuestas, la dirección de redacción y la verificación cruzada de información. Las ramas de mensajes permiten probar una ruta alternativa desde un nodo específico sin necesidad de copiar toda la conversación.

## Comparar varios modelos simultáneamente

{% stepper %}
{% step %}
### 1. Abra 【Diálogo】 y haga clic en el nombre del modelo

Marque los modelos que desea comparar en el selector de modelos. Antes del primer uso, asegúrese de que los servicios a los que pertenecen estos modelos tengan una conexión estable.
{% endstep %}

{% step %}
### 2. Envíe la misma pregunta

Incluya los criterios de evaluación en la pregunta, por ejemplo: "Compare desde las perspectivas de ejecutabilidad, riesgos y costos". No se limite a preguntar "cuál es mejor".
{% endstep %}

{% step %}
### 3. Compare las diferencias, no solo elija la respuesta más larga

Preste atención a la consistencia de los hechos, la claridad de los supuestos, los posibles omitidos y cuál opción se ajusta mejor a sus restricciones. Verifique los hechos importantes consultando las fuentes originales.
{% endstep %}
{% endstepper %}

<figure><img src="../../../../assets/290e0288048d57cd868cb443.webp" alt="Seleccione varios modelos desde el selector de modelos y compare las diferencias utilizando la misma pregunta."><figcaption><p>Seleccione varios modelos desde el selector de modelos y compare las diferencias utilizando la misma pregunta. </p></figcaption></figure>

{% hint style="warning" %}
Seleccionar varios modelos a la vez genera solicitudes independientes. Si involucra costos, velocidad o información sensible, confirme primero la conexión y el rendimiento con preguntas cortas antes de procesar materiales extensos.
{% endhint %}

## Crear ramas desde mensajes

Localice el mensaje que desea explorar nuevamente, abra el menú del mensaje y seleccione la acción de rama. La nueva rama conservará el contexto anterior, y los mensajes posteriores se registrarán por separado de la ruta original. Utilice el gestor de ramas para cambiar, comparar y volver entre diferentes rutas.

También puede crear una rama vacía en el lienzo de ramas. La rama vacía se guarda inmediatamente tras su creación, se conserva tras reiniciar la aplicación y permanece en el lienzo de ramas; la próxima vez que envíe contenido desde el cuadro de entrada, dicha rama se rellenará. Puede eliminar las ramas vacías que no necesite temporalmente desde el menú contextual (clic derecho) del nodo.

<figure><img src="../../../../assets/0bc4cb0c28265626960cd849.webp" alt="El gestor de ramas conserva simultáneamente las rutas de &quot;Lista de verificación antes del lanzamiento&quot; y &quot;Piloto rápido&quot;."><figcaption><p>El gestor de ramas conserva simultáneamente las rutas de "Lista de verificación antes del lanzamiento" y "Piloto rápido". </p></figcaption></figure>

En la imagen: ① Nodo de rama y ruta actual; ② Leyenda de usuario, asistente, ruta actual y ruta desactivada. En el ejemplo se conservan las rutas "Lista de verificación antes del lanzamiento" y "Piloto rápido", con un total de 2 ramas y 6 nodos de mensajes.

### Caso de aplicación: Revisión de dos propuestas de lanzamiento

Primero, pida al modelo que identifique los riesgos y vacíos en las propuestas. Luego, desde la misma respuesta, haga preguntas adicionales como "Complementar la lista de verificación antes del lanzamiento" y "Evaluar desde la perspectiva de un piloto rápido". Al abrir el gestor de ramas, ambas rutas se mantendrán lado a lado, permitiendo continuar con preguntas adicionales en cada una o volver a la otra ruta en cualquier momento para verificar las conclusiones.

<details>

<summary>¿Cuándo no es adecuado usar múltiples modelos? </summary>

Es más adecuado usar un solo modelo cuando se busca un hecho específico, se organiza texto corto o los materiales contienen información que no debe enviarse a múltiples proveedores de servicios.

</details>

<details>

<summary>¿Las ramas modifican el mensaje original? </summary>

No. La rama continúa desde el nodo seleccionado, la ruta original se conserva y se puede volver a ella en cualquier momento.

</details>
