---
icon: cloud-plus
---
# Настройка сервисов моделей

В Cherry Studio встроены шаблоны подключения более чем к 60 провайдерам моделей. Они охватывают большинство популярных облачных моделей и локальных систем вывода. В этом разделе для каждого провайдера приведено отдельное руководство.

### Типы провайдеров

Cherry Studio группирует провайдеров по протоколу. Их поведение немного различается:

| Тип | Совместимый протокол | Примеры |
| --- | --- | --- |
| **Совместимый с OpenAI** | `/v1/chat/completions` | OpenAI, DeepSeek, SiliconFlow, OpenRouter и большинство сторонних шлюзов |
| **Совместимый с Anthropic** | `/v1/messages` | Anthropic, CherryIN и некоторые шлюзы. **Этот тип требуется Cherry Agent** |
| **Gemini** | Google AI Studio / Vertex | Google Gemini, Vertex AI |
| **Bedrock** | AWS Bedrock SDK | AWS Bedrock |
| **Azure OpenAI** | Azure OpenAI Service | Azure OpenAI |
| **Локальный вывод** | Локальный HTTP-сервис | Ollama, LM Studio, GPUStack, OpenVINO Model Server |
| **Специализированный шлюз** | Собственный протокол поставщика | NewAPI, OneAPI, AiHubMix, DMXAPI и другие |

### Общая последовательность добавления провайдера

1. Откройте `Настройки → Сервисы моделей`.
2. Найдите нужного провайдера во встроенном списке и откройте страницу сведений.
3. Введите **API-ключ** (обязательно) и при необходимости измените **адрес API**. По умолчанию используется официальный адрес провайдера.
4. Нажмите **Получить список моделей** и добавьте нужные модели для диалога, эмбеддингов или обработки изображений.
5. При необходимости нажмите **Проверить**, чтобы проверить подключение с любой диалоговой моделью.

### Руководства по настройке

#### Общие сервисы и шлюзы

* [CherryAI (бесплатно)](cherryai/)
* [CherryIN](cherryin-1.md) — две конечные точки (OpenAI и Anthropic), рекомендуется для Cherry Agent
* [NewAPI](newapi.md) / [OneAPI](oneapi.md) — собственные или сторонние шлюзы

#### Зарубежные провайдеры

* [OpenAI](openai.md)
* [Google Gemini](google-gemini.md)
* [Vertex AI](vertex-ai.md)
* [Mistral](mistral.md)
* [Perplexity](perplexity.md)
* [GitHub Copilot](github-copilot.md)
* [MiniMax Coding Plan](minimax-coding-plan.md)

#### Китайские провайдеры

* [Alibaba Cloud Bailian](aliyun-bailian.md)
* [ZhiPu](zhipu.md)
* [SiliconFlow](siliconcloud.md)
* [Volcengine (Doubao)](doubao.md)
* [PPIO](ppio.md)
* [ModelScope](modelscope.md)

#### Локальный вывод

* [Ollama](ollama.md)

#### Пользовательские провайдеры

* [Пользовательский провайдер](custom-provider.md) — любая конечная точка, совместимая с OpenAI, Anthropic или Gemini

{% hint style="info" %}
**Что делать, если нужного провайдера нет в документации?**

Cherry Studio содержит более 60 шаблонов, а в документации пока описана только их часть. Anthropic (Claude), Azure OpenAI, официальный DeepSeek, Grok, Groq, LM Studio, OpenRouter, Mistral, Perplexity, Together и другие уже доступны в списке провайдеров — достаточно добавить ключ. Отдельные руководства будут добавляться постепенно.
{% endhint %}

### API-ключ и адрес API

Подробные параметры, включая перебор нескольких ключей и фиксацию полного пути символом `#`, описаны в разделе [Настройки сервисов моделей](../settings/providers.md).

***

### Помощь и обратная связь

Если при настройке или использовании возникли вопросы, ошибки или предложения, используйте официальные каналы из раздела [Обратная связь и предложения](../../question-contact/suggestions.md).
