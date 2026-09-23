---
icon: trash-xmark
---


# Очистка настроек CSS

{% hint style="warning" %}
Этот метод очистки настроек CSS следует использовать при установке некорректного CSS или если после настройки CSS невозможно войти в интерфейс настроек.
{% endhint %}

* Откройте консоль разработчика: в окне CherryStudio нажмите комбинацию клавиш <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> (для MacOS: <kbd>command</kbd>+<kbd>option</kbd>+<kbd>I</kbd>).
* В открывшейся консоли перейдите на вкладку `Console` (Консоль).

<figure><img src="../../../assets/64827e5178c569e716f679aa.webp" alt=""><figcaption></figcaption></figure>

* Вручную введите команду `document.getElementById('user-defined-custom-css').remove()` - копирование и вставка скорее всего не сработают.
* После ввода нажмите Enter для выполнения команды. Это очистит настройки CSS, после чего вы сможете снова войти в настройки отображения CherryStudio и удалить проблемный CSS-код.