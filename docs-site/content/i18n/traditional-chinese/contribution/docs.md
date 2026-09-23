---
icon: book-open
---

# 貢獻文件

## 提交修改

1. 點擊頁面底部的 **在 GitHub 編輯**，前往[網站儲存庫](https://github.com/CherryHQ/cherry-studio-website)，在自己的分支或 Fork 修改原始檔。

2. 文件位於 `docs-site/content/`，翻譯位於 `i18n/` 對應語言目錄。新增、移動或刪除頁面時，更新該語言的 `SUMMARY.md`。圖片放在 `docs-site/content/assets/`，使用相對路徑。

3. 預覽並檢查後，向 `main` 提交 Pull Request，說明問題、修改頁面及驗證方式。文件只在網站儲存庫維護，不再申請 GitBook 權限或向舊文件儲存庫提交修改。

無法直接修改時，可[建立 Issue](https://github.com/CherryHQ/cherry-studio-website/issues)，附上頁面網址與建議。截圖請遮蔽 API Key 和私人資訊。

## 本機預覽與檢查

在網站儲存庫根目錄執行以下命令，開啟本機的 `/docs/zh-tw/`。提交前執行下方驗證命令。

```sh
pnpm install --frozen-lockfile
pnpm dev
```

```sh
pnpm docs:test
pnpm build:cn
pnpm docs:verify
```

透過修改 `content/` 修復 `docs-site/generated/report.json` 的錯誤，不要修改產生的檔案。檢查連結、圖片、手機閱讀和實際操作；翻譯需核對最新簡體中文原文。
