---
icon: lightbulb
---
# Casos de uso

Estes casos demonstram como combinar conversas, Agent, base de conhecimento, notas, desenho, tradução, canais, tarefas agendadas e múltiplas janelas para criar fluxos realmente entregáveis. As configurações nos casos são um ponto de partida; na prática, ainda é necessário ajustá-las de acordo com a sensibilidade dos dados, o volume de uso e as regras da equipe.

<figure><img src="../../../../assets/fcd8d884c9294cbc845fdf9c.webp" alt="Primeiro, execute o fluxo manualmente com materiais reais, depois adicione gradualmente base de conhecimento, habilidades, MCP, canais e tarefas agendadas."><figcaption><p>Primeiro, execute o fluxo manualmente com materiais reais, depois adicione gradualmente base de conhecimento, habilidades, MCP, canais e tarefas agendadas. </p></figcaption></figure>

## Escolha um caso

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Revisão de pesquisa com múltiplos modelos</strong></td><td>Materiais internos, fontes externas e verificação de conflitos</td><td><a href="research-review.md">research-review.md</a></td></tr><tr><td><strong>Revisão de documentos longos</strong></td><td>Verificação por capítulo e geração de rascunho revisado</td><td><a href="long-document-review.md">long-document-review.md</a></td></tr><tr><td><strong>Entrega de arquivos de projeto via Agent</strong></td><td>Controle de diretórios, permissões e escopo dos artefatos</td><td><a href="project-delivery.md">project-delivery.md</a></td></tr><tr><td><strong>Kit de imagens de marca</strong></td><td>Da direção visual às imagens em múltiplos tamanhos</td><td><a href="brand-image-kit.md">brand-image-kit.md</a></td></tr><tr><td><strong>Perguntas e respostas com base de conhecimento privada</strong></td><td>Limitar o escopo dos materiais e recusar suposições</td><td><a href="private-knowledge-qa.md">private-knowledge-qa.md</a></td></tr><tr><td><strong>Geração de relatório semanal a partir de notas</strong></td><td>De registros diários a um relatório semanal verificável</td><td><a href="notes-weekly-report.md">notes-weekly-report.md</a></td></tr><tr><td><strong>Organização de materiais multilíngues</strong></td><td>Termos, OCR, documentos e verificação de consistência</td><td><a href="multilingual-materials.md">multilingual-materials.md</a></td></tr><tr><td><strong>Canais e relatório diário agendado</strong></td><td>Agent, canais, planejamento e registros de execução</td><td><a href="automated-daily-report.md">automated-daily-report.md</a></td></tr><tr><td><strong>Estação de trabalho de pesquisa com múltiplas janelas</strong></td><td>Manter materiais, comparações e tarefas em execução simultaneamente</td><td><a href="multi-window-research.md">multi-window-research.md</a></td></tr></tbody></table>

## Ordem de configuração geral

<figure><img src="../../../../assets/2573aee0510e0d6abdabab7f.webp" alt="Os casos não são um conjunto de configurações isoladas, mas sim um fluxo de trabalho completo, desde a entrada, execução, revisão até a entrega."><figcaption><p>Os casos não são um conjunto de configurações isoladas, mas sim um fluxo de trabalho completo, desde a entrada, execução, revisão até a entrega. </p></figcaption></figure>

## Escolha um caso conforme a tarefa

| Sua tarefa | Recomendação inicial | Principais capacidades |
| ----------- | -------------- | -------------- |
| Comparar pontos de vista e preservar o processo de pesquisa | 【Revisão de pesquisa com múltiplos modelos】 | Conversa, ramificações, notas |
| Revisar grandes volumes de material e emitir opiniões | 【Revisão de documentos longos】 | Agent, diretório de trabalho, arquivos |
| Entregar documentos e artefatos de projeto | 【Entrega de arquivos de projeto via Agent】 | Agent, estado, arquivos |
| Gerar um conjunto de imagens com estilo consistente | 【Kit de imagens de marca】 | Desenho via Agent, modelos de desenho |
| Responder apenas com base em materiais internos | 【Perguntas e respostas com base de conhecimento privada】 | Base de conhecimento, testes de recuperação, Agent |
| Organizar relatório semanal a partir de registros dispersos | 【Geração de relatório semanal a partir de notas】 | Notas, Agent, arquivos |
| Organizar arquivos multilíngues | 【Organização de materiais multilíngues】 | Tradução, Agent, diretório de trabalho |
| Enviar relatórios fixos em horários agendados | 【Canais e relatório diário agendado】 | Agent, canais, tarefas agendadas |
| Observar materiais e tarefas longas simultaneamente | 【Estação de trabalho de pesquisa com múltiplas janelas】 | Abas, múltiplas janelas, busca global |

{% stepper %}
{% step %}
### 1. Defina primeiro o entregável

Especifique qual arquivo, tabela, imagem ou mensagem deve ser obtido no final, e o que constitui a conclusão.
{% endstep %}

{% step %}
### 2. Execute manualmente em 【Trabalho】

Verifique se o modelo, o prompt, o diretório de trabalho e os materiais são suficientes. Revise item por item as operações que exigem aprovação.
{% endstep %}

{% step %}
### 3. Consolide apenas as partes estáveis

Transforme etapas repetitivas em habilidades, armazene materiais de longo prazo na base de conhecimento e mantenha requisitos temporários no prompt da tarefa.
{% endstep %}

{% step %}
### 4. Adicione conexões externas e automação por último

Após uma aceitação manual bem-sucedida, conecte MCP, canais ou tarefas agendadas, mantendo uma entrada para tratamento manual em caso de falha.
{% endstep %}
{% endstepper %}
