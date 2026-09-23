---
icon: robot
---
# Área de Trabalho do Agent

O Agent é adequado para tarefas com objetivos claros, que exigem o uso de ferramentas ou arquivos e que podem envolver múltiplas etapas. A entrada é a navegação lateral [Trabalho], não a aba superior presente em tutoriais antigos.

{% hint style="success" %}
A forma mais prática de configuração é primeiro informar ao Agent o que você deseja concluir e, em seguida, permitir que ele verifique modelos, ferramentas, bases de conhecimento ou canais ausentes. Quando for necessário controle preciso, abra a janela de edição do Agent ou [Configurações] para ajustes manuais.
{% endhint %}

<figure><img src="../../../../assets/2573aee0510e0d6abdabab7f.webp" alt="Área de Trabalho do Agent — Imagem ilustrativa"><figcaption></figcaption></figure>

<figure><img src="../../../../assets/e7c3b90701b9b2b38da25043.webp" alt="Área de Trabalho do Agent — Imagem ilustrativa"><figcaption></figcaption></figure>

### O que compõe a área de trabalho

| Parte | Função | Quando prestar atenção |
| ----- | ----------------- | ----------------- |
| Agent | Salva papel, modelo, prompt e capacidades | Quando o mesmo tipo de trabalho for repetido |
| Tarefa | Registro de um trabalho contínuo | Abra uma tarefa para cada objetivo, facilitando a preservação do contexto |
| Diretório de trabalho | Escopo de arquivos que o Agent pode processar diretamente | Tarefas de arquivos, como código, organização de materiais, geração de documentos |
| Área de entrada | Envia objetivos, anexos e invoca ferramentas | Para iniciar tarefas ou adicionar requisitos |
| Painel direito | Exibe status, arquivos, subtarefas e fluxo de mensagens | Para acompanhar tarefas longas, verificar produtos ou depurar |

### Iniciar uma tarefa

{% stepper %}
{% step %}
#### 1. Abra [Trabalho] e selecione o Agent

Se já houver um Agent adequado, selecione-o diretamente; caso contrário, clique em [Adicionar Agente], selecione primeiro o modo de execução em [Informações Básicas] e, em seguida, complete as quatro etapas de criação: prompt do sistema, habilidades e base de conhecimento. O modo de execução não pode ser alterado após a criação.
{% endstep %}

{% step %}
#### 2. Selecione o diretório de trabalho

Se for necessário processar arquivos locais, selecione o diretório da tarefa atual; se não envolver arquivos, pode usar a área de trabalho padrão criada pelo aplicativo. Uma tarefa corresponde a uma área de trabalho, evitando que o Agent procure entre diretórios não relacionados.
{% endstep %}

{% step %}
#### 3. Descreva a tarefa pelo resultado

Informe ao Agent o que deve ser entregue, quais materiais podem ser usados, quais são as restrições e o que considera concluído. Por exemplo:

```
Leia as atas de reunião no diretório atual, organize as decisões, os responsáveis e os prazos e gere action-items.md. Não altere os arquivos originais.
```
{% endstep %}

{% step %}
#### 4. Verifique o processo e os produtos no painel direito

[Status] exibe tarefas ativas, subagentes, fluxos de trabalho e comandos em segundo plano; [Arquivos] permite visualizar e editar produtos de texto; com o modo desenvolvedor ativado, também é possível ver [Cadeia de Chamadas].
{% endstep %}
{% endstepper %}

### Aviso sobre o Gateway de API

A execução do Agent depende do Gateway de API do Cherry Studio. Se o gateway não estiver ativado, o aplicativo exibirá a mensagem [Ativar e Iniciar]; você também pode verificar a porta, o status de execução e o bloqueio por software de segurança local em [Configurações] → [Gateway de API].

{% hint style="warning" %}
O Gateway de API é uma dependência de execução do Agent, mas não significa que a interface deva ser exposta à rede. Mantenha o uso local padrão; apenas se for necessário que outros programas façam chamadas, copie a URL e a chave de API.
{% endhint %}

### Um Agent ou vários Agents

* Mesmo papel, mesmo conjunto de capacidades, mas tarefas diferentes: reutilize um Agent e crie várias tarefas.
* Papel, escopo de materiais ou permissões diferentes: divida em vários Agents.
* Um objetivo que requer pesquisa paralela ou colaboração em múltiplas etapas: primeiro, permita que um Agent use subagentes ou fluxos de trabalho, sem necessidade de criar manualmente muitos Agents imediatamente.

### Caso de usuário: organização de materiais de projeto

O gerente de produto coloca especificações de requisitos, registros de entrevistas e materiais de concorrentes no mesmo diretório, cria um Agent "Organização de Requisitos", vincula a base de conhecimento de produtos e usa a permissão [Confirmação por Etapa]. O Agent primeiro lê os materiais e, em seguida, escreve a lista de requisitos e as questões pendentes em um novo arquivo. O gerente de produto revisa o texto diretamente em [Arquivos] no painel direito, mantendo os materiais originais inalterados.

<details>

<summary>Por que o Agent não vê as capacidades recém-vinculadas?</summary>

O conteúdo editado no Agent é salvo automaticamente. A resposta em geração não será interrompida; mudanças em modelos, habilidades, MCP e bases de conhecimento entrarão em vigor a partir da próxima mensagem. Se ainda não aparecer, confirme primeiro que a capacidade está ativada e, em seguida, envie uma nova mensagem.

</details>

<details>

<summary>Excluir o diretório de trabalho também exclui os arquivos no disco?</summary>

Ao excluir o diretório de trabalho na lista de tarefas, apenas o registro do diretório no Cherry Studio e os registros de tarefas sob esse diretório serão removidos; o diretório real no disco não será excluído. As operações de arquivo realizadas pelo Agent durante a execução da tarefa ainda estão sujeitas ao modo de permissão selecionado.

</details>

<details>

<summary>Excluir o diretório de trabalho também exclui os arquivos no disco?</summary>

Ao excluir o diretório de trabalho na lista de tarefas, apenas o registro do diretório no Cherry Studio e os registros de tarefas sob esse diretório serão removidos; o diretório real no disco não será excluído. As operações de arquivo realizadas pelo Agent durante a execução da tarefa ainda estão sujeitas ao modo de permissão selecionado.

</details>
