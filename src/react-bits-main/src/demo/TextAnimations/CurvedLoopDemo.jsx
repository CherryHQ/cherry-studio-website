import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box } from "@chakra-ui/react";

import Customize from "../../components/common/Preview/Customize";
import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import PreviewInput from "../../components/common/Preview/PreviewInput";
import PreviewSwitch from "../../components/common/Preview/PreviewSwitch";
import useForceRerender from "../../hooks/useForceRerender";

import { curvedLoop } from "../../constants/code/TextAnimations/curvedLoopCode";
import CurvedLoop from "../../content/TextAnimations/CurvedLoop/CurvedLoop";

const CurvedLoopDemo = () => {
  const [key, forceRerender] = useForceRerender();

  const [marqueeText, setMarqueeText] = useState("Be ✦ Creative ✦ With ✦ React ✦ Bits ✦");
  const [speed, setSpeed] = useState(2);
  const [curveAmount, setCurveAmount] = useState(400);
  const [interactive, setInteractive] = useState(true);

  const propData = [
    {
      name: "marqueeText",
      type: "string",
      default: '""',
      description: "The text to display in the curved marquee"
    },
    {
      name: "speed",
      type: "number",
      default: "2",
      description: "Animation speed of the marquee text"
    },
    {
      name: "className",
      type: "string",
      default: "undefined",
      description: "CSS class name for styling the text"
    },
    {
      name: "curveAmount",
      type: "number",
      default: "400",
      description: "Amount of curve in the text path"
    },
    {
      name: "direction",
      type: '"left" | "right"',
      default: '"left"',
      description: "Initial direction of the marquee animation"
    },
    {
      name: "interactive",
      type: "boolean",
      default: "true",
      description: "Whether the marquee can be dragged by the user"
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={500} overflow="hidden" p={0}>
          <CurvedLoop
            key={key}
            marqueeText={marqueeText}
            speed={speed}
            curveAmount={curveAmount}
            interactive={interactive}
          />
        </Box>

        <Customize>
          <PreviewInput
            title="Marquee Text"
            value={marqueeText}
            placeholder="Enter text..."
            width={300}
            onChange={(value) => {
              setMarqueeText(value);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Speed"
            min={0}
            max={10}
            step={0.1}
            value={speed}
            onChange={(value) => {
              setSpeed(value);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Curve Amount"
            min={-400}
            max={400}
            step={10}
            value={curveAmount}
            valueUnit="px"
            onChange={(value) => {
              setCurveAmount(value);
              forceRerender();
            }}
          />

          <PreviewSwitch
            title="Draggable"
            isChecked={interactive}
            onChange={(checked) => {
              setInteractive(checked);
              forceRerender();
            }}
          />
        </Customize>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={curvedLoop} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...curvedLoop} />
      </CliTab>
    </TabbedLayout>
  );
};

export default CurvedLoopDemo;