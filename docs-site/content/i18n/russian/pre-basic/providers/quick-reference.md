---
icon: list
---
# Быстрая справочная таблица всех провайдеров

Cherry Studio поддерживает **более 60 провайдеров**. На этой странице представлена сводная таблица. Найдите нужный провайдер и **введите ключ согласно инструкциям для начала работы**. Для провайдеров с отдельной документацией доступны переходные ссылки, остальные настраиваются по общим шагам ([Обзор провайдеров](README.md)).

## Шаги настройки

1. **Найдите нужный провайдер** (можно использовать Ctrl/⌘+F для быстрого поиска)
2. Перейдите на **официальный сайт**, зарегистрируйте аккаунт и получите API Key
3. В Cherry Studio `Настройки → Сервисы моделей` найдите соответствующего провайдера, введите ключ и нажмите «Получить список моделей»
4. Завершите настройку

## Краткое руководство по выбору

| Ваша потребность | Рекомендуемое направление |
|---|---|
| **Быстрый старт для новичков**, без сложных процедур | [CherryIN](cherryin-1.md) или [CherryAI](../../../../pre-basic/providers/cherryai) |
| **Самый удобный доступ из Китая** | DeepSeek / Moonshot / SiliconFlow / ZhiPu |
| **Самые мощные модели за рубежом** | OpenAI / Anthropic / Gemini |
| **Один ключ для 200+ провайдеров** | [OpenRouter](openrouter.md) |
| **Полностью локально, конфиденциальность** | [Ollama](ollama.md) / [LM Studio](lm-studio.md) |
| **Корпоративное соответствие требованиям** | [Azure OpenAI](azure-openai.md) / AWS Bedrock |
| **Использование [агентов](../../advanced-basic/agent.md)** | [Anthropic](anthropic.md) / [CherryIN](cherryin-1.md) (требуется поддержка протокола Anthropic) |

## Собственные модели крупных китайских компаний

Без необходимости обхода блокировок, преимущество в китайском языке, относительно низкие цены.

| Провайдер | Краткая характеристика | Официальный сайт | Документация |
|---|---|---|---|
| **DeepSeek** | Лучшее соотношение цены и качества для программирования и рассуждений | [deepseek.com](https://platform.deepseek.com/) | [→](deepseek.md) |
| **Moonshot AI (Kimi)** | Очень длинный контекст (до 2 млн символов) | [moonshot.cn](https://platform.moonshot.cn/) | [→](moonshot.md) |
| **ZhiPu (智谱)** | Серия GLM, мультимодальность, совместимость с Anthropic для работы агентов | [bigmodel.cn](https://open.bigmodel.cn/) | [→](zhipu.md) |
| **doubao (豆包/火山引擎)** | От ByteDance, доступные цены | [volcengine.com](https://www.volcengine.com/product/doubao) | [→](doubao.md) |
| **Baidu Cloud (文心一言)** | Серия ERNIE от Baidu | [cloud.baidu.com](https://cloud.baidu.com/) | — |
| **Bailian (阿里百炼)** | Серия Qwen, огромное количество моделей | [bailian.console.aliyun.com](https://bailian.console.aliyun.com/) | [→](a-li-yun-bai-lian.md) |
| **BAICHUAN AI** | Крупная модель Baichuan | [baichuan-ai.com](https://platform.baichuan-ai.com/) | — |
| **MiniMax** | Мультимодальность в Китае (голос, видео) | [minimaxi.com](https://platform.minimaxi.com/) | [→](minimax.md) |
| **StepFun** | StepFun (阶跃星辰) | [stepfun.com](https://platform.stepfun.com/) | — |
| **LongCat** | Серия LongCat от Meituan | [longcat.chat](https://longcat.chat/) | — |
| **Xiaomi MiMo** | Крупная модель Xiaomi | [mimo.mi.com](https://mimo.mi.com/) | — |

## Собственные модели крупных зарубежных компаний

Первый эшелон по качеству, для доступа из Китая обычно требуется прокси.

| Провайдер | Краткая характеристика | Официальный сайт | Документация |
|---|---|---|---|
| **OpenAI** | Серия GPT | [openai.com](https://platform.openai.com/) | [→](openai.md) |
| **Anthropic** | Серия Claude, предпочтительный выбор для агентов | [anthropic.com](https://console.anthropic.com/) | [→](anthropic.md) |
| **Gemini (Google)** | Крупная модель Google | [aistudio.google.com](https://aistudio.google.com/) | [→](google-gemini.md) |
| **Azure OpenAI** | OpenAI от Microsoft, корпоративное соответствие требованиям | [portal.azure.com](https://portal.azure.com/) | [→](azure-openai.md) |
| **VertexAI** | Хостинг от Google Cloud | [cloud.google.com](https://cloud.google.com/vertex-ai) | [→](vertex-ai.md) |
| **AWS Bedrock** | Хостинг множества моделей от Amazon | [aws.amazon.com/bedrock](https://aws.amazon.com/bedrock/) | — |
| **Mistral** | Представитель европейских открытых моделей | [mistral.ai](https://console.mistral.ai/) | [→](mistral.md) |
| **Grok (xAI)** | xAI Маска, встроенный доступ в интернет | [x.ai](https://console.x.ai/) | [→](grok.md) |
| **Perplexity** | Диалоги с усилением поиска | [perplexity.ai](https://www.perplexity.ai/) | [→](perplexity.md) |

## Шлюзы / Агрегаторы

Один ключ для доступа к моделям множества провайдеров, централизованное управление аккаунтами.

| Провайдер | Краткая характеристика | Официальный сайт | Документация |
|---|---|---|---|
| **CherryAI** | Официальная бесплатная пробная версия Cherry | — | [→](../../../../pre-basic/providers/cherryai) |
| **CherryIN** | Официальный платный шлюз Cherry, двойные эндпоинты (OpenAI + Anthropic) | [open.cherryin.cc](https://open.cherryin.cc/) | [→](cherryin-1.md) |
| **OpenRouter** | Крупнейший зарубежный агрегатор, 200+ моделей | [openrouter.ai](https://openrouter.ai/) | [→](openrouter.md) |
| **AiHubMix** | Зарубежный агрегатор | [aihubmix.com](https://aihubmix.com/) | — |
| **DMXAPI** | Агрегатор в Китае | [dmxapi.cn](https://dmxapi.cn/) | — |
| **302.AI** | Агрегатор в Китае | [302.ai](https://302.ai/) | — |
| **NewAPI** | Самостоятельный шлюз (открытый код) | [newapi.pro](https://docs.newapi.pro/) | [→](newapi.md) |
| **OneAPI** | Самостоятельный шлюз (открытый код) | — | [→](oneapi.md) |
| **PPIO 派欧云** | Облачные вычислительные мощности + модели в Китае | [ppio.com](https://ppio.com/) | [→](ppio.md) |
| **BurnCloud** | Агрегатор в Китае | [burncloud.com](https://ai.burncloud.com/) | — |
| **AIOnly** | Агрегатор в Китае | [aiionly.com](https://www.aiionly.com/) | — |
| **ocoolAI** | Агрегатор в Китае | [ocoolai.com](https://one.ocoolai.com/) | — |
| **Poe** | AI-маркетплейс от Quora | [poe.com](https://poe.com/) | — |
| **Vercel AI Gateway** | Шлюз от Vercel | [vercel.com/ai](https://vercel.com/ai) | — |

## Ультранизкая задержка / Высокая пропускная способность

Подходит для сценариев, где важна «скорость» (IM-боты, перевод в реальном времени и т. д.).

| Провайдер | Краткая характеристика | Официальный сайт | Документация |
|---|---|---|---|
| **Groq** | Аппаратное обеспечение LPU, миллисекундный отклик | [groq.com](https://console.groq.com/) | [→](groq.md) |
| **Cerebras AI** | Собственные чипы, сверхдлинный контекст | [cerebras.ai](https://cerebras.ai/) | — |
| **Together** | Централизованный хостинг открытых моделей | [together.ai](https://www.together.ai/) | — |
| **Fireworks** | Оптимизация инференса открытых моделей | [fireworks.ai](https://fireworks.ai/) | — |

## Китайские облачные сервисы + вычислительные мощности

| Провайдер | Краткое описание | Сайт | Документация |
|---|---|---|---|
| **Silicon (硅基流动)** | Крупнейший в Китае хостинг открытых моделей | [siliconflow.cn](https://cloud.siliconflow.cn/) | [→](siliconcloud.md) |
| **ModelScope (魔搭)** | Платформа открытых моделей от Alibaba | [modelscope.cn](https://modelscope.cn/) | [→](modelscope.md) |
| **AlayaNew** | Инференс-сервисы в Китае | [alayanew.com](https://www.alayanew.com/) | — |
| **Qiniu (七牛)** | Qiniu Cloud AI | [qiniu.com](https://www.qiniu.com/) | — |
| **LANYUN** | Инференс в Китае | [lanyun.net](https://maas.lanyun.net/) | — |
| **Xirang** | Tianyi Cloud Xirang | [ctyun.cn](https://www.ctyun.cn/) | — |

## Только для эмбеддингов и реранкинга

Используются исключительно для создания эмбеддингов или реранкинга в связке с базой знаний / глобальной памятью.

| Провайдер | Краткое описание | Сайт | Документация |
|---|---|---|---|
| **Jina** | Эмбеддинги, реранкинг, CLIP, большой бесплатный лимит | [jina.ai](https://jina.ai/) | — |
| **VoyageAI** | Специализация на эмбеддингах и реранкинге | [voyageai.com](https://www.voyageai.com/) | — |

## Локальный инференс

Полностью офлайн, защита конфиденциальности.

| Провайдер | Краткое описание | Сайт | Документация |
|---|---|---|---|
| **Ollama** | Локальный инференс через CLI, самый популярный | [ollama.com](https://ollama.com/) | [→](ollama.md) |
| **LM Studio** | Локальный инференс с GUI, оптимизирован для Apple Silicon | [lmstudio.ai](https://lmstudio.ai/) | [→](lm-studio.md) |
| **GPUStack** | Корпоративный локальный инференс | [gpustack.ai](https://gpustack.ai/) | — |
| **OpenVINO Model Server** | Локальный инференс с ускорением Intel | [openvino.ai](https://www.openvino.ai/) | — |

## Платформы моделей / Прочее

| Провайдер | Краткое описание | Сайт | Документация |
|---|---|---|---|
| **Hugging Face** | Крупнейшее в мире сообщество открытых моделей | [huggingface.co](https://huggingface.co/) | — |
| **GitHub Copilot** | Ассистент программирования от Microsoft для GitHub | [github.com/features/copilot](https://github.com/features/copilot) | [→](github-copilot.md) |
| **GitHub Models** | Маркетплейс моделей GitHub (Beta) | [github.com/marketplace/models](https://github.com/marketplace/models) | — |
| **MiniMax Global** | Международная версия MiniMax | [minimax.io](https://platform.minimax.io/) | — |
| **SophNet** | Хостинг моделей в Китае | [sophnet.com](https://sophnet.com/) | — |
| **PH8** | Инференс в Китае | [ph8.co](https://ph8.co/) | — |
| **Z.ai** | Международная версия Zhipu | [z.ai](https://z.ai/) | — |
| **nvidia** | Инференс NVIDIA NIM | [nvidia.com](https://www.nvidia.com/ai/) | — |

## Пользовательский провайдер

Если ваш сервис отсутствует в списке выше, но поддерживает любой из протоколов **OpenAI-совместимый / Anthropic-совместимый / Gemini-совместимый**, вы можете добавить его через [Пользовательский провайдер](zi-ding-yi-fu-wu-shang.md).

## Всё ещё не знаете, что выбрать?

Используйте [**CherryIN**](cherryin-1.md) или [**CherryAI**](../../../../pre-basic/providers/cherryai) — лучший вариант для быстрого старта новичков. При необходимости можно перейти на более продвинутые решения.

***

### Получение помощи и отправка обратной связи

Если у вас возникли вопросы, обнаружены ошибки или есть предложения по улучшению функций при настройке или использовании, воспользуйтесь официальными каналами, указанными в разделе [Обратная связь и предложения](../../question-contact/suggestions.md).
