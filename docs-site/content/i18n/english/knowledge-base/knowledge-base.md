---
icon: compass
---

<a id="knowledge-base-tutorial"></a>

# Getting Started with Knowledge Bases

A knowledge base organizes files, notes, folders and web pages for repeated retrieval. Check that retrieval finds the right passages before using the knowledge base in chat or with an Agent.

{% hint style="info" %}
Embedding models are optional. Choose **None** to start with BM25 keyword retrieval; add an embedding model when you need semantic matching. A reranker is optional too.
{% endhint %}

## Your first knowledge base

1. <a id="create-knowledge-base"></a>Open **Knowledge Base** in the left navigation and use the add button above the list. Give it a focused name, such as “Employee travel policy”.

2. <a id="add-embedding-model"></a>For the first trial, set **Embedding Model** to **None**. Configure an embedding model later if different wording or synonyms make keyword retrieval insufficient.

3. <a id="add-data-from-multiple-sources"></a><a id="add-files-and-vectorize"></a>Open the knowledge base and add a **File**, **Note**, **Folder** or **Link**. Start with a small amount of relevant material.

4. Wait for processing to finish. Inspect the extracted text and **Chunks** for missing pages, garbled text or incorrect order.

5. <a id="search-knowledge-base"></a>Open **Retrieval Test** and ask a real question whose answer you know. Confirm that the correct source appears among the first results.

6. <a id="cite-knowledge-base-in-conversation-to-generate-replies"></a>Once retrieval is reliable, select the knowledge base in the chat input area, or bind it on the Agent editing page for an ongoing workflow.

![Sources: files, notes, folders and links](../../../assets/4622da2093d43942d7ee443e.webp)

## Check before relying on answers

Keep 3–5 realistic test questions and rerun them after changing data or settings. If retrieval fails, check the source text and chunks first. A chat model cannot recover key facts that were not retrieved.

If you enable a cloud embedding or reranking model, its pricing and data handling depend on the provider. Keep material with different access requirements in separate knowledge bases.
