---
icon: settings
---

# Ajustes, uso y respuestas en segundo plano

Abra Configuración en la barra lateral para cambiar las preferencias de lectura, los valores predeterminados y el comportamiento en segundo plano.

## Tema, idioma y tamaño del texto.

En **Configuración → General**:

* Elija un tema claro, oscuro o del sistema.
* Elija el idioma de la aplicación. Los idiomas de la aplicación y la documentación se seleccionan por separado.
* Abra el tamaño de fuente y use su vista previa para elegir un tamaño cómodo.
* Habilite/deshabilite la marca de agua compartida para futuras exportaciones.

Los cambios se guardan directamente. Vuelva a intentar guardar cualquier error antes de salir.

<div data-mobile-gallery="single">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/general-settings.webp"><img src="../../../assets/mobile/en/general-settings.webp" alt="Ajustar el tema, el idioma, el tamaño del texto y la marca de agua para compartir"></a><figcaption><p><strong>iPhone · Interfaz en inglés</strong> · Ajustar el tema, el idioma, el tamaño del texto y la marca de agua para compartir</p></figcaption></figure>
</div>

## Modelos predeterminados y de dibujo.

En **Configuración → Modelo predeterminado**:

* **Modelo predeterminado** proporciona la opción de modelo de texto inicial para nuevos agentes.
* **Modelo de dibujo** proporciona dibujo predeterminado y la herramienta de generación de imágenes utilizada por los agentes de texto.

Seleccionar o borrar guarda inmediatamente. Los agentes existentes mantienen sus propios modelos; cámbielos en su editor o selector de conversación.

Si la lista está vacía, agregue los modelos disponibles y habilite su proveedor primero. Consulte [gestión de modelos](model-management.md) para conocer capacidades, límites y precios.

## entender el uso

Abra Inicio desde la barra lateral e inspeccione **Uso de IA**. Su vista detallada agrupa la actividad registrada por fecha, modelo o proveedor.

Una respuesta también tiene detalles de uso para su modelo, entrada/salida, tiempo transcurrido y costo. Un **token** es la unidad de contenido de un modelo, no un recuento de palabras. La historia, el pensamiento y las llamadas repetidas a herramientas también pueden consumir tokens.

* Los cargos informados por el proveedor y las estimaciones basadas en precios configurados tienen diferentes fuentes; inspeccionar las etiquetas.
* Los precios faltantes pueden significar una cobertura de costos parcial, no un uso gratuito.
* Responder nuevamente y trabajar con herramientas puede crear solicitudes adicionales. Eliminar el chat no reembolsa créditos ni elimina el uso registrado.
* Estas cifras describen el uso registrado por esta aplicación, no el saldo completo de la cuenta del proveedor ni la factura oficial.

Verifique la cuenta del proveedor para conocer la facturación real y los créditos restantes.

## Continuar después de salir de la aplicación

Abra **Configuración → Notificaciones**.

| Opción | Propósito |
| --- | --- |
| iPhone/iPad: Actividad en vivo | Muestra el estado de la tarea en pantallas de bloqueo compatibles o Dynamic Island después de salir de la aplicación |
| Android: Respuestas en segundo plano | Intenta continuar la generación y mostrar el estado en las notificaciones. |
| Notificaciones de finalización de respuesta | Intenta notificarte cuando finaliza una respuesta mientras la aplicación está en segundo plano |

La visualización del progreso y las alertas de finalización son opciones independientes. También se requiere permiso de notificación del sistema; activar un interruptor de la aplicación no anula un permiso denegado por el sistema. Toque una notificación de tarea para volver a su contenido.

La finalización mientras ya estás viendo la tarea es generalmente silenciosa. Las actividades en vivo aparecen principalmente después de salir de la aplicación, por lo que no ver una en primer plano no necesariamente indica un problema.

<div data-mobile-gallery="single">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/notifications.webp"><img src="../../../assets/mobile/en/notifications.webp" alt="Controle el progreso de la tarea y las notificaciones de finalización por separado"></a><figcaption><p><strong>iPhone · Interfaz en inglés</strong> · Controlar el progreso de la tarea y las notificaciones de finalización por separado</p></figcaption></figure>
</div>

## ¿Por qué bloquear la pantalla interrumpió la generación?

El soporte en segundo plano no es garantía de ejecución continua. Las políticas de batería, los límites del sistema operativo, la pérdida de red o la terminación de procesos pueden hacer que el trabajo deje de funcionar. Mantenga las tareas largas en primer plano siempre que sea posible.

Las interrupciones que la aplicación puede manejar retienen respuestas parciales y muestran el estado de interrupción sin reenviar automáticamente. Si el sistema operativo finaliza el proceso a la fuerza, sólo se podrá confiar en el contenido guardado; Es posible que se pierda la última parte no guardada. Abra el registro de conversación o dibujo, inspeccione el resultado y luego decida si desea volver a intentarlo.

Una tarea también puede pausarse para la aprobación de la herramienta; Regrese a la aplicación y responda. El estado de la tarea permanece disponible en la aplicación incluso si no se entrega una notificación.

## Privacidad y permisos

**Configuración → Privacidad** tiene controles separados de uso anónimo y de informe de errores. **Configuración → Permisos del sistema** administra el acceso a la cámara, las fotos, el calendario y otras funciones del dispositivo. Uno no reemplaza al otro.

Consulte [datos, privacidad y permisos](data-privacy.md).
