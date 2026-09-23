---
icon: cloud-arrow-up
---
# Резервное копирование через WebDAV


Cherry Studio поддерживает резервное копирование данных через WebDAV. Вы можете выбрать подходящий сервис WebDAV для облачного резервного копирования.

С помощью WebDAV можно синхронизировать данные между несколькими устройствами по схеме: `Компьютер A`  → (резервное копирование) →  `WebDAV`  → (восстановление) →  `Компьютер B`.

#### Пример использования Nutstore

1. Войдите в Nutstore, нажмите на имя пользователя в правом верхнем углу и выберите «Информация об аккаунте»:

<figure><img src="../../../assets/3ab21a0d07bad38773442570.png" alt=""><figcaption></figcaption></figure>

2. Выберите «Настройки безопасности» и нажмите «Добавить приложение»

<figure><img src="../../../assets/f1f0f0b55aa3ae0222a18938.webp" alt=""><figcaption></figcaption></figure>

3. Введите название приложения, сгенерируется случайный пароль;

<figure><img src="../../../assets/e7f0f093ff245e418805919b.webp" alt=""><figcaption></figcaption></figure>

4. Скопируйте и сохраните пароль;

<figure><img src="../../../assets/65d55f04a7052358519c733e.webp" alt=""><figcaption></figcaption></figure>

5. Получите адрес сервера, учетную запись и пароль;

<figure><img src="../../../assets/53bf30c1765a635f1be348ca.webp" alt=""><figcaption></figcaption></figure>

6. В настройках Cherry Studio → настройках данных заполните информацию WebDAV;

<figure><img src="../../../assets/fda9297035335d99a695c2c7.webp" alt=""><figcaption></figcaption></figure>

7. Выберите резервное копирование или восстановление данных, а также можно настроить периодичность автоматического резервного копирования.

<figure><img src="../../../assets/56b6db4166a2346f0489ca96.webp" alt=""><figcaption></figcaption></figure>

{% hint style="success" %}
Сервисы WebDAV с низким порогом входа — это, как правило, облачные хранилища:

- [Nutstore](https://www.jianguoyun.com/)
- [123 Pan](https://www.123pan.com/) (требуется подписка)
- [Aliyun Disk](https://www.alipan.com/) (требуется покупка)
- [Box](https://www.box.com/) (бесплатно предоставляется 10 ГБ, ограничение на размер одного файла — 250 МБ.)
- [Dropbox](https://www.dropbox.com/) (Dropbox предоставляет 2 ГБ бесплатно, можно приглашать друзей для увеличения до 16 ГБ.)
- [TeraCloud](https://teracloud.jp/en/) (бесплатно предоставляется 10 ГБ, также можно получить дополнительно 5 ГБ за приглашения.)
- [Yandex Disk](https://disk.yandex.com/) (бесплатным пользователям предоставляется 10 ГБ.)

Кроме того, есть сервисы, которые требуют самостоятельного развертывания:

- [Alist](https://alist.nn.ci/zh/)
- [Cloudreve](https://cloudreve.org/)
- [sharelist](https://github.com/reruin/sharelist)
{% endhint %}