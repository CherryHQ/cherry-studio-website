---
icon: sliders-horizontal
---

# Añadir, editar y gestionar modelos

Por lo general, solo necesita buscar una lista de proveedores y agregar los modelos que utiliza. La configuración manual ayuda cuando falta un modelo, necesita un nombre más claro o tiene información que difiere de su plataforma.

Abra **Configuración → Servicio modelo → Tu proveedor → Modelos**.

## Agregar un modelo manualmente

1. Toque el botón Agregar en la pestaña Modelos.
2. Ingrese el **ID del modelo**, el identificador exacto que utiliza su plataforma. Cópialo de la documentación o catálogo de la plataforma sin traducirlo.
3. Elija un nombre para mostrar, como "Preguntas cotidianas". Esto cambia la forma en que reconoce el modelo, no el modelo que se llama.
4. Verifique el tipo de modelo y API. Deje otras opciones en sus valores predeterminados si no está seguro.
5. Toca **Agregar**. Si está configurando un proveedor por primera vez, finalice la configuración y asegúrese de que su interruptor esté habilitado en la lista de proveedores.

La entrada manual agrega un modelo a la vez. Utilice [sincronización de modelos](model-updates.md) para varios modelos. No se permiten identificaciones duplicadas dentro del mismo proveedor.

## Ver y editar

Toca un modelo para ver sus detalles y copiar su ID, luego toca **Editar** en la parte superior derecha. También puede mantener presionado un elemento de la lista para obtener detalles, editarlo, seleccionarlo o eliminarlo.

El editor de modelos utiliza **guardado explícito**. Expanda la sección que necesita, realice cambios y luego toque **Guardar**. Si falla al guardar, corrija los campos indicados y vuelva a intentarlo antes de salir.

Un **ID de modelo existente no se puede cambiar en el editor**. Si es incorrecto, agregue un modelo con la ID correcta, cambie cualquier agente o valor predeterminado a la nueva entrada y luego elimine el anterior.

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/model-detail.webp"><img src="../../../assets/mobile/en/model-detail.webp" alt="Inspeccione la identificación del modelo y los detalles, luego use Editar en la parte superior derecha"></a><figcaption><p><strong>iPhone · Interfaz en inglés</strong> · Inspecciona la identificación del modelo y los detalles, luego usa Editar en la parte superior derecha</p></figcaption></figure>
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/model-edit.webp"><img src="../../../assets/mobile/en/model-edit.webp" alt="Expanda la configuración relevante y guarde sus cambios."></a><figcaption><p><strong>iPhone · Interfaz en inglés</strong> · Expande la configuración relevante y guarda tus cambios.</p></figcaption></figure>
</div>

## ¿Qué significan las configuraciones?

| Configuración | Efecto | cuando no estoy seguro |
| --- | --- | --- |
| Nombre para mostrar, grupo, notas | Organizar y reconocer modelos. | Usa tus propias etiquetas |
| ID del modelo | Identifica el modelo llamado en la plataforma. | Mantener el valor exacto de la plataforma |
| tipo de modelo | Distingue texto, generación de imágenes y otros propósitos. | Sigue la descripción de la plataforma. |
| API | Selecciona cómo las solicitudes se conectan al modelo. | Mantener la selección automática/predeterminada |
| Razonamiento | Soporte de registros para funciones relacionadas con el pensamiento. | Conservar la información suministrada |
| Llamada de herramientas | Soporte de registros para herramientas de búsqueda, calendario o complementos | Coincide con el soporte real del modelo. |
| Entradas admitidas | Graba soporte de entrada de imagen, audio o vídeo | No habilitar entradas no admitidas |
| Transmisión | Soporte de registros para respuestas progresivas. | Mantenga el valor predeterminado; esta bandera por sí sola no cambia la ejecución |

**Las marcas de capacidad no agregan capacidades.** Marcar un modelo de solo texto como compatible con imágenes no hará que comprenda fotografías. Las marcas de audio/vídeo tampoco significan que la aplicación móvil pueda enviar todos esos archivos adjuntos.

La incrustación y la reclasificación son categorías de modelos que se utilizan para la recuperación. Su información se puede gestionar, pero actualmente no están disponibles para el chat móvil normal. Elija texto para conversar o generación de imágenes para dibujar.

## Contexto y límites de entrada/salida

Un **token** es una unidad que los modelos usan para medir el contenido, no un carácter o un recuento de palabras.

* **Ventana de contexto:** el espacio total para el historial, los resultados de la herramienta y la nueva respuesta.
* **Entrada máxima:** cuánto contenido puede aportar una solicitud.
* **Producción máxima:** cuánto puede producir el modelo en una respuesta.

Aumentar un número no supera los límites del proveedor y puede provocar solicitudes rechazadas. Cambie estos valores solo cuando la plataforma le ofrezca límites diferentes. Utilice números enteros positivos y resuelva cualquier advertencia de límite conflictivo.

Borre una anulación de límite y guárdela para restaurar los valores predeterminados del catálogo o la aplicación. Si una conversación larga aún excede los límites, reduzca los archivos adjuntos, acorte el material o inicie una nueva conversación.

## Estimaciones de precios y costos.

Los precios respaldan las estimaciones de uso; **editarlo no cambia la factura del proveedor**.

* Seleccione USD o CNY. Las tasas de entrada/salida son **por millón de tokens**.
* Las tasas de lectura/escritura de caché describen cómo la plataforma valora el contenido reutilizado. Las tasas de caché vacías utilizan la tasa de entrada.
* Lo desconocido es diferente de lo gratuito. `0` significa explícitamente una tasa cero; No lo utilices por un precio desconocido.
* Los niveles de entrada pueden representar precios más altos para solicitudes largas. Los umbrales iniciales deben aumentar. El nivel aplicable fija el precio de toda la solicitud, en lugar de solo la parte que supera el umbral.

Mantenga los valores predeterminados cuando no tenga precios confiables. Consulte [configuración y uso](settings-and-usage.md) para conocer los costos estimados e incompletos.

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/model-limits.webp"><img src="../../../assets/mobile/en/model-limits.webp" alt="Los límites de longitud pueden heredar los valores predeterminados; no los aumente sin la orientación del proveedor"></a><figcaption><p><strong>iPhone · Interfaz en inglés</strong> · Los límites de longitud pueden heredar los valores predeterminados; no los aumente sin la orientación del proveedor</p></figcaption></figure>
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/model-pricing.webp"><img src="../../../assets/mobile/en/model-pricing.webp" alt="Los precios son por millón de tokens; Los valores mostrados ilustran los campos, no los precios actuales del proveedor."></a><figcaption><p><strong>iPhone · Interfaz en inglés</strong> · Los precios son por millón de tokens; Los valores mostrados ilustran los campos, no los precios actuales del proveedor.</p></figcaption></figure>
</div>

## ¿Cambiar el API se guarda inmediatamente?

Cambiar el API de un modelo directamente en la lista de administración se guarda inmediatamente. Al seleccionarlo en el **editor** se cambia un borrador hasta que tocas Guardar.

Siguiendo el valor predeterminado se utiliza el API predeterminado actual del proveedor. Si deja de estar disponible, verifique la conexión configurada del proveedor en lugar de cambiar el nombre del modelo repetidamente.

## Eliminar y organizar modelos

Mantenga presionado para ingresar al modo de selección y eliminar varios modelos dentro del filtro actual. La eliminación fallida conserva la selección para que pueda resolver el problema y volver a intentarlo.

* Un modelo predeterminado global está protegido: cámbielo o borrelo en **Configuración → Modelo predeterminado** antes de eliminarlo.
* Eliminar un modelo utilizado por un agente significa que el agente necesita seleccionar otro modelo.
* Eliminar la configuración local no cierra una cuenta de proveedor ni revierte los cargos.

En caso de desuso temporal, desactive el proveedor en lugar de reconstruir su configuración más tarde. Consulte [actualizaciones de modelo](model-updates.md) para saber qué sucede con sus ediciones cuando cambia la información remota.
