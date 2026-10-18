# Embedding & Rerank

Data comes from the model catalog bundled with Cherry Studio ([provider-registry](https://github.com/CherryHQ/cherry-studio/tree/main/packages/provider-registry)), synced automatically with the application repository. A `-` means the source data does not provide that field; in the modality columns ✓ means a modality is supported and — means it is not (only modalities that appear on this page are listed). Information is for reference only.

> **Data updated**: 2026-10-18 09:07:16 UTC / 2026-10-18 17:07:16 CST (Beijing time)

<div data-models-table="num:3,4;cap:5:Image recognition,Speech recognition,Video recognition,File input,Embedding,Rerank;in:6:Image input=Image✓,Audio input=Audio✓,Video input=Video✓;out:7:Text output=Text✓,Vector output=Vector✓">

| Model | API ID | Provider | Context | Max output | Capabilities | Input modalities | Output modalities |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Qwen3 Embedding 0.6B | qwen3-embedding-0-6b | alibaba | 32,768 | 32,768 | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Qwen3 Embedding 4B | qwen3-embedding-4b | alibaba | 32,768 | 32,768 | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Qwen3 Embedding 8B | qwen3-embedding-8b | alibaba | 32,768 | 32,768 | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Qwen3 Reranker 0.6B | qwen3-reranker-0-6b | alibaba | 32,768 | - | Rerank | Text✓ Image— Audio— Video— Vector— | - |
| Qwen3 Reranker 4B | qwen3-reranker-4b | alibaba | 32,768 | - | Rerank | Text✓ Image— Audio— Video— Vector— | - |
| Qwen3 Reranker 8B | qwen3-reranker-8b | alibaba | 32,768 | - | Rerank | Text✓ Image— Audio— Video— Vector— | - |
| Titan Text Embeddings V2 | titan-embed-text-v2 | amazon | 8,192 | 1,536 | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| BGE Base EN v1.5 | bge-base-en-v1-5 | baai | 512 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| BGE Base ZH v1.5 | bge-base-zh-v1-5 | baai | 512 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| BGE Large EN v1.5 | bge-large-en-v1-5 | baai | 512 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| BGE Large ZH v1.5 | bge-large-zh-v1-5 | baai | 512 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| BGE M3 | bge-m3 | baai | 8,192 | 1,024 | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| BGE Multilingual Gemma2 | bge-multilingual-gemma2 | baai | 8,192 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| BGE Reranker Base | bge-reranker-base | baai | 512 | - | Rerank | Text✓ Image— Audio— Video— Vector— | - |
| BGE Reranker Large | bge-reranker-large | baai | 512 | - | Rerank | Text✓ Image— Audio— Video— Vector— | - |
| BGE Reranker v2 Gemma | bge-reranker-v2-gemma | baai | 8,192 | - | Rerank | Text✓ Image— Audio— Video— Vector— | - |
| BGE Reranker v2 M3 | bge-reranker-v2-m3 | baai | 8,192 | - | Rerank | Text✓ Image— Audio— Video— Vector— | - |
| BGE Small EN v1.5 | bge-small-en-v1-5 | baai | 512 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| BGE Small ZH v1.5 | bge-small-zh-v1-5 | baai | 512 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Doubao Embedding Large Text | doubao-embedding-large-text | bytedance | - | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Doubao Embedding Text | doubao-embedding-text | bytedance | - | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Doubao Embedding Vision | doubao-embedding-vision | bytedance | 131,072 | - | Embedding | Text✓ Image✓ Audio— Video✓ Vector— | Text— Image— Audio— Video— Vector✓ |
| Embed English Light v3.0 | embed-english-light-v3-0 | cohere | 512 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Embed English v3.0 | embed-english-v3-0 | cohere | 512 | - | Embedding | Text✓ Image✓ Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Embed Multilingual Light v3.0 | embed-multilingual-light-v3-0 | cohere | 512 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Embed Multilingual v3.0 | embed-multilingual-v3-0 | cohere | 512 | - | Embedding | Text✓ Image✓ Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Embed v4.0 | embed-v4-0 | cohere | 131,072 | 1,536 | Embedding | Text✓ Image✓ Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Rerank English v3.0 | rerank-english-v3-0 | cohere | 4,096 | - | Rerank | Text✓ Image— Audio— Video— Vector— | - |
| Rerank Multilingual v3.0 | rerank-multilingual-v3-0 | cohere | 4,096 | - | Rerank | Text✓ Image— Audio— Video— Vector— | - |
| Rerank v3.5 | rerank-v3-5 | cohere | 4,096 | 4,096 | Rerank | Text✓ Image— Audio— Video— Vector— | Text✓ Image— Audio— Video— Vector— |
| Rerank v4 Fast | rerank-v4-fast | cohere | 32,768 | 32,000 | Rerank | Text✓ Image— Audio— Video— Vector— | Text✓ Image— Audio— Video— Vector— |
| Rerank v4 Pro | rerank-v4-pro | cohere | 32,768 | 32,000 | Rerank | Text✓ Image— Audio— Video— Vector— | Text✓ Image— Audio— Video— Vector— |
| Gemini Embedding 001 | gemini-embedding-001 | google | 8,192 | 1,536 | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Gemini Embedding 2 | gemini-embedding-2 | google | 8,192 | 1 | Image recognition, Speech recognition, Video recognition, File input, Embedding | Text✓ Image✓ Audio✓ Video✓ Vector— | Text— Image— Audio— Video— Vector✓ |
| Gemini Embedding 2 Preview | gemini-embedding-2-preview | google | 8,192 | - | Embedding, Image recognition, Speech recognition, Video recognition, File input | Text✓ Image✓ Audio✓ Video✓ Vector— | Text— Image— Audio— Video— Vector✓ |
| Text Embedding 005 | text-embedding-005 | google | 8,192 | 1,536 | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Text Multilingual Embedding 002 | text-multilingual-embedding-002 | google | 8,192 | 1,536 | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Jina CLIP v1 | jina-clip-v1 | jina | 8,192 | - | Embedding | Text✓ Image✓ Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Jina CLIP v2 | jina-clip-v2 | jina | 8,192 | - | Embedding | Text✓ Image✓ Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Jina Code Embeddings 0.5B | jina-code-embeddings-0-5b | jina | 32,768 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Jina Code Embeddings 1.5B | jina-code-embeddings-1-5b | jina | 32,768 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Jina ColBERT v1 EN | jina-colbert-v1-en | jina | 8,192 | - | Embedding, Rerank | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Jina ColBERT v2 | jina-colbert-v2 | jina | 8,192 | - | Embedding, Rerank | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Jina Embedding B EN v1 | jina-embedding-b-en-v1 | jina | 512 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Jina Embeddings v2 Base Code | jina-embeddings-v2-base-code | jina | 8,192 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Jina Embeddings v2 Base DE | jina-embeddings-v2-base-de | jina | 8,192 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Jina Embeddings v2 Base EN | jina-embeddings-v2-base-en | jina | 8,192 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Jina Embeddings v2 Base ES | jina-embeddings-v2-base-es | jina | 8,192 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Jina Embeddings v2 Base ZH | jina-embeddings-v2-base-zh | jina | 8,192 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Jina Embeddings v3 | jina-embeddings-v3 | jina | 8,192 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Jina Embeddings v4 | jina-embeddings-v4 | jina | 32,768 | - | Embedding | Text✓ Image✓ Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Jina Embeddings v5 Omni Nano | jina-embeddings-v5-omni-nano | jina | 8,192 | - | Embedding | Text✓ Image✓ Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Jina Embeddings v5 Omni Small | jina-embeddings-v5-omni-small | jina | 32,768 | - | Embedding | Text✓ Image✓ Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Jina Embeddings v5 Text Nano | jina-embeddings-v5-text-nano | jina | 8,192 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Jina Embeddings v5 Text Small | jina-embeddings-v5-text-small | jina | 32,768 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Jina Reranker m0 | jina-reranker-m0 | jina | 10,240 | - | Rerank | Text✓ Image✓ Audio— Video— Vector— | - |
| Jina Reranker v1 Base EN | jina-reranker-v1-base-en | jina | 8,192 | - | Rerank | Text✓ Image— Audio— Video— Vector— | - |
| Jina Reranker v1 Tiny EN | jina-reranker-v1-tiny-en | jina | 8,192 | - | Rerank | Text✓ Image— Audio— Video— Vector— | - |
| Jina Reranker v1 Turbo EN | jina-reranker-v1-turbo-en | jina | 8,192 | - | Rerank | Text✓ Image— Audio— Video— Vector— | - |
| Jina Reranker v2 Base Multilingual | jina-reranker-v2-base-multilingual | jina | 1,024 | - | Rerank | Text✓ Image— Audio— Video— Vector— | - |
| Jina Reranker v3 | jina-reranker-v3 | jina | 131,072 | - | Rerank | Text✓ Image— Audio— Video— Vector— | - |
| llama-3_2-nemoretriever-300m-embed-v1 | llama-3-2-nemoretriever-300m-embed-v1 | meta | 32,768 | 2,048 | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| llama-nemotron-embed-vl-1b-v2 | llama-nemotron-embed-vl-1b-v2 | meta | 32,768 | 2,048 | Image recognition, File input, Embedding | Text✓ Image✓ Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| llama-nemotron-rerank-vl-1b-v2 | llama-nemotron-rerank-vl-1b-v2 | meta | 128,000 | 4,096 | Image recognition, File input, Rerank | Text✓ Image✓ Audio— Video— Vector— | Text✓ Image— Audio— Video— Vector— |
| Codestral Embed | codestral-embed | mistral | 8,192 | 1,536 | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Mistral Embed | mistral-embed | mistral | 8,192 | 3,072 | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| nv-embed-v1 | nv-embed-v1 | nvidia | 32,768 | 2,048 | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| nv-embedcode-7b-v1 | nv-embedcode-7b-v1 | nvidia | 32,768 | 2,048 | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| rerank-qa-mistral-4b | rerank-qa-mistral-4b | nvidia | 128,000 | 4,096 | Rerank | Text✓ Image— Audio— Video— Vector— | Text✓ Image— Audio— Video— Vector— |
| text-embedding-3-large | text-embedding-3-large | openai | 8,192 | 3,072 | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| text-embedding-3-small | text-embedding-3-small | openai | 8,192 | 1,536 | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| text-embedding-ada-002 | text-embedding-ada-002 | openai | 8,192 | 1,536 | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Embed v1 0.6b | pplx-embed-v1-0-6b | vercel | 32,000 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Embed v1 4b | pplx-embed-v1-4b | vercel | 32,000 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Rerank 1 | rerank-1 | voyage | 8,000 | - | Rerank | Text✓ Image— Audio— Video— Vector— | - |
| Rerank 2 | rerank-2 | voyage | 16,000 | - | Rerank | Text✓ Image— Audio— Video— Vector— | - |
| Rerank 2 Lite | rerank-2-lite | voyage | 8,000 | - | Rerank | Text✓ Image— Audio— Video— Vector— | - |
| Rerank 2.5 | rerank-2-5 | voyage | 32,000 | 32,000 | Rerank | Text✓ Image— Audio— Video— Vector— | Text✓ Image— Audio— Video— Vector— |
| Rerank 2.5 Lite | rerank-2-5-lite | voyage | 32,000 | 32,000 | Rerank | Text✓ Image— Audio— Video— Vector— | Text✓ Image— Audio— Video— Vector— |
| Rerank Lite 1 | rerank-lite-1 | voyage | 4,000 | - | Rerank | Text✓ Image— Audio— Video— Vector— | - |
| Voyage 2 | voyage-2 | voyage | 4,000 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Voyage 3 | voyage-3 | voyage | 32,000 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Voyage 3 Large | voyage-3-large | voyage | 32,000 | 1,536 | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Voyage 3 Lite | voyage-3-lite | voyage | 32,000 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Voyage 3.5 | voyage-3-5 | voyage | 32,000 | 1,536 | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Voyage 3.5 Lite | voyage-3-5-lite | voyage | 32,000 | 1,536 | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Voyage 4 | voyage-4 | voyage | 32,000 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Voyage 4 Large | voyage-4-large | voyage | 32,000 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Voyage 4 Lite | voyage-4-lite | voyage | 32,000 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Voyage 4 Nano | voyage-4-nano | voyage | 32,000 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Voyage Code 2 | voyage-code-2 | voyage | 16,000 | 1,536 | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Voyage Code 3 | voyage-code-3 | voyage | 32,000 | 1,536 | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Voyage Finance 2 | voyage-finance-2 | voyage | 32,000 | 1,536 | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Voyage Large 2 | voyage-large-2 | voyage | 16,000 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Voyage Large 2 Instruct | voyage-large-2-instruct | voyage | 16,000 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Voyage Law 2 | voyage-law-2 | voyage | 16,000 | 1,536 | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Voyage Multilingual 2 | voyage-multilingual-2 | voyage | 32,000 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Voyage Multimodal 3 | voyage-multimodal-3 | voyage | 32,000 | - | Embedding | Text✓ Image✓ Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| Voyage Multimodal 3.5 | voyage-multimodal-3-5 | voyage | 32,000 | - | Embedding | Text✓ Image✓ Audio— Video✓ Vector— | Text— Image— Audio— Video— Vector✓ |
| BCE Embedding Base v1 | bce-embedding-base-v1 | youdao | 512 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |
| BCE Reranker Base v1 | bce-reranker-base-v1 | youdao | 512 | - | Rerank | Text✓ Image— Audio— Video— Vector— | - |
| Embedding-3 | embedding-3 | zhipu | 8,192 | - | Embedding | Text✓ Image— Audio— Video— Vector— | Text— Image— Audio— Video— Vector✓ |

</div>
