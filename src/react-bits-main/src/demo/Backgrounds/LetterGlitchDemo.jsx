import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Button } from "@chakra-ui/react";
import { randomHex } from "../../utils/utils";

import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import Customize from "../../components/common/Preview/Customize";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import PreviewSwitch from "../../components/common/Preview/PreviewSwitch";
import useForceRerender from "../../hooks/useForceRerender";
import BackgroundContent from "../../components/common/Preview/BackgroundContent";

import LetterGlitch from "../../content/Backgrounds/LetterGlitch/LetterGlitch";
import { letterGlitch } from "../../constants/code/Backgrounds/letterGlitchCode";

const LetterGlitchDemo = () => {
  const [smooth, setSmooth] = useState(true);
  const [speed, setSpeed] = useState(10);
  const [colors, setColors] = useState(['#2b4539', '#61dca3', '#61b3dc']);
  const [showCenterVignette, setShowCenterVignette] = useState(true);
  const [showOuterVignette, setShowOuterVignette] = useState(false);

  const [key, forceRerender] = useForceRerender();

  const propData = [
    {
      name: "glitchColors",
      type: "string[]",
      default: "['#2b4539', '#61dca3', '#61b3dc']",
      description: "Controls the colors of the letters rendered in the canvas."
    },
    {
      name: "glitchSpeed",
      type: "number",
      default: "50",
      description: "Controls the speed at which letters scramble in the animation."
    },
    {
      name: "centerVignette",
      type: "boolean",
      default: "false",
      description: "When true, renders a radial gradient in the center of the container"
    },
    {
      name: "outerVignette",
      type: "boolean",
      default: "true",
      description: "When true, renders an inner radial gradient around the edges of the container."
    },
    {
      name: "smooth",
      type: "boolean",
      default: "true",
      description: "When true, smoothens the animation of the letters for a more subtle feel."
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} overflow="hidden" p={0}>
          <LetterGlitch
            key={key}
            glitchColors={colors}
            glitchSpeed={speed}
            centerVignette={showCenterVignette}
            outerVignette={showOuterVignette}
            smooth={smooth}
          />

          {/* For Demo Purposes Only */}
          <BackgroundContent
            pillText="New Background"
            headline="Am I finally a real hacker now, mom?"
          />
        </Box>

        <Customize>
          <Button
            fontSize="xs"
            bg="#170D27"
            borderRadius="10px"
            border="1px solid #271E37"
            _hover={{ bg: "#271E37" }}
            color="#fff"
            h={8}
            onClick={() => {
              setColors([randomHex(), randomHex(), randomHex()])
              forceRerender();
            }}
          >
            Randomize Colors
          </Button>

          <PreviewSlider
            min={0}
            max={100}
            title="Glitch Speed"
            step={5}
            value={speed}
            onChange={(val) => {
              setSpeed(val);
            }}
          />

          <PreviewSwitch
            title="Smooth Animation"
            isChecked={smooth}
            onChange={(checked) => {
              setSmooth(checked);
              forceRerender();
            }}
          />

          <PreviewSwitch
            title="Show Center Vignette"
            isChecked={showCenterVignette}
            onChange={(checked) => {
              setShowCenterVignette(checked);
              forceRerender();
            }}
          />

          <PreviewSwitch
            title="Show Outer Vignette"
            isChecked={showOuterVignette}
            onChange={(checked) => {
              setShowOuterVignette(checked);
              forceRerender();
            }}
          />
        </Customize>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={letterGlitch} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...letterGlitch} />
      </CliTab>
    </TabbedLayout>
  );
};

export default LetterGlitchDemo;