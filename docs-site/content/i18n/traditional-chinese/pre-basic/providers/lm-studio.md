# LM Studio

LM Studio 是一款流行的 **本地大模型 GUI**，支援下載、量化並在本機推理各種開源模型。Cherry Studio 可作為前端連接到 LM Studio 的本地服務，在保留本地隱私的同時獲得更好的對話體驗。

## 前置準備

1. 從 [LM Studio 官網](https://lmstudio.ai/) 下載並安裝客戶端
2. 在 LM Studio 中下載至少一個模型（推薦先試 Llama 3.x 8B 或 Qwen 系列）
3. 開啟 LM Studio 頂部 **Server** Tab，點擊 **Start Server**（預設埠 `1234`）

## 在 Cherry Studio 配置

* 開啟 `設定 → 模型服務`，找到 **LM Studio** Provider 進入詳情頁
* **API 位址** 預設 `http://localhost:1234`，如改過 LM Studio 埠請同步修改
* **API 金鑰** 可留空（本地推理無需鑑權），或在 LM Studio 中開啟鑑權後填入
* 點擊 **獲取模型列表**，Cherry Studio 會自動拉取 LM Studio 已載入的模型

{% hint style="info" %}
**模型列表為空？** LM Studio 只暴露 **已 `Load` 到記憶體** 的模型，沒 Load 的不會出現在列表裡。回到 LM Studio 先 Load 模型再來「獲取模型列表」。
{% endhint %}

## 推薦用法

| 場景 | 建議 |
| -------------------- | --------------------------------------------------------------------- |
| 隱私敏感對話 | 選小模型（8B 以下）本機跑，完全離線 |
| Apple Silicon（M 系晶片） | LM Studio 用 MLX 後端，效率顯著高於 llama.cpp |
| 嵌入模型 | LM Studio 也可載入嵌入模型，用於知識庫 |

## 與 Ollama 的區別

| | LM Studio | [Ollama](ollama.md) |
| ---- | ------------- | ------------------- |
| 形態 | 圖形介面 + Server | 命令列 / 背景服務 |
| 模型管理 | GUI 瀏覽/下載 | `ollama pull` |
| API | OpenAI 相容 | OpenAI 相容 |
| 適合 | 偏好圖形互動的使用者 | 偏好命令列 / Docker 部署 |

兩者都可接入 Cherry Studio，按個人偏好選擇即可。

## 常見問題

* **Cherry Studio 連不上**：確認 LM Studio 中 Server 是否已 Start（綠點狀態）
* **回應巨慢**：模型過大 / 顯存不足，換更小模型或更大量化（如 Q4 → Q3）
* **亂碼 / 輸出截斷**：上下文長度超過模型限制，在 LM Studio 中調高 `n_ctx`

***

### 獲取幫助與提交反饋

如果您在配置或使用過程中遇到任何疑問、Bug 或有功能改進建議，請參考 [反饋與建議](../../question-contact/suggestions.md) 中提供的官方渠道。
