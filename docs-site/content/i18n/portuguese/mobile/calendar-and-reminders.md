---
icon: calendar
---

# Calendário e lembretes

Os calendários adequam as atividades com horários de início e término. Os lembretes atendem às coisas que você precisa concluir. Peça ao seu agente para verificar primeiro os itens existentes e, em seguida, criar ou atualizar o correto.

As ferramentas de calendário integradas usam calendários acessíveis através do sistema do seu telefone em iOS e Android. Atualmente, os lembretes integrados suportam apenas iOS. Feishu, DingTalk e outros serviços usam seus próprios [plugins](plugins.md); conceder acesso ao calendário telefônico não conecta essas contas.

## Antes de começar

1. Selecione um modelo de texto que suporte chamadas de ferramenta.
2. Edite o agente atual e habilite **Calendário** ou **Lembretes** em sua seção **Sistema**.
3. Conceda permissão quando solicitado ou verifique o acesso em **Configurações → Permissões do sistema**.
4. Para revisar a criação, as alterações e a exclusão antes da execução, defina o modo de aprovação do agente como **Pergunte quando necessário**.

As permissões de leitura e gravação podem ser diferentes. Ser capaz de criar um evento não implica acesso para ler todos os eventos. Um calendário somente leitura não pode aceitar eventos novos ou atualizados.

## Confira a programação de amanhã

Identifique primeiro o calendário, especialmente com várias contas ou nomes duplicados:

> Liste os calendários disponíveis no meu telefone e diga quais são graváveis. Não faça alterações.

Em seguida, especifique um intervalo:

> Leia os eventos de amanhã em meu calendário de trabalho. Classifique por hora e liste o início, o fim, o título e o local.

Cada consulta abrange no máximo 90 dias e retorna no máximo 200 eventos ou lembretes. Para coleções maiores, consulte por semana ou mês. Uma lista retornada pode não conter todos os registros.

## Crie um evento

> Na minha agenda pessoal, crie “Organizar detalhes da viagem” amanhã, das 15h às 15h30, horário de Pequim. Defina o local como Casa e as notas como “Verificar passagens e acomodações”.

Especifique **data, fuso horário, horário de início e término e calendário**. Zonas explícitas, como horário de Pequim ou horário local de Tóquio, ajudam em viagens e reuniões remotas.

Após salvar, peça ao agente para ler novamente esse intervalo de tempo para confirmar a existência do evento. Se o resultado for incerto, verifique o calendário do sistema antes de tentar novamente.

### Pode convidar pessoas, repetir eventos ou definir alertas antecipados?

As ferramentas integradas atuais não expõem convites de participantes, regras de recorrência ou uma configuração separada de alerta antecipado. Um evento com título de reunião não envia convites automaticamente. Configure esses detalhes no calendário do sistema ou use um plugin de escritório com o recurso relevante.

## Atualizar ou excluir um evento existente

Encontre e identifique o evento antes de alterá-lo:

> Encontre o evento “Organizar detalhes da viagem” de amanhã, às 15h, em minha agenda pessoal. Diga-me primeiro a hora e a localização atuais.

Depois de verificar:

> Mova esse evento para 16h00–16h30. Mantenha a localização e as notas inalteradas.

Antes de excluir, verifique também o título, a data e o calendário. Excluir o bate-papo não restaura um evento excluído.

## Gerencie tarefas com lembretes no iOS

| Objetivo | Solicitação de exemplo |
| --- | --- |
| Escolha uma lista | “Liste minhas listas de lembretes e diga quais são graváveis.” |
| Adicionar um item | “Adicione ‘Enviar encomenda’ à lista Pessoal, com prazo amanhã às 9h, horário de Pequim, e a nota ‘Levar o comprovante de devolução’.” |
| Encontre itens inacabados | “Liste os lembretes incompletos desta semana no Pessoal, organizados por horário.” |
| Alterar a data | “Altere o prazo do item ‘Enviar encomenda’ que acabamos de verificar para amanhã às 14h. Mantenha todo o restante.” |
| Concluir um item | “Marque o lembrete ‘Enviar encomenda’ como concluído.” |
| Excluir um item | “Exclua apenas o item ‘Enviar encomenda’ que acabamos de confirmar, mantendo os outros itens com esse nome.” |

Concluir um item mantém seu status alterado; excluir o remove. As ferramentas podem definir datas de início, datas de vencimento e notas escritas. Se você precisar de uma notificação cronometrada, confirme as configurações de alerta e as permissões de notificação no aplicativo Lembretes do sistema.

**Uma localização escrita em um lembrete é uma nota, não um alerta acionado por chegada.** Defina repetições complexas ou acionadores de localização no aplicativo do sistema. Os resultados filtrados por data não são necessariamente a lista completa; verifique itens sem data lá também.

## Por que Android abre o calendário do sistema?

Quando alguns dispositivos Android não conseguem concluir uma operação diretamente, o aplicativo pode abrir uma página de calendário do sistema:

* **Formulário de criação:** verifique a data e o conteúdo, selecione o calendário pretendido e salve manualmente.
* **Página de evento existente:** inspecione os valores atuais e aplique quaisquer alterações restantes manualmente. As alterações solicitadas podem não ser preenchidas.

Abrir essa página não informa ao Cherry Studio se você a salvou. Se uma gravação expirar ou seu resultado for incerto, ela já poderá ter sido concluída. Verifique o calendário antes de criar outro evento.

## Um calendário ou item está faltando

Primeiro, confirme se a conta e o registro existem no calendário do sistema ou no aplicativo Lembretes. Em seguida, verifique as permissões Cherry Studio, o intervalo de datas e o calendário selecionado. Restrições empresariais, assinaturas somente leitura ou material não sincronizado com o telefone podem limitar o acesso.

Consulte [Permitir que a IA use ferramentas](using-tools.md) para comportamento de aprovação e [Dados, privacidade e permissões](data-privacy.md) para acesso ao sistema e uso de dados.
