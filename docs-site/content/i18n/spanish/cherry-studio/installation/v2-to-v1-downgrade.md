---
icon: arrow-rotate-left
---
# Descarga de V2 a V1

La descarga es adecuada cuando V2 afecta temporalmente el trabajo crítico y aún se conservan datos de V1 utilizables. No convierte los datos de V2 al formato de V1.

{% hint style="danger" %}
Las sesiones, Agentes, configuraciones y archivos nuevos en V2 no volverán a V1. Las copias de seguridad de V2 tampoco se pueden restaurar en V1; antes de la descarga, conserve por separado la copia de seguridad más reciente de V2 y la copia de seguridad original de V1 o una copia del directorio de datos.
{% endhint %}

## Descarga normal

{% stepper %}
{% step %}
### Detener tareas y hacer copia de seguridad de V2

Finalice las conversaciones, Agentes y tareas de procesamiento de archivos en ejecución. Cree una copia de seguridad completa nueva de V2 en [Configuración] → [Datos] y guárdela fuera del directorio de datos de la aplicación.
{% endstep %}

{% step %}
### Confirmar que los datos de V1 siguen presentes

Localice la copia del directorio de datos de V1 conservada antes de la actualización o la copia de seguridad de V1. Si solo hay una copia de seguridad de V1, debe restaurarla en una versión compatible de V1; no puede importarse a V2.
{% endstep %}

{% step %}
### Descargar e instalar V1

Salga completamente de V2, obtenga el paquete de instalación que coincida con el sistema actual desde [Descarga oficial de V1](https://cherryai.com.cn/download/v1) y complete la instalación.
{% endstep %}

{% step %}
### Iniciar con los datos originales de V1

Inicie V1 y utilice el directorio de datos de V1 anterior a la actualización. No lo sobrescriba con la base de datos de V2 o la copia de seguridad de V2.
{% endstep %}

{% step %}
### Verificar antes de continuar el trabajo

Revise las sesiones habituales, los servicios de modelos, la base de conocimientos y los archivos. No elimine ninguna copia de seguridad de V1 o V2 hasta confirmar que los datos de V1 son normales.
{% endstep %}
{% endstepper %}

{% hint style="info" %}
La descarga normal no requiere eliminar la base de datos. Conservar los datos de V2 facilita el regreso a V2 en el futuro y evita la eliminación accidental de contenido que aún no se haya exportado.
{% endhint %}

{% hint style="danger" %}
[Configuración] → [Datos] → [Volver a migrar] en V2 no es la entrada para la descarga. Elimina permanentemente los datos actuales de V2 y vuelve a importar desde los datos originales de V1; no haga clic en ello a menos que la migración de V1 anterior haya fallado o haya omitido datos.
{% endhint %}

## Cuándo procesar la base de datos de V2

Solo es necesario procesarla en los siguientes casos:

* Renunciar explícitamente a todos los datos actuales de V2 y conservar solo los datos de V1;
* Necesidad de ejecutar nuevamente la migración de V1 → V2.

Esto no es un paso de descarga normal. La operación afectará todas las sesiones, Agentes, configuraciones y otros datos de V2, no solo limpiará un lote de registros de prueba.

### Método de procesamiento seguro

1. Salga completamente de V1 y V2, y confirme que no hay tareas en segundo plano.
2. Abra [Configuración] → [Datos] → [Datos de la aplicación] en V1 1.9.13 y acceda al directorio de datos de la aplicación actual.
3. Mova los siguientes elementos al escritorio u otra ubicación segura; no los elimine directamente:
   * `Data/cherrystudio.sqlite`
   * `Data/cherrystudio.sqlite-shm` y `Data/cherrystudio.sqlite-wal` (si existen)
   * `Data/Agents/.claude`
4. Inicie V1 y verifique los datos originales de V1. Si necesita volver a migrar, inicie V2 para completar la migración.
5. Solo después de confirmar que los datos de V1 son utilizables y que la copia de seguridad de V2 se puede encontrar, decida si eliminar los archivos movidos previamente.

{% hint style="danger" %}
No mueva la base de datos mientras la aplicación está en ejecución, no mueva solo `cherrystudio.sqlite` omitiendo los archivos `-shm` o `-wal` en el mismo directorio, ni reemplace la base de datos de V2 con la de V1. Si no puede determinar el propósito actual del directorio de datos o de los archivos, detenga la operación y contacte al equipo de soporte de Cherry Studio.
{% endhint %}

## Preguntas frecuentes

<details>

<summary>¿Se pueden traer las nuevas conversaciones de V2 a V1?</summary>

No. Exporte el contenido que necesite conservar en V2; V1 solo continuará utilizando los datos originales de V1.

</details>

<details>

<summary>¿La descarga de V1 convierte automáticamente los datos de V2?</summary>

No. El paquete de instalación solo instala la aplicación; no convierte los datos ni el formato de las copias de seguridad.

</details>

<details>

<summary>¿Se puede eliminar directamente la base de datos e intentarlo de nuevo?</summary>

No se recomienda. Primero muévala y consérvela; decida si eliminarla después de completar la verificación. Si se elimina por error y no hay una copia de seguridad disponible, los datos de V2 podrían no ser recuperables.

</details>

<details>

<summary>¿Qué versión se debe instalar al volver a V2 después de la descarga?</summary>

Si continúa utilizando los datos de V2 anteriores, puede instalar directamente V2 y no hacer clic en [Volver a migrar]. Si la migración de V1 anterior falló o omitió datos, puede usar [Configuración] → [Datos] → [Volver a migrar] después de hacer una copia de seguridad completa de V2 actual; esta operación eliminará permanentemente los datos actuales de V2 y volverá a importar desde V1.

</details>

## Referencias

* [Descarga oficial de Cherry Studio V1](https://cherryai.com.cn/download/v1)
* [Descarga oficial de Cherry Studio V2](https://cherryai.com.cn/download)
* Página de lanzamiento de V2: [GitCode](https://gitcode.com/CherryHQ/cherry-studio/releases) · [GitHub](https://github.com/CherryHQ/cherry-studio/releases)
* [Reporte de problemas y sugerencias de funciones](../../question-contact/suggestions.md)
