---
icon: search
---

# Pesquisa na web e leitura de páginas

A pesquisa encontra páginas relevantes; a leitura da página extrai o conteúdo de um link. Eles podem usar serviços diferentes.

## Tente uma pesquisa

1. Escolha um modelo de texto que suporte a chamada da ferramenta e habilite **Pesquisa na Web** no editor do agente atual.
2. Pergunte “Pesquise os lançamentos recentes deste projeto e inclua as fontes” ou “Leia este link e resuma os pontos principais: [URL]”.
3. Inspecione o processo e as fontes da ferramenta; abra uma fonte para ler a página original.

Instalações novas normalmente selecionam ExaMCP para pesquisa e Jina para leitura de página sem exigir uma chave pessoal. Os usuários existentes mantêm suas seleções. Os serviços padrão ainda dependem de conectividade e limites de serviço.

O campo de mensagem atual não possui uma opção de pesquisa na web separada. Habilite **Pesquisa na Web** no editor do agente, configure os serviços e solicite uma pesquisa em sua mensagem. Procure atividades e fontes reais da ferramenta, em vez de confiar no modelo que disse que pesquisou.

## Alterar serviços de pesquisa ou leitura

Abra **Configurações → Pesquisa na Web**:

* **Provedor de pesquisa:** encontra páginas usando palavras-chave.
* **Provedor de busca de URL:** lê o conteúdo de um link da Web especificado.

Escolha um serviço, insira a chave/endereço solicitado e use **Verificar** antes de enviar uma nova mensagem. A seleção de serviço é salva imediatamente. Os campos-chave API são confirmados quando a edição é concluída; observe os erros. Seleções avançadas/entradas numéricas também são salvas sem uma ação de salvar página separada.

As chaves do provedor de modelo e as chaves do serviço de pesquisa geralmente são separadas. A pesquisa Zhipu vincula-se às configurações do provedor de modelo para configuração de chave; outros serviços usam seus próprios formulários.

<div data-mobile-gallery="single">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/web-search.webp"><img src="../../../assets/mobile/en/web-search.webp" alt="A pesquisa e a leitura de páginas têm provedores separados; padrões mostrados"></a><figcaption><p><strong>iPhone · Interface em inglês</strong> · A pesquisa e a leitura de páginas possuem provedores separados; padrões mostrados</p></figcaption></figure>
</div>

## Configurações avançadas

Mantenha os padrões inicialmente e depois ajuste para uma necessidade específica.

| Configuração | Objetivo | Troca |
| --- | --- | --- |
| Contagem de resultados | Número de resultados de pesquisa | Mais perspectivas também significam mais material para processar |
| Compressão de resultados | Se o conteúdo da pesquisa é reduzido | O corte reduz o uso; nenhuma compactação não significa capacidade ilimitada do modelo |
| Conteúdo total de pesquisa | Limita a quantidade de texto retido | Limites inferiores podem omitir detalhes posteriores |

A leitura de páginas também tem limites separados. Páginas longas podem ser lidas apenas parcialmente. Abra o original ao verificar os detalhes; repetir a mesma busca não recupera automaticamente o próximo segmento.

## O bate-papo funciona, mas a pesquisa não

O modelo de bate-papo, o serviço de pesquisa e o serviço de leitura se conectam separadamente. Verifique:

1. Se o modelo suporta chamada de ferramenta e se a chave **Pesquisa na Web** do agente está habilitada.
2. Se o serviço selecionado passa na verificação de configurações.
3. Se sua solicitação pede claramente uma pesquisa e fornece palavras-chave ou um link.
4. Erros de ferramenta para problemas de rede, chave, permissão, cota ou acesso à página.

Após uma falha na pesquisa ou na leitura da página, essa resposta para de iniciar novas tentativas na web e usa as informações já obtidas sempre que possível. Ele não muda de provedor silenciosamente. Corrija o problema e envie uma nova mensagem para tentar novamente.

## Por que ele não consegue ler uma página logada?

Os serviços de leitura acessam links da própria rede e não herdam o login do navegador do seu telefone. Páginas restritas ou somente de login podem ficar inacessíveis.

Use o [plugin correspondente](plugins.md) para recursos Feishu ou Notion ou anexe uma exportação autorizada usando [bate-papo e arquivos](chat-and-files.md).

## Para onde vão os dados?

Palavras-chave de pesquisa e URLs de destino vão para o serviço de pesquisa/leitura selecionado. O material devolvido é usado pelo modelo. Evite incluir chaves ou informações privadas que não pertençam a uma pesquisa na web. Consulte [dados e privacidade](data-privacy.md).
