---
icon: bot
---

# Agentes y herramientas

Un agente guarda un nombre, avatar, instrucciones, modelo y preferencia de aprobación de herramientas. Cree agentes separados para escribir, aprender o trabajar, luego inicie conversaciones independientes para temas individuales.

<div data-mobile-gallery="single">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/agent-edit.webp"><img src="../../../assets/mobile/en/agent-edit.webp" alt="Guarde instrucciones recurrentes y elija un modelo y modo de aprobación; agente de ejemplo mostrado"></a><figcaption><p><strong>iPhone · Interfaz en inglés</strong> · Guarde instrucciones recurrentes y elija un modelo y modo de aprobación; agente de ejemplo mostrado</p></figcaption></figure>
</div>

## Crear un agente reutilizable

1. Abra la lista de agentes y toque agregar, o cree uno desde el selector de agentes del encabezado de la conversación.
2. Ingresa un nombre, elige un avatar y describe cómo debería funcionar.
3. Seleccione su modelo. Las acciones de búsqueda, complementos y calendario necesitan un modelo de texto que admita la llamada a herramientas.
4. Elija la aprobación de la herramienta y habilite las capacidades requeridas en Sistema. Agregue herramientas personalizadas después de guardar si es necesario.
5. Toca **Guardar**. Crear desde el selector de chat abre una nueva conversación; la creación desde la lista de administración regresa allí.

Instrucciones de ejemplo:

> Ayudar a organizar mis materiales de trabajo. Comience con un resumen de tres oraciones y luego enumere los elementos de acción. Marque los propietarios y las fechas límite que faltan como "Para confirmar" en lugar de inventarlos. Responde en inglés.

Guarde reglas recurrentes en instrucciones; adjunte la tarea actual y los documentos en el chat. No almacene claves ni contraseñas en las instrucciones del agente.

## ¿Es necesario guardar las ediciones?

**Para crear un agente es necesario Guardar. La edición de un agente existente se guarda automáticamente.**

El nombre y las instrucciones se guardan después de una breve pausa al escribir; Los cambios de avatar, modelo y aprobación se guardan inmediatamente. Un guardado fallido conserva el borrador en el editor abierto y ofrece Reintentar. Resuelva el error antes de salir.

Un agente se puede guardar sin un modelo, pero no puede iniciar una conversación hasta que elija un modelo disponible.

## Modos de aprobación

| Modo | Comportamiento |
| --- | --- |
| Confirmar cuando sea necesario | Pregunta sólo cuando las reglas de una herramienta lo requieren; algunas lecturas pueden proceder directamente |
| Aprobación automática | Aprueba operaciones elegibles, preservando al mismo tiempo los permisos del sistema, las restricciones de herramientas deshabilitadas y los límites de datos accesibles. |

Los agentes nuevos, incluido el agente inicial Cherry, actualmente tienen de forma predeterminada **Aprobación automática**. Los agentes existentes mantienen su configuración. Elija Confirmar cuando sea necesario si desea confirmación de cambios en el calendario, eliminación de recordatorios o acciones de herramientas externas que requieren aprobación.

La aprobación no puede hacer que una herramienta no disponible sea utilizable. La **herramienta de generación de imágenes llamada por un modelo de texto aún requiere confirmación cada vez**, porque consume créditos del proveedor. Seleccionar directamente un modelo de imagen y presionar Generar es un flujo de trabajo separado.

Cuando aparezca una aprobación, inspeccionar la acción y permitirla o negarla. Las herramientas denegadas no se ejecutan; el agente podrá responder a partir de la información existente. Una solicitud de permiso del sistema operativo aún puede seguir a la aprobación de la aplicación.

## Herramientas del sistema en su dispositivo

Utilice la sección **Sistema** del editor de agentes para elegir sus capacidades: búsqueda web, generación de imágenes, calendario, recordatorios, salud y ubicación. Solo aparecen las capacidades admitidas por la plataforma y el dispositivo.

* Los agentes creados a través del editor comienzan con el calendario, los recordatorios, la salud y la ubicación deshabilitados. Habilítelos según sea necesario; Los agentes existentes conservan su configuración.
* Estos cambios afectan al agente actual. Al deshabilitar la búsqueda web se eliminan las herramientas integradas de búsqueda y lectura de páginas; Al desactivar la generación de imágenes se elimina la herramienta de dibujo incorporada que se utiliza en las conversaciones de texto. Administre complementos y herramientas MCP personalizadas por separado en sus propias configuraciones.
* Habilitar un interruptor no otorga permiso al sistema. Apruebe el acceso cuando se solicite, utilice **Administrar permisos del sistema** o abra **Configuración → Permisos del sistema**.
* Los cambios de agentes existentes se guardan automáticamente y se aplican a solicitudes posteriores. No deshacen una operación que ya está en curso.

| Capacidad | Ejemplo | Disponibilidad |
| --- | --- | --- |
| Calendario | “Enumerar los eventos de mañana”; “Crea una reunión de 30 minutos mañana a las 3 p. m.” | iOS y Android, sujetos a acceso de lectura/escritura y soporte del sistema |
| Recordatorios | “Recuérdame mañana a las 9 am enviar el paquete por correo” | Permisos de recordatorio iOS; no se ofrece actualmente en Android |
| Registros de salud | "Resumir los pasos y entrenamientos registrados esta semana" | iOS, para tipos de datos autorizados individualmente; no se ofrece actualmente en Android |
| Ubicación actual | “Obtén mi ubicación actual y luego ayúdame a planificar una ruta” | iOS y Android, con permiso de ubicación |
| Archivos de aplicación | “Guarde ese resumen como un archivo” | Adjuntos y archivos generados accesibles a la conversación. |

Algunas operaciones de escritura en el calendario de Android abren un formulario del sistema que debe completar. Abrirlo no significa que se haya guardado un evento. Los resultados de salud vacíos pueden indicar que no hay registros o que falta el permiso para ese tipo de datos.

Las herramientas no pueden inspeccionar libremente todos los archivos del teléfono, hacerse cargo de otras aplicaciones ni operar su computadora de forma remota.

<div data-mobile-gallery="single">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/agent-capabilities.webp"><img src="../../../assets/mobile/en/agent-capabilities.webp" alt="Habilite las capacidades para este agente y administre los permisos del sistema cuando sea necesario"></a><figcaption><p><strong>iPhone · Interfaz en inglés</strong> · Habilite capacidades para este agente y administre permisos del sistema cuando sea necesario</p></figcaption></figure>
</div>

## ¿Dónde configuro otras herramientas?

* **Búsqueda web:** configure los servicios de búsqueda/lectura de páginas en Configuración y luego solicite buscar en el chat. Consulte [búsqueda web](web-search.md).
* **Complementos:** conecta cuentas como Feishu o Notion en la barra lateral. Los complementos conectados están disponibles en las conversaciones; **＋ → Complementos** puede nombrar uno explícitamente. Consulte [complementos](plugins.md).
* **MCP personalizado:** MCP conecta servicios de herramientas adicionales. Agregue un servidor en Configuración, luego habilítelo en el editor del agente guardado. Consulte [herramientas personalizadas](plugins.md).
* **Dibujo:** elija un modelo de dibujo en **Configuración → Modelo predeterminado** y habilite **Generación de imágenes** para que el agente suministre su herramienta de dibujo. También puede seleccionar un modelo de imagen directamente.

## ¿Por qué una herramienta no está disponible después de la autorización?

Verifique el soporte de llamadas de herramientas del modelo, los interruptores de capacidad del agente, la conexión, la habilitación del servidor/herramienta y los permisos del sistema. Las cuentas de complementos también pueden estar limitadas por la política de la organización o el acceso a los recursos.

Proporcione un objetivo claro: un enlace a un documento, un intervalo de fechas o un nombre de calendario. Comience pidiéndole al agente que lea y enumere los elementos relevantes, luego solicite cambios una vez que el objetivo esté claro.

Para conocer pasos prácticos y solicitudes de ejemplo, consulte [Permitir que la IA use herramientas](using-tools.md), [Calendario y recordatorios](calendar-and-reminders.md), [Registros de ubicación y salud](location-and-health.md) y [Crear y editar archivos](file-generation.md).
