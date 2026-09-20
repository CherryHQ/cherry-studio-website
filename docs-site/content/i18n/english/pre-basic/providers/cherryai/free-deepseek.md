# DeepSeek V3.2

Cherry Studio users can now experience **DeepSeek V3.2** for free via the built-in **CherryIN** service. Released on December 1, 2025, this flagship sparse attention MoE model natively integrates "thinking" into tool calling, making it an ideal choice for advanced Agents and long-context scenarios.

***

## What is DeepSeek V3.2?

DeepSeek V3.2 is an iteration based on V3.2-Exp, utilizing a Mixture-of-Experts (MoE) architecture and introducing the **DeepSeek Sparse Attention (DSA)** mechanism. This significantly reduces long-context inference costs while maintaining a massive total parameter count.

- Architecture: MoE + DeepSeek Sparse Attention (DSA) + Multi-Head Latent Attention (MLA)
- Total Parameters: 685B
- Active Parameters per Token: ~37B
- Experts: 256 experts per layer
- Open Source License: MIT
- Release Date: December 1, 2025 (V3.2-Exp released on September 29, 2025)

V3.2 also includes the **DeepSeek-V3.2-Speciale** version for API use, achieving gold-medal-level performance on IMO, CMO, ICPC World Finals, and IOI 2025 complex reasoning tasks.

<figure><img src="../../../../../assets/8ed4c04255cbd56ac0625741.webp" alt=""><figcaption></figcaption></figure>

***

## Refined Training and Alignment Pipeline

DeepSeek V3.2 follows the mature training pipeline of the V3 series, with key extensions for Agent scenarios:

1. **Large-Scale Pre-training**: Foundation training on massive, high-quality multilingual corpora covering code, mathematics, and scientific knowledge.
2. **Sparse Attention Integration**: Trains the main model and lightning indexer at 128K sequence length, where each query token selects 2048 key-value tokens for attention.
3. **Large-Scale Agent Data Synthesis**: A new Agent training data synthesis method covering 1,800+ environments and 85,000+ complex instructions.
4. **Thinking and Tool Calling Fusion**: V3.2 is the first DeepSeek model to natively integrate "thinking" into tool calling, supporting tool usage in both "thinking mode" and "non-thinking mode."

<figure><img src="../../../../../assets/58623875cc487b3cbbd60955.jpeg" alt=""><figcaption></figcaption></figure>

***

## Flagship Core Capabilities

DeepSeek V3.2 offers comprehensive capabilities comparable to GPT-5, with significant enhancements in Agent and complex reasoning:

- ✅ **Native Thinking + Tool Calling**: The first DeepSeek model to integrate thinking into tool-use
- ✅ **Top-Tier Reasoning**: V3.2-Speciale achieves gold-medal level performance on IMO / CMO / ICPC World Finals / IOI 2025
- ✅ **Code and Development Tasks**: Inherits the strong coding capabilities of the V3 series
- ✅ **Long-Context Stability**: DSA enables long-document and codebase-level analysis
- ✅ **Structured Tool Calling**: Ideal for building Agents with multi-step planning and execution

<figure><img src="../../../../../assets/b271db8ec88f1910b620786b.webp" alt=""><figcaption></figcaption></figure>

***

## DeepSeek Sparse Attention: Longer, More Efficient

DSA is the core technical upgrade in V3.2, implemented via **lightning indexer + fine-grained token selection**:

- First implementation of fine-grained sparse attention in large models
- Reduces core attention complexity from O(L²)
- Significantly accelerates long-context training and inference while maintaining output quality nearly identical to dense attention

| Scenario | Recommended Usage | Example |
| --- | --- | --- |
| Short conversations / Simple Q&A | Direct call | Daily Q&A, summarization |
| Medium-complexity tasks | Enable tool calling | Data analysis, code refactoring |
| Complex Agent tasks | Thinking + Tool calling | Multi-step planning, codebase analysis, long-document review |

***

## Open, Accessible, and Ecosystem-Friendly

- ⚡ Long-context inference acceleration via DSA
- 💰 **Free access** in Cherry Studio via CherryIN
- 🖥️ Open-source weights, MIT license, Day-0 support for mainstream inference frameworks like vLLM and SGLang

<figure><img src="../../../../../assets/b35d1fa4d3aa4dceba690581.webp" alt=""><figcaption></figcaption></figure>

***

## Focused on Practical Capabilities: Code and Agents

DeepSeek V3.2 excels in real-world development workflows:

- Multilingual code generation and refactoring
- Code repository-level context understanding and patch generation
- Agent toolchain: Stable invocation of external tools, search, and code execution
- Mathematics and complex reasoning: Supports competition-level problems

***

## How to Use in Cherry Studio?

1. Open Cherry Studio and go to **Settings → Model Services**.
2. Find the **CherryIN** provider and enable it.
3. Select **DeepSeek V3.2** from the model list.
4. Return to the chat interface and switch to **DeepSeek V3.2** in the top model selector to start chatting.

> 💡 Tip: The free model quota provided by CherryIN is covered by Cherry Studio officially, making it suitable for daily experience and evaluation. For production environments, it is recommended to use the official DeepSeek API.

***

📘 **Experience DeepSeek V3.2 now and embark on a journey of flagship-level reasoning and Agents!**

***

### Get Help and Submit Feedback

If you have any questions, encounter bugs, or have feature improvement suggestions during configuration or usage, please refer to the official channels provided in [Feedback and Suggestions](../../../question-contact/suggestions.md).
