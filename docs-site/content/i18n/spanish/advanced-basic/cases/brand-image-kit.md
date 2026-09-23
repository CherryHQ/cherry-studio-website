---
icon: images
---
# Kit de imágenes de marca

El equipo de contenido debe crear imágenes en formato horizontal, cuadrado y vertical para el mismo evento, manteniendo consistentes el sujeto principal, la paleta de colores y las reglas de marca. Definir primero la visión principal y luego expandir los tamaños facilita más la coherencia que generar cada imagen desde cero.

<figure><img src="../../../../assets/1c3d17dc2a9692479862d303.webp" alt="Configura y valida primero el modelo de dibujo; de lo contrario, los flujos de trabajo 【Generar imagen】 y 【Dibujo】 del Agent no tendrán conexiones disponibles."><figcaption><p>Configura y valida primero el modelo de dibujo; de lo contrario, los flujos de trabajo 【Generar imagen】 y 【Dibujo】 del Agent no tendrán conexiones disponibles. </p></figcaption></figure>

<figure><img src="../../../../assets/d565697cb53f20f4f266e1dd.webp" alt="Solicita primero al Agent que genere una imagen de muestra para confirmar la dirección, antes de pasar a la producción en lote."><figcaption><p>Solicita primero al Agent que genere una imagen de muestra para confirmar la dirección, antes de pasar a la producción en lote. </p></figcaption></figure>

<figure><img src="../../../../assets/2ba55ffd828250f31afa2b16.jpg" alt="Utiliza esta imagen final como boceto de la visión principal; una vez confirmados el sujeto, la iluminación y la paleta de colores, expande los tamaños a formato cuadrado y vertical."><figcaption><p>Utiliza esta imagen final como boceto de la visión principal; una vez confirmados el sujeto, la iluminación y la paleta de colores, expande los tamaños a formato cuadrado y vertical. </p></figcaption></figure>

## Materiales de preparación

* Tema del contenido y plataformas de uso;
* Colores de marca y imágenes de referencia permitidos;
* Textos, logotipos y elementos que no deben aparecer;
* Proporciones de las tres imágenes y requisitos de márgenes.

## Flujo de trabajo

{% stepper %}
{% step %}
### 1. Pedir al Agent que defina la dirección visual

Coloca el artículo o la descripción del evento en el directorio de trabajo y solicita al Agent que solo sugiera el sujeto, la escena, la paleta de colores, el encuadre y los márgenes, sin generar imágenes todavía.
{% endstep %}

{% step %}
### 2. Validar la visión principal en 【Dibujo】

Selecciona la plantilla y el modelo adecuados, y genera primero una muestra en formato horizontal. Revisa la apariencia del producto, los detalles de las personas y los riesgos de marca.
{% endstep %}

{% step %}
### 3. Expandir tamaños con imágenes de referencia

Una vez seleccionada la visión principal, úsala como referencia para generar las versiones cuadrada y vertical. En cada indicación, especifica qué elementos del sujeto deben conservarse y qué composición se puede ajustar.
{% endstep %}

{% step %}
### 4. Corrección local y mejora

Aplica edición o máscaras solo en las áreas problemáticas y realiza la mejora en la versión final. Incluye el uso y la proporción en el nombre del archivo para evitar confusiones.
{% endstep %}
{% endstepper %}

## Verificación de resultados

* Las tres imágenes comparten la misma paleta de colores y sujeto principal;
* No contienen texto incorrecto generado por el modelo;
* No aparecen logotipos de marca, personas o información sensible de forma inesperada;
* Los tamaños cumplen con los requisitos de la plataforma de publicación;
* El uso de las imágenes de referencia está autorizado.

## Combinaciones recomendadas y criterios de finalización

| Elemento | Práctica recomendada |
| ---- | ------------------------------- |
| Modelo de dibujo | Primero genera una imagen de muestra con el Agent para validar la conexión y luego guarda la plantilla de dibujo |
| Materiales de entrada | Colores de marca, tipografías, tamaños, imágenes de referencia y elementos prohibidos en el mismo directorio de proyecto |
| Método por lotes | Primero confirma una imagen y luego genera las imágenes de la misma serie |
| Criterio de finalización | Tamaños correctos, texto legible, elementos de marca consistentes, sin logotipos adicionales y la imagen de referencia original conservada |

Adecuado para portadas de artículos, imágenes para redes sociales y materiales de eventos; para carteles finales que requieran una maquetación precisa, se recomienda realizar la última revisión en una herramienta de diseño.

{% hint style="info" %}
Si deseas generar imágenes directamente en la conversación con el Agent, configura primero el 【Modelo de dibujo】 global y activa la herramienta 【Generar imagen】 del Agent. Para ediciones detalladas, se recomienda volver a la página 【Dibujo】.
{% endhint %}
