---
icon: code-branch
---
# Comparação de múltiplos modelos e ramificações de mensagens

A comparação de múltiplos modelos é adequada para questões que não possuem uma única resposta, como revisões de propostas, direcionamento de textos e verificação cruzada de materiais. As ramificações de mensagens permitem tentar um novo caminho a partir de um determinado ponto, sem a necessidade de copiar toda a conversa.

## Comparar vários modelos simultaneamente

{% stepper %}
{% step %}
### 1. Abra o [Chat] e clique no nome do modelo

No seletor de modelos, marque os modelos que deseja comparar. Antes do primeiro uso, confirme se os serviços a que esses modelos pertencem estão conectados corretamente.
{% endstep %}

{% step %}
### 2. Envie a mesma pergunta

Inclua os critérios de avaliação na pergunta, por exemplo: "Compare sob três aspectos: viabilidade, riscos e custos". Não pergunte apenas "qual é o melhor".
{% endstep %}

{% step %}
### 3. Compare as diferenças, em vez de escolher apenas a resposta mais longa

Foque em verificar se os fatos são consistentes, se as premissas estão claras, o que foi omitido e qual opção melhor atende às suas restrições. Fatos importantes ainda devem ser verificados nas fontes originais.
{% endstep %}
{% endstepper %}

<figure><img src="../../../../assets/290e0288048d57cd868cb443.webp" alt="Selecione vários modelos no seletor de modelos e compare as diferenças usando a mesma pergunta."><figcaption><p>Selecione vários modelos no seletor de modelos e compare as diferenças usando a mesma pergunta.</p></figcaption></figure>

{% hint style="warning" %}
Selecionar vários modelos de uma vez envia solicitações separadas para cada um. Quando houver custos, velocidade ou dados sensíveis envolvidos, use perguntas curtas primeiro para confirmar a conexão e o desempenho antes de processar materiais longos.
{% endhint %}

## Criar ramificações a partir de mensagens

Encontre a mensagem que deseja explorar novamente, abra o menu da mensagem e selecione a ação de ramificação. A nova ramificação manterá o contexto anterior, e as mensagens subsequentes serão registradas separadamente da rota original. Use o Gerenciador de Ramificações para alternar, comparar e retornar entre diferentes rotas.

Você também pode criar uma ramificação vazia no canvas de ramificações. Após a criação, a ramificação vazia é salva imediatamente, permanece após a reinicialização do aplicativo e continua no canvas de ramificações; na próxima vez que você enviar conteúdo na caixa de entrada, essa ramificação será preenchida. Ramificações vazias que não são necessárias no momento podem ser excluídas pelo menu de contexto (botão direito) do nó.

<figure><img src="../../../../assets/0bc4cb0c28265626960cd849.webp" alt="O Gerenciador de Ramificações mantém simultaneamente as rotas &quot;Checklist de pré-lançamento&quot; e &quot;Piloto rápido&quot;."><figcaption><p>O Gerenciador de Ramificações mantém simultaneamente as rotas "Checklist de pré-lançamento" e "Piloto rápido".</p></figcaption></figure>

Na imagem: ① Nó de ramificação e caminho atual; ② Legenda para usuário, assistente, caminho atual e caminho desativado. O exemplo mantém as duas rotas "Checklist de pré-lançamento" e "Piloto rápido", totalizando 2 ramificações e 6 nós de mensagem.

### Caso de uso: Revisar duas propostas de lançamento

Primeiro, peça ao modelo para identificar riscos e lacunas nas propostas. Em seguida, a partir da mesma resposta, faça perguntas adicionais separadamente: "Adicione um checklist de pré-lançamento" e "Avalie sob a perspectiva de um piloto rápido". Ao abrir o Gerenciador de Ramificações, as duas rotas serão mantidas lado a lado, permitindo continuar fazendo perguntas em cada uma ou retornar a qualquer momento à outra rota para verificar as conclusões.

<details>

<summary>Quando não é adequado usar vários modelos?</summary>

Quando se trata apenas de verificar um fato específico, organizar textos curtos ou quando os materiais contêm conteúdo que não deve ser enviado a vários provedores, é mais adequado usar um único modelo.

</details>

<details>

<summary>As ramificações modificam a mensagem original?</summary>

Não. A ramificação continua a partir do nó selecionado, a rota original permanece intacta e você pode retornar a ela a qualquer momento.

</details>
