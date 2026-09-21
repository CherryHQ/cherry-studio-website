---
icon: graduation-cap
---
# Habilidades e Biblioteca de Capacidades

Habilidades são um conjunto de instruções de trabalho reutilizáveis e recursos de apoio. Elas não são responsáveis por conectar sistemas externos, mas sim por informar ao Agent qual fluxo, padrão e formato devem ser seguidos para concluir as tarefas.

{% hint style="success" %}
Quando precisar de um método de trabalho específico, primeiro informe ao Agent seus objetivos em [Trabalho] e peça que ele procure ou instale a habilidade adequada. Abra [Configurações] → [Habilidades] apenas quando precisar verificar a origem, gerenciar em lote ou importar de um arquivo local.
{% endhint %}

<figure><img src="../../../../assets/cc38d8a6378ca8270ceda746.webp" alt="Métodos usados repetidamente são adequados para serem consolidados como habilidades; materiais, operações internas e sistemas externos devem usar as entradas correspondentes."><figcaption><p>Métodos usados repetidamente são adequados para serem consolidados como habilidades; materiais, operações internas e sistemas externos devem usar as entradas correspondentes. </p></figcaption></figure>

### Instalar habilidades

Caminho manual: [Configurações] → [Habilidades].

A página suporta quatro origens:

* Busca online no registro de habilidades;
* Selecione [GitHub] na busca online e cole o link do arquivo `SKILL.md` de uma habilidade;
* Instale a partir de um arquivo ZIP local;
* Instale a partir de uma pasta que contenha `SKILL.md`.

<figure><img src="../../../../assets/f0dcb151fa939ce15cda1e00.webp" alt="① Após selecionar [GitHub], cole o link do arquivo SKILL.md da habilidade desejada; a página primeiro analisará a habilidade específica e, em seguida, oferecerá a instalação."><figcaption><p>① Após selecionar [GitHub], cole o link do arquivo `SKILL.md` da habilidade desejada; a página primeiro analisará a habilidade específica e, em seguida, oferecerá a instalação. </p></figcaption></figure>

{% stepper %}
{% step %}
#### 1. Confirme primeiro o uso

Descreva em uma frase o problema que você espera que a habilidade resolva, por exemplo, "organizar registros de reunião em decisões, responsáveis e prazos". Nomes semelhantes não significam fluxos idênticos; leia a descrição antes de instalar.
{% endstep %}

{% step %}
#### 2. Verifique a origem e o conteúdo

Abra os detalhes da habilidade para confirmar o que ela pedirá ao Agent, se contém scripts e se requer ferramentas adicionais ou contas externas. Não use diretamente habilidades de origem desconhecida em diretórios sensíveis.
{% endstep %}

{% step %}
#### 3. Vincule ao Agent

Primeiro, confirme em [Configurações] → [Habilidades] que o interruptor global da habilidade está ativado. Em seguida, abra [Trabalho] → Menu do Agent → [Editar] → [Habilidades] e ative-a para este Agent. A alternância de habilidades é salva automaticamente com a configuração do Agent e passa a valer a partir da próxima mensagem.
{% endstep %}

{% step %}
#### 4. Valide com uma tarefa real

Forneça ao Agent uma pequena amostra, verifique se os passos, o formato de saída e os limites atendem às expectativas, antes de usá-la em tarefas em lote ou agendadas.
{% endstep %}
{% endstepper %}

### Ativação global e ativação por Agent

<figure><img src="../../../../assets/a05d3125f16b5cb41dd2e05b.webp" alt="① O interruptor à direita do cartão controla se a habilidade está disponível para todos os Agents; ao desativá-lo, a janela de edição do Agent não exibirá mais essa habilidade."><figcaption><p>① O interruptor à direita do cartão controla se a habilidade está disponível para todos os Agents; ao desativá-lo, a janela de edição do Agent não exibirá mais essa habilidade. </p></figcaption></figure>

| Estado | Função | Quando usar |
| -------- | ------------------------ | ------------------------- |
| Ativação global | Faz a habilidade aparecer no diretório de habilidades disponíveis do Agent | A origem da habilidade é confiável e ela ainda pode ser usada por um ou mais Agents |
| Desativação global | Pausa o uso da habilidade por todos os Agents, mas preserva o conteúdo instalado | Desativação temporária, solução de problemas ou aguardando verificação de segurança |
| Ativação por Agent | Permite que apenas o Agent atual carregue a habilidade | O fluxo corresponde às responsabilidades de longo prazo do Agent atual |

<figure><img src="../../../../assets/f0dcb151fa939ce15cda1e00.webp" alt="Habilidades e Biblioteca de Capacidades — Imagem ilustrativa"><figcaption></figcaption></figure>

Desativar o interruptor global não desinstala a habilidade; ao reativá-lo, ainda é necessário verificar o estado de ativação de cada Agent. A desinstalação remove o conteúdo da habilidade e limpa as associações.

### Como escolher entre habilidades, prompts e MCP

| Necessidade | O que escolher | Motivo |
| -------------- | ----------- | ------------- |
| Requisição temporária | Prompt da tarefa atual | Não é necessário adicionar configuração de longo prazo |
| Reutilizar o mesmo fluxo várias vezes | Habilidade | Permite salvar instruções, modelos e recursos simultaneamente |
| Definir o papel de longo prazo do Agent | Prompt de sistema do Agent | Deve ser seguido em cada tarefa |
| Acessar banco de dados ou serviços externos | MCP | A habilidade em si não fornece capacidade de conexão |

### Caso de usuário: Habilidade de relatório semanal da equipe

A equipe escreveu uma habilidade contendo as seções do relatório semanal, o tom, a verificação de dados e as expressões proibidas, vinculando-a ao Agent "Organização de Relatório Semanal". A cada semana, basta fornecer os materiais da semana, e o Agent gera a estrutura fixa conforme a habilidade; quando os dados vêm de sistemas externos, combine com MCP, em vez de inserir detalhes de contas e interfaces no corpo da habilidade.

{% hint style="danger" %}
Desinstalar uma habilidade remove-a da biblioteca global de capacidades e limpa as associações no espaço de trabalho do Agent. Antes de executar, confirme que não há tarefas em andamento usando essa habilidade; habilidades personalizadas pela equipe devem manter arquivos de origem recuperáveis.
{% endhint %}

<details>

<summary>Por que o Agent não usou a habilidade após a instalação? </summary>

Primeiro, confirme que a habilidade não está desativada globalmente. Em seguida, ative-a em [Habilidades] na janela de edição do Agent ou peça ao Agent que complete a vinculação. Depois, envie uma nova mensagem para testar.

</details>

<details>

<summary>Uma habilidade pode conter programas? </summary>

O pacote de habilidades pode conter instruções, recursos e scripts. Se os scripts podem ser executados depende das ferramentas do Agent, do diretório de trabalho, das dependências do ambiente e do modo de permissão.

</details>

<details>

<summary>Uma habilidade pode conter programas? </summary>

O pacote de habilidades pode conter instruções, recursos e scripts. Se os scripts podem ser executados depende das ferramentas do Agent, do diretório de trabalho, das dependências do ambiente e do modo de permissão.

</details>
