---
description: 数据设置→Obsidian配置
icon: gem
---

{% hint style="warning" %}
Este documento ha sido traducido del chino por IA y aún no ha sido revisado.
{% endhint %}

# Tutorial de Configuración de Obsidian

Cherry Studio soporta la integración con Obsidian, permitiendo exportar conversaciones completas o individuales a la biblioteca de Obsidian.

{% hint style="warning" %}
Este proceso no requiere instalar complementos adicionales de Obsidian. Sin embargo, como la importación a Obsidian desde Cherry Studio funciona de manera similar a Obsidian Web Clipper, se recomienda actualizar Obsidian a la versión más reciente (la versión actual debe ser superior a **1.7.2**) para evitar [fallos de importación en conversaciones extensas](https://github.com/obsidianmd/obsidian-clipper/releases/tag/0.7.0).
{% endhint %}

## Tutorial Actualizado

{% hint style="info" %}
A diferencia de la versión anterior, la nueva función de exportación a Obsidian selecciona automáticamente la ruta de la biblioteca, eliminando la necesidad de ingresar manualmente nombres de bibliotecas o carpetas.
{% endhint %}

### Paso 1: Configurar Cherry Studio

En Cherry Studio, ve a _Configuración_ → _Configuración de Datos_ → Menú de _Configuración de Obsidian_. El menú desplegable mostrará automáticamente las bibliotecas de Obsidian abiertas localmente. Selecciona tu biblioteca objetivo:

<figure><img src="../../../assets/449d1a8ce3c2bcc5f7e7158f.webp" alt=""><figcaption></figcaption></figure>

### Paso 2: Exportar Conversaciones

#### Exportar conversación completa

En la interfaz de conversación de Cherry Studio, haz clic derecho en una conversación, selecciona _Exportar_ y luego _Exportar a Obsidian_:

<figure><img src="../../../assets/ceedc9e8d1dabc9d39035c30.webp" alt=""><figcaption></figcaption></figure>

Aparecerá una ventana para ajustar las **Propiedades** de la nota, su **ubicación en carpetas** de Obsidian y el **método de procesamiento**:

* **Biblioteca**: Menú desplegable para seleccionar otras bibliotecas
* **Ruta**: Menú desplegable para elegir la carpeta de destino
* Propiedades de nota (Properties):
  * Etiquetas (tags)
  * Fecha de creación (created)
  * Fuente (source)
* Métodos de procesamiento:
  * **Nueva (sobrescribe si existe)**: Crea una nueva nota, reemplaza si existe
  * **Prepend**: Añade contenido al inicio de notas existentes
  * **Append**: Añade contenido al final de notas existentes

{% hint style="info" %}
Solo el primer método incluye Properties; los otros dos no las añaden.
{% endhint %}

<figure><img src="../../../assets/f0b3dbe0fb29172b330958e5.webp" alt=""><figcaption><p>Configurar propiedades de la nota</p></figcaption></figure>

<figure><img src="../../../assets/cb66a0409ef6e24286102647.webp" alt=""><figcaption><p>Seleccionar ruta</p></figcaption></figure>

<figure><img src="../../../assets/15f4032a3a159c08df6cf1b3.webp" alt=""><figcaption><p>Elegir método de procesamiento</p></figcaption></figure>

Tras configurar, haz clic en "Confirmar" para exportar.

#### Exportar mensaje individual

Para mensajes individuales, haz clic en el _menú de tres líneas_ debajo del mensaje, elige _Exportar_ y luego _Exportar a Obsidian_:

<figure><img src="../../../assets/6851b3aa7d82a4a919e2e8b0.webp" alt=""><figcaption><p>Exportar mensaje individual</p></figcaption></figure>

Aparece la misma ventana de configuración que para conversaciones completas. Configura siguiendo el [tutorial anterior](obsidian.md#dao-chu-wan-zheng-dui-hua).

### Exportación exitosa

🎉 ¡Felicidades! Has completado la configuración de integración y exportación. ¡Disfrútalo!

<figure><img src="../../../assets/6fce517b2e745598598db14c.webp" alt=""><figcaption><p>Exportar a Obsidian</p></figcaption></figure>

<figure><img src="../../../assets/0ea57dab41aa40f6e0298917.webp" alt=""><figcaption><p>Ver resultados exportados</p></figcaption></figure>

***

## Tutorial Antiguo (para Cherry Studio < v1.1.13)

### Paso 1: Preparar Obsidian

Crea una carpeta en tu biblioteca de Obsidian para almacenar las conversaciones exportadas (ejemplo: "Cherry Studio"):

<figure><img src="../../../assets/a492ac55a35d0e0afc9e33a9.webp" alt=""><figcaption></figcaption></figure>

Registra el nombre de tu _Biblioteca_ (marcado en rojo).

### Paso 2: Configurar Cherry Studio

En _Configuración_ → _Configuración de Datos_ → _Configuración de Obsidian_, ingresa el nombre de la _Biblioteca_ y la _Carpeta_ obtenidos en el Paso 1:

<figure><img src="../../../assets/e7da08d7e70d410c2ae09fee.webp" alt=""><figcaption></figcaption></figure>

Las etiquetas globales (Global tags) son opcionales para notas exportadas.

### Paso 3: Exportar Conversaciones

#### Exportar conversación completa

Haz clic derecho en una conversación → _Exportar_ → _Exportar a Obsidian_:

<figure><img src="../../../assets/c8b256177ded017f9beaf29c.webp" alt=""><figcaption><p>Exportar conversación completa</p></figcaption></figure>

Configura **Propiedades** y elige un método de procesamiento:
* **Nueva (sobrescribe si existe)**
* **Prepend**
* **Append**

<figure><img src="../../../assets/23b06f100f14cffe09a12878.webp" alt=""><figcaption><p>Configurar propiedades de la nota</p></figcaption></figure>

{% hint style="info" %}
Solo el primer método incluye Properties.
{% endhint %}

#### Exportar mensaje individual

Usa el _menú de tres líneas_ bajo el mensaje → _Exportar_ → _Exportar a Obsidian_:

<figure><img src="../../../assets/53a5477e29c3e58af139fe15.webp" alt=""><figcaption><p>Exportar mensaje individual</p></figcaption></figure>

Configura siguiendo el [tutorial anterior](obsidian.md#dao-chu-wan-zheng-dui-hua).

### Exportación exitosa

🎉 ¡Configuración completada exitosamente!

<figure><img src="../../../assets/6fce517b2e745598598db14c.webp" alt=""><figcaption><p>Exportar a Obsidian</p></figcaption></figure>

<figure><img src="../../../assets/0ea57dab41aa40f6e0298917.webp" alt=""><figcaption><p>Ver resultados exportados</p></figcaption></figure>