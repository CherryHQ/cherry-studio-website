# GitHub Copilot


{% hint style="warning" %}
Этот документ переведен с китайского языка с помощью ИИ и еще не был проверен.
{% endhint %}




Для использования GitHub Copilot сначала необходимо иметь учетную запись GitHub и подписаться на сервис GitHub Copilot. Доступна бесплатная версия подписки (free), но она не поддерживает новейшую модель Claude 3.7. Подробности смотрите на [официальном сайте GitHub Copilot](https://github.com/features/copilot).

## Получение Device Code

Нажмите «Войти в GitHub», чтобы получить и скопировать Device Code.

<figure><img src="../../../../assets/c55a91f9cdc6b88106e1d281.webp" alt="Пример получения Device Code"><figcaption><p>Получение Device Code</p></figcaption></figure>

## Ввод Device Code в браузере и авторизация

После успешного получения Device Code перейдите по ссылке в браузере, войдите в учетную запись GitHub, введите Device Code и предоставьте разрешение.

<figure><img src="../../../../assets/1bf59331d4a2754ff20e7379.webp" alt="Пример авторизации GitHub"><figcaption><p>Авторизация GitHub</p></figcaption></figure>

После успешной авторизации вернитесь в Cherry Studio, нажмите «Подключить GitHub». После подключения отобразятся ваше имя пользователя и аватар GitHub.

<figure><img src="../../../../assets/dd64cd1857b5e69446d98398.webp" alt="Пример успешного подключения GitHub"><figcaption><p>Подключение GitHub успешно</p></figcaption></figure>

## Получение списка моделей через кнопку «Управление»

Нажмите кнопку «Управление» ниже, чтобы автоматически загрузить список поддерживаемых моделей.

<figure><img src="../../../../assets/c0545b25325df32cd70fbad9.webp" alt="Пример получения списка моделей"><figcaption><p>Получение списка моделей</p></figcaption></figure>

## Часто задаваемые вопросы

### Ошибка получения Device Code, повторите попытку

<figure><img src="../../../../assets/1fc3819d4c2caff7331c82bb.webp" alt="Пример ошибки получения Device Code"><figcaption><p>Ошибка получения Device Code</p></figcaption></figure>

В текущей реализации запросы выполняются через Axios, который не поддерживает socks-прокси. Используйте системный прокси, HTTP-прокси или настройте глобальный прокси вне CherryStudio. Убедитесь в стабильности сетевого соединения, чтобы избежать сбоев при получении Device Code.