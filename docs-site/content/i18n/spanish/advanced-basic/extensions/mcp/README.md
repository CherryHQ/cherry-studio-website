---
icon: network-wired
---
# MCP y herramientas externas

MCP es la forma de conectar a los Agentes con herramientas y recursos externos. Cherry Studio puede gestionar servidores MCP, servidores integrados, el mercado de servicios y las entradas de algunos proveedores, y luego vincular los servidores conectados a un Agente específico.

### ¿Cuándo se necesita MCP

<figure><img src="../../../../../assets/d2a9cd99b66df87ce02e196e.webp" alt="MCP y herramientas externas — Ilustración"><figcaption></figcaption></figure>

<figure><img src="../../../../../assets/79e45524b78de312b0ea7d2b.webp" alt="MCP y herramientas externas — Ilustración"><figcaption></figcaption></figure>

* El Agente necesita invocar servicios que no están entre las herramientas integradas de Cherry Studio;
* El equipo ya cuenta con bases de datos, navegadores o sistemas de negocio que ofrecen interfaces MCP;
* Se desea reutilizar el mismo conjunto de capacidades externas en varios Agentes;
* Es necesario proporcionar herramientas, recursos o indicaciones al modelo de manera unificada.

Si solo se requiere un flujo fijo, utilice habilidades; si solo necesita recuperar información de la base de conocimientos de Cherry Studio, vincule directamente la base de conocimientos. No es necesario configurar MCP adicionalmente solo para hacerlo "más avanzado".

### Agregar servidor

Ruta: [Configuración] → [MCP] → [Servidores MCP] → [Agregar].

{% stepper %}
{% step %}
#### 1. Confirmar el método de conexión

Los comandos locales suelen utilizar la entrada y salida estándar; los servicios remotos suelen proporcionar una dirección SSE o HTTP con capacidad de transmisión por flujo. Complete la configuración según lo indicado por el proveedor del servicio; no suponga basándose en el nombre.
{% endstep %}

{% step %}
#### 2. Completar la configuración y verificar permisos

Los servidores locales requieren comando, parámetros y variables de entorno; los servidores remotos requieren una URL, y algunos servicios también requieren autorización. Antes de guardar, confirme la fuente del comando y el alcance de los datos.
{% endstep %}

{% step %}
#### 3. Iniciar y ver herramientas

Habilite el servidor, espere a que el estado sea normal y luego abra los detalles para revisar las herramientas, recursos e indicaciones que proporciona. Si la conexión falla, revise primero los registros del servidor.

En la lista de herramientas, expanda una herramienta para ver la descripción completa en Markdown, así como los parámetros, tipos, marcadores de obligatoriedad y valores enumerados organizados por niveles. Verifique los parámetros obligatorios antes de la invocación; los parámetros de objetos o matrices deben expandirse nivel por nivel para evitar suponer el formato de entrada solo por el nombre de la herramienta.
{% endstep %}

{% step %}
#### 4. Vincular al Agente

Abra [Trabajo] → Menú Agente → [Editar] → [MCP] y habilite el servidor. Los servidores no iniciados no se pueden vincular ni utilizar correctamente.
{% endstep %}
{% endstepper %}

### Servidores integrados y mercado de servicios

[MCP integrado] ofrece capacidades comunes que se pueden instalar o habilitar directamente; [Mercado de servicios] se utiliza para gestionar fuentes de mercado de terceros. Antes de instalar, debe revisar las instrucciones, comandos, variables de entorno y permisos; la entrada integrada no significa que todas las operaciones del servicio externo estén libres de riesgos.

<figure><img src="../../../../../assets/3892f8eaa6ef4645921a382d.webp" alt="① La lista integrada indica si se requiere una cuenta, una API Key o una configuración de directorio; después de la instalación, aún debe completar la configuración y verificar la conexión."><figcaption><p>① La lista integrada indica si se requiere una cuenta, una API Key o una configuración de directorio; después de la instalación, aún debe completar la configuración y verificar la conexión. </p></figcaption></figure>

QVeris se encuentra en [Servidores integrados] y se utiliza para permitir que el Agente descubra, inspeccione e invoque capacidades externas. Después de la instalación, es necesario configurar `QVERIS_API_KEY`; no escriba claves en las indicaciones del Agente, en habilidades o en capturas de pantalla públicas.

### Usar indicaciones y recursos MCP en el área de entrada

Además de las herramientas, los servidores pueden proporcionar "indicaciones" y "recursos". Una vez que el servidor está vinculado al asistente o Agente actual, abra el panel [+] del área de entrada:

* Seleccione [Indicaciones MCP] para insertar la plantilla del servidor en el cuadro de entrada; los parámetros obligatorios de la plantilla se mostrarán como campos rellenables;
* Seleccione [Recursos MCP] para seleccionar archivos, registros u otros recursos de los servidores vinculados;
* Los recursos de texto cortos se insertan directamente en el cuadro de entrada; los recursos grandes o binarios se tratan como referencias, que el modelo con soporte para invocación de herramientas leerá cuando sea necesario.

{% hint style="info" %}
El panel solo muestra los servidores conectados dentro del alcance de la conversación actual que realmente proporcionan la capacidad correspondiente. Si no ve [Indicaciones MCP] o [Recursos MCP], primero revise la pestaña correspondiente en los detalles del servidor y luego confirme que el asistente o Agente actual tiene vinculado dicho servidor.
{% endhint %}

### Recomendaciones de configuración

| Elemento de configuración | Valor predeterminado del producto | Punto de partida sugerido | Función | Escenarios aplicables | Precauciones |
| -------- | -------------- | ----------------- | --------- | ------------- | ------------ |
| Estado del servidor | Determinado por la configuración tras la creación | Habilitar y verificar uno a la vez | Controla si el servidor está disponible | Conexión inicial, depuración | Difícil de localizar si varios servicios fallan simultáneamente |
| Vinculación del Agente | No vincula automáticamente todos los servidores | Vincular solo los servidores necesarios para el Agente actual | Controla el alcance de las capacidades | División de tareas entre múltiples Agentes | Evitar que herramientas irrelevantes ocupen el contexto |
| Variables de entorno | No prellenar claves | Usar credenciales con el mínimo privilegio requerido por el servicio | Proporciona autenticación o parámetros de ejecución | Servicios privados | Ocultar contenido sensible antes de capturas de pantalla y exportaciones |
| Aprobación de herramientas | Determinado por el modo de permisos del Agente | Mantener confirmación para herramientas de escritura o facturación | Previene operaciones accidentales | Bases de datos, archivos, API externas | Las entradas de canal pueden usar un modo más estricto |

### Caso de usuario: Conectar la base de datos del proyecto a un Agente de análisis

El administrador proporciona una conexión MCP de solo lectura; el usuario verifica en [Configuración] → [MCP] que el servidor funcione correctamente y luego lo vincula únicamente al Agente "Análisis de datos". El Agente utiliza herramientas de solo lectura para obtener los datos y escribe el informe en el directorio de trabajo; las herramientas que implican actualización de datos no se habilitan. De esta manera, incluso si hay una mala interpretación en las indicaciones, no se modificará directamente la base de datos de negocio.

<details>

<summary>¿Cuál es la diferencia entre MCP y una pasarela de API? </summary>

MCP conecta herramientas externas a Cherry Studio; una pasarela de API proporciona las capacidades de modelo de Cherry Studio a otros programas mediante una API compatible. La dirección del flujo de datos es opuesta.

</details>

<details>

<summary>El servidor muestra que está conectado, pero el Agente aún no encuentra las herramientas. ¿Qué hacer? </summary>

Verifique si el Agente tiene vinculado el servidor, si las herramientas están deshabilitadas o si hay solicitudes de permisos pendientes. Después de modificar la configuración del Agente, envíe un nuevo mensaje para que el tiempo de ejecución cargue las nuevas herramientas.

</details>

<details>

<summary>El servidor muestra que está conectado, pero el Agente aún no encuentra las herramientas. ¿Qué hacer? </summary>

Verifique si el Agente tiene vinculado el servidor, si las herramientas están deshabilitadas o si hay solicitudes de permisos pendientes. Después de modificar la configuración del Agente, envíe un nuevo mensaje para que el tiempo de ejecución cargue las nuevas herramientas.

</details>

<figure><img src="../../../../../assets/3892f8eaa6ef4645921a382d.webp" alt="MCP y herramientas externas — Ilustración"><figcaption></figcaption></figure>
