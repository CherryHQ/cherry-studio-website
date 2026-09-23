---
icon: lock
---
# Perguntas e Respostas com Base de Conhecimento Privada

A equipe de Recursos Humanos deseja que os colegas consultem as políticas vigentes, mas não quer que o Agent preencha as respostas com conhecimento geral. Este caso reúne o escopo dos materiais, os testes de recuperação e as regras de resposta; quando não encontrar conteúdo, o Agent deve declarar isso explicitamente.

<figure><img src="../../../../assets/203ae7d1fc3c8b76bd8af0a8.webp" alt="Crie uma base de conhecimento independente para um único tópico, evitando que materiais vigentes e desatualizados fiquem misturados."><figcaption><p>Crie uma base de conhecimento independente para um único tópico, evitando que materiais vigentes e desatualizados fiquem misturados. </p></figcaption></figure>

<figure><img src="../../../../assets/24f5e32e3c72df907aaed3a6.webp" alt="Ajuste as configurações de RAG com base na estrutura dos materiais apenas quando os resultados de recuperação forem instáveis."><figcaption><p>Ajuste as configurações de RAG com base na estrutura dos materiais apenas quando os resultados de recuperação forem instáveis. </p></figcaption></figure>

<figure><img src="../../../../assets/c00520c08c9364fe13caad57.webp" alt="① Teste com perguntas reais; ② Verifique os materiais retornados, os trechos do texto original e a relevância. Somente quando estiver estável aqui, entregue a base de conhecimento para uso pelo Agent."><figcaption><p>① Teste com perguntas reais; ② Verifique os materiais retornados, os trechos do texto original e a relevância. Somente quando estiver estável aqui, entregue a base de conhecimento para uso pelo Agent. </p></figcaption></figure>

## Fluxo de Operação

{% stepper %}
{% step %}
### 1. Criar uma base de conhecimento com tópico único

Agrupe os materiais vigentes, removendo versões duplicadas e desatualizadas. Indique claramente o tópico e o escopo de vigência nos nomes dos arquivos.
{% endstep %}

{% step %}
### 2. Realizar testes de recuperação com perguntas reais

Teste pelo menos cláusulas facilmente confundidas, perguntas em linguagem coloquial e perguntas sem resposta. Ajuste os materiais ou as configurações de RAG até que os trechos retornados sejam estáveis.
{% endstep %}

{% step %}
### 3. Criar um Agent dedicado

Vincule apenas esta base de conhecimento e exija no prompt: "Priorize a citação dos materiais; declare que não encontrou quando não houver resposta; não preencha políticas com conhecimento geral". Mantenha as permissões no menor escopo possível.
{% endstep %}

{% step %}
### 4. Começar com uso em pequena escala

Use primeiro para buscas internas, sem substituir diretamente aprovações ou julgamentos especializados. Colete as perguntas respondidas incorretamente e corrija nos materiais e nos testes de recuperação.
{% endstep %}
{% endstepper %}

## Regras para Perguntas de Exemplo

```
Apresente primeiro a conclusão e depois informe o nome do material e o trecho relacionado. Se houver conflito entre as fontes, liste-o sem escolher por nós. Se a base de conhecimento não contiver a resposta, escreva claramente “Não encontrado nos materiais atuais”.
```

## Combinações Recomendadas e Critérios de Conclusão

| Item | Prática Recomendada |
| ----- | --------------------------- |
| Base de Conhecimento | Um conjunto de materiais por tópico, removendo versões duplicadas e desatualizadas |
| Teste de Recuperação | Teste simultaneamente perguntas padrão, perguntas coloquiais e perguntas sem resposta |
| Agent | Vincule apenas as bases de conhecimento necessárias, exija citação dos materiais e não preencha |
| Critério de Conclusão | Encontrar o parágrafo correto; listar materiais conflitantes; declarar explicitamente que não encontrou quando não houver resposta |

{% hint style="danger" %}
O conteúdo da base de conhecimento privada será processado pelos serviços de modelos de incorporação e de conversa que você selecionar. Antes de usar, confirme os requisitos de confidencialidade dos materiais e o escopo do serviço, e não importe chaves e credenciais de conta como materiais de conhecimento.
{% endhint %}
