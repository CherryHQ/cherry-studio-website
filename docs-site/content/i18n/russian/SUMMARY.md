# Table of contents

## Настольная версия

* **Начало работы**
  * [Краткое описание проекта](README.md)
  * [Быстрый старт](getting-started/quick-start.md)
  * [Учебное пособие по установке](cherry-studio/installation/README.md)
    * [Windows](cherry-studio/installation/windows.md)
    * [macOS](cherry-studio/installation/macos.md)
    * [Linux](cherry-studio/installation/linux.md)
    * [Обновление и откат](cherry-studio/installation/upgrade-downgrade.md)
      * [Уведомление о несовместимых изменениях](cherry-studio/installation/v2-breaking-update-notice.md)
      * [Различия в функциональности](cherry-studio/installation/v1-v2-feature-differences.md)
      * [Обновление с V1 до V2](cherry-studio/installation/v1-to-v2-migration.md)
      * [Откат с V2 на V1](cherry-studio/installation/v2-to-v1-downgrade.md)

* **Руководство по функциям**
  * [Обзор функций](cherrystudio/preview/README.md)
    * [Пусковая панель](cherrystudio/preview/launchpad.md)
    * [Интерфейс диалога](cherrystudio/preview/chat.md)
    * [Руководство по использованию Cherry Agent](advanced-basic/agent.md)
    * [Рисование](cherrystudio/preview/drawing.md)
    * [Перевод](cherrystudio/preview/translation.md)
    * [Мини-приложения](cherry-studio/preview/app/README.md)
      * [Генеративные мини-приложения](cherry-studio/preview/app/generative-mini-apps.md)
    * [База знаний](cherrystudio/preview/knowledge-base.md)
    * [Файлы](cherrystudio/preview/files.md)
    * [Партнёр по кодированию](cherrystudio/preview/code-cli.md)
    * [Заметки](cherrystudio/preview/notes.md)
    * [Быстрый помощник](cherrystudio/preview/quick-assistant.md)
    * [Помощник выделения текста](cherrystudio/preview/selection-assistant.md)

* **Модели и настройки**
  * [Конфигурация сервиса моделей](pre-basic/providers/README.md)
    * [Быстрая справочная таблица всех провайдеров](pre-basic/providers/quick-reference.md)
    * [Настройка сервиса моделей](pre-basic/settings/providers.md)
    * **Рекомендуемые и бесплатные сервисы**
      * [CherryAI (бесплатно)](pre-basic/providers/cherryai/README.md)
      * [CherryIN](pre-basic/providers/cherryin-1.md)
    * **Международные провайдеры**
      * [OpenAI](pre-basic/providers/openai.md)
      * [Anthropic](pre-basic/providers/anthropic.md)
      * [Azure OpenAI](pre-basic/providers/azure-openai.md)
      * [Google Gemini](pre-basic/providers/google-gemini.md)
      * [Vertex AI](pre-basic/providers/vertex-ai.md)
      * [Grok](pre-basic/providers/grok.md)
      * [Mistral](pre-basic/providers/mistral.md)
      * [Perplexity](pre-basic/providers/perplexity.md)
      * [Groq](pre-basic/providers/groq.md)
    * **Провайдеры материкового Китая**
      * [DeepSeek](pre-basic/providers/deepseek.md)
      * [ZhiPu](pre-basic/providers/zhipu.md)
      * [Moonshot AI (Kimi)](pre-basic/providers/moonshot.md)
      * [MiniMax](pre-basic/providers/minimax.md)
      * [Руководство по подключению к платформе ModelScope (MоDa)](pre-basic/providers/modelscope.md)
      * [PPIO Pai Ou Cloud](pre-basic/providers/ppio.md)
      * [Alibaba Cloud Bailian](pre-basic/providers/aliyun-bailian.md)
      * [Silicon Flow](pre-basic/providers/siliconcloud.md)
      * [ByteDance (Doubao)](pre-basic/providers/doubao.md)
    * **Шлюзы и пользовательские сервисы**
      * [OpenRouter](pre-basic/providers/openrouter.md)
      * [NewAPI](pre-basic/providers/newapi.md)
      * [OneAPI](pre-basic/providers/oneapi.md)
      * [Пользовательские провайдеры](pre-basic/providers/custom-provider.md)
    * **Локальные и инструменты разработчика**
      * [Ollama](pre-basic/providers/ollama.md)
      * [LM Studio](pre-basic/providers/lm-studio.md)
      * [GitHub Copilot](pre-basic/providers/github-copilot.md)
      * [MiniMax Coding Plan](pre-basic/providers/minimax-coding-plan.md)
  * [Настройка](pre-basic/settings/README.md)
    * **Модели**
      * [Настройки модели по умолчанию](pre-basic/settings/default-models.md)
      * [Локальные модели](pre-basic/settings/local-models.md)
    * **Инструменты и веб-поиск**
      * [Режим работы в сети](pre-basic/websearch/README.md)
        * [Бесплатный режим работы в сети](pre-basic/websearch/free-search.md)
        * [Конфигурация чёрного списка для веб-поиска](pre-basic/websearch/blacklist.md)
        * [Включение возможности интернет-доступа в Volcano Engine](pre-basic/websearch/volcengine.md)
        * [Tavily Руководство по регистрации и входу через интернет](pre-basic/websearch/tavily.md)
        * [Развертывание и настройка SearXNG](pre-basic/websearch/searxng.md)
      * [Обработка документов](pre-basic/settings/doc-process.md)
      * [OCR](pre-basic/settings/ocr.md)
    * **Оформление и продуктивность**
      * [Настройки отображения](pre-basic/settings/display.md)
        * [Пользовательский CSS](pre-basic/personalization-settings/custom-css.md)
        * [Рекомендации по шрифтам](pre-basic/personalization-settings/font.md)
        * [Очистка настроек CSS](pre-basic/personalization-settings/clear-css.md)
      * [Уведомления](pre-basic/settings/notification.md)
      * [Статистика использования](pre-basic/settings/usage.md)
      * [Настройки горячих клавиш](pre-basic/settings/key-shortcut.md)
    * **Данные и интеграции**
      * [Настройка данных](pre-basic/data-settings/README.md)
        * [Резервное копирование через WebDAV](pre-basic/data-settings/webdav.md)
        * [Резервное копирование в S3-совместимое хранилище](pre-basic/data-settings/s3-compatible.md)
        * [Настройка Notion](pre-basic/data-settings/notion.md)
        * [Руководство по настройке Obsidian](pre-basic/data-settings/obsidian.md)
        * [Руководство по настройке Siyuan Note](pre-basic/data-settings/siyuan.md)
        * [Изменение места хранения](pre-basic/personalization-settings/storage.md)
    * **Система**
      * [Общие настройки](pre-basic/settings/general.md)
      * [Зависимости среды](pre-basic/settings/env-dependencies.md)

* **База знаний**
  * **Начало работы**
    * [Начало работы с базами знаний](knowledge-base/knowledge-base.md)
    * [Создание базы знаний](knowledge-base/create.md)
    * [Добавление и организация материалов](knowledge-base/sources.md)
    * [Проверка материалов и извлечение](knowledge-base/recall-test.md)
  * **Использование базы знаний**
    * [Использование в диалоге](knowledge-base/chat.md)
    * [Использование с Agent](knowledge-base/agent.md)
    * [Практические примеры использования базы знаний](knowledge-base/cases.md)
  * **Настройка и устранение неполадок**
    * [Справочная информация о моделях встраивания](knowledge-base/emb-models-info.md)
    * [Предварительная обработка документов базы знаний](knowledge-base/document-preprocessing.md)
    * [Описание хранения данных](knowledge-base/data.md)
    * [Частые вопросы](knowledge-base/troubleshooting.md)

* **Продвинутые рабочие процессы**
  * [Карта расширенных возможностей](advanced-basic/capability-map.md)
  * [Продвинутые функции чата](advanced-basic/chat/README.md)
    * [Сравнение нескольких моделей и ветвление сообщений](advanced-basic/chat/model-compare-branches.md)
    * [Длинные диалоги, контекст и очередь сообщений](advanced-basic/chat/context-queue.md)
    * [Артефакты, ссылки и экспорт](advanced-basic/chat/artifacts-export.md)
  * [Рабочая область Agent](advanced-basic/agent-workspace/README.md)
    * [Создание Agent и распределение ролей моделей](advanced-basic/agent-workspace/create-agent.md)
    * [Рабочая директория, задачи и файлы](advanced-basic/agent-workspace/workspaces-tasks-files.md)
    * [Разделение ролей моделей и рисование в Agent](advanced-basic/agent-workspace/models-image.md)
    * [Встроенные инструменты, базы знаний, навыки и MCP](advanced-basic/agent-workspace/tools-knowledge-skills-mcp.md)
    * [Права доступа, память и фоновые задачи](advanced-basic/agent-workspace/permissions-memory-background.md)
  * [Рабочий процесс «Знания и контент»](advanced-basic/knowledge-content/README.md)
    * [Создание базы знаний и тестирование поиска](advanced-basic/knowledge-content/knowledge-base.md)
    * [Заметки, база знаний и Agent](advanced-basic/knowledge-content/notes-knowledge-agent.md)
    * [Генерация, редактирование и улучшение изображений](advanced-basic/knowledge-content/painting-workflow.md)
    * [Перевод файлов, изображений и длинных текстов](advanced-basic/knowledge-content/translation-workflow.md)
  * [Расширение возможностей Agent](advanced-basic/extensions/README.md)
    * [Навыки и библиотека возможностей](advanced-basic/extensions/skills.md)
    * [MCP и внешние инструменты](advanced-basic/extensions/mcp/README.md)
      * [Диагностика проблем MCP](advanced-basic/extensions/mcp/troubleshooting.md)
  * [Автоматизация и внешние взаимодействия](advanced-basic/automation/README.md)
    * [Каналы](advanced-basic/automation/channels.md)
    * [Планируемые задачи, heartbeat и журнал выполнения](advanced-basic/automation/scheduled-heartbeat.md)
  * [Эффективная рабочая область](advanced-basic/workbench/README.md)
    * [Многострочные окна и вкладки](advanced-basic/workbench/multi-window-tabs.md)
    * [Панель инструментов ввода и инструменты повышения эффективности](advanced-basic/workbench/composer-efficiency.md)
    * [Глобальный поиск](advanced-basic/workbench/global-search.md)
    * [Скриншоты, разметка и OCR](advanced-basic/workbench/screenshot-ocr.md)
  * [Разработка и диагностика](advanced-basic/developer-tools/README.md)
    * [API-шлюз](advanced-basic/developer-tools/api-gateway.md)
    * [Цепочка вызовов и режим разработчика](advanced-basic/developer-tools/trace.md)
    * [Партнёр по кодированию (Code CLI)](advanced-basic/developer-tools/code-cli.md)
  * [Примеры применения](advanced-basic/cases/README.md)
    * [Ретроспективный анализ с использованием нескольких моделей](advanced-basic/cases/research-review.md)
    * [Рецензирование длинных документов](advanced-basic/cases/long-document-review.md)
    * [Передача файлов проекта Agent](advanced-basic/cases/project-delivery.md)
    * [Комплект изображений для бренда](advanced-basic/cases/brand-image-kit.md)
    * [Вопросы и ответы по частной базе знаний](advanced-basic/cases/private-knowledge-qa.md)
    * [Генерация еженедельного отчёта из заметок](advanced-basic/cases/notes-weekly-report.md)
    * [Подготовка многоязычных материалов](advanced-basic/cases/multilingual-materials.md)
    * [Каналы и автоматический ежедневный отчёт](advanced-basic/cases/automated-daily-report.md)
    * [Рабочее пространство для исследований в нескольких окнах](advanced-basic/cases/multi-window-research.md)

## Мобильная версия

* **Начало работы**
  * [Обзор мобильной версии](mobile/README.md)
  * [Загрузка и установка](mobile/installation.md)
  * [Быстрый старт](mobile/quick-start.md)
* **Руководство по функциям**
  * [Провайдеры и модели](mobile/providers-and-models.md)
  * [Диалоги и файлы](mobile/chat-and-files.md)
  * [Агенты и инструменты](mobile/agents-and-tools.md)
  * [Генерация изображений](mobile/image-generation.md)
* **Настройки и поддержка**
  * [Данные, конфиденциальность и разрешения](mobile/data-privacy.md)
  * [Устранение неполадок](mobile/troubleshooting.md)

## Помощь и устранение неполадок

* [Часто задаваемые вопросы](question-contact/questions.md)
* [Эффективные методы задавания вопросов](question-contact/ask.md)
* [Обратная связь и предложения](question-contact/suggestions.md)

## Ресурсы и проект

* **Справочные материалы**
  * [Научные знания](question-contact/knowledge.md)
  * [Общая справочная информация о моделях](other/models-info.md)
  * [Рейтинг моделей](other/model_rank/README.md)
    * [Рейтинг агентов](other/model_rank/agent.md)
    * [Текстовый рейтинг](other/model_rank/text.md)
    * [Поиск в рейтинге](other/model_rank/search.md)
    * [Рейтинг по визуальному восприятию](other/model_rank/vision.md)
    * [Рейтинг по коду / веб-разработке](other/model_rank/code-webdev.md)
    * [Рейтинг моделей для генерации изображений по тексту](other/model_rank/text-to-image.md)
* **Проект и информация**
  * [Вклад в код](contribution/code.md)
  * [Участие в подготовке документации](contribution/docs.md)

## Сотрудничество и политики

* [Бизнес-сотрудничество](contact-us/questions.md)
* [Политика конфиденциальности](about/privacypolicy.md)
* [Лицензия открытого исходного кода](contact-us/questions/license.md)
