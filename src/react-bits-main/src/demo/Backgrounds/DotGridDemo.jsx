import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Flex, Input, Text } from "@chakra-ui/react";

import Customize from "../../components/common/Preview/Customize";
import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import BackgroundContent from "../../components/common/Preview/BackgroundContent";

import { dotGrid } from "../../constants/code/Backgrounds/dotGridCode";
import DotGrid from "../../content/Backgrounds/DotGrid/DotGrid";

const DotGridDemo = () => {
  const [dotSize, setDotSize] = useState(5);
  const [gap, setGap] = useState(15);
  const [baseColor, setBaseColor] = useState("#271E37");
  const [activeColor, setActiveColor] = useState("#5227FF");
  const [proximity, setProximity] = useState(120);
  const [shockRadius, setShockRadius] = useState(250);
  const [shockStrength, setShockStrength] = useState(5);
  const [resistance, setResistance] = useState(750);
  const [returnDuration, setReturnDuration] = useState(1.5);

  const propData = [
    {
      name: "dotSize",
      type: "number",
      default: "16",
      description: "Size of each dot in pixels."
    },
    {
      name: "gap",
      type: "number",
      default: "32",
      description: "Gap between each dot in pixels."
    },
    {
      name: "baseColor",
      type: "string",
      default: "'#5227FF'",
      description: "Base color of the dots."
    },
    {
      name: "activeColor",
      type: "string",
      default: "'#5227FF'",
      description: "Color of dots when hovered or activated."
    },
    {
      name: "proximity",
      type: "number",
      default: "150",
      description: "Radius around the mouse pointer within which dots react."
    },
    {
      name: "speedTrigger",
      type: "number",
      default: "100",
      description: "Mouse speed threshold to trigger inertia effect."
    },
    {
      name: "shockRadius",
      type: "number",
      default: "250",
      description: "Radius of the shockwave effect on click."
    },
    {
      name: "shockStrength",
      type: "number",
      default: "5",
      description: "Strength of the shockwave effect on click."
    },
    {
      name: "maxSpeed",
      type: "number",
      default: "5000",
      description: "Maximum speed for inertia calculation."
    },
    {
      name: "resistance",
      type: "number",
      default: "750",
      description: "Resistance for the inertia effect."
    },
    {
      name: "returnDuration",
      type: "number",
      default: "1.5",
      description: "Duration for dots to return to their original position after inertia."
    },
    {
      name: "className",
      type: "string",
      default: "''",
      description: "Additional CSS classes for the component."
    },
    {
      name: "style",
      type: "React.CSSProperties",
      default: "{}",
      description: "Inline styles for the component."
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} overflow="hidden">
          <DotGrid
            dotSize={dotSize}
            gap={gap}
            baseColor={baseColor}
            activeColor={activeColor}
            proximity={proximity}
            shockRadius={shockRadius}
            shockStrength={shockStrength}
            resistance={resistance}
            returnDuration={returnDuration}
          />

          {/* For Demo Purposes Only */}
          <BackgroundContent
            pillText="New Background"
            headline="Organized chaos with every cursor movement!"
          />
        </Box>

        <Customize>
          <Flex alignItems="center" mb={4}>
            <Text fontSize="sm" mr={2}>Base Color</Text>
            <Input
              type="color"
              value={baseColor}
              onChange={(e) => { setBaseColor(e.target.value); }}
              width="50px"
            />
          </Flex>
          <Flex alignItems="center" mb={4}>
            <Text fontSize="sm" mr={2}>Active Color</Text>
            <Input
              type="color"
              value={activeColor}
              onChange={(e) => { setActiveColor(e.target.value); }}
              width="50px"
            />
          </Flex>
          <PreviewSlider title="Dot Size" min={2} max={50} step={1} value={dotSize} onChange={setDotSize} />
          <PreviewSlider title="Gap" min={5} max={100} step={1} value={gap} onChange={setGap} />
          <PreviewSlider title="Proximity" min={50} max={500} step={10} value={proximity} onChange={setProximity} />
          <PreviewSlider title="Shock Radius" min={50} max={500} step={10} value={shockRadius} onChange={setShockRadius} />
          <PreviewSlider title="Shock Strength" min={1} max={20} step={1} value={shockStrength} onChange={setShockStrength} />
          <PreviewSlider title="Resistance (Inertia)" min={100} max={2000} step={50} value={resistance} onChange={setResistance} />
          <PreviewSlider title="Return Duration (Inertia)" min={0.1} max={5} step={0.1} value={returnDuration} onChange={setReturnDuration} />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['gsap']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={dotGrid} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...dotGrid} />
      </CliTab>
    </TabbedLayout>
  );
};

export default DotGridDemo;