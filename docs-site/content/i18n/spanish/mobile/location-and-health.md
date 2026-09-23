---
icon: map-pin
---

# Ubicación y registros de salud

La herramienta de ubicación lee la posición actual de su teléfono. Las herramientas de salud resumen los registros de salud iOS existentes. Cada uno necesita el interruptor de capacidad del agente y el permiso del sistema; Aprobar automáticamente no otorga acceso.

## Administrar permisos

Habilite **Ubicación** o **Salud** en la sección **Sistema** del agente actual y luego autorice el acceso cuando se le solicite. También puede verificar los permisos admitidos y su estado en **Configuración → Permisos del sistema**.

<div data-mobile-gallery="single">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/system-permissions.webp"><img src="../../../assets/mobile/en/system-permissions.webp" alt="Permisos del sistema enumera la ubicación, el estado, el calendario y otros accesos por separado"></a><figcaption><p><strong>iPhone · Interfaz en inglés</strong> · Los permisos del sistema están separados de los interruptores de capacidad del agente.</p></figcaption></figure>
</div>

Para impedir que un agente utilice una capacidad, apague su interruptor. Para revocar el acceso al sistema de la aplicación, siga las instrucciones de la página de permisos para la configuración relevante del sistema.

## Obtenga su ubicación y luego busque cerca

Comience con:

> Obtenga mi ubicación actual. Dígame aproximadamente en qué zona estoy y cuándo se obtuvo esta ubicación.

Para lugares o rutas cercanas, combínelo con un complemento Amap conectado:

> Obtenga mi ubicación actual y luego use Amap para encontrar estaciones de metro cercanas. Enumere sus nombres y direcciones.

Estos pasos tienen requisitos separados: la ubicación del teléfono necesita permiso del sistema, mientras que las consultas de mapas necesitan la conexión Amap. La conexión del Amap por sí sola no lee la ubicación de su teléfono.

### ¿Puedo planificar una ruta sin otorgar acceso a la ubicación?

Sí. Proporcione usted mismo el punto de partida y el destino:

> Utilice Amap para encontrar rutas de transporte público desde la Plaza del Pueblo en Shanghai hasta la estación de tren de Hongqiao. Compara transferencias y duración estimada sin leer la ubicación de mi teléfono.

La herramienta de ubicación incorporada obtiene una posición actual en primer plano. No proporciona seguimiento continuo, ubicación en segundo plano ni navegación paso a paso. Las descripciones de las rutas provienen del servicio de mapas; La lectura de una ubicación no es navegación en vivo.

### La ubicación falla o las coordenadas no tienen dirección

* Verifique que los servicios de ubicación del sistema y el permiso de Cherry Studio estén habilitados y mantenga la aplicación en primer plano.
* La recepción interior, el dispositivo y la precisión del sistema afectan los resultados. Un tiempo de espera no significa necesariamente que se haya denegado el permiso.
* La conversión de coordenadas en una dirección escrita puede fallar por separado. Las coordenadas sin una dirección no significan que toda la solicitud de ubicación haya fallado.
* Resuelva la causa informada antes de volver a intentarlo explícitamente o proporcione una ciudad, un punto de referencia o una dirección de inicio.

## Resumir registros médicos en iOS

Las herramientas actuales pueden leer estos tipos de datos registrados:

| categoría | Información disponible |
| --- | --- |
| Actividad diaria | Pasos, energía activa, distancia caminando y corriendo. |
| Medidas del corazón | Frecuencia cardíaca, frecuencia cardíaca en reposo, variabilidad de la frecuencia cardíaca |
| Dormir | Duración del sueño registrada |
| Entrenamientos | Entrenamientos grabados dentro de un rango de fechas |

Autorice sólo los tipos que necesite. Un resumen de pasos no requiere compartir datos cardíacos o de sueño. Las herramientas actuales leen registros; no pueden escribir ni eliminar registros de salud. Android actualmente no ofrece estas herramientas de salud.

Solicitudes de ejemplo:

> Lea los últimos siete días de pasos registrados y distancia caminando/corriendo, agrupados por día. Etiquetar los días faltantes como “No hay registros disponibles”; no los llenes con cero.

> Resuma la duración del sueño registrada la semana pasada e identifique las fechas en las que faltan registros.

> Enumere los entrenamientos registrados de este mes, indique cuántos se devolvieron y explique si la lista puede estar incompleta.

Una consulta puede abarcar un período máximo de 90 días. Sin fechas, las herramientas consultan los últimos siete días. Las listas de entrenamientos devuelven 20 registros de forma predeterminada y un máximo de 50 por llamada. Consulte períodos más cortos si hay más registros.

## ¿Por qué los resultados están vacíos o parciales?

Es posible que el sistema no tenga registros coincidentes, que el tipo de datos carezca de autorización, que los registros históricos no estén disponibles o que una métrica no se cargue. **Un resultado vacío no significa cero pasos o ningún ejercicio.** iOS no revela completamente las denegaciones de lectura, por lo que la aplicación no puede distinguir estos casos de un resultado vacío únicamente.

Verifique las fechas y registros en la aplicación Salud del sistema, luego revise el acceso para el tipo específico. Pruebe con un rango más corto y una métrica a la vez. Pídale al agente que indique los datos faltantes en lugar de tratar un resultado incompleto como una tendencia completa.

Los resultados de ubicación y salud pueden enviarse al servicio modelo seleccionado como parte de la conversación. Consulte [Datos, privacidad y permisos](data-privacy.md).
