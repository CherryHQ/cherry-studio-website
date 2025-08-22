import { useEffect, useState } from "react";
import DocsButtonBar from "./DocsButtonBar";
import CodeBlock from "./CodeBlock";
import { TbCode, TbSearch, TbBox, TbList, TbSparkles, TbAccessPoint } from "react-icons/tb";

const McpServer = () => {
  const [selectedMethod, setSelectedMethod] = useState('cursor');

  const scrollToTop = () => window.scrollTo(0, 0);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <section className="docs-section">
      <p className="docs-paragraph dim">
        The React Bits MCP Server enables AI assistants to intelligently browse, search, and recommend components from the React Bits library.
      </p>

      <h3 className="docs-category-title">What is MCP?</h3>

      <p className="docs-paragraph">
        <a style={{ textDecoration: 'underline' }} href="https://modelcontextprotocol.io/" target="_blank">Model Context Protocol (MCP)</a> is an open standard that enables AI assistants to securely connect to external data sources and tools.
      </p>

      <h3 className="docs-category-title">Setup Method</h3>

      <p className="docs-paragraph dim">
        Choose your AI assistant to see the specific setup instructions.
      </p>

      <div className="installation-methods">
        <div className={`installation-method ${selectedMethod === 'cursor' ? 'method-active' : ''}`} onClick={() => setSelectedMethod('cursor')}>
          <TbSparkles style={{ fontSize: '50px' }} />
          <h4 className="method-title">Cursor</h4>
        </div>

        <div className={`installation-method ${selectedMethod === 'other' ? 'method-active' : ''}`} onClick={() => setSelectedMethod('other')}>
          <TbAccessPoint style={{ fontSize: '50px' }} />
          <h4 className="method-title">Other Clients</h4>
        </div>
      </div>

      <h3 className="docs-category-title">Configuration</h3>

      {selectedMethod === 'cursor' && (
        <>
          <p className="docs-paragraph dim">
            Add the React Bits MCP Server to your Cursor configuration:
          </p>

          <h4 className="docs-category-subtitle">1. Open Cursor Settings</h4>

          <p className="docs-paragraph">
            Open Cursor settings by pressing <span className="docs-highlight">Cmd + Shift + P</span> (macOS) or <span className="docs-highlight">Ctrl + Shift + P,</span> (Windows), then search for <span className="docs-highlight">&ldquo;Open MCP Settings&rdquo;</span>
          </p>

          <h4 className="docs-category-subtitle">2. Add MCP Server Configuration</h4>

          <p className="docs-paragraph short">
            Select <span className="docs-highlight">&ldquo;New MCP Server&rdquo;</span>, then add the React Bits MCP server configuration:
          </p>

          <CodeBlock showLineNumbers={true}>
{`
  "react-bits-mcp": {
    "command": "npx",
    "args": ["mcp-remote", "https://react-bits-mcp.davidhzdev.workers.dev/sse"]
  }
`}
          </CodeBlock>

          <h4 className="docs-category-subtitle">3. Enable the MCP Server</h4>

          <p className="docs-paragraph">
            After adding the configuration, toggle the React Bits MCP server on in the MCP settings. You should see the server connect successfully in the MCP status indicator.
          </p>
        </>
      )}

      {selectedMethod === 'other' && (
        <>
          <p className="docs-paragraph dim">
            For other MCP-compatible clients, use the following connection details:
          </p>

          <h4 className="docs-category-subtitle">MCP Server Endpoint</h4>

          <CodeBlock>
            https://react-bits-mcp.davidhzdev.workers.dev/sse
          </CodeBlock>

          <h4 className="docs-category-subtitle">Alternative JSON-RPC Endpoint</h4>

          <CodeBlock>
            https://react-bits-mcp.davidhzdev.workers.dev/mcp
          </CodeBlock>

          <p className="docs-paragraph">
            Refer to your MCP client&apos;s documentation for specific configuration instructions.
          </p>
        </>
      )}

      <h3 className="docs-category-title">Available Tools</h3>

      <p className="docs-paragraph">
        Once connected, your AI assistant will have access to these tools:
      </p>

      <div className="docs-tool-list">
        <div className="docs-tool-item">
          <div className="docs-tool-icon">
            <TbSearch />
          </div>
          <div className="docs-tool-content">
            <h4 className="docs-tool-title">search_components</h4>
            <p className="docs-tool-description">
              Search for components by asking for &ldquo;text animation&rdquo;, &ldquo;cursor effects&rdquo;, or &ldquo;card components&rdquo;.
            </p>
          </div>
        </div>

        <div className="docs-tool-item">
          <div className="docs-tool-icon">
            <TbCode />
          </div>
          <div className="docs-tool-content">
            <h4 className="docs-tool-title">get_component_info</h4>
            <p className="docs-tool-description">
              Get details about any component - dependencies, installation instructions, and usage examples.
            </p>
          </div>
        </div>

        <div className="docs-tool-item">
          <div className="docs-tool-icon">
            <TbList />
          </div>
          <div className="docs-tool-content">
            <h4 className="docs-tool-title">list_components</h4>
            <p className="docs-tool-description">
              Browse all available components, optionally filtered by category or complexity.
            </p>
          </div>
        </div>

        <div className="docs-tool-item">
          <div className="docs-tool-icon">
            <TbBox />
          </div>
          <div className="docs-tool-content">
            <h4 className="docs-tool-title">get_categories</h4>
            <p className="docs-tool-description">
              Get an overview of all component categories with descriptions and component counts.
            </p>
          </div>
        </div>
      </div>

      <h3 className="docs-category-title">Usage Examples</h3>

      <p className="docs-paragraph">
        Here are some example prompts you can use with your AI assistant:
      </p>

      <CodeBlock>
{`"Find me a text animation component for my hero section"

"I need a cursor effect that follows mouse movement"

"Show me all background components with simple complexity"

"Get installation instructions for the SplitText component"

"What components are available in the animations category?"`}
      </CodeBlock>

      <h4 className="docs-category-subtitle">Component Variants</h4>

      <p className="docs-paragraph">
        All components support multiple technology stacks. When requesting component info, you can specify:
      </p>

      <ul className="docs-list">
        <li className="docs-list-item"><span className="docs-highlight">typescript-tailwind</span> - TypeScript with Tailwind CSS (default)</li>
        <li className="docs-list-item"><span className="docs-highlight">typescript-default</span> - TypeScript with Plain CSS</li>
        <li className="docs-list-item"><span className="docs-highlight">tailwind</span> - JavaScript with Tailwind CSS</li>
        <li className="docs-list-item"><span className="docs-highlight">default</span> - JavaScript with Plain CSS</li>
      </ul>

      <h3 className="docs-category-title">Features</h3>

      <p className="docs-paragraph">
        The React Bits MCP Server provides intelligent component recommendations with:
      </p>

      <ul className="docs-list">
        <li className="docs-list-item">🔍 <strong>Smart Search</strong> - Natural language component discovery</li>
        <li className="docs-list-item">📦 <strong>Installation Ready</strong> - Complete setup instructions with dependencies</li>
        <li className="docs-list-item">🎯 <strong>Variant Support</strong> - Choose your preferred tech stack</li>
        <li className="docs-list-item">📝 <strong>Usage Examples</strong> - Real code snippets for immediate use</li>
        <li className="docs-list-item">🏷️ <strong>Smart Filtering</strong> - Filter by category, complexity, and tags</li>
        <li className="docs-list-item">🔗 <strong>Direct Links</strong> - Links to live demos and documentation</li>
      </ul>

      <h4 className="docs-category-subtitle">That&apos;s all!</h4>

      <p className="docs-paragraph">
        Your AI assistant now has intelligent access to the entire React Bits component library. Ask for recommendations, get instructions, or explore components!
      </p>

      <DocsButtonBar
        next={{ label: 'Browse Components', route: '/text-animations/split-text' }}
        previous={{ label: 'Installation', route: '/get-started/installation' }}
      />
    </section>
  );
}

export default McpServer;