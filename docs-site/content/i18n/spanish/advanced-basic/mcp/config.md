# Configuración y uso de MCP


<figure><img src="../../../../assets/7529abac38faff7ba6c35df7.webp" alt=""><figcaption></figcaption></figure>

1. Abre la configuración de Cherry Studio.
2. Ubica la opción `Servidor MCP`.
3. Haz clic en `Agregar servidor`.
4. Completa los parámetros del MCP Server ([enlace de referencia](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch)). Los campos pueden incluir:
   * Nombre: Personaliza un nombre, por ejemplo `fetch-server`
   * Tipo: Selecciona `STDIO`
   * Comando: Ingresa `uvx`
   * Parámetros: Ingresa `mcp-server-fetch`
   * (Puede haber otros parámetros según el servidor específico)
5. Haz clic en `Guardar`.

{% hint style="success" %}
Tras completar esta configuración, Cherry Studio descargará automáticamente el MCP Server necesario: `fetch server`. Una vez finalizada la descarga, ¡podremos comenzar a usarlo! Nota: Si la configuración de mcp-server-fetch falla, intenta reiniciar el equipo.
{% endhint %}

### Habilitar el servicio MCP en el cuadro de chat

<figure><img src="../../../../assets/42ef06ac095d111eb764046e.webp" alt=""><figcaption></figcaption></figure>

* Se ha agregado exitosamente un servidor MCP en la configuración de `Servidor MCP`

<figure><img src="../../../../assets/0f6c6755dd8f927b51689b82.webp" alt=""><figcaption></figcaption></figure>

### **Demostración del efecto de uso**

<figure><img src="../../../../assets/378dc7f7981305276902ad01.webp" alt=""><figcaption></figcaption></figure>

Como muestra la imagen superior, al combinar la función `fetch` de MCP, Cherry Studio comprende mejor la intención de consulta del usuario, obtiene información relevante de la web y proporciona respuestas más precisas y completas.