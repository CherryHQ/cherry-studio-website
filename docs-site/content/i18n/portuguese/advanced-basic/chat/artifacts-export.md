---
icon: box-archive
---
# Artefatos, Citações e Exportação

Uma resposta pode conter simultaneamente texto principal, código, arquivos, imagens, citações e conteúdo editável. Verifique primeiro os artefatos antes de decidir copiar, baixar, exportar ou passar para o Agent continuar o processamento.

<figure><img src="../../../../assets/5c0f5f563432facacf7942d6.webp" alt="Ao chegar ao artefato final, verifique o conteúdo, a origem e os arquivos antes de decidir copiar, exportar ou passar para o Agent continuar a organização."><figcaption><p>Ao chegar ao artefato final, verifique o conteúdo, a origem e os arquivos antes de decidir copiar, exportar ou passar para o Agent continuar a organização. </p></figcaption></figure>

### Primeiro pré-visualize, depois entregue

Clique em um artefato na mensagem ou no painel de arquivos do Agent para abrir a pré-visualização correspondente no lado direito. No HTML, é possível verificar o layout da página e as interações; PDF, Word, PowerPoint, imagens e texto são exibidos conforme o formato; `.xlsx` planilhas permitem visualizar diretamente as folhas de cálculo, estilos de células, células mescladas, resultados de fórmulas, imagens e gráficos.

<figure><img src="../../../../assets/4e1d6cc47405edfe8d6fe315.webp" alt="① A área de pré-visualização é usada para conferir o conteúdo completo; ② a barra de ferramentas permite ampliar, baixar, maximizar ou alternar a visualização."><figcaption><p>① A área de pré-visualização é usada para conferir o conteúdo completo; ② a barra de ferramentas permite ampliar, baixar, maximizar ou alternar a visualização. </p></figcaption></figure>

1. Especifique o formato do artefato na conversa e abra a pré-visualização no lado direito.
2. Verifique se o conteúdo e o layout estão completos.
3. Se houver itens faltantes, retorne à conversa para complementar os requisitos de modificação e abra novamente a pré-visualização para verificar.
4. Após confirmar a completude, baixe, copie ou entregue ao Agent para salvar.

O objetivo da pré-visualização é identificar antecipadamente itens faltantes, e não apenas confirmar que "foi gerado". Se a página for entregue a colegas para uso, verifique ao menos uma vez cada link, botão e arquivo de download.

{% hint style="info" %}
Se o resultado for apenas um bloco de código sem pré-visualização, adicione na mesma rodada de conversa "Por favor, gere um artefato HTML completo e diretamente pré-visualizável" e especifique claramente as áreas que a página deve conter.
{% endhint %}

#### Caso de aplicação: Verificação antes da publicação

Digite "Crie um artefato HTML completo e diretamente pré-visualizável com uma lista de verificação pré-publicação, contendo três áreas: preparação para lançamento, monitoramento e aceitação, e condições de rollback". Após abrir a pré-visualização, verifique primeiro se as três partes estão completas, depois baixe ou entregue ao Agent para salvar no diretório do projeto.

#### Caso de aplicação: Verificação de tabela de dados

Abra a tabela de orçamento `.xlsx` gerada pelo Agent, alterne para cada folha de cálculo e verifique títulos mesclados, formatação de valores monetários, resultados de fórmulas e gráficos. Se o conteúdo da célula for longo, clique para expandir; use a ampliação para visualizar com clareza imagens ou gráficos. A pré-visualização é usada para aceitação e não substitui a capacidade de edição completa e recálculo no Excel.

### Realize primeiro três verificações

1. **Conteúdo**: Números, datas, termos próprios e conclusões estão consistentes com os materiais originais.
2. **Origem**: Os resultados da web mantêm links acessíveis; as citações realmente sustentam as afirmações correspondentes.
3. **Arquivos**: Nome do arquivo, formato e conteúdo abrem normalmente e não contêm informações que não devem ser compartilhadas.

### Destinos comuns

| Resultado | Prática recomendada |
| ---------------- | ------------------------------------- |
| Texto finalizado | Copie para o aplicativo de destino ou salve como nota |
| Markdown que requer modificações contínuas | Coloque no diretório de trabalho do Agent e continue editando no painel [Arquivos] |
| Material reutilizável | Organize e adicione à base de conhecimento; não importe discussões temporárias inteiras |
| Imagem | Abra a imagem original para verificar dimensões e detalhes, depois baixe para uso |
| Tabela `.xlsx` | Verifique folhas de cálculo, estilos, resultados de fórmulas, imagens e gráficos na pré-visualização integrada, depois faça a edição final com software de planilhas |
| Código ou comandos | Leia primeiro e valide em um ambiente recuperável; não execute diretamente comandos desconhecidos |

{% hint style="warning" %}
"Geração bem-sucedida" indica apenas que o modelo retornou conteúdo, não que o arquivo esteja pronto para publicação. Materiais externos ainda devem ser verificados quanto a fatos, direitos autorais, privacidade e requisitos de marca.
{% endhint %}

#### Caso de aplicação: Organizar discussões em documento entregável

A equipe discute primeiro o plano de ação na [Conversa], confirma o público-alvo, o prazo e os limites de orçamento, e pede ao modelo para gerar um esboço estruturado. Em seguida, entrega o esboço ao Agent de conteúdo no [Trabalho] para gerar `campaign-plan.md` no diretório especificado. Finalmente, revise no [Arquivos] à direita, evitando copiar diretamente dezenas de rodadas de discussão para o documento formal.

<details>

<summary>Por que o link de citação não abre? </summary>

O link pode estar inválido, exigir login, ou os resultados de busca podem ter fornecido apenas um resumo. Use a fonte original para verificar novamente; não use fontes inacessíveis como único suporte para conclusões críticas.

</details>

<details>

<summary>Por que o link de citação não abre? </summary>

O link pode estar inválido, exigir login, ou os resultados de busca podem ter fornecido apenas um resumo. Use a fonte original para verificar novamente; não use fontes inacessíveis como único suporte para conclusões críticas.

</details>
