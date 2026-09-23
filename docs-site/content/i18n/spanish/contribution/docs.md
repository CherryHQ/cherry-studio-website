---
icon: book-open
---

<a id="documentación-de-contribuciones"></a>

# Contribuir a la documentación

## Proponer cambios

1. Usa **Edit on GitHub** al final de la página para abrir el [repositorio del sitio](https://github.com/CherryHQ/cherry-studio-website). Edita el archivo en tu rama o fork.

2. Las fuentes están en `docs-site/content/` y las traducciones en las carpetas de idioma de `i18n/`. Al añadir, mover o eliminar páginas, actualiza el `SUMMARY.md` del idioma. Guarda las imágenes en `docs-site/content/assets/` y usa rutas relativas.

3. Tras previsualizar y comprobar los cambios, abre una Pull Request hacia `main`. Explica el problema, las páginas modificadas y la validación. La documentación se mantiene solo en el repositorio del sitio; ya no se solicita acceso a GitBook ni se modifica el antiguo repositorio de documentación.

También puedes [abrir una issue](https://github.com/CherryHQ/cherry-studio-website/issues) con la URL y una corrección sugerida. Oculta claves API y datos personales en las capturas.

## Vista previa y validación

Ejecuta estos comandos desde la raíz del repositorio y abre `/docs/es/` en el servidor local. Antes de enviar, ejecuta también los comandos de validación siguientes.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

```sh
pnpm docs:test
pnpm build:cn
pnpm docs:verify
```

Corrige los errores de `docs-site/generated/report.json` editando `content/`, no los archivos generados. Revisa enlaces, imágenes, lectura móvil y pasos reales del producto. Contrasta las traducciones con el original chino actual.
