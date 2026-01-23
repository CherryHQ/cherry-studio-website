import { getLanguage } from "../../utils/utils";
import CodeHighlighter from "./CodeHighlighter";
import CodeOptions, {
  CSSTab,
  TailwindTab,
  TSCSSTab,
  TSTailwindTab,
} from "./CodeOptions";

const CodeExample = ({ codeObject }) => (
  <>
    {Object.entries(codeObject).map(([name, snippet]) => {
      const skip = [
        "tailwind",
        "css",
        "tsTailwind",
        "tsCode",
        "cliDefault",
        "cliTailwind",
        "cliTsTailwind",
        "cliTsDefault",
      ];
      if (skip.includes(name)) return null;

      if (name === "code" || name === "tsCode") {
        return (
          <div key={name}>
            <h2 className="demo-title">{name}</h2>

            <CodeOptions>
              <TailwindTab>
                <CodeHighlighter language="jsx" codeString={codeObject.tailwind} />
              </TailwindTab>

              <CSSTab>
                <CodeHighlighter language="jsx" codeString={codeObject.code} />
                {codeObject.css && (
                  <>
                    <h2 className="demo-title">CSS</h2>
                    <CodeHighlighter language="css" codeString={codeObject.css} />
                  </>
                )}
              </CSSTab>

              {codeObject.tsTailwind && (
                <TSTailwindTab>
                  <CodeHighlighter language="tsx" codeString={codeObject.tsTailwind} />
                </TSTailwindTab>
              )}

              {codeObject.tsCode && (
                <TSCSSTab>
                  <CodeHighlighter language="tsx" codeString={codeObject.tsCode} />
                  {codeObject.css && (
                    <>
                      <h2 className="demo-title">CSS</h2>
                      <CodeHighlighter language="css" codeString={codeObject.css} />
                    </>
                  )}
                </TSCSSTab>
              )}
            </CodeOptions>
          </div>
        );
      }

      return (
        <div key={name}>
          <h2 className="demo-title">{name}</h2>
          <CodeHighlighter language={getLanguage(name)} codeString={snippet} />
        </div>
      );
    })}
  </>
);

export default CodeExample;
