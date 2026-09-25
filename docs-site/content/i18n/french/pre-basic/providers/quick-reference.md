---
icon: list
---
# Référence rapide de tous les Providers

Cherry Studio intègre **plus de 60 Providers**. Cette page fournit un tableau récapitulatif. Une fois le Provider cible identifié, **suivez les instructions pour saisir la clé API et l'utiliser**. Les Providers disposant d'une documentation dédiée sont accompagnés d'un lien de redirection ; les autres se configurent selon les étapes génériques ([Aperçu des Providers](README.md)).

## Étapes d'utilisation

1. **Localiser le Provider cible** (recherche rapide possible avec Ctrl/⌘+F)
2. Cliquez sur **Site officiel** pour créer un compte et obtenir la clé API
3. Dans Cherry Studio `Paramètres → Services de modèles`, trouvez le Provider correspondant, saisissez la clé puis cliquez sur « Obtenir la liste des modèles »
4. Finaliser la configuration

## Décision en une phrase

| Votre besoin | Direction recommandée |
|---|---|
| **Démarrage rapide pour débutants**, éviter les processus complexes | [CherryIN](cherryin-1.md) ou [CherryAI](cherryai) |
| **Accès le plus pratique en Chine** | DeepSeek / Moonshot / 硅基流动 / 智谱 |
| **Meilleurs modèles internationaux** | OpenAI / Anthropic / Gemini |
| **Une clé unique pour 200 Providers** | [OpenRouter](openrouter.md) |
| **Entièrement local, sensibilité à la vie privée** | [Ollama](ollama.md) / [LM Studio](lm-studio.md) |
| **Conformité entreprise** | [Azure OpenAI](azure-openai.md) / AWS Bedrock |
| **Utilisation d'[Agents](../../advanced-basic/agent.md)** | [Anthropic](anthropic.md) / [CherryIN](cherryin-1.md) (doit prendre en charge le protocole Anthropic) |

## Modèles propriétaires des grands acteurs chinois

Aucun proxy nécessaire, avantage en chinois, prix relativement abordables.

| Provider | Caractéristique clé | Site officiel | Documentation dédiée |
|---|---|---|---|
| **DeepSeek** | Meilleur rapport qualité/prix pour le code et le raisonnement | [deepseek.com](https://platform.deepseek.com/) | [→](deepseek.md) |
| **Moonshot AI (Kimi)** | Contexte ultra-long (jusqu'à 2 millions de mots) | [moonshot.cn](https://platform.moonshot.cn/) | [→](moonshot.md) |
| **ZhiPu (智谱)** | Série GLM, multimodal, compatible Anthropic pour les Agents | [bigmodel.cn](https://open.bigmodel.cn/) | [→](zhipu.md) |
| **doubao (豆包/火山引擎)** | Développé par ByteDance, prix accessibles | [volcengine.com](https://www.volcengine.com/product/doubao) | [→](doubao.md) |
| **Baidu Cloud (文心一言)** | Série ERNIE de Baidu | [cloud.baidu.com](https://cloud.baidu.com/) | — |
| **Bailian (阿里百炼)** | Série Qwen, vaste catalogue de modèles | [bailian.console.aliyun.com](https://bailian.console.aliyun.com/) | [→](a-li-yun-bai-lian.md) |
| **BAICHUAN AI** | Grand modèle de Baichuan | [baichuan-ai.com](https://platform.baichuan-ai.com/) | — |
| **MiniMax** | Multimodal en Chine (voix, vidéo) | [minimaxi.com](https://platform.minimaxi.com/) | [→](minimax.md) |
| **StepFun** | 阶跃星辰 | [stepfun.com](https://platform.stepfun.com/) | — |
| **LongCat** | Série LongCat de Meituan | [longcat.chat](https://longcat.chat/) | — |
| **Xiaomi MiMo** | Grand modèle de Xiaomi | [mimo.mi.com](https://mimo.mi.com/) | — |

## Modèles propriétaires des grands acteurs internationaux

Premier rang en termes de performance, l'accès depuis la Chine nécessite généralement un proxy.

| Provider | Caractéristique clé | Site officiel | Documentation dédiée |
|---|---|---|---|
| **OpenAI** | Série GPT | [openai.com](https://platform.openai.com/) | [→](openai.md) |
| **Anthropic** | Série Claude, choix privilégié pour les Agents | [anthropic.com](https://console.anthropic.com/) | [→](anthropic.md) |
| **Gemini (Google)** | Grand modèle de Google | [aistudio.google.com](https://aistudio.google.com/) | [→](google-gemini.md) |
| **Azure OpenAI** | OpenAI hébergé par Microsoft, conformité entreprise | [portal.azure.com](https://portal.azure.com/) | [→](azure-openai.md) |
| **VertexAI** | Hébergé par Google Cloud | [cloud.google.com](https://cloud.google.com/vertex-ai) | [→](vertex-ai.md) |
| **AWS Bedrock** | Hébergement de multiples modèles par Amazon | [aws.amazon.com/bedrock](https://aws.amazon.com/bedrock/) | — |
| **Mistral** | Représentant des modèles open source européens | [mistral.ai](https://console.mistral.ai/) | [→](mistral.md) |
| **Grok (xAI)** | xAI de Musk, accès web intégré | [x.ai](https://console.x.ai/) | [→](grok.md) |
| **Perplexity** | Dialogue enrichi par la recherche | [perplexity.ai](https://www.perplexity.ai/) | [→](perplexity.md) |

## Passerelles / Agrégateurs

Une clé unique pour accéder à plusieurs modèles, gestion centralisée des comptes.

| Provider | Caractéristique clé | Site officiel | Documentation dédiée |
|---|---|---|---|
| **CherryAI** | Expérience gratuite officielle Cherry | — | [→](cherryai) |
| **CherryIN** | Passerelle payante officielle Cherry, double point d'accès (OpenAI + Anthropic) | [open.cherryin.cc](https://open.cherryin.cc/) | [→](cherryin-1.md) |
| **OpenRouter** | Plus grand agrégateur international, 200+ modèles | [openrouter.ai](https://openrouter.ai/) | [→](openrouter.md) |
| **AiHubMix** | Agrégateur international | [aihubmix.com](https://aihubmix.com/) | — |
| **DMXAPI** | Agrégateur chinois | [dmxapi.cn](https://dmxapi.cn/) | — |
| **302.AI** | Agrégateur chinois | [302.ai](https://302.ai/) | — |
| **NewAPI** | Passerelle auto-hébergée (open source) | [newapi.pro](https://docs.newapi.pro/) | [→](newapi.md) |
| **OneAPI** | Passerelle auto-hébergée (open source) | — | [→](oneapi.md) |
| **PPIO 派欧云** | Puissance de calcul cloud + modèles en Chine | [ppio.com](https://ppio.com/) | [→](ppio.md) |
| **BurnCloud** | Agrégateur chinois | [burncloud.com](https://ai.burncloud.com/) | — |
| **AIOnly** | Agrégateur chinois | [aiionly.com](https://www.aiionly.com/) | — |
| **ocoolAI** | Agrégateur chinois | [ocoolai.com](https://one.ocoolai.com/) | — |
| **Poe** | Marché IA de Quora | [poe.com](https://poe.com/) | — |
| **Vercel AI Gateway** | Passerelle de Vercel | [vercel.com/ai](https://vercel.com/ai) | — |

## Services d'inférence à très faible latence / haut débit

Idéal pour les scénarios exigeant une « sensation de vitesse » (bots IM, traduction en temps réel, etc.).

| Provider | Caractéristique clé | Site officiel | Documentation dédiée |
|---|---|---|---|
| **Groq** | Matériel LPU, réponse en millisecondes | [groq.com](https://console.groq.com/) | [→](groq.md) |
| **Cerebras AI** | Puce propriétaire, contexte très large | [cerebras.ai](https://cerebras.ai/) | — |
| **Together** | Hébergement centralisé de modèles open source | [together.ai](https://www.together.ai/) | — |
| **Fireworks** | Optimisation de l'inférence des modèles open source | [fireworks.ai](https://fireworks.ai/) | — |

## Cloud chinois + services de puissance de calcul

| Fournisseur | Caractéristique principale | Site web | Documentation dédiée |
|---|---|---|---|
| **Silicon (硅基流动)** | Plus grande plateforme d’hébergement de modèles open source en Chine | [siliconflow.cn](https://cloud.siliconflow.cn/) | [→](siliconcloud.md) |
| **ModelScope (魔搭)** | Plateforme de modèles open source d’Alibaba | [modelscope.cn](https://modelscope.cn/) | [→](modelscope.md) |
| **AlayaNew** | Service d’inférence en Chine | [alayanew.com](https://www.alayanew.com/) | — |
| **Qiniu (七牛)** | Qiniu Cloud AI | [qiniu.com](https://www.qiniu.com/) | — |
| **LANYUN** | Inférence en Chine | [lanyun.net](https://maas.lanyun.net/) | — |
| **Xirang** | Tianyi Cloud Xirang | [ctyun.cn](https://www.ctyun.cn/) | — |

## Exclusif aux embeddings / au reranking

Utilisé uniquement pour les embeddings ou le reranking, en combinaison avec les bases de connaissances / la mémoire globale.

| Fournisseur | Caractéristique principale | Site web | Documentation dédiée |
|---|---|---|---|
| **Jina** | Embeddings, reranking, CLIP, quota gratuit généreux | [jina.ai](https://jina.ai/) | — |
| **VoyageAI** | Spécialiste des embeddings / du reranking | [voyageai.com](https://www.voyageai.com/) | — |

## Inférence locale

Entièrement hors ligne, protection de la vie privée.

| Fournisseur | Caractéristique principale | Site web | Documentation dédiée |
|---|---|---|---|
| **Ollama** | Inférence locale en ligne de commande, la plus populaire | [ollama.com](https://ollama.com/) | [→](ollama.md) |
| **LM Studio** | Inférence locale avec interface graphique, compatible Apple Silicon | [lmstudio.ai](https://lmstudio.ai/) | [→](lm-studio.md) |
| **GPUStack** | Inférence locale de niveau entreprise | [gpustack.ai](https://gpustack.ai/) | — |
| **OpenVINO Model Server** | Inférence locale accélérée par Intel | [openvino.ai](https://www.openvino.ai/) | — |

## Plateformes de modèles / Autres

| Fournisseur | Caractéristique principale | Site web | Documentation dédiée |
|---|---|---|---|
| **Hugging Face** | Plus grande communauté de modèles open source au monde | [huggingface.co](https://huggingface.co/) | — |
| **GitHub Copilot** | Assistant de programmation GitHub de Microsoft | [github.com/features/copilot](https://github.com/features/copilot) | [→](github-copilot.md) |
| **GitHub Models** | Marché de modèles GitHub (Bêta) | [github.com/marketplace/models](https://github.com/marketplace/models) | — |
| **MiniMax Global** | Version internationale de MiniMax | [minimax.io](https://platform.minimax.io/) | — |
| **SophNet** | Hébergement de modèles en Chine | [sophnet.com](https://sophnet.com/) | — |
| **PH8** | Inférence en Chine | [ph8.co](https://ph8.co/) | — |
| **Z.ai** | Version internationale de Zhipu | [z.ai](https://z.ai/) | — |
| **nvidia** | Inférence NVIDIA NIM | [nvidia.com](https://www.nvidia.com/ai/) | — |

## Fournisseur personnalisé

Si le service que vous utilisez n’est pas répertorié ci-dessus, mais qu’il prend en charge l’un des protocoles **compatible OpenAI / compatible Anthropic / compatible Gemini**, vous pouvez l’ajouter via [Fournisseur personnalisé](zi-ding-yi-fu-wu-shang.md).

## Vous ne savez toujours pas lequel choisir ?

Utilisez directement [**CherryIN**](cherryin-1.md) ou [**CherryAI**](cherryai) — idéal pour une prise en main rapide par les débutants. Changez de fournisseur plus tard si vous avez besoin de fonctionnalités avancées.

***

### Obtenir de l’aide et envoyer des retours

Si vous avez des questions, des bugs ou des suggestions d’amélioration lors de la configuration ou de l’utilisation, veuillez consulter les canaux officiels fournis dans [Retours et suggestions](../../question-contact/suggestions.md).
