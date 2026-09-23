---
icon: book-open
---
# Construcción de bases de conocimiento y pruebas de recuperación

Las bases de conocimiento procesan archivos, páginas web y notas en fragmentos recuperables. Son adecuadas para responder preguntas como "¿qué dice el material?", pero no equivalen a que el modelo memorice permanentemente todo el documento.

## Crear e importar material

{% stepper %}
{% step %}
### 1. Abrir [Base de conocimiento] → [Nueva base de conocimiento]

Escriba un nombre fácil de identificar y seleccione un modelo de incrustación disponible. El modelo de incrustación se encarga de convertir el material en representaciones buscables; no es lo mismo que el modelo principal utilizado en las conversaciones.
{% endstep %}

{% step %}
### 2. Seleccionar fuentes de material

Puede agregar archivos, carpetas, notas o direcciones URL. Los formatos de documentos comunes incluyen PDF, DOCX, Markdown, Excel, TXT y CSV; los documentos escaneados pueden requerir OCR para extraer el texto.
{% endstep %}

{% step %}
### 3. Esperar a que finalice el procesamiento

Abra los detalles del archivo para ver la vista previa y la segmentación. Si faltan títulos, hay caracteres ilegibles o se pierde la estructura de las tablas, organice primero el archivo original y vuelva a procesarlo.
{% endstep %}

{% step %}
### 4. Realizar pruebas de recuperación

Pruebe con preguntas que harían usuarios reales, no solo con los títulos de los archivos. Verifique si los fragmentos devueltos son relevantes y si contienen el contexto completo antes de decidir si se vinculan a un Agent.
{% endstep %}
{% endstepper %}

<figure><img src="../../../../assets/203ae7d1fc3c8b76bd8af0a8.webp" alt="Al crear una nueva base de conocimiento, escriba primero el nombre y seleccione un modelo de incrustación disponible."><figcaption><p>Al crear una nueva base de conocimiento, escriba primero el nombre y seleccione un modelo de incrustación disponible. </p></figcaption></figure>

<figure><img src="../../../../assets/7e64d06ef22f90944b1896ee.webp" alt="① Los tres documentos de viajes están listos; ② haga clic en [Prueba de recuperación] en la parte superior para verificar con preguntas reales."><figcaption><p>① Los tres documentos de viajes están listos; ② haga clic en [Prueba de recuperación] en la parte superior para verificar con preguntas reales. </p></figcaption></figure>

<figure><img src="../../../../assets/c00520c08c9364fe13caad57.webp" alt="① Introduzca preguntas que realmente se harían en el trabajo; ② verifique los materiales coincidentes, el contenido de los fragmentos y la relevancia."><figcaption><p>① Introduzca preguntas que realmente se harían en el trabajo; ② verifique los materiales coincidentes, el contenido de los fragmentos y la relevancia. </p></figcaption></figure>

### Validar los resultados de recuperación con preguntas reales

Una vez que el material muestre el estado [Listo], realice una prueba con preguntas que realmente surjan en el trabajo. Por ejemplo, en una base de normas internas puede preguntar "¿Se puede reembolsar el alquiler de coche en el extranjero?" y luego verificar si el contenido devuelto proviene del material correcto y si incluye suficiente contexto.

| Resultado observado | Siguiente paso |
| --------------- | ----------------------- |
| Coincide con el material correcto y el fragmento es suficiente para responder | Puede vincularse al Agent para su uso |
| El material coincide, pero el fragmento está truncado | Verifique primero la estructura del texto original y luego ajuste la longitud de la segmentación |
| Coincide con normas antiguas o material irrelevante | Limpie el material obsoleto y agregue títulos y contenido más claros |
| No hay ningún resultado | Verifique el estado del material y la redacción de la pregunta; no aumente ciegamente la cantidad de resultados devueltos |

{% hint style="info" %}
Después de que la prueba de recuperación sea exitosa, verifique el flujo completo de preguntas y respuestas en el Agent. Esto permite distinguir entre "no se encontró el material" y "se encontró el material, pero la respuesta no fue adecuada".
{% endhint %}

## Cómo entender la configuración de RAG

RAG significa "recuperar material primero y luego dejar que el modelo responda". Las configuraciones comunes controlan la longitud de la segmentación, el rango de solapamiento, la cantidad de resultados devueltos y el umbral de relevancia.

| Configuración | Función | Punto de partida sugerido | Cuándo ajustar |
| ----- | -------------- | -------- | ------------------- |
| Longitud de segmentación | Determina cuánta contenido incluye cada fragmento recuperado | Utilice primero los valores iniciales de la página | Cuando los fragmentos suelen truncar oraciones o mezclar demasiados temas |
| Solapamiento de segmentación | Mantiene la conexión entre fragmentos adyacentes | Mantenga un solapamiento mínimo | Cuando las cláusulas cruzan segmentos y el contexto se interrumpe frecuentemente |
| Cantidad de resultados | Cuántos fragmentos candidatos se proporcionan en una sola vez | Comience con pocos resultados | Aumente si se omite material clave; reduzca si hay demasiado ruido |
| Umbral de relevancia | Filtra contenido no relacionado | Decida mediante pruebas de recuperación | Aumente si hay muchos resultados irrelevantes; bájelo si los fragmentos correctos se filtran |

<figure><img src="../../../../assets/24f5e32e3c72df907aaed3a6.webp" alt="Solo ajuste la configuración de RAG según la estructura del material si los resultados de recuperación son inestables."><figcaption><p>Solo ajuste la configuración de RAG según la estructura del material si los resultados de recuperación son inestables. </p></figcaption></figure>

### Caso de aplicación: Crear una base de preguntas y respuestas sobre normas internas

Organice las normas vigentes por departamento, incluyendo el tema y el alcance de vigencia en el nombre del archivo. Después de importarlas, realice pruebas de recuperación con preguntas reales como "¿Qué hacer si el alojamiento en un viaje supera el límite?" o "¿Quién debe aprobar la solicitud de vacaciones durante el período de prueba?". Una vez confirmada la precisión de los fragmentos, vincule esta base de conocimiento únicamente al Agent de "Preguntas sobre normas" y exija que las respuestas indiquen el nombre del material; si falta contenido, debe indicar explícitamente que no se encontró.

{% hint style="warning" %}
La base de conocimiento no determina automáticamente si un archivo está obsoleto. Cuando cambien las normas, precios o procesos, debe actualizar o eliminar el material antiguo y volver a realizar pruebas de recuperación.
{% endhint %}

<details>

<summary>¿Por qué no hay resultados después de importar? </summary>

Verifique el estado de procesamiento del archivo, la conexión del modelo de incrustación y la vista previa del documento. Si un PDF escaneado no tiene texto extraíble, primero debe configurar OCR o cambiar a una versión buscable.

</details>
