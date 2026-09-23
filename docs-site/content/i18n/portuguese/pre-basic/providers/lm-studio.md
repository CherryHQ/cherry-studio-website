# LM Studio

O LM Studio é uma **GUI local para grandes modelos** popular, que permite baixar, quantizar e executar inferência localmente de diversos modelos open source. O Cherry Studio pode se conectar ao serviço local do LM Studio como frontend, oferecendo uma experiência de conversa aprimorada enquanto mantém a privacidade local.

## Preparação prévia

1. Baixe e instale o cliente no [site oficial do LM Studio](https://lmstudio.ai/)
2. Baixe pelo menos um modelo no LM Studio (recomendado começar com Llama 3.x 8B ou a série Qwen)
3. Abra a aba **Server** no topo do LM Studio e clique em **Start Server** (porta padrão `1234`)

## Configuração no Cherry Studio

* Abra `Configurações → Serviços de modelos`, localize o Provider **LM Studio** e acesse a página de detalhes
* O **endereço da API** é `http://localhost:1234` por padrão; se você alterou a porta do LM Studio, atualize este valor
* A **chave de API** pode ficar em branco (a inferência local não requer autenticação) ou ser preenchida se a autenticação estiver ativada no LM Studio
* Clique em **Obter lista de modelos**, e o Cherry Studio buscará automaticamente os modelos carregados no LM Studio

{% hint style="info" %}
**A lista de modelos está vazia?** O LM Studio expõe apenas os modelos **`Load` na memória**; modelos não carregados não aparecem na lista. Volte ao LM Studio, carregue o modelo primeiro e depois clique em "Obter lista de modelos".
{% endhint %}

## Uso recomendado

| Cenário | Sugestão |
| -------------------- | --------------------------------------------------------------------- |
| Conversas com sensibilidade à privacidade | Use modelos pequenos (abaixo de 8B) localmente, totalmente offline |
| Apple Silicon (chips M) | Use o backend MLX no LM Studio, com eficiência significativamente superior ao llama.cpp |
| Modelos de incorporação | O LM Studio também pode carregar modelos de incorporação para uso em bases de conhecimento |

## Diferenças em relação ao Ollama

| | LM Studio | [Ollama](ollama.md) |
| ---- | ------------- | ------------------- |
| Formato | Interface gráfica + Servidor | Linha de comando / serviço em segundo plano |
| Gerenciamento de modelos | Navegação/baixamento via GUI | `ollama pull` |
| API | Compatível com OpenAI | Compatível com OpenAI |
| Indicado para | Usuários que preferem interação gráfica | Usuários que preferem linha de comando / implantação via Docker |

Ambos podem ser integrados ao Cherry Studio; escolha conforme sua preferência pessoal.

## Perguntas frequentes

* **Cherry Studio não consegue se conectar**: verifique se o Servidor no LM Studio está iniciado (indicador verde)
* **Respostas muito lentas**: modelo grande demais / memória de vídeo insuficiente; use um modelo menor ou uma quantização mais agressiva (ex.: Q4 → Q3)
* **Saída corrompida / truncada**: o comprimento do contexto excede o limite do modelo; aumente `n_ctx` no LM Studio

***

### Obter ajuda e enviar feedback

Se você tiver dúvidas, encontrar bugs ou tiver sugestões de melhorias de funcionalidades durante a configuração ou o uso, consulte os canais oficiais fornecidos em [Feedback e sugestões](../../question-contact/suggestions.md).
