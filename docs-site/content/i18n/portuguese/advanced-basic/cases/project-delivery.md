---
icon: folder
---
# Entrega de arquivos de projeto do Agent

Colegas de operações precisam organizar um conjunto de materiais dispersos em um índice, resumos e arquivos de entrega. Para evitar alterações acidentais nos originais, é necessário definir previamente o diretório de trabalho do Agent, o escopo de modificação permitida e o método de aceitação.

## Tarefas adequadas

* Organizar materiais dispersos em um sumário e índice;
* Gerar múltiplos documentos com base em um modelo;
* Modificar código e deixar um registro das alterações;
* Renomear, converter ou verificar arquivos em lote.

<figure><img src="../../../../assets/2573aee0510e0d6abdabab7f.webp" alt="O espaço de trabalho do Agent reúne a tarefa, o modelo, o diretório de trabalho e os arquivos de entrega na mesma página."><figcaption><p> O espaço de trabalho do Agent reúne a tarefa, o modelo, o diretório de trabalho e os arquivos de entrega na mesma página. </p></figcaption></figure>

<figure><img src="../../../../assets/401d6b23759ab97ded47c2b5.webp" alt="Para tarefas longas, verifique primeiro no painel [Status] se a execução está em andamento, aguardando aprovação ou já concluída."><figcaption><p> Para tarefas longas, verifique primeiro no painel [Status] se a execução está em andamento, aguardando aprovação ou já concluída. </p></figcaption></figure>

<figure><img src="../../../../assets/4e1d6cc47405edfe8d6fe315.webp" alt="Após a geração dos entregáveis, abra-os para inspeção real. A pré-visualização da página web na imagem já exibe o título, os itens de verificação e as sugestões, não é um espaço reservado em branco."><figcaption><p> Após a geração dos entregáveis, abra-os para inspeção real. A pré-visualização da página web na imagem já exibe o título, os itens de verificação e as sugestões, não é um espaço reservado em branco. </p></figcaption></figure>

## Fluxo de operação

{% stepper %}
{% step %}
### 1. Selecione o diretório de trabalho mínimo

Selecione apenas o diretório do projeto atual. Garanta que os arquivos importantes tenham backup ou registro de versão e inicie as permissões com [Confirmação por ação].
{% endstep %}

{% step %}
### 2. Defina claramente o escopo de modificação e não modificação

Especifique quais arquivos são somente leitura, onde os produtos serão armazenados, quais operações exigem confirmação prévia e os critérios de conclusão.
{% endstep %}

{% step %}
### 3. Peça ao Agent para listar o plano primeiro

Para tarefas de alto risco, utilize [Somente planejamento]. Após confirmar a lista de arquivos e os passos, alterne para o modo que permite edição para executar.
{% endstep %}

{% step %}
### 4. Verifique o status e os arquivos à direita

Para tarefas longas, verifique primeiro no [Status] se está aguardando aprovação; após a geração dos produtos, faça a pré-visualização em [Arquivos]. Confirme que está tudo correto antes de transferir, não substituindo a aceitação pelo simples "fim da tarefa".
{% endstep %}
{% endstepper %}

## Tarefas de exemplo

```
Organize o diretório atual. Os arquivos em raw/ são somente leitura; crie em deliverables/ um índice, um resumo e uma lista dos materiais ausentes. Peça confirmação antes de excluir, sobrescrever ou renomear arquivos em lote. Ao final, liste os arquivos adicionados e alterados.
```

## Combinações recomendadas

| Capacidade | Uso sugerido | Por quê |
| ---- | ------------ | ----------------- |
| Diretório de trabalho | Use um diretório independente para cada projeto | Limites de arquivos e local de entrega claros |
| Permissões | Mantenha [Confirmação por ação] para modificações de arquivos | Facilita detectar exclusões acidentais, sobrescritas e gravações fora do escopo |
| Painel de status | Verifique os produtos e etapas falhas antes de encerrar | Não se baseie apenas no "Agent disse que concluiu" |
| Nova tarefa | Abra uma nova tarefa para novas fases ou novos clientes | Evita que requisitos históricos afetem a entrega atual |

{% hint style="danger" %}
[Acesso total] reduz as confirmações, mas também amplia o impacto de operações incorretas. Considere o uso temporário apenas em diretórios isolados, confiáveis e recuperáveis.
{% endhint %}
