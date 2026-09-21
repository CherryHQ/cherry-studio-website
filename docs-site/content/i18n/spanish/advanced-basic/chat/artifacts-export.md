---
icon: box-archive
---
# Artefactos, citas y exportación

Una respuesta puede contener simultáneamente texto principal, código, archivos, imágenes, citas y contenido editable. Primero, inspecciona los artefactos y luego decide si copiar, descargar, exportar o entregarlos al Agent para su procesamiento posterior.

<figure><img src="../../../../assets/5c0f5f563432facacf7942d6.webp" alt="Al llegar al artefacto final, primero verifica el contenido, la fuente y los archivos, y luego decide si copiar, exportar o entregarlos al Agent para su organización posterior."><figcaption><p>Al llegar al artefacto final, primero verifica el contenido, la fuente y los archivos, y luego decide si copiar, exportar o entregarlos al Agent para su organización posterior. </p></figcaption></figure>

### Primero previsualiza, luego entrega

Haz clic en un artefacto dentro del mensaje o en el panel de archivos del Agent para abrir la previsualización correspondiente en el lado derecho. En el caso de HTML, puedes revisar el diseño de la página y las interacciones; PDF, Word, PowerPoint, imágenes y texto se muestran según su formato; `.xlsx` las hojas de cálculo permiten ver directamente las hojas, los estilos de celdas, las celdas combinadas, los resultados de las fórmulas, las imágenes y los gráficos.

<figure><img src="../../../../assets/4e1d6cc47405edfe8d6fe315.webp" alt="① El área de previsualización sirve para verificar el contenido completo; ② la barra de herramientas permite hacer zoom, descargar, maximizar o cambiar la vista."><figcaption><p>① El área de previsualización sirve para verificar el contenido completo; ② la barra de herramientas permite hacer zoom, descargar, maximizar o cambiar la vista. </p></figcaption></figure>

1. Indica el formato del artefacto en la conversación y abre la previsualización en el lado derecho.
2. Verifica que el contenido y el diseño sean completos.
3. Si faltan elementos, vuelve a la conversación para añadir requisitos de modificación y vuelve a abrir la previsualización para comprobarlo.
4. Una vez confirmado que es completo, descárgalo, cópialo o entrégalo al Agent para que lo guarde.

El propósito de la previsualización es detectar faltantes con antelación, no solo confirmar que "se ha generado". Si la página se va a entregar a un colega para su uso, revisa al menos una vez los enlaces, los botones y los archivos descargables.

{% hint style="info" %}
Si el resultado es solo un bloque de código y no aparece la previsualización, puedes añadir en la misma ronda de conversación "Por favor, genera un artefacto HTML completo y directamente previsualizable" y especificar claramente las áreas que la página debe incluir.
{% endhint %}

#### Caso de aplicación: Verificación antes de la publicación

Introduce "Convierte la lista de verificación previa a la publicación en un artefacto HTML completo y directamente previsualizable, que incluya tres áreas: preparación para el lanzamiento, monitoreo y aceptación, y condiciones de reversión". Una vez abierta la previsualización, verifica primero que las tres partes sean completas y luego descárgalo o entrégalo al Agent para que lo guarde en el directorio del proyecto.

#### Caso de aplicación: Verificación de tablas de datos

Abre la hoja de cálculo de presupuesto `.xlsx` generada por el Agent, cambia a cada hoja de cálculo y luego verifica los títulos combinados, el formato de las cantidades, los resultados de las fórmulas y los gráficos. Si el contenido de una celda es largo, haz clic para expandirlo; utiliza el zoom para ver con claridad las imágenes o los gráficos. La previsualización se utiliza para la aceptación y no reemplaza la capacidad de edición completa y recálculo de Excel.

### Realiza primero tres comprobaciones

1. **Contenido**: Si los números, fechas, términos propios y conclusiones coinciden con los materiales originales.
2. **Fuente**: Si los resultados de la búsqueda en línea conservan enlaces accesibles; si las citas realmente respaldan las afirmaciones correspondientes.
3. **Archivos**: Si el nombre del archivo, el formato y el contenido se abren correctamente y si contienen información que no debería compartirse.

### Destinos comunes

| Resultado | Práctica recomendada |
| ---------------- | ------------------------------------- |
| Texto finalizado | Cópialo a la aplicación de destino o guárdalo como nota |
| Markdown que requiere modificaciones continuas | Colócalo en el directorio de trabajo del Agent y continúa editándolo en el panel [Archivos] |
| Material reutilizable | Organízalo y añádelo a la base de conocimientos; no importes discusiones temporales por completo |
| Imágenes | Abre la imagen original para verificar el tamaño y los detalles, y luego descárgala |
| Tabla `.xlsx` | Verifica las hojas, los estilos, los resultados de las fórmulas, las imágenes y los gráficos en la previsualización integrada, y luego realiza la edición final con software de hojas de cálculo |
| Código o comandos | Léelo primero y verifícalo en un entorno recuperable; no ejecutes comandos desconocidos directamente |

{% hint style="warning" %}
"Generación exitosa" solo indica que el modelo devolvió contenido, no que el archivo esté listo para publicarse. Los materiales externos aún deben verificarse en cuanto a hechos, derechos de autor, privacidad y requisitos de marca.
{% endhint %}

#### Caso de aplicación: Organizar la discusión en un documento entregable

El equipo primero discute el plan de la actividad en [Conversación]. Después de confirmar la audiencia, el tiempo y los límites de presupuesto, pide al modelo que genere un esquema estructurado. Luego, entrega el esquema al Agent de contenido en [Trabajo] para que genere `campaign-plan.md` en el directorio especificado. Finalmente, revisa el documento en [Archivos] del lado derecho, evitando copiar decenas de rondas de discusión tal cual al documento formal.

<details>

<summary>¿Por qué no se abren los enlaces de las citas? </summary>

Es posible que el enlace haya caducado, requiera inicio de sesión o que los resultados de la búsqueda solo proporcionen un resumen. Utiliza la fuente original para verificar nuevamente; no utilices fuentes que no se puedan abrir como único soporte para conclusiones clave.

</details>

<details>

<summary>¿Por qué no se abren los enlaces de las citas? </summary>

Es posible que el enlace haya caducado, requiera inicio de sesión o que los resultados de la búsqueda solo proporcionen un resumen. Utiliza la fuente original para verificar nuevamente; no utilices fuentes que no se puedan abrir como único soporte para conclusiones clave.

</details>
