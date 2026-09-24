---
icon: list
---
# 全 Provider クイックリファレンス

Cherry Studio には **60 以上の Provider** が組み込まれています。本ページでは概要表を提供し、対象の Provider を見つけたら **ガイドに従ってキーを入力するだけで使用できます**。専用ドキュメントがある Provider にはジャンプリンクを提供し、それ以外は一般的な手順（[Provider 概要](README.md)）に従って設定してください。

## 使用手順

1. **対象の Provider を検索**（Ctrl/⌘+F でクイック検索可能）
2. **公式サイト** をクリックしてアカウントを登録し、API キーを取得
3. Cherry Studio の `設定 → モデルサービス` で対応する Provider を見つけ、キーを入力して「モデルリストを取得」をクリック
4. 設定完了

## 一言で決める

| 要件 | 推奨方向 |
|---|---|
| **初心者向けクイックスタート**、複雑なフローを回避 | [CherryIN](cherryin-1.md) または [CherryAI](cherryai) |
| **国内アクセスが最も便利** | DeepSeek / Moonshot / 硅基流动 / 智谱 |
| **海外最強モデル** | OpenAI / Anthropic / Gemini |
| **1 つのキーで 200 社対応** | [OpenRouter](openrouter.md) |
| **完全ローカル、プライバシー重視** | [Ollama](ollama.md) / [LM Studio](lm-studio.md) |
| **企業コンプライアンス** | [Azure OpenAI](azure-openai.md) / AWS Bedrock |
| **[エージェント](../../advanced-basic/agent.md) を使用** | [Anthropic](anthropic.md) / [CherryIN](cherryin-1.md)（Anthropic プロトコル対応が必要） |

## 国内大手自社モデル

プロキシ不要、中国語に優位、価格が比較的安価。

| Provider | 一言特徴 | 公式サイト | 専用ドキュメント |
|---|---|---|---|
| **DeepSeek** | プログラミングと推論のコストパフォーマンス王者 | [deepseek.com](https://platform.deepseek.com/) | [→](deepseek.md) |
| **Moonshot AI (Kimi)** | 超長コンテキスト（最大 200 万字） | [moonshot.cn](https://platform.moonshot.cn/) | [→](moonshot.md) |
| **ZhiPu (智谱)** | GLM シリーズ、マルチモーダル、Anthropic 互換でエージェント実行可能 | [bigmodel.cn](https://open.bigmodel.cn/) | [→](zhipu.md) |
| **doubao (豆包/火山引擎)** | ByteDance 製、手頃な価格 | [volcengine.com](https://www.volcengine.com/product/doubao) | [→](doubao.md) |
| **Baidu Cloud (文心一言)** | Baidu ERNIE シリーズ | [cloud.baidu.com](https://cloud.baidu.com/) | — |
| **Bailian (阿里百炼)** | Qwen シリーズ、大量のモデル | [bailian.console.aliyun.com](https://bailian.console.aliyun.com/) | [→](a-li-yun-bai-lian.md) |
| **BAICHUAN AI** | 百川大規模モデル | [baichuan-ai.com](https://platform.baichuan-ai.com/) | — |
| **MiniMax** | 国内マルチモーダル（音声、動画） | [minimaxi.com](https://platform.minimaxi.com/) | [→](minimax.md) |
| **StepFun** | 階躍星辰 | [stepfun.com](https://platform.stepfun.com/) | — |
| **LongCat** | Meituan LongCat シリーズ | [longcat.chat](https://longcat.chat/) | — |
| **Xiaomi MiMo** | Xiaomi 大規模モデル | [mimo.mi.com](https://mimo.mi.com/) | — |

## 海外大手自社モデル

性能は第一級、国内からのアクセスには通常プロキシが必要。

| Provider | 一言特徴 | 公式サイト | 専用ドキュメント |
|---|---|---|---|
| **OpenAI** | GPT シリーズ | [openai.com](https://platform.openai.com/) | [→](openai.md) |
| **Anthropic** | Claude シリーズ、エージェントの第一候補 | [anthropic.com](https://console.anthropic.com/) | [→](anthropic.md) |
| **Gemini (Google)** | Google 大規模モデル | [aistudio.google.com](https://aistudio.google.com/) | [→](google-gemini.md) |
| **Azure OpenAI** | Microsoft による OpenAI ホスティング、企業コンプライアンス対応 | [portal.azure.com](https://portal.azure.com/) | [→](azure-openai.md) |
| **VertexAI** | Google Cloud ホスティング | [cloud.google.com](https://cloud.google.com/vertex-ai) | [→](vertex-ai.md) |
| **AWS Bedrock** | Amazon による複数モデルのホスティング | [aws.amazon.com/bedrock](https://aws.amazon.com/bedrock/) | — |
| **Mistral** | 欧州オープンソースモデルの代表 | [mistral.ai](https://console.mistral.ai/) | [→](mistral.md) |
| **Grok (xAI)** | Elon Musk の xAI、ネット接続機能内蔵 | [x.ai](https://console.x.ai/) | [→](grok.md) |
| **Perplexity** | 検索強化型対話 | [perplexity.ai](https://www.perplexity.ai/) | [→](perplexity.md) |

## ゲートウェイ / アグリゲーション

1 つのキーで複数モデルに接続、アカウントの一元管理が可能。

| Provider | 一言特徴 | 公式サイト | 専用ドキュメント |
|---|---|---|---|
| **CherryAI** | Cherry 公式無料体験 | — | [→](cherryai) |
| **CherryIN** | Cherry 公式有料ゲートウェイ、デュアルエンドポイント（OpenAI + Anthropic）| [open.cherryin.cc](https://open.cherryin.cc/) | [→](cherryin-1.md) |
| **OpenRouter** | 海外最大のアグリゲーション、200+ モデル | [openrouter.ai](https://openrouter.ai/) | [→](openrouter.md) |
| **AiHubMix** | 海外アグリゲーション | [aihubmix.com](https://aihubmix.com/) | — |
| **DMXAPI** | 国内アグリゲーション | [dmxapi.cn](https://dmxapi.cn/) | — |
| **302.AI** | 国内アグリゲーション | [302.ai](https://302.ai/) | — |
| **NewAPI** | 自建ゲートウェイ（オープンソース） | [newapi.pro](https://docs.newapi.pro/) | [→](newapi.md) |
| **OneAPI** | 自建ゲートウェイ（オープンソース） | — | [→](oneapi.md) |
| **PPIO 派欧云** | 国内クラウドコンピューティング + モデル | [ppio.com](https://ppio.com/) | [→](ppio.md) |
| **BurnCloud** | 国内アグリゲーション | [burncloud.com](https://ai.burncloud.com/) | — |
| **AIOnly** | 国内アグリゲーション | [aiionly.com](https://www.aiionly.com/) | — |
| **ocoolAI** | 国内アグリゲーション | [ocoolai.com](https://one.ocoolai.com/) | — |
| **Poe** | Quora 傘下の AI マーケットプレイス | [poe.com](https://poe.com/) | — |
| **Vercel AI Gateway** | Vercel 傘下のゲートウェイ | [vercel.com/ai](https://vercel.com/ai) | — |

## 超低レイテンシ / 高スループット推論サービス

「スピード感」が必要なシーン向け（IM ボット、リアルタイム翻訳など）。

| Provider | 一言特徴 | 公式サイト | 専用ドキュメント |
|---|---|---|---|
| **Groq** | LPU ハードウェア、ミリ秒レベルの応答 | [groq.com](https://console.groq.com/) | [→](groq.md) |
| **Cerebras AI** | 自社開発チップ、超大型コンテキスト | [cerebras.ai](https://cerebras.ai/) | — |
| **Together** | オープンソースモデルの集中ホスティング | [together.ai](https://www.together.ai/) | — |
| **Fireworks** | オープンソースモデルの推論最適化 | [fireworks.ai](https://fireworks.ai/) | — |

## 国内クラウド + コンピューティングサービス

| Provider | 特徴 | 公式サイト | 詳細ドキュメント |
|---|---|---|---|
| **Silicon (硅基流动)** | 国内最大のオープンソースモデルホスティング | [siliconflow.cn](https://cloud.siliconflow.cn/) | [→](siliconcloud.md) |
| **ModelScope (魔搭)** | アリババ傘下のオープンソースモデルプラットフォーム | [modelscope.cn](https://modelscope.cn/) | [→](modelscope.md) |
| **AlayaNew** | 国内推論サービス | [alayanew.com](https://www.alayanew.com/) | — |
| **Qiniu (七牛)** | 七牛クラウド AI | [qiniu.com](https://www.qiniu.com/) | — |
| **LANYUN** | 国内推論 | [lanyun.net](https://maas.lanyun.net/) | — |
| **Xirang** | 天翼クラウド息壤 | [ctyun.cn](https://www.ctyun.cn/) | — |

## 埋め込み / リランキング専用

埋め込みまたはリランキングのみに使用し、ナレッジベース / グローバルメモリと組み合わせて利用します。

| Provider | 特徴 | 公式サイト | 詳細ドキュメント |
|---|---|---|---|
| **Jina** | 埋め込み、リランキング、CLIP、無料枠が大きい | [jina.ai](https://jina.ai/) | — |
| **VoyageAI** | 埋め込み / リランキングの専門サービス | [voyageai.com](https://www.voyageai.com/) | — |

## ローカル推論

完全にオフラインで、プライバシーを保護します。

| Provider | 特徴 | 公式サイト | 詳細ドキュメント |
|---|---|---|---|
| **Ollama** | コマンドラインによるローカル推論、最も人気 | [ollama.com](https://ollama.com/) | [→](ollama.md) |
| **LM Studio** | GUIによるローカル推論、Apple Siliconに最適 | [lmstudio.ai](https://lmstudio.ai/) | [→](lm-studio.md) |
| **GPUStack** | エンタープライズ向けローカル推論 | [gpustack.ai](https://gpustack.ai/) | — |
| **OpenVINO Model Server** | Intelアクセラレーションによるローカル推論 | [openvino.ai](https://www.openvino.ai/) | — |

## モデルプラットフォーム / その他

| Provider | 特徴 | 公式サイト | 詳細ドキュメント |
|---|---|---|---|
| **Hugging Face** | 世界最大のオープンソースモデルコミュニティ | [huggingface.co](https://huggingface.co/) | — |
| **GitHub Copilot** | Microsoft GitHub プログラミングアシスタント | [github.com/features/copilot](https://github.com/features/copilot) | [→](github-copilot.md) |
| **GitHub Models** | GitHub モデルマーケットプレイス（ベータ版） | [github.com/marketplace/models](https://github.com/marketplace/models) | — |
| **MiniMax Global** | MiniMax 海外版 | [minimax.io](https://platform.minimax.io/) | — |
| **SophNet** | 国内モデルホスティング | [sophnet.com](https://sophnet.com/) | — |
| **PH8** | 国内推論 | [ph8.co](https://ph8.co/) | — |
| **Z.ai** | 智譜国際版 | [z.ai](https://z.ai/) | — |
| **nvidia** | NVIDIA NIM 推論 | [nvidia.com](https://www.nvidia.com/ai/) | — |

## カスタムプロバイダー

上記のリストにないサービスを使用している場合でも、**OpenAI 互換 / Anthropic 互換 / Gemini 互換** のいずれかのプロトコルを提供している場合は、[カスタムプロバイダー](zi-ding-yi-fu-wu-shang.md) として追加できます。

## まだどれを選べばいいか分からない？

[**CherryIN**](cherryin-1.md) または [**CherryAI**](cherryai) を直接使用してください —— 初心者にとって最もクイックスタートに適しています。高度な機能が必要になったら、その時点で切り替えてください。

***

### ヘルプの取得とフィードバックの送信

設定や使用過程で疑問、バグ、または機能改善の提案がある場合は、[フィードバックと提案](../../question-contact/suggestions.md) に記載されている公式チャネルをご参照ください。
