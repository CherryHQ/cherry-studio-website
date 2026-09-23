---
icon: chart-line
---
# Estadísticas de uso

Las estadísticas de uso **agregan la información de llamadas a modelos en Cherry Studio en un panel visual**: cuánto se ha gastado, cuántos Tokens se han utilizado, cuántas solicitudes se han enviado y qué modelo se usa con mayor frecuencia, todo de un vistazo. Le ayuda a estimar costos, detectar consumos anómalos y facilita la toma de decisiones sobre el uso de diferentes modelos.

Abra `Configuración → Estadísticas de uso`. La página se divide en tres secciones: **Resumen / Explorar / Solicitudes**. En la esquina superior derecha puede cambiar entre **Últimos 30 días / Últimos 90 días / Último año**, y todos los datos se calculan según el intervalo seleccionado.

<figure><img src="../../../../assets/9ccf4fd668065e8e789301e5.webp" alt=""><figcaption><p>Estadísticas de uso [Resumen]: tarjetas de métricas en la parte superior + mapa de calor de actividad diaria en la parte inferior (el costo total en la imagen se ha ocultado) </p></figcaption></figure>

### Resumen

Un conjunto de tarjetas de métricas en la parte superior:

| Métrica | Significado |
| --- | --- |
| **Costo total** | Gasto estimado dentro del intervalo (calculado según los precios públicos de cada modelo, solo como referencia) |
| **Número de solicitudes** | Total de solicitudes iniciadas |
| **Total de Tokens** | Cantidad total de Tokens de entrada + salida |
| **Tasa de acierto de caché** | Proporción de aciertos en la caché de prompts (lecturas de caché acertadas ÷ entradas observables); cuanto más alta, más ahorro |
| **Días activos / Mayor racha consecutiva** | Días con registro de uso y días de uso consecutivo |
| **Día pico** | Fecha con el mayor uso diario y su cantidad de Tokens |
| **Modelo con mayor uso** | Modelo con mayor consumo dentro del intervalo |
| **Promedio diario** | Cantidad promedio de Tokens y número de solicitudes por día |

El **mapa de calor de actividad diaria** en la parte inferior muestra la intensidad del uso por día. Puede alternar entre las dimensiones **Tokens / Costo**; cuanto más oscuro sea el color, mayor fue el uso ese día.

### Explorar / Analizar

Al cambiar a **Explorar**, puede realizar un análisis desglosado del uso: dividir por **grupo** (proveedor / modelo / clave API / asistente·Agent), seleccionar una **métrica** y luego visualizar la distribución y las tendencias mediante gráficos de **barras / líneas / pastel / segmentos**.

### Detalle de solicitudes

**Solicitudes** lista los registros de cada solicitud, lo que facilita identificar qué solicitudes generaron el mayor consumo.

> ¿Desea ver por un día específico? En el mapa de calor de **actividad diaria** del resumen, haga clic en un día específico; la sección de exploración (análisis + solicitudes) se **profundizará** en ese día y el título cambiará a "Detalle de [día]"; haga clic en «Limpiar filtro de fecha» para volver.

{% hint style="info" %}
El costo es un **valor estimado**: se calcula según los precios públicos de los modelos, pero la facturación real se basa en las facturas de los proveedores de cada modelo. Los modelos gratuitos y los modelos locales no generan costos.
{% endhint %}

***

### Obtener ayuda y enviar comentarios

Si tiene alguna duda, detecta un error o tiene sugerencias de mejora de funciones durante la configuración o el uso, consulte los canales oficiales proporcionados en [Comentarios y sugerencias](../../question-contact/suggestions.md).
