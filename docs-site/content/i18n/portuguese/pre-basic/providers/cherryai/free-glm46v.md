# Zhipu GLM-4.6V

Os usuários do Cherry Studio agora podem experimentar gratuitamente o **Zhipu GLM-4.6V** através do serviço integrado **CherryIN** — o modelo visual de ponta lançado pela Z.ai (Zhipu AI) em dezembro de 2025, com arquitetura MoE, contexto nativo multimodal de 128K e chamadas nativas de ferramentas multimodais, sendo a escolha preferida para cenários de compreensão de texto e imagem e agentes multimodais.

***

## O que é o GLM-4.6V?

O GLM-4.6V é a geração mais recente de modelos de linguagem visual da série GLM-V da Z.ai, com suporte nativo à modelagem unificada de texto + imagem, expandindo ainda mais as capacidades de contexto e chamadas de ferramentas em relação ao GLM-4.5V.

- Arquitetura: Mixture-of-Experts (MoE)
- Parâmetros totais: 106B
- Parâmetros ativados: aproximadamente 12B
- Comprimento do contexto: 128K tokens
- Licença open source: MIT
- Data de lançamento: 8–9 de dezembro de 2025
- Codificador visual: Suporte a imagens em múltiplas resoluções (até 4K)

A série também inclui o **GLM-4.6V-Flash (9B)**, voltado para cenários locais e de baixa latência, gratuito para uso comercial.

<figure><img src="../../../../../assets/05dc257d349bcc5aa0d51f78.webp" alt=""><figcaption></figcaption></figure>

***

## Continuidade do sistema de treinamento multimodal da série GLM-V

O GLM-4.6V segue a linha técnica do GLM-4.1V-Thinking / GLM-4.5V, com reforços adicionais nas direções de visão e Agent:

1. **Modelagem multimodal nativa**: Treinamento conjunto de texto e imagem, com suporte a entrada mista de texto e imagem
2. **Expansão de contexto**: Contexto de treinamento expandido para 128K tokens, capaz de processar em uma única vez cerca de 150 páginas de documentos densos, 200 páginas de slides ou 1 hora de vídeo
3. **Chamadas nativas de ferramentas multimodais**: As ferramentas podem receber e retornar imagens diretamente, processando artefatos multimodais via URL com base no protocolo MCP expandido
4. **Reforço por aprendizado**: Mantém o fluxo de RL escalável da série GLM-V

<figure><img src="../../../../../assets/15737d0c9c7d3f0a6bfcd9fd.jpeg" alt=""><figcaption></figcaption></figure>

***

## Multimodalidade nativa para cenários reais

As capacidades multimodais do GLM-4.6V cobrem cenários do dia a dia e profissionais:

- ✅ **Compreensão de conteúdo de texto rico**: Documentos longos, texto de múltiplas páginas e layout misto de texto e imagem
- ✅ **Busca visual na web**: Busca e compreensão online combinando entrada visual
- ✅ **Reprodução de frontend**: Geração de código frontend a partir de designs ou capturas de tela de UI
- ✅ **Análise de documentos multimodais de longo contexto**: Entrada de PDFs completos / slides / nível de vídeo
- ✅ **Análise de gráficos e tabelas**: Extração de informações estruturadas

***

## Chamadas nativas de ferramentas multimodais e capacidades de Agent

Uma das principais melhorias do GLM-4.6V é o ciclo fechado de **"percepção visual → ação executável"**: as chamadas de ferramentas suportam nativamente imagens como entrada e saída, permitindo que agentes multimodais sejam implementados em negócios reais.

| Cenário | Uso recomendado | Exemplo |
| --- | --- | --- |
| Perguntas e respostas simples de texto e imagem | Conversa direta | "O que há nesta imagem?" |
| Tarefas de complexidade média | Ativar chamadas de ferramentas | Ler gráfico e depois buscar dados |
| Agent multimodal complexo | Múltiplas ferramentas + MCP | Captura de tela → Compreensão → Chamada de API → Geração de relatório |

***

## MoE eficiente, disponível abertamente

- ⚡ Ativação esparsa MoE: 106B de parâmetros totais, apenas cerca de 12B ativados
- 💰 **Uso gratuito** no Cherry Studio através do CherryIN
- 🖥️ Pesos, código de inferência e ferramentas MCP já estão disponíveis em open source no GitHub e Hugging Face, com licença MIT

***

## Foco em capacidades práticas: Assistente multimodal

O GLM-4.6V é adequado para os seguintes cenários no uso prático:

- **Assistente de documentos**: Leitura e resumo de documentos longos, digitalizações e slides completos
- **Análise de dados**: Identificação e interpretação de gráficos e capturas de tela de painéis
- **Frontend e design**: Geração ou modificação de código frontend com base em capturas de tela de UI
- **Busca visual**: Busca online e integração de informações combinando imagens
- **Agent multimodal**: Conclusão de tarefas complexas combinando ferramentas como navegador, execução de código e busca

***

## Como usar no Cherry Studio?

1. Abra o Cherry Studio e vá para **Configurações → Serviços de Modelo**.
2. Encontre o provedor **CherryIN** e ative-o.
3. Selecione **Zhipu GLM-4.6V** na lista de modelos.
4. Volte à interface de chat, alterne para **GLM-4.6V** no seletor de modelo no topo e envie imagens diretamente na conversa para interação de texto e imagem.

> 💡 Dica: A cota de modelos gratuitos fornecida pelo CherryIN é cobrada oficialmente pelo Cherry Studio, adequada para experiência diária e avaliação; para ambientes de produção, recomenda-se o uso combinado com a API oficial da Z.ai (Zhipu).

***

📘 **Experimente agora o Zhipu GLM-4.6V e desbloqueie as capacidades de multimodalidade nativa e Agent visual!**

***

### Obter ajuda e enviar feedback

Se você tiver qualquer dúvida, bug ou sugestão de melhoria de funcionalidade durante a configuração ou o uso, consulte os canais oficiais fornecidos em [Feedback e Sugestões](../../../question-contact/suggestions.md).
