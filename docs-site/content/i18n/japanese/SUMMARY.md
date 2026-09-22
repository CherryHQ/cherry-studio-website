# Table of contents

## はじめに

* [プロジェクト概要](README.md)
* [クイックスタート](getting-started/quick-start.md)
* [インストールガイド](cherry-studio/installation/README.md)
  * [Windows](cherry-studio/installation/windows.md)
  * [macOS](cherry-studio/installation/macos.md)
  * [Linux](cherry-studio/installation/linux.md)
  * [アップグレードとダウングレード](cherry-studio/installation/upgrade-downgrade.md)
    * [破壊的変更に関するお知らせ](cherry-studio/installation/v2-breaking-update-notice.md)
    * [機能の違い](cherry-studio/installation/v1-v2-feature-differences.md)
    * [V1 から V2 へのアップグレード](cherry-studio/installation/v1-to-v2-migration.md)
    * [V2 から V1 へのダウングレード](cherry-studio/installation/v2-to-v1-downgrade.md)

## 機能ガイド

* [機能一覧](cherrystudio/preview/README.md)
  * [起動台](cherrystudio/preview/launchpad.md)
  * [ダイアログインターフェース](cherrystudio/preview/chat.md)
  * [Cherry Agent の使い方ガイド](advanced-basic/agent.md)
  * [絵画機能](cherrystudio/preview/drawing.md)
  * [翻訳](cherrystudio/preview/translation.md)
  * [ミニアプリ](cherry-studio/preview/app/README.md)
    * [生成型ミニアプリ](cherry-studio/preview/app/generative-mini-apps.md)
  * [cherrystudio/preview/knowledge-base](cherrystudio/preview/knowledge-base.md)
  * [ファイル](cherrystudio/preview/files.md)
  * [コーディングパートナー](cherrystudio/preview/code-cli.md)
  * [ノート](cherrystudio/preview/notes.md)
  * [クイックアシスタント](cherrystudio/preview/quick-assistant.md)
  * [選択アシスタント](cherrystudio/preview/selection-assistant.md)

## モデルと設定

* [モデルサービス設定](pre-basic/providers/README.md)
  * [全 Provider クイックリファレンス](pre-basic/providers/quick-reference.md)
  * [モデルサービス設定](pre-basic/settings/providers.md)
  * **おすすめ・無料サービス**
    * [CherryAI（無料）](pre-basic/providers/cherryai/README.md)
    * [CherryIN](pre-basic/providers/cherryin-1.md)
  * **海外サービスプロバイダー**
    * [OpenAI](pre-basic/providers/openai.md)
    * [Anthropic](pre-basic/providers/anthropic.md)
    * [Azure OpenAI](pre-basic/providers/azure-openai.md)
    * [Google Gemini](pre-basic/providers/google-gemini.md)
    * [Vertex AI](pre-basic/providers/vertex-ai.md)
    * [Grok](pre-basic/providers/grok.md)
    * [Mistral](pre-basic/providers/mistral.md)
    * [Perplexity](pre-basic/providers/perplexity.md)
    * [Groq](pre-basic/providers/groq.md)
  * **中国本土のサービスプロバイダー**
    * [DeepSeek](pre-basic/providers/deepseek.md)
    * [ZhiPu](pre-basic/providers/zhipu.md)
    * [Moonshot AI (Kimi)](pre-basic/providers/moonshot.md)
    * [MiniMax](pre-basic/providers/minimax.md)
    * [ModelScope（魔搭）プラットフォーム接続ガイド](pre-basic/providers/modelscope.md)
    * [PPIO パイオウクラウド](pre-basic/providers/ppio.md)
    * [阿里云百炼](pre-basic/providers/a-li-yun-bai-lian.md)
    * [SiliconFlow](pre-basic/providers/siliconcloud.md)
    * [バイトダンス（豆包）](pre-basic/providers/doubao.md)
  * **ゲートウェイとカスタムサービス**
    * [OpenRouter](pre-basic/providers/openrouter.md)
    * [NewAPI](pre-basic/providers/newapi.md)
    * [OneAPI](pre-basic/providers/oneapi.md)
    * [カスタムプロバイダー](pre-basic/providers/zi-ding-yi-fu-wu-shang.md)
  * **ローカル・開発者向けサービス**
    * [Ollama](pre-basic/providers/ollama.md)
    * [LM Studio](pre-basic/providers/lm-studio.md)
    * [GitHub Copilot](pre-basic/providers/github-copilot.md)
    * [MiniMax Coding Plan](pre-basic/providers/minimax-coding-plan.md)
* [設定](pre-basic/settings/README.md)
  * **モデル**
    * [デフォルトモデル設定](pre-basic/settings/default-models.md)
    * [ローカルモデル](pre-basic/settings/local-models.md)
  * **ツールとウェブ検索**
    * [オンラインンモード](pre-basic/websearch/README.md)
      * [無料インターネットモード](pre-basic/websearch/free-search.md)
      * [ウェブ検索ブラックリスト設定](pre-basic/websearch/blacklist.md)
      * [火山エンジンでのネットワーク接続方法](pre-basic/websearch/volcengine.md)
      * [tavilyインターネット接続のログイン・登録チュートリアル](pre-basic/websearch/tavily.md)
      * [SearXNG セルフホスティング設定](pre-basic/websearch/searxng.md)
    * [ドキュメント処理](pre-basic/settings/doc-process.md)
    * [OCR](pre-basic/settings/ocr.md)
  * **外観と効率化**
    * [表示設定](pre-basic/settings/display.md)
      * [カスタムCSS](pre-basic/personalization-settings/custom-css.md)
      * [フォントおすすめ](pre-basic/personalization-settings/font.md)
      * [CSS設定のクリア](pre-basic/personalization-settings/clear-css.md)
    * [通知](pre-basic/settings/notification.md)
    * [使用量統計](pre-basic/settings/usage.md)
    * [ショートカットキーの設定](pre-basic/settings/key-shortcut.md)
  * **データと連携**
    * [データ設定](pre-basic/data-settings/README.md)
      * [WebDAV バックアップ](pre-basic/data-settings/webdav.md)
      * [S3互換ストレージバックアップ](pre-basic/data-settings/s3-compatible.md)
      * [Notion 設定チュートリアル](pre-basic/data-settings/notion.md)
      * [Obsidian 設定チュートリアル](pre-basic/data-settings/obsidian.md)
      * [思源ノート設定チュートリアル](pre-basic/data-settings/siyuan.md)
      * [保存場所の変更](pre-basic/personalization-settings/storage.md)
  * **システム**
    * [基本設定](pre-basic/settings/general.md)
    * [環境依存](pre-basic/settings/env-dependencies.md)

## ナレッジベース

* **入門**
  * [ナレッジベース入門](knowledge-base/knowledge-base.md)
  * [ナレッジベースの作成](knowledge-base/create.md)
  * [資料の追加と整理](knowledge-base/sources.md)
  * [資料の確認とリコール](knowledge-base/recall-test.md)
* **ナレッジベースの活用**
  * [チャットでの使用](knowledge-base/chat.md)
  * [Agent との連携](knowledge-base/agent.md)
  * [知識ベースの応用例](knowledge-base/cases.md)
* **設定・保守・トラブルシューティング**
  * [埋め込みモデル参考情報](knowledge-base/emb-models-info.md)
  * [ナレッジベース文書前処理](knowledge-base/document-preprocessing.md)
  * [knowledge-base/data](knowledge-base/data.md)
  * [よくある質問](knowledge-base/troubleshooting.md)

## 高度なワークフロー

* [高度な機能マップ](advanced-basic/capability-map.md)
* [チャット高度化](advanced-basic/chat/README.md)
  * [複数モデルの比較とメッセージの分岐](advanced-basic/chat/model-compare-branches.md)
  * [長い対話、コンテキストとキューイングメッセージ](advanced-basic/chat/context-queue.md)
  * [成果物、引用とエクスポート](advanced-basic/chat/artifacts-export.md)
* [Agent ワークスペース](advanced-basic/agent-workspace/README.md)
  * [Agent とモデルの役割分担の作成](advanced-basic/agent-workspace/create-agent.md)
  * [ワークスペース、タスク、ファイル](advanced-basic/agent-workspace/workspaces-tasks-files.md)
  * [モデルの役割分担と Agent による描画](advanced-basic/agent-workspace/models-image.md)
  * [組み込みツール、ナレッジベース、スキルと MCP](advanced-basic/agent-workspace/tools-knowledge-skills-mcp.md)
  * [権限、メモリとバックグラウンドタスク](advanced-basic/agent-workspace/permissions-memory-background.md)
* [知識ベースとコンテンツワークフロー](advanced-basic/knowledge-content/README.md)
  * [知識ベースの構築とリコールテスト](advanced-basic/knowledge-content/knowledge-base.md)
  * [ノート、ナレッジベースとAgent](advanced-basic/knowledge-content/notes-knowledge-agent.md)
  * [画像の生成、編集と強化](advanced-basic/knowledge-content/painting-workflow.md)
  * [ファイル、画像、長文の翻訳](advanced-basic/knowledge-content/translation-workflow.md)
* [Agent の機能拡張](advanced-basic/extensions/README.md)
  * [スキルと能力ライブラリ](advanced-basic/extensions/skills.md)
  * [MCP と外部ツール](advanced-basic/extensions/mcp/README.md)
    * [MCP トラブルシューティング](advanced-basic/extensions/mcp/troubleshooting.md)
* [自動化と外部連携](advanced-basic/automation/README.md)
  * [チャネル](advanced-basic/automation/channels.md)
  * [定期タスク、ハートビートと実行履歴](advanced-basic/automation/scheduled-heartbeat.md)
* [高効率ワークベンチ](advanced-basic/workbench/README.md)
  * [マルチウィンドウとタブ](advanced-basic/workbench/multi-window-tabs.md)
  * [入力ツールバーと効率ツール](advanced-basic/workbench/composer-efficiency.md)
  * [グローバル検索](advanced-basic/workbench/global-search.md)
  * [スクリーンショット、アノテーション、OCR](advanced-basic/workbench/screenshot-ocr.md)
* [開発と診断](advanced-basic/developer-tools/README.md)
  * [API ゲートウェイ](advanced-basic/developer-tools/api-gateway.md)
  * [トレースと開発者モード](advanced-basic/developer-tools/trace.md)
  * [コーディングパートナー（Code CLI）](advanced-basic/developer-tools/code-cli.md)
* [応用例](advanced-basic/cases/README.md)
  * [複数モデルによる研究レビュー](advanced-basic/cases/research-review.md)
  * [長文書のレビュー](advanced-basic/cases/long-document-review.md)
  * [Agent によるプロジェクトファイルの納品](advanced-basic/cases/project-delivery.md)
  * [ブランド画像キット](advanced-basic/cases/brand-image-kit.md)
  * [プライベートナレッジベースによるQ&A](advanced-basic/cases/private-knowledge-qa.md)
  * [週報の生成](advanced-basic/cases/notes-weekly-report.md)
  * [多言語資料の整理](advanced-basic/cases/multilingual-materials.md)
  * [チャンネルと定期日報](advanced-basic/cases/automated-daily-report.md)
  * [マルチウィンドウ研究ワークベンチ](advanced-basic/cases/multi-window-research.md)

## ヘルプとトラブルシューティング

* [よくある質問](question-contact/questions.md)
* [効果的な質問方法](question-contact/ask.md)
* [フィードバック＆提案](question-contact/suggestions.md)

## リソースとプロジェクト

* **リファレンス**
  * [知識解説](question-contact/knowledge.md)
  * [共通モデル参照情報](other/models-info.md)
  * [モデルランキング](other/model_rank/README.md)
    * [Agent 智能体ランキング](other/model_rank/agent.md)
    * [テキストランキング](other/model_rank/text.md)
    * [検索ランキング](other/model_rank/search.md)
    * [視覚ランキング](other/model_rank/vision.md)
    * [コード / Web 開発ランキング](other/model_rank/code-webdev.md)
    * [テキストから画像生成ランキング](other/model_rank/text-to-image.md)
* **プロジェクトと概要**
  * [コード貢献](contribution/code.md)
  * [ドキュメントへの貢献](contribution/docs.md)

## 提携とポリシー

* [ビジネス提携](contact-us/questions.md)
* [プライバシーポリシー](about/privacypolicy.md)
* [オープンソースライセンス](contact-us/questions/license.md)
