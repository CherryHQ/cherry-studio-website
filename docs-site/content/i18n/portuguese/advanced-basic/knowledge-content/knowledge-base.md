---
icon: book-open
---
# Construção de base de conhecimento e teste de recuperação

A base de conhecimento processa arquivos, páginas da web e notas em fragmentos pesquisáveis. É adequada para responder "o que diz o material", mas não equivale a fazer o modelo memorizar permanentemente todo o documento.

## Criar e importar materiais

{% stepper %}
{% step %}
### 1. Abra [Base de Conhecimento] → [Nova Base de Conhecimento]

Preencha um nome fácil de identificar e selecione um modelo de incorporação disponível. O modelo de incorporação é responsável por transformar os materiais em representações pesquisáveis; não é a mesma coisa que o modelo principal usado nas conversas.
{% endstep %}

{% step %}
### 2. Selecione as fontes de material

Você pode adicionar arquivos, pastas, notas ou URLs. Os formatos de documentos comuns incluem PDF, DOCX, Markdown, Excel, TXT e CSV; documentos digitalizados podem exigir OCR para extrair o texto.
{% endstep %}

{% step %}
### 3. Aguarde a conclusão do processamento

Abra os detalhes do arquivo para visualizar a pré-visualização e a segmentação. Se os títulos estiverem ausentes, houver caracteres ilegíveis ou a estrutura das tabelas for perdida, organize primeiro o arquivo original e, em seguida, processe novamente.
{% endstep %}

{% step %}
### 4. Realize um teste de recuperação

Teste com perguntas que usuários reais fariam, não apenas inserindo títulos de arquivos. Verifique se os fragmentos retornados são relevantes e se contêm contexto completo antes de decidir se vinculá-los a um Agent.
{% endstep %}
{% endstepper %}

<figure><img src="../../../../assets/203ae7d1fc3c8b76bd8af0a8.webp" alt="Ao criar uma nova base de conhecimento, preencha primeiro o nome e selecione um modelo de incorporação disponível."><figcaption><p>Ao criar uma nova base de conhecimento, preencha primeiro o nome e selecione um modelo de incorporação disponível. </p></figcaption></figure>

<figure><img src="../../../../assets/7e64d06ef22f90944b1896ee.webp" alt="① Os três materiais de viagem estão prontos; ② Clique em [Teste de Recuperação] no topo para validar problemas reais."><figcaption><p>① Os três materiais de viagem estão prontos; ② Clique em [Teste de Recuperação] no topo para validar problemas reais. </p></figcaption></figure>

<figure><img src="../../../../assets/c00520c08c9364fe13caad57.webp" alt="① Insira perguntas que realmente seriam feitas no trabalho; ② Verifique os materiais correspondentes, o conteúdo dos fragmentos e a relevância."><figcaption><p>① Insira perguntas que realmente seriam feitas no trabalho; ② Verifique os materiais correspondentes, o conteúdo dos fragmentos e a relevância. </p></figcaption></figure>

### Aceite os resultados de recuperação com perguntas reais

Após o material exibir [Pronto], teste uma vez com perguntas que realmente surgirem no trabalho. Por exemplo, em uma base de políticas, você pode perguntar "Aluguel de carro no exterior pode ser reembolsado?" e, em seguida, verificar se o conteúdo retornado vem do material correto e se contém contexto suficiente.

| Resultado observado | Próxima etapa |
| --------------- | ----------------------- |
| Material correto encontrado, fragmento suficiente para responder | Pode ser vinculado ao Agent para uso |
| Material correto encontrado, mas fragmento truncado | Verifique primeiro a estrutura do original e, em seguida, ajuste o comprimento da segmentação |
| Política antiga ou material irrelevante encontrado | Limpe materiais desatualizados e adicione títulos e conteúdo mais claros |
| Nenhum resultado | Verifique o status do material e a terminologia da pergunta; não aumente cegamente a quantidade de resultados retornados primeiro |

{% hint style="info" %}
Após o teste de recuperação ser aprovado, verifique a pergunta e resposta completa no Agent. Isso permite distinguir entre "material não encontrado" e "material encontrado, mas resposta inadequada".
{% endhint %}

## Como entender as configurações de RAG

RAG significa "primeiro recuperar materiais, depois deixar o modelo responder". As configurações comuns controlam o comprimento da segmentação, a sobreposição, a quantidade retornada e o limiar de relevância.

| Configuração | Função | Ponto de partida sugerido | Quando ajustar |
| ----- | -------------- | -------- | ------------------- |
| Comprimento da segmentação | Determina quanto conteúdo cada fragmento de recuperação contém | Use primeiro o valor inicial da página | Quando os fragmentos frequentemente truncam frases ou misturam muitos tópicos |
| Sobreposição de segmentos | Mantém a conexão entre fragmentos adjacentes | Mantenha uma pequena sobreposição | Quando cláusulas cruzam segmentos e o contexto é frequentemente interrompido |
| Quantidade retornada | Quantos fragmentos candidatos são fornecidos de uma vez | Comece com poucos resultados | Aumente quando materiais-chave forem omitidos; reduza quando houver muito ruído |
| Limiar de relevância | Filtra conteúdo irrelevante | Determine pelo teste de recuperação | Aumente quando houver muitos resultados irrelevantes; reduza quando fragmentos corretos forem filtrados |

<figure><img src="../../../../assets/24f5e32e3c72df907aaed3a6.webp" alt="Ajuste as configurações de RAG de acordo com a estrutura do material apenas quando os resultados de recuperação forem instáveis."><figcaption><p>Ajuste as configurações de RAG de acordo com a estrutura do material apenas quando os resultados de recuperação forem instáveis. </p></figcaption></figure>

### Caso de aplicação: Estabelecer uma base de perguntas e respostas de políticas internas

Organize as políticas vigentes por departamento, incluindo o tópico e o escopo de vigência no nome do arquivo. Após a importação, realize um teste de recuperação com perguntas reais, como "Como lidar com estadias acima do padrão em viagens a trabalho" ou "Quem precisa aprovar a folga durante o período de experiência". Após confirmar a precisão dos fragmentos, vincule esta base de conhecimento apenas ao Agent "Perguntas e Respostas de Políticas" e exija que as respostas indiquem o nome do material; se houver conteúdo ausente, declare explicitamente que não foi encontrado.

{% hint style="warning" %}
A base de conhecimento não determina automaticamente se um arquivo está desatualizado. Quando políticas, preços e processos mudarem, atualize ou remova os materiais antigos e refaça o teste de recuperação.
{% endhint %}

<details>

<summary>Por que não há resultados após a importação? </summary>

Verifique o status de processamento do arquivo, a conexão do modelo de incorporação e a pré-visualização do documento. Se o PDF digitalizado não tiver texto extraível, será necessário configurar o OCR primeiro ou trocar por uma versão pesquisável.

</details>
