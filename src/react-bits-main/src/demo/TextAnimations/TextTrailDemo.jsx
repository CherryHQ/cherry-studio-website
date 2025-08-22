import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box } from "@chakra-ui/react";
import { useState } from "react";

import Customize from "../../components/common/Preview/Customize";
import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import PreviewSwitch from "../../components/common/Preview/PreviewSwitch";

import { textTrail } from "../../constants/code/TextAnimations/textTrailCode";
import TextTrail from "../../content/TextAnimations/TextTrail/TextTrail";
import useForceRerender from "../../hooks/useForceRerender";

const TextTrailDemo = () => {
  const [key, forceRerender] = useForceRerender();
  
  const [noiseFactor, setNoiseFactor] = useState(1);
  const [noiseScale, setNoiseScale] = useState(0.0005);
  const [fontWeight, setFontWeight] = useState(900);
  const [alphaPersistFactor, setAlphaPersistFactor] = useState(0.95);
  const [animateColor, setAnimateColor] = useState(false);

  const propData = [
    {
      name: "text",
      type: "string",
      default: '"Vibe"',
      description: "The text to display with the trail effect"
    },
    {
      name: "fontFamily",
      type: "string",
      default: '"Figtree"',
      description: "Font family for the text"
    },
    {
      name: "fontWeight",
      type: "string | number",
      default: '"900"',
      description: "Font weight for the text"
    },
    {
      name: "noiseFactor",
      type: "number",
      default: "1",
      description: "Controls the intensity of the noise effect"
    },
    {
      name: "noiseScale",
      type: "number",
      default: "0.0005",
      description: "Scale factor for the noise distortion"
    },
    {
      name: "rgbPersistFactor",
      type: "number",
      default: "0.98",
      description: "RGB persistence factor for the trail effect (0-1)"
    },
    {
      name: "alphaPersistFactor",
      type: "number",
      default: "0.95",
      description: "Alpha persistence factor for the trail effect (0-1)"
    },
    {
      name: "animateColor",
      type: "boolean",
      default: "false",
      description: "Whether to animate color changes over time"
    },
    {
      name: "startColor",
      type: "string",
      default: '"#ffffff"',
      description: "Starting color for the text (hex format)"
    },
    {
      name: "textColor",
      type: "string",
      default: '"#ffffff"',
      description: "Static color for the text (hex format)"
    },
    {
      name: "backgroundColor",
      type: "number | string",
      default: "0x271e37",
      description: "Background color (hex number or string)"
    },
    {
      name: "colorCycleInterval",
      type: "number",
      default: "3000",
      description: "Interval in milliseconds for color cycling when animateColor is true"
    },
    {
      name: "supersample",
      type: "number",
      default: "2",
      description: "Supersampling factor for text quality (higher = better quality)"
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={500} overflow="hidden" p={0}>
          <TextTrail 
            key={`${key}-${animateColor}`}
            noiseFactor={noiseFactor}
            noiseScale={noiseScale}
            fontWeight={fontWeight}
            alphaPersistFactor={alphaPersistFactor}
            animateColor={animateColor}
            textColor={animateColor ? null : "#ffffff"}
          />
        </Box>

        <Customize>
          <PreviewSlider
            title="Noise Factor"
            min={1}
            max={25}
            step={1}
            value={noiseFactor}
            onChange={(value) => {
              setNoiseFactor(value);
              forceRerender();
            }}
          />
          
          <PreviewSlider
            title="Noise Scale"
            min={0}
            max={0.001}
            step={0.0001}
            value={noiseScale}
            onChange={(value) => {
              setNoiseScale(value);
              forceRerender();
            }}
          />
          
          <PreviewSlider
            title="Font Weight"
            min={100}
            max={900}
            step={100}
            value={fontWeight}
            onChange={(value) => {
              setFontWeight(value);
              forceRerender();
            }}
          />
          
          <PreviewSlider
            title="Alpha Persist Factor"
            min={0.5}
            max={0.95}
            step={0.01}
            value={alphaPersistFactor}
            onChange={(value) => {
              setAlphaPersistFactor(value);
              forceRerender();
            }}
          />
          
          <PreviewSwitch
            title="Animate Color"
            isChecked={animateColor}
            onChange={(checked) => {
              setAnimateColor(checked);
              forceRerender();
            }}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['three']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={textTrail} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...textTrail} />
      </CliTab>
    </TabbedLayout>
  );
};

export default TextTrailDemo;