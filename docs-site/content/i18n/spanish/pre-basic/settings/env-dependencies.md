---
icon: terminal
---
# Dependencias del entorno

Las dependencias del entorno se utilizan para **gestionar las herramientas binarias y los entornos de ejecución necesarios para que Cherry Studio ejecute ciertas funciones avanzadas**. Algunas capacidades de [servicios MCP](../../../../advanced-basic/extensions/mcp), [habilidades](../../advanced-basic/extensions/skills.md) y [Agent](../../advanced-basic/agent.md) requieren, a nivel de bajo nivel, la invocación de herramientas de línea de comandos como `uv` y `bun`. Cherry Studio las centraliza aquí para que no tengas que instalarlas y configurarlas manualmente desde la línea de comandos.

Abre `Configuración → Dependencias del entorno`:

<figure><img src="../../../../assets/edd81af2d8627638562b77e3.webp" alt=""><figcaption><p>Dependencias del entorno: Herramientas integradas e instalables</p></figcaption></figure>

### Integradas e instalables

Cada herramienta se muestra en formato de tarjeta e indica su estado:

* Las herramientas marcadas con <mark style="color:blue;">**Integrada**</mark> se distribuyen junto con Cherry Studio, están listas para usar y no requieren ninguna acción.
* En las tarjetas de herramientas no instaladas aparece un botón **Instalar**; al hacer clic, Cherry Studio descarga e instala automáticamente la herramienta en el directorio de la aplicación, sin alterar el entorno del sistema.
* Las tarjetas incluyen enlaces al repositorio de código fuente y a la documentación oficial, así como una opción para abrir el directorio de instalación local.

Lista de herramientas comunes:

| Herramienta | Función |
| --- | --- |
| **uv** | Herramienta de gestión de paquetes de Python para servicios MCP e instalación de dependencias |
| **Bun** | Entorno de ejecución de JavaScript utilizado por servicios MCP y cadenas de herramientas relacionadas |
| **fd** | Herramienta rápida de búsqueda de archivos, alternativa a `find` |
| **ripgrep (rg)** | Herramienta rápida de búsqueda de texto, alternativa a `grep` |
| **RTK** | Herramienta de proxy CLI para comprimir la salida de la terminal y reducir el consumo de tokens de LLM |
| **Lark CLI** | CLI oficial de Feishu, cubre más de 200 comandos para mensajes / documentos / hojas de cálculo multidimensionales / calendario, etc. |

La página también enumera en tarjetas herramientas como `gh` (GitHub CLI), `ntn` (Notion CLI) y `pi`, que se pueden instalar con un solo clic según sea necesario. (Las CLIs de programación como Claude Code / Codex se gestionan en la página [Compañero de codificación](../../cherrystudio/preview/code-cli.md) y no en esta página.)

### Agregar herramientas

El botón «**Agregar herramienta**» en la esquina superior derecha permite utilizar la herramienta mise para agregar herramientas que no están en la lista integrada (por ejemplo, `github:sharkdp/fd`, `uv`, `bun`).

### Configuración avanzada de instalación

Haz clic en el icono de configuración en la esquina superior derecha para abrir «**Configuración avanzada de instalación**» y ajustar la forma de descarga de las herramientas (todos los campos pueden dejarse en blanco para usar los valores predeterminados):

* **Espejo de GitHub**: Añade un prefijo de proxy para las descargas de GitHub Release (por ejemplo, `https://ghfast.top`), útil cuando la conexión directa no es fluida.
* **Token de GitHub**: Aumenta los límites de velocidad de la API de GitHub al consultar herramientas (se guarda en texto plano localmente).
* **Fuente de espejo de npm / Dirección de índice de pip**: Configura un espejo para herramientas de tipo `npm:` / `pipx:` (si se deja en blanco, se selecciona automáticamente un espejo en la región continental de China).
* **Verificar firma de herramientas**: Verifica las firmas Sigstore / SLSA de las herramientas; generalmente se recomienda mantenerlo activado.

{% hint style="info" %}
Los usuarios normales generalmente no necesitan operar aquí: cuando se requiere una herramienta, la función relacionada (como la instalación de un servicio MCP) suele guiar al usuario de vuelta a esta página para instalarla con un solo clic. Esta página es más bien una entrada para "realizar un chequeo y completar el entorno de ejecución".
{% endhint %}

{% hint style="warning" %}
Si un servicio MCP o una habilidad muestra un error que indica "uv / bun no encontrado / comando no existe", primero ven aquí para confirmar si la herramienta correspondiente está instalada o tiene el estado de "Integrada" (el estado de instalación se actualiza automáticamente; el botón en la esquina superior derecha es **Comprobar actualizaciones**, utilizado para obtener la última versión de las herramientas).
{% endhint %}

***

### Obtener ayuda y enviar comentarios

Si tiene alguna duda, detecta un error o tiene sugerencias de mejora de funciones durante la configuración o el uso, consulte los canales oficiales proporcionados en [Comentarios y sugerencias](../../question-contact/suggestions.md).
