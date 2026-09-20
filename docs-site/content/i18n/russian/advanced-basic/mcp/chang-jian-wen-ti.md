---
icon: hexagon-exclamation
---
# Часто задаваемые вопросы


{% hint style="warning" %}
Этот документ переведен с китайского языка с помощью ИИ и еще не был проверен.
{% endhint %}




### 1. mcp-server-time

<figure><img src="../../../../assets/1520c1906faa98104f052666.jpg" alt=""><figcaption><p>Скриншот ошибки</p></figcaption></figure>

**Решение**  

В строке "Параметры" укажите:

```
mcp-server-time
--local-timezone
<ваш часовой пояс, например: Asia/Shanghai>
```