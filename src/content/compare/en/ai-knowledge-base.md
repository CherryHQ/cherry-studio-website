# Build a Local AI Knowledge Base on Your Own Computer

Company policies, product manuals, project files: finding the one sentence you need can take ages. Turn those files into an AI knowledge base and just ask. The AI finds the relevant passages in your documents and answers with sources. Cherry Studio keeps the knowledge base on your computer, and with local models your files never have to leave it.

## When a knowledge base is worth it

| What you need | What to do |
| --- | --- |
| Policies, manuals or project files you check again and again | Build a knowledge base |
| A one-off look at a single attachment | Upload it to the chat instead |
| Material that's still being written | Keep it in notes and import it once it's final |
| An AI that works from your documents long term | Build a knowledge base and bind it to an agent |

## Set up your first knowledge base in five minutes

1. **Create it**: click Knowledge in the left sidebar and add one. Name it by subject and purpose, such as "Travel expense policy", and keep one subject per knowledge base.
2. **Choose retrieval**: you can skip the embedding model at first and use keyword search to get started. Add an embedding model later when people ask questions in their own words.
3. **Add sources**: files (PDF, Word, PowerPoint, Excel, Markdown, TXT, CSV, HTML, EPUB), Cherry Studio notes, a whole local folder, or a web page link.
4. **Check processing**: open a source and look at the text and chunks for garbled text, missing pages or broken order.
5. **Run a recall test**: ask a question you already know the answer to and see whether the right passage comes up near the top.
6. **Use it**: select the knowledge base in the chat input, or bind it to an agent.

(Step-by-step: [Knowledge base basics](/docs/en/knowledge-base/knowledge-base/).)

![Cherry Studio answering a question from PDFs in a local knowledge base, with the cited file shown](/images/compare/ai-knowledge-base-en-1.webp)

## Recall testing: make sure the right passages are found

When a knowledge base gives poor answers, the chat model often isn't the problem: it never received the right passage. Cherry Studio lets you test retrieval before you ask. Type a real question and see exactly which chunks come back and in what order.

Keep three to five questions with known answers as a baseline and rerun them whenever you update sources or settings. (See [Recall test](/docs/en/knowledge-base/recall-test/).)

![Cherry Studio knowledge base Recall Test listing the passages a search would retrieve, with their rank](/images/compare/ai-knowledge-base-en-2.webp)

## Keeping files on your computer

The knowledge base itself is stored locally. To keep the whole process offline:

- use a local embedding model through Ollama, such as bge-m3;
- use a local chat model for answers;
- run OCR locally for scanned documents.

That makes it safe for contracts and internal documents you'd rather not upload. If the material isn't sensitive, cloud embedding and chat models usually give better results.

## Hand it to an agent

A knowledge base isn't only for Q&A. Bound to an agent, it can check expense claims against your policy, answer customer questions from the product manual, or review documents against internal guidelines. The agent works only from the bound knowledge base and says so when it can't find support, rather than making something up. (See [Using knowledge bases with agents](/docs/en/knowledge-base/agent/).)

> **Download Cherry Studio and turn your documents into a knowledge base**
>
> Free and open source for Windows, macOS and Linux. Import PDFs, Word files, notes and web pages, get answers with sources, and go fully offline with local models.
>
> [Download free →](/download) · [Create a knowledge base](/docs/en/knowledge-base/create/)

## FAQ

### Can I use a knowledge base without an embedding model?

Yes. Without one, Cherry Studio uses keyword search (BM25). Add an embedding model for semantic search when questions are worded very differently from the source text.

### How do I import a lot of files?

You can select up to 20 items at a time, so add large sets in batches or import a whole local folder. Keep one subject per knowledge base for more accurate retrieval.

### What happens when a document is updated?

Add the new file with the same name and choose Replace to overwrite the old version. Keep All leaves both versions in retrieval, which only makes sense when you really need to compare versions.

### Can I import scanned PDFs?

Yes, but they need OCR first. Spot-check the recognized text afterwards, especially tables and numbers.
