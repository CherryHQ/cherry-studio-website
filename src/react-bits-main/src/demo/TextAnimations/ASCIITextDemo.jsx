import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

import { CliTab, CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";

import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import Dependencies from "../../components/code/Dependencies";
import Customize from "../../components/common/Preview/Customize";
import PreviewSwitch from "../../components/common/Preview/PreviewSwitch";
import PreviewInput from "../../components/common/Preview/PreviewInput";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import useForceRerender from "../../hooks/useForceRerender";

import ASCIIText from "../../content/TextAnimations/ASCIIText/ASCIIText";
import { asciiText } from "../../constants/code/TextAnimations/asciiTextCode";

const propData = [
  {
    name: "text",
    type: "string",
    default: '"Hello World!"',
    description: "The text displayed on the plane in the ASCII scene.",
  },
  {
    name: "enableWaves",
    type: "boolean",
    default: "true",
    description: "If false, disables the wavy text animation.",
  },
  {
    name: "asciiFontSize",
    type: "number",
    default: "12",
    description: "Size of the ASCII glyphs in the overlay.",
  },
  {
    name: "textFontSize",
    type: "number",
    default: "200",
    description:
      "Pixel size for the text that's drawn onto the plane texture.",
  },
  {
    name: "planeBaseHeight",
    type: "number",
    default: "8",
    description:
      "How tall the plane is in 3D. The plane width is auto-based on text aspect.",
  },
  {
    name: "textColor",
    type: "string",
    default: "#fdf9f3",
    description: "The color of the text drawn onto the plane texture.",
  },
  {
    name: "strokeColor",
    type: "string",
    default: "N/A",
    description:
      "Not used here, but you could add it if you want an outline effect.",
  },
];

const ASCIITextDemo = () => {
  const [text, setText] = useState("Hey!");
  const [enableWaves, setEnableWaves] = useState(true);
  const [asciiFontSize, setAsciiFontSize] = useState(8);

  const [key, forceRerender] = useForceRerender();
  const dependencyList = ["three"];

  useEffect(() => {
    forceRerender();
  }, [forceRerender]);

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          className="demo-container"
          minH={400}
          maxH={400}
          overflow="hidden"
          mb={6}
        >
          <ASCIIText
            key={key}
            text={text}
            enableWaves={enableWaves}
            asciiFontSize={asciiFontSize}
            textFontSize={250}
            planeBaseHeight={12}
          />
        </Box>

        <Customize>
          <PreviewInput
            title="Text"
            value={text}
            placeholder="Enter text..."
            width={200}
            maxLength={10}
            onChange={setText}
          />

          <PreviewSlider
            title="Size"
            min={1}
            max={64}
            step={1}
            value={asciiFontSize}
            onChange={(val) => {
              setAsciiFontSize(Number(val) || 1);
              forceRerender();
            }}
          />

          <PreviewSwitch
            title="Waves"
            isChecked={enableWaves}
            onChange={(checked) => {
              setEnableWaves(checked);
              forceRerender();
            }}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={dependencyList} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={asciiText} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...asciiText} />
      </CliTab>
    </TabbedLayout>
  );
};

export default ASCIITextDemo;
