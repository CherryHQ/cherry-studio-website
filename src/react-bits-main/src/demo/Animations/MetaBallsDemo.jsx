import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Flex, Input, Text } from "@chakra-ui/react";

import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import Dependencies from '../../components/code/Dependencies';
import Customize from "../../components/common/Preview/Customize";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import PreviewSwitch from "../../components/common/Preview/PreviewSwitch";

import { metaBalls } from "../../constants/code/Animations/metaBallsCode";
import MetaBalls from "../../content/Animations/MetaBalls/MetaBalls";

const MetaBallsDemo = () => {
  const [color, setColor] = useState("#ffffff");
  const [cursorBallColor, setCursorBallColor] = useState("#ffffff");
  const [speed, setSpeed] = useState(0.3);
  const [animationSize, setAnimationSize] = useState(30);
  const [ballCount, setBallCount] = useState(15);
  const [clumpFactor, setClumpFactor] = useState(1);

  const [enableMouseInteraction, setEnableMouseInteraction] = useState(true);
  const [hoverSmoothness, setHoverSmoothness] = useState(0.15);
  const [cursorBallSize, setCursorBallSize] = useState(2);

  const propData = [
    {
      name: "color",
      type: "string",
      default: "#ffffff",
      description: "The base color of the metaballs."
    },
    {
      name: "speed",
      type: "number",
      default: "0.3",
      description: "Speed multiplier for the animation."
    },
    {
      name: "enableMouseInteraction",
      type: "boolean",
      default: "true",
      description: "Enables or disables the ball following the mouse."
    },
    {
      name: "enableTransparency",
      type: "boolean",
      default: "false",
      description: "Enables or disables transparency for the container of the animation."
    },
    {
      name: "hoverSmoothness",
      type: "number",
      default: "0.05",
      description: "Smoothness factor for the cursor ball when following the mouse."
    },
    {
      name: "animationSize",
      type: "number",
      default: "30",
      description: "The size of the world for the animation."
    },
    {
      name: "ballCount",
      type: "number",
      default: "15",
      description: "Number of metaballs rendered."
    },
    {
      name: "clumpFactor",
      type: "number",
      default: "1",
      description: "Determines how close together the balls are rendered."
    },
    {
      name: "cursorBallSize",
      type: "number",
      default: "3",
      description: "Size of the cursor-controlled ball."
    },
    {
      name: "cursorBallColor",
      type: "string",
      default: "#ff0000",
      description: "Color of the cursor ball."
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
          <MetaBalls
            color={color}
            cursorBallColor={cursorBallColor}
            cursorBallSize={cursorBallSize}
            ballCount={ballCount}
            animationSize={animationSize}
            enableMouseInteraction={enableMouseInteraction}
            hoverSmoothness={hoverSmoothness}
            clumpFactor={clumpFactor}
            speed={speed}
          />
        </Box>

        <Customize className="preview-options">
          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Color</Text>
            <Input
              type="color"
              value={color}
              onChange={(e) => { setColor(e.target.value); setCursorBallColor(e.target.value) }}
              width="50px"
            />
          </Flex>

          <PreviewSlider
            title="Ball Count"
            min={2}
            max={30}
            step={1}
            value={ballCount}
            onChange={(val) => setBallCount(val)}
            width={150}
          />

          <PreviewSlider
            title="Speed"
            min={0.1}
            max={1}
            step={0.1}
            value={speed}
            onChange={(val) => setSpeed(val)}
            width={150}
          />

          <PreviewSlider
            title="Size"
            min={10}
            max={50}
            step={1}
            value={animationSize}
            onChange={(val) => setAnimationSize(val)}
            width={150}
          />

          <PreviewSlider
            title="Clump Factor"
            min={0.1}
            max={2}
            step={0.1}
            value={clumpFactor}
            onChange={(val) => setClumpFactor(val)}
            width={150}
          />

          <PreviewSwitch
            title="Follow Cursor"
            isChecked={enableMouseInteraction}
            onChange={(checked) => setEnableMouseInteraction(checked)}
          />

          <PreviewSlider
            title="Cursor Smoothing"
            min={0.001}
            max={0.25}
            step={0.001}
            value={hoverSmoothness}
            onChange={(val) => setHoverSmoothness(val)}
            width={150}
          />

          <PreviewSlider
            title="Cursor Size"
            min={1}
            max={5}
            step={1}
            value={cursorBallSize}
            onChange={(val) => setCursorBallSize(val)}
            width={150}
          />
        </Customize>



        <PropTable data={propData} />
        <Dependencies dependencyList={['ogl']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={metaBalls} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...metaBalls} />
      </CliTab>
    </TabbedLayout>
  );
};

export default MetaBallsDemo;