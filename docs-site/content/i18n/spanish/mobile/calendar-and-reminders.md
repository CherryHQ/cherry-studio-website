---
icon: calendar
---

# Calendario y recordatorios

Los calendarios se adaptan a actividades con horas de inicio y finalización. Los recordatorios se adaptan a las cosas que necesitas completar. Pídale a su agente que verifique primero los elementos existentes y luego cree o actualice el correcto.

Las herramientas de calendario integradas utilizan calendarios accesibles a través del sistema de su teléfono en iOS y Android. Actualmente, los recordatorios integrados solo admiten iOS. Feishu, DingTalk y otros servicios utilizan sus propios [complementos](plugins.md); otorgar acceso al calendario del teléfono no conecta esas cuentas.

## Antes de empezar

1. Seleccione un modelo de texto que admita llamadas a herramientas.
2. Edite el agente actual y habilite **Calendario** o **Recordatorios** en su sección **Sistema**.
3. Otorgue permiso cuando se le solicite o verifique el acceso en **Configuración → Permisos del sistema**.
4. Para revisar la creación, los cambios y la eliminación antes de la ejecución, establezca el modo de aprobación del agente en **Preguntar cuando sea necesario**.

Los permisos de lectura y escritura pueden diferir. Poder crear un evento no implica acceso para leer todos los eventos. Un calendario de solo lectura no puede aceptar eventos nuevos o actualizados.

## Consulta el horario de mañana

Identifique primero el calendario, especialmente con varias cuentas o nombres duplicados:

> Enumera los calendarios disponibles en mi teléfono y dime cuáles se pueden escribir. No hagas cambios.

Luego especifique un rango:

> Lea los eventos de mañana en mi calendario laboral. Ordene por hora y enumere el inicio, el final, el título y la ubicación.

Cada consulta cubre como máximo 90 días y devuelve como máximo 200 eventos o recordatorios. Para colecciones más grandes consultar por semana o mes. Es posible que una lista devuelta no contenga todos los registros.

## Crear un evento

> En mi calendario personal, cree "Organizar detalles del viaje" mañana de 15:00 a 15:30, hora de Beijing. Establezca la ubicación en Casa y las notas en "Consultar boletos y alojamiento".

Especifique la **fecha, zona horaria, hora de inicio y finalización y calendario**. Las zonas explícitas, como la hora de Beijing o la hora local de Tokio, ayudan con los viajes y las reuniones remotas.

Después de guardar, pídale al agente que vuelva a leer ese rango de tiempo para confirmar que el evento existe. Si el resultado es incierto, consulte el calendario del sistema antes de volver a intentarlo.

### ¿Puede invitar personas, repetir eventos o establecer alertas anticipadas?

Las herramientas integradas actuales no exponen las invitaciones de los asistentes, las reglas de recurrencia ni una configuración de alerta anticipada separada. Un evento con título de reunión no envía invitaciones automáticamente. Configure estos detalles en el calendario del sistema o utilice un complemento de un servicio de trabajo que ofrezca la función necesaria.

## Actualizar o eliminar un evento existente

Busque e identifique el evento antes de cambiarlo:

> Encuentre el evento “Organizar detalles del viaje” de mañana a las 15:00 en mi calendario personal. Dime primero su hora y ubicación actuales.

Después de comprobar:

> Mueva ese evento a las 16:00-16:30. Mantenga la ubicación y las notas sin cambios.

Antes de eliminar, verifique también el título, la fecha y el calendario. Eliminar el chat no restaura un evento eliminado.

## Administre tareas pendientes con recordatorios en iOS

| Objetivo | Solicitud de ejemplo |
| --- | --- |
| Elige una lista | "Haga una lista de mis listas de recordatorios y dígame cuáles se pueden escribir". |
| Agregar un artículo | "Agregue 'Enviar paquete' a Personal, que vence mañana a las 9 a. m., hora de Beijing, con la nota 'Traiga el recibo de devolución'". |
| Encuentra artículos sin terminar | "Enumere los recordatorios incompletos de esta semana en Personal, organizados por hora de vencimiento". |
| cambiar la fecha | "Mueva la hora de vencimiento del elemento 'Enviar paquete' que acabamos de verificar a las 2 p.m. de mañana. Guarde todo lo demás". |
| Completar un artículo | "Marque el recordatorio de 'Enviar paquete' como completado". |
| Eliminar un elemento | "Elimine solo el elemento 'Enviar paquete' que acabamos de confirmar, dejando otros elementos con ese nombre". |

Al completar un elemento, éste se conserva con un estado modificado; al eliminarlo se elimina. Las herramientas pueden establecer fechas de inicio, fechas de vencimiento y notas escritas. Si necesita una notificación programada, confirme la configuración de alerta y los permisos de notificación en la aplicación Recordatorios del sistema.

**Una ubicación escrita en un recordatorio es una nota, no una alerta activada por la llegada.** Configure repeticiones complejas o activadores de ubicación en la aplicación del sistema. Los resultados filtrados por fecha no son necesariamente la lista completa; Verifique los elementos sin fecha allí también.

## ¿Por qué Android abre el calendario del sistema?

Cuando algunos dispositivos Android no pueden completar una operación directamente, la aplicación puede abrir una página de calendario del sistema:

* **Formulario de creación:** verifique la fecha y el contenido, seleccione el calendario deseado y guárdelo manualmente.
* **Página de evento existente:** inspeccione los valores actuales y aplique los cambios restantes manualmente. Es posible que los cambios solicitados no se completen.

Abrir esa página no le dice a Cherry Studio si la guardó. Si una escritura se agota o su resultado es incierto, es posible que ya se haya completado. Consulta el calendario antes de crear otro evento.

## Falta un calendario o elemento

Primero confirme que la cuenta y el registro existen en la aplicación Calendario o Recordatorios del sistema. Luego verifique los permisos de Cherry Studio, el rango de fechas y el calendario seleccionado. Las restricciones empresariales, las suscripciones de solo lectura o el material no sincronizado con el teléfono pueden limitar el acceso.

Consulte [Permitir que la IA use herramientas](using-tools.md) para conocer el comportamiento de aprobación y [Datos, privacidad y permisos](data-privacy.md) para conocer el acceso al sistema y el uso de datos.
