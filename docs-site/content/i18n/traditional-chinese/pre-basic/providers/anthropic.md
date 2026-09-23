# Anthropic

Anthropic 的 Claude 是目前最適合作為 [Cherry Agent](../../advanced-basic/agent.md) 後端的模型之一，因為 Agent 需要 Anthropic 協定端點。

## 取得 API Key

* 前往 [Anthropic Console](https://console.anthropic.com/) 註冊帳號
* 進入 `Settings → API Keys` → `Create Key`，複製產生的 `sk-ant-...` 金鑰

## 在 Cherry Studio 設定

* 開啟 `設定 → 模型服務`，找到 **Anthropic** Provider 進入詳細頁面
* 在 **API 金鑰** 中填入 `sk-ant-...`
* **API 位址** 預設為 `https://api.anthropic.com`，無需修改
* 點擊 **取得模型清單**，新增 `claude-opus-4`、`claude-sonnet-4`、`claude-haiku-4` 等模型

## 推薦用法

| 模型 | 適用情境 |
|---|---|
| `claude-opus-4` | 最強推理 / 程式設計 / 複雜 Agent 任務 |
| `claude-sonnet-4` | 通用對話與日常 Agent，性價比首選 |
| `claude-haiku-4` | 高吞吐量情境、低成本快速回應 |

## Agent 情境設定

將該 Provider 在 [Cherry Agent](../../advanced-basic/agent.md) 設定時選為預設模型來源，即可直接獲得 Anthropic 協定 Agent 能力。

{% hint style="info" %}
* 中國大陸無法直接存取 Anthropic API，需自行準備代理（參考 [一般設定 → 代理模式](../settings/general.md)）
* 訂閱了 Claude Code 的使用者也可使用同一個 key + endpoint 接入 Cherry Studio
* Claude 模型依 token 計費，長上下文請留意用量
{% endhint %}

***

### 取得協助與提交回饋

如果您在設定或使用過程中遇到任何疑問、Bug 或有功能改進建議，請參考 [回饋與建議](../../question-contact/suggestions.md) 中提供的官方管道。
