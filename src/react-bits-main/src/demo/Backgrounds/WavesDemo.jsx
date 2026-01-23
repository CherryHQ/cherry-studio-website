import { useState } from "react";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";
import CodeExample from '../../components/code/CodeExample';
import PropTable from "../../components/common/Preview/PropTable";
import CliInstallation from "../../components/code/CliInstallation";
import Customize from "../../components/common/Preview/Customize";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";

import Waves from "../../content/Backgrounds/Waves/Waves";
import { waves } from '../../constants/code/Backgrounds/wavesCode';

const WavesDemo = () => {
  const [color, setColor] = useState('#ffffff');
  const [waveSpeedX, setWaveSpeedX] = useState(0.0125);

  const propData = [
    {
      name: "lineColor",
      type: "string",
      default: "black",
      description: "Defines the color of the wave lines drawn on the canvas."
    },
    {
      name: "backgroundColor",
      type: "string",
      default: "transparent",
      description: "Sets the background color of the waves container."
    },
    {
      name: "waveSpeedX",
      type: "number",
      default: 0.0125,
      description: "Horizontal speed factor for the wave animation."
    },
    {
      name: "waveSpeedY",
      type: "number",
      default: 0.005,
      description: "Vertical speed factor for the wave animation."
    },
    {
      name: "waveAmpX",
      type: "number",
      default: 32,
      description: "Horizontal amplitude of each wave."
    },
    {
      name: "waveAmpY",
      type: "number",
      default: 16,
      description: "Vertical amplitude of each wave."
    },
    {
      name: "xGap",
      type: "number",
      default: 10,
      description: "Horizontal gap between individual wave lines."
    },
    {
      name: "yGap",
      type: "number",
      default: 32,
      description: "Vertical gap between points on each wave line."
    },
    {
      name: "friction",
      type: "number",
      default: 0.925,
      description: "Controls how quickly the cursor effect slows down."
    },
    {
      name: "tension",
      type: "number",
      default: 0.005,
      description: "Determines the 'springiness' of the cursor effect on points."
    },
    {
      name: "maxCursorMove",
      type: "number",
      default: 100,
      description: "Limits how far each point can shift due to cursor movement."
    },
    {
      name: "style",
      type: "object",
      default: "{}",
      description: "Inline styles applied to the container element."
    },
    {
      name: "className",
      type: "string",
      default: "",
      description: "Custom class name(s) applied to the container element."
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" h={600} className="demo-container" overflow="hidden" p={0}>
          <Waves
            waveSpeedX={waveSpeedX}
            lineColor={color}
          />
        </Box>

        <Customize>
          <PreviewSlider
            min={0}
            max={0.1}
            step={0.01}
            value={waveSpeedX}
            title="Wave Speed X"
            onChange={(val) => {
              setWaveSpeedX(val);
            }}
          />

          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Waves Color</Text>
            <Input
              type="color"
              value={color}
              onChange={(e) => { setColor(e.target.value); }}
              width="50px"
            />
          </Flex>
        </Customize>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={waves} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...waves} />
      </CliTab>
    </TabbedLayout>

  );
}

export default WavesDemo;