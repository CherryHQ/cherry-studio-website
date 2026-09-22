---
icon: arrow-right-arrow-left
---
# Migración de V1 a V2

{% hint style="danger" %}
La migración es unidireccional: los datos de V1 pueden importarse a V2, pero los nuevos datos de V2 no se sincronizarán de vuelta a V1. Antes de actualizar, conserve una copia de seguridad completa de V1 y una copia del directorio de datos completo de V1 realizada después de cerrar completamente la aplicación.
{% endhint %}

{% hint style="warning" %}
La ruta correcta para conservar los datos es: **V1.9.13 → V2 (completar la migración de datos directamente)**. No es necesario instalar primero una versión intermedia específica de V2.
{% endhint %}

## Seleccione según su situación actual

| Situación actual | Acción |
| --------------- | ------------------------------------ |
| Aún está en V1 y necesita conservar los datos | Actualice V1 a 1.9.13 e instale V2 directamente siguiendo los pasos de esta página. |
| Ya está usando V2 | Actualice a V2 normalmente y continúe usando los datos actuales de V2; no haga clic en [Reiniciar migración]. |
| La migración de V1 anterior falló o omitió datos | Solo después de realizar una copia de seguridad completa de V2 actual, puede usar [Reiniciar migración] para comenzar de nuevo desde V1. |
| No necesita los datos de V1 | Puede seleccionar [Ignorar y usar valores predeterminados] para comenzar con la configuración predeterminada; los datos de V1 no se migrarán. |

## Confirmaciones antes de actualizar

* V1 no debe ser inferior a 1.9.12; se recomienda actualizar primero a la versión final 1.9.13 e iniciarla al menos una vez.
* Para la primera migración, puede usar directamente V2.
* El directorio de datos personalizado o el disco externo debe permitir lectura y escritura normales.
* Las conversaciones, Agent, las importaciones de base de conocimientos y las tareas de procesamiento de archivos deben haber finalizado.

{% hint style="warning" %}
El asistente de migración lee el directorio de datos actual de V1, no la copia de seguridad ZIP de V1. La copia de seguridad se utiliza para la recuperación ante imprevistos y no puede sustituir al directorio de datos original en la migración.
{% endhint %}

## Pasos de operación

{% stepper %}
{% step %}
### Actualice y haga una copia de seguridad de V1

Actualice V1 a 1.9.13. En la página de copia de seguridad de datos, desactive [Copia de seguridad simplificada], cree una copia de seguridad completa y guarde la copia de seguridad fuera del directorio de datos de la aplicación.
{% endstep %}

{% step %}
### Copie el directorio de datos completo de V1

Confirme la ubicación del directorio en la configuración de datos de V1 y copie el directorio completo después de cerrar completamente Cherry Studio. No copie solo el archivo de base de datos.
{% endstep %}

{% step %}
### Verifique el directorio personalizado

Al usar un disco duro externo, un volumen de red u otra ubicación personalizada, confirme que la ruta esté montada y permita lectura y escritura. Si la ruta no es accesible, no cambie al directorio predeterminado para continuar la migración.
{% endstep %}

{% step %}
### Inicie V2 por primera vez

Obtenga el paquete de instalación de V2 que corresponda a su sistema y chip desde [Descarga oficial de V2](https://cherryai.com.cn/download), o utilice la [página de publicación de GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases) o la [página de publicación de GitHub](https://github.com/CherryHQ/cherry-studio/releases). Instale e inicie la aplicación después de cerrar completamente V1.
{% endstep %}

{% step %}
### Complete el [Asistente de migración de datos]

Verifique la ubicación de los datos mostrada en el asistente y luego seleccione [Iniciar migración]. Durante la migración, no cierre la aplicación, no mueva el directorio de datos ni desconecte el disco externo.
{% endstep %}

{% step %}
### Revise los resultados y reinicie

Después de completar la migración, expanda primero la información de advertencia y luego seleccione [Reiniciar aplicación].
{% endstep %}
{% endstepper %}

## Verificaciones después de actualizar

* Verifique los servicios de modelos habituales, la API Key y el modelo predeterminado.
* Verifique los grupos de asistentes, los prompts, los permisos de Agent y las vinculaciones de la base de conocimientos.
* Abra las conversaciones, bases de conocimientos y archivos habituales; solo reconstruya las fuentes de conocimiento que muestren errores.
* En [Configuración] → [Búsqueda web], confirme nuevamente los servicios de búsqueda por palabras clave y lectura de URLs.
* Verifique los favoritos en la barra lateral y el CSS personalizado.
* En [Configuración] → [Datos], cree una nueva copia de seguridad completa de V2.

Para más cambios en las entradas, consulte [Diferencias de funciones](v1-v2-feature-differences.md).

## Use [Reiniciar migración] solo si la migración falla

Si la migración de V1 anterior falló o omitió datos, V2 permite seleccionar [Reiniciar migración] en [Configuración] → [Datos]. Esta operación reiniciará la aplicación y ejecutará la migración nuevamente desde los datos de V1 conservados.

{% hint style="danger" %}
[Reiniciar migración] eliminará permanentemente los datos actuales de V2 y no fusionará los datos de V1 y V2. A menos que la migración de V1 anterior haya fallado o haya omitido datos, no haga clic en esta opción bajo ninguna circunstancia. Debe crear una copia de seguridad completa de V2 actual antes de la operación; el nuevo contenido de V2 que deba conservarse también debe exportarse por separado.
{% endhint %}

## Si la migración falla

| Opción | Cuándo usarla | Precauciones |
| ---------- | --------------- | ---------------------------------------------- |
| [Reintentar] | Después de corregir problemas de directorio, disco o datos temporales | Opción preferida; no sale del flujo de migración. |
| [Guardar información del problema] | Si el reintento falla y necesita ayuda | El archivo se guarda solo localmente y puede contener rutas, contenido o credenciales; proporciónelo solo al equipo de soporte de Cherry Studio. |
| [Ignorar y usar valores predeterminados] | Si decide explícitamente no importar los datos de V1 | Elimina los datos parciales de V2 escritos en esta sesión y comienza con la configuración predeterminada; no se mostrará más el aviso automático de migración. |
| [Continuar usando V1] | Si no puede migrar temporalmente y necesita recuperar el trabajo | Reinstale V1 y continúe usando el directorio de datos original de V1. |

{% hint style="danger" %}
Si la migración falla o selecciona accidentalmente [Ignorar y usar valores predeterminados], no elimine la base de datos por su cuenta ni realice instalaciones de sobrescritura repetidas. Conserve los datos originales y la copia de seguridad de V1 y contacte al equipo de soporte de Cherry Studio.
{% endhint %}

## Preguntas frecuentes

<details>

<summary>Solo tengo la copia de seguridad ZIP de V1, ¿puedo migrar directamente?</summary>

No. Primero restaure y confirme que los datos son correctos en una versión compatible de V1, luego conserve el directorio de datos completo y luego inicie la migración a V2.

</details>

<details>

<summary>¿Debo reconstruir los índices de todas las bases de conocimientos?</summary>

No. Los índices válidos se migrarán; solo se procesarán las fuentes que muestren errores, falten modelos de incrustación o no sean legibles.

</details>

## Referencias

* [Descarga oficial de Cherry Studio V2](https://cherryai.com.cn/download)
* [Descarga oficial de Cherry Studio V1](https://cherryai.com.cn/download/v1)
* Página de publicación de V2: [GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases) · [GitHub](https://github.com/CherryHQ/cherry-studio/releases)
* [Descripción del diseño de migración oficial](https://github.com/CherryHQ/cherry-studio/blob/main/src/main/data/migration/v2/README.md#version-compatibility-gate)
* [Reporte de problemas y sugerencias de funciones](../../question-contact/suggestions.md)
