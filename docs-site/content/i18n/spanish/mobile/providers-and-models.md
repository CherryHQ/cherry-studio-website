---
icon: key-round
---

# Proveedores y modelos

Un proveedor es la plataforma que proporciona un servicio de IA; un modelo es la IA particular que utilizas a través de esa plataforma. El mismo modelo puede estar disponible en varios proveedores, cada uno con sus propias credenciales.

Para comenzar, introduzca una **Clave API**, añada un modelo y habilite el proveedor. Una clave API es una credencial emitida por su proveedor para que Cherry Studio pueda acceder a su servicio. Cherry Studio no incluye créditos de uso de modelos; la disponibilidad y los cargos dependen de su cuenta en el proveedor.

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/iphone-add-provider.webp"><img src="../../../assets/mobile/en/iphone-add-provider.webp" alt="Agregar pantalla de proveedor en Cherry Studio Mobile en iPhone"></a><figcaption><p><strong>iPhone · Interfaz en inglés</strong> · Buscar en el catálogo de proveedores o crear un proveedor personalizado</p></figcaption></figure>
<figure data-mobile-shot="tablet"><a href="../../../assets/mobile/en/ipad-add-provider.webp"><img src="../../../assets/mobile/en/ipad-add-provider.webp" alt="Agregar pantalla de proveedor en Cherry Studio Mobile en iPad"></a><figcaption><p><strong>iPad · Interfaz en inglés</strong> · El mismo catálogo de proveedores en el diseño de tableta.</p></figcaption></figure>
</div>

## Agregar un proveedor integrado

1. Abra **Configuración → Servicio modelo** y toque el botón Agregar.
2. Busque un proveedor y toque **Agregar**. Las entradas integradas proporcionan configuraciones de conexión comunes.
3. Ingrese la clave API de ese proveedor. Mantenga la dirección sugerida y la opción API a menos que el proveedor indique lo contrario.
4. Guarde, busque la lista de modelos, seleccione los modelos que desee y confirme. Si la lista no está disponible, agregue un modelo manualmente.
5. Finalice la configuración y verifique el interruptor del proveedor en la lista de servicios del modelo. Actívelo si permanece deshabilitado y luego seleccione el modelo en una conversación.

Edite un proveedor existente en lugar de agregarlo nuevamente. Puede desactivar un proveedor temporalmente y volver a activarlo más tarde.

## Agregar un proveedor personalizado

Utilice un proveedor personalizado cuando su plataforma no esté en el catálogo o proporcione una dirección dedicada.

1. Elija **Proveedor personalizado** e ingrese un nombre reconocible.
2. Seleccione el formato API documentado por la plataforma. OpenAI, Anthropic y Gemini describen formatos de conexión; Elija el que admita su plataforma.
3. Ingrese **URL base**, la dirección base utilizada para conectarse al servicio y su clave API.
4. Revise el **URL de solicitud** que se muestra y guárdelo.
5. Obtenga modelos o agregue manualmente la identificación exacta del modelo desde la plataforma. Regrese a la lista de proveedores y active su interruptor si es necesario.

### ¿Qué dirección va en la URL base?

Utilice la dirección base del proveedor, como `https://api.example.com/v1`. No utilice su página de inicio de sesión/panel ni pegue una URL de solicitud completa que termine en `/chat/completions`. La aplicación agrega la ruta de solicitud; incluirlo dos veces provoca una dirección incorrecta. Las URL completas reconocidas muestran una sugerencia de corrección.

Algunas puertas de enlace requieren una dirección sin una versión API insertada automáticamente. Cuando el proveedor lo requiera, agregue `#`, por ejemplo `https://api.example.com#`, y verifique la vista previa de la URL de solicitud. De lo contrario, deja el marcador fuera.

Un proveedor que admita varias API puede tener direcciones independientes y un API predeterminado. Cambiar el valor predeterminado puede afectar a los modelos que lo siguen; Lea la confirmación antes de continuar.

## Editar un proveedor y administrar claves

Abra la pestaña **Configuración** del proveedor para editar su nombre, dirección y claves. Las notas clave opcionales, como "Personal" o "Copia de seguridad", son etiquetas de identificación y no cambian los permisos.

* Agregue una clave por entrada. Las claves se pueden editar, habilitar, deshabilitar o eliminar por separado; no pegue varios en un solo campo.
* Cerrar un editor de claves mantiene los cambios en el borrador de la página. Toque la acción **Guardar** de la página para guardar la dirección y las claves juntas.
* Mantenga habilitada al menos una clave válida. Un proveedor con todas las claves deshabilitadas no puede realizar solicitudes normales.
* Un mensaje de descarte de cambios significa que todavía hay ediciones sin guardar.

Las solicitudes de chat admitidas pueden probar con otra clave habilitada después de un error de autorización o límite de velocidad, siempre que no se haya iniciado ninguna respuesta. Esto no cubre todos los errores, generación de imágenes o solicitudes de lista de modelos, y no aumenta los créditos de la cuenta.

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/provider-config.webp"><img src="../../../assets/mobile/en/provider-config.webp" alt="Guarde los cambios del proveedor con el botón superior derecho; Las claves que se muestran son ejemplos que no funcionan."></a><figcaption><p><strong>iPhone · Interfaz en inglés</strong> · Guarde los cambios de proveedor con el botón superior derecho; Las claves que se muestran son ejemplos que no funcionan.</p></figcaption></figure>
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/provider-key.webp"><img src="../../../assets/mobile/en/provider-key.webp" alt="Las notas clave ayudan a identificar cuentas; guarde el proveedor después de cerrar esta hoja"></a><figcaption><p><strong>iPhone · Interfaz en inglés</strong> · Las notas clave ayudan a identificar cuentas; guarde el proveedor después de cerrar esta hoja</p></figcaption></figure>
</div>

## Verifique la conexión

Guarde primero, abra **Verificación del modelo**, seleccione un modelo y ejecute la verificación. La página muestra la dirección de la solicitud y el resultado.

El éxito se aplica a esa configuración y al modelo seleccionado, no a todos los modelos de la plataforma. Verificar una conexión no habilita al proveedor; verifique su interruptor en la lista de proveedores.

## Elija modelos y valores predeterminados

El selector de modelo de conversación cambia el modelo del agente actual. El proveedor debe estar habilitado y el modelo disponible. Busque o utilice los filtros **Todos**, **Gratis** y **Imagen** para limitar la lista. Si los modelos desaparecen, regrese a **Todos**.

La visión refleja el soporte de entrada de imágenes grabadas; Gratis refleja los precios registrados. Las capacidades reales, las asignaciones gratuitas y las cuotas dependen del proveedor.

En **Configuración → Modelo predeterminado**, seleccione los modelos predeterminados y de dibujo. Seleccionar o borrar guarda inmediatamente. Los agentes existentes conservan sus propias opciones de modelos; cambiar el valor predeterminado global no actualiza todos los agentes.

## Guías relacionadas

* [Agregar, editar y administrar modelos](model-management.md): capacidades, límites, precios y eliminación.
* [Información del modelo y actualizaciones de la lista](model-updates.md): actualizaciones automáticas versus sincronización manual.
* [Importar configuración desde el escritorio](desktop-sync.md): reutiliza una configuración existente.
* [Solución de problemas](troubleshooting.md): errores de conexión y recuperación.
