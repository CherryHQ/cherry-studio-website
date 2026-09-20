---
icon: book-open
---

# Contribuer à la documentation

## Proposer une modification

1. Utilisez **Edit on GitHub** en bas de la page pour ouvrir le [dépôt du site](https://github.com/CherryHQ/cherry-studio-website). Modifiez le fichier dans votre branche ou votre fork.

2. Les sources sont dans `docs-site/content/`, les traductions dans les répertoires de langue sous `i18n/`. Mettez à jour le `SUMMARY.md` de la langue si vous ajoutez, déplacez ou supprimez une page. Placez les images dans `docs-site/content/assets/` avec des liens relatifs.

3. Après prévisualisation et vérification, ouvrez une Pull Request vers `main`. Décrivez le problème, les pages modifiées et les vérifications effectuées. La documentation est maintenue uniquement dans le dépôt du site : aucune demande d’accès GitBook ni modification dans l’ancien dépôt documentaire n’est nécessaire.

Vous pouvez aussi [ouvrir une issue](https://github.com/CherryHQ/cherry-studio-website/issues) avec l’URL de la page et une correction proposée. Masquez les clés API et les informations personnelles dans les captures.

## Prévisualisation et vérification

Exécutez ces commandes à la racine du dépôt et ouvrez `/docs/fr/` sur le serveur local. Avant la soumission, lancez aussi les commandes de validation ci-dessous.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

```sh
pnpm docs:test
pnpm build:cn
pnpm docs:verify
```

Corrigez les erreurs de `docs-site/generated/report.json` dans les sources de `content/`, sans modifier les fichiers générés. Vérifiez les liens, images, affichages mobiles et étapes dans le produit. Comparez les traductions avec la version chinoise actuelle.
