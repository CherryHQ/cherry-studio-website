---
icon: wand-magic-sparkles
---
# Miniaplicaciones generativas

Las miniaplicaciones generativas son aplicaciones web locales que se ejecutan en las [Miniaplicaciones] de Cherry Studio. Su interfaz y flujo de trabajo son personalizables y pueden invocar los modelos de IA configurados en Cherry Studio mediante `window.cherry`, transformando un modelo generalista en un asistente de escritura, un extractor de información, una herramienta de aprendizaje o una aplicación de negocio especializada.

La diferencia con las miniaplicaciones de sitio web no radica en la apariencia, sino en la fuente de las capacidades: una miniaplicación de sitio web simplemente abre una URL; una miniaplicación generativa debe empaquetarse como `.miniapp` y, tras su instalación y la concesión de permisos, puede invocar las capacidades de IA de Cherry, datos en sandbox, archivos, notificaciones, red y portapapeles.

{% hint style="info" %}
Cherry Studio proporciona el entorno de ejecución, el mecanismo de autorización y las interfaces de IA. Puedes escribir la miniaplicación tú mismo o utilizar herramientas de programación con IA para generar primero HTML, CSS y JavaScript, y luego empaquetar e instalarla según las instrucciones de esta página.
{% endhint %}

## Objetivos y requisitos previos

Al completar esta página, podrás:

* Instalar y utilizar miniaplicaciones generativas proporcionadas por terceros;
* Crear tu propio paquete `.miniapp` a partir de una necesidad sencilla;
* Permitir que la miniaplicación invoque el [Modelo predeterminado] o el [Modelo rápido] de Cherry Studio;
* Revisar el estado de permisos, registros de actividad, almacenamiento, actualizaciones y desinstalación.

Para usar una miniaplicación existente, solo necesitas un archivo `.miniapp` confiable o una URL de instalación. Para crearla tú mismo, también necesitas poder editar archivos web y crear archivos ZIP; si deseas probar las funciones de IA, configura primero un modelo de conversación disponible en Cherry Studio.

## Terminología

| Término | Nombre en la interfaz | Significado en esta página |
| ------ | ------------- | ----------------------------------------- |
| Miniaplicación generativa | [Miniaplicación generativa] | Miniaplicación con interfaz y flujo personalizables que puede invocar las capacidades de IA de Cherry Studio |
| Miniaplicación local | [Miniaplicación local] | Tipo de miniaplicación instalada como paquete `.miniapp` y ejecutada en un sandbox independiente |
| Miniaplicación de sitio web | [Sitio web] | Página web abierta mediante URL, sin capacidades `window.cherry` |
| Permisos | [Permisos] | Alcance de las capacidades solicitadas por la miniaplicación durante la instalación y revisadas por el usuario |
| Ranura de modelo | [Modelo predeterminado], [Modelo rápido] | Dos posiciones de modelo seleccionadas por el usuario para la miniaplicación; la miniaplicación no ve el proveedor, el nombre del modelo ni la API Key |

## Ruta de operación

Usar una miniaplicación existente: `【Inicio】→【Miniaplicaciones generativas】→【Miniaplicación local】→seleccionar un archivo o introducir una URL de instalación→revisar los permisos→【Instalar】`

También puedes acceder desde la página de miniaplicaciones: `【Inicio】→【Miniaplicaciones】→【Añadir miniaplicación】 arriba a la derecha→【Miniaplicación local】`

Gestionar miniaplicaciones instaladas: `【Miniaplicaciones】→clic derecho en la aplicación→【Ver detalles】`

## Pasos de operación

### Instalación y primer uso

{% stepper %}
{% step %}
### Abrir la entrada de instalación

Haz clic en [Miniaplicaciones generativas] en el [Panel de inicio] o, tras entrar en [Miniaplicaciones], haz clic en [Agregar miniaplicación] en la esquina superior derecha. En el panel emergente, cambia a [Miniaplicaciones locales].
{% endstep %}

{% step %}
### Seleccionar la fuente de instalación

Arrastra un paquete `.miniapp` al área de instalación o haz clic en [Seleccionar archivo…]. Si el desarrollador proporcionó una URL de instalación HTTPS, también puedes pegar la URL y hacer clic en [Cargar].
{% endstep %}

{% step %}
### Revisar permisos

La página de confirmación de instalación mostrará el nombre, la versión, la descripción y todos los permisos de la miniaplicación. Los permisos obligatorios no se pueden desmarcar; los permisos opcionales están marcados por defecto, pero puedes desmarcarlos antes de la instalación o ajustarlos después de instalarla.

Solo continúa si el propósito de la miniaplicación coincide con los permisos solicitados y la fuente es confiable. Las miniaplicaciones que requieren IA suelen mostrar [Capacidad de IA] → [Conversación].
{% endstep %}

{% step %}
### Instalar y abrir

Haz clic en [Instalar]. Una vez completada la instalación, la miniaplicación aparecerá en la cuadrícula de [Miniaplicaciones]; haz clic en el icono para ejecutarla.
{% endstep %}
{% endstepper %}

### Seleccionar modelos de IA para la miniaplicación

1. En la cuadrícula de [Miniaplicaciones], haz clic derecho en la miniaplicación objetivo y selecciona [Ver detalles].
2. Cambia a [Configuración] y busca [Modelos de IA].
3. Configura el [Modelo predeterminado] y el [Modelo rápido] según el uso de la miniaplicación. Si se dejan en blanco, seguirán respectivamente el modelo predeterminado global y el modelo rápido global de Cherry Studio.
4. Vuelve a abrir la miniaplicación y desencadena una operación de IA. Si no hay un modelo disponible, la miniaplicación debe indicar que la IA no está disponible temporalmente.

El [Modelo predeterminado] es adecuado para tareas principales como la generación de textos largos y el análisis complejo; el [Modelo rápido] es adecuado para tareas de baja latencia como sugerencias de títulos, reescritura de frases cortas y extracción de etiquetas. La ranura que se utilice finalmente la determina el diseño de la miniaplicación.

### Crear una versión mínima

Una miniaplicación generativa es, en esencia, un proyecto de página web estática. El directorio mínimo solo necesita dos archivos:

```
my-writer/
├── manifest.json
└── index.html
```

Primero crea `manifest.json`, declarando la información de la aplicación y los permisos `ai.chat`:

```json
{
  "id": "com.example.my-writer",
  "name": { "zh": "Asistente de reescritura", "en": "Rewrite Helper" },
  "description": "Introduce un texto y usa el modelo de IA de Cherry Studio para reescribirlo.",
  "version": "1.0.0",
  "entry": "index.html",
  "permissions": ["ai.chat"]
}
```

`id` Se recomienda usar un formato de dominio inverso que controles tú mismo, que solo pueda contener letras minúsculas, números, puntos y guiones. `com.cherrystudio.*` es un rango reservado por el oficial, no lo uses.

Luego, en `index.html`, invoca la IA mediante el objeto global `cherry`. El siguiente ejemplo primero verifica que el [Modelo predeterminado] esté disponible y luego muestra el texto en streaming por segmentos:

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="/__cherry/theme.css" />
    <title>Asistente de reescritura</title>
  </head>
  <body>
    <textarea id="source" placeholder="Introduce el texto que quieres reescribir"></textarea>
    <button id="rewrite">Reescribir</button>
    <pre id="result"></pre>

    <script>
      const button = document.querySelector('#rewrite')
      const source = document.querySelector('#source')
      const result = document.querySelector('#result')

      button.addEventListener('click', async () => {
        const capability = await cherry.ai.getCapabilities({ model: 'default' })
        if (!capability.available) {
          result.textContent = 'Configura primero un modelo disponible en los detalles de la miniaplicación.'
          return
        }

        result.textContent = ''
        await cherry.ai.chat(
          {
            model: 'default',
            reasoning: 'off',
            messages: [
              { role: 'system', content: 'Eres un editor de chino. Conserva el significado y mejora la claridad.' },
              { role: 'user', content: source.value }
            ]
          },
          {
            callId: `rewrite-${Date.now()}`,
            onChunk: (text) => {
              result.textContent += text
            }
          }
        )
      })
    </script>
  </body>
</html>
```

`window.cherry` y `cherry` apuntan a la misma interfaz del host, no es necesario importar un SDK. La miniaplicación solo puede enviar mensajes de texto; actualmente no se admite la entrada de imágenes ni la invocación de herramientas. Solo especifica el uso de la ranura `default` o `quick`, sin obtener el nombre del modelo, la información del proveedor ni la API Key.

### Empaquetar y probar

1. Asegúrate de que `manifest.json` esté en el directorio raíz del proyecto y que el archivo de entrada coincida con `entry`.
2. Ejecuta la compresión dentro del directorio del proyecto; en macOS o Linux puedes usar:

```bash
zip -r ../my-writer.miniapp . -x '.*' -x '__MACOSX/*'
```

En Windows PowerShell, primero genera un ZIP y luego cambia la extensión a `.miniapp`:

```powershell
Compress-Archive -Path .\* -DestinationPath ..\my-writer.zip
Rename-Item ..\my-writer.zip my-writer.miniapp
```

3. En el área de instalación de [Miniaplicaciones locales] de Cherry Studio, selecciona el `my-writer.miniapp` generado.
4. Confirma que la página de instalación solo solicite los permisos esperados, instálala, ábrela y prueba la entrada, la salida de IA, los mensajes de error y el estado tras reabrir.
5. Si necesitas depurar, abre [Herramientas de desarrollador] en la barra de herramientas de la miniaplicación para ver errores de página y solicitudes bloqueadas por el sandbox.

{% hint style="warning" %}
No comprimas la carpeta del proyecto completa desde un directorio externo; asegúrate de que el directorio raíz del archivo comprimido muestre directamente `manifest.json`. Cherry Studio también puede reconocer archivos comprimidos con una sola capa de directorio envolvente, pero una estructura de directorio raíz clara facilita la depuración.
{% endhint %}

## Resultado esperado

Tras la instalación, deberías ver el nuevo icono en la cuadrícula de [Miniaplicaciones]. Al abrirla, escribe texto y haz clic en el botón; el área de resultados mostrará continuamente el texto devuelto por el modelo. Haz clic derecho en la miniaplicación para ir a [Ver detalles], donde puedes ver el permiso de [Capacidad de IA] solicitado, la ranura de modelo utilizada y los registros de invocación recientes.

Si la instalación fue exitosa pero la IA no está disponible, primero revisa el modelo en [Ver detalles] → [Configuración] y luego verifica si [Permisos] permite [Capacidad de IA] → [Conversación].

## Capturas de pantalla clave

<figure><img src="../../../../../assets/e5eba0b497cc060dda3fe81c.webp" alt="Entrada de [Miniaplicaciones generativas] en el Panel de inicio."><figcaption><p>Entrada de [Miniaplicaciones generativas] en el Panel de inicio. </p></figcaption></figure>

1. Haz clic en [Miniaplicaciones generativas] para abrir el panel [Agregar miniaplicación].

<figure><img src="../../../../../assets/68bb09ec12fa8bbc76f5056c.webp" alt="Las miniaplicaciones locales admiten instalación desde archivo o URL."><figcaption><p>Las miniaplicaciones locales admiten instalación desde archivo o URL. </p></figcaption></figure>

1. Arrastra un paquete `.miniapp` o haz clic en [Seleccionar archivo…].
2. También puedes ingresar la URL de instalación HTTPS proporcionada por el desarrollador.

<figure><img src="../../../../../assets/de4dd1594767eab1bc306a63.webp" alt="La página de [Permisos] lista las capacidades del host autorizadas para la miniaplicación."><figcaption><p>La página de [Permisos] lista las capacidades del host autorizadas para la miniaplicación. </p></figcaption></figure>

1. Verifica que las autorizaciones de [Capacidad de IA] y de red, portapapeles, archivos, datos y notificaciones coincidan con el propósito de la miniaplicación.

<figure><img src="../../../../../assets/c6d6fce45e39a96b639f24ee.webp" alt="Gestiona las ranuras de modelos de IA en los detalles de la miniaplicación."><figcaption><p>Gestiona las ranuras de modelos de IA en los detalles de la miniaplicación. </p></figcaption></figure>

1. El [Modelo predeterminado] maneja las solicitudes de IA principales de la miniaplicación; si se deja en blanco, sigue el modelo predeterminado global.
2. El [Modelo rápido] maneja las solicitudes de baja latencia especificadas por la miniaplicación; si se deja en blanco, sigue el modelo rápido global.

{% hint style="info" %}
La interfaz y la salida reales de la miniaplicación las determina la propia miniaplicación; la imagen anterior utiliza un ejemplo de prueba de capacidades oficial para ilustrar la ubicación de permisos y gestión de modelos tras la instalación.
{% endhint %}

## Notas de configuración

| Elemento de configuración | Valor predeterminado del producto | Punto de partida sugerido | Función | Escenarios aplicables | Precauciones |
| ----- | --------------------- | ------------------------ | ----------------------- | -------------- | ----------------------- |
| Fuente de instalación | — | Usa un archivo local `.miniapp` para la primera prueba | Determina si se instala desde un paquete local o una URL HTTPS | Pruebas personales, distribución en equipo | Verifica primero el publicador, el código fuente y los permisos de miniaplicaciones de terceros |
| Permisos de IA | Declarados por la miniaplicación; los permisos opcionales están marcados por defecto al instalar | Otorga solo los permisos necesarios para completar la función | Permite invocar `cherry.ai.chat()` | Todas las funciones de IA | Los permisos obligatorios no se pueden revocar individualmente; desinstala si ya no confías en ella |
| Modelo predeterminado | Sigue el modelo predeterminado global | Usa un modelo de conversación que hayas verificado como disponible | Maneja tareas principales de generación y análisis | Textos largos, instrucciones complejas, salida estructurada | Las invocaciones se contarán en el uso del servicio del modelo correspondiente |
| Modelo rápido | Sigue el modelo rápido global | Selecciona un modelo más rápido para tareas cortas | Maneja tareas de baja latencia | Cambiar títulos, completar, clasificar, extraer etiquetas | La miniaplicación debe seleccionar explícitamente `quick` para usarlo |
| Modo de razonamiento | Desactivado si la miniaplicación no lo transmite | Desactívalo primero para reescrituras normales | Permite que los modelos compatibles con razonamiento realicen razonamiento previo | Análisis complejo, planificación | Los modelos que no admiten el cambio ignorarán este elemento |
| Estilo de tema | Sigue el tema claro/oscuro de Cherry Studio | Referencia `/__cherry/theme.css` | Usa variables de color proporcionadas por el host | Todas las interfaces personalizadas | Los recursos de CDN externos serán bloqueados por el sandbox; deben empaquetarse dentro de la aplicación |

### ¿Qué otras capacidades se pueden invocar

| Capacidad | Uso | Método de declaración |
| --------------------- | ----------------------- | ---------------------------------- |
| `cherry.storage` | Guardar configuraciones y estados en formato de cadena | `storage.*` o métodos específicos |
| `cherry.file` | Guardar, leer y exportar archivos en el propio sandbox de la miniaplicación | `file.*` o métodos específicos |
| `cherry.notification` | Enviar notificaciones del sistema a través de Cherry Studio | `notification.show` |
| `cherry.network` | Acceder a dominios HTTPS declarados en el manifiesto | `network.fetch`, y completar la lista de dominios `network` |
| `cherry.clipboard` | Leer y escribir texto plano cuando la miniaplicación es visible y tiene el foco del teclado | `clipboard.read`, `clipboard.write` |
| `cherry.app` | Leer la versión de la aplicación, el idioma y los permisos actuales | No requiere declaración |

Las miniaplicaciones locales no pueden usar directamente `localStorage`, APIs del navegador `fetch`, cookies, ventanas emergentes ni CDNs externos. Use `cherry.storage` cuando necesite guardar el estado, y `cherry.network.fetch` cuando necesite conectividad a la red, declarando los dominios permitidos en el manifiesto.

## Casos de uso

| Escenario | Entrada | Cómo lo hace la miniaplicación | Indicador de finalización |
| ------- | ----------- | ------------------------- | -------------- |
| Escritura y reescritura | Borrador, tono y requisitos de extensión | Generar el cuerpo con [Modelo predeterminado] y ofrecer opciones de título con [Modelo rápido] | Mantener el significado original y cambiar rápidamente entre diferentes expresiones |
| Organización de actas de reunión | Registro de la reunión pegado | Extraer conclusiones, responsables y fechas límite, y salir en un formato fijo | Cada acción tiene campos de responsable y fecha |
| Traducción multilingüe | Texto original, idioma objetivo y glosario | Fijar términos y formato de salida en el mensaje del sistema, y mostrar la traducción en streaming | Los términos técnicos son consistentes y se conserva la estructura de los párrafos |
| Extracción de información estructurada | Contratos, currículums o textos de retroalimentación | Solicitar al modelo que devuelva resultados según campos fijos, y que la página valide los elementos faltantes | Los campos obligatorios están completos y el contenido anómalo está marcado |
| Práctica de estudio | Notas, tipos de preguntas y nivel de dificultad | Generar preguntas, pistas y explicaciones, y guardar el progreso con datos del sandbox | Al reabrir, se puede continuar con la práctica anterior |
| Flujos de trabajo verticales | Plantillas de equipo y reglas de negocio | Combinar entrada, procesamiento por IA, confirmación manual y exportación en una sola interfaz | Las tareas repetitivas se completan de forma estable siguiendo el mismo flujo |

{% hint style="warning" %}
Los resultados de las miniaplicaciones generativas siguen siendo generados por el modelo seleccionado. Los usos de alto riesgo, como los médicos, legales o financieros, así como los datos que afecten a operaciones formales, deben ser revisados por personas con las calificaciones correspondientes.
{% endhint %}

## Preguntas frecuentes

<details>

<summary>¿Por qué no puedo invocar Cherry AI aunque haya introducido una URL de una página web?</summary>

[Sitio web] solo se encarga de abrir la página web y no inyecta `window.cherry` en ella. Cree la aplicación como un paquete `.miniapp` e instálela desde [Miniaplicación local].

</details>

<details>

<summary>¿Puede la miniaplicación ver mi API Key o el proveedor del modelo?</summary>

No. La miniaplicación solo solicita los slots [Modelo predeterminado] o [Modelo rápido]. Cherry Studio ejecuta la llamada en su nombre y no expone el nombre del modelo, la información del proveedor ni la API Key a la miniaplicación.

</details>

<details>

<summary>¿Por qué aparece un mensaje de que la IA no está disponible después de la instalación?</summary>

Primero abra [Ver detalles] → [Configuración] y confirme que hay un modelo disponible en el slot correspondiente; luego vaya a [Permisos] y confirme que [Capacidad de IA] → [Diálogo] está autorizado. Si el permiso es obligatorio pero ya no confía en la aplicación, desinstálela directamente.

</details>

<details>

<summary>¿Cómo puedo confirmar qué capacidades invocó la miniaplicación?</summary>

Abra [Ver detalles] → [Registro de actividad]. Aquí se registran las llamadas externas a IA, red, portapapeles, exportación de archivos, así como las llamadas denegadas, pero no se registran los prompts, las respuestas del modelo, el contenido del portapapeles ni el contenido de los archivos.

</details>

<details>

<summary>¿Cuál es la diferencia entre actualizar, revertir y borrar datos?</summary>

La actualización conserva los datos del sandbox y solicita confirmación nuevamente si se añaden permisos; después de la actualización, se puede revertir a la versión anterior. Borrar datos elimina los datos y archivos guardados por esa miniaplicación, pero conserva la aplicación; desinstalar elimina la aplicación, las autorizaciones y los datos.

</details>

## Referencias

* [Documentación de desarrollo y lista de la comunidad de Cherry Studio MiniApps](https://github.com/CherryHQ/cherry-studio-miniapps/blob/main/README.zh-CN.md)
* [Documentación de referencia oficial de MiniApp](https://github.com/CherryHQ/cherry-studio/tree/main/docs/references/mini-app)
* [Formato del manifiesto](https://github.com/CherryHQ/cherry-studio/blob/main/docs/references/mini-app/manifest.md)
* [Interfaces de capacidades](https://github.com/CherryHQ/cherry-studio/blob/main/docs/references/mini-app/capabilities.md)
* [Empaquetado, actualización y desinstalación](https://github.com/CherryHQ/cherry-studio/blob/main/docs/references/mini-app/packaging.md)
