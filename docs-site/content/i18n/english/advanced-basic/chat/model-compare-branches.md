---
icon: code-branch
---
# Multi-Model Comparison and Message Branching

Multi-model comparison is ideal for questions without a single correct answer, such as reviewing proposals, exploring copywriting directions, or cross-checking sources. Message branching allows you to try a different path from a specific node without duplicating the entire conversation.

## Comparing Multiple Models Simultaneously

{% stepper %}
{% step %}
### 1. Open [Chat] and click the model name

Select the models you want to compare in the model selector. Before first use, ensure that the services associated with these models are connected properly.
{% endstep %}

{% step %}
### 2. Send the same question

Include evaluation criteria in your question, for example, "Compare from the perspectives of feasibility, risk, and cost." Avoid asking only "Which is better?"
{% endstep %}

{% step %}
### 3. Compare differences, not just pick the longest answer

Focus on whether facts are consistent, assumptions are explicit, what is missing, and which option best fits your constraints. Verify important facts against original sources.
{% endstep %}
{% endstepper %}

<figure><img src="../../../../assets/290e0288048d57cd868cb443.webp" alt="The model selector and multiple model entries in the conversation"><figcaption><p>Select multiple models from the model selector, then compare differences using the same question.</p></figcaption></figure>

{% hint style="warning" %}
Selecting multiple models triggers separate requests for each. When dealing with costs, speed, or sensitive data, use short questions first to confirm connectivity and performance before processing long materials.
{% endhint %}

## Creating Branches from Messages

Locate the message you want to re-explore, open the message menu, and select the branch action. The new branch retains the previous context, while subsequent messages are recorded separately from the original path. Use the Branch Manager to switch between, compare, and return to different paths.

You can also create an empty branch in the branch canvas. Empty branches are saved immediately upon creation, persist after restarting the app, and remain in the branch canvas; the next time you send content in the input box, this branch will be populated. To remove an empty branch you no longer need, delete it from the node's right-click menu.

<figure><img src="../../../../assets/0bc4cb0c28265626960cd849.webp" alt="Two conversation branches and six message nodes in the Branch Manager"><figcaption><p>The Branch Manager retains both the "Pre-launch Checklist" and "Quick Pilot" paths.</p></figcaption></figure>

In the image: ① Branch node and current path; ② Legend for user, assistant, current path, and disabled path. The example retains two paths: "Pre-launch Checklist" and "Quick Pilot," totaling 2 branches and 6 message nodes.

### Use Case: Reviewing Two Release Proposals

First, ask the model to identify risks and gaps in the proposals. Then, from the same response, ask follow-up questions such as "Add a pre-launch checklist" and "Evaluate from a quick pilot perspective." Once you open the Branch Manager, both paths are retained side-by-side, allowing you to continue asking questions on either path or switch back to the other to verify conclusions.

<details>

<summary>When is it not suitable to use multiple models?</summary>

Using a single model is more appropriate when looking up a specific fact, organizing short text, or when the material contains content that should not be sent to multiple service providers.

</details>

<details>

<summary>Do branches modify the original message?</summary>

No. Branches continue from the selected node, the original path remains intact, and you can return to it at any time.

</details>
