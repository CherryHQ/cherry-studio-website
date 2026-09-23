---
icon: monitor-smartphone
---

# Importar configurações do computador

Reutilize os provedores de modelos suportados já configurados em Cherry Studio em seu computador, sem inserir todos os endereços e chaves novamente.

**Isso importa a configuração do provedor e os modelos habilitados, não o histórico de conversas ou o controle remoto do seu computador.** O emparelhamento não permite a sincronização automática contínua; execute-o novamente quando quiser importar alterações.

## Conecte seu computador

1. Conecte ambos os dispositivos à mesma rede local, como o Wi-Fi doméstico, e mantenha o Cherry Studio Desktop funcionando.
2. Abra **Ligações de dispositivos** na área de trabalho e exiba seu código QR de emparelhamento.
3. No celular, abra **Configurações → Ligações de dispositivos → Digitalizar o código QR**. Permita permissões de câmera e rede local quando solicitado.
4. Digitalize e continue com a seleção do provedor. A configuração inicial na primeira execução oferece a mesma rota de sincronização da área de trabalho.

Se a câmera não estiver disponível, use o campo manual para colar o conteúdo QR de emparelhamento do desktop. Ele espera dados de emparelhamento, não um link de site comum.

<div data-mobile-gallery="single">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/en/desktop-pair.webp"><img src="../../../assets/mobile/en/desktop-pair.webp" alt="Abra Conexões do dispositivo e leia o código de emparelhamento mostrado no seu computador"></a><figcaption><p><strong>iPhone · Interface em inglês</strong> · Abra as conexões do dispositivo e leia o código de emparelhamento mostrado no seu computador</p></figcaption></figure>
</div>

## Selecione e importe provedores

Use **Provedores de sincronização do desktop** nos detalhes do dispositivo pareado. Como alternativa, escolha **Sincronizar a partir da aplicação para computador** no menu da lista de serviços de modelos e selecione o computador.

1. Aguarde o carregamento dos provedores de desktop habilitados.
2. Selecione os provedores a serem importados.
3. Leia o aviso de que os endereços e chaves selecionados serão substituídos enquanto os modelos existentes permanecerem.
4. Sincronize e revise as contagens adicionadas, atualizadas e ignoradas.
5. Selecione um modelo importado no chat. Durante a configuração inicial, continue com a etapa de seleção do modelo de chat.

## O que acontece com as configurações móveis existentes?

| Artigo | Resultado |
| --- | --- |
| Provedor selecionado | Recebe a configuração e as chaves do desktop e fica habilitado no celular |
| Modelo de desktop ativado ausente no celular | Adicionado |
| Mesmo modelo já no celular | Configurações móveis existentes mantidas; nenhuma duplicata |
| Provedores/modelos presentes apenas no celular | Retido |
| Provedores/modelos de desktop desativados | Excluído da importação |
| Histórico de bate-papo e concessões de conta de plug-in | Não importado |

Se você usa chaves de API diferentes no computador e no celular, preste atenção especial à primeira linha. As credenciais de um provedor podem ser substituídas mesmo quando nenhum modelo novo precisa ser adicionado.

## Por que alguns provedores não estão disponíveis?

Leia o motivo mostrado ao lado do provedor:

* **Autenticação não suportada:** um login de desktop pode não fornecer uma chave exportável que possa ser usada em dispositivos móveis. Configure um método compatível separadamente no celular.
* **Nenhuma chave API utilizável:** certifique-se de que o desktop tenha pelo menos uma chave válida e habilitada.
* **Configuração ilegível:** atualize o Cherry Studio no celular ou pule essa entrada e importe as outras.

Os serviços de modelo local, como Ollama e LM Studio, estão excluídos. O emparelhamento não transforma um modelo em execução no seu computador em um serviço em execução no seu telefone.

## Emparelhado com sucesso, mas não é possível sincronizar

O emparelhamento armazena credenciais de conexão; a busca da configuração ainda precisa de um computador acessível. Mantenha o desktop em execução e verifique a rede local compartilhada, o isolamento da rede de convidados, o firewall e as configurações de proxy.

Em iPhone/iPad, ative a permissão de rede local de Cherry Studio nas configurações do sistema, caso tenha sido negada anteriormente. Se o aplicativo disser que o emparelhamento precisa de reparo, leia um novo código QR da área de trabalho.

## A remoção de um dispositivo revoga ambos os lados?

**Remover dispositivo** no celular remove apenas as credenciais de conexão salvas desse telefone. Para revogar também a autorização do desktop, remova o dispositivo móvel nas conexões do dispositivo do desktop.

A importação de configuração não é um backup completo. [Exporte conversas e arquivos importantes](sharing-and-export.md) separadamente.
