

# ByteDance (Doubao)

*   Войдите в [VolcEngine](https://console.volcengine.com/)
*   Или сразу перейдите по [этой ссылке](https://console.volcengine.com/ark/region:ark+cn-beijing/openManagement?LLM=%7B%7D)

<figure><img src="../../../../assets/748f7813cf1fde645a968c13.webp" alt=""><figcaption></figcaption></figure>

### Получение API-ключа

*   В боковом меню выберите раздел [Управление API-ключами](https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey)
*   Создайте новый API-ключ

<figure><img src="../../../../assets/565501695d6ec77af56b0d94.webp" alt=""><figcaption></figcaption></figure>

*   После создания кликните на значок глаза 🔍 рядом с ключом для просмотра и скопируйте его

<figure><img src="../../../../assets/abead8dd3efc80aa8dfe9b88.webp" alt=""><figcaption></figcaption></figure>

*   Вставьте скопированный API-ключ в CherryStudio и активируйте переключатель провайдера

<figure><img src="../../../../assets/fec7f5e64d98a659fa27ff9c.webp" alt=""><figcaption></figcaption></figure>

### Активация и добавление моделей

*   В разделе [Управление активациями](https://console.volcengine.com/ark/region:ark+cn-beijing/openManagement?LLM=%7B%7D\&OpenTokenDrawer=false) боковой панели активируйте нужные модели (серия Doubao, DeepSeek и др.)

<figure><img src="../../../../assets/b921f99f2e21714c0ef9cafb.webp" alt=""><figcaption></figcaption></figure>

*   В [документе со списком моделей](https://www.volcengine.com/docs/82379/1330310#%E6%96%87%E6%9C%AC%E7%94%9F%E6%88%90) найдите ID нужной модели

<figure><img src="../../../../assets/cba9e28d82aef11147fc01c6.webp" alt="Пример списка ID моделей VolcEngine"><figcaption></figcaption></figure>

*   В настройках CherryStudio откройте раздел [Модели провайдеров](../../cherrystudio/preview/settings/providers.md) → VolcEngine
*   Нажмите "Добавить" и вставьте ID модели в соответствующее поле

<figure><img src="../../../../assets/70c3827ffb29455676fb2fb0.webp" alt=""><figcaption></figcaption></figure>

*   Повторите процедуру для добавления всех необходимых моделей

### Адрес API

Доступно два варианта записи адреса API:
1.  Стандартный в клиенте: `https://ark.cn-beijing.volces.com/api/v3/`
2.  Альтернативный: `https://ark.cn-beijing.volces.com/api/v3/chat/completions#`

{% hint style="info" %}
Оба варианта функционально идентичны. Рекомендуется использовать значение по умолчанию.  
Разница между окончаниями `/` и `#` объясняется в разделе [Настройки провайдеров](../../cherrystudio/preview/settings/providers.md#api-di-zhi)
{% endhint %}

<figure><img src="../../../../assets/91ce519c471ef98b7840a33e.webp" alt=""><figcaption><p>Пример cURL из официальной документации</p></figcaption></figure>