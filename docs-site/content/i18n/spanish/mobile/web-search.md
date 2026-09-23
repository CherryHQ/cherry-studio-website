---
icon: search
---

# Búsqueda web y lectura de páginas

La búsqueda encuentra páginas relevantes; La lectura de páginas extrae el contenido de un enlace. Pueden utilizar diferentes servicios.

## Intenta una búsqueda

1. Elija un modelo de texto que admita llamadas a herramientas y habilite **Búsqueda web** en el editor del agente actual.
2. Pregunte "Busque los lanzamientos recientes de este proyecto e incluya fuentes" o "Lea este enlace y resuma los puntos principales: [URL]".
3. Inspeccionar el proceso y las fuentes de la herramienta; abra una fuente para leer la página original.

Las instalaciones nuevas normalmente seleccionan ExaMCP para la búsqueda y Jina para la lectura de páginas sin necesidad de una clave personal. Los usuarios existentes conservan sus selecciones. Los servicios predeterminados aún dependen de la conectividad y los límites del servicio.

El campo de mensaje actual no tiene un interruptor de búsqueda web independiente. Habilite **Búsqueda web** en el editor del agente, configure los servicios y luego solicite una búsqueda en su mensaje. Busque fuentes y actividad de herramientas reales en lugar de confiar en que el modelo diga que buscó.

## Cambiar servicios de búsqueda o lectura

Abra **Configuración → Búsqueda web**:

* **Proveedor de búsqueda:** busca páginas utilizando palabras clave.
* **Proveedor de recuperación de URL:** lee el contenido de un enlace web específico.

Elija un servicio, ingrese la clave/dirección solicitada y use **Verificar** antes de enviar un mensaje nuevo. La selección del servicio se guarda inmediatamente. Los campos clave API se confirman cuando finaliza la edición; esté atento a los errores. Las selecciones avanzadas/entradas numéricas también se guardan sin una página separada para guardar la acción.

Las claves del proveedor de modelos y las claves del servicio de búsqueda suelen estar separadas. La búsqueda de Zhipu enlaza con la configuración de su proveedor de modelos para la configuración de claves; Otros servicios utilizan sus propios formularios.

<div data-mobile-gallery="single">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/web-search.webp"><img src="../../../assets/mobile/en/web-search.webp" alt="La búsqueda y la lectura de páginas tienen proveedores separados; valores predeterminados mostrados"></a><figcaption><p><strong>iPhone · Interfaz en inglés</strong> · La búsqueda y la lectura de páginas tienen proveedores separados; valores predeterminados mostrados</p></figcaption></figure>
</div>

## Configuraciones avanzadas

Mantenga los valores predeterminados inicialmente y luego ajústelos según una necesidad específica.

| Configuración | Propósito | Compensación |
| --- | --- | --- |
| Recuento de resultados | Número de resultados de búsqueda | Más perspectivas también significan más material para procesar |
| Compresión de resultados | Si el contenido de búsqueda se acorta | El corte reduce el uso; Sin compresión no significa capacidad ilimitada del modelo. |
| Contenido total de búsqueda | Limita la cantidad de texto retenido | Los límites inferiores pueden omitir detalles posteriores. |

La lectura de páginas también tiene límites separados. Las páginas largas sólo se pueden leer parcialmente. Abra el original cuando verifique los detalles; repetir la misma búsqueda no recupera automáticamente el siguiente segmento.

## El chat funciona, pero la búsqueda no.

El modelo de chat, el servicio de búsqueda y el servicio de lectura se conectan por separado. Comprobar:

1. Si el modelo admite llamadas a herramientas y si el conmutador **Búsqueda web** del agente está habilitado.
2. Si el servicio seleccionado pasa la verificación de configuración.
3. Si su solicitud solicita claramente una búsqueda y proporciona palabras clave o un enlace.
4. Errores de herramientas por problemas de red, claves, permisos, cuotas o acceso a páginas.

Después de un error de búsqueda o lectura de página, esa respuesta deja de iniciar nuevos intentos web y utiliza información ya obtenida siempre que sea posible. No cambia silenciosamente de proveedor. Solucione el problema y envíe un mensaje nuevo para intentarlo nuevamente.

## ¿Por qué no puede leer una página que requiere iniciar sesión?

Los servicios de lectura acceden a los enlaces desde su propia red y no utilizan la sesión iniciada en el navegador de su teléfono. Es posible que no se pueda acceder a las páginas restringidas o que requieren iniciar sesión.

Utilice el [complemento correspondiente](plugins.md) para los recursos Feishu o Notion, o adjunte una exportación autorizada usando [chat y archivos](chat-and-files.md).

## ¿A dónde van los datos?

Las palabras clave de búsqueda y las URL de destino van al servicio de búsqueda/lectura seleccionado. El material devuelto es utilizado por el modelo. Evite incluir claves o información privada que no pertenezca a una búsqueda web. Ver [datos y privacidad](data-privacy.md).
