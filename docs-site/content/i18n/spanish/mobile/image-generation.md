---
icon: image
---

# Generación de imágenes

Cree imágenes a partir de una descripción, imagen de referencia o plantilla. Primero configure un modelo de generación de imágenes: un modelo de texto que comprende imágenes no necesariamente las genera.

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/iphone-drawing.webp"><img src="../../../assets/mobile/en/iphone-drawing.webp" alt="Inicio de creación de imágenes en Cherry Studio Mobile para iPhone"></a><figcaption><p><strong>Creación de imágenes · Interfaz en inglés</strong> · Empiece a crear a partir de una foto o una plantilla</p></figcaption></figure>
<figure data-mobile-shot="tablet"><a href="../../../assets/mobile/en/ipad-image-preview.webp"><img src="../../../assets/mobile/en/ipad-image-preview.webp" alt="Vista previa de una plantilla de imagen en Cherry Studio Mobile para iPad"></a><figcaption><p><strong>Vista previa de la plantilla · Interfaz en inglés</strong> · Revise el ejemplo y las instrucciones antes de usar la plantilla</p></figcaption></figure>
</div>

## Tres formas de crear

| Flujo de trabajo | Empieza aquí | Donde aparecen los resultados |
| --- | --- | --- |
| Dibujo independiente | Abra **Dibujos** en la barra lateral, toque agregar en la parte superior derecha y elija un modelo | Historia del dibujo |
| Modelo de imagen en el chat. | Seleccione un modelo de generación de imágenes para el agente. | Adjuntos de imágenes en esa conversación. |
| Herramienta de dibujo utilizada por un agente de texto. | Establezca un modelo de dibujo en **Configuración → Modelo predeterminado**, habilite el **Generación de imágenes** del agente y luego pida a un modelo de texto que admita llamadas a herramientas que genere una imagen | Actividad de herramientas e imágenes en esa conversación. |

El tercer flujo de trabajo solicita confirmación antes de que se ejecute su herramienta de imágenes, incluso bajo aprobación automática. Para un dibujo independiente o un modelo de imagen seleccionado directamente, al presionar Enviar/Generar se envía la solicitud.

## Empezar desde una descripción

1. Elija un modelo de generación de imágenes.
2. Describe el tema, propósito, estilo y composición.
3. Abra parámetros y ajuste el tamaño, la relación de aspecto, el recuento u otros controles disponibles.
4. Envíe, espere y toque el resultado para ampliarlo.

Ejemplo:

> Una portada apaisada para leer notas: un libro abierto y una taza de té sobre una mesa de madera, luz suave de la mañana, tonos blancos cálidos y madera pálida, espacio vacío a la izquierda, sin texto.

Los controles dependen del modelo. Imágenes más grandes o más resultados pueden aumentar el tiempo y el costo.

## Comience con una plantilla

Elija una plantilla de dibujo, inspeccione su vista previa y personalice su tema y otras entradas disponibles. Las plantillas son puntos de partida; el modelo y sus aportaciones determinan el resultado final.

Revise el historial de dibujos y los **Detalles de generación** para reutilizar las indicaciones exitosas.

## Continuar con una imagen de referencia.

Las reglas de referencia automática y conservación de entradas que aparecen a continuación se aplican a **dibujos independientes** y a **conversaciones directas con modelos de imágenes**. En su lugar, un agente de texto que llama a la herramienta de dibujo selecciona material a través de su conversación/solicitud de herramienta.

Para modelos que admitan referencias o edición, adjunte una imagen y describa el cambio: "Mantenga la composición, cambie el fondo a noche y conserve todo lo demás".

* Un seguimiento compatible puede utilizar automáticamente el único resultado exitoso anterior. Con múltiples salidas, seleccione aquella desde la que continuar.
* La entrada editada durante la ejecución de la generación se conserva en lugar de ser reemplazada por el resultado.
* Las referencias manuales reemplazan a las referencias automáticas. Consulte las imágenes adjuntas antes de enviarlas.
* Cambiar a un modelo de solo texto a imagen detiene las referencias automáticas. Las imágenes incompatibles adjuntas explícitamente requieren eliminación o un modelo diferente.
* Los modelos que requieren una imagen necesitan una referencia antes del envío. Algunos modos permiten enviar la solicitud sin texto; siga las indicaciones de la página.

Las acciones de edición y cambio de tamaño en el visor de imágenes llevan a la creación la imagen seleccionada. El soporte aún depende del modelo de destino; No todos los modelos de imagen pueden realizar ediciones arbitrarias.

## Fallos, cancelación y solicitudes repetidas

Los seguimientos fallidos o cancelados preservan la intención de entrada/referencia siempre que sea posible. El dibujo independiente conserva el resultado exitoso anterior. La cancelación no prueba que el proveedor dejó de procesar y no garantiza un reembolso.

Inspeccione el error: el modelo no compatible, las referencias incompatibles, los créditos, los límites de frecuencia de las solicitudes y los tiempos de espera requieren soluciones diferentes. Verifique la tarea anterior antes de presionar repetidamente Generar.

## Guardar y compartir

El visor de imágenes ofrece guardar en Fotos, compartir el sistema y abrir en otra aplicación. Guardar en Fotos necesita acceso al sistema.

Utilice **Configuración → General → Marca de agua al compartir** para controlar futuras exportaciones. Las imágenes creadas en el chat se pueden exportar con mensajes seleccionados; Los resultados independientes están en el historial de dibujo. Consulte [compartir y exportar](sharing-and-export.md).
