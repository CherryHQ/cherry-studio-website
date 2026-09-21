---
icon: linux
---
# Linux

## 1. Descargar el paquete de instalación

Abra la [página de descargas oficial](https://cherryai.com.cn/download/v2) y seleccione **Linux**. El sitio web oficial ofrece paquetes de instalación en diferentes formatos según el sistema y la arquitectura:

| Escenario de uso | Recomendación de selección |
| ------------------------ | ----------------------- |
| Ubuntu, Debian, Linux Mint | Seleccione el paquete `.deb` que coincida con la arquitectura. |
| Fedora, RHEL, openSUSE | Seleccione el paquete `.rpm` que coincida con la arquitectura. |
| Otras distribuciones o ejecución portátil | Seleccione el paquete `.AppImage` que coincida con la arquitectura. |

Los dispositivos Intel / AMD suelen seleccionar la versión x64 (o x86\_64); los dispositivos ARM seleccionan la versión ARM64 (o aarch64). Si no está seguro de la arquitectura, ejecute `uname -m` en la terminal: `x86_64` corresponde a x64, y `aarch64` o `arm64` corresponden a ARM64.

## 2. Instalar e iniciar

* `.deb` y `.rpm`: Utilice preferentemente el instalador de software o el gestor de paquetes de la distribución para abrir el paquete de instalación, y luego inicie Cherry Studio desde el menú de aplicaciones.
* `.AppImage`: Otorgue permisos de ejecución al archivo y haga doble clic para ejecutarlo; también puede ejecutar `chmod +x nombre-del-archivo.AppImage` en la terminal y luego iniciar la aplicación.

## No se puede iniciar

Primero, confirme que el paquete de instalación coincide con la arquitectura del sistema. Si AppImage no se inicia y muestra errores relacionados con `FUSE` o `libfuse`, instale los componentes de compatibilidad correspondientes según la documentación oficial de su distribución actual.

Si aún no se puede iniciar, proporcione en su informe la distribución, el entorno de escritorio, la arquitectura del dispositivo, el nombre del paquete de instalación y el mensaje de error completo.

## Siguiente paso

Una vez que vea la interfaz principal de Cherry Studio, continúe para completar la configuración inicial rápida.
