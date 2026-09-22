---
icon: key-round
---

# Proveedores y modelos

La aplicación móvil llama a los modelos a través de los proveedores que configures. Cherry Studio aporta la experiencia de cliente: no intermedia crédito de modelos ni modifica los precios ni las políticas de datos del proveedor.

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/iphone-add-provider.webp"><img src="../../../assets/mobile/iphone-add-provider.webp" alt="Pantalla para añadir un proveedor en Cherry Studio Móvil en iPhone"></a><figcaption><p><strong>iPhone</strong> · Busca en el catálogo de proveedores o crea un proveedor personalizado</p></figcaption></figure>
<figure data-mobile-shot="tablet"><a href="../../../assets/mobile/ipad-add-provider.webp"><img src="../../../assets/mobile/ipad-add-provider.webp" alt="Pantalla para añadir un proveedor en Cherry Studio Móvil en iPad"></a><figcaption><p><strong>iPad</strong> · El mismo catálogo de proveedores en la disposición para tableta</p></figcaption></figure>
</div>

## Añadir un proveedor integrado

1. Abre los ajustes del servicio de modelos y selecciona **Añadir proveedor**.
2. Busca y elige el proveedor.
3. Introduce la clave API y los demás valores que exija ese proveedor.
4. Obtén o añade modelos y activa los que vayas a usar.

## Usar un proveedor personalizado

Para un servicio que implemente un formato de API compatible, elige **Proveedor personalizado** e introduce un nombre, un Base URL, una clave API y un identificador de modelo. El Base URL debe ser la dirección de la API indicada en la documentación del proveedor, no la URL de su panel de control.

## Elegir un modelo

Abre el selector de modelos desde una conversación o un agente para cambiar entre los modelos activados. La comprensión de imágenes, la llamada a herramientas y la generación de imágenes dependen del proveedor y del modelo concreto.

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/iphone-models.webp"><img src="../../../assets/mobile/iphone-models.webp" alt="Selector de modelos en Cherry Studio Móvil en iPhone"></a><figcaption><p><strong>iPhone</strong> · Explora los modelos activados por proveedor</p></figcaption></figure>
<figure data-mobile-shot="tablet"><a href="../../../assets/mobile/ipad-models.webp"><img src="../../../assets/mobile/ipad-models.webp" alt="Selector de modelos en Cherry Studio Móvil en iPad"></a><figcaption><p><strong>iPad</strong> · Consulta las capacidades del modelo y la información de contexto</p></figcaption></figure>
</div>

## Errores de conexión habituales

* **401 / no autorizado**: comprueba que la clave API esté completa, que no haya caducado y que la cuenta tenga permisos.
* **404 / modelo no encontrado**: revisa el Base URL y el identificador del modelo; no uses el nombre visible en lugar del identificador.
* **429 / demasiadas solicitudes**: espera a que se restablezca el límite de velocidad y revisa el saldo y las cuotas del proveedor.
* **Tiempo de espera agotado o fallo de red**: asegúrate de que tu red actual puede llegar al proveedor y revisa la configuración del proxy.
