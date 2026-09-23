---
icon: palette
---
# Geração, Edição e Aprimoramento de Imagens

【Pintura】não apenas gera imagens a partir de texto, mas também permite usar imagens de referência, editar áreas específicas, combinar múltiplas imagens, reutilizar modelos e aprimorar a resolução. Primeiro, determine o uso da imagem e, em seguida, escolha entre gerar ou editar.

## Escolhendo o ponto de partida adequado

| Necessidade | Método sugerido |
| ------------ | ------------ |
| Criar direção visual do zero | Texto para imagem ou modelo |
| Manter o sujeito, alterar o fundo ou o estilo | Editar após enviar uma imagem de referência |
| Alterar apenas uma parte da imagem | Usar máscara para marcar a área de modificação |
| Combinar vários materiais em uma única imagem | Combinação de múltiplas imagens, explicando a relação de prioridade |
| Imagem existente precisa de mais nitidez | Usar a função de aprimoramento/ampliação |

### Exemplo: De uma descrição ao produto final

Abra 【Pintura】, selecione o modelo de imagem que suporta a tarefa atual, insira o sujeito, o ambiente, o estilo, a iluminação, a composição e as restrições, e então envie. Um exemplo de prompt é:

> Bancada criativa sob a luz da manhã, abajur vermelho-cereja, caderno de rascunhos, câmera e um ramo de cerejeira, montanhas serenas pela janela; estilo de ilustração 3D suave, luz da manhã quente, composição panorâmica, sem texto.

1. Descreva claramente o uso e a composição, selecione o modelo de pintura.
2. Gere a primeira versão, verifique o sujeito, as bordas e as dimensões.
3. Se ainda não estiver utilizável, modifique apenas uma direção, gere novamente e verifique.
4. Após confirmar que está utilizável, amplie para inspeção e exporte.

{% hint style="info" %}
O exemplo usa 【GPT-Image-2 | express】 para gerar uma ilustração panorâmica de uma bancada. Os modelos, dimensões e operações disponíveis estão sujeitos ao que é exibido na sua página atual; não copie parâmetros que não estão visíveis.
{% endhint %}

Após a geração, não saia imediatamente: primeiro amplie para verificar o sujeito, as bordas e elementos indesejados, e depois alterne entre versões no histórico à esquerda. Quando precisar ajustar, mantenha as descrições válidas e modifique apenas uma direção.

<figure><img src="../../../../assets/2ba55ffd828250f31afa2b16.jpg" alt="① Miniaturas do histórico desta geração são mantidas à esquerda; ② O produto final completo é exibido no centro; ③ Amplie para inspeção antes de baixar, copiar ou continuar editando."><figcaption><p>① Miniaturas do histórico desta geração são mantidas à esquerda; ② O produto final completo é exibido no centro; ③ Amplie para inspeção antes de baixar, copiar ou continuar editando. </p></figcaption></figure>

## Concluindo uma imagem utilizável

{% stepper %}
{% step %}
### 1. Selecionar modelo e modo

Diferentes modelos de imagem suportam dimensões, imagens de referência e capacidades de edição distintas. Não preença parâmetros que não são exibidos na página com base apenas em experiência.
{% endstep %}

{% step %}
### 2. Descrever claramente o uso e a composição

Especifique o sujeito, o ambiente, o ângulo, a paleta de cores, a proporção, o espaço em branco e o conteúdo que não deve aparecer. Ao incluir títulos, geralmente é recomendado deixar espaço em branco para o modelo, adicionando o texto posteriormente com ferramentas de design.
{% endstep %}

{% step %}
### 3. Validar apenas uma direção por vez

Gere primeiro um pequeno lote de resultados, selecione a imagem mais próxima e depois edite ou aprimore. Gerar várias simultaneamente aumenta o uso e dificulta determinar qual requisito está sendo atendido.
{% endstep %}

{% step %}
### 4. Verificar detalhes antes de exportar

Amplie para verificar mãos de personagens, estrutura de produtos, texto, logotipos de marcas e bordas. Para uso comercial, confirme a origem dos materiais e os termos de serviço correspondentes.
{% endstep %}
{% endstepper %}

### Desenhando no Agent

Primeiro, vá para 【Configurações】→【Modelo Padrão】 e selecione 【Modelo de Pintura】, depois abra as 【Ferramentas Integradas】 do Agent para confirmar que 【Gerar Imagem】 está habilitado. Em seguida, você pode pedir ao Agent em 【Trabalho】 para ler artigos, extrair a direção visual e gerar diretamente as imagens de acompanhamento.

<figure><img src="../../../../assets/1c3d17dc2a9692479862d303.webp" alt="O 【Modelo de Pintura】 em 【Modelo Padrão】 determina qual modelo o Agent e as entradas de pintura relacionadas priorizam."><figcaption><p>O 【Modelo de Pintura】 em 【Modelo Padrão】 determina qual modelo o Agent e as entradas de pintura relacionadas priorizam. </p></figcaption></figure>

### Caso de aplicação: Criar um conjunto de imagens para eventos de marca

Primeiro, defina regras unificadas de paleta de cores, lente e espaço em branco no modelo, gerando uma imagem de cabeçalho horizontal. Após definir a direção, use a mesma imagem de referência para criar imagens quadradas para redes sociais e imagens verticais para stories; corrija inconsistências na aparência do produto com edição local e, por fim, aprimore as versões destinadas à publicação. Durante todo o processo, não permita que o modelo gere texto da marca, evitando erros de digitação e distorções.

{% hint style="warning" %}
Imagens de referência podem ser enviadas ao serviço do modelo selecionado. Antes de enviar dados de clientes, retratos e imagens de produtos não divulgados, confirme o escopo de uso permitido.
{% endhint %}
