# Cherry Studio documentation

Fumadocs UI + Next.js static export, mounted at `/docs`. The marketing site remains React 18/Vite; the isolated workspace uses React 19. Node 24 and the root pnpm version are used for both.

## Local development

```sh
pnpm install --frozen-lockfile
VITE_SITE_LOCALE=zh pnpm dev --host 0.0.0.0
```

The root dev command compiles local content and watches Markdown/image changes, starts Next.js on port 3001 and Vite on its normal port. Vite proxies `/docs` to Next.js. Open `/docs/zh-cn/` or `/docs/en/` on the Vite address. `/docs/` is a language chooser during development.

For documentation only: `pnpm docs:dev` (http://localhost:3001/docs/zh-cn/).

## Editing documentation

`content/` is the authoritative documentation source, tracked in this repository. Edit Markdown and images here; there is no external Git checkout, version lock or synchronization step. Simplified Chinese lives at `content/`, English at `content/i18n/english/`, and other language directories are defined in `locales.json`. Update each language's `SUMMARY.md` when adding or moving pages.

Run `pnpm docs:generate` to compile local Markdown, navigation and search indexes. `pnpm dev` and `pnpm docs:dev` watch content changes and regenerate automatically. Production builds generate content before exporting pages. Edit source files, never `generated/`, `public/content-assets/` or `out/`.

The initial import includes lossless WebP image conversions with updated source references. Shared images and attachments live in `content/assets/`; identical imported assets are stored once across languages. Add compressed images there and use relative references; GIF animations and oversized screenshots can retain their original formats. Build output deduplicates identical attachments by content hash.

`locales.json` lists the nine supported languages. `page-aliases.json` maps older translation filenames to the corresponding current source paths. An existing translation is not assumed to be current: translated pages show a notice. Missing translations render Chinese with an explicit notice and `noindex`; their canonical points to the Chinese original. A language switch keeps the current article when available, otherwise it opens the target language home.

GitBook Markdown is parsed as Markdown/HTML, **not executed as MDX**. Sanitization removes executable HTML. Hints, headings, figures, tables, details and code are retained. GitBook tabs are presented as expanded titled sections; embeds become direct links. This preserves access to all content in a static export. `SUMMARY.md` supplies each language's navigation, with untranslated current pages in a separate section. GitBook Chinese pinyin anchors and Markdown Unicode anchors are retained where derivable.

Images/attachments are copied by content hash and deduplicated. Generated content, copied assets, search indexes and build outputs are ignored by Git. `generated/report.json` lists source defects: missing links, images and anchors. Missing images are shown as a source link rather than a broken image. Unknown GitBook tags and missing includes fail generation. Fix reported source defects directly in `content/`; imported translations may contain historical broken references.

## Build and verification

```sh
pnpm docs:test
pnpm build:cn  # website + local content + docs + merge into dist/docs
pnpm build:en
pnpm docs:verify # validate exported article/resource URLs and search indexes
```

Every document is exported to an HTML file. Search indexes are generated separately per language and loaded by Fumadocs on demand. No Next.js server is needed in production. `src/app/styles.css` is only the required Tailwind/Fumadocs import entry; custom styling lives in Tailwind classes.

The TypeScript React path mappings keep React 18 types from the parent Vite app out of the React 19 documentation app.

## Hosting and migration

Deploy the **complete `dist` directory**. The root release command includes docs before running rsync with `--delete`. Docker installs both workspaces and builds the same combined artifact. Document generation does not require Git or access to the former documentation repository.

`nginx.conf` gives `/docs` its own static-file handling and 404, before the marketing SPA fallback. `/docs` and `/docs/` redirect to `zh-cn` on the Chinese domain and `en` otherwise. Both hosts serve all languages. Other hosting platforms must implement the same directory-index and 404 rules. A static redirect page is included as a fallback.

Chinese pages use `cherryai.com.cn` as canonical; all other languages use `cherryai.com`. Both exports include all languages; their docs sitemaps list only the host's canonical, translated pages. Language alternates omit missing translations.

The old `docs.cherryai.com.cn` domain is **not changed by this repository**. After the new site is deployed and checked, configure that host to redirect to the new language paths. `generated/legacy-redirects.json` records source paths and known filename aliases; use it to create explicit redirects and preserve query strings. Browser fragments cannot be matched by HTTP redirects; heading anchors must remain compatible. Review historical production URLs before enabling a broad fallback redirect. Roll back by redeploying the previous complete website artifact.
