import { useState } from "react";
import { TbCopy, TbCheck } from "react-icons/tb";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { twilight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ children, language = null, showLineNumbers = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const textToCopy = typeof children === 'string' ? children : children.toString();
      await navigator.clipboard.writeText(textToCopy.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      try {
        const textArea = document.createElement('textarea');
        textArea.value = typeof children === 'string' ? children : children.toString();
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed: ', fallbackErr);
      }
    }
  };

  return (
    <div className="docs-code">
      <div className="docs-code-header">
        <button 
          className="docs-copy-button" 
          onClick={handleCopy}
          title={copied ? "Copied!" : "Copy to clipboard"}
          aria-label={copied ? "Code copied to clipboard" : "Copy code to clipboard"}
        >
          {copied ? <TbCheck /> : <TbCopy />}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={twilight}
        showLineNumbers={showLineNumbers}
        className="code-highlighter"
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
