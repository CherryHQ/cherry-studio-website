---
icon: circle-help
---

# Solución de problemas

Para problemas de conexión, comience con un mensaje corto sin archivos adjuntos para delimitar la causa.

## ¿Por qué no puedo chatear inmediatamente después de la instalación?

Configure una clave API, agregue un modelo, habilite su proveedor y elíjalo para su agente. Puede [importar la configuración del escritorio](desktop-sync.md) o seguir el [inicio rápido](quick-start.md).

Es posible que la suscripción de chat para consumidores de una plataforma no incluya créditos API para otras aplicaciones; consultar con la plataforma.

## Mi proveedor existe, pero el selector de modelo está vacío

Compruebe que el proveedor y el modelo estén habilitados, así como el tipo de modelo y los filtros. Los modelos de embeddings (representaciones vectoriales) y de reranking (reordenación por relevancia) no son modelos de chat ordinarios. Los selectores de texto e imagen pueden mostrar modelos distintos. Vuelva a Todos y espere a que termine la primera descarga de información de los modelos.

Si no se agrega ningún modelo, [sincronizar o agregar manualmente](model-management.md).

## ¿Las actualizaciones del modelo sobrescribirán las claves o las configuraciones personalizadas?

Las actualizaciones de la información de los modelos no cambian las direcciones ni las claves de los proveedores, ni los ajustes personalizados que haya guardado para los modelos. Los campos que siguen los valores predeterminados pueden recibir información nueva.

**La sincronización del proveedor de escritorio reemplaza las direcciones y claves del proveedor seleccionado.** Consulte [actualizaciones de modelo](model-updates.md) e [importación de escritorio](desktop-sync.md).

## La sincronización falla, pero el chat funciona

La lista de modelos API está separada del chat y una plataforma puede admitir solo este último. Agregue su ID de modelo exacto manualmente y verifique la conexión. El descubrimiento fallido no borra los modelos existentes.

No devuelto no significa necesariamente descontinuado; consulte [sincronización de modelos](model-updates.md).

## ¿Qué significan los errores de conexión?

| error | comprobar primero |
| --- | --- |
| 401 / No autorizado | Clave completa, válida, guardada y habilitada |
| 403 / Prohibido | Acceso a cuenta, región, modelo u organización |
| 404 / No encontrado | Dirección base, API, ID de modelo exacto, rutas de solicitud duplicadas |
| 429 / Demasiadas solicitudes | Límites de frecuencia de las solicitudes y créditos; esperar en lugar de enviar repetidamente |
| Fallo de red/tiempo de espera | Accesibilidad del proveedor, proxy y estado del servicio |
| Contexto/solicitud demasiado grande | Reduzca los archivos adjuntos/historial o elija un modelo adecuado; elevar los límites configurados por sí solo no ayuda |

Los proveedores pueden utilizar diferentes códigos. Lea los detalles del error y las instrucciones de la plataforma. Consulte [configuración del proveedor](providers-and-models.md).

## ¿Por qué no surtió efecto una configuración modificada?

* Las direcciones/claves de proveedores y la creación/edición de modelos requieren la acción Guardar/Agregar de la página.
* Las ediciones de agentes existentes, la selección de modelo global y la selección de API en las listas de modelos se guardan automáticamente; Busque avisos de falla.
* Guarde los cambios de proveedor antes de comprobar la conexión o sincronizar el modelo.
* Un cambio global en el modelo predeterminado no actualiza todos los agentes existentes.

Consulte [gestión de modelos](model-management.md) y [edición de agentes](agents-and-tools.md).

## ¿Por qué no puedo eliminar un modelo?

Primero se debe cambiar o borrar un valor predeterminado global en **Configuración → Modelo predeterminado**. Eliminar otro modelo utilizado por un agente significa elegir un reemplazo para ese agente.

## Puedo obtener una vista previa de una imagen, pero no puedo enviarla.

La compatibilidad con la vista previa y la entrada de modelos difiere. Elija un modelo con capacidad de visión y verifique el formato, el número de imágenes y el tamaño. Alternar un indicador de capacidad de imagen no puede agregar visión a un modelo de solo texto.

Consulte [chat y archivos](chat-and-files.md) para archivos PDF escaneados, texto de documentos vacíos y archivos adjuntos de gran tamaño.

## ¿Dónde están el interruptor de búsqueda web y el botón de complementos?

El interruptor de búsqueda web está en el editor del agente; habilitarlo, configurar servicios y solicitar una búsqueda en el chat. Los complementos aparecen en el campo de mensaje solo cuando existen conexiones utilizables.

Los complementos conectados se pueden usar directamente o nombrar a través de **＋ → Complementos**. Consulte [búsqueda web](web-search.md) y [conexiones de complementos](plugins.md).

## La autorización del complemento sigue esperando

Regrese a Cherry Studio, verifique el estado y confirme la cuenta/espacio de trabajo. Reabrir la autorización o verificar nuevamente; reiniciar una solicitud caducada. Los permisos de organización faltantes deben gestionarse en el servicio.

Las acciones DingTalk deben solicitarse nuevamente después de una autorización adicional. Los enlaces WeCom deben abrirse en WeCom antes de que caduquen. Consulte [complementos](plugins.md).

## ¿Por qué solo puedo volver a intentar la última respuesta?

Reintentar reemplaza la última respuesta existente. Utilice una rama para cambiar de dirección antes. Reintentar/eliminar no revierte las acciones externas; volver a intentarlo puede costar más. Consulte [acciones de respuesta](chat-and-files.md).

## ¿La compactación del contexto elimina mi conversación?

La historia visible permanece. El material anterior está resumido para el modelo y es posible que falten algunos detalles originales. Suministre material clave nuevamente cuando la exactitud sea importante. Ver [conversaciones largas](chat-and-files.md).

## ¿Por qué las imágenes exportadas están divididas y el código está incompleto?

Las exportaciones de imágenes largas se exportan de forma predeterminada a páginas; Está disponible una opción de una sola imagen larga. Los paneles de código muestran una vista previa limitada en imágenes. Elija HTML o Markdown para obtener el código completo. Un error de conversión puede cambiar el formato disponible, así que inspeccione la vista previa y la etiqueta de formato.

Consulte [compartir y exportar](sharing-and-export.md) para selección, marca de agua, contenido de pensamiento y archivos.

## La generación en segundo plano se detiene o faltan notificaciones

Verifique **Configuración → Notificaciones** y el permiso del sistema. El sistema operativo aún puede restringir el trabajo en segundo plano. Inspeccione la conversación/dibujo antes de volver a intentarlo. Consulte [respuestas en segundo plano](settings-and-usage.md).

## ¿El emparejamiento sincroniza automáticamente el historial de chat?

No. Importa la configuración del proveedor seleccionado y los modelos habilitados, excluye chats y no es una sincronización continua. Preservar el contenido importante por separado; consulte [importación de escritorio](desktop-sync.md) y [datos](data-privacy.md).

## Android bloquea la instalación o TestFlight no puede unirse

Utilice la [página de descarga oficial](https://cherryai.com/download?platform=mobile). Es posible que Android necesite permiso para que la aplicación de descarga instale APK. Instale TestFlight antes de abrir su invitación en iPhone/iPad. La capacidad, el vencimiento de la compilación y la disponibilidad del servicio pueden afectar la instalación.

Consulte [descarga e instalación](installation.md).

## Las herramientas no se ejecutan o no se guardó un archivo

* Un modelo solo responde en texto, espera aprobación o informa que le falta permiso: verifique el modelo, las capacidades, la conexión y el acceso en [Permitir que AI use herramientas](using-tools.md).
* Android abre la aplicación de calendario o la escritura de un evento tiene un resultado incierto: siga [Calendario y recordatorios](calendar-and-reminders.md) e inspeccione los registros existentes antes de volver a intentarlo.
* La ubicación falla o los datos de salud están vacíos o son parciales: consulte [Registros de ubicación y salud](location-and-health.md). Un resultado vacío no prueba que no existan registros.
* Obtiene un bloque de código sin un archivo guardado, o las ediciones dejan el original sin cambios: consulte [Crear y editar archivos](file-generation.md).
* Tiene HTML pero quiere un PPT, o no puede editar el texto del PPT individualmente: consulte [HTML a imagen y PPT](html-export.md).

## ¿Cómo informo un problema no resuelto?

Incluya las versiones de la aplicación/dispositivo/sistema, los pasos de reproducción y el texto de error en el [rastreador de problemas del repositorio de aplicaciones](https://github.com/CherryHQ/cherry-studio-app/issues). Primero, elimine las claves, las conversaciones privadas y el contenido de los archivos.
