---
icon: bridge
---
# API Gateway

El API Gateway expone las capacidades de los modelos configurados en Cherry Studio a través de una API HTTP compatible con OpenAI y Anthropic para programas locales. También es el servicio interno necesario para la ejecución de Agent.

Ruta: [Configuración] → [API Gateway].

<figure><img src="../../../../assets/69025f11c87bd83f70af4a07.webp" alt="Antes de conectar un programa externo, verifique el estado y el puerto; proporcione la clave solo a programas locales de confianza o a redes controladas."><figcaption><p>Antes de conectar un programa externo, verifique el estado y el puerto; proporcione la clave solo a programas locales de confianza o a redes controladas. </p></figcaption></figure>

## Diferenciar el uso de Agent y las llamadas externas

* Si solo utiliza Agent de Cherry Studio: siga la indicación de la aplicación para [Habilitar e iniciar]; no es necesario copiar la URL o la clave para otros programas.
* Si un programa local necesita llamar a Cherry Studio: inicie el gateway, copie la URL y la API key, y seleccione la interfaz compatible según la documentación de la API.
* Si desea permitir el acceso desde otros dispositivos: esto amplía el alcance de exposición. Debe verificar por su cuenta la escucha de red, el firewall y el control de acceso. No se recomienda abrirlo sin medidas de seguridad.

## Inicio y conexión

{% stepper %}
{% step %}
### 1. Verificar el puerto

Puede modificar el puerto cuando el gateway está detenido. Seleccione un puerto que no esté ocupado por otros programas; si hay un conflicto de puertos, el servicio no podrá iniciarse correctamente.
{% endstep %}

{% step %}
### 2. Iniciar el gateway

Haga clic en [Iniciar]. Una vez que el estado cambie a [En ejecución], la página mostrará la URL disponible y proporcionará un acceso a la [Documentación de la API].
{% endstep %}

{% step %}
### 3. Configurar la autorización

Los programas externos utilizan `Authorization: Bearer <clave API>`. Puede copiar directamente la cabecera de autorización desde la página. No escriba la clave en repositorios de código ni en capturas de pantalla.
{% endstep %}

{% step %}
### 4. Verificar con una solicitud mínima

Primero solicite la lista de modelos o envíe un texto corto según la documentación de la API, y luego integre la aplicación completa. Si aparece un error, registre el estado HTTP y la respuesta, sin exponer la cabecera de autorización completa.
{% endstep %}
{% endstepper %}

## Caso de uso: permitir que un script local llame al modelo

Primero confirme en [Configuración] → [Servicio de modelos] que el modelo puede conversar correctamente, y luego inicie el API Gateway. El script debe almacenar solo la dirección del gateway local y la clave. Primero solicite la lista de modelos y luego envíe un texto corto. Antes de integrar el programa completo, confirme que el cliente es compatible con la interfaz de OpenAI o Anthropic.

| Configuración | Punto de partida sugerido | Función | Consideraciones |
| ------ | ---------- | --------- | ----------------- |
| Alcance de escucha | Solo uso local | Reduce la exposición de red | No lo abra directamente a la LAN o a Internet solo para facilitar la depuración |
| API key | Guárdela por separado para el gateway actual | Valida las solicitudes del cliente | No la escriba en repositorios, capturas de pantalla ni registros compartidos |
| Solicitud de verificación | Primero consulte la lista de modelos y un texto corto | Verifica la conexión y la generación por separado | Si falla, registre el código de estado, no la clave completa |

### Criterios de finalización

El gateway muestra [En ejecución]; la lista de modelos es legible; la solicitud de texto corto es exitosa; al detener el gateway, el cliente no puede continuar realizando llamadas.

## Operaciones de seguridad

{% hint style="danger" %}
La API key puede invocar los servicios de modelos que ha configurado en Cherry Studio. Si la clave se filtra, primero debe detener el gateway, hacer clic en [Regenerar] mientras está detenido y luego actualizar todos los clientes locales.
{% endhint %}

* Mientras el gateway está en ejecución, el puerto y la clave son de solo lectura; deténgalo antes de realizar cambios.
* No muestre la clave en repositorios públicos, Issues, registros ni capturas de pantalla de tutoriales.
* Guarde la clave solo en los programas que necesiten realizar llamadas.
* El uso y los costos siguen siendo generados por el proveedor de modelos real. Puede ver los registros de Cherry Studio en [Configuración] → [Estadísticas de uso].

<details>

<summary>¿Qué relación tiene el API Gateway con el servicio de modelos? </summary>

El servicio de modelos almacena la conexión con el proveedor upstream; el API Gateway convierte estas capacidades en interfaces compatibles. El gateway en sí no proporciona modelos; sigue siendo necesario al menos un proveedor y un modelo disponibles.

</details>

<details>

<summary>El puerto es normal, pero el cliente devuelve un error de no autorizado. ¿Qué se debe hacer? </summary>

Confirme que la cabecera de solicitud es `Authorization: Bearer ...`, sin comillas ni espacios adicionales, y verifique que la clave utilizada por el cliente sea aún el valor actual de la página.

</details>
