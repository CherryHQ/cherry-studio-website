---
icon: terminal
---
# Socio de codificación (Code CLI)

【Socio de codificación】 se utiliza para instalar, configurar e iniciar herramientas de línea de comandos de programación comunes. Cherry Studio distingue entre las versiones administradas por la aplicación, las versiones existentes en el PATH del sistema y el inicio de sesión de cuenta propio de la herramienta, y no sobrescribirá automáticamente las instalaciones del sistema.

<figure><img src="../../../../assets/2e66cc9312c27cf740b2eb62.webp" alt="① Seleccione la herramienta en el panel izquierdo y confirme el estado de instalación; ② Seleccione en el panel derecho la pasarela unificada, la cuenta oficial de la herramienta o un servicio de modelos compatible."><figcaption><p>① Seleccione la herramienta en el panel izquierdo y confirme el estado de instalación; ② Seleccione en el panel derecho la pasarela unificada, la cuenta oficial de la herramienta o un servicio de modelos compatible. </p></figcaption></figure>

### Funcionalidades de la página

* Verificar si la herramienta está instalada y si hay actualizaciones disponibles;
* Instalar, actualizar o eliminar las copias de herramientas administradas por Cherry Studio;
* Detectar herramientas existentes en el PATH del sistema;
* Seleccionar proveedor, modelo y parámetros para CLIs que requieren un servicio de modelos;
* Mantener el método de inicio de sesión nativo para CLIs que utilizan su propia cuenta;
* Iniciar la herramienta seleccionando el directorio de trabajo y la terminal detectada por el sistema.

La página incluye herramientas como Claude Code, OpenAI Codex, Gemini CLI, OpenCode, Qwen Code, Kimi Code, Qoder CLI, GitHub Copilot CLI, Pi y DeepSeek Harness. Los elementos visibles pueden cambiar con las actualizaciones del producto; consulte la lista de la página como referencia.

### Flujo de inicio general

{% stepper %}
{% step %}
#### 1. Abrir 【Socio de codificación】 desde el 【Panel de inicio】

Seleccione la herramienta necesaria y verifique primero si el estado es no instalada, administrada por Cherry Studio o proviene del sistema.
{% endstep %}

{% step %}
#### 2. Completar la instalación o el inicio de sesión

Si no está instalada, haga clic en 【Instalar】. Para los CLIs que proporcionan el inicio de sesión de cuenta por sí mismos, complete el inicio de sesión nativo siguiendo las indicaciones de la página; no es necesario seleccionar un proveedor desde Cherry Studio.
{% endstep %}

{% step %}
#### 3. Configurar la conexión de modelos

Para las herramientas que requieren el servicio de modelos de Cherry Studio, puede seleccionar la 【Pasarela unificada】 o un proveedor y modelo compatibles. La página filtra según el tipo de interfaz requerido por el CLI; los proveedores incompatibles no se listarán.
{% endstep %}

{% step %}
#### 4. Seleccionar directorio y terminal

El directorio de trabajo determina la ubicación de inicio del CLI. La terminal solo puede seleccionarse de la lista detectada por el sistema; tras el inicio, use primero un comando de solo lectura para confirmar la ruta actual.
{% endstep %}

{% step %}
#### 5. Iniciar y verificar

Haga clic en 【Iniciar】, confirme que la cuenta o el modelo sean correctos, y luego ejecute la modificación de archivos o comandos. Si necesita ajustar la intensidad de inferencia, los permisos o las opciones exclusivas de la herramienta, abra 【Configuración】.
{% endstep %}
{% endstepper %}

### DeepSeek Harness

<figure><img src="../../../../assets/ceedc835426c7413a36609ba.webp" alt="① Si no está instalado, complete primero la instalación administrada; tras la instalación, configure el proveedor compatible, los permisos predeterminados y el modo Agent, y luego inicie la interfaz web."><figcaption><p>① Si no está instalado, complete primero la instalación administrada; tras la instalación, configure el proveedor compatible, los permisos predeterminados y el modo Agent, y luego inicie la interfaz web. </p></figcaption></figure>

El flujo de DeepSeek Harness difiere del de los CLIs de terminal estándar: tras la instalación y la selección del proveedor, Cherry Studio lo administra y ejecuta, y puede abrir una interfaz web independiente. En los parámetros, puede seleccionar el modo Agent predeterminado y los permisos predeterminados:

| Configuración | Casos adecuados | Consideraciones |
| -------- | -------------------------- | ------------- |
| 【Estándar】 | Puede usar archivos, Shell, búsqueda, habilidades, planificación y subagentes | Mayor superficie de herramientas; use permisos controlados primero |
| 【Código PTC】 | Necesita combinar operaciones de herramientas de múltiples pasos a través de Code Mode | Más adecuado para tareas de codificación complejas |
| 【Minimalista】 | Solo necesita Shell persistente y editor de texto | Menos dependencias, pero menor alcance de capacidades |
| 【Solo lectura】 | Inspeccionar el proyecto sin escribir archivos | Las operaciones de riesgo aún solicitarán confirmación |
| 【Escritura en espacio de trabajo】 | Permite modificar el espacio de trabajo DSH actual | No implica acceso a archivos fuera del espacio de trabajo |
| 【Acceso total】 | Entornos aislados, confiables y recuperables | No solicita confirmación de operaciones; mayor riesgo |

### Distinguir las fuentes de instalación

| Fuente | Qué hace Cherry Studio | Cómo debe mantenerlo |
| ---------------- | ------------------ | ----------------- |
| Administrada por Cherry Studio | Instala, actualiza y desinstala la copia administrada correspondiente | Gestiónela en 【Socio de codificación】 o 【Dependencias de entorno】 |
| PATH del sistema | La detecta y usa directamente, sin sobrescribir | Actualice o desinstale con el gestor de paquetes original |
| Cuenta oficial de la herramienta | Mantiene el flujo de inicio de sesión propio de la herramienta | Gestione la cuenta y las autorizaciones en la interfaz de la herramienta |

<figure><img src="../../../../assets/2e66cc9312c27cf740b2eb62.webp" alt="Socio de codificación (Code CLI) — Ilustración"><figcaption></figcaption></figure>

{% hint style="warning" %}
Tras desinstalar la copia administrada por Cherry Studio, si aún existe un archivo ejecutable con el mismo nombre en el sistema, la página revertirá automáticamente a la versión del sistema. Si el comportamiento cambia, confirme primero qué fuente se está utilizando actualmente.
{% endhint %}

### Caso de usuario: Iniciar herramientas de codificación en el directorio del proyecto

El desarrollador primero selecciona el directorio del proyecto actual, elige una conexión de modelo verificada y luego inicia Pi u otro CLI. El primer comando solo lee el estado del repositorio; tras confirmar que la cuenta, el modelo y el directorio son correctos, se permite a la herramienta modificar archivos y ejecutar comprobaciones.

<details>

<summary>¿Por qué no se encuentra la terminal o CLI ya instalada? </summary>

Cherry Studio detecta las herramientas desde el entorno de inicio de sesión y las ubicaciones estándar. Asegúrese de que el comando se pueda ejecutar en la terminal de inicio de sesión y luego reinicie la aplicación para actualizar el entorno. Las rutas portátiles o no estándar actualmente deben iniciarse manualmente desde esa terminal.

</details>

<details>

<summary>¿Por qué no se encuentra la terminal o CLI ya instalada? </summary>

Cherry Studio detecta las herramientas desde el entorno de inicio de sesión y las ubicaciones estándar. Asegúrese de que el comando se pueda ejecutar en la terminal de inicio de sesión y luego reinicie la aplicación para actualizar el entorno. Las rutas portátiles o no estándar actualmente deben iniciarse manualmente desde esa terminal.

</details>
