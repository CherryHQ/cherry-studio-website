---
icon: terminal
---
# 環境相依性

環境相依性用來 **管理 Cherry Studio 執行部分進階功能所需的二進位工具與執行環境**。例如 [MCP 服務](../../advanced-basic/extensions/mcp)、[技能](../../advanced-basic/extensions/skills.md)、[Agent](../../advanced-basic/agent.md) 的某些能力，底層需要呼叫 `uv`、`bun` 等命令列工具。Cherry Studio 將這些工具集中在此處，讓您不必手動透過命令列進行安裝與設定。

開啟 `設定 → 環境相依性`：

<figure><img src="../../../../assets/edd81af2d8627638562b77e3.webp" alt=""><figcaption><p>環境相依性：內建與可安裝的工具</p></figcaption></figure>

### 內建與可安裝

每個工具以卡片形式呈現，並標示狀態：

* 標有 <mark style="color:blue;">**內建**</mark> 的工具隨 Cherry Studio 一起發布，開箱即用，無需任何操作。
* 未安裝的工具卡片上會出現 **安裝** 按鈕，點擊後即可由 Cherry Studio 自動下載並安裝至應用程式目錄，不會污染您的系統環境。
* 卡片上提供原始碼儲存庫、官方文件連結，以及開啟本地安裝目錄的入口。

常見工具一覽：

| 工具 | 用途 |
| --- | --- |
| **uv** | 用於 MCP 服務與相依性安裝的 Python 套件管理工具 |
| **Bun** | MCP 服務及相關工具鏈使用的 JavaScript 執行環境 |
| **fd** | 快速檔案搜尋工具，`find` 的替代品 |
| **ripgrep (rg)** | 快速文字搜尋工具，`grep` 的替代品 |
| **RTK** | 壓縮終端機輸出、減少 LLM token 消耗的 CLI 代理工具 |
| **Lark CLI** | 飛書官方 CLI，涵蓋訊息 / 文件 / 多維表格 / 日曆等 200+ 命令 |

頁面還以卡片列出 `gh`（GitHub CLI）、`ntn`（Notion CLI）、`pi` 等工具，可依需求一鍵安裝。（程式設計類 CLI 如 Claude Code / Codex 在 [編碼夥伴](../../cherrystudio/preview/code-cli.md) 頁管理，不在此頁。）

### 新增工具

頁面右上角的「**新增工具**」可使用 mise 工具鍵，加入內建清單以外的工具（例如 `github:sharkdp/fd`、`uv`、`bun`）。

### 進階安裝設定

點擊右上角的設定圖示開啟「**進階安裝設定**」，微調工具的下載方式（欄位均可留空以使用預設值）：

* **GitHub 鏡像**：為 GitHub Release 下載加入代理前綴（如 `https://ghfast.top`），在直連不順暢時使用。
* **GitHub 令牌**：提高查詢工具時的 GitHub API 速率限制（以明文形式儲存在本地）。
* **npm 鏡像源 / pip 索引位址**：為 `npm:` / `pipx:` 類工具設定鏡像（留空則在中國大陸自動選擇鏡像）。
* **驗證工具簽章**：驗證工具的 Sigstore / SLSA 簽章，一般建議保持開啟。

{% hint style="info" %}
一般使用者通常無需在此處進行操作——當需要某個工具時，相關功能（例如安裝某個 MCP 服務）通常會引導您回到這裡一鍵安裝。這個頁面更像是一個「執行環境健康檢查與補齊」的入口。
{% endhint %}

{% hint style="warning" %}
如果某個 MCP 服務或技能報錯提示「找不到 uv / bun / 命令不存在」，請先來這裡確認對應工具是否已安裝或為「內建」狀態（安裝狀態會自動更新；右上角那個按鈕是 **檢查更新**，用於拉取工具的最新版本）。
{% endhint %}

***

### 取得協助與提交回饋

如果您在設定或使用過程中遇到任何疑問、Bug 或有功能改進建議，請參考 [回饋與建議](../../question-contact/suggestions.md) 中提供的官方管道。
