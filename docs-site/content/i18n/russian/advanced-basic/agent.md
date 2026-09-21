---
icon: robot
---
# Руководство по использованию Cherry Agent


Версия Cherry Studio v1.7.0.alpha представила функцию Agent, которую можно использовать в Cherry Studio. Настоящее руководство проведет вас через полный процесс настройки и запуска.

### 1. Создание поставщика типа Anthropic

Можно использовать любого поставщика услуг, поддерживающего конечные точки Anthropic. Например, на примере CherryIn: создайте нового поставщика Agent, заполните ключ и адрес, затем добавьте любую модель.

{% hint style="warning" %}
Режим Agent потребляет большое количество токенов. Обращайте внимание на использование токенов
{% endhint %}

{% hint style="info" %}
Пользователи, подписанные на Claude Code, также могут ввести ключ и URL-адрес для получения модели
{% endhint %}

<figure><img src="../../../assets/0ee97a14dd6d07fb66daeb63.webp" alt=""><figcaption></figcaption></figure>

### 2. Запуск API-сервера

<figure><img src="../../../assets/12db3239749425ba5b13d258.webp" alt=""><figcaption></figcaption></figure>

### 3. Создание Agent

<figure><img src="../../../assets/43251ee7a7c9efe0a83c1b7f.webp" alt=""><figcaption></figcaption></figure>

Щелкните правой кнопкой мыши по Agent, чтобы перейти в режим редактирования. Здесь можно настроить разрешения Agent и доступные инструменты или службы mcp.

<figure><img src="../../../assets/f6156d4fdb933e796cd6a1eb.webp" alt=""><figcaption></figcaption></figure>

### Демонстрация результата

<figure><img src="../../../assets/3ce62a6c9016deabf2613443.webp" alt=""><figcaption></figcaption></figure>