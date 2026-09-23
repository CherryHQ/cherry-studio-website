---
icon: terminal
---
# Compañero de código

【Compañero de código】 se utiliza para instalar, configurar e iniciar herramientas de línea de comandos de programación comunes. Cherry Studio reconoce sus instalaciones gestionadas y también detecta los CLI disponibles en el entorno de inicio de sesión del sistema; las herramientas del sistema siguen siendo mantenidas por el gestor de paquetes original.

<figure><img src="../../../../assets/565c03d38bfd4fabef8d3013.webp" alt="Primero, confirme que la herramienta está instalada y que la versión es utilizable, y luego configure la conexión del modelo y el directorio del proyecto."><figcaption><p>Primero, confirme que la herramienta está instalada y que la versión es utilizable, y luego configure la conexión del modelo y el directorio del proyecto. </p></figcaption></figure>

## Qué puede hacer la página

* Verificar si la herramienta está instalada y si hay actualizaciones disponibles;
* Instalar o actualizar las copias de herramientas gestionadas por Cherry Studio;
* Detectar las herramientas existentes en el PATH del sistema;
* Seleccionar el proveedor y el modelo para los CLI que requieren servicios de modelos;
* Mantener el método de inicio de sesión nativo para los CLI que utilizan sus propias cuentas;
* Iniciar la herramienta después de seleccionar el directorio de trabajo y la terminal detectada por el sistema.

La página incluye actualmente herramientas como Claude Code, OpenAI Codex, Gemini CLI, OpenCode, Qwen Code, Kimi Code, Qoder CLI y GitHub Copilot CLI. Los elementos visibles pueden cambiar con las actualizaciones del producto; consulte la lista de la página como referencia.

## Flujo de uso

{% stepper %}
{% step %}
### 1. Abra 【Compañero de código】 en la navegación izquierda

Seleccione la herramienta necesaria y observe primero si el estado es "no instalado", "gestionado por Cherry Studio" o "del sistema".
{% endstep %}

{% step %}
### 2. Complete la instalación o el inicio de sesión

Si no está instalado, haga clic en 【Instalar】. Para los CLI que proporcionan inicio de sesión de cuenta por sí mismos, complete el inicio de sesión nativo siguiendo las indicaciones de la página; no es necesario seleccionar un proveedor desde Cherry Studio.
{% endstep %}

{% step %}
### 3. Configure la conexión del modelo

Para las herramientas que requieren servicios de modelos de Cherry Studio, seleccione un proveedor y un modelo compatibles. La página filtra según el tipo de interfaz requerido por el CLI; los proveedores no compatibles no se listan.
{% endstep %}

{% step %}
### 4. Seleccione el directorio y la terminal

El directorio de trabajo determina la ubicación de inicio del CLI. La terminal solo puede seleccionarse de la lista detectada por el sistema; ya no se proporciona la ruta de archivo ejecutable de terminal personalizada.
{% endstep %}

{% step %}
### 5. Inicie y verifique

Haga clic en 【Iniciar】 y ejecute una comprobación de solo lectura en la terminal. Confirme que la cuenta, el modelo y el directorio son correctos antes de ejecutar modificaciones de archivos o comandos.
{% endstep %}
{% endstepper %}

## Modos de modelo para Claude Code

Al configurar Claude Code, 【Modelo】 ofrece dos modos:

* 【General】: todas las solicitudes utilizan el mismo modelo, lo que simplifica la configuración;
* 【Detallado】: configure Fable, Opus, Sonnet, Haiku y Subagent por separado en 【Mapeo de roles de modelo】. El 【Modelo de solicitud real】 en la tabla es el modelo que finalmente utiliza cada rol; si es necesario, también puede activar el contexto 【1M】 para el rol correspondiente.

Solo use 【Detallado】 si realmente necesita asignar modelos diferentes a roles como subtareas en segundo plano, compresión o títulos. Los roles en blanco seguirán el modelo principal. Después de realizar cambios, confirme primero con una pequeña tarea que cada rol pueda realizar solicitudes correctamente.

## Escenario de uso: iniciar herramientas de código en el directorio del proyecto

| Selección | Punto de partida sugerido | Escenario aplicable | Consideraciones |
| ----- | ----------------------------- | ------------ | ---------------- |
| Origen de instalación | Si ya existe una versión del sistema, úsela primero | El equipo ya gestiona de forma unificada los CLI | Las actualizaciones y desinstalaciones siguen siendo responsabilidad del gestor de paquetes original |
| Conexión del modelo | Seleccione primero una conexión que ya esté verificada como utilizable en Cherry Studio | CLI que requieren servicios de modelos | Las herramientas con inicio de sesión de cuenta propio deben iniciar sesión mediante el flujo nativo |
| Directorio de trabajo | Seleccione solo el directorio del proyecto actual | Modificar código, ejecutar comprobaciones | Confirme primero la ruta donde se encuentra la terminal tras el inicio |
| Primer comando | Verificación de solo lectura del estado del proyecto | Verificar cuenta, modelo y directorio | Permita la escritura de archivos solo después de confirmar que todo es correcto |

### Criterios de finalización

La página puede identificar el origen de la instalación; la terminal se abre en el directorio correcto; el comando mínimo de solo lectura tiene éxito; la cuenta o el modelo mostrados por la herramienta coinciden con lo esperado.

## Distinga el origen de la instalación

| Origen | Qué hace Cherry Studio | Cómo debe mantenerlo usted |
| ---------------- | ------------------ | ------------------ |
| Gestionado por Cherry Studio | Instala, actualiza y desinstala la copia gestionada correspondiente | Gestiónelo en 【Compañero de código】 o en 【Dependencias del entorno】 |
| PATH del sistema | Lo detecta y lo utiliza directamente, sin sobrescribir | Actualice o desinstale con el gestor de paquetes original |
| Integrado en la aplicación | Lo utiliza directamente, no proporciona desinstalación a nivel de sistema | Se actualiza con Cherry Studio |

{% hint style="warning" %}
Después de desinstalar la copia gestionada por Cherry Studio, si aún existe un archivo ejecutable con el mismo nombre en el sistema, la página volverá automáticamente a la versión del sistema. Si hay cambios en la versión o el comportamiento, confirme primero qué origen se está utilizando actualmente.
{% endhint %}

<details>

<summary>¿Por qué no puedo encontrar una terminal o CLI ya instalada? </summary>

Cherry Studio detecta las herramientas desde el entorno de inicio de sesión y las ubicaciones estándar. Confirme que el comando se puede ejecutar en la terminal de inicio de sesión y luego reinicie la aplicación para actualizar el entorno. Las rutas portátiles o no estándar actualmente deben iniciarse manualmente desde esa terminal.

</details>
