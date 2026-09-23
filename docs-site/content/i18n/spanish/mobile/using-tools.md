---
icon: wrench
---

# Usar herramientas con la IA

Las herramientas permiten a un agente recuperar información o realizar una acción: leer una página web, consultar su calendario o guardar una respuesta como un archivo. Luego, el modelo utiliza el resultado para continuar su respuesta. No es necesario que recuerde los nombres de las herramientas: describa el material, la tarea y el resultado que desea.

## ¿Qué herramienta necesito?

| tu tarea | que preparar | Guía |
| --- | --- | --- |
| Investigar o leer páginas web. | Habilite la capacidad web del agente y configure los servicios de búsqueda y lectura. | [Búsqueda web y lectura de páginas](web-search.md) |
| Consulta horarios, crea eventos o gestiona tareas pendientes | Habilite el calendario o los recordatorios y otorgue permisos del sistema | [Calendario y recordatorios](calendar-and-reminders.md) |
| Obtenga su ubicación actual o resuma la actividad registrada | Habilitar y autorizar la capacidad del dispositivo; el estado de salud es solo iOS | [Registros de ubicación y salud](location-and-health.md) |
| Guarde una lista de verificación, tabla o página web | Seleccione un modelo de texto que admita llamadas a herramientas | [Crear y editar archivos](file-generation.md) |
| Convierta un archivo HTML en una imagen o presentación | Abra el archivo HTML guardado y use su menú para compartir | [HTML a imagen y PPT](html-export.md) |
| Leer o actualizar material en Feishu, Notion y otros servicios. | Conecte el complemento con una cuenta que pueda acceder al material. | [Complementos y herramientas externas](plugins.md) |
| Pídale a un agente de texto que genere una imagen | Habilitar la generación de imágenes y configurar un modelo de dibujo. | [Generación de imágenes](image-generation.md) |
| Utilice un servicio de herramienta remota que alguien proporcione | Agregue un servidor MCP y habilítelo en un agente guardado | [Configuración de herramienta personalizada](plugins.md) |

Las acciones basadas en modelos necesitan un modelo que realmente admita llamadas a herramientas. La conversión manual de un archivo HTML guardado no. Verificar un indicador de capacidad en el editor de modelos no puede agregar soporte del que carece el modelo.

## Pruebe una pequeña tarea primero

1. Seleccione un modelo de texto que admita llamadas a herramientas.
2. Edite el agente actual y habilite la capacidad que necesita en su sección **Sistema**. La lectura y escritura de archivos no tienen un interruptor de capacidad del sistema independiente.
3. Conecte una cuenta para complementos u otorgue permiso cuando utilice las capacidades del dispositivo. La activación de una capacidad en el agente y el permiso correspondiente del sistema son requisitos separados.
4. Solicite una tarea específica, inspeccione el resultado y luego continúe.

Comience con:

> Primero enumere los calendarios grabables en mi teléfono, luego lea los eventos de mañana. Ordénalos por hora de inicio y nombra el calendario para cada uno. No crees ni cambies nada.

Después de que obtenga el resultado, reemplace Personal a continuación con un calendario grabable real del resultado. Si no hay ninguno disponible, primero configure uno en el calendario del sistema:

> En el calendario personal que acaba de incluir, cree "Organizar materiales" mañana de 3:00 a 3:30 p. m., hora de Beijing. Dime si se guardó correctamente.

Las solicitudes separadas le ayudarán a confirmar el objetivo. Para que la aplicación solicite aprobación antes de las acciones elegibles, cambie también el modo de aprobación del agente a **Preguntar cuando sea necesario**. Una instrucción escrita para preguntar primero no reemplaza esa configuración.

## Haga solicitudes específicas

Incluya **dónde está el material → la fecha o rango de contenido → la acción → el formato de salida → si se deben realizar cambios ahora**.

* "Lea este documento Feishu: [enlace]. Resuma solo la sección dos como propietario, tarea y fecha límite. Marque los detalles que faltan como no confirmados. No cree tareas todavía".
* "Convierta mi lista de verificación adjunta en un archivo CSV con columnas de artículo, cantidad y notas. Guárdelo como pack-list.csv".
* "Utilice Amap para comparar rutas de transporte público desde la Plaza del Pueblo en Shanghai hasta la estación de tren de Hongqiao. Incluya transbordos y duración estimada. No lea la ubicación de mi teléfono".

Una tarea puede combinar archivos, páginas web, calendarios y complementos, pero todas las capacidades deben estar disponibles. Leer un documento no otorga permiso para crear tareas; obtener su ubicación no conecta un servicio de planificación de rutas.

## ¿Por qué sólo algunas acciones piden aprobación?

| acción | Con Preguntar cuando sea necesario |
| --- | --- |
| Búsqueda integrada, lectura de archivos y lectura de datos de dispositivos autorizados | Generalmente se ejecuta directamente |
| Creación y edición de archivos de texto integrados | Se ejecuta directamente; este modo no solicita cada cambio de archivo |
| Crear, actualizar o eliminar eventos y recordatorios del sistema | Requiere aprobación de herramienta |
| Complementos y herramientas personalizadas | Sigue las reglas de la herramienta y puede requerir aprobación. |
| Generación de imágenes a través de un modelo de texto. | Siempre requiere aprobación, incluso en el modo Aprobar automáticamente |

**Aprobar automáticamente** aprueba acciones elegibles, mientras que los permisos de la cuenta y del sistema aún se aplican. Actualmente, los nuevos agentes utilizan este modo de forma predeterminada. Consulte [Agentes y herramientas](agents-and-tools.md).

## ¿Cómo sé que la tarea terminó?

Las operaciones de la herramienta aparecen en los detalles del proceso de la respuesta. Preparar contenido, esperar aprobación o pedirle que continúe en una aplicación del sistema no significa que la acción esté completa.

* **Lectura exitosa:** verifique la fuente y el rango de consulta antes de confiar en el resumen. Un resultado vacío no siempre significa que no existan registros.
* **Se creó un archivo:** abra su tarjeta de archivo o búsquelo en Archivos en la barra lateral. Un bloque de código o una frase que diga "creado" no establece que se haya guardado un archivo.
* **Un cambio externo se realizó correctamente:** verifique el resultado de la herramienta y, cuando sea necesario, el calendario, documento o tarea de destino.
* **Solo una parte tuvo éxito:** identifica las acciones completadas y finaliza solo lo que queda.

## ¿Qué pasa si se detiene o falla?

| lo que ves | Siguiente paso |
| --- | --- |
| Una respuesta de texto sin llamada de herramienta | Solicitar explícitamente leer o guardar; Verifique el modelo, los interruptores de capacidad y las conexiones. |
| Esperando aprobación | Revisar el objetivo y la acción, luego permitir o rechazar; El permiso del sistema puede ser un paso separado. |
| Permiso insuficiente | Resuélvelo en la configuración del sistema o en el servicio; reformular la solicitud no puede otorgar acceso |
| La búsqueda o la lectura fallaron | Verifique el problema de red, enlace o cuenta reportado y pruebe con un rango más limitado |
| Se agotó el tiempo de espera de una escritura con un resultado incierto | Verifique el servicio de destino antes de volver a intentarlo para evitar duplicados |
| Android abrió la aplicación de calendario | Revisa y finaliza la acción allí; abrir un formulario no confirma el guardado |

Detener una respuesta, eliminar un chat o regenerar una respuesta no deshace las acciones externas completadas. El material recuperado también puede enviarse al modelo seleccionado. Consulte [Datos, privacidad y permisos](data-privacy.md).
