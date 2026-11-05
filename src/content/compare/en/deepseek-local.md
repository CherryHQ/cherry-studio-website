# How to Run DeepSeek Locally with Ollama and Cherry Studio

Want DeepSeek on your own computer, working offline, with chats that never leave your machine? The simplest setup is Ollama to download and run the model, plus Cherry Studio as the chat app. You type one command; the rest happens in a normal desktop interface.

## Which DeepSeek can you actually run locally?

The full DeepSeek models behind the official app have hundreds of billions of parameters, and the weights alone take hundreds of gigabytes, which is far beyond a personal computer. The newest V4 models are cloud-only in Ollama.

"Running DeepSeek locally" usually means the **DeepSeek-R1 distilled models**: smaller Qwen and Llama models, from 1.5B to 70B, trained to reason like R1. They're weaker than the full model, but good enough for everyday questions, writing, translation and working through documents.

## Pick a size for your hardware

| Ollama tag | Download | Suggested hardware (rule of thumb) | Good for |
| --- | --- | --- | --- |
| deepseek-r1:1.5b | 1.1 GB | 8 GB RAM, no GPU needed | Trying it out |
| deepseek-r1:7b / 8b | 4.7 / 5.2 GB | 8 GB VRAM, or a Mac with 16 GB | Most people |
| deepseek-r1:14b | 9 GB | 12 GB+ VRAM, or a Mac with 32 GB | Better writing and analysis |
| deepseek-r1:32b | 20 GB | 24 GB VRAM, or a Mac with 48 GB+ | Close to cloud quality |
| deepseek-r1:70b | 43 GB | A Mac with 64 GB+ or multiple GPUs | Workstations |

If you're unsure, start with 8b and move up if it runs smoothly. Macs share memory between CPU and GPU, so a Mac can usually run a larger model than a laptop with the same amount of RAM.

## Step 1: Install Ollama

Download the installer from [ollama.com/download](https://ollama.com/download). Once installed, Ollama runs in the background. On Linux, run:

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

## Step 2: Download a DeepSeek model

Open a terminal (PowerShell on Windows) and run this, replacing 8b with the size you picked:

```bash
ollama pull deepseek-r1:8b
```

Run `ollama list` afterwards; if deepseek-r1:8b is listed, it's ready.

## Step 3: Connect it to Cherry Studio

1. [Download Cherry Studio](/download) for free and install it.
2. Go to **Settings → Model Provider**, select **Ollama** and turn it on. Keep the default API address `http://localhost:11434` and leave the API key empty.
3. Click **Manage** or **+ Add** and add `deepseek-r1:8b` to the model list.
4. Back in chat, choose deepseek-r1:8b from the model menu and start chatting. R1's reasoning appears in its own collapsible block, separate from the answer.

![Cherry Studio Model Provider settings with Ollama selected, the API address set to http://localhost:11434 and deepseek-r1:8b in the model list](/images/compare/deepseek-ollama-en.webp)

More detail: [Ollama setup guide](/docs/en/pre-basic/providers/ollama/).

## Go further: let local DeepSeek read your files

Create a knowledge base in Cherry Studio, add PDFs, Word files and notes, and pair it with a local embedding model (for example `ollama pull bge-m3`). Your files stay on your computer the whole time, which suits contracts and internal documents you'd rather not upload. (See [Create a knowledge base](/docs/en/knowledge-base/create/).)

You can also run a local model as an agent that sorts files and writes reports in a folder you choose. Small models struggle with multi-step tasks, so use 14b or larger, or let a cloud model plan while the local model handles sensitive content. (See [Agent workspace](/docs/en/advanced-basic/agent-workspace/).)

## Local model or API?

Running locally is free, works offline and keeps your data at home, but it needs decent hardware and won't match the full model. If quality matters more and you don't mind sending prompts to a provider, the [DeepSeek API](/docs/en/pre-basic/providers/deepseek/) is inexpensive.

In Cherry Studio you don't have to choose: add both, keep sensitive work on the local model and switch to the full model for hard problems from the same menu.

> **Give your local DeepSeek a proper chat app**
>
> Cherry Studio is free and open source for Windows, macOS and Linux. Connect Ollama to chat with local DeepSeek, work with your files and run agents, with every conversation stored on your computer.
>
> [Download free →](/download) · [Ollama setup guide](/docs/en/pre-basic/providers/ollama/)

## FAQ

### Do I need a GPU to run DeepSeek locally?

No. 1.5b and 7b run on a CPU, just more slowly. A GPU with 8 GB+ VRAM or an Apple silicon Mac makes a big difference.

### Does it work offline?

Yes. Once the model is downloaded, chat and local knowledge bases don't need the internet.

### Is local DeepSeek the same as the official app?

No. Locally you run a distilled R1 model, which is much smaller and weaker at complex reasoning and long-form writing.

### Is Cherry Studio free?

Yes, it's free and open source. With local models, the whole setup costs nothing.
