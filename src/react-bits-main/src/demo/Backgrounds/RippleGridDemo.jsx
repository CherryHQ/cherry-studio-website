import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Flex, Input, Text } from "@chakra-ui/react";

import Customize from "../../components/common/Preview/Customize";
import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import PreviewSwitch from "../../components/common/Preview/PreviewSwitch";
import BackgroundContent from "../../components/common/Preview/BackgroundContent";

import { rippleGrid } from '../../constants/code/Backgrounds/rippleGridCode';
import RippleGrid from "../../content/Backgrounds/RippleGrid/RippleGrid";

const RippleGridDemo = () => {
  const [enableRainbow, setEnableRainbow] = useState(false);
  const [gridColor, setGridColor] = useState("#5227FF");
  const [rippleIntensity, setRippleIntensity] = useState(0.05);
  const [gridSize, setGridSize] = useState(10.0);
  const [gridThickness, setGridThickness] = useState(15.0);
  const [fadeDistance, setFadeDistance] = useState(1.5);
  const [vignetteStrength, setVignetteStrength] = useState(2.0);
  const [glowIntensity, setGlowIntensity] = useState(0.1);
  const [opacity, setOpacity] = useState(1.0);
  const [gridRotation, setGridRotation] = useState(0);
  const [mouseInteraction, setMouseInteraction] = useState(true);
  const [mouseInteractionRadius, setMouseInteractionRadius] = useState(0.8);
  const propData = [
    {
      name: "enableRainbow",
      type: "boolean",
      default: "false",
      description: "Enables rainbow color cycling animation for the grid."
    },
    {
      name: "gridColor",
      type: "string",
      default: "'#ffffff'",
      description: "Color of the grid when rainbow mode is disabled."
    },
    {
      name: "rippleIntensity",
      type: "number",
      default: "0.05",
      description: "Controls the intensity of the ripple effect from the center."
    },
    {
      name: "gridSize",
      type: "number",
      default: "10.0",
      description: "Controls the density/size of the grid pattern."
    },
    {
      name: "gridThickness",
      type: "number",
      default: "15.0",
      description: "Controls the thickness of the grid lines."
    },
    {
      name: "fadeDistance",
      type: "number",
      default: "1.5",
      description: "Controls how far the fade effect extends from the center."
    },
    {
      name: "vignetteStrength",
      type: "number",
      default: "2.0",
      description: "Controls the intensity of the vignette (edge darkening) effect."
    },
    {
      name: "glowIntensity",
      type: "number",
      default: "0.1",
      description: "Adds a glow effect to the grid lines."
    },
    {
      name: "opacity",
      type: "number",
      default: "1.0",
      description: "Overall opacity of the entire effect."
    },
    {
      name: "gridRotation",
      type: "number",
      default: "0",
      description: "Rotate the entire grid pattern by degrees."
    },
    {
      name: "mouseInteraction",
      type: "boolean",
      default: "false",
      description: "Enable mouse/touch interaction to create ripples."
    },
    {
      name: "mouseInteractionRadius",
      type: "number",
      default: "0.8",
      description: "Controls the radius of the mouse interaction effect."
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} overflow="hidden">
          <RippleGrid
            enableRainbow={enableRainbow}
            gridColor={gridColor}
            rippleIntensity={rippleIntensity}
            gridSize={gridSize}
            gridThickness={gridThickness}
            fadeDistance={fadeDistance}
            vignetteStrength={vignetteStrength}
            glowIntensity={glowIntensity}
            opacity={opacity}
            gridRotation={gridRotation}
            mouseInteraction={mouseInteraction}
            mouseInteractionRadius={mouseInteractionRadius}
          />

          {/* For Demo Purposes Only */}
          <BackgroundContent
            pillText="New Background"
            headline="Retro yet futuristic, this is Ripple Grid!"
          />
        </Box>

        <Customize>
          <Flex alignItems="center" mb={4}>
            <Text fontSize="sm" mr={2}>Grid Color</Text>
            <Input
              type="color"
              value={gridColor}
              onChange={(e) => setGridColor(e.target.value)}
              width="50px"
            />
          </Flex>

          <PreviewSlider
            title="Ripple Intensity"
            min={0}
            max={0.3}
            step={0.01}
            value={rippleIntensity}
            onChange={setRippleIntensity}
          />

          <PreviewSlider
            title="Grid Size"
            min={5}
            max={30}
            step={1}
            value={gridSize}
            onChange={setGridSize}
          />

          <PreviewSlider
            title="Grid Thickness"
            min={5}
            max={50}
            step={1}
            value={gridThickness}
            onChange={setGridThickness}
          />

          <PreviewSlider
            title="Fade Distance"
            min={0.5}
            max={3}
            step={0.1}
            value={fadeDistance}
            onChange={setFadeDistance}
          />

          <PreviewSlider
            title="Vignette Strength"
            min={0.5}
            max={5}
            step={0.1}
            value={vignetteStrength}
            onChange={setVignetteStrength}
          />

          <PreviewSlider
            title="Glow Intensity"
            min={0}
            max={1}
            step={0.05}
            value={glowIntensity}
            onChange={setGlowIntensity}
          />

          <PreviewSlider
            title="Opacity"
            min={0}
            max={1}
            step={0.05}
            value={opacity}
            onChange={setOpacity}
          />

          <PreviewSlider
            title="Grid Rotation"
            min={0}
            max={360}
            step={1}
            value={gridRotation}
            onChange={setGridRotation}
            valueUnit="°"
          />

          <PreviewSlider
            title="Mouse Interaction Radius"
            min={0.2}
            max={2}
            step={0.1}
            value={mouseInteractionRadius}
            onChange={setMouseInteractionRadius}
          />

          <PreviewSwitch
            title="Mouse Interaction"
            isChecked={mouseInteraction}
            onChange={setMouseInteraction}
          />

          <PreviewSwitch
            title="Enable Rainbow"
            isChecked={enableRainbow}
            onChange={setEnableRainbow}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['ogl']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={rippleGrid} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...rippleGrid} />
      </CliTab>
    </TabbedLayout>
  );
};

export default RippleGridDemo;