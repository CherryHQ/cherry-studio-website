---
icon: settings
---

# Configurações, uso e respostas em segundo plano

Abra Configurações na barra lateral para alterar preferências de leitura, padrões e comportamento em segundo plano.

## Tema, idioma e tamanho do texto

Em **Configurações → Geral**:

* Escolha um tema claro, escuro ou de sistema.
* Escolha o idioma do aplicativo. Os idiomas do aplicativo e da documentação são selecionados separadamente.
* Abra o tamanho da fonte e use sua visualização para escolher um tamanho confortável.
* Habilite/desabilite a marca d'água de compartilhamento para exportações futuras.

As alterações são salvas diretamente. Tente novamente qualquer salvamento com falha antes de sair.

<div data-mobile-gallery="single">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/general-settings.webp"><img src="../../../assets/mobile/en/general-settings.webp" alt="Ajuste o tema, o idioma, o tamanho do texto e a marca d’água de compartilhamento"></a><figcaption><p><strong>iPhone · Interface em inglês</strong> · Ajuste o tema, o idioma, o tamanho do texto e a marca d'água de compartilhamento</p></figcaption></figure>
</div>

## Modelos padrão e de desenho

Em **Configurações → Modelo predefinido**:

* **Modelo predefinido** fornece a escolha inicial de modelo de texto para novos agentes.
* **Modelo de desenho** fornece desenho padrão e ferramenta de geração de imagem usada por agentes de texto.

Selecionar ou limpar salva imediatamente. Os agentes existentes mantêm os seus próprios modelos; altere-os em seu editor ou seletor de conversa.

Se a lista estiver vazia, adicione os modelos disponíveis e habilite primeiro o provedor. Consulte [gerenciamento de modelos](model-management.md) para recursos, limites e preços.

## Entenda o uso

Abra a página inicial na barra lateral e inspecione **uso de IA**. Sua visualização detalhada agrupa atividades registradas por data, modelo ou fornecedor.

Uma resposta também possui detalhes de uso para seu modelo, entrada/saída, tempo decorrido e custo. Um **token** é uma unidade de conteúdo de um modelo, não uma contagem de palavras. História, pensamento e chamadas repetidas de ferramentas também podem consumir tokens.

* Os valores cobrados informados pelo provedor e as estimativas calculadas com base nos preços configurados vêm de fontes diferentes; confira os rótulos.
* A falta de preços pode significar cobertura parcial de custos, e não uso gratuito.
* Responder novamente e trabalhar com ferramentas pode criar solicitações adicionais. Excluir o bate-papo não reembolsa créditos nem remove o uso registrado.
* Esses números descrevem o uso registrado por este aplicativo, não o saldo completo da conta do provedor ou a fatura oficial.

Verifique a conta do provedor para ver o faturamento real e os créditos restantes.

## Continuar depois de sair do aplicativo

Abra **Configurações → Notificações**.

| Opção | Objetivo |
| --- | --- |
| iPhone/iPad: atividade ao vivo | Mostra o status da tarefa nas telas de bloqueio suportadas ou na Ilha Dinâmica após sair do aplicativo |
| Android: Respostas em segundo plano | Tentativas de continuar a geração e mostrar o status nas notificações |
| Notificações de conclusão de resposta | Tenta notificar você quando uma resposta termina enquanto o aplicativo está em segundo plano |

A exibição do progresso e os alertas de conclusão são opções separadas. A permissão de notificação do sistema também é necessária; uma opção de aplicativo ativada não pode substituir a permissão negada. Toque em uma notificação de tarefa para retornar ao seu conteúdo.

A conclusão enquanto você já está visualizando a tarefa geralmente é silenciosa. As atividades ao vivo aparecem principalmente depois de sair do aplicativo, portanto, não ver nenhuma em primeiro plano não indica necessariamente um problema.

<div data-mobile-gallery="single">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/notifications.webp"><img src="../../../assets/mobile/en/notifications.webp" alt="Controle o progresso da tarefa e as notificações de conclusão separadamente"></a><figcaption><p><strong>iPhone · Interface em inglês</strong> · Controle o progresso da tarefa e as notificações de conclusão separadamente</p></figcaption></figure>
</div>

## Por que o bloqueio da tela interrompeu a geração?

O suporte em segundo plano não é uma garantia de execução contínua. Políticas de bateria, limites do sistema operacional, perda de rede ou encerramento de processos podem interromper o trabalho. Mantenha tarefas demoradas em primeiro plano sempre que possível.

As interrupções que o aplicativo pode tratar retêm respostas parciais e mostram o estado de interrupção sem reenviar automaticamente. Se o sistema operacional encerrar o processo à força, apenas o conteúdo salvo poderá ser confiável; a última parte não salva pode ser perdida. Abra o registro de conversa ou desenho, inspecione o resultado e decida se deseja tentar novamente.

Uma tarefa também pode ser pausada para aprovação da ferramenta; volte ao aplicativo e responda. O estado da tarefa permanece disponível no aplicativo mesmo que uma notificação não seja entregue.

## Privacidade e permissões

**Configurações → Privacidade** possui controles separados de uso anônimo e de relatório de erros. **Configurações → Permissões do sistema** gerencia acesso a câmeras, fotos, calendário e outros dispositivos. Um não substitui o outro.

Consulte [dados, privacidade e permissões](data-privacy.md).
