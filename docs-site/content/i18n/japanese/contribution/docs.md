---
icon: book-open
---

# ドキュメントへの貢献

## 変更を提案する

1. ページ下部の **Edit on GitHub** から[ウェブサイトのリポジトリ](https://github.com/CherryHQ/cherry-studio-website)を開き、自分のブランチまたはフォークで編集します。

2. 原稿は `docs-site/content/`、翻訳は `i18n/` の各言語ディレクトリにあります。ページの追加・移動・削除時は、その言語の `SUMMARY.md` も更新します。画像は `docs-site/content/assets/` に保存し、相対パスで参照します。

3. プレビューと検証の後、`main` に Pull Request を作成し、問題、変更したページ、確認方法を説明します。文書はウェブサイトのリポジトリだけで管理します。GitBook の編集権限の申請や旧文書リポジトリへの変更は不要です。

直接編集できない場合は、ページ URL と修正案を添えて [Issue を作成](https://github.com/CherryHQ/cherry-studio-website/issues)できます。画像内の API Key や個人情報は隠してください。

## ローカルでの確認

リポジトリのルートで以下を実行し、ローカルの `/docs/ja/` を開きます。提出前に下の検証コマンドも実行してください。

```sh
pnpm install --frozen-lockfile
pnpm dev
```

```sh
pnpm docs:test
pnpm build:cn
pnpm docs:verify
```

`docs-site/generated/report.json` のエラーは `content/` の原稿を修正して解決します。生成ファイルは編集しないでください。リンク、画像、モバイル表示、製品の操作手順を確認し、翻訳は最新の中国語原文と照合します。
