---
icon: triangle-exclamation
---
# Aviso de actualización con cambios incompatibles

V2 no es una actualización de reemplazo convencional. Cambia la estructura de datos y ajusta los puntos de entrada y el comportamiento de funciones como asistentes, Agent, bases de conocimiento, búsqueda web y archivos.

{% hint style="danger" %}
Los datos de V1 solo pueden migrarse de forma unidireccional a V2. Las sesiones, Agent, configuraciones y archivos nuevos en V2 no se sincronizarán de vuelta a V1, y las copias de seguridad de V1 y V2 no se pueden restaurar mutuamente.
{% endhint %}

## V2.0.2 puede migrar V1 directamente

Si necesita conservar los datos de V1, siga el procedimiento **V1.9.13 → V2.0.2 (migración de datos directa)**; ya no es necesario usar V2.0.0 como intermediario.

| Situación actual | Qué debe hacer |
| --------------- | --------------------------------- |
| Sigue en V1 y necesita conservar los datos | Actualice V1 a 1.9.13, realice una copia de seguridad completa e instale V2.0.2 directamente. |
| Ya está usando V2 | Actualice a V2.0.2 normalmente y continúe usando los datos actuales de V2. |
| La migración de V1 falló anteriormente o faltan datos | Primero realice una copia de seguridad completa de V2 actual y luego considere usar [Migrar de nuevo]. |
| No necesita los datos de V1 | Puede seleccionar [Ignorar y usar valores predeterminados], pero los datos de V1 no se migrarán. |

{% hint style="danger" %}
Para actualizar a V2.0.2 normalmente, no es necesario hacer clic en [Migrar de nuevo]. Esta operación elimina permanentemente los datos actuales de V2 y vuelve a importar desde los datos originales de V1; no la seleccione a menos que la migración de V1 haya fallado anteriormente o haya omitido datos.
{% endhint %}

## Requisitos previos obligatorios

1. Actualice V1 a 1.9.13 y asegúrese de que se inicia correctamente al menos una vez.
2. Desactive [Copia de seguridad simplificada] y cree una copia de seguridad completa de V1.
3. Cierre Cherry Studio por completo y luego copie todo el directorio de datos de V1.
4. Si usa un directorio personalizado o un disco externo, confirme que la ruta esté montada y sea legible y escribible.

El asistente de migración lee el directorio de datos actual de V1, no la copia de seguridad ZIP. La copia de seguridad se usa para recuperación ante imprevistos y no puede sustituir al directorio de datos original en la migración.

## [Migrar de nuevo] no es una fusión de datos

V2.0.2 añade [Migrar de nuevo] en [Configuración] → [Datos]. Solo se usa para corregir casos donde la migración de V1 haya fallado anteriormente o haya omitido datos.

Antes de la operación, se le pedirá que confirme lo siguiente:

* Los datos actuales de V2 se eliminarán permanentemente y no se puede deshacer.
* Los datos originales de V1 se conservarán y se volverán a importar tras reiniciar.
* Debe crear primero una copia de seguridad completa de V2 actual.

Una copia de seguridad completa no fusiona automáticamente los datos de V1 y V2. Si necesita conservar nuevo contenido de V2, expórtelo por separado o conserve una copia de seguridad completa.

{% hint style="danger" %}
En [Configuración] → [Datos] → [Limpiar caché], la opción [Datos residuales de la versión v1] eliminará los datos originales de V1 necesarios para [Migrar de nuevo]. No limpie esta opción hasta confirmar que el resultado de la migración es completo y conservar una copia de seguridad independiente.
{% endhint %}

## Verificaciones clave tras la actualización

* Servicios de modelos, API Key y modelo predeterminado; Anthropic OAuth no se migrará, deberá usar API Key.
* Grupos de asistentes, orden de indicaciones, permisos de herramientas de Agent y vinculaciones de bases de conocimiento.
* Orígenes fallidos en bases de conocimiento, servicios de búsqueda por palabras clave y lectura de URLs en búsqueda web.
* CSS personalizado, favoritos en la barra lateral y archivos faltantes.

Vea la comparación completa en [Diferencias de funciones](v1-v2-feature-differences.md).

## Si la migración falla o necesita revertir

* Priorice usar [Reintentar] y continúe después de corregir problemas en el directorio de datos, el disco o los datos.
* [Guardar información del problema] solo se guarda localmente; el archivo puede contener rutas, contenido o credenciales, proporciónelo solo al equipo de soporte de Cherry Studio.
* [Ignorar y usar valores predeterminados] comenzará con la configuración predeterminada, los datos de V1 no se migrarán.
* Para volver a V1 normalmente, no es necesario eliminar la base de datos, ni debe restaurar una copia de seguridad de V2 en V1.

{% hint style="danger" %}
No elimine ni reemplace la base de datos por su cuenta. En caso de error de operación, si no puede confirmar el directorio de datos o si necesita migrar de nuevo, conserve primero todas las copias de seguridad y directorios de datos, y luego contacte al equipo de soporte de Cherry Studio.
{% endhint %}

## Continuar leyendo

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Diferencias de funciones</strong></td><td>Vea la migración automática, lo que requiere revisión y lo que no se hereda.</td><td><a href="v1-v2-feature-differences.md">v1-v2-feature-differences.md</a></td></tr><tr><td><strong>Actualización de V1 a V2</strong></td><td>Complete la copia de seguridad, la migración y la verificación en el orden correcto de versiones.</td><td><a href="v1-to-v2-migration.md">v1-to-v2-migration.md</a></td></tr><tr><td><strong>Descarga de V2 a V1</strong></td><td>Conozca las precauciones para revertir, copias de seguridad y manejo de la base de datos.</td><td><a href="v2-to-v1-downgrade.md">v2-to-v1-downgrade.md</a></td></tr></tbody></table>

## Enlaces de descarga

* [Descarga oficial de V1](https://cherryai.com.cn/download/v1)
* Página de lanzamiento de V2.0.2: [GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases/v2.0.2) · [GitHub](https://github.com/CherryHQ/cherry-studio/releases/tag/v2.0.2)
* [Descarga oficial de V2](https://cherryai.com.cn/download)
