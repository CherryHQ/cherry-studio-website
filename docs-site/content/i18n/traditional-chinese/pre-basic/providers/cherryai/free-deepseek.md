# DeepSeek V3.2

Cherry Studio 使用者現在可以透過內建的 **CherryIN** 服務免費體驗 **DeepSeek V3.2**——DeepSeek 於 2025 年 12 月 1 日發布的旗艦級稀疏注意力 MoE 模型，首次將「思考」原生整合到工具呼叫中，是進階 Agent 與長上下文場景的理想選擇。

***

## 什麼是 DeepSeek V3.2？

DeepSeek V3.2 基於 V3.2-Exp 迭代而來，採用 Mixture-of-Experts（MoE）架構，並引入 **DeepSeek Sparse Attention（DSA）** 稀疏注意力機制，在保持超大規模總參數量的同時顯著降低長上下文推理成本。

- 架構：MoE + DeepSeek Sparse Attention（DSA）+ Multi-Head Latent Attention（MLA）
- 總參數量：685B
- 每 Token 激活參數量：約 37B
- 專家數：每層 256 個專家
- 開源許可：MIT
- 發布時間：2025 年 12 月 1 日（V3.2-Exp 於 2025 年 9 月 29 日發布）

V3.2 同時發布了面向 API 的 **DeepSeek-V3.2-Speciale** 版本，在複雜推理任務上取得 IMO、CMO、ICPC World Finals 與 IOI 2025 的金牌級表現。

<figure><img src="../../../../../assets/8ed4c04255cbd56ac0625741.webp" alt=""><figcaption></figcaption></figure>

***

## 延續扎實的訓練與對齊流程

DeepSeek V3.2 沿用了 V3 系列成熟的訓練流水線，並針對 Agent 場景做了關鍵擴展：

1. **大規模預訓練**：在海量高品質多語言語資上完成基礎訓練，覆蓋程式碼、數學與科學知識。
2. **稀疏注意力引入**：在 128K 序列長度下訓練主模型與 lightning indexer，每個 query token 選擇 2048 個 key-value token 參與注意力。
3. **大規模 Agent 數據合成**：覆蓋 1,800+ 環境與 85,000+ 複雜指令的全新 Agent 訓練數據合成方法。
4. **思考與工具呼叫融合**：V3.2 是 DeepSeek 首個將「思考」原生整合到工具呼叫中的模型，支持在「思考模式」與「非思考模式」下均可呼叫工具。

<figure><img src="../../../../../assets/58623875cc487b3cbbd60955.jpeg" alt=""><figcaption></figcaption></figure>

***

## 旗艦級核心能力

DeepSeek V3.2 主打「與 GPT-5 水平相當」的綜合能力，並在 Agent 與複雜推理上大幅強化：

- ✅ **原生思考 + 工具呼叫**：首個將 thinking 整合進 tool-use 的 DeepSeek 模型
- ✅ **頂級推理能力**：V3.2-Speciale 在 IMO / CMO / ICPC World Finals / IOI 2025 上達到金牌水平
- ✅ **程式碼與開發任務**：繼承 V3 系列強程式碼能力
- ✅ **長上下文穩定性**：DSA 帶來的長文件與程式碼庫級分析能力
- ✅ **結構化工具呼叫**：適合構建多步規劃與執行的 Agent

<figure><img src="../../../../../assets/b271db8ec88f1910b620786b.webp" alt=""><figcaption></figcaption></figure>

***

## DeepSeek Sparse Attention：更長、更省

DSA 是 V3.2 的核心技術升級，透過 **lightning indexer + 細粒度 token 選擇** 實現：

- 首次在大模型上實現細粒度稀疏注意力
- 將核心注意力複雜度從 O(L²) 降低
- 在長上下文訓練與推理上顯著提速，同時保持與稠密注意力幾乎一致的輸出品質

| 場景 | 推薦用法 | 示例 |
| --- | --- | --- |
| 短對話 / 簡單問答 | 直接呼叫 | 日常問答、摘要 |
| 中等複雜任務 | 啟用工具呼叫 | 數據分析、程式碼重構 |
| 複雜 Agent 任務 | 思考 + 工具呼叫 | 多步規劃、程式碼庫分析、長文件審閱 |

***

## 開放、可用、生態友好

- ⚡ DSA 帶來的長上下文推理加速
- 💰 透過 CherryIN 在 Cherry Studio 中 **免費使用**
- 🖥️ 開源權重、MIT 許可，vLLM、SGLang 等主流推理框架 Day-0 支持

<figure><img src="../../../../../assets/b35d1fa4d3aa4dceba690581.webp" alt=""><figcaption></figcaption></figure>

***

## 聚焦實用能力：程式碼與 Agent

DeepSeek V3.2 在實際開發工作流中表現尤為出色：

- 多語言程式碼生成與重構
- 程式碼倉庫級上下文理解與補丁生成
- Agent 工具鏈：穩定呼叫外部工具、搜尋、程式碼執行
- 數學與複雜推理：支持競賽級題目

***

## 如何在 Cherry Studio 中使用？

1. 開啟 Cherry Studio，進入 **設定 → 模型服務**。
2. 找到 **CherryIN** 服務供應商並開啟。
3. 在模型列表中選擇 **DeepSeek V3.2**。
4. 返回聊天介面，在頂部模型選擇處切換為 **DeepSeek V3.2** 即可開始對話。

> 💡 提示：CherryIN 提供的免費模型額度由 Cherry Studio 官方承擔，適合日常體驗與評測；生產環境建議結合 DeepSeek 官方 API 使用。

***

📘 **立即體驗 DeepSeek V3.2，開啟旗艦級推理與 Agent 之旅！**

***

### 獲取幫助與提交反饋

如果您在設定或使用過程中遇到任何疑問、Bug 或有功能改進建議，請參考 [反饋與建議](../../../question-contact/suggestions.md) 中提供的官方渠道。
