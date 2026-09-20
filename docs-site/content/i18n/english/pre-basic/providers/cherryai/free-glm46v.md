# Zhipu GLM-4.6V

Cherry Studio users can now experience **Zhipu GLM-4.6V** for free via the built-in **CherryIN** service. Released by Z.ai (Zhipu AI) in December 2025, this visual flagship model features a MoE architecture, 128K native multimodal context, and native multimodal tool calling, making it the preferred choice for image-text understanding and multimodal Agent scenarios.

***

## What is GLM-4.6V?

GLM-4.6V is the latest generation of visual language models in the Z.ai GLM-V series. It natively supports unified modeling of text and images, further expanding context and tool-calling capabilities compared to GLM-4.5V.

- Architecture: Mixture-of-Experts (MoE)
- Total Parameters: 106B
- Active Parameters: ~12B
- Context Length: 128K tokens
- Open Source License: MIT
- Release Date: December 8–9, 2025
- Visual Encoder: Supports multi-resolution images (up to 4K)

The series also includes **GLM-4.6V-Flash (9B)**, designed for local and low-latency scenarios, with free commercial use.

<figure><img src="../../../../../assets/05dc257d349bcc5aa0d51f78.webp" alt=""><figcaption></figcaption></figure>

***

## Continuation of the GLM-V Multimodal Training System

GLM-4.6V follows the technical roadmap of GLM-4.1V-Thinking / GLM-4.5V, with further enhancements in vision and Agent capabilities:

1. **Native Multimodal Modeling**: Joint training of text and images, supporting mixed image-text input
2. **Context Expansion**: Training context extended to 128K tokens, capable of processing ~150 pages of dense documents, 200 slides, or 1 hour of video in a single pass
3. **Native Multimodal Tool Calling**: Tools can directly receive and return images, handling multimodal artifacts via URLs based on the extended MCP protocol
4. **Reinforcement Learning Enhancement**: Retains the scalable RL process from the GLM-V series

<figure><img src="../../../../../assets/15737d0c9c7d3f0a6bfcd9fd.jpeg" alt=""><figcaption></figcaption></figure>

***

## Native Multimodality for Real-World Scenarios

GLM-4.6V's multimodal capabilities cover both daily and professional use cases:

- ✅ **Rich Text Content Understanding**: Long documents, multi-page text, and mixed image-text layouts
- ✅ **Visual Web Search**: Combining visual input with online retrieval and understanding
- ✅ **Frontend Replication**: Generating frontend code from design drafts or UI screenshots
- ✅ **Long-Context Multimodal Document Analysis**: Full PDF / slide deck / video-level input
- ✅ **Chart and Table Parsing**: Structured information extraction

***

## Native Multimodal Tool Calling and Agent Capabilities

A core upgrade in GLM-4.6V is the **"Visual Perception → Executable Action"** loop: tool calling natively supports images as both input and output, enabling multimodal Agents to function in real-world business scenarios.

| Scenario | Recommended Usage | Example |
| --- | --- | --- |
| Simple Image-Text Q&A | Direct conversation | "What is in this image?" |
| Moderate Complexity Tasks | Enable tool calling | Read a chart, then retrieve data |
| Complex Multimodal Agent | Multiple tools + MCP | Screenshot → Understand → Call API → Generate Report |

***

## Efficient MoE, Openly Available

- ⚡ MoE Sparse Activation: 106B total parameters, only ~12B active
- 💰 **Free to use** via CherryIN in Cherry Studio
- 🖥️ Weights, inference code, and MCP tools are open-sourced on GitHub and Hugging Face under the MIT license

***

## Focused Practical Capabilities: Multimodal Assistant

GLM-4.6V is suitable for the following scenarios in practical use:

- **Document Assistant**: Reading and summarizing long documents, scans, and full slide decks
- **Data Analysis**: Recognizing and interpreting charts and dashboard screenshots
- **Frontend and Design**: Generating or modifying frontend code based on UI screenshots
- **Visual Search**: Combining images with online retrieval and information integration
- **Multimodal Agent**: Completing complex tasks by combining tools like browsers, code execution, and retrieval

***

## How to Use in Cherry Studio?

1. Open Cherry Studio and go to **Settings → Model Services**.
2. Find the **CherryIN** provider and enable it.
3. Select **Zhipu GLM-4.6V** from the model list.
4. Return to the chat interface, switch to **GLM-4.6V** in the top model selector, and upload images directly in the conversation for image-text interaction.

> 💡 Tip: The free model quota provided by CherryIN is covered by Cherry Studio officially, making it suitable for daily experience and evaluation. For production environments, it is recommended to use the official Z.ai (Zhipu) API.

***

📘 **Try Zhipu GLM-4.6V now and unlock native multimodal and visual Agent capabilities!**

***

### Get Help and Submit Feedback

If you have any questions, bugs, or feature improvement suggestions during configuration or usage, please refer to the official channels provided in [Feedback and Suggestions](../../../question-contact/suggestions.md).
