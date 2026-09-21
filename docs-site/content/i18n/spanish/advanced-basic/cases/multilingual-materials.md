---
icon: globe
---
# Recopilación de materiales multilingües

El equipo de marketing recibe un conjunto de materiales que incluye documentación, capturas de pantalla y terminología de producto, y necesita traducirlos a otro idioma manteniendo la coherencia de nombres, números y formato. Una glosario de términos y una traducción de prueba a pequeña escala pueden reducir la necesidad de rehacer todo el material.

<figure><img src="../../../../assets/31b376b5d5a233eeb71ddf12.webp" alt="Primero se confirma que la recuperación de los materiales es precisa, luego el Agent unifica la terminología y el formato de salida, y finalmente se realiza una verificación manual de los contenidos clave."><figcaption><p>Primero se confirma que la recuperación de los materiales es precisa, luego el Agent unifica la terminología y el formato de salida, y finalmente se realiza una verificación manual de los contenidos clave. </p></figcaption></figure>

<figure><img src="../../../../assets/5428125ff9f2c41e29e8c2ed.webp" alt="En el lado izquierdo se conserva el texto original y en el derecho se muestra la traducción real. Antes de la entrega, se pueden verificar frase por frase términos clave como atenuación, métricas de monitoreo y procesos de reversión."><figcaption><p>En el lado izquierdo se conserva el texto original y en el derecho se muestra la traducción real. Antes de la entrega, se pueden verificar frase por frase términos clave como atenuación, métricas de monitoreo y procesos de reversión. </p></figcaption></figure>

## Flujo de trabajo

{% stepper %}
{% step %}
### 1. Crear primero un glosario de términos

Listar nombres de productos, nombres de funciones, nombres de personas, unidades y expresiones legales que no deben modificarse. Especificar el uso en el idioma objetivo para cada término.
{% endstep %}

{% step %}
### 2. Calibrar el estilo con un fragmento pequeño

En [Traducción], primero se procesa un capítulo representativo para confirmar el nivel de formalidad, el estilo de los títulos y la terminología, y luego se traduce todo el documento.
{% endstep %}

{% step %}
### 3. Realizar una verificación OCR separada para las imágenes

Después de subir las capturas de pantalla, primero se verifica el texto reconocido, especialmente los números, nombres de botones y tablas. Los errores de reconocimiento deben corregirse antes de la traducción.
{% endstep %}

{% step %}
### 4. Solicitar al Agent una verificación de coherencia

Colocar el texto original, la traducción y el glosario de términos en el directorio de trabajo, y pedir al Agent que liste inconsistencias terminológicas, omisiones de traducción, diferencias numéricas y problemas de enlaces, sin reemplazar directamente el contenido legal.
{% endstep %}
{% endstepper %}

## Verificación antes de la entrega

* Los nombres de productos y las rutas de la interfaz coinciden con la interfaz real;
* Los números, fechas, monedas y unidades no han cambiado;
* Se conservan los enlaces Markdown, los bloques de código y las descripciones de imágenes;
* El contenido legal, médico o de seguridad ha sido revisado por un profesional.

## Combinaciones recomendadas y criterios de finalización

| Elemento | Práctica recomendada |
| ---- | --------------------------------- |
| Punto de entrada para la traducción | Usar [Traducción] para textos cortos y capturas de pantalla; delegar la organización de múltiples archivos al Agent |
| Terminología | Proporcionar primero la lista de nombres de productos, términos propios y palabras que no deben traducirse |
| Archivos | Guardar el texto original y la traducción en directorios separados, manteniendo la correspondencia de los nombres de archivo originales |
| Criterio de finalización | Los números, enlaces y términos propios son consistentes; el texto de las imágenes ha sido verificado por muestreo; los cambios de formato están marcados en la nota de entrega |

{% hint style="warning" %}
El historial facilita la reutilización, pero también guarda el contenido de la traducción. Después de procesar materiales sensibles, revisar y limpiar los registros según sus requisitos de gestión de datos.
{% endhint %}
