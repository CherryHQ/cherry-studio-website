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
import useForceRerender from "../../hooks/useForceRerender";

import { faultyTerminal } from '../../constants/code/Backgrounds/faultyTerminalCode';
import FaultyTerminal from "../../content/Backgrounds/FaultyTerminal/FaultyTerminal";

const FaultyTerminalDemo = () => {
  const [key, forceRerender] = useForceRerender();

  const [scale, setScale] = useState(1.5);
  const [digitSize, setDigitSize] = useState(1.2);
  const [timeScale, setTimeScale] = useState(0.5);
  const [scanlineIntensity, setScanlineIntensity] = useState(0.5);
  const [curvature, setCurvature] = useState(0.1);
  const [tint, setTint] = useState("#A7EF9E");
  const [mouseReact, setMouseReact] = useState(true);
  const [mouseStrength, setMouseStrength] = useState(0.5);
  const [pageLoadAnimation, setPageLoadAnimation] = useState(true);
  const [noiseAmp, setNoiseAmp] = useState(1);
  const [brightness, setBrightness] = useState(0.6);

  const handleChange = (setter) => (value) => {
    setter(value);
    forceRerender();
  };

  const propData = [
    {
      name: "scale",
      type: "number",
      default: "1.5",
      description: "Controls the zoom/scale of the pattern."
    },
    {
      name: "gridMul",
      type: "Vec2",
      default: "[2, 1]",
      description: "Grid multiplier for glyph density [x, y]."
    },
    {
      name: "digitSize",
      type: "number",
      default: "1.2",
      description: "Size of individual glyphs."
    },
    {
      name: "timeScale",
      type: "number",
      default: "1",
      description: "Animation speed multiplier."
    },
    {
      name: "pause",
      type: "boolean",
      default: "false",
      description: "Pause/resume animation."
    },
    {
      name: "scanlineIntensity",
      type: "number",
      default: "1",
      description: "Strength of scanline effects."
    },
    {
      name: "glitchAmount",
      type: "number",
      default: "1",
      description: "Glitch displacement intensity."
    },
    {
      name: "flickerAmount",
      type: "number",
      default: "1",
      description: "Flicker effect strength."
    },
    {
      name: "noiseAmp",
      type: "number",
      default: "1",
      description: "Noise pattern amplitude."
    },
    {
      name: "chromaticAberration",
      type: "number",
      default: "0",
      description: "RGB channel separation in pixels."
    },
    {
      name: "dither",
      type: "number | boolean",
      default: "0",
      description: "Dithering effect intensity."
    },
    {
      name: "curvature",
      type: "number",
      default: "0",
      description: "Barrel distortion amount."
    },
    {
      name: "tint",
      type: "string",
      default: "'#ffffff'",
      description: "Color tint (hex)."
    },
    {
      name: "mouseReact",
      type: "boolean",
      default: "true",
      description: "Enable/disable mouse interaction."
    },
    {
      name: "mouseStrength",
      type: "number",
      default: "0.5",
      description: "Mouse interaction intensity."
    },
    {
      name: "pageLoadAnimation",
      type: "boolean",
      default: "false",
      description: "Enable fade-in animation on load."
    },
    {
      name: "brightness",
      type: "number",
      default: "1",
      description: "Overall opacity/brightness control."
    },
    {
      name: "className",
      type: "string",
      default: "''",
      description: "Additional CSS classes."
    },
    {
      name: "style",
      type: "React.CSSProperties",
      default: "{}",
      description: "Inline styles."
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} p={0} overflow="hidden">
          <FaultyTerminal
            key={key}
            scale={scale}
            digitSize={digitSize}
            timeScale={timeScale}
            scanlineIntensity={scanlineIntensity}
            curvature={curvature}
            tint={tint}
            mouseReact={mouseReact}
            mouseStrength={mouseStrength}
            pageLoadAnimation={pageLoadAnimation}
            noiseAmp={noiseAmp}
            brightness={brightness}
          />

          <BackgroundContent pillText="New Background" headline="It works on my machine, please check again" />
        </Box>

        <Customize>
          <Flex alignItems="center" mb={4}>
            <Text fontSize="sm" mr={2}>Tint Color</Text>
            <Input
              type="color"
              value={tint}
              onChange={(e) => handleChange(setTint)(e.target.value)}
              width="50px"
            />
          </Flex>

          <PreviewSlider
            title="Scale"
            min={1}
            max={3}
            step={0.1}
            value={scale}
            onChange={handleChange(setScale)}
          />

          <PreviewSlider
            title="Digit Size"
            min={0.5}
            max={3}
            step={0.1}
            value={digitSize}
            onChange={handleChange(setDigitSize)}
          />

          <PreviewSlider
            title="Speed"
            min={0}
            max={3}
            step={0.1}
            value={timeScale}
            onChange={handleChange(setTimeScale)}
          />

          <PreviewSlider
            title="Noise Amplitude"
            min={0.5}
            max={1}
            step={0.1}
            value={noiseAmp}
            onChange={handleChange(setNoiseAmp)}
          />

          <PreviewSlider
            title="Brightness"
            min={0.1}
            max={1}
            step={0.1}
            value={brightness}
            onChange={handleChange(setBrightness)}
          />

          <PreviewSlider
            title="Scanline Intensity"
            min={0}
            max={2}
            step={0.1}
            value={scanlineIntensity}
            onChange={handleChange(setScanlineIntensity)}
          />

          <PreviewSlider
            title="Curvature"
            min={0}
            max={0.5}
            step={0.01}
            value={curvature}
            onChange={handleChange(setCurvature)}
          />

          <PreviewSlider
            title="Mouse Strength"
            min={0}
            max={2}
            step={0.1}
            value={mouseStrength}
            onChange={handleChange(setMouseStrength)}
          />

          <PreviewSwitch
            title="Mouse React"
            isChecked={mouseReact}
            onChange={handleChange(setMouseReact)}
          />

          <PreviewSwitch
            title="Page Load Animation"
            isChecked={pageLoadAnimation}
            onChange={handleChange(setPageLoadAnimation)}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['ogl']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={faultyTerminal} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...faultyTerminal} />
      </CliTab>
    </TabbedLayout>
  );
};

export default FaultyTerminalDemo;