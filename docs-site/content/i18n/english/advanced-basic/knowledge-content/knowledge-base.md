---
icon: book-open
---
# Building Knowledge Bases and Recall Testing

A knowledge base processes files, web pages, and notes into retrievable chunks. It is suitable for answering "what does the documentation say," but it does not mean the model permanently memorizes the entire document.

## Creating and Importing Materials

{% stepper %}
{% step %}
### 1. Open [Knowledge Base] → [New Knowledge Base]

Enter an easily recognizable name and select an available embedding model. The embedding model is responsible for converting materials into searchable representations; it is distinct from the main model used for conversation.
{% endstep %}

{% step %}
### 2. Select Data Sources

You can add files, folders, notes, or URLs. Common document formats include PDF, DOCX, Markdown, Excel, TXT, and CSV; scanned documents may require OCR to extract text.
{% endstep %}

{% step %}
### 3. Wait for Processing to Complete

Open file details to view the preview and chunks. If titles are missing, text is garbled, or table structures are lost, clean up the original file first, then reprocess it.
{% endstep %}

{% step %}
### 4. Perform Recall Testing

Test with questions real users would ask, not just file titles. Check whether the returned chunks are relevant and contain complete context before deciding whether to bind them to an Agent.
{% endstep %}
{% endstepper %}

<figure><img src="../../../../assets/203ae7d1fc3c8b76bd8af0a8.webp" alt="The name, embedding model, and save entry points when creating a new Knowledge Base"><figcaption><p>When creating a new knowledge base, first enter a name and select an available embedding model. </p></figcaption></figure>

<figure><img src="../../../../assets/7e64d06ef22f90944b1896ee.webp" alt="Ready-to-use note sources and recall test entry in the Employee Travel Policy Knowledge Base"><figcaption><p>① Three business travel documents are ready; ② Click [Recall Test] at the top to verify with real-world questions. </p></figcaption></figure>

<figure><img src="../../../../assets/c00520c08c9364fe13caad57.webp" alt="Recall test results for whether overseas car rentals are reimbursable in the Knowledge Base"><figcaption><p>① Enter questions you would actually ask in work; ② Check the matched documents, chunk content, and relevance. </p></figcaption></figure>

### Validate Recall Results with Real Questions

Once documents show [Ready], test them with questions that would actually arise in your work. For example, for a policy library, you might ask, "Can overseas car rentals be reimbursed?" Then check if the returned content comes from the correct document and includes sufficient context.

| Observed Result | Next Step |
| --------------- | ----------------------- |
| Correct document matched, chunk sufficient to answer the question | Can be bound to an Agent for use |
| Correct document matched, but chunk is truncated | Check the original structure first, then adjust chunk length |
| Outdated policy or irrelevant document matched | Clean up expired materials, add clearer titles and content |
| No results at all | Check document status and query wording; do not blindly increase the number of returned results first |

{% hint style="info" %}
After passing the recall test, verify the complete Q&A in the Agent. This helps distinguish between "document not found" and "document found but answer quality is poor."
{% endhint %}

## Understanding RAG Settings

RAG stands for "retrieve documents first, then let the model answer." Common settings control chunk length, overlap range, number of results returned, and relevance threshold.

| Configuration | Function | Recommended Starting Point | When to Adjust |
| ----- | -------------- | -------- | ------------------- |
| Chunk Length | Determines how much content each retrieved chunk contains | Use the page's initial value | When chunks frequently truncate sentences or mix in too many topics |
| Chunk Overlap | Maintains continuity between adjacent chunks | Keep a small amount of overlap | When clauses span chunks or context is frequently broken |
| Number of Results | How many candidate chunks are provided at once | Start with a small number of results | Increase if key documents are missed; decrease if there is too much noise |
| Relevance Threshold | Filters out irrelevant content | Determine via recall testing | Increase if many irrelevant results appear; decrease if correct chunks are filtered out |

<figure><img src="../../../../assets/24f5e32e3c72df907aaed3a6.webp" alt="The segmentation, return, and filtering settings for Knowledge Base RAG"><figcaption><p>Only adjust RAG settings based on document structure when recall results are unstable. </p></figcaption></figure>

### Use Case: Building an Internal Policy Q&A Library

Organize current policies by department, ensuring filenames include the topic and scope of application. After importing, perform recall testing with real questions such as "How to handle business travel accommodation exceeding standards" or "Who needs to approve leave during the probation period." Once chunk accuracy is confirmed, bind this knowledge base only to the "Policy Q&A" Agent, and require it to cite the document name in its answers; if content is missing, explicitly state that it was not found.

{% hint style="warning" %}
The knowledge base does not automatically determine if files are outdated. When policies, prices, or processes change, update or remove old materials and re-run recall testing.
{% endhint %}

<details>

<summary>Why are there no results after importing? </summary>

Check the file processing status, embedding model connection, and document preview. If a scanned PDF has no extractable text, you must configure OCR first or switch to a searchable version.

</details>
