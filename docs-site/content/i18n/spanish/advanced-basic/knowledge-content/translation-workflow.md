---
icon: language
---
# Traducción de archivos, imágenes y textos largos

【Traducción】 puede procesar texto ingresado directamente, así como imágenes o documentos cargados. Las imágenes primero se someten a reconocimiento de texto, mientras que los documentos se procesan según su formato y contenido; los registros históricos pueden marcarse como favoritos, volver a abrirse y reutilizarse.

<figure><img src="../../../../assets/31b376b5d5a233eeb71ddf12.webp" alt="La traducción es parte del flujo de trabajo de contenido: primero se confirman los materiales de entrada, luego se unifican los términos y se revisa el entregable final."><figcaption><p>La traducción es parte del flujo de trabajo de contenido: primero se confirman los materiales de entrada, luego se unifican los términos y se revisa el entregable final. </p></figcaption></figure>

### Selección del método de entrada

| Material | Práctica recomendada | Puntos de verificación |
| -------- | -------------------- | ---------------- |
| Texto corto | Pegar directamente | Tono, nombres propios, contexto |
| Capturas de pantalla o escaneos | Cargar imagen y usar OCR | Errores de reconocimiento, tablas y números |
| PDF | Cargar archivo y seleccionar si se instala BabelDOC | Diseño de dos columnas, tipografía, tablas, notas al pie y número de páginas |
| Otros documentos largos | Cargar archivo | Jerarquía de títulos, párrafos, notas al pie y formato |
| Markdown | Verificar mediante vista previa | Si se conservan enlaces, bloques de código y marcado |

#### Ejemplo: traducción de texto corto

Seleccione 【Detección automática】 como idioma de origen, 【Inglés】 como idioma de destino, ingrese el texto en chino y haga clic en 【Traducir】. Una vez que aparezca el resultado, verifique primero los significados clave como "grayscale", "métricas de monitoreo" y "proceso de reversión", y luego copie o guarde en sus notas.

<figure><img src="../../../../assets/5428125ff9f2c41e29e8c2ed.webp" alt="① El texto original se conserva en el lado izquierdo; ② la traducción se muestra en el lado derecho. Antes de la entrega, verifique punto por punto la publicación gradual, las métricas de monitoreo y el proceso de reversión."><figcaption><p>① El texto original se conserva en el lado izquierdo; ② la traducción se muestra en el lado derecho. Antes de la entrega, verifique punto por punto la publicación gradual, las métricas de monitoreo y el proceso de reversión. </p></figcaption></figure>

#### Qué verificar tras obtener el resultado

| Elemento de verificación | Ejemplo |
| ----- | ------------------ |
| Significado clave | "Publicación gradual" no debe traducirse literalmente solo por color |
| Nombres propios | Mantener la consistencia de nombres de productos, equipos y funciones |
| Números y condiciones | No omitir fechas, proporciones, montos y palabras de negación |
| Tono | Usar el tono adecuado para notificaciones, contratos y textos de marketing |

El texto corto puede verificarse frase por frase; para archivos y textos largos, primero realice una verificación aleatoria de títulos, tablas, números y términos repetidos, y luego decida si se entrega el documento completo.

### Traducción de PDF conservando el diseño

Después de cargar un PDF con texto extraíble, la página detectará BabelDOC. En el primer uso, seleccione 【Instalar BabelDOC】; una vez que las dependencias estén listas, la vista previa del texto original se mostrará en el lado izquierdo y el PDF traducido en el lado derecho, mostrando el progreso según las etapas de verificación de recursos, análisis, traducción, maquetación y renderizado.

{% stepper %}
{% step %}
#### 1. Cargar el PDF y verificar dependencias

Haga clic en 【Arrastre o haga clic para cargar imagen/documento】 para seleccionar un PDF. Si la página indica que faltan dependencias o que la versión es antigua, instale o actualice BabelDOC; la instalación se gestiona de forma unificada por 【Dependencias de entorno】 de Cherry Studio.
{% endstep %}

{% step %}
#### 2. Seleccionar modelo de traducción e idioma de destino

La traducción de PDF requiere que el modelo actual sea invocable a través de la pasarela de API local. Si el modelo no está disponible, vuelva primero a 【Configuración】 → 【Servicio de modelos】 para verificar la conexión; no instale BabelDOC repetidamente.
{% endstep %}

{% step %}
#### 3. Comparar el resultado de dos columnas

Una vez completada la traducción, compare página por página el texto original y la traducción, prestando especial atención a tablas, pies de figura, encabezados y pies de página, notas al pie y saltos de línea. Puede usar el botón de descarga para guardar el PDF traducido por separado.
{% endstep %}

{% step %}
#### 4. Continuar desde el historial

La traducción de PDF se registrará en 【Historial de traducciones】 y 【Archivos】. El historial permite volver a abrir la vista previa de dos columnas, localizar el archivo traducido o guardar el resultado por separado; al eliminar un registro, el archivo de traducción correspondiente también se recuperará.
{% endstep %}
{% endstepper %}

{% hint style="warning" %}
Los PDF escaneados o de solo imágenes no admiten actualmente la traducción conservando el diseño. Si la página indica que se requiere OCR, primero reconozca el texto de las imágenes como texto verificable y luego utilice el flujo de traducción estándar.
{% endhint %}

### Pasos de traducción

{% stepper %}
{% step %}
#### 1. Confirmar primero el idioma de origen y destino

El reconocimiento automático es adecuado para idiomas mixtos o desconocidos; para materiales formales como contratos y documentos técnicos, se recomienda confirmar manualmente el idioma para reducir errores de detección.
{% endstep %}

{% step %}
#### 2. Seleccionar el método de traducción

Use el modelo configurado cuando se requiera contexto, tono y consistencia terminológica; para frases cortas estándar, puede seleccionar un método más ligero. Los elementos disponibles específicos dependen de la página actual.
{% endstep %}

{% step %}
#### 3. Verificación por segmentos

Verifique primero nombres, números, fechas, palabras de negación y unidades. Para la traducción de imágenes, también debe verificar los resultados de OCR; si hay errores de reconocimiento, la traducción posterior también será incorrecta.
{% endstep %}

{% step %}
#### 4. Marcar como favorito, exportar o reutilizar el resultado

En 【Historial de traducciones】, puede ver, marcar como favorito y reutilizar traducciones de texto; los resultados de PDF pueden verse en vista previa de dos columnas, abrirse como archivo o guardarse por separado. Antes de la entrega formal, guarde la tabla de términos y las revisiones manuales en los materiales del proyecto.
{% endstep %}
{% endstepper %}

#### Caso de aplicación: preparación de materiales de producto multilingües

Primero, organice los nombres de productos, nombres de funciones y términos que no deben modificarse en una guía. Cargue el manual en chino, traduzca primero un capítulo y confirme los términos, y luego procese el texto completo; las imágenes promocionales se cargan por separado para traducción mediante OCR. Una vez completado, coloque los términos y traducciones confirmados en el directorio de trabajo del proyecto, y permita que el Agent verifique de forma unificada títulos, enlaces y números, pero no le permita modificar por sí mismo las declaraciones legales.

{% hint style="danger" %}
El contenido relacionado con salud, derecho, finanzas y seguridad requiere la revisión de profesionales. La traducción automática puede mejorar la eficiencia, pero no puede sustituir la revisión por parte de un responsable.
{% endhint %}
