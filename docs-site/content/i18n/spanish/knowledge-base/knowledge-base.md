---
icon: compass
---

<a id="tutorial-de-base-de-conocimientos"></a>

# Primeros pasos con las bases de conocimiento

Una base de conocimiento organiza archivos, notas, carpetas y páginas web para consultarlos repetidamente. Comprueba la recuperación de los fragmentos correctos antes de usarla en el chat o con un Agent.

{% hint style="info" %}
El modelo de embeddings es opcional. Selecciona **Ninguno (None)** para comenzar con búsqueda por palabras clave BM25. Añade un modelo cuando necesites búsqueda semántica. El modelo de reordenamiento también es opcional.
{% endhint %}

## Crear tu primera base

1. <a id="crear-base-de-conocimientos"></a>Abre **Base de conocimiento** en la navegación izquierda y pulsa el botón de añadir sobre la lista. Elige un nombre concreto, como « Política de viajes del personal ».

2. <a id="agregar-modelo-de-incrustación"></a>Para empezar, configura **Modelo de embeddings** en **Ninguno (None)**. Añade un modelo después si necesitas reconocer sinónimos o preguntas con otras palabras.

3. <a id="agregar-datos-de-múltiples-fuentes"></a><a id="agregar-archivos-y-vectorizar"></a>Abre la base y añade un **Archivo**, una **Nota**, una **Carpeta** o un **Enlace**. Empieza con pocos documentos relevantes.

4. Espera a que termine el procesamiento. Revisa el texto extraído y los **Chunks** para detectar caracteres ilegibles, páginas ausentes o un orden incorrecto.

5. <a id="buscar-en-la-base-de-conocimientos"></a>Abre **Prueba de recuperación (Retrieval Test)** y plantea una pregunta real cuya respuesta conozcas. Verifica que la fuente correcta aparezca entre los primeros resultados.

6. <a id="generar-respuestas-citando-la-base-de-conocimientos-en-una-conversación"></a>Cuando la recuperación sea fiable, selecciona la base en el área de entrada del chat o vincúlala desde la página de edición del Agent.

![Fuentes: archivos, notas, carpetas y enlaces](../../../assets/4622da2093d43942d7ee443e.webp)

## Comprobar antes de usar las respuestas

Conserva entre 3 y 5 preguntas reales y repítelas tras cambiar datos o ajustes. Si falla la recuperación, revisa primero el texto y los Chunks. El modelo de chat no puede recuperar información esencial que la búsqueda no encontró.

Los precios y el tratamiento de datos de modelos cloud de embeddings o reordenamiento dependen del proveedor. Separa el material con distintos requisitos de acceso.
