---
icon: sliders-horizontal
---

# Adicionar, editar e gerenciar modelos

Normalmente, basta buscar a lista de modelos de um provedor e adicionar os modelos que você usa. A configuração manual ajuda quando um modelo não aparece, precisa de um nome mais claro ou tem informações diferentes das fornecidas pela sua plataforma.

Abra **Configurações → Serviço de modelo → Seu provedor → Modelos**.

## Adicionar um modelo manualmente

1. Toque no botão adicionar na guia Modelos.
2. Insira **ID do modelo**, o identificador exato que sua plataforma usa. Copie-o da documentação ou catálogo da plataforma sem traduzi-lo.
3. Escolha um nome de exibição, como “Perguntas do dia a dia”. Isso muda a forma como você reconhece o modelo, não qual modelo é chamado.
4. Verifique o tipo de modelo e API. Deixe outras opções com seus padrões se não tiver certeza.
5. Toque em **Adicionar**. Se você estiver configurando um provedor pela primeira vez, conclua a configuração e certifique-se de que sua opção esteja habilitada na lista de provedores.

A entrada manual adiciona um modelo por vez. Use [sincronização de modelo](model-updates.md) para vários modelos. Não são permitidos IDs duplicados no mesmo provedor.

## Ver e editar

Toque em um modelo para ver seus detalhes e copie seu ID e toque em **Editar** no canto superior direito. Você também pode manter pressionado um item da lista para obter detalhes, edição, seleção ou exclusão.

O editor de modelo usa **salvamento explícito**. Expanda a seção necessária, faça alterações e toque em **Guardar**. Se o salvamento falhar, corrija os campos indicados e tente novamente antes de sair.

Um **ID de modelo existente não pode ser alterado no editor**. Se estiver errado, adicione um modelo com o ID correto, troque quaisquer agentes ou padrões para a nova entrada e remova o antigo.

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/model-detail.webp"><img src="../../../assets/mobile/en/model-detail.webp" alt="Inspecione o ID do modelo e os detalhes e use Editar no canto superior direito"></a><figcaption><p><strong>iPhone · Interface em inglês</strong> · Inspecione o ID do modelo e os detalhes e use Editar no canto superior direito</p></figcaption></figure>
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/model-edit.webp"><img src="../../../assets/mobile/en/model-edit.webp" alt="Expanda as configurações relevantes e salve suas alterações"></a><figcaption><p><strong>iPhone · Interface em inglês</strong> · Expanda as configurações relevantes e salve suas alterações</p></figcaption></figure>
</div>

## O que significam as configurações?

| Configuração | Efeito | Quando não tiver certeza |
| --- | --- | --- |
| Nome de exibição, grupo, notas | Organizar e reconhecer modelos | Use seus próprios rótulos |
| ID do modelo | Identifica o modelo chamado na plataforma | Mantenha o valor exato da plataforma |
| Tipo de modelo | Distingue texto, geração de imagens e outras finalidades | Siga a descrição da plataforma |
| API | Seleciona como as solicitações se conectam ao modelo | Manter seleção automática/padrão |
| Raciocínio | Registra suporte para recursos relacionados ao pensamento | Guarde as informações fornecidas |
| Chamada de ferramenta | Registra suporte para ferramentas de pesquisa, calendário ou plug-in | Combine o suporte real do modelo |
| Entradas suportadas | Grava suporte para entrada de imagem, áudio ou vídeo | Não habilite entradas não suportadas |
| Transmissão | Registra suporte para respostas progressivas | Mantenha o padrão; este sinalizador por si só não altera a execução |

**Os sinalizadores de capacidade não adicionam capacidades.** Marcar um modelo somente de texto como compatível com imagens não fará com que ele entenda fotografias. Sinalizadores de áudio/vídeo também não significam que o aplicativo móvel possa enviar todos esses anexos.

Incorporação e reclassificação são categorias de modelo usadas para recuperação. Suas informações podem ser gerenciadas, mas atualmente não estão disponíveis para bate-papo móvel comum. Escolha texto para conversa ou geração de imagem para desenho.

## Contexto e limites de entrada/saída

Um **token** é uma unidade usada pelos modelos para medir o conteúdo, não uma contagem de caracteres ou palavras.

* **Janela de contexto:** o espaço total para histórico, resultados da ferramenta e a nova resposta.
* **Entrada máxima:** quanto conteúdo uma solicitação pode trazer.
* **Saída máxima:** quanto o modelo pode produzir em uma resposta.

Aumentar um número não ultrapassa os limites do provedor e pode causar solicitações rejeitadas. Altere esses valores somente quando a plataforma fornecer limites diferentes. Use números inteiros positivos e resolva quaisquer avisos de limites conflitantes.

Limpe uma substituição de limite e salve para restaurar os padrões do catálogo ou do aplicativo. Se uma conversa longa ainda ultrapassar os limites, reduza os anexos, encurte o material ou inicie uma nova conversa.

## Estimativas de preços e custos

O preço suporta estimativas de uso; **editar não altera a conta do provedor**.

* Selecione USD ou CNY. As taxas de entrada/saída são **por milhão de tokens**.
* As taxas de leitura/gravação de cache descrevem como a plataforma avalia o conteúdo reutilizado. As taxas de cache vazias usam a taxa de entrada.
* Desconhecido é diferente de gratuito. `0` significa explicitamente uma taxa zero; não o use por um preço desconhecido.
* As camadas de entrada podem representar preços mais altos para solicitações longas. Os limites iniciais devem aumentar. O nível aplicável precifica toda a solicitação, em vez de apenas a parte acima do limite.

Mantenha os padrões quando você não tiver preços confiáveis. Consulte [configurações e uso](settings-and-usage.md) para custos estimados e incompletos.

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/model-limits.webp"><img src="../../../assets/mobile/en/model-limits.webp" alt="Os limites de comprimento podem herdar padrões; não os aumente sem orientação do provedor"></a><figcaption><p><strong>iPhone · Interface em inglês</strong> · Limites de comprimento podem herdar padrões; não os aumente sem orientação do provedor</p></figcaption></figure>
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/model-pricing.webp"><img src="../../../assets/mobile/en/model-pricing.webp" alt="Os preços são por milhão de tokens; os valores ilustrados ilustram os campos, não os preços atuais do fornecedor"></a><figcaption><p><strong>iPhone · Interface em inglês</strong> · Os preços são por milhão de tokens; os valores ilustrados ilustram os campos, não os preços atuais do fornecedor</p></figcaption></figure>
</div>

## A alteração do API salva imediatamente?

Alterar a API de um modelo diretamente na lista de gerenciamento salva a alteração imediatamente. No **editor**, a alteração permanece no rascunho até você tocar em **Guardar**.

Seguir o padrão usa o padrão atual do provedor API. Se ficar indisponível, verifique a conexão configurada do provedor em vez de renomear o modelo repetidamente.

## Excluir e organizar modelos

Mantenha pressionado para entrar no modo de seleção e excluir vários modelos do filtro atual. A exclusão com falha mantém a seleção para que você possa resolver o problema e tentar novamente.

* Um modelo padrão global está protegido: altere-o ou limpe-o em **Configurações → Modelo predefinido** antes de excluí-lo.
* Excluir um modelo usado por um agente significa que o agente precisa de outro modelo selecionado.
* A exclusão da configuração local não fecha uma conta de provedor nem reverte cobranças.

Para desuso temporário, desabilite o provedor em vez de reconstruir sua configuração posteriormente. Consulte [atualizações de modelo](model-updates.md) para saber o que acontece com suas edições quando as informações remotas são alteradas.
