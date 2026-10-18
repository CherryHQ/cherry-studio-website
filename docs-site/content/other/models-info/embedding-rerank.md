# 嵌入与重排

数据来自 Cherry Studio 内置模型目录（[provider-registry](https://github.com/CherryHQ/cherry-studio/tree/main/packages/provider-registry)），随应用仓库自动同步；表中 `-` 表示数据源未提供该字段，信息仅供参考。

> **数据更新时间**: 2026-10-18 10:11:36 UTC / 2026-10-18 18:11:36 CST (北京时间)

<div data-models-table="num:3,4;sort:2;cap:5:识图,语音识别,识视频,文件输入,嵌入,重排;in:6:图片输入=图片,音频输入=音频,视频输入=视频;out:7:文本输出=文本,向量输出=向量">

| 模型名称 | API ID | 服务商 | 上下文长度 | 最大输出 | 能力 | 输入模态 | 输出模态 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Qwen3 Embedding 0.6B | qwen3-embedding-0-6b | alibaba | 32,768 | 32,768 | 嵌入 | 文本 | 向量 |
| Qwen3 Embedding 4B | qwen3-embedding-4b | alibaba | 32,768 | 32,768 | 嵌入 | 文本 | 向量 |
| Qwen3 Embedding 8B | qwen3-embedding-8b | alibaba | 32,768 | 32,768 | 嵌入 | 文本 | 向量 |
| Qwen3 Reranker 0.6B | qwen3-reranker-0-6b | alibaba | 32,768 | - | 重排 | 文本 | - |
| Qwen3 Reranker 4B | qwen3-reranker-4b | alibaba | 32,768 | - | 重排 | 文本 | - |
| Qwen3 Reranker 8B | qwen3-reranker-8b | alibaba | 32,768 | - | 重排 | 文本 | - |
| Titan Text Embeddings V2 | titan-embed-text-v2 | amazon | 8,192 | 1,536 | 嵌入 | 文本 | 向量 |
| BGE Base EN v1.5 | bge-base-en-v1-5 | baai | 512 | - | 嵌入 | 文本 | 向量 |
| BGE Base ZH v1.5 | bge-base-zh-v1-5 | baai | 512 | - | 嵌入 | 文本 | 向量 |
| BGE Large EN v1.5 | bge-large-en-v1-5 | baai | 512 | - | 嵌入 | 文本 | 向量 |
| BGE Large ZH v1.5 | bge-large-zh-v1-5 | baai | 512 | - | 嵌入 | 文本 | 向量 |
| BGE M3 | bge-m3 | baai | 8,192 | 1,024 | 嵌入 | 文本 | 向量 |
| BGE Multilingual Gemma2 | bge-multilingual-gemma2 | baai | 8,192 | - | 嵌入 | 文本 | 向量 |
| BGE Reranker Base | bge-reranker-base | baai | 512 | - | 重排 | 文本 | - |
| BGE Reranker Large | bge-reranker-large | baai | 512 | - | 重排 | 文本 | - |
| BGE Reranker v2 Gemma | bge-reranker-v2-gemma | baai | 8,192 | - | 重排 | 文本 | - |
| BGE Reranker v2 M3 | bge-reranker-v2-m3 | baai | 8,192 | - | 重排 | 文本 | - |
| BGE Small EN v1.5 | bge-small-en-v1-5 | baai | 512 | - | 嵌入 | 文本 | 向量 |
| BGE Small ZH v1.5 | bge-small-zh-v1-5 | baai | 512 | - | 嵌入 | 文本 | 向量 |
| Doubao Embedding Large Text | doubao-embedding-large-text | bytedance | - | - | 嵌入 | 文本 | 向量 |
| Doubao Embedding Text | doubao-embedding-text | bytedance | - | - | 嵌入 | 文本 | 向量 |
| Doubao Embedding Vision | doubao-embedding-vision | bytedance | 131,072 | - | 嵌入 | 文本、图片、视频 | 向量 |
| Embed English Light v3.0 | embed-english-light-v3-0 | cohere | 512 | - | 嵌入 | 文本 | 向量 |
| Embed English v3.0 | embed-english-v3-0 | cohere | 512 | - | 嵌入 | 文本、图片 | 向量 |
| Embed Multilingual Light v3.0 | embed-multilingual-light-v3-0 | cohere | 512 | - | 嵌入 | 文本 | 向量 |
| Embed Multilingual v3.0 | embed-multilingual-v3-0 | cohere | 512 | - | 嵌入 | 文本、图片 | 向量 |
| Embed v4.0 | embed-v4-0 | cohere | 131,072 | 1,536 | 嵌入 | 文本、图片 | 向量 |
| Rerank English v3.0 | rerank-english-v3-0 | cohere | 4,096 | - | 重排 | 文本 | - |
| Rerank Multilingual v3.0 | rerank-multilingual-v3-0 | cohere | 4,096 | - | 重排 | 文本 | - |
| Rerank v3.5 | rerank-v3-5 | cohere | 4,096 | 4,096 | 重排 | 文本 | 文本 |
| Rerank v4 Fast | rerank-v4-fast | cohere | 32,768 | 32,000 | 重排 | 文本 | 文本 |
| Rerank v4 Pro | rerank-v4-pro | cohere | 32,768 | 32,000 | 重排 | 文本 | 文本 |
| Gemini Embedding 001 | gemini-embedding-001 | google | 8,192 | 1,536 | 嵌入 | 文本 | 向量 |
| Gemini Embedding 2 | gemini-embedding-2 | google | 8,192 | 1 | 识图、语音识别、识视频、文件输入、嵌入 | 文本、图片、音频、视频 | 向量 |
| Gemini Embedding 2 Preview | gemini-embedding-2-preview | google | 8,192 | - | 嵌入、识图、语音识别、识视频、文件输入 | 文本、图片、音频、视频 | 向量 |
| Text Embedding 005 | text-embedding-005 | google | 8,192 | 1,536 | 嵌入 | 文本 | 向量 |
| Text Multilingual Embedding 002 | text-multilingual-embedding-002 | google | 8,192 | 1,536 | 嵌入 | 文本 | 向量 |
| Jina CLIP v1 | jina-clip-v1 | jina | 8,192 | - | 嵌入 | 文本、图片 | 向量 |
| Jina CLIP v2 | jina-clip-v2 | jina | 8,192 | - | 嵌入 | 文本、图片 | 向量 |
| Jina Code Embeddings 0.5B | jina-code-embeddings-0-5b | jina | 32,768 | - | 嵌入 | 文本 | 向量 |
| Jina Code Embeddings 1.5B | jina-code-embeddings-1-5b | jina | 32,768 | - | 嵌入 | 文本 | 向量 |
| Jina ColBERT v1 EN | jina-colbert-v1-en | jina | 8,192 | - | 嵌入、重排 | 文本 | 向量 |
| Jina ColBERT v2 | jina-colbert-v2 | jina | 8,192 | - | 嵌入、重排 | 文本 | 向量 |
| Jina Embedding B EN v1 | jina-embedding-b-en-v1 | jina | 512 | - | 嵌入 | 文本 | 向量 |
| Jina Embeddings v2 Base Code | jina-embeddings-v2-base-code | jina | 8,192 | - | 嵌入 | 文本 | 向量 |
| Jina Embeddings v2 Base DE | jina-embeddings-v2-base-de | jina | 8,192 | - | 嵌入 | 文本 | 向量 |
| Jina Embeddings v2 Base EN | jina-embeddings-v2-base-en | jina | 8,192 | - | 嵌入 | 文本 | 向量 |
| Jina Embeddings v2 Base ES | jina-embeddings-v2-base-es | jina | 8,192 | - | 嵌入 | 文本 | 向量 |
| Jina Embeddings v2 Base ZH | jina-embeddings-v2-base-zh | jina | 8,192 | - | 嵌入 | 文本 | 向量 |
| Jina Embeddings v3 | jina-embeddings-v3 | jina | 8,192 | - | 嵌入 | 文本 | 向量 |
| Jina Embeddings v4 | jina-embeddings-v4 | jina | 32,768 | - | 嵌入 | 文本、图片 | 向量 |
| Jina Embeddings v5 Omni Nano | jina-embeddings-v5-omni-nano | jina | 8,192 | - | 嵌入 | 文本、图片 | 向量 |
| Jina Embeddings v5 Omni Small | jina-embeddings-v5-omni-small | jina | 32,768 | - | 嵌入 | 文本、图片 | 向量 |
| Jina Embeddings v5 Text Nano | jina-embeddings-v5-text-nano | jina | 8,192 | - | 嵌入 | 文本 | 向量 |
| Jina Embeddings v5 Text Small | jina-embeddings-v5-text-small | jina | 32,768 | - | 嵌入 | 文本 | 向量 |
| Jina Reranker m0 | jina-reranker-m0 | jina | 10,240 | - | 重排 | 文本、图片 | - |
| Jina Reranker v1 Base EN | jina-reranker-v1-base-en | jina | 8,192 | - | 重排 | 文本 | - |
| Jina Reranker v1 Tiny EN | jina-reranker-v1-tiny-en | jina | 8,192 | - | 重排 | 文本 | - |
| Jina Reranker v1 Turbo EN | jina-reranker-v1-turbo-en | jina | 8,192 | - | 重排 | 文本 | - |
| Jina Reranker v2 Base Multilingual | jina-reranker-v2-base-multilingual | jina | 1,024 | - | 重排 | 文本 | - |
| Jina Reranker v3 | jina-reranker-v3 | jina | 131,072 | - | 重排 | 文本 | - |
| llama-3_2-nemoretriever-300m-embed-v1 | llama-3-2-nemoretriever-300m-embed-v1 | meta | 32,768 | 2,048 | 嵌入 | 文本 | 向量 |
| llama-nemotron-embed-vl-1b-v2 | llama-nemotron-embed-vl-1b-v2 | meta | 32,768 | 2,048 | 识图、文件输入、嵌入 | 文本、图片 | 向量 |
| llama-nemotron-rerank-vl-1b-v2 | llama-nemotron-rerank-vl-1b-v2 | meta | 128,000 | 4,096 | 识图、文件输入、重排 | 文本、图片 | 文本 |
| Codestral Embed | codestral-embed | mistral | 8,192 | 1,536 | 嵌入 | 文本 | 向量 |
| Mistral Embed | mistral-embed | mistral | 8,192 | 3,072 | 嵌入 | 文本 | 向量 |
| nv-embed-v1 | nv-embed-v1 | nvidia | 32,768 | 2,048 | 嵌入 | 文本 | 向量 |
| nv-embedcode-7b-v1 | nv-embedcode-7b-v1 | nvidia | 32,768 | 2,048 | 嵌入 | 文本 | 向量 |
| rerank-qa-mistral-4b | rerank-qa-mistral-4b | nvidia | 128,000 | 4,096 | 重排 | 文本 | 文本 |
| text-embedding-3-large | text-embedding-3-large | openai | 8,192 | 3,072 | 嵌入 | 文本 | 向量 |
| text-embedding-3-small | text-embedding-3-small | openai | 8,192 | 1,536 | 嵌入 | 文本 | 向量 |
| text-embedding-ada-002 | text-embedding-ada-002 | openai | 8,192 | 1,536 | 嵌入 | 文本 | 向量 |
| Embed v1 0.6b | pplx-embed-v1-0-6b | vercel | 32,000 | - | 嵌入 | 文本 | 向量 |
| Embed v1 4b | pplx-embed-v1-4b | vercel | 32,000 | - | 嵌入 | 文本 | 向量 |
| Rerank 1 | rerank-1 | voyage | 8,000 | - | 重排 | 文本 | - |
| Rerank 2 | rerank-2 | voyage | 16,000 | - | 重排 | 文本 | - |
| Rerank 2 Lite | rerank-2-lite | voyage | 8,000 | - | 重排 | 文本 | - |
| Rerank 2.5 | rerank-2-5 | voyage | 32,000 | 32,000 | 重排 | 文本 | 文本 |
| Rerank 2.5 Lite | rerank-2-5-lite | voyage | 32,000 | 32,000 | 重排 | 文本 | 文本 |
| Rerank Lite 1 | rerank-lite-1 | voyage | 4,000 | - | 重排 | 文本 | - |
| Voyage 2 | voyage-2 | voyage | 4,000 | - | 嵌入 | 文本 | 向量 |
| Voyage 3 | voyage-3 | voyage | 32,000 | - | 嵌入 | 文本 | 向量 |
| Voyage 3 Large | voyage-3-large | voyage | 32,000 | 1,536 | 嵌入 | 文本 | 向量 |
| Voyage 3 Lite | voyage-3-lite | voyage | 32,000 | - | 嵌入 | 文本 | 向量 |
| Voyage 3.5 | voyage-3-5 | voyage | 32,000 | 1,536 | 嵌入 | 文本 | 向量 |
| Voyage 3.5 Lite | voyage-3-5-lite | voyage | 32,000 | 1,536 | 嵌入 | 文本 | 向量 |
| Voyage 4 | voyage-4 | voyage | 32,000 | - | 嵌入 | 文本 | 向量 |
| Voyage 4 Large | voyage-4-large | voyage | 32,000 | - | 嵌入 | 文本 | 向量 |
| Voyage 4 Lite | voyage-4-lite | voyage | 32,000 | - | 嵌入 | 文本 | 向量 |
| Voyage 4 Nano | voyage-4-nano | voyage | 32,000 | - | 嵌入 | 文本 | 向量 |
| Voyage Code 2 | voyage-code-2 | voyage | 16,000 | 1,536 | 嵌入 | 文本 | 向量 |
| Voyage Code 3 | voyage-code-3 | voyage | 32,000 | 1,536 | 嵌入 | 文本 | 向量 |
| Voyage Finance 2 | voyage-finance-2 | voyage | 32,000 | 1,536 | 嵌入 | 文本 | 向量 |
| Voyage Large 2 | voyage-large-2 | voyage | 16,000 | - | 嵌入 | 文本 | 向量 |
| Voyage Large 2 Instruct | voyage-large-2-instruct | voyage | 16,000 | - | 嵌入 | 文本 | 向量 |
| Voyage Law 2 | voyage-law-2 | voyage | 16,000 | 1,536 | 嵌入 | 文本 | 向量 |
| Voyage Multilingual 2 | voyage-multilingual-2 | voyage | 32,000 | - | 嵌入 | 文本 | 向量 |
| Voyage Multimodal 3 | voyage-multimodal-3 | voyage | 32,000 | - | 嵌入 | 文本、图片 | 向量 |
| Voyage Multimodal 3.5 | voyage-multimodal-3-5 | voyage | 32,000 | - | 嵌入 | 文本、图片、视频 | 向量 |
| BCE Embedding Base v1 | bce-embedding-base-v1 | youdao | 512 | - | 嵌入 | 文本 | 向量 |
| BCE Reranker Base v1 | bce-reranker-base-v1 | youdao | 512 | - | 重排 | 文本 | - |
| Embedding-3 | embedding-3 | zhipu | 8,192 | - | 嵌入 | 文本 | 向量 |

</div>
