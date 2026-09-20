---
icon: book-open
---

# Contribuir com a documentação

## Propor alterações

1. Use **Edit on GitHub** no fim da página para abrir o [repositório do site](https://github.com/CherryHQ/cherry-studio-website). Edite o arquivo em sua branch ou fork.

2. As fontes estão em `docs-site/content/` e as traduções nas pastas de idiomas em `i18n/`. Ao adicionar, mover ou remover páginas, atualize o `SUMMARY.md` do idioma. Salve imagens em `docs-site/content/assets/` e use caminhos relativos.

3. Depois de visualizar e validar, abra uma Pull Request para `main`. Descreva o problema, as páginas alteradas e os testes. A documentação é mantida apenas no repositório do site; não solicite acesso ao GitBook nem envie alterações ao antigo repositório de documentação.

Você também pode [abrir uma issue](https://github.com/CherryHQ/cherry-studio-website/issues) com a URL e uma sugestão. Oculte chaves API e informações pessoais nas capturas.

## Prévia e validação local

Execute os comandos na raiz do repositório e abra `/docs/pt/` no servidor local. Antes de enviar, execute também os comandos de validação abaixo.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

```sh
pnpm docs:test
pnpm build:cn
pnpm docs:verify
```

Corrija os erros de `docs-site/generated/report.json` nas fontes em `content/`, sem editar arquivos gerados. Confira links, imagens, leitura móvel e os passos no produto. Compare as traduções com o original chinês atual.
