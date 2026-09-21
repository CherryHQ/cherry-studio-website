---
icon: route
---
# Mapa de capacidades avanzadas

Los tutoriales avanzados no enumeran los elementos del menú de configuración uno por uno, sino que parten de "qué trabajo deseas realizar". Primero, selecciona el objetivo más cercano y luego entra en el tutorial correspondiente.

<figure><img src="../../../assets/f99c1bfff81d92511c921169.webp" alt="Primero selecciona la entrada principal para completar la tarea mínima; una vez que los resultados sean estables, añade bases de conocimiento, habilidades, MCP, canales o tareas programadas."><figcaption><p>Primero selecciona la entrada principal para completar la tarea mínima; una vez que los resultados sean estables, añade bases de conocimiento, habilidades, MCP, canales o tareas programadas.</p></figcaption></figure>

{% hint style="success" %}
Cuando necesites configurar un conjunto de tutoriales, canales, tareas programadas o capacidades de extensión, prioriza informar a Agent de tu objetivo en [Trabajo]. Agent puede ayudar a determinar qué falta y guiarte en la configuración común; cuando necesites verificar cuentas, claves o parámetros precisos, ajusta manualmente en [Configuración].
{% endhint %}

<figure><img src="../../../assets/8fe4d938af469d667d4071df.webp" alt="El panel de inicio lateral ofrece nueve entradas principales; selecciona la más cercana a la tarea para comenzar."><figcaption><p>El panel de inicio lateral ofrece nueve entradas principales; selecciona la más cercana a la tarea para comenzar.</p></figcaption></figure>

Descripción del diagrama: Primero selecciona la entrada principal según el objetivo; una vez que el flujo sea estable, añade habilidades, MCP, canales o tareas programadas.

### Seleccionar entrada según el objetivo

| Qué deseas completar | Entrada recomendada | Capacidades que se utilizarán |
| ------------- | ----------------------- | --------------------- |
| Comparar varias respuestas, organizar discusiones largas | [Diálogo] | Multi-modelo, ramas de mensajes, contexto, citas y artefactos |
| Procesar archivos o completar tareas de múltiples pasos | [Trabajo] | Agent, directorio de trabajo, herramientas, permisos y panel de estado |
| Responder preguntas de forma estable con tus propios materiales | [Base de conocimiento] → prueba de recuperación, luego vincular a Agent | Archivos/páginas web/notas, RAG, alcance de búsqueda |
| Generar imágenes a partir de artículos o editar imágenes | [Dibujo], o habilitar [Generar imagen] en Agent | Plantillas, imagen de referencia, edición local, mejora |
| Traducir texto, capturas de pantalla o documentos largos | [Traducción] | OCR, procesamiento de documentos, historial y favoritos |
| Consolidar borradores y continuar procesándolos | [Notas] | Markdown, búsqueda, exportación, añadir a base de conocimiento |
| Capturar la interfaz, anotar y copiar texto | [Configuración] → [Captura de pantalla], usar atajos de teclado globales tras habilitar | Captura de área, anotaciones, pixelado, OCR |
| Abrir aplicaciones web frecuentes | [Miniaplicaciones] | Herramientas web integradas y sitios añadidos |
| Examinar, previsualizar y organizar archivos locales | [Archivos] | Lista de archivos, previsualización y procesamiento posterior |
| Conectar herramientas externas o métodos de trabajo fijos | Primero que Agent lo determine, luego verificar en [Configuración] | Habilidades, MCP, herramientas integradas |
| Usar Agent desde plataformas externas | Primero que Agent guíe la configuración en [Trabajo] | Canales, alcance permitido, modo de permisos |
| Generar informes diarios o recordatorios según un plan | Primero ejecutar Agent, luego crear [Tarea programada] | Agent, directorio de trabajo, canales, registros de ejecución |
| Ver materiales y tareas simultáneamente | Clic derecho en la pestaña → [Abrir en nueva ventana] | Multi-ventana, pestañas fijas, búsqueda global |
| Gestionar la línea de comandos de programación | [Compañero de código] en el panel de inicio | Code CLI, conexión de modelos, directorios y terminal |
| Permitir que programas locales llamen al modelo o depurar | [Configuración] → [API Gateway] / [General] | API compatible, cadena de llamadas, modo desarrollador |

### Orden de aprendizaje recomendado

{% stepper %}
{% step %}
#### 1. Primero dominar el espacio de trabajo de Agent

Aprende a crear Agent, seleccionar el directorio de trabajo, entender la división de roles de los modelos y los permisos. Las extensiones, automatizaciones y casos de proyecto posteriores se basan en esto.
{% endstep %}

{% step %}
#### 2. Luego conectar materiales y capacidades

Usa la base de conocimiento para materiales a largo plazo, habilidades para métodos repetitivos y MCP para sistemas externos. Añade solo una capacidad a la vez y verifica con tareas pequeñas.
{% endstep %}

{% step %}
#### 3. Finalmente automatizar o conectar externamente

Configura canales, tareas programadas, Code CLI o API externas solo después de que los resultados manuales sean estables. Así, si surgen problemas, será más fácil identificar en qué etapa ocurren.
{% endstep %}
{% endstepper %}

### Lectura por módulos

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Diálogo avanzado</strong></td><td>Multi-modelo, ramas, contexto y artefactos</td><td><a href="chat/README.md">chat/README.md</a></td></tr><tr><td><strong>Espacio de trabajo de Agent</strong></td><td>De la configuración y ejecución a la entrega de archivos</td><td><a href="agent-workspace/README.md">agent-workspace/README.md</a></td></tr><tr><td><strong>Flujo de trabajo de conocimiento y contenido</strong></td><td>Base de conocimiento, notas, dibujo y traducción</td><td><a href="knowledge-content/README.md">knowledge-content/README.md</a></td></tr><tr><td><strong>Extender las capacidades de Agent</strong></td><td>Habilidades y MCP</td><td><a href="extensions/README.md">extensions/README.md</a></td></tr><tr><td><strong>Automatización y alcance externo</strong></td><td>Canales, tareas programadas y latido</td><td><a href="automation/README.md">automation/README.md</a></td></tr><tr><td><strong>Mesa de trabajo eficiente</strong></td><td>Multi-ventana, herramientas de eficiencia y búsqueda</td><td><a href="workbench/README.md">workbench/README.md</a></td></tr><tr><td><strong>Desarrollo y diagnóstico</strong></td><td>Code CLI, API Gateway y cadena de llamadas</td><td><a href="developer-tools/README.md">developer-tools/README.md</a></td></tr><tr><td><strong>Casos de aplicación</strong></td><td>Nueve flujos de trabajo completos</td><td><a href="cases/README.md">cases/README.md</a></td></tr></tbody></table>

{% hint style="warning" %}
El directorio de trabajo, MCP, canales y el modo de altos permisos amplían el alcance de los datos a los que Agent puede acceder. Solo proporciona los directorios, herramientas y cuentas necesarios para la tarea actual; no incluyas claves API, claves de bots o materiales privados en conversaciones públicas y capturas de pantalla.
{% endhint %}
