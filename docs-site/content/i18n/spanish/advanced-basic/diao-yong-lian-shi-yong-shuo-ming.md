---
icon: route
---
# Instrucciones de uso de la cadena de llamadas (Trace)


{% hint style="warning" %}
Este documento ha sido traducido del chino por IA y aún no ha sido revisado.
{% endhint %}




## Funcionalidad

La cadena de llamadas (también conocida como "trace") proporciona a los usuarios capacidades de observación en las conversaciones, ayudándoles a identificar el rendimiento específico de modelos, bases de conocimiento, MCP, búsquedas web, etc., durante el diálogo. Es una herramienta de observabilidad implementada mediante [OpenTelemetry](https://opentelemetry.io/docs/languages/js/), que visualiza datos mediante recopilación, almacenamiento y procesamiento en el lado del cliente, proporcionando bases cuantitativas para localizar problemas y optimizar resultados.

Cada conversación corresponde a un dato de trace. Un trace consta de múltiples spans, donde cada span corresponde a una lógica de procesamiento en Cherry Studio, como llamadas a sesiones de modelos, MCP, bases de conocimiento o búsquedas web. El trace se muestra en estructura de árbol con spans como nodos, incluyendo datos principales como tiempo de ejecución y uso de tokens. En los detalles del span también pueden verse sus entradas y salidas específicas.


## Activar Trace

Por defecto, después de instalar Cherry Studio, Trace permanece oculto. Debe activarse en "Configuración" → "Configuración general" → "Modo desarrollador", como se muestra:

<figure><img src="../../../assets/5bc9e16e1f5160a5f4e99729.webp" alt=""><figcaption></figcaption></figure>

Los diálogos anteriores no generarán registros de Trace. Solo se generarán registros tras nuevas interacciones de pregunta-respuesta. Los registros se almacenan localmente. Para eliminar completamente Trace, puede usar "Configuración" → "Configuración de datos" → "Directorio de datos" → "Borrar caché", o eliminar manualmente los archivos en `~/.cherrystudio/trace` como se muestra:

<figure><img src="../../../assets/5fa25924a4f047b1c1a00f99.webp" alt=""><figcaption></figcaption></figure>

## Escenarios de uso

### Visualización de toda la cadena

Haga clic en "Cadena de llamadas" dentro del cuadro de diálogo de Cherry Studio para ver datos completos de la cadena. Ya sea que el diálogo involucre modelos, búsquedas web, bases de conocimiento o MCP, todos los datos de llamada se mostrarán en la ventana de cadena de llamadas.

<figure><img src="../../../assets/96f8921000b0e49a48a28947.webp" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../assets/9f48ec08e6840b29671b402d.webp" alt=""><figcaption></figcaption></figure>

### Inspección de modelos en la cadena

Para ver detalles de modelos en la cadena, haga clic en el nodo de llamada de modelo para inspeccionar sus entradas y salidas.

<figure><img src="../../../assets/aaeb8ab543baa57c7989f11f.webp" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../assets/bdc2ab4c88da564c8bf19ced.webp" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../assets/4bab7b0ead1619be0210e8b6.webp" alt=""><figcaption></figcaption></figure>

### Inspección de búsquedas web en la cadena

Para ver detalles de búsquedas web, haga clic en el nodo correspondiente para examinar entradas y salidas. En los detalles podrá ver tanto la consulta como los resultados devueltos.

<figure><img src="../../../assets/38ba4e28ad7b127dfc076bdd.webp" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../assets/6d0d2dea3e62b64c78050fd4.webp" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../assets/6912b752ce86bba66338fc22.webp" alt=""><figcaption></figcaption></figure>

### Inspección de bases de conocimiento en la cadena

Para ver detalles de bases de conocimiento, haga clic en el nodo correspondiente. Los detalles mostrarán la consulta realizada y las respuestas recuperadas.

<figure><img src="../../../assets/f7b0fc0775ee90a19fb680e5.webp" alt=""><figcaption></figcaption></figure>

### Inspección de llamadas MCP en la cadena

Para ver detalles de MCP, haga clic en el nodo de llamada MCP. Los detalles mostrarán los parámetros de entrada pasados al tool MCP Server y las respuestas devueltas.

<figure><img src="../../../assets/855e3b0feda7e020464197a8.webp" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../assets/b7928ac8ad57c10a8d281dcb.webp" alt=""><figcaption></figcaption></figure>

## Problemas y sugerencias

Esta función es proporcionada por el equipo de [EDAS](https://www.aliyun.com/product/edas) de Alibaba Cloud. Para problemas o sugerencias, únase al grupo de DingTalk (ID de grupo: 21958624) para comunicarse directamente con los desarrolladores.