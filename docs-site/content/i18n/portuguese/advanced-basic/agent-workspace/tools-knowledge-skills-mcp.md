---
icon: puzzle-piece
---
# Ferramentas integradas, base de conhecimento, habilidades e MCP

Essas quatro categorias de recursos aprimoram o Agent, mas resolvem problemas diferentes: as ferramentas integradas cuidam de operações comuns, a base de conhecimento delimita os materiais pesquisáveis, as habilidades fornecem métodos de trabalho e o MCP conecta ferramentas e dados externos.

### Diferenças e combinações

<figure><img src="../../../../assets/6be829efa6152cf0a3576cba.webp" alt="Ferramentas integradas, base de conhecimento, habilidades e MCP — Imagem ilustrativa"><figcaption></figcaption></figure>

| Recurso | Problema resolvido | Exemplos |
| ---- | ----------------------------- | ------------------------- |
| Ferramentas integradas | O que o Agent pode fazer diretamente dentro do Cherry Studio | Ler e escrever arquivos, busca na web, geração de imagens, memória, notificações, tarefas agendadas |
| Base de conhecimento | Quais materiais privados o Agent pode pesquisar | Especificações de produto, modelos de contrato, manuais da equipe |
| Habilidades | Por quais processos e padrões o Agent deve trabalhar | Formato de relatório semanal, checklist de revisão de código, normas de escrita |
| MCP | Quais ferramentas e recursos externos o Agent pode conectar | Bancos de dados, navegadores, sistemas de negócios de terceiros |

Caminho de configuração: navegação à esquerda 【Trabalho】→ abrir o menu Agent → 【Editar】→ 【Ferramentas integradas】.

### Ferramentas integradas

As ferramentas integradas são agrupadas por contexto, arquivos, multimídia, orquestração, busca e terminal. Os recursos comuns incluem:

* 【Gerar imagem】: usa o modelo de desenho configurado;
* 【Pesquisa na base de conhecimento】 e 【Gerenciar base de conhecimento】: aparecem apenas após vincular uma base de conhecimento;
* 【Busca na web】 e 【Captura de página web】: usam a capacidade de conexão à internet configurada no Cherry Studio;
* 【Memória】: salva e recupera informações estáveis entre tarefas;
* 【Tarefas agendadas】 e 【Notificações】: permitem que o Agent gerencie planos e envie resultados para canais;
* 【Task】 e 【Fluxo de trabalho】: usa subagentes ou orquestração para processar tarefas complexas;
* 【Converter arquivo para Markdown】: lê PDF, Word, PowerPoint, Excel, OpenDocument, RTF, EPUB e CSV do diretório de trabalho ou dos anexos da sessão atual e entrega o conteúdo estruturado ao Agent para processamento em segmentos;
* Ferramentas de coordenação de sessão: localiza sessões existentes do Agent, cria sessões independentes, envia tarefas e recebe resultados de conclusão rastreáveis;
* Ferramentas de arquivos e Bash: lê, cria, modifica arquivos e executa comandos.

{% hint style="info" %}
【Converter arquivo para Markdown】 não reescreve o arquivo original e não fornece OCR para PDFs digitalizados. Para digitalizações, use primeiro 【OCR】 ou recursos de processamento de documentos, antes de entregar ao Agent.
{% endhint %}

### Escopo da base de conhecimento

As bases de conhecimento selecionadas em 【Base de conhecimento】 definem o limite de pesquisa desse Agent. Se nenhuma for selecionada, as ferramentas de base de conhecimento não serão carregadas; ao selecionar várias, o Agent trabalhará apenas dentro dessas bases de conhecimento, sem ler automaticamente outros repositórios.

### Habilidades

Ative as habilidades já instaladas em 【Habilidades】. O conteúdo das habilidades entra no ambiente de trabalho do Agent, usado para restringir processos e saídas. Quando precisar de uma nova habilidade, você pode pedir diretamente ao Agent em 【Trabalho】 para localizar e instalar; o caminho para gerenciamento manual é 【Configurações】→【Habilidades】.

### MCP

Primeiro, conecte e inicie o servidor em 【Configurações】→【MCP】, depois volte à janela de edição do Agent e vincule em 【MCP】. Servidores não em execução não podem ser ativados; após a conexão, as ferramentas fornecidas por ele entram no diretório de ferramentas do Agent e continuam sujeitas ao controle do modo de permissão. Se o servidor também fornecer recursos ou prompts, eles podem ser selecionados diretamente no painel 【+】 da área de entrada.

{% hint style="danger" %}
Abrir uma ferramenta não significa que a aprovação deve ser ignorada. Para escrita em arquivos, terminal, modificação de dados externos e geração de imagens que possam gerar cobrança, mantenha preferencialmente 【Confirmação individual】; use permissões mais amplas apenas para ferramentas de origem confiável e risco claro.
{% endhint %}

### Combinações recomendadas

| Necessidade da tarefa | Combinação sugerida | Quando adicionar mais | Observações |
| -------- | ------------- | ------------- | ------------- |
| Processar arquivos locais | Ferramentas de arquivos + diretório de trabalho dedicado | Adicionar habilidade quando precisar de formato fixo | Manter primeiro 【Confirmação individual】 |
| Responder com base em materiais internos | Base de conhecimento + Pesquisa na base de conhecimento | Entregar ao canal após a recuperação ser estável | Fazer primeiro testes com perguntas sem resposta |
| Executar processos fixos repetidamente | Habilidade + ferramentas integradas necessárias | Adicionar MCP quando precisar de dados externos | Não armazenar credenciais de conta na habilidade |
| Chamar sistemas externos | MCP + credenciais com permissões mínimas | Relaxar a aprovação após a tarefa se estabilizar | Operações de escrita, exclusão e cobrança devem ser confirmadas |

### Caso de usuário: Agent de pesquisa de mercado

Vincule uma base de conhecimento de materiais de produto ao Agent, ative a habilidade “Relatório de pesquisa”, conecte um MCP de busca na web confiável e mantenha as ferramentas integradas de captura de página web e escrita em arquivos. O Agent primeiro define o escopo do produto com base nos materiais internos, depois busca informações externas e, por fim, escreve no diretório de trabalho seguindo a estrutura definida pela habilidade. Materiais internos, fontes externas e formato de saída têm atribuições claras, facilitando a manutenção futura.

<details>

<summary>Por que não há resultados de pesquisa mesmo após vincular a base de conhecimento?</summary>

Confirme que a base de conhecimento foi processada e contém conteúdo pesquisável, depois verifique se o vínculo ainda existe na janela de edição do Agent. Após a exclusão da base de conhecimento, os vínculos relacionados são removidos automaticamente.

</details>

<details>

<summary>É necessário reiniciar a tarefa após ativar uma habilidade?</summary>

Não é necessário fechar a tarefa. Após editar o Agent, a nova configuração de habilidade será carregada a partir da próxima mensagem; a resposta em geração não será interrompida.

</details>

<details>

<summary>É necessário reiniciar a tarefa após ativar uma habilidade?</summary>

Não é necessário fechar a tarefa. Após editar o Agent, a nova configuração de habilidade será carregada a partir da próxima mensagem; a resposta em geração não será interrompida.

</details>
