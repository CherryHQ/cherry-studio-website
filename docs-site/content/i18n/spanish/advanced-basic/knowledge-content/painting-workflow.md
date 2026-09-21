---
icon: palette
---
# Generación, edición y mejora de imágenes

【Pintura】 no solo permite generar imágenes a partir de texto, sino que también admite el uso de imágenes de referencia, la edición de áreas específicas, la combinación de varias imágenes, la reutilización de plantillas y la mejora de la resolución. Primero, determine el propósito de la imagen y luego elija entre generar o editar.

## Elegir el punto de partida adecuado

| Necesidad | Método sugerido |
| ------------ | ------------ |
| Crear una dirección visual desde cero | Texto a imagen o plantilla |
| Conservar el sujeto principal y cambiar el fondo o el estilo | Editar después de subir una imagen de referencia |
| Modificar solo una parte de la imagen | Usar una máscara para marcar el área de modificación |
| Combinar varios recursos en una sola imagen | Combinación de múltiples imágenes, especificando la relación de jerarquía |
| Una imagen existente necesita mayor nitidez | Usar la función de mejora/ampliación |

### Ejemplo: de una descripción a un producto terminado

Abra 【Pintura】, seleccione un modelo de imagen que admita la tarea actual, introduzca el sujeto principal, el entorno, el estilo, la iluminación, la composición y las restricciones, y luego envíe. Un ejemplo de indicación es:

> Mesa de trabajo creativa bajo la luz de la mañana, lámpara de escritorio color cereza, cuaderno de bocetos, cámara y una rama de cerezo; al fondo, montañas serenas; estilo de ilustración 3D suave, luz cálida de la mañana, composición panorámica, sin texto.

1. Especifique claramente el propósito y la composición, y seleccione el modelo de pintura.
2. Genere la primera versión y revise el sujeto principal, los bordes y las dimensiones.
3. Si aún no es utilizable, modifique solo una dirección, genere nuevamente y verifique.
4. Una vez confirmado que es utilizable, amplíe para inspeccionar y exporte.

{% hint style="info" %}
El ejemplo utiliza 【GPT-Image-2 | express】 para generar una ilustración panorámica de una mesa de trabajo. El modelo, las dimensiones y las operaciones disponibles dependen de lo que se muestre en su página actual; no copie parámetros que no vea.
{% endhint %}

No se vaya inmediatamente después de generar: primero amplíe para revisar el sujeto principal, los bordes y los elementos innecesarios, y luego cambie de versión desde el historial de la izquierda. Si necesita ajustes, conserve la descripción válida y modifique solo una dirección.

<figure><img src="../../../../assets/2ba55ffd828250f31afa2b16.jpg" alt="① A la izquierda se conservan las miniaturas del historial de esta generación; ② En el centro se muestra el producto terminado completo; ③ Amplíe para inspeccionar antes de descargar, copiar o continuar editando."><figcaption><p>① A la izquierda se conservan las miniaturas del historial de esta generación; ② En el centro se muestra el producto terminado completo; ③ Amplíe para inspeccionar antes de descargar, copiar o continuar editando. </p></figcaption></figure>

## Completar una imagen utilizable

{% stepper %}
{% step %}
### 1. Seleccionar modelo y modo

Diferentes modelos de imagen admiten distintas dimensiones, imágenes de referencia y capacidades de edición. No rellene parámetros que no se muestren en la página basándose solo en la experiencia.
{% endstep %}

{% step %}
### 2. Especificar claramente el propósito y la composición

Describa el sujeto principal, el entorno, el punto de vista, la paleta de colores, la proporción, los espacios en blanco y el contenido que no debe aparecer. Si se va a colocar un título, generalmente se deja espacio en blanco para que el modelo lo reserve, y el texto se añade después con herramientas de diseño.
{% endstep %}

{% step %}
### 3. Verificar solo una dirección a la vez

Genere primero un pequeño lote de resultados, seleccione la imagen más cercana y luego edite o mejore. Generar múltiples imágenes simultáneamente aumentará el consumo y dificultará determinar qué requisito está surtiendo efecto.
{% endstep %}

{% step %}
### 4. Revisar detalles antes de exportar

Amplíe para revisar las manos de las personas, la estructura del producto, el texto, los logotipos de la marca y los bordes. Si se requiere uso comercial, confirme la fuente de los recursos y los términos de servicio correspondientes.
{% endstep %}
{% endstepper %}

### Dibujar en Agent

Primero vaya a 【Configuración】 → 【Modelo predeterminado】 y seleccione 【Modelo de pintura】, luego abra las 【Herramientas integradas】 de Agent para confirmar que 【Generar imagen】 esté habilitado. Después, puede pedir a Agent en 【Trabajo】 que lea un artículo, extraiga la dirección visual y genere directamente las imágenes de acompañamiento.

<figure><img src="../../../../assets/1c3d17dc2a9692479862d303.webp" alt="El 【Modelo de pintura】 en 【Modelo predeterminado】 determina qué modelo se utiliza con prioridad por Agent y las entradas de pintura relacionadas."><figcaption><p>El 【Modelo de pintura】 en 【Modelo predeterminado】 determina qué modelo se utiliza con prioridad por Agent y las entradas de pintura relacionadas. </p></figcaption></figure>

### Caso de aplicación: crear un conjunto de imágenes para una campaña de marca

Primero, establezca reglas unificadas de tono, cámara y espacios en blanco en la plantilla y genere una imagen de cabecera horizontal. Una vez definida la dirección, use la misma imagen de referencia para crear imágenes cuadradas para redes sociales e imágenes verticales para historias; si la apariencia del producto no es consistente, corríjala mediante edición local y, finalmente, mejore las versiones destinadas a la difusión. Durante todo el proceso, no permita que el modelo genere texto de la marca para evitar errores tipográficos y deformaciones.

{% hint style="warning" %}
Las imágenes de referencia pueden enviarse al servicio del modelo seleccionado. Antes de subir datos de clientes, retratos o imágenes de productos no publicados, debe confirmar el alcance del servicio permitido para su uso.
{% endhint %}
