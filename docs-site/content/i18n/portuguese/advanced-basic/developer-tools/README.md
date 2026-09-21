---
icon: code
---
# Desenvolvimento e Diagnóstico

Este conjunto de recursos é destinado a usuários que precisam gerenciar CLIs de programação, permitir que outros programas locais chamem modelos ou investigar problemas de requisições. O modo de desenvolvimento não precisa ser ativado para conversas diárias e trabalho com conteúdo.

### Dois pontos de entrada

| Entrada | Uso | Confirme antes de usar |
| ----------------- | ---------------------------- | -------------- |
| Launchpad [Parceiro de Código] | Instalar, configurar e iniciar CLIs de programação comuns | Origem da instalação, conexão do modelo e diretório de trabalho |
| [Configurações] → [Gateway de API] | Fornecer uma API compatível para programas locais; também é uma dependência de execução do Agent | Status, porta e segurança da chave |
| [Configurações] → [Geral] → [Modo de Desenvolvimento] | Visualizar a cadeia de chamadas e localizar erros de modelo e ferramentas | Os logs podem conter conteúdo sensível |

<figure><img src="../../../../assets/1fc9d6c1360e640958305d57.webp" alt="A página do Gateway de API exibe centralmente o status de execução, o endereço, a porta e as credenciais."><figcaption><p> A página do Gateway de API exibe centralmente o status de execução, o endereço, a porta e as credenciais. </p></figcaption></figure>

{% hint style="warning" %}
A chave do Gateway de API e o conteúdo das requisições na cadeia de chamadas podem envolver informações sensíveis. Em capturas de tela, Issues e chats de grupo, compartilhe apenas trechos necessários com dados sensíveis ocultados.
{% endhint %}

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong> Gateway de API </strong></td><td> Compreender as dependências do Agent e as chamadas de API locais </td><td><a href="api-gateway.md"> api-gateway.md </a></td></tr><tr><td><strong> Cadeia de chamadas e modo de desenvolvimento </strong></td><td> Reproduzir e localizar uma requisição específica </td><td><a href="trace.md"> trace.md </a></td></tr></tbody></table>
