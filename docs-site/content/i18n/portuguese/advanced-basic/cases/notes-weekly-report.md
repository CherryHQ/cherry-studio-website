---
icon: calendar-week
---
# Notas para gerar relatório semanal

O responsável pelo projeto acumulou notas de reuniões, atualizações de progresso e tarefas avulsas ao longo da semana e deseja organizá-las na sexta-feira em um relatório semanal com estrutura estável e fatos verificáveis. O essencial é primeiro padronizar a forma de registro e, em seguida, permitir que o Agent consolide as informações, em vez de deixar que ele especule sobre estados ausentes.

<figure><img src="../../../../assets/037b73b62e47ca15c0537f83.webp" alt="Registrar continuamente na mesma estrutura facilita a verificação de estados e responsáveis durante a organização no fim de semana."><figcaption><p>Registrar continuamente na mesma estrutura facilita a verificação de estados e responsáveis durante a organização no fim de semana. </p></figcaption></figure>

<figure><img src="../../../../assets/cd9eea7189b1b6cf20d2b08d.webp" alt="① A esquerda mantém os registros originais e a retrospectiva da semana; ② A direita já contém conteúdo real no relatório semanal, podendo ser editado manualmente, visualizado e exportado."><figcaption><p>① A esquerda mantém os registros originais e a retrospectiva da semana; ② A direita já contém conteúdo real no relatório semanal, podendo ser editado manualmente, visualizado e exportado. </p></figcaption></figure>

## Fluxo de operação

{% stepper %}
{% step %}
### 1. Padronizar a forma de registro

Registre os itens diariamente na mesma pasta de notas, incluindo pelo menos data, resultado, responsável e status. Itens não concluídos não devem ser descritos como entregues.
{% endstep %}

{% step %}
### 2. Organizar manualmente na sexta-feira

Mescle itens duplicados e complete números-chave e links. Coloque o contexto de longo prazo na base de conhecimento e mantenha as mudanças da semana na nota atual.
{% endstep %}

{% step %}
### 3. Solicitar ao Agent a geração de um rascunho

Peça para gerar a saída com as seções "Concluído nesta semana", "Em andamento", "Riscos" e "Plano para a próxima semana", listando itens pendentes quando houver lacunas nas informações.
{% endstep %}

{% step %}
### 4. Revisar e exportar

Confirme status, números e responsáveis, depois finalize e exporte em [Notas]. O formato estável pode ser convertido em uma habilidade para reutilização na semana seguinte.
{% endstep %}
{% endstepper %}

## Tarefa de exemplo

```
Leia as notas desta semana e gere um rascunho do relatório semanal. Agrupe os mesmos assuntos, mas preserve as mudanças de status por data e não presuma que algo foi concluído. Coloque responsáveis, números ou próximos passos ausentes em “A completar”.
```

## Combinações recomendadas e critérios de conclusão

| Item | Prática recomendada |
| ----- | --------------------------------- |
| Entrada diária | Registre notas por data ou projeto, incluindo apenas fatos e pendências |
| Agent | Utilize uma estrutura fixa para o relatório semanal, lendo as notas da semana antes de gerar |
| Saída | Escreva o relatório semanal em um arquivo separado, sem sobrescrever as notas originais |
| Critério de conclusão | Cada progresso deve ser rastreável até a nota original; itens não concluídos devem ter responsável ou próxima etapa; não adicionar dados sem base |

Adequado para organizar o trabalho já registrado em um relatório semanal, inadequado para permitir que o Agent especule sobre os resultados da semana com base em memórias avulsas.

{% hint style="info" %}
Antes de configurar a geração automática de relatórios semanais em horários fixos, execute manualmente por algumas semanas. Somente após a estabilidade do formato de entrada e a confiabilidade no tratamento de informações ausentes, crie a tarefa agendada.
{% endhint %}
