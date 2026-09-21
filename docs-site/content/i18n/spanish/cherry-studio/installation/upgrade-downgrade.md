---
icon: arrows-rotate
---
# Actualización y degradación

Seleccione las instrucciones correspondientes según la versión actual y la versión de destino. V1 y V2 utilizan estructuras de datos diferentes; es obligatorio realizar una copia de seguridad antes de cambiar entre versiones principales.

{% hint style="danger" %}
Los datos y los formatos de copia de seguridad de V1 y V2 no son compatibles. Las sesiones, Agentes, configuraciones y archivos nuevos en V2 no se reescribirán automáticamente en V1.
{% endhint %}

## Actualización y migración a V2.0.2

{% hint style="warning" %}
Si necesita conservar los datos de V1, la ruta correcta es: **V1.9.13 → V2.0.2 (completar la migración de datos directamente)**. Ya no es necesario instalar V2.0.0 primero.
{% endhint %}

| Situación actual | Qué debe hacer |
| --------------- | ------------------------------------ |
| Sigue en V1 y necesita conservar los datos | Actualice V1 a 1.9.13 y luego instale directamente V2.0.2 para completar la migración. |
| Ya está usando V2 | Actualice a V2.0.2 normalmente y continúe usando los datos actuales de V2; no haga clic en [Reintentar migración]. |
| La migración de V1 falló anteriormente o faltan datos | Solo después de realizar una copia de seguridad completa de V2 actual, puede usar [Reintentar migración] en [Configuración] → [Datos]. |
| No necesita los datos de V1 | Puede seleccionar [Ignorar y usar valores predeterminados], pero los datos de V1 no se migrarán. |

{% hint style="danger" %}
[Reintentar migración] eliminará permanentemente los datos actuales de V2 y volverá a importar desde los datos originales de V1; no fusionará ni conservará los datos de ambos lados. A menos que la migración de V1 haya fallado anteriormente o haya omitido datos, no debe hacer clic en esta opción.
{% endhint %}

## Selección de ruta

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Recordatorio de actualización destructiva</strong></td><td>Confirme primero la incompatibilidad de datos, la reintegración de migración y las limitaciones de reversión.</td><td><a href="v2-breaking-update-notice.md">v2-breaking-update-notice.md</a></td></tr><tr><td><strong>Diferencias de funciones</strong></td><td>Comprenda los cambios en la interfaz, Agentes, base de conocimientos, etc., y los elementos que deben verificarse después de la actualización.</td><td><a href="v1-v2-feature-differences.md">v1-v2-feature-differences.md</a></td></tr><tr><td><strong>Actualización de V1 a V2</strong></td><td>Realice una copia de seguridad de los datos de V1 y use directamente V2.0.2 para completar la migración.</td><td><a href="v1-to-v2-migration.md">v1-to-v2-migration.md</a></td></tr><tr><td><strong>Degradación de V2 a V1</strong></td><td>Vuelva a los datos originales de V1 y comprenda cuándo es necesario procesar la base de datos de V2.</td><td><a href="v2-to-v1-downgrade.md">v2-to-v1-downgrade.md</a></td></tr></tbody></table>

## Preparación antes del cambio

1. Finalice las conversaciones en curso, Agentes, importaciones de base de conocimientos y tareas de procesamiento de archivos.
2. Cree una copia de seguridad completa nueva de la versión actual y guárdela fuera del directorio de datos de la aplicación.
3. Anote el directorio de datos de la aplicación actual; si usa un directorio personalizado o un disco externo, confirme que la ruta sea accesible correctamente.

{% hint style="warning" %}
No elimine manualmente los datos de la aplicación para un "desinstalado completo". El procesamiento de la base de datos solo aplica si se descarta explícitamente todos los datos de V2 o se realiza una reintegración de migración; consulte [【Degradación de V2 a V1】](v2-to-v1-downgrade.md).
{% endhint %}

## Enlaces de descarga

* [Descarga oficial de Cherry Studio V2](https://cherryai.com.cn/download)
* [Descarga oficial de Cherry Studio V1](https://cherryai.com.cn/download/v1)
* Página de lanzamiento de V2.0.2: [GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases/v2.0.2) · [GitHub](https://github.com/CherryHQ/cherry-studio/releases/tag/v2.0.2)
