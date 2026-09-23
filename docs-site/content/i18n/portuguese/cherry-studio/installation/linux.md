---
icon: linux
---
# Linux

## 1. Baixar o pacote de instalação

Abra a [página oficial de download](https://cherryai.com.cn/download/v2) e selecione **Linux**. O site oficial oferece pacotes de instalação em diferentes formatos conforme o sistema e a arquitetura:

| Cenário de uso | Sugestão de seleção |
| ------------------------ | ----------------------- |
| Ubuntu, Debian, Linux Mint | Selecione o pacote `.deb` correspondente à arquitetura. |
| Fedora, RHEL, openSUSE | Selecione o pacote `.rpm` correspondente à arquitetura. |
| Outras distribuições ou necessidade de execução portátil | Selecione o pacote `.AppImage` correspondente à arquitetura. |

Dispositivos Intel / AMD geralmente devem selecionar a versão x64 (ou x86\_64); dispositivos ARM devem selecionar a versão ARM64 (ou aarch64). Se não tiver certeza da arquitetura, execute `uname -m` no terminal: `x86_64` corresponde a x64, enquanto `aarch64` ou `arm64` correspondem a ARM64.

## 2. Instalar e iniciar

* `.deb` e `.rpm`: utilize preferencialmente o instalador de software ou o gerenciador de pacotes da distribuição para abrir o pacote de instalação e, em seguida, inicie o Cherry Studio pelo menu de aplicativos.
* `.AppImage`: conceda permissões de execução ao arquivo e execute-o com dois cliques; também é possível executar `chmod +x nome-do-arquivo.AppImage` no terminal para iniciar.

## Não é possível iniciar

Primeiro, confirme se o pacote de instalação corresponde à arquitetura do sistema. Se o AppImage não iniciar e exibir erros relacionados a `FUSE` ou `libfuse`, instale os componentes de compatibilidade apropriados seguindo a documentação oficial da sua distribuição.

Se ainda não for possível iniciar, inclua na sua solicitação de suporte a distribuição, o ambiente de desktop, a arquitetura do dispositivo, o nome do pacote de instalação e a mensagem de erro completa.

## Próximos passos

Após visualizar a interface principal do Cherry Studio, continue para o guia de início rápido.
