---
icon: map-pin
---

# Localização e registros de saúde

A ferramenta de localização lê a posição atual do seu telefone. As ferramentas de saúde resumem os registros existentes no app Saúde do iOS. Cada recurso precisa estar ativado no agente e ter permissão do sistema; Aprovar automaticamente não concede esse acesso.

## Gerenciar permissões

Habilite **Localização** ou **Saúde** na seção **Sistema** do agente atual e autorize o acesso quando solicitado. Você também pode verificar as permissões suportadas e seu status em **Configurações → Permissões do sistema**.

<div data-mobile-gallery="single">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/system-permissions.webp"><img src="../../../assets/mobile/en/system-permissions.webp" alt="As permissões do sistema listam localização, saúde, calendário e outros acessos separadamente"></a><figcaption><p><strong>iPhone · Interface em inglês</strong> · As permissões do sistema são separadas das opções de capacidade do agente</p></figcaption></figure>
</div>

Para impedir que um agente use um recurso, desative a opção correspondente. Para revogar o acesso do aplicativo ao sistema, siga as instruções da página de permissão para as configurações relevantes do sistema.

## Obtenha sua localização e pesquise nas proximidades

Comece com:

> Obtenha minha localização atual. Diga-me aproximadamente em que área estou e quando essa posição foi obtida.

Para locais ou rotas próximas, combine-o com um plugin Amap conectado:

> Obtenha minha localização atual e use Amap para encontrar estações de metrô próximas. Liste seus nomes e endereços.

Essas etapas têm requisitos separados: a localização do telefone precisa de permissão do sistema, enquanto as consultas de mapas precisam da conexão Amap. Conectar o Amap sozinho não lê a localização do seu telefone.

### Posso planejar uma rota sem conceder acesso à localização?

Sim. Forneça você mesmo o ponto de partida e o destino:

> Use Amap para encontrar rotas de transporte público de Praça do Povo em Xangai para Estação Ferroviária de Hongqiao. Compare as transferências e a duração estimada sem ler a localização do meu telefone.

A ferramenta de localização integrada obtém uma posição atual em primeiro plano. Ele não fornece rastreamento contínuo, localização em segundo plano ou navegação passo a passo. As descrições das rotas vêm do serviço de mapas; uma leitura de localização não é navegação ao vivo.

### A localização falha ou as coordenadas não têm endereço

* Verifique se os serviços de localização do sistema e a permissão do Cherry Studio estão ativados e mantenha o aplicativo em primeiro plano.
* A recepção interna, o dispositivo e a precisão do sistema afetam os resultados. Um tempo limite não significa necessariamente que a permissão foi negada.
* A conversão de coordenadas em um endereço escrito pode falhar separadamente. Coordenadas sem endereço não significam que toda a solicitação de localização falhou.
* Resolva a causa relatada antes de tentar novamente explicitamente ou forneça uma cidade, ponto de referência ou endereço inicial.

## Resuma os registros de saúde em iOS

As ferramentas atuais podem ler estes tipos de dados registrados:

| Categoria | Informação disponível |
| --- | --- |
| Atividade diária | Passos, energia ativa, distância de caminhada e corrida |
| Medições cardíacas | Frequência cardíaca, frequência cardíaca em repouso, variabilidade da frequência cardíaca |
| Dormir | Duração do sono registrada |
| Exercícios | Treinos gravados dentro de um intervalo de datas |

Autorize apenas os tipos que você precisa. Um resumo de passos não requer o compartilhamento de dados cardíacos ou de sono. As ferramentas atuais leem registros; eles não podem gravar ou excluir registros de saúde. Android atualmente não oferece essas ferramentas de saúde.

Solicitações de exemplo:

> Leia os últimos sete dias de passos registrados e distância de caminhada/corrida, agrupados por dia. Rotule os dias faltantes como “Nenhum registro disponível”; não os preencha com zero.

> Resuma a duração do sono registrada da semana passada e identifique as datas com registros ausentes.

> Liste os treinos registrados deste mês, indique quantos foram devolvidos e explique se a lista pode estar incompleta.

Uma consulta pode abranger um período de no máximo 90 dias. Sem datas específicas, as ferramentas consultam os últimos sete dias. A lista de treinos retorna 20 registros por padrão e no máximo 50 por chamada. Consulte períodos menores quando houver mais registros.

## Por que os resultados estão vazios ou parciais?

O sistema pode não ter registros correspondentes, o tipo de dados pode não ter autorização, os registros históricos podem estar indisponíveis ou uma métrica pode falhar ao carregar. **Um resultado vazio não significa zero passos ou ausência de exercícios.** iOS não divulga totalmente as negações de leitura, portanto, o aplicativo não consegue distinguir esses casos apenas de um resultado vazio.

Verifique as datas e os registros no aplicativo Health do sistema e revise o acesso para o tipo específico. Experimente um intervalo mais curto e uma métrica de cada vez. Peça ao agente para declarar os dados faltantes em vez de tratar um resultado incompleto como uma tendência completa.

Os resultados de localização e saúde podem ser enviados ao serviço modelo selecionado como parte da conversa. Consulte [Dados, privacidade e permissões](data-privacy.md).
