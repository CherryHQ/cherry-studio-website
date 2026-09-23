---
icon: refresh-cw
---

# Actualización de información y listas de modelos

"Actualizar" puede significar varias cosas. Una actualización de la información del modelo no cambia el modelo elegido, no otorga permisos de cuenta ni agrega automáticamente cada modelo nuevo a su lista.

| lo que quieres | donde hacerlo | que cambia |
| --- | --- | --- |
| Nuevos nombres de modelos, capacidades, límites o precios | Abra la pestaña **Modelos** de un proveedor | La información del modelo compartido utilizada por la aplicación. |
| Modelos devueltos actualmente por una plataforma. | Toque **Sincronizar** en la pestaña Modelos de ese proveedor. | Una vista previa de las incorporaciones y modelos no devueltos; usted selecciona qué cambios aplicar |
| La configuración existente de su computadora | Elija **Sincronización desde la aplicación de escritorio** | Configuración del proveedor seleccionado y modelos habilitados faltantes |
| Nuevas funciones y correcciones de la aplicación | Actualización a través del canal de instalación oficial. | La aplicación en sí |

## ¿Cuándo se actualiza la información del modelo?

Cuando se usa por primera vez, la aplicación descarga información del modelo en segundo plano. La selección, creación y edición del modelo pueden mostrar estados de carga o reintento hasta que finalice. Verifique la red y vuelva a intentarlo después de una primera descarga fallida.

La información descargada se almacena en su dispositivo. Los lanzamientos posteriores utilizan esa información guardada sin descargarla nuevamente en cada inicio. **Al abrir la pestaña Modelos de un proveedor** se activa un intento de actualización en segundo plano.

**Información de los modelos actualizada** aparece solo cuando se aplicó una versión más reciente y usted permanece en la pantalla Modelos. Un catálogo sin cambios, una actualización en segundo plano fallida o abandonar la página pueden no generar ninguna notificación. El silencio no significa necesariamente fracaso.

## ¿Qué sucede fuera de línea?

Un catálogo guardado existente sigue siendo utilizable si falla la actualización. Una descarga fallida no borra la configuración de su modelo. El primer uso sin información guardada aún requiere una conexión a Internet.

La exploración de información guardada sin conexión no hace que los modelos en la nube estén disponibles sin conexión; enviar una solicitud aún requiere una conexión con su proveedor.

## ¿Se sobrescribirán mis ediciones?

Las actualizaciones de información remota no reescriben las ajustes de modelos guardados manualmente ni los modelos personalizados. Los campos que aún siguen los valores predeterminados heredan nueva información, por lo que los nombres, las capacidades o los precios predeterminados pueden cambiar.

Estas actualizaciones no cambian sus **claves API, direcciones de proveedores ni configuraciones de autenticación** y no habilitan un proveedor. Borre un límite de token ingresado manualmente y guárdelo si desea que vuelva a seguir el valor predeterminado del catálogo/aplicación.

## Obtener la lista de modelos de un proveedor

1. Abra **Configuración → Servicio modelo → Tu proveedor → Modelos**.
2. Guarde los cambios en la configuración del proveedor y luego toque **Sincronizar**.
3. Revise los modelos que se pueden añadir y los modelos **no devueltos por el servicio remoto**.
4. Seleccione los cambios que desee y toque **Actualización**. No se selecciona nada automáticamente.
5. Lea la confirmación antes de aplicar cualquier eliminación.

Obtener la lista no habilita al proveedor. Los resultados fallidos o vacíos conservan los modelos existentes; reparar la configuración, volver a intentarlo o [agregar un modelo manualmente](model-management.md).

<div data-mobile-gallery="single">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/model-sync.webp"><img src="../../../assets/mobile/en/model-sync.webp" alt="Revisar y seleccionar modelos antes de aplicar cambios; la lista de proveedores puede cambiar"></a><figcaption><p><strong>iPhone · Interfaz en inglés</strong> · Revisar y seleccionar modelos antes de aplicar cambios; la lista de proveedores puede cambiar</p></figcaption></figure>
</div>

## ¿“No devuelto” significa que un modelo fue descontinuado?

No necesariamente. Las claves, los permisos de la cuenta, las API de listados incompletos y las fallas temporales pueden afectar los resultados.

Los modelos no se eliminan automáticamente después de una única respuesta. La eliminación requiere su selección y confirmación; El historial de conversaciones permanece. Se pueden omitir los modelos protegidos; consulte [reglas de eliminación de modelos](model-management.md). No retire en masa los modelos que funcionan simplemente porque no fueron devueltos.

## ¿Por qué funciona el chat cuando falla la sincronización?

El descubrimiento de modelos y el chat utilizan diferentes direcciones de solicitud. Algunas plataformas admiten el chat pero no exponen una lista de modelos API.

La configuración del proveedor personalizado muestra el **URL de solicitud de la lista de modelos** separado. Si la plataforma no lo admite, copie el ID del modelo exacto de la plataforma, agréguelo manualmente y verifique la conexión.

## Existe un nuevo modelo, pero no puedo verlo.

Comprueba que:

1. Abriste la pestaña Modelos para permitir una actualización de la información.
2. Sincronizó con el proveedor correspondiente o agregó manualmente el modelo.
3. Su cuenta/clave puede acceder a ella.
4. El proveedor y el modelo están habilitados y el filtro selector está configurado en Todos.

La información del modelo, el acceso a la cuenta y los modelos agregados localmente están separados. La aplicación también debe admitir el formato de conexión del modelo.
