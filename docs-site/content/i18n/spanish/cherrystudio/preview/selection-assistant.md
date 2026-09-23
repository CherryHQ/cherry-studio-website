---
icon: highlighter
---
# Asistente de selección

El Asistente de selección (Selection Assistant) te permite, tras **seleccionar texto en cualquier aplicación**, invocar la IA mediante una barra de herramientas flotante para realizar operaciones como traducción, explicación, optimización o resumen, sin necesidad de pegar el contenido de vuelta en Cherry Studio.

{% hint style="info" %}
**Diferencia con el [Asistente rápido](quick-assistant.md)**:

* **Asistente rápido**: usa un atajo de teclado global para invocar una ventana de **entrada activa**, donde escribes tu pregunta.
* **Asistente de selección**: tras seleccionar texto, aparece una barra de herramientas **dirigida al contenido seleccionado**, permitiendo ejecutar operaciones predefinidas con un solo clic.
{% endhint %}

### Soporte de plataformas

* ✅ **macOS**: soporte completo, pero la primera activación requiere conceder el **permiso de Accesibilidad**
* ✅ **Windows**: soporte completo, sin permisos especiales
* ⚠️ **Linux**: soporte completo solo en modo **X11**; en modo Wayland, la barra de herramientas podría no posicionarse correctamente junto al texto seleccionado. Además, es necesario añadir el usuario actual al grupo `input` (`sudo usermod -aG input $USER`) para obtener permisos de escucha de teclas

### Activar el Asistente de selección

Abre [Ajustes] → [Asistente de selección]:

<figure><img src="../../../../assets/9c1fa1dc2820ccee7bd169f3.webp" alt=""><figcaption><p>Panel de configuración del Asistente de selección</p></figcaption></figure>

1. Activa el interruptor **Habilitado**
2. Los usuarios de **macOS** verán una ventana emergente solicitando el **permiso de Accesibilidad** en la primera activación:

   <figure><img src="../../../../assets/ed99fa5f9b3118d263e09cd2.webp" alt=""><figcaption><p>Solicitud de permiso de Accesibilidad en la primera activación</p></figcaption></figure>

   Haz clic en **Ir a Ajustes** → en la ventana emergente de [Ajustes del sistema] → [Privacidad y seguridad] → [Accesibilidad], encuentra Cherry Studio y activa el interruptor → vuelve a Cherry Studio y activa la función nuevamente.
3. (Opcional) En [Barra de herramientas] → [Método de selección], elige el método de activación (las opciones disponibles varían según la plataforma):
   * **Selección**: la barra de herramientas aparece inmediatamente al seleccionar texto (predeterminado)
   * **Tecla Ctrl** (solo Windows): la barra aparece **solo si mantienes pulsada la tecla Ctrl** tras seleccionar el texto (evita activaciones accidentales)
   * **Atajo de teclado**: la barra aparece al presionar el atajo de teclado tras seleccionar el texto; el atajo se configura en [Ajustes] → [Atajos de teclado]

<figure><img src="../../../../assets/f45f2fd96c9bb25af9825da7.webp" alt=""><figcaption><p>Panel de configuración tras la activación: Método de selección / Modo compacto / Seguir barra de herramientas…</p></figcaption></figure>

### Operaciones integradas

El Asistente de selección ofrece 7 operaciones integradas, **5 habilitadas por defecto**: Traducción / Explicación / Resumen / Búsqueda / Copiar. El **icono de Cherry en el lado izquierdo de la barra de herramientas no es un botón de acción**; es simplemente el asa de arrastre de la barra, que permite moverla completa.

| Operación | Habilitada por defecto | Uso |
|---|---|---|
| **Traducción** | ✅ | Traducción inteligente: prioriza la traducción al idioma objetivo; si ya está en el idioma objetivo, traduce al idioma alternativo |
| **Explicación** | ✅ | Pide a la IA que explique este contenido |
| **Resumen** | ✅ | Pide a la IA que resuma el contenido seleccionado en un párrafo |
| **Búsqueda** | ✅ | Llama a un motor de búsqueda con el texto seleccionado (Google por defecto, modificable mediante el icono ⋯ a la derecha de cada elemento) |
| **Copiar** | ✅ | Copia el texto seleccionado |
| **Optimización** | Pendiente de activación | Pide a la IA que reescriba el texto para que sea más fluido / profesional; debe arrastrarse al área de habilitación en los ajustes |
| **Cita** | Pendiente de activación | Envía el texto seleccionado como cita a la conversación actual; debe arrastrarse al área de habilitación en los ajustes |

<figure><img src="../../../../assets/29cffab07ecb8317865312ee.webp" alt=""><figcaption><p>Sección [Funciones] del panel de configuración: arriba están las habilitadas, abajo el área de espera; arrastra desde abajo a arriba para habilitar</p></figcaption></figure>

### Operaciones personalizadas

En [Ajustes] → [Asistente de selección] → [Funciones] puedes:

* **Editar** los prompts de las operaciones integradas
* **Añadir** operaciones personalizadas (nombre + prompt + modelo predeterminado)
* **Arrastrar** para ajustar el orden de las operaciones en la barra de herramientas
* Arrastrar las operaciones poco usadas al área de espera inferior para "desactivarlas"

### Apariencia de la barra de herramientas / ventana de resultados

Barra de herramientas:
* **Modo compacto**: muestra solo iconos, sin texto, ahorrando espacio en pantalla

Ventana de resultados (sección [Ventana de funciones]):
* **Seguir barra de herramientas**: la ventana aparece pegada a la barra de herramientas (activada por defecto); si se desactiva, siempre aparece centrada
* **Recordar tamaño**: conserva el tamaño de la ventana ajustado manualmente en la sesión actual para la próxima vez
* **Cierre automático**: se cierra al hacer clic fuera de la ventana
* **Mantener al frente**: siempre flota sobre otras aplicaciones
* **Transparencia**: ajustable entre 20% y 100%

### Motor de búsqueda

La operación [Búsqueda] integrada en el Asistente de selección permite elegir motores predefinidos (Google, Bing, DuckDuckGo, etc.). La configuración se encuentra en [Ajustes] → [Asistente de selección] → [Funciones]: localiza la entrada **Búsqueda**, haz clic en el icono de engranaje a la derecha de la fila para abrir el diálogo [Configurar motor de búsqueda], donde puedes elegir entre los predefinidos o añadir un motor personalizado; usa `{{queryString}}` en la URL para indicar la posición del término de búsqueda.

### Filtro de aplicaciones (avanzado)

En [Ajustes] → [Asistente de selección] → [Avanzado] → [Filtro de aplicaciones] puedes configurar una **lista negra / lista blanca** para que el Asistente de selección funcione solo en aplicaciones específicas (lista blanca) o no aparezca en aplicaciones específicas (lista negra).

* **macOS**: introduce el Bundle ID de la aplicación (por ejemplo, `com.google.Chrome`, `com.apple.mail`)
* **Windows**: introduce el nombre del archivo ejecutable de la aplicación (por ejemplo, `chrome.exe`, `Cherry Studio.exe`)

### Modelo utilizado

El Asistente de selección utiliza por defecto el [modelo de conversación global predeterminado](../../pre-basic/settings/default-models.md), aunque también puedes especificar un modelo individual para cada operación.

### Consejos y trucos

* En macOS, si la barra de herramientas no aparece, verifica que Cherry Studio esté marcado en [Ajustes del sistema] → [Privacidad y seguridad] → [Accesibilidad]
* ¿La barra de herramientas aparece frecuentemente por selecciones accidentales? Cambia al modo de activación por **tecla Ctrl**
* ¿Demasiados iconos en la barra de herramientas ocupan la pantalla? Activa el **modo compacto**
* ¿Quieres realizar operaciones encadenadas como "traducir y luego leer en voz alta"? Copia el resultado de "Traducción" e invoca el [Asistente rápido](quick-assistant.md) para continuar el procesamiento

***

### Obtener ayuda y enviar comentarios

Si tienes cualquier duda, encuentras un error o tienes sugerencias de mejora de funciones durante la configuración o el uso, consulta los canales oficiales proporcionados en [Comentarios y sugerencias](../../question-contact/suggestions.md).
