import { useEffect, useState } from "react";
import DocsButtonBar from "./DocsButtonBar";
import CodeBlock from "./CodeBlock";
import { TbCopy, TbTerminal2 } from "react-icons/tb";

import codeoptions from '../assets/common/code-options.webp';

const Installation = () => {
  const [selectedMethod, setSelectedMethod] = useState('manual');

  const scrollToTop = () => window.scrollTo(0, 0);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <section className="docs-section">
      <p className="docs-paragraph dim">
        Using components is very straightforward, anyone can do it.
      </p>

      <h3 className="docs-category-title">Pick The Method</h3>

      <p className="docs-paragraph">
        You can keep it simple and copy code directly from the documentation, or you can use CLI commands to install components into your project.
      </p>

      <p className="docs-paragraph dim">
        Click the cards below to change your preferred method.
      </p>

      <div className="installation-methods">
        <div className={`installation-method ${selectedMethod === 'manual' ? 'method-active' : ''}`} onClick={() => setSelectedMethod('manual')}>
          <TbCopy style={{ fontSize: '50px' }} />
          <h4 className="method-title">Manual</h4>
        </div>

        <div className={`installation-method ${selectedMethod === 'cli' ? 'method-active' : ''}`} onClick={() => setSelectedMethod('cli')}>
          <TbTerminal2 style={{ fontSize: '50px' }} />
          <h4 className="method-title">CLI</h4>
        </div>
      </div>

      <h3 className="docs-category-title">Steps</h3>

      {selectedMethod === 'manual' && (
        <>
          <p className="docs-paragraph dim">
            Follow these steps to manually install components:
          </p>

          <h4 className="docs-category-subtitle">1. Pick a component</h4>

          <p className="docs-paragraph">
            Preview components and find something you like, then head to the <span className="docs-highlight">Code</span> tab.
          </p>

          <h4 className="docs-category-subtitle">2. Install dependencies</h4>

          <p className="docs-paragraph short">
            Components may use external libraries, don&apos;t forget to install them. For example, the SplitText component requires GSAP for smooth animations.
          </p>

          <CodeBlock showLineNumbers={true}>
            npm install gsap
          </CodeBlock>

          <h4 className="docs-category-subtitle">3. Copy the code</h4>

          <p className="docs-paragraph short">
            The <span className="docs-highlight">Code</span> tab also contains all the code you need to copy - you can use the controls below to switch between technologies on the Code tab.
          </p>

          <div className="docs-code-options">
            <img src={codeoptions} className="code-options-img" />
          </div>

          <h4 className="docs-category-subtitle">4. Use the component</h4>
          <p className="docs-paragraph short">
            A basic usage example is provided for every component, and if you want to go into details, you can check all the available props on the <span className="docs-highlight">Preview</span> tab.
          </p>

          <CodeBlock showLineNumbers={true}>
{`import SplitText from "./SplitText";

<SplitText
  text="Hello, you!"
  delay={100}
  duration={0.6}
/>`}
          </CodeBlock>
        </>
      )}

      {selectedMethod === 'cli' && (
        <>
          <p className="docs-paragraph dim">
            Follow these steps to use the CLI to install components:
          </p>

          <p className="docs-paragraph">
            React Bits uses a <a style={{ textDecoration: 'underline' }} href="https://jsrepo.dev/" target="_blank">jsrepo</a> registry to host components, making it very easy for you to bring them into your projects. Here, you have two options:
          </p>

          <h4 className="docs-category-subtitle">1. One-time Installation</h4>

          <p className="docs-paragraph">
            You can install components fast using a one-time install command. You&apos;ll get prompted to select an installation path and to install dependencies.
          </p>

          <p className="docs-paragraph short">
            All you need to do is run the command below:
          </p>

          <CodeBlock>
{`npx jsrepo add https://reactbits.dev/<PREFERENCE>/TextAnimations/SplitText`}
          </CodeBlock>

          <p className="docs-paragraph short">
            In this command, &lt;PREFERENCE&gt; can be replaced with the following options:
          </p>

          <ul className="docs-list">
            <li className="docs-list-item"><span className="docs-highlight">default</span> - for projects that use JavaScript and Plain CSS</li>
            <li className="docs-list-item"><span className="docs-highlight">tailwind</span> - for projects that use JavaScript and Tailwind CSS</li>
            <li className="docs-list-item"><span className="docs-highlight">ts/default</span> - for projects that use TypeScript and Plain CSS</li>
            <li className="docs-list-item"><span className="docs-highlight">ts/tailwind</span> - for projects that use TypeScript and Tailwind CSS</li>
          </ul>

          <h4 className="docs-category-subtitle">2. Project-wide CLI Setup</h4>

          <p className="docs-paragraph">
            The full setup can help you when you want to use multiple components - setting it up once makes it faster to bring in any component you need.
          </p>

          <p className="docs-paragraph short">
            Similarly, just replace &lt;PREFERENCE&gt; in the command below, follow the prompts, and your configuration file will be created:
          </p>

          <CodeBlock>
{`npx jsrepo init https://reactbits.dev/<PREFERENCE>`}
          </CodeBlock>

          <p className="docs-paragraph short">
            Afterwards, you can browse a full list of components and select what you need:
          </p>

          <CodeBlock>
{`npx jsrepo add`}
          </CodeBlock>

          <p className="docs-paragraph short">
            Or you can install a specific component by providing the category and name:
          </p>

          <CodeBlock>
{`npx jsrepo add TextAnimations/SplitText`}
          </CodeBlock>

          <p className="docs-paragraph dim">
            P.S. - Installing jsrepo globally will help you avoid typing `npx` every time
          </p>
        </>
      )}


      <h4 className="docs-category-subtitle">That&apos;s all!</h4>

      <p className="docs-paragraph">
        From here on, it&apos;s all about how you integrate the component into your project. The code is yours to play around with - modify styling, functionalities, anything goes!
      </p>

      <DocsButtonBar
        next={{ label: 'Mcp Server', route: '/get-started/mcp' }}
        previous={{ label: 'Introduction', route: '/get-started/introduction' }}
      />
    </section>
  );
}

export default Installation;