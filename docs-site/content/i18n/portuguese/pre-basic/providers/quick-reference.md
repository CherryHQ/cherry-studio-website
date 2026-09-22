---
icon: list
---
# Referência Rápida de Todos os Providers

O Cherry Studio possui **mais de 60 Providers** integrados. Esta página oferece uma tabela de visão geral. Após localizar o Provider desejado, **basta preencher a chave de API conforme as instruções para começar a usar**. Providers com documentação específica possuem links de acesso direto; os demais devem ser configurados seguindo os passos gerais ([Visão Geral dos Providers](README.md)).

## Passos de Uso

1. **Localize o Provider desejado** (use Ctrl/⌘+F para busca rápida)
2. Clique em **Site Oficial** para criar uma conta e obter a Chave de API
3. No Cherry Studio `Configurações → Serviços de modelos`, encontre o Provider correspondente, preencha a chave e clique em "Obter Lista de Modelos"
4. Conclua a configuração

## Decisão em Uma Frase

| Sua Necessidade | Direção Recomendada |
|---|---|
| **Iniciante buscando rapidez**, evitando fluxos complexos | [CherryIN](cherryin-1.md) ou [CherryAI](../../../../pre-basic/providers/cherryai) |
| **Acesso mais conveniente na China** | DeepSeek / Moonshot / SiliconFlow / Zhipu |
| **Melhores modelos internacionais** | OpenAI / Anthropic / Gemini |
| **Uma chave para 200 provedores** | [OpenRouter](openrouter.md) |
| **Totalmente local, sensível à privacidade** | [Ollama](ollama.md) / [LM Studio](lm-studio.md) |
| **Conformidade corporativa** | [Azure OpenAI](azure-openai.md) / AWS Bedrock |
| **Usar [Agentes](../../advanced-basic/agent.md)** | [Anthropic](anthropic.md) / [CherryIN](cherryin-1.md) (requer suporte ao protocolo Anthropic) |

## Modelos Próprios de Grandes Empresas da China

Sem necessidade de VPN, vantagem em conteúdo em chinês e preços relativamente baixos.

| Provider | Característica em Uma Frase | Site Oficial | Documentação Específica |
|---|---|---|---|
| **DeepSeek** | Melhor custo-benefício em programação e raciocínio | [deepseek.com](https://platform.deepseek.com/) | [→](deepseek.md) |
| **Moonshot AI (Kimi)** | Contexto ultralongo (até 2 milhões de caracteres) | [moonshot.cn](https://platform.moonshot.cn/) | [→](moonshot.md) |
| **ZhiPu (智谱)** | Série GLM, multimodal, compatível com Anthropic para executar agentes | [bigmodel.cn](https://open.bigmodel.cn/) | [→](zhipu.md) |
| **doubao (豆包/火山引擎)** | Desenvolvido pela ByteDance, preços acessíveis | [volcengine.com](https://www.volcengine.com/product/doubao) | [→](doubao.md) |
| **Baidu Cloud (文心一言)** | Série ERNIE da Baidu | [cloud.baidu.com](https://cloud.baidu.com/) | — |
| **Bailian (阿里百炼)** | Série Qwen, vasta quantidade de modelos | [bailian.console.aliyun.com](https://bailian.console.aliyun.com/) | [→](aliyun-bailian.md) |
| **BAICHUAN AI** | Grandes modelos Baichuan | [baichuan-ai.com](https://platform.baichuan-ai.com/) | — |
| **MiniMax** | Multimodal na China (voz, vídeo) | [minimaxi.com](https://platform.minimaxi.com/) | [→](minimax.md) |
| **StepFun** | StepFun (阶跃星辰) | [stepfun.com](https://platform.stepfun.com/) | — |
| **LongCat** | Série LongCat da Meituan | [longcat.chat](https://longcat.chat/) | — |
| **Xiaomi MiMo** | Grandes modelos da Xiaomi | [mimo.mi.com](https://mimo.mi.com/) | — |

## Modelos Próprios de Grandes Empresas Internacionais

Primeira linha em desempenho; o acesso da China geralmente requer proxy.

| Provider | Característica em Uma Frase | Site Oficial | Documentação Específica |
|---|---|---|---|
| **OpenAI** | Série GPT | [openai.com](https://platform.openai.com/) | [→](openai.md) |
| **Anthropic** | Série Claude, escolha principal para agentes | [anthropic.com](https://console.anthropic.com/) | [→](anthropic.md) |
| **Gemini (Google)** | Grandes modelos da Google | [aistudio.google.com](https://aistudio.google.com/) | [→](google-gemini.md) |
| **Azure OpenAI** | OpenAI hospedado pela Microsoft, conformidade corporativa | [portal.azure.com](https://portal.azure.com/) | [→](azure-openai.md) |
| **VertexAI** | Hospedado pelo Google Cloud | [cloud.google.com](https://cloud.google.com/vertex-ai) | [→](vertex-ai.md) |
| **AWS Bedrock** | Hospedagem de múltiplos modelos pela Amazon | [aws.amazon.com/bedrock](https://aws.amazon.com/bedrock/) | — |
| **Mistral** | Representante de modelos open source da Europa | [mistral.ai](https://console.mistral.ai/) | [→](mistral.md) |
| **Grok (xAI)** | xAI de Elon Musk, com acesso à web integrado | [x.ai](https://console.x.ai/) | [→](grok.md) |
| **Perplexity** | Conversas aprimoradas por busca | [perplexity.ai](https://www.perplexity.ai/) | [→](perplexity.md) |

## Gateways / Agregadores

Uma chave para acessar múltiplos modelos, com gerenciamento centralizado de contas.

| Provider | Característica em Uma Frase | Site Oficial | Documentação Específica |
|---|---|---|---|
| **CherryAI** | Experiência gratuita oficial da Cherry | — | [→](../../../../pre-basic/providers/cherryai) |
| **CherryIN** | Gateway pago oficial da Cherry, duplo endpoint (OpenAI + Anthropic) | [open.cherryin.cc](https://open.cherryin.cc/) | [→](cherryin-1.md) |
| **OpenRouter** | Maior agregador internacional, 200+ modelos | [openrouter.ai](https://openrouter.ai/) | [→](openrouter.md) |
| **AiHubMix** | Agregador internacional | [aihubmix.com](https://aihubmix.com/) | — |
| **DMXAPI** | Agregador na China | [dmxapi.cn](https://dmxapi.cn/) | — |
| **302.AI** | Agregador na China | [302.ai](https://302.ai/) | — |
| **NewAPI** | Gateway auto-hospedado (open source) | [newapi.pro](https://docs.newapi.pro/) | [→](newapi.md) |
| **OneAPI** | Gateway auto-hospedado (open source) | — | [→](oneapi.md) |
| **PPIO 派欧云** | Nuvem de computação + modelos na China | [ppio.com](https://ppio.com/) | [→](ppio.md) |
| **BurnCloud** | Agregador na China | [burncloud.com](https://ai.burncloud.com/) | — |
| **AIOnly** | Agregador na China | [aiionly.com](https://www.aiionly.com/) | — |
| **ocoolAI** | Agregador na China | [ocoolai.com](https://one.ocoolai.com/) | — |
| **Poe** | Mercado de IA da Quora | [poe.com](https://poe.com/) | — |
| **Vercel AI Gateway** | Gateway da Vercel | [vercel.com/ai](https://vercel.com/ai) | — |

## Serviços de Inferência de Ultra-Baixa Latência / Alto Throughput

Adequado para cenários que exigem "sensação de velocidade" (robôs de IM, tradução em tempo real, etc.).

| Provider | Característica em Uma Frase | Site Oficial | Documentação Específica |
|---|---|---|---|
| **Groq** | Hardware LPU, resposta em milissegundos | [groq.com](https://console.groq.com/) | [→](groq.md) |
| **Cerebras AI** | Chip proprietário, contexto ultralongo | [cerebras.ai](https://cerebras.ai/) | — |
| **Together** | Hospedagem centralizada de modelos open source | [together.ai](https://www.together.ai/) | — |
| **Fireworks** | Otimização de inferência de modelos open source | [fireworks.ai](https://fireworks.ai/) | — |

## Nuvem Doméstica + Serviços de Computação

| Provedor | Característica principal | Site oficial | Documentação específica |
|---|---|---|---|
| **Silicon (硅基流动)** | Maior hospedagem de modelos open source da China | [siliconflow.cn](https://cloud.siliconflow.cn/) | [→](siliconcloud.md) |
| **ModelScope (魔搭)** | Plataforma de modelos open source da Alibaba | [modelscope.cn](https://modelscope.cn/) | [→](modelscope.md) |
| **AlayaNew** | Serviço de inferência na China | [alayanew.com](https://www.alayanew.com/) | — |
| **Qiniu (七牛)** | Qiniu Cloud AI | [qiniu.com](https://www.qiniu.com/) | — |
| **LANYUN** | Inferência na China | [lanyun.net](https://maas.lanyun.net/) | — |
| **Xirang** | Tianyi Cloud Xirang | [ctyun.cn](https://www.ctyun.cn/) | — |

## Exclusivo para incorporação / reordenação

Usado apenas para incorporação ou reordenação, em conjunto com base de conhecimento / memória global.

| Provedor | Característica principal | Site oficial | Documentação específica |
|---|---|---|---|
| **Jina** | Incorporação, reordenação, CLIP, cota gratuita generosa | [jina.ai](https://jina.ai/) | — |
| **VoyageAI** | Especialista em incorporação / reordenação | [voyageai.com](https://www.voyageai.com/) | — |

## Inferência local

Totalmente offline, protege a privacidade.

| Provedor | Característica principal | Site oficial | Documentação específica |
|---|---|---|---|
| **Ollama** | Inferência local via linha de comando, a mais popular | [ollama.com](https://ollama.com/) | [→](ollama.md) |
| **LM Studio** | Inferência local com interface gráfica, compatível com Apple Silicon | [lmstudio.ai](https://lmstudio.ai/) | [→](lm-studio.md) |
| **GPUStack** | Inferência local em nível empresarial | [gpustack.ai](https://gpustack.ai/) | — |
| **OpenVINO Model Server** | Inferência local acelerada pela Intel | [openvino.ai](https://www.openvino.ai/) | — |

## Plataformas de modelos / Outros

| Provedor | Característica principal | Site oficial | Documentação específica |
|---|---|---|---|
| **Hugging Face** | Maior comunidade de modelos open source do mundo | [huggingface.co](https://huggingface.co/) | — |
| **GitHub Copilot** | Assistente de programação do GitHub da Microsoft | [github.com/features/copilot](https://github.com/features/copilot) | [→](github-copilot.md) |
| **GitHub Models** | Mercado de modelos do GitHub (Beta) | [github.com/marketplace/models](https://github.com/marketplace/models) | — |
| **MiniMax Global** | Versão internacional da MiniMax | [minimax.io](https://platform.minimax.io/) | — |
| **SophNet** | Hospedagem de modelos na China | [sophnet.com](https://sophnet.com/) | — |
| **PH8** | Inferência na China | [ph8.co](https://ph8.co/) | — |
| **Z.ai** | Versão internacional da Zhipu | [z.ai](https://z.ai/) | — |
| **nvidia** | Inferência NVIDIA NIM | [nvidia.com](https://www.nvidia.com/ai/) | — |

## Provedor personalizado

Se o serviço que você utiliza não estiver na lista acima, mas oferecer qualquer um dos protocolos **compatível com OpenAI / compatível com Anthropic / compatível com Gemini**, você pode adicioná-lo por meio de [Provedor personalizado](custom-provider.md).

## Ainda não sabe qual escolher?

Use diretamente [**CherryIN**](cherryin-1.md) ou [**CherryAI**](../../../../pre-basic/providers/cherryai) — a opção mais adequada para iniciantes começarem rapidamente. Troque quando precisar de recursos avançados.

***

### Obter ajuda e enviar feedback

Se você tiver dúvidas, encontrar bugs ou tiver sugestões de melhorias de funcionalidades durante a configuração ou o uso, consulte os canais oficiais fornecidos em [Feedback e sugestões](../../question-contact/suggestions.md).
