# 文本对话

数据来自 Cherry Studio 内置模型目录（[provider-registry](https://github.com/CherryHQ/cherry-studio/tree/main/packages/provider-registry)），随应用仓库自动同步；表中 `-` 表示数据源未提供该字段，模态列的 ✓ / — 表示是否支持该模态（仅列出本页出现的模态），信息仅供参考。

> **数据更新时间**: 2026-10-18 09:07:16 UTC / 2026-10-18 17:07:16 CST (北京时间)

<div data-models-table="num:3,4;cap:5:函数调用,推理,识图,结构化输出,文件输入">

| 模型名称 | API ID | 服务商 | 上下文长度 | 最大输出 | 能力 | 输入模态 | 输出模态 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| jamba-1-5-large | jamba-1-5-large | ai21 | - | - | - | - | - |
| jamba-1-5-mini | jamba-1-5-mini | ai21 | - | - | - | - | - |
| jamba-large-1-7 | jamba-large-1-7 | ai21 | - | - | - | - | - |
| jamba-mini-1-7 | jamba-mini-1-7 | ai21 | - | - | - | - | - |
| Qwen 3 Coder 30B A3B Instruct | qwen3-coder-30b-a3b | alibaba | 262,144 | 131,072 | 函数调用、结构化输出 | 文✓ | 文✓ |
| Qwen 3.32B | qwen-3-32b | alibaba | 128,000 | 8,192 | 函数调用、推理 | 文✓ | 文✓ |
| Qwen 3.6 Max Preview | qwen-3-6-max-preview | alibaba | 240,000 | 64,000 | 函数调用、推理、文件输入 | 文✓ | 文✓ |
| Qwen Deep Research | qwen-deep-research | alibaba | 1,000,000 | 32,768 | 函数调用 | 文✓ | 文✓ |
| Qwen Doc Turbo | qwen-doc-turbo | alibaba | 131,072 | 8,192 | 函数调用 | 文✓ | 文✓ |
| Qwen Flash | qwen-flash | alibaba | 1,000,000 | 32,768 | 函数调用、推理 | 文✓ | 文✓ |
| Qwen Long | qwen-long | alibaba | 10,000,000 | 8,192 | 函数调用 | 文✓ | 文✓ |
| Qwen Math Plus | qwen-math-plus | alibaba | 4,096 | 3,072 | 函数调用 | 文✓ | 文✓ |
| Qwen Math Turbo | qwen-math-turbo | alibaba | 4,096 | 3,072 | 函数调用 | 文✓ | 文✓ |
| Qwen Max | qwen-max | alibaba | 131,072 | 8,192 | 函数调用 | 文✓ | 文✓ |
| Qwen Plus | qwen-plus | alibaba | 1,000,000 | 32,768 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| Qwen Plus Character | qwen-plus-character | alibaba | 32,768 | 4,096 | 函数调用 | 文✓ | 文✓ |
| Qwen Plus Character (Japanese) | qwen-plus-character-ja | alibaba | 8,192 | 512 | 函数调用 | 文✓ | 文✓ |
| Qwen Turbo | qwen-turbo | alibaba | 1,000,000 | 16,384 | 函数调用、推理 | 文✓ | 文✓ |
| Qwen-MT Plus | qwen-mt-plus | alibaba | 16,384 | 8,192 | - | 文✓ | 文✓ |
| Qwen-MT Turbo | qwen-mt-turbo | alibaba | 16,384 | 8,192 | - | 文✓ | 文✓ |
| Qwen: Qwen2.5 7B Instruct | qwen-2-5-7b-instruct | alibaba | 32,768 | - | 函数调用、结构化输出 | 文✓ | 文✓ |
| Qwen: Qwen3 30B A3B Instruct 2507 | qwen3-30b-a3b-instruct | alibaba | 262,144 | - | 函数调用、结构化输出 | 文✓ | 文✓ |
| Qwen: Qwen3 30B A3B Thinking 2507 | qwen3-30b-a3b | alibaba | 131,072 | - | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| Qwen2.5 14B Instruct | qwen2-5-14b-instruct | alibaba | 131,072 | 8,192 | 函数调用 | 文✓ | 文✓ |
| Qwen2.5 32B Instruct | qwen2-5-32b-instruct | alibaba | 131,072 | 8,192 | 函数调用 | 文✓ | 文✓ |
| Qwen2.5 72B Instruct | qwen-2-5-72b-instruct | alibaba | 32,768 | - | 函数调用、结构化输出 | 文✓ | 文✓ |
| Qwen2.5 72B Instruct | qwen2-5-72b-instruct | alibaba | 131,072 | 8,192 | 函数调用 | 文✓ | 文✓ |
| Qwen2.5 7B Instruct | qwen2-5-7b-instruct | alibaba | 131,072 | 8,192 | 函数调用 | 文✓ | 文✓ |
| Qwen2.5 Coder 32B Instruct | qwen-2-5-coder-32b-instruct | alibaba | 32,768 | - | - | 文✓ | 文✓ |
| Qwen2.5-Coder 32B Instruct | qwen2-5-coder-32b-instruct | alibaba | 131,072 | 8,192 | 函数调用、结构化输出 | 文✓ | 文✓ |
| Qwen2.5-Coder 7B Instruct | qwen2-5-coder-7b-instruct | alibaba | 131,072 | 8,192 | 函数调用 | 文✓ | 文✓ |
| Qwen2.5-Math 72B Instruct | qwen2-5-math-72b-instruct | alibaba | 4,096 | 3,072 | 函数调用 | 文✓ | 文✓ |
| Qwen2.5-Math 7B Instruct | qwen2-5-math-7b-instruct | alibaba | 4,096 | 3,072 | 函数调用 | 文✓ | 文✓ |
| Qwen3 14B | qwen3-14b | alibaba | 131,072 | 8,192 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| Qwen3 235B A22B Instruct | qwen3-235b-a22b-instruct-2507-maas | alibaba | 262,144 | 16,384 | 函数调用、结构化输出 | 文✓ | 文✓ |
| Qwen3 235B A22B Instruct 2507 | qwen-3-235b | alibaba | 262,144 | 16,384 | 函数调用、推理 | 文✓ | 文✓ |
| Qwen3 32B | qwen3-32b | alibaba | 131,072 | 16,384 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| Qwen3 8B | qwen3-8b | alibaba | 131,072 | 8,192 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| Qwen3 Coder 480B A35B Instruct | qwen3-coder | alibaba | 262,144 | 65,536 | 函数调用、结构化输出 | 文✓ | 文✓ |
| Qwen3 Coder 480B A35B Instruct | qwen3-coder-480b-a35b | alibaba | 131,072 | 65,536 | 函数调用、结构化输出 | 文✓ | 文✓ |
| Qwen3 Coder Flash | qwen3-coder-flash | alibaba | 1,000,000 | 65,536 | 函数调用、结构化输出 | 文✓ | 文✓ |
| Qwen3 Coder Next | qwen3-coder-next | alibaba | 262,144 | 256,000 | 函数调用、结构化输出 | 文✓ | 文✓ |
| Qwen3 Coder Plus | qwen3-coder-plus | alibaba | 1,048,576 | 65,536 | 函数调用、结构化输出 | 文✓ | 文✓ |
| Qwen3 Max | qwen3-max | alibaba | 262,144 | 65,536 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| Qwen3 Max Preview | qwen3-max-preview | alibaba | 262,144 | 32,768 | 函数调用 | 文✓ | 文✓ |
| Qwen3-14B | qwen-3-14b | alibaba | 40,960 | 16,384 | 函数调用、推理 | 文✓ | 文✓ |
| Qwen3-30B-A3B | qwen-3-30b | alibaba | 40,960 | 16,384 | 函数调用、推理 | 文✓ | 文✓ |
| Qwen3-Coder 30B-A3B Instruct | qwen3-coder-30b-a3b-instruct | alibaba | 262,144 | 65,536 | 函数调用、结构化输出 | 文✓ | 文✓ |
| Qwen3-Coder 480B-A35B Instruct | qwen3-coder-480b-a35b-instruct | alibaba | 262,144 | 66,536 | 函数调用 | 文✓ | 文✓ |
| Qwen3-Next 80B-A3B (Thinking) | qwen3-next-80b-a3b | alibaba | 262,144 | 262,000 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| Qwen3-Next 80B-A3B Instruct | qwen3-next-80b-a3b-instruct | alibaba | 262,144 | 32,768 | 函数调用、结构化输出 | 文✓ | 文✓ |
| Qwen3.6 Max Preview | qwen3-6-max-preview | alibaba | 262,144 | 65,536 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| Qwen3.7 Max | qwen3-7-max | alibaba | 1,000,000 | 65,536 | 函数调用、推理、结构化输出、文件输入 | 文✓ | 文✓ |
| QwQ 32B | qwq-32b | alibaba | 131,072 | 8,192 | 函数调用、推理 | 文✓ | 文✓ |
| QwQ Plus | qwq-plus | alibaba | 131,072 | 8,192 | 函数调用、推理 | 文✓ | 文✓ |
| Tongyi Intent Detect V3 | tongyi-intent-detect-v3 | alibaba | 8,192 | 1,024 | - | 文✓ | 文✓ |
| Amazon: Nova Micro 1.0 | nova-micro-v1 | amazon | 128,000 | - | 函数调用 | 文✓ | 文✓ |
| Nova Micro | nova-micro | amazon | 128,000 | 8,192 | 函数调用 | 文✓ | 文✓ |
| Trinity Large Thinking | trinity-large | arceeai | 262,144 | 80,000 | 函数调用、推理 | 文✓ | 文✓ |
| ERNIE 3.5 128K | ernie-3-5-128k | baidu | 131,072 | - | 函数调用 | - | - |
| ERNIE 3.5 8K | ernie-3-5-8k | baidu | 8,192 | - | 函数调用 | - | - |
| ERNIE 4.0 8K | ernie-4-0-8k | baidu | 8,192 | - | 函数调用 | - | - |
| ERNIE 4.0 Turbo 128K | ernie-4-0-turbo-128k | baidu | 131,072 | - | 函数调用 | - | - |
| ERNIE 4.0 Turbo 8K | ernie-4-0-turbo-8k | baidu | 8,192 | - | 函数调用 | - | - |
| ERNIE 4.5 | ernie-4-5 | baidu | 123,904 | - | 函数调用 | - | - |
| ERNIE 4.5 A3B | ernie-4-5-a3b | baidu | 131,072 | - | 函数调用 | - | - |
| ERNIE 4.5 A47B | ernie-4-5-a47b | baidu | 131,072 | - | 函数调用 | - | - |
| ERNIE 4.5 Turbo | ernie-4-5-turbo | baidu | 131,072 | - | 函数调用 | - | - |
| ERNIE 5.0 | ernie-5-0 | baidu | 131,072 | - | 推理、函数调用 | - | - |
| ERNIE Character 8K | ernie-character-8k | baidu | 8,192 | - | - | - | - |
| ERNIE Lite 8K | ernie-lite-8k | baidu | 8,192 | - | - | - | - |
| ERNIE Speed 128K | ernie-speed-128k | baidu | 131,072 | - | - | - | - |
| ERNIE Tiny 8K | ernie-tiny-8k | baidu | 8,192 | - | - | - | - |
| ERNIE X1 Turbo | ernie-x1-turbo | baidu | 32,768 | - | 推理、函数调用 | - | - |
| ERNIE X1.1 Preview | ernie-x1-1-preview | baidu | 32,768 | - | 推理、函数调用 | - | - |
| Ling 3.0 Flash | ling-3-0-flash | bailing | 262,144 | 32,000 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| Ling 3.0 Flash Fin | ling-3-0-flash-fin | bailing | 262,144 | 32,000 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| Ling 3.0 Flash Sante | ling-3-0-flash-sante | bailing | 262,144 | 32,000 | 函数调用、推理 | 文✓ | 文✓ |
| Ling-1T | ling-1t | bailing | 128,000 | 32,000 | 函数调用 | 文✓ | 文✓ |
| Ring-1T | ring-1t | bailing | 128,000 | 32,000 | 推理 | 文✓ | 文✓ |
| ByteDance-Seed/Seed-OSS-36B-Instruct | seed-oss-36b-instruct | bytedance | 262,000 | 262,000 | 函数调用、结构化输出 | 文✓ | 文✓ |
| Doubao 1.5 Lite 32k | doubao-1-5-lite-32k | bytedance | 32,768 | 12,288 | 函数调用 | 文✓ | 文✓ |
| Doubao 1.5 Pro 256k | doubao-1-5-pro-256k | bytedance | 262,144 | - | 函数调用 | 文✓ | 文✓ |
| Doubao 1.5 Pro 32k | doubao-1-5-pro-32k | bytedance | 131,072 | 16,384 | 函数调用 | 文✓ | 文✓ |
| Doubao 1.5 Thinking Pro | doubao-1-5-thinking-pro | bytedance | 131,072 | 16,384 | 推理、函数调用 | 文✓ | 文✓ |
| Doubao 1.5 Thinking Pro M | doubao-1-5-thinking-pro-m | bytedance | 131,072 | 16,384 | 推理、函数调用 | 文✓ | 文✓ |
| Doubao Seed Translation | doubao-seed-translation | bytedance | 4,096 | 3,072 | - | 文✓ | 文✓ |
| doubao-seed-1-8 | doubao-seed-1-8 | bytedance | - | - | - | - | - |
| Aya Expanse 32B | c4ai-aya-expanse-32b | cohere | 131,072 | 4,096 | 函数调用 | 文✓ | 文✓ |
| Aya Expanse 8B | c4ai-aya-expanse-8b | cohere | 8,192 | 4,096 | 函数调用 | 文✓ | 文✓ |
| Command | command | cohere | 4,096 | 4,096 | 函数调用 | - | - |
| Command A | command-a | cohere | 262,144 | 8,192 | 函数调用 | 文✓ | 文✓ |
| Command A | command-a-03-2025 | cohere | 262,144 | 8,192 | 函数调用 | 文✓ | 文✓ |
| Command A Reasoning | command-a-reasoning-08-2025 | cohere | 262,144 | 32,768 | 函数调用、推理 | 文✓ | 文✓ |
| Command A Translate | command-a-translate-08-2025 | cohere | 8,192 | 8,192 | 函数调用 | 文✓ | 文✓ |
| Command Light | command-light | cohere | 4,096 | 4,096 | 函数调用 | - | - |
| Command R | command-r | cohere | 131,072 | 4,096 | 函数调用 | - | - |
| Command R (08-2024) | command-r-08-2024 | cohere | 131,072 | 4,096 | 函数调用 | 文✓ | 文✓ |
| Command R+ | command-r-plus | cohere | 131,072 | 4,096 | 函数调用 | - | - |
| Command R+ (08-2024) | command-r-plus-08-2024 | cohere | 131,072 | 4,096 | 函数调用 | 文✓ | 文✓ |
| Command R7B | command-r7b-12-2024 | cohere | 131,072 | 4,096 | 函数调用 | 文✓ | 文✓ |
| Command R7B Arabic | command-r7b-arabic-02-2025 | cohere | 128,000 | 4,000 | 函数调用 | 文✓ | 文✓ |
| North Mini Code | north-mini-code | cohere | 131,072 | - | 函数调用 | 文✓ | 文✓ |
| North Mini Code 1.0 | north-mini-code-1-0 | cohere | 131,072 | 64,000 | 函数调用 | 文✓ | 文✓ |
| Tiny Aya Earth | tiny-aya-earth | cohere | 8,192 | 8,192 | 函数调用 | - | - |
| Tiny Aya Fire | tiny-aya-fire | cohere | 8,192 | 8,192 | 函数调用 | - | - |
| Tiny Aya Global | tiny-aya-global | cohere | 8,192 | 8,192 | 函数调用 | - | - |
| Tiny Aya Water | tiny-aya-water | cohere | 8,192 | 8,192 | 函数调用 | - | - |
| DeepSeek R1 | deepseek-r1 | deepseek | 163,840 | 32,768 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| DeepSeek R1 Distill Llama 70B | deepseek-r1-distill-llama-70b | deepseek | 32,768 | 16,384 | 函数调用、推理 | 文✓ | 文✓ |
| DeepSeek R1 Distill Llama 8B | deepseek-r1-distill-llama-8b | deepseek | 32,768 | 16,384 | 函数调用、推理 | 文✓ | 文✓ |
| DeepSeek R1 Distill Qwen 1.5B | deepseek-r1-distill-qwen-1-5b | deepseek | 32,768 | 16,384 | 函数调用、推理 | 文✓ | 文✓ |
| DeepSeek R1 Distill Qwen 14B | deepseek-r1-distill-qwen-14b | deepseek | 32,768 | 16,384 | 函数调用、推理 | 文✓ | 文✓ |
| DeepSeek R1 Distill Qwen 32B | deepseek-r1-distill-qwen-32b | deepseek | 32,768 | 16,384 | 函数调用、推理 | 文✓ | 文✓ |
| DeepSeek R1 Distill Qwen 7B | deepseek-r1-distill-qwen-7b | deepseek | 32,768 | 16,384 | 函数调用、推理 | 文✓ | 文✓ |
| DeepSeek V3 | deepseek-v3 | deepseek | 163,840 | 163,840 | 函数调用、结构化输出 | 文✓ | 文✓ |
| DeepSeek V3.1 | deepseek-v3-1 | deepseek | 163,840 | 128,000 | 函数调用、推理 | 文✓ | 文✓ |
| DeepSeek V3.1 | deepseek-v3-1-maas | deepseek | 163,840 | 32,768 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| DeepSeek V3.2 | deepseek-v3-2-maas | deepseek | 163,840 | 65,536 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| DeepSeek V3.2 Exp | deepseek-v3-2-exp | deepseek | 163,840 | 65,536 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| DeepSeek V4 Flash | deepseek-v4-flash | deepseek | 1,048,576 | 393,216 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| DeepSeek V4 Pro | deepseek-v4-pro | deepseek | 1,048,576 | 393,216 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| DeepSeek: DeepSeek V3 | deepseek-chat | deepseek | 163,840 | - | 函数调用、结构化输出 | 文✓ | 文✓ |
| DeepSeek: DeepSeek V3 0324 | deepseek-chat-v3 | deepseek | 163,840 | - | 函数调用、结构化输出 | 文✓ | 文✓ |
| DeepSeek: DeepSeek V3.1 | deepseek-chat-v3-1 | deepseek | 163,840 | - | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| siliconflow/deepseek-v3.1-terminus | deepseek-v3-1-terminus | deepseek | 163,840 | 65,536 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| siliconflow/deepseek-v3.2 | deepseek-v3-2 | deepseek | 163,840 | 65,536 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| Gemma 2 2b It | gemma-2-2b-it | google | 128,000 | 4,096 | 函数调用、结构化输出 | 文✓ | 文✓ |
| Google: Gemma 2 27B | gemma-2-27b-it | google | 8,192 | - | 结构化输出 | 文✓ | 文✓ |
| Mercury 2 | mercury-2 | inception | 128,000 | 128,000 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| Mercury 2.5 | mercury-2-5 | inception | 260,000 | 65,536 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| Mercury Coder Small Beta | mercury-coder-small | inception | 32,000 | 16,384 | 函数调用 | 文✓ | 文✓ |
| Mercury Edit 2 | mercury-edit-2 | inception | 128,000 | 8,192 | 推理 | 文✓ | 文✓ |
| LiquidAI: LFM2.5-2.6B (free) | lfm-2-5-2-6b | liquidai | 65,536 | - | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| LongCat-2.0 | longcat-2-0 | meituan | 1,048,576 | 131,072 | 函数调用、推理 | 文✓ | 文✓ |
| Llama 3.1 70b Instruct | llama-3-1-70b-instruct | meta | 131,072 | 8,192 | 函数调用、结构化输出 | 文✓ | 文✓ |
| Llama 3.1 70B Instruct | llama-3-1-70b | meta | 131,072 | 8,192 | 函数调用、结构化输出 | 文✓ | 文✓ |
| Llama 3.1 70B Instruct (US) | llama3-1-70b-instruct | meta | 128,000 | 4,096 | 函数调用 | 文✓ | 文✓ |
| Llama 3.1 8B Instruct | llama-3-1-8b | meta | 128,000 | 8,192 | 函数调用 | 文✓ | 文✓ |
| Llama 3.1 8B Instruct | llama-3-1-8b-instruct | meta | 131,072 | 4,096 | 函数调用、结构化输出 | 文✓ | 文✓ |
| Llama 3.1 8B Instruct | llama3-1-8b-instruct | meta | 128,000 | 4,096 | 函数调用 | 文✓ | 文✓ |
| Llama 3.2 1b Instruct | llama-3-2-1b-instruct | meta | 128,000 | 4,096 | 函数调用、结构化输出 | 文✓ | 文✓ |
| Llama 3.2 3B Instruct | llama-3-2-3b-instruct | meta | 131,072 | 32,000 | 结构化输出 | 文✓ | 文✓ |
| Llama 3.3 70b Instruct | llama-3-3-70b-instruct | meta | 131,072 | 4,096 | 函数调用、结构化输出 | 文✓ | 文✓ |
| Llama 3.3 70B Instruct | llama-3-3-70b-instruct-maas | meta | 128,000 | 8,192 | 函数调用、结构化输出 | 文✓ | 文✓ |
| Llama 3.3 70B Instruct | llama3-3-70b-instruct | meta | 128,000 | 4,096 | 函数调用 | 文✓ | 文✓ |
| Llama 3.3 Nemotron Super 49B v1 | llama-3-3-nemotron-super-49b-v1 | meta | 131,072 | 65,536 | 函数调用、推理 | 文✓ | 文✓ |
| Llama 3.3 Nemotron Super 49B v1.5 | llama-3-3-nemotron-super-49b-v1-5 | meta | 131,072 | 65,536 | 函数调用、推理 | 文✓ | 文✓ |
| Llama-3.3-70B-Instruct | llama-3-3-70b | meta | 128,000 | 4,096 | 函数调用、文件输入 | 文✓ | 文✓ |
| Microsoft: Phi 4 | phi-4 | microsoft | 16,384 | - | 结构化输出 | 文✓ | 文✓ |
| Phi 4 Multimodal | phi-4-multimodal-instruct | microsoft | 128,000 | 16,384 | - | 文✓ | 文✓ |
| Phi-4-Mini | phi-4-mini-instruct | microsoft | 131,072 | 8,192 | 函数调用 | 文✓ | 文✓ |
| MiniMax M2.1 Lightning | minimax-m2-1-lightning | minimax | 204,800 | 131,072 | 函数调用、推理 | 文✓ | 文✓ |
| MiniMax-M2 | minimax-m2 | minimax | 205,000 | 205,000 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| MiniMax-M2.1 | minimax-m2-1 | minimax | 204,800 | 131,072 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| MiniMax-M2.5 | minimax-m2-5 | minimax | 204,800 | 131,072 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| MiniMax-M2.5-highspeed | minimax-m2-5-highspeed | minimax | 204,800 | 131,072 | 函数调用、推理 | 文✓ | 文✓ |
| MiniMax-M2.7 | minimax-m2-7 | minimax | 204,800 | 131,072 | 函数调用、推理、结构化输出、文件输入 | 文✓ | 文✓ |
| MiniMax-M2.7-highspeed | minimax-m2-7-highspeed | minimax | 204,800 | 131,100 | 函数调用、推理、文件输入 | 文✓ | 文✓ |
| MiniMax: MiniMax M1 | minimax-m1 | minimax | 1,000,000 | - | 函数调用、推理 | 文✓ | 文✓ |
| MiniMax: MiniMax M2-her | minimax-m2-her | minimax | 65,536 | - | - | 文✓ | 文✓ |
| Codestral (latest) | codestral | mistral | 256,000 | 4,096 | 函数调用、结构化输出、文件输入 | 文✓ | 文✓ |
| Codestral (latest) | codestral-latest | mistral | 256,000 | 4,096 | 函数调用 | 文✓ | 文✓ |
| Devstral 2 | devstral | mistral | 262,144 | 262,144 | 函数调用、结构化输出、文件输入 | 文✓ | 文✓ |
| Devstral 2 | devstral-2 | mistral | 256,000 | 256,000 | 函数调用 | 文✓ | 文✓ |
| Devstral 2 | devstral-latest | mistral | 262,144 | 262,144 | 函数调用 | 文✓ | 文✓ |
| Devstral 2 (latest) | devstral-medium-latest | mistral | 262,144 | 262,144 | 函数调用 | 文✓ | 文✓ |
| Devstral 2 123B | devstral-2-123b | mistral | 256,000 | 8,192 | 函数调用、结构化输出 | 文✓ | 文✓ |
| Devstral Medium | devstral-medium | mistral | 128,000 | 128,000 | 函数调用 | 文✓ | 文✓ |
| Magistral Medium (latest) | magistral-medium-latest | mistral | 128,000 | 16,384 | 函数调用、推理 | 文✓ | 文✓ |
| Ministral 14B 3.0 | ministral-3-14b-instruct | mistral | 128,000 | 4,096 | 函数调用、结构化输出 | 文✓ | 文✓ |
| Ministral 3 8B | ministral-3-8b-instruct | mistral | 128,000 | 4,096 | 函数调用、结构化输出 | 文✓ | 文✓ |
| Ministral 3B (latest) | ministral-3b-latest | mistral | 128,000 | 128,000 | 函数调用 | 文✓ | 文✓ |
| Ministral 8B (latest) | ministral-8b-latest | mistral | 128,000 | 128,000 | 函数调用 | 文✓ | 文✓ |
| Mistral 7B | open-mistral-7b | mistral | 8,000 | 8,000 | 函数调用 | 文✓ | 文✓ |
| Mistral-7B-Instruct-v0.3 | mistral-7b-instruct-v0-3 | mistral | 65,536 | 65,536 | 函数调用、结构化输出 | 文✓ | 文✓ |
| mistral-nemotron | mistral-nemotron | mistral | 128,000 | 8,192 | 函数调用 | 文✓ | 文✓ |
| Mistral: Mistral Small 3 | mistral-small-24b-instruct | mistral | 32,768 | - | 结构化输出 | 文✓ | 文✓ |
| Mistral: Saba | mistral-saba | mistral | 32,768 | - | 函数调用、结构化输出、文件输入 | 文✓ | 文✓ |
| Mixtral 8x22B | open-mixtral-8x22b | mistral | 64,000 | 64,000 | 函数调用 | 文✓ | 文✓ |
| Mixtral 8x7B | open-mixtral-8x7b | mistral | 32,000 | 32,000 | 函数调用 | 文✓ | 文✓ |
| Kimi K2 0905 | kimi-k2-instruct | moonshot | 262,144 | 262,144 | 函数调用 | 文✓ | 文✓ |
| Kimi K2 Thinking | kimi-k2-thinking-maas | moonshot | 262,144 | 262,144 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| Moonshot Kimi K2 Thinking | kimi-k2 | moonshot | 262,144 | 216,144 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| Nous: Hermes 3 405B Instruct | hermes-3-llama-3-1-405b | nousresearch | 131,072 | - | 结构化输出 | 文✓ | 文✓ |
| Nous: Hermes 4 405B | hermes-4-405b | nousresearch | 131,072 | - | 推理、结构化输出 | 文✓ | 文✓ |
| esm2-650m | esm2-650m | nvidia | 128,000 | 8,192 | - | 文✓ | 文✓ |
| esmfold | esmfold | nvidia | 128,000 | 8,192 | - | 文✓ | 文✓ |
| gliner-pii | gliner-pii | nvidia | 128,000 | 4,096 | - | 文✓ | 文✓ |
| Laguna XS 2.1 | laguna-xs-2-1 | nvidia | 262,144 | 16,384 | 函数调用、推理 | 文✓ | 文✓ |
| Llama 3.1 Nemotron 70B Instruct | llama-3-1-nemotron-70b-instruct | nvidia | 128,000 | 8,192 | 函数调用 | 文✓ | 文✓ |
| Llama 3.1 Nemotron Nano 8B v1 | llama-3-1-nemotron-nano-8b-v1 | nvidia | 131,072 | 16,384 | 函数调用、推理 | 文✓ | 文✓ |
| Llama 3.1 Nemotron Ultra 253B | llama-3-1-nemotron-ultra-253b-v1 | nvidia | 128,000 | 16,384 | 函数调用、推理 | 文✓ | 文✓ |
| llama-3.1-nemotron-safety-guard-8b-v3 | llama-3-1-nemotron-safety-guard-8b-v3 | nvidia | 128,000 | 4,096 | - | 文✓ | 文✓ |
| Mistral: Mixtral 8x22B Instruct | mixtral-8x22b-instruct | nvidia | 65,536 | 13,108 | 函数调用、结构化输出、文件输入 | 文✓ | 文✓ |
| Mistral: Mixtral 8x7B Instruct | mixtral-8x7b-instruct | nvidia | 32,768 | 16,384 | 函数调用 | 文✓ | 文✓ |
| Nemotron 3 Super | nemotron-3-super-120b-a12b | nvidia | 262,144 | 262,144 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| Nemotron 3 Ultra 550B A55B | nemotron-3-ultra-550b-a55b | nvidia | 1,000,000 | 65,536 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| Nemotron 3.5 Lightning 30B | nemotron-3-5-lightning | nvidia | 1,000,000 | 131,072 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| Nemotron 3.5 Lightning 30B A3B | nemotron-3-5-lightning-30b-a3b | nvidia | 262,144 | 262,144 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| nemotron-3-content-safety | nemotron-3-content-safety | nvidia | 128,000 | 4,096 | - | 文✓ | 文✓ |
| nemotron-3-nano-30b-a3b | nemotron-3-nano-30b-a3b | nvidia | 262,144 | 262,144 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| nemotron-content-safety-reasoning-4b | nemotron-content-safety-reasoning-4b | nvidia | 128,000 | 4,096 | 推理 | 文✓ | 文✓ |
| nemotron-mini-4b-instruct | nemotron-mini-4b-instruct | nvidia | 128,000 | 8,192 | 函数调用 | 文✓ | 文✓ |
| NVIDIA Nemotron 3 Super 120B A12B | nemotron-super-3-120b | nvidia | 262,144 | 131,072 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| NVIDIA Nemotron Nano 3 30B | nemotron-nano-3-30b | nvidia | 128,000 | 4,096 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| nvidia-nemotron-nano-9b-v2 | nemotron-nano-9b-v2 | nvidia | 131,072 | 131,072 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| riva-translate-4b-instruct-v1_1 | riva-translate-4b-instruct-v1-1 | nvidia | 128,000 | 4,096 | - | 文✓ | 文✓ |
| sarvam-m | sarvam-m | nvidia | 128,000 | 8,192 | 函数调用 | 文✓ | 文✓ |
| studiovoice | studiovoice | nvidia | 128,000 | 8,192 | - | 文✓ | 文✓ |
| usdcode | usdcode | nvidia | 128,000 | 4,096 | - | 文✓ | 文✓ |
| usdvalidate | usdvalidate | nvidia | - | 4,096 | - | 文✓ | 文✓ |
| GPT OSS 120B | gpt-oss-120b-maas | openai | 131,072 | 32,768 | 函数调用、推理 | 文✓ | 文✓ |
| GPT OSS 20B | gpt-oss-20b | openai | 131,072 | 32,768 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| GPT OSS 20B | gpt-oss-20b-maas | openai | 131,072 | 32,768 | 函数调用、推理 | 文✓ | 文✓ |
| GPT OSS Safeguard 120B | gpt-oss-safeguard-120b | openai | 128,000 | 16,384 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| GPT-3.5 Turbo | gpt-3-5-turbo | openai | 16,385 | 4,096 | 函数调用、结构化输出 | 文✓ | 文✓ |
| GPT-4 | gpt-4 | openai | 8,192 | 8,192 | 函数调用、结构化输出、文件输入 | 文✓ | 文✓ |
| GPT-5 Chat | gpt-5-chat | openai | - | - | 函数调用、推理、识图、结构化输出、文件输入 | - | 文✓ |
| GPT-OSS-120B | gpt-oss-120b | openai | 131,072 | 131,072 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| gpt-oss-safeguard-20b | gpt-oss-safeguard-20b | openai | 131,072 | 16,384 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| o3-mini | o3-mini | openai | 200,000 | 100,000 | 函数调用、推理、结构化输出、文件输入 | 文✓ | 文✓ |
| OpenAI: GPT-3.5 Turbo 16k | gpt-3-5-turbo-16k | openai | 16,385 | - | 函数调用、结构化输出 | 文✓ | 文✓ |
| OpenAI: GPT-3.5 Turbo Instruct | gpt-3-5-turbo-instruct | openai | 4,095 | - | 结构化输出 | 文✓ | 文✓ |
| OpenAI: GPT-4 Turbo Preview | gpt-4-turbo-preview | openai | 128,000 | - | 函数调用、结构化输出 | 文✓ | 文✓ |
| Perplexity Sonar Deep Research | sonar-deep-research | perplexity | 128,000 | 32,768 | 推理 | 文✓ | 文✓ |
| Reka Flash 3 | reka-flash-3 | reka | 65,536 | - | 推理、结构化输出 | 文✓ | 文✓ |
| Step 1 (32K) | step-1-32k | stepfun | 32,768 | 32,768 | 函数调用 | 文✓ | 文✓ |
| Step 2 (16K) | step-2-16k | stepfun | 16,384 | 8,192 | 函数调用 | 文✓ | 文✓ |
| Kat Coder Pro V2 | kat-coder-pro-v2 | streamlake | 262,144 | 256,000 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| KAT-Coder-Pro V1 | kat-coder-pro-v1 | streamlake | 256,000 | 32,000 | 推理 | 文✓ | 文✓ |
| Hunyuan 2.0 Instruct | hunyuan-2-0-instruct | tencent | 147,456 | 16,384 | 函数调用 | - | - |
| Hunyuan 2.0 Thinking | hunyuan-2-0 | tencent | 196,608 | 65,536 | 推理、函数调用 | - | - |
| Hunyuan 3 | hy3 | tencent | 262,144 | 131,072 | 推理、函数调用 | 文✓ | 文✓ |
| Hunyuan 3 Preview | hy3-preview | tencent | 262,144 | 131,072 | 推理、函数调用 | 文✓ | 文✓ |
| Hunyuan 4 Preview | hy4-preview | tencent | 1,048,576 | 65,536 | 推理、函数调用、结构化输出 | 文✓ | 文✓ |
| Hunyuan A13B Instruct | hunyuan-a13b-instruct | tencent | 262,144 | 32,768 | 推理、函数调用 | 文✓ | 文✓ |
| Hunyuan MT2 Lite | hy-mt2-lite | tencent | 8,192 | 4,096 | - | 文✓ | 文✓ |
| Hunyuan MT2 Plus | hy-mt2-plus | tencent | 8,192 | 4,096 | - | 文✓ | 文✓ |
| Hunyuan MT2 Pro | hy-mt2-pro | tencent | 8,192 | 4,096 | - | 文✓ | 文✓ |
| Hunyuan Role | hy-role | tencent | 32,768 | 4,096 | - | - | - |
| Hunyuan T1 | hunyuan-t1 | tencent | - | - | 推理、函数调用 | - | - |
| Hunyuan TurboS | hunyuan-turbos | tencent | - | - | 函数调用 | - | - |
| Tencent Code | tc-code | tencent | - | - | 函数调用 | - | - |
| Tencent: Hy-MT2-1.8B | hy-mt2-1-8b | tencent | 8,192 | - | - | 文✓ | 文✓ |
| Tencent: Hy-MT2-30B-A3B | hy-mt2-30b-a3b | tencent | 8,192 | - | 结构化输出 | 文✓ | 文✓ |
| Tencent: Hy-MT2-7B | hy-mt2-7b | tencent | 8,192 | - | 结构化输出 | 文✓ | 文✓ |
| Solar Pro 4 | solar-pro4 | upstage | 524,288 | 131,072 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| solar-10.7b-instruct | solar-10-7b-instruct | upstage | 128,000 | 8,192 | 函数调用 | 文✓ | 文✓ |
| solar-mini | solar-mini | upstage | 32,768 | 4,096 | 函数调用 | 文✓ | 文✓ |
| solar-pro2 | solar-pro2 | upstage | 65,536 | 8,192 | 函数调用、推理 | 文✓ | 文✓ |
| solar-pro3 | solar-pro3 | upstage | 131,072 | 8,192 | 函数调用、推理 | 文✓ | 文✓ |
| Upstage: Solar Pro 3 | solar-pro-3 | upstage | 131,072 | - | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| Laguna S 2.1 Free | laguna-s-2-1 | vercel | 1,048,576 | 131,072 | 函数调用、推理 | 文✓ | 文✓ |
| Morph v3 Fast | morph-v3-fast | vercel | 81,920 | 16,000 | - | 文✓ | 文✓ |
| Morph v3 Large | morph-v3-large | vercel | 262,144 | 32,000 | 结构化输出 | 文✓ | 文✓ |
| Palmyra X4 (US) | palmyra-x4 | writer | 122,880 | 8,192 | 函数调用、推理 | 文✓ | 文✓ |
| Palmyra X5 (US) | palmyra-x5 | writer | 1,040,000 | 8,192 | 函数调用、推理 | 文✓ | 文✓ |
| Grok 2 | grok-2 | xai | 131,072 | - | 函数调用 | - | - |
| Grok 3 | grok-3 | xai | 131,072 | - | 函数调用 | - | - |
| Grok 3 Fast | grok-3-fast | xai | 131,072 | - | 函数调用 | - | - |
| Grok 3 Mini | grok-3-mini | xai | 131,072 | - | 推理、函数调用 | - | - |
| Grok 3 Mini Fast | grok-3-mini-fast | xai | 131,072 | - | 推理、函数调用 | - | - |
| Grok 4 | grok-4 | xai | 256,000 | - | 推理、函数调用、识图 | - | - |
| Grok 4 Fast | grok-4-fast | xai | 2,000,000 | - | 推理、函数调用 | - | - |
| Grok 4.1 | grok-4-1 | xai | 256,000 | - | 推理、函数调用 | - | - |
| Grok Beta | grok-beta | xai | 131,072 | - | 函数调用 | - | - |
| Grok Code Fast 1 | grok-code-fast-1 | xai | 256,000 | - | 函数调用 | - | - |
| MiMo-V2-Flash | mimo-v2-flash | xiaomi | 262,144 | 65,536 | 函数调用、推理 | 文✓ | 文✓ |
| MiMo-V2-Pro | mimo-v2-pro | xiaomi | 1,048,576 | 131,072 | 函数调用、推理 | 文✓ | 文✓ |
| MiMo-V2.5-Pro | mimo-v2-5-pro | xiaomi | 1,050,000 | 131,072 | 函数调用、推理、结构化输出、文件输入 | 文✓ | 文✓ |
| MiMo-V2.5-Pro-UltraSpeed | mimo-v2-5-pro-ultraspeed | xiaomi | 1,048,576 | 131,072 | 函数调用、推理 | 文✓ | 文✓ |
| GLM 4.5 | glm-4-5 | zhipu | 131,072 | 98,304 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| GLM 4.5 Air | glm-4-5-air | zhipu | 131,072 | 98,304 | 函数调用、推理 | 文✓ | 文✓ |
| GLM 4.6 | glm-4-6 | zhipu | 204,800 | 131,072 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| GLM 4.7 | glm-4-7 | zhipu | 204,800 | 131,072 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| GLM 4.7 Flash | glm-4-7-flash | zhipu | 202,752 | 131,072 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| GLM 4.7 FlashX | glm-4-7-flashx | zhipu | 200,000 | 131,072 | 函数调用、推理 | 文✓ | 文✓ |
| GLM 5 Turbo | glm-5-turbo | zhipu | 202,800 | 131,100 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| GLM 5.2 Fast | glm-5-2-fast | zhipu | 1,000,000 | 128,000 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| GLM 5.3 | glm-5-3 | zhipu | 1,310,720 | 131,072 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| GLM 5.3 Fast | glm-5-3-fast | zhipu | 1,048,576 | 262,144 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| GLM-3-Turbo | glm-3-turbo | zhipu | 131,072 | - | 函数调用 | - | - |
| GLM-4 | glm-4 | zhipu | 131,072 | - | 函数调用 | - | - |
| GLM-4-Air | glm-4-air | zhipu | 131,072 | - | 函数调用 | - | - |
| GLM-4-AirX | glm-4-airx | zhipu | 8,192 | - | 函数调用 | - | - |
| GLM-4-Flash | glm-4-flash | zhipu | 131,072 | - | 函数调用 | - | - |
| GLM-4-FlashX | glm-4-flashx | zhipu | 131,072 | - | 函数调用 | - | - |
| GLM-4-Long | glm-4-long | zhipu | 1,024,000 | - | 函数调用 | - | - |
| GLM-4-Plus | glm-4-plus | zhipu | 131,072 | - | 函数调用 | - | - |
| GLM-4.5-Flash | glm-4-5-flash | zhipu | 131,072 | 98,304 | 函数调用、推理 | 文✓ | 文✓ |
| GLM-4.7 | glm-4-7-maas | zhipu | 200,000 | 128,000 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| GLM-5 | glm-5 | zhipu | 204,800 | 131,100 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| GLM-5 | glm-5-maas | zhipu | 202,752 | 131,072 | 函数调用、推理 | 文✓ | 文✓ |
| GLM-5.1 | glm-5-1 | zhipu | 204,800 | 131,072 | 函数调用、推理、结构化输出、文件输入 | 文✓ | 文✓ |
| GLM-5.2 | glm-5-2 | zhipu | 1,048,576 | 131,072 | 函数调用、推理、结构化输出 | 文✓ | 文✓ |
| GLM-Z1 | glm-z1 | zhipu | 131,072 | - | 推理 | - | - |
| GLM-Z1-Air | glm-z1-air | zhipu | 131,072 | - | 推理 | - | - |
| GLM-Z1-AirX | glm-z1-airx | zhipu | 131,072 | - | 推理 | - | - |
| GLM-Z1-Flash | glm-z1-flash | zhipu | 131,072 | - | 推理 | - | - |
| Z.ai: GLM Latest | glm-latest | zhipu | 1,310,720 | - | 函数调用、推理、结构化输出 | 文✓ | 文✓ |

</div>
