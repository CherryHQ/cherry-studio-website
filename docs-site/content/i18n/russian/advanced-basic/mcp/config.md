# Настройка и использование MCP


<figure><img src="../../../../assets/7529abac38faff7ba6c35df7.webp" alt=""><figcaption></figcaption></figure>

1. Откройте настройки Cherry Studio.
2. Найдите опцию `MCP сервер`.
3. Нажмите `Добавить сервер`.
4. Заполните параметры MCP-сервера ([ссылка для справки](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch)). Возможные параметры:
   * Имя: произвольное название, например `fetch-server`
   * Тип: выберите `STDIO`
   * Команда: укажите `uvx`
   * Параметры: укажите `mcp-server-fetch`
   *(могут быть другие параметры в зависимости от сервера)*
5. Нажмите `Сохранить`.

{% hint style="success" %}
После настройки Cherry Studio автоматически загрузит требуемый MCP-сервер - `fetch server`. После завершения загрузки можно начинать работу! Примечание: если mcp-server-fetch не конфигурируется, попробуйте перезагрузить компьютер.
{% endhint %}

### Активация MCP-сервиса в чате

<figure><img src="../../../../assets/42ef06ac095d111eb764046e.webp" alt=""><figcaption></figcaption></figure>

* В настройках `MCP сервера` MCP-сервер успешно добавлен

<figure><img src="../../../../assets/0f6c6755dd8f927b51689b82.webp" alt=""><figcaption></figcaption></figure>

### **Демонстрация работы**

<figure><img src="../../../../assets/8f9c0115bb319f382af9a285.webp" alt=""><figcaption></figcaption></figure>

Как видно из примера, функция `fetch` в составе MCP позволяет Cherry Studio точнее распознавать цели пользовательских запросов, получать релевантную информацию из интернета и давать более точные, комплексные ответы.