---
icon: network-wired
---
# MCP and External Tools

MCP is the connection method that enables Agents to use external tools and resources. Cherry Studio can manage MCP servers, built-in servers, service marketplaces, and specific provider entries, then bind connected servers to designated Agents.

### When to Use MCP

<figure><img src="../../../../../assets/d2a9cd99b66df87ce02e196e.webp" alt="Quick creation, import from JSON, and manual creation methods for MCP servers"><figcaption></figcaption></figure>

<figure><img src="../../../../../assets/79e45524b78de312b0ea7d2b.webp" alt="Server list, search, and add entry in the MCP settings page"><figcaption></figcaption></figure>

* The Agent needs to call services beyond Cherry Studio's built-in tools;
* Your team already has databases, browsers, or business systems that provide MCP interfaces;
* You want to reuse the same external capabilities across multiple Agents;
* You need to provide tools, resources, or prompts to the model in a unified manner.

Use skills for fixed workflows, and bind the Cherry Studio knowledge base directly for retrieval tasks. Do not set up MCP solely to appear "more advanced."

### Adding a Server

Path: [Settings] → [MCP] → [MCP Servers] → [Add].

{% stepper %}
{% step %}
#### 1. Confirm the Connection Method

Local commands typically use standard input/output; remote services usually provide SSE or streamable HTTP addresses. Fill in the configuration exactly as provided by the service provider; do not guess based on names.
{% endstep %}

{% step %}
#### 2. Fill in Configuration and Check Permissions

Local servers require commands, arguments, and environment variables; remote servers require a URL, and some services also require authorization. Before saving, verify the command source and data scope.
{% endstep %}

{% step %}
#### 3. Start and Inspect Tools

Enable the server, wait for the status to become normal, then open the details to inspect the tools, resources, and prompts it provides. If the connection fails, check the server logs first.

Expand a tool in the tool list to view its full Markdown description, as well as parameters, types, required flags, and enum values displayed hierarchically. Verify required parameters before calling. Expand object or array parameters layer by layer to avoid guessing the input format based solely on the tool name.
{% endstep %}

{% step %}
#### 4. Bind to Agent

Open [Work] → Agent menu → [Edit] → [MCP], and enable the server. Servers that are not started cannot be bound or used properly.
{% endstep %}
{% endstepper %}

### Built-in Servers and Service Marketplace

[Built-in MCP] provides common capabilities that can be installed or enabled directly; [Service Marketplace] is used to manage third-party marketplace sources. Before installing, still review the instructions, commands, environment variables, and permissions. Built-in entries do not imply that all operations of external services are risk-free.

<figure><img src="../../../../../assets/3892f8eaa6ef4645921a382d.webp" alt="QVeris, Browser, Python, and other servers in the built-in MCP list"><figcaption><p>① The built-in list indicates whether an account, API Key, or directory configuration is required; after installation, you must still complete the configuration and verify the connection. </p></figcaption></figure>

QVeris is located in [Built-in Servers] and is used to allow Agents to discover, inspect, and call external capabilities. After installation, you need to configure `QVERIS_API_KEY`; do not write keys into Agent prompts, skills, or public screenshots.

### Using MCP Prompts and Resources in the Input Area

In addition to tools, servers may also provide "prompts" and "resources." After a server is bound to the current assistant or Agent, open the [+] panel in the input area:

* Select [MCP Prompts] to insert a server template into the input box; required parameters in the template will appear as fillable fields;
* Select [MCP Resources] to choose files, records, or other resources from bound servers;
* Short text resources are inserted directly into the input box; larger or binary resources are added as references, which models supporting tool calls can read when needed.

{% hint style="info" %}
The panel only displays servers that are connected within the current conversation scope and actually provide the corresponding capabilities. If you do not see [MCP Prompts] or [MCP Resources], first check the corresponding tabs in the server details, then confirm that the current assistant or Agent is bound to that server.
{% endhint %}

### Configuration Recommendations

| Configuration Item | Product Default | Recommended Starting Point | Function | Applicable Scenarios | Notes |
| -------- | -------------- | ----------------- | --------- | ------------- | ------------ |
| Server Status | Determined by configuration after adding | Enable and verify one at a time | Controls server availability | Initial integration, troubleshooting | Hard to locate issues when multiple services fail simultaneously |
| Agent Binding | Does not automatically bind all servers | Bind only servers required by the current Agent | Controls capability scope | Multi-Agent division of labor | Avoids irrelevant tools occupying context |
| Environment Variables | Keys are not pre-filled | Use minimal privilege credentials required by the service | Provides authentication or runtime parameters | Private services | Mask sensitive content before taking screenshots or exporting |
| Tool Approval | Determined by Agent permission mode | Keep confirmation for write or billing tools | Prevents unintended operations | Databases, files, external APIs | Channel entries can use stricter modes |

### User Case: Connecting a Project Database to an Analysis Agent

The administrator provides a read-only MCP connection. The user verifies the server is normal in [Settings] → [MCP], then binds it only to the "Data Analysis" Agent. The Agent uses read-only tools to retrieve data and writes reports to the working directory; tools involving data updates are not enabled. This ensures that even if the prompt is misunderstood, the business database will not be directly modified.

<details>

<summary>What is the difference between MCP and an API gateway? </summary>

MCP integrates external tools into Cherry Studio; an API gateway provides Cherry Studio's model capabilities to other programs via a compatible API. The data flow direction is opposite.

</details>

<details>

<summary>The server shows as connected, but the Agent still cannot find the tools. What should I do? </summary>

Check if the Agent is bound to the server, if the tools are disabled, or if permission requests are pending. After modifying the Agent configuration, send a new message to allow the runtime to load the new tools.

</details>

<details>

<summary>The server shows as connected, but the Agent still cannot find the tools. What should I do? </summary>

Check if the Agent is bound to the server, if the tools are disabled, or if permission requests are pending. After modifying the Agent configuration, send a new message to allow the runtime to load the new tools.

</details>

<figure><img src="../../../../../assets/3892f8eaa6ef4645921a382d.webp" alt="QVeris, Browser, Python, and other servers in the built-in MCP list"><figcaption></figcaption></figure>
