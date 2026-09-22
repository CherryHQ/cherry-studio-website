---
icon: bot
---

# Agents and tools

An Agent is a reusable work configuration that keeps role instructions, a model, and available tools together. It is useful for recurring work such as writing support, information organization, or calendar tasks.

<div data-mobile-gallery="pair">
<figure data-mobile-shot="phone"><a href="../../../assets/mobile/iphone-agent.webp"><img src="../../../assets/mobile/iphone-agent.webp" alt="Agent editor in Cherry Studio Mobile on iPhone"></a><figcaption><p><strong>iPhone</strong> · Configure an avatar, instructions, model, and tools</p></figcaption></figure>
<figure data-mobile-shot="tablet"><a href="../../../assets/mobile/ipad-agent.webp"><img src="../../../assets/mobile/ipad-agent.webp" alt="Agent editor in Cherry Studio Mobile on iPad"></a><figcaption><p><strong>iPad</strong> · Review tools and system permissions in a larger workspace</p></figcaption></figure>
</div>

## Create an agent

1. Create an agent and set its name, avatar, and task instructions.
2. Choose a model suitable for the task.
3. Enable web search, image generation, or system tools only when needed.
4. Review the tool approval behavior and save the agent.

Instructions should clearly state the goal, output format, and constraints. Never place API keys, passwords, or other long-lived credentials in agent instructions.

## Tools and system permissions

System tools such as calendars and reminders request operating-system access when first used. Grant access only to capabilities the agent genuinely needs. You can review or revoke permissions later in Android or iOS settings.

Tools may read data or perform external actions. Keep manual confirmation for important calendar events, files, or outbound content, and inspect the result after execution.
