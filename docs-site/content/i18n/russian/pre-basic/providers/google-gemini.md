
{% hint style="warning" %}
Этот документ переведен с китайского языка с помощью ИИ и еще не был проверен.
{% endhint %}

# Google Gemini

## Получение API-ключа

* Перед получением API-ключа для Gemini у вас должен быть проект Google Cloud (если он уже есть, этот шаг можно пропустить)
* Перейдите в [Google Cloud](https://console.cloud.google.com/projectcreate), создайте проект, введите название проекта и нажмите "Создать проект"

<figure><img src="../../../../assets/27210003acacf618df874e98.webp" alt=""><figcaption></figcaption></figure>

* На официальной [странице API-ключа](https://aistudio.google.com/app/apikey?hl=zh-cn) нажмите `密钥 创建API密钥` (Создать API-ключ)

<figure><img src="../../../../assets/b49760732ce7ac30d5ef7c30.webp" alt=""><figcaption></figcaption></figure>

* Скопируйте сгенерированный ключ и откройте [настройки провайдеров](broken-reference) в CherryStudio
* Найдите провайдера Gemini и введите полученный ключ

<figure><img src="../../../../assets/84d594944e11255268fac0c1.webp" alt=""><figcaption></figcaption></figure>

* Нажмите "Управление" или "Добавить" внизу, подключите поддерживаемые модели и активируйте переключатель провайдера в правом верхнем углу для начала использования.

{% hint style="info" %}
- В Китае (кроме Тайваня) сервис Google Gemini недоступен напрямую — требуется самостоятельно решить вопрос с прокси;
{% endhint %}