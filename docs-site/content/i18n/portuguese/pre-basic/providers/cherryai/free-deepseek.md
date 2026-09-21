# DeepSeek V3.2

Agora, os usuários do Cherry Studio podem experimentar gratuitamente o **DeepSeek V3.2** por meio do serviço integrado **CherryIN** — o modelo MoE de atenção esparsa de nível de referência lançado pela DeepSeek em 1º de dezembro de 2025, que integra nativamente o "raciocínio" às chamadas de ferramentas pela primeira vez, sendo uma escolha ideal para agentes avançados e cenários de contexto longo.

***

## O que é o DeepSeek V3.2?

O DeepSeek V3.2 é uma iteração baseada no V3.2-Exp, adotando a arquitetura Mixture-of-Experts (MoE) e introduzindo o mecanismo de atenção esparsa **DeepSeek Sparse Attention (DSA)**, reduzindo significativamente os custos de inferência em contextos longos, mantendo simultaneamente uma escala total de parâmetros extremamente grande.

- Arquitetura: MoE + DeepSeek Sparse Attention (DSA) + Multi-Head Latent Attention (MLA)
- Total de parâmetros: 685B
- Parâmetros ativados por Token: aproximadamente 37B
- Número de especialistas: 256 especialistas por camada
- Licença open source: MIT
- Data de lançamento: 1º de dezembro de 2025 (o V3.2-Exp foi lançado em 29 de setembro de 2025)

O V3.2 também lançou a versão **DeepSeek-V3.2-Speciale** voltada para API, alcançando desempenho de nível medalha de ouro em tarefas de raciocínio complexo nas competições IMO, CMO, ICPC World Finals e IOI 2025.

<figure><img src="../../../../../assets/8ed4c04255cbd56ac0625741.webp" alt=""><figcaption></figcaption></figure>

***

## Continuidade do fluxo de treinamento e alinhamento robusto

O DeepSeek V3.2 mantém o pipeline de treinamento maduro da série V3, com extensões cruciais para cenários de Agent:

1. **Pré-treinamento em larga escala**: Treinamento base concluído em um vasto corpus multilíngue de alta qualidade, cobrindo código, matemática e conhecimento científico.
2. **Introdução da atenção esparsa**: Treinamento do modelo principal e do lightning indexer com comprimento de sequência de 128K, onde cada token de query seleciona 2048 tokens de chave-valor para participar da atenção.
3. **Síntese de dados de Agent em larga escala**: Novo método de síntese de dados de treinamento de Agent, cobrindo mais de 1.800 ambientes e mais de 85.000 instruções complexas.
4. **Fusão de raciocínio e chamadas de ferramentas**: O V3.2 é o primeiro modelo da DeepSeek a integrar nativamente o "raciocínio" às chamadas de ferramentas, suportando o uso de ferramentas tanto no "modo de raciocínio" quanto no "modo sem raciocínio".

<figure><img src="../../../../../assets/58623875cc487b3cbbd60955.jpeg" alt=""><figcaption></figcaption></figure>

***

## Capacidades centrais de nível de referência

O DeepSeek V3.2 destaca-se por capacidades gerais "equivalentes ao nível do GPT-5", com reforços significativos em Agent e raciocínio complexo:

- ✅ **Raciocínio nativo + chamadas de ferramentas**: Primeiro modelo DeepSeek a integrar o thinking no tool-use
- ✅ **Capacidade de raciocínio de ponta**: O V3.2-Speciale atinge nível de medalha de ouro na IMO / CMO / ICPC World Finals / IOI 2025
- ✅ **Código e tarefas de desenvolvimento**: Herda a forte capacidade de código da série V3
- ✅ **Estabilidade em contexto longo**: Capacidade de análise em nível de documentos longos e repositórios de código proporcionada pelo DSA
- ✅ **Chamadas estruturadas de ferramentas**: Adequado para construir Agentes com planejamento e execução em múltiplas etapas

<figure><img src="../../../../../assets/b271db8ec88f1910b620786b.webp" alt=""><figcaption></figcaption></figure>

***

## DeepSeek Sparse Attention: mais longo, mais eficiente

O DSA é a atualização tecnológica central do V3.2, implementada por meio de **lightning indexer + seleção fina de tokens**:

- Primeira implementação de atenção esparsa fina em grandes modelos
- Redução da complexidade da atenção central de O(L²)
- Aceleração significativa no treinamento e inferência em contexto longo, mantendo qualidade de saída quase idêntica à da atenção densa

| Cenário | Uso recomendado | Exemplo |
| --- | --- | --- |
| Conversas curtas / Perguntas simples | Chamada direta | Perguntas e respostas do dia a dia, resumos |
| Tarefas de complexidade média | Ativar chamadas de ferramentas | Análise de dados, refatoração de código |
| Tarefas complexas de Agent | Raciocínio + chamadas de ferramentas | Planejamento em múltiplas etapas, análise de repositórios de código, revisão de documentos longos |

***

## Aberto, utilizável e amigável ao ecossistema

- ⚡ Aceleração de inferência em contexto longo proporcionada pelo DSA
- 💰 **Uso gratuito** no Cherry Studio por meio do CherryIN
- 🖥️ Pesos open source, licença MIT, suporte Day-0 em frameworks de inferência principais como vLLM e SGLang

<figure><img src="../../../../../assets/b35d1fa4d3aa4dceba690581.webp" alt=""><figcaption></figcaption></figure>

***

## Foco em capacidades práticas: código e Agent

O DeepSeek V3.2 se destaca especialmente em fluxos de trabalho de desenvolvimento práticos:

- Geração e refatoração de código multilíngue
- Compreensão de contexto em nível de repositório de código e geração de patches
- Cadeia de ferramentas de Agent: chamadas estáveis de ferramentas externas, busca, execução de código
- Matemática e raciocínio complexo: suporte a problemas de nível de competição

***

## Como usar no Cherry Studio?

1. Abra o Cherry Studio e acesse **Configurações → Serviços de Modelo**.
2. Encontre o provedor **CherryIN** e ative-o.
3. Selecione **DeepSeek V3.2** na lista de modelos.
4. Retorne à interface de chat e alterne para **DeepSeek V3.2** no seletor de modelos no topo para iniciar a conversa.

> 💡 Dica: A cota de modelos gratuitos fornecida pelo CherryIN é cobrada oficialmente pelo Cherry Studio, sendo adequada para experiência diária e avaliação; para ambientes de produção, recomenda-se o uso combinado com a API oficial da DeepSeek.

***

📘 **Experimente o DeepSeek V3.2 agora e inicie sua jornada de raciocínio e Agent de nível de referência!**

***

### Obter ajuda e enviar feedback

Se você tiver quaisquer dúvidas, bugs ou sugestões de melhoria de funcionalidades durante a configuração ou o uso, consulte os canais oficiais fornecidos em [Feedback e Sugestões](../../../question-contact/suggestions.md).
