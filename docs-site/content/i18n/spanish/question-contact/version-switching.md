---
icon: arrow-right-arrow-left
---
# Actualización y degradación de versión

Al cambiar entre V1 y V2, seleccione primero la documentación correspondiente:

* [Diferencias de funciones](../cherry-studio/installation/v1-v2-feature-differences.md)
* [Actualización de V1 a V2](../cherry-studio/installation/v1-to-v2-migration.md)
* [Degradación de V2 a V1](../cherry-studio/installation/v2-to-v1-downgrade.md)

{% hint style="danger" %}
Antes de cambiar de versión, cree una copia de seguridad completa dentro de la aplicación, luego cierre completamente Cherry Studio y copie todo el directorio de datos. Las copias de seguridad de V1 y V2 no son compatibles entre sí.
{% endhint %}

## Migración de datos de V1 a V2

V2.0.2 admite la migración directa desde V1.9.13, por lo que ya no es necesario pasar por V2.0.0.

| Situación actual | Acción recomendada |
| --------------- | ---------------------------------- |
| Sigue en V1 y necesita conservar los datos | Actualice V1 a 1.9.13 y luego instale directamente V2.0.2 para completar la migración. |
| Ya está usando V2 | Actualice a V2.0.2 normalmente y continúe usando los datos actuales de V2. |
| La migración de V1 falló anteriormente o faltan datos | Solo puede usar [Migrar de nuevo] después de realizar una copia de seguridad completa de V2 actual. |
| No necesita los datos de V1 | Puede seleccionar [Ignorar y usar valores predeterminados], pero los datos de V1 no se migrarán. |

{% hint style="danger" %}
La opción [Migrar de nuevo] en [Configuración] → [Datos] elimina permanentemente los datos actuales de V2 y vuelve a importar desde los datos originales de V1. No fusiona los datos de ambas versiones; no la seleccione a menos que la migración de V1 haya fallado o haya omitido datos.
{% endhint %}

## Puntos de descarga

* [Descarga oficial de V1](https://cherryai.com.cn/download/v1)
* Página de lanzamiento de V2.0.2: [GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases/v2.0.2) · [GitHub](https://github.com/CherryHQ/cherry-studio/releases/tag/v2.0.2)
* [Descarga oficial de V2](https://cherryai.com.cn/download)

Para más información sobre copias de seguridad, fallos de migración y consideraciones sobre la base de datos, consulte [【Actualización y degradación】](../cherry-studio/installation/upgrade-downgrade.md).
