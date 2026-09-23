---
icon: wrench
---

# Usar ferramentas com a IA

As ferramentas permitem que um agente recupere informações ou execute uma ação: leia uma página da web, verifique seu calendário ou salve uma resposta como um arquivo. O modelo então usa o resultado para continuar sua resposta. Você não precisa se lembrar dos nomes das ferramentas – descreva o material, a tarefa e o resultado desejado.

## Qual ferramenta eu preciso?

| Sua tarefa | O que preparar | Guia |
| --- | --- | --- |
| Pesquise ou leia páginas da web | Habilite o recurso web do agente e configure serviços de pesquisa e leitura | [Pesquisa na Web e leitura de páginas](web-search.md) |
| Verifique horários, crie eventos ou gerencie tarefas | Habilite calendário ou lembretes e conceda permissões do sistema | [Calendário e lembretes](calendar-and-reminders.md) |
| Obtenha sua localização atual ou resuma a atividade registrada | Habilite e autorize a capacidade do dispositivo; a saúde é apenas iOS | [Localização e registros de saúde](location-and-health.md) |
| Salve uma lista de verificação, tabela ou página da web | Selecione um modelo de texto que suporte chamadas de ferramenta | [Criar e editar arquivos](file-generation.md) |
| Transforme um arquivo HTML em uma imagem ou apresentação | Abra o arquivo HTML salvo e use seu menu de compartilhamento | [HTML para imagem e PPT](html-export.md) |
| Ler ou atualizar material em Feishu, Notion e outros serviços | Conecte o plugin a uma conta que possa acessar o material | [Plugins e ferramentas externas](plugins.md) |
| Peça a um agente de texto para gerar uma imagem | Habilite a geração de imagens e configure um modelo de desenho | [Geração de imagem](image-generation.md) |
| Use um serviço de ferramenta remota fornecido por alguém | Adicione um servidor MCP e habilite-o em um agente salvo | [Configuração de ferramenta personalizada](plugins.md) |

As ações orientadas por modelo precisam de um modelo que realmente suporte chamadas de ferramentas. A conversão manual de um arquivo HTML salvo não. Verificar um sinalizador de capacidade no editor de modelo não pode adicionar suporte que falta ao modelo.

## Experimente uma pequena tarefa primeiro

1. Selecione um modelo de texto que suporte chamadas de ferramenta.
2. Edite o agente atual e ative o recurso necessário na seção **Sistema**. A leitura e gravação de arquivos não possuem chave separada de capacidade do sistema.
3. Conecte uma conta para os plugins ou conceda permissão ao usar os recursos do dispositivo. Ativar o recurso no agente e conceder a permissão do sistema são requisitos separados.
4. Peça uma tarefa específica, inspecione o resultado e continue.

Comece com:

> Primeiro liste os calendários graváveis no meu telefone e depois leia os eventos de amanhã. Classifique-os por horário de início e nomeie o calendário para cada um. Não crie ou altere nada.

Depois que o resultado retornar, substitua Pessoal abaixo por um calendário real gravável do resultado. Se nenhum estiver disponível, configure primeiro um no calendário do sistema:

> No calendário pessoal que você acabou de listar, crie “Organizar materiais” amanhã, das 15h às 15h30, horário de Pequim. Diga-me se foi salvo com sucesso.

Solicitações separadas ajudam você a confirmar o alvo. Para que o aplicativo solicite aprovação antes das ações elegíveis, altere também o modo de aprovação do agente para **Pergunte quando necessário**. Uma instrução escrita para perguntar primeiro não substitui essa configuração.

## Faça solicitações específicas

Inclua **onde está o material → a data ou intervalo de conteúdo → a ação → o formato de saída → se deseja fazer alterações agora**.

* "Leia este documento Feishu: [link]. Resuma apenas a seção dois como proprietário, tarefa e prazo. Marque os detalhes ausentes como não confirmados. Não crie tarefas ainda."
* "Transforme minha lista de verificação anexada em um arquivo CSV com colunas de item, quantidade e notas. Salve-o como Packing-list.csv."
* "Use Amap para comparar rotas de transporte público da Praça do Povo em Xangai até a Estação Ferroviária de Hongqiao. Inclui transferências e duração estimada. Não leia a localização do meu telefone."

Uma tarefa pode combinar arquivos, páginas da web, calendários e plug-ins, mas cada recurso deve estar disponível. A leitura de um documento não concede permissão para criar tarefas; obter sua localização não conecta um serviço de planejamento de rotas.

## Por que apenas algumas ações pedem aprovação?

| Ação | Com Pergunte quando necessário |
| --- | --- |
| Pesquisa integrada, leitura de arquivos e leitura de dados de dispositivos autorizados | Geralmente é executado diretamente |
| Criação e edição de arquivos de texto integradas | Executa diretamente; este modo não solicita todas as alterações de arquivo |
| Criar, atualizar ou excluir eventos e lembretes do sistema | Requer aprovação da ferramenta |
| Plug-ins e ferramentas personalizadas | Segue as regras da ferramenta e pode exigir aprovação |
| Geração de imagens através de um modelo de texto | Sempre requer aprovação, inclusive no modo Aprovar automaticamente |

**Aprovar automaticamente** aprova ações qualificadas, enquanto as permissões de conta e sistema ainda se aplicam. Atualmente, novos agentes adotam esse modo como padrão. Consulte [Agentes e Ferramentas](agents-and-tools.md).

## Como posso saber se a tarefa foi concluída?

As operações da ferramenta aparecem nos detalhes do processo da resposta. Preparar conteúdo, aguardar aprovação ou pedir para continuar em um aplicativo do sistema não significa que a ação foi concluída.

* **Leitura bem-sucedida:** verifique a origem e o intervalo da consulta antes de confiar no resumo. Um resultado vazio nem sempre significa que não existem registros.
* **Um arquivo foi criado:** abra seu cartão de arquivo ou encontre-o em Arquivos na barra lateral. Um bloco de código ou uma frase dizendo “criado” não estabelece que um arquivo foi salvo.
* **Uma alteração externa bem-sucedida:** verifique o resultado da ferramenta e, quando necessário, o calendário, documento ou tarefa de destino.
* **Apenas parte foi bem-sucedida:** identifique ações concluídas e conclua apenas o que resta.

## E se ele parar ou falhar?

| O que você vê | Próxima etapa |
| --- | --- |
| Uma resposta de texto sem chamada de ferramenta | Solicitar explicitamente a leitura ou salvamento; verifique o modelo, interruptores de capacidade e conexões |
| Aguardando aprovação | Revise a meta e a ação e, em seguida, permita ou rejeite; a permissão do sistema pode ser uma etapa separada |
| Permissão insuficiente | Resolva nas configurações do sistema ou do serviço; reformular a solicitação não pode conceder acesso |
| Falha na pesquisa ou leitura | Verifique o problema relatado de rede, link ou conta e tente um intervalo mais restrito |
| Uma gravação expirou com um resultado incerto | Verifique o serviço de destino antes de tentar novamente para evitar duplicatas |
| Android abriu o aplicativo de calendário | Revise e finalize a ação aí; abrir um formulário não confirma o salvamento |

Interromper uma resposta, excluir um bate-papo ou regenerar uma resposta não desfaz ações externas concluídas. O material recuperado também pode ser enviado para o modelo selecionado. Consulte [Dados, privacidade e permissões](data-privacy.md).
