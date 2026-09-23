---
icon: grid-2
---
# Miniaplicaciones

Las **miniaplicaciones** permiten ejecutar servicios web y herramientas locales instaladas dentro de Cherry Studio. Además de abrir las versiones web de los proveedores de IA, puedes instalar miniaplicaciones generativas personalizadas que, mediante interfaces autorizadas, llamen a los modelos de IA ya configurados en Cherry Studio.

### Diferencia entre dos tipos de miniaplicaciones

| Tipo | Método de adición | ¿Puede llamar a Cherry AI? | Escenarios adecuados |
| ----- | ---------------------------- | -------------- | ----------------------------------- |
| Sitio web | Ingresar nombre, URL y logo | No | Fijar sitios web frecuentes en Cherry Studio, manteniendo el estado de inicio de sesión propio de cada sitio |
| Miniaplicación local | Instalar un paquete `.miniapp` o instalarlo desde la URL proporcionada por el desarrollador | Sí, mediante autorización durante la instalación | Escritura, resumen, traducción, extracción de información y flujos de trabajo verticales personalizados con IA |

{% hint style="info" %}
Si deseas crear una "miniaplicación personalizada que pueda llamar a Cherry AI", utiliza una **miniaplicación local**, en lugar de un **sitio web** que solo requiera ingresar una URL. Consulta la guía completa en [Miniaplicaciones generativas](generative-mini-apps.md).
{% endhint %}

### Acceder a las miniaplicaciones

{% stepper %}
{% step %}
### Abrir el Launchpad

Haz clic en `+` en la barra de pestañas superior, o abre directamente el **Launchpad**.
{% endstep %}

{% step %}
### Acceder a las miniaplicaciones

Haz clic en el icono de la aplicación **Miniaplicaciones**.
{% endstep %}

{% step %}
### Seleccionar un servicio

Selecciona el servicio que deseas abrir en la cuadrícula de miniaplicaciones.
{% endstep %}
{% endstepper %}

<figure><img src="../../../../../assets/014d34ba53fb03d6d894116c.webp" alt=""><figcaption><p>Cuadrícula de miniaplicaciones, con decenas de servicios integrados; haz clic en <code>+</code> en la esquina superior derecha para añadir cualquier página web</p></figcaption></figure>

En la parte central de la página hay un **cuadro de búsqueda**; `+` en la esquina superior derecha sirve para añadir páginas web personalizadas, y `☰` abre los **Ajustes de visualización de miniaplicaciones**.

### Configuración

En **Ajustes** → **Miniaplicaciones** puedes realizar los siguientes ajustes:

* **Mostrar / ocultar miniaplicaciones**: puedes arrastrar las miniaplicaciones a la izquierda o derecha hacia dos áreas para controlar su visibilidad
* **Ordenar miniaplicaciones**: arrastra hacia arriba o abajo para reordenar las miniaplicaciones
* **Filtrado por área de miniaplicaciones**: según tu selección, se ocultan automáticamente las miniaplicaciones a las que no tienes acceso
* **Cantidad de caché de miniaplicaciones**: si el número de miniaplicaciones abiertas simultáneamente supera este límite, algunas pasarán a un estado inactivo

### Añadir y gestionar

Las miniaplicaciones de Cherry Studio admiten las siguientes operaciones:

* **Añadir al Launchpad**: añade las miniaplicaciones frecuentes al Launchpad para abrirlas rápidamente desde la entrada `+`. Puedes gestionarlas en **Ajustes** → **Miniaplicaciones**, o hacer clic derecho en el icono de la miniaplicación y seleccionar **Añadir al Launchpad**
* **Añadir a la barra lateral**: fija las miniaplicaciones frecuentes en la barra lateral izquierda para acceso directo; haz clic derecho en el icono de la miniaplicación para seleccionar **Añadir a la barra lateral** o **Quitar de la barra lateral**
* **Mantener activo (Keep Alive)**: evita que la ventana de la miniaplicación se destruya inmediatamente al cambiar de vista, de modo que al volver no sea necesario iniciar sesión de nuevo ni recargar
* **Añadir sitio web**: haz clic en `+` en la esquina superior derecha de la página, ingresa el nombre, la URL y el logo en **Sitio web** para añadirlo a la cuadrícula
* **Instalar miniaplicación local**: haz clic en `+` en la esquina superior derecha de la página, cambia a **Miniaplicación local**, selecciona el paquete `.miniapp` o ingresa la URL de instalación proporcionada por el desarrollador. Confirma los permisos para completar la instalación
* **Ver detalles de la miniaplicación local**: haz clic derecho en la miniaplicación local y selecciona **Ver detalles** para gestionar permisos, modelos de IA, almacenamiento, registro de actividad y actualizaciones
* **Eliminar / editar**: las miniaplicaciones de tipo sitio web se pueden editar o eliminar mediante clic derecho; las miniaplicaciones locales se pueden desinstalar desde **Ver detalles**

Al abrir una miniaplicación, su ventana incluye una barra de herramientas integrada: **Atrás**, **Adelante**, **Recargar**, **Abrir en el navegador**. También puedes cambiar si los enlaces internos se abren en la ventana predeterminada o en el navegador del sistema.

<figure><img src="../../../../../assets/efa6c8dd5b1bb7b7cd417561.webp" alt=""><figcaption><p>Barra de herramientas de la ventana de miniaplicación: atrás / adelante / recargar a la izquierda, abrir en el navegador, añadir al Launchpad y método de apertura de enlaces internos a la derecha</p></figcaption></figure>

### Consejos y trucos

* Las miniaplicaciones de tipo sitio web utilizan la versión web del servicio; el estado de inicio de sesión, las cookies y la configuración se guardan localmente y están aisladas del navegador del sistema
* Las miniaplicaciones locales se ejecutan en un sandbox independiente y no pueden leer archivos de otras miniaplicaciones ni de la computadora; solo se pueden invocar las capacidades que hayas autorizado
* Si una miniaplicación no carga, haz clic derecho → Recargar, o revisa la configuración del proxy (consulta [Ajustes generales](../../../pre-basic/settings/general.md))

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Miniaplicaciones generativas</strong></td><td>Crea, instala y gestiona miniaplicaciones personalizadas que pueden llamar a Cherry AI</td><td><a href="generative-mini-apps.md">generative-mini-apps.md</a></td></tr></tbody></table>

Si tienes algún problema, envía tu comentario en [Comentarios y sugerencias](../../../question-contact/suggestions.md).

***

### Obtener ayuda y enviar comentarios

Si tienes cualquier duda, error o sugerencia de mejora de funciones durante la configuración o el uso, consulta los canales oficiales proporcionados en [Comentarios y sugerencias](../../../question-contact/suggestions.md).
