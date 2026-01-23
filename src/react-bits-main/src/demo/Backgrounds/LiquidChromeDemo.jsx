import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Flex, Text } from "@chakra-ui/react";

import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import Dependencies from '../../components/code/Dependencies';
import Customize from "../../components/common/Preview/Customize";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import PreviewSwitch from "../../components/common/Preview/PreviewSwitch";
import BackgroundContent from "../../components/common/Preview/BackgroundContent";

import LiquidChrome from "../../content/Backgrounds/LiquidChrome/LiquidChrome";
import { liquidChrome } from "../../constants/code/Backgrounds/liquidChromeCode";

const LiquidChromeDemo = () => {
  const [speed, setSpeed] = useState(0.3);
  const [baseColor, setBaseColor] = useState([0.1, 0.1, 0.1]);
  const [interactive, setInteractive] = useState(true);
  const [amplitude, setAmplitude] = useState(0.3);

  const propData = [
    {
      name: "baseColor",
      type: "RGB array (number[3])",
      default: "[0.1, 0.1, 0.1]",
      description: "Base color of the component. Specify as an RGB array."
    },
    {
      name: "speed",
      type: "number",
      default: "1.0",
      description: "Animation speed multiplier."
    },
    {
      name: "amplitude",
      type: "number",
      default: "0.6",
      description: "Amplitude of the distortion."
    },
    {
      name: "frequencyX",
      type: "number",
      default: "2.5",
      description: "Frequency modifier for the x distortion."
    },
    {
      name: "frequencyY",
      type: "number",
      default: "1.5",
      description: "Frequency modifier for the y distortion."
    },
    {
      name: "interactive",
      type: "boolean",
      default: "true",
      description: "Enable mouse/touch interaction."
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} p={0} overflow="hidden">
          <LiquidChrome baseColor={baseColor} amplitude={amplitude} speed={speed} interactive={interactive} />

          {/* For Demo Purposes Only */}
          <BackgroundContent
            pillText="New Background"
            headline="Swirl around in the deep sea of liquid chrome!"
          />
        </Box>

        <Customize>
          <Text fontSize="sm">Colors</Text>
          <Flex gap={4} wrap="wrap">
            <Flex gap={4} align="center" mt={2} background="#170D27" px={4} borderRadius={16} position="relative">
              <PreviewSlider
                min={0}
                max={1}
                width={50}
                step={0.1}
                value={baseColor[0]}
                title="Red"
                onChange={(val) => {
                  setBaseColor(prev => {
                    const newColors = [...prev];
                    newColors[0] = val;
                    return newColors;
                  });
                }}
              />
            </Flex>

            <Flex gap={4} align="center" mt={2} background="#170D27" px={4} borderRadius={16} position="relative">
              <PreviewSlider
                min={0}
                max={1}
                width={50}
                step={0.1}
                value={baseColor[1]}
                title="Green"
                onChange={(val) => {
                  setBaseColor(prev => {
                    const newColors = [...prev];
                    newColors[1] = val;
                    return newColors;
                  });
                }}
              />
            </Flex>

            <Flex gap={4} align="center" mt={2} background="#170D27" px={4} borderRadius={16} position="relative">
              <PreviewSlider
                min={0}
                max={1}
                width={50}
                step={0.1}
                value={baseColor[2]}
                title="Blue"
                onChange={(val) => {
                  setBaseColor(prev => {
                    const newColors = [...prev];
                    newColors[2] = val;
                    return newColors;
                  });
                }}
              />
            </Flex>
          </Flex>

          <PreviewSlider
            min={0}
            title="Speed"
            max={5}
            step={0.01}
            value={speed}
            onChange={(val) => {
              setSpeed(val);
            }}
          />

          <PreviewSlider
            min={0.1}
            title="Amplitude"
            max={1}
            step={0.01}
            value={amplitude}
            onChange={(val) => {
              setAmplitude(val);
            }}
          />

          <PreviewSwitch
            title="Enable Interaction"
            isChecked={interactive}
            onChange={(checked) => {
              setInteractive(checked);
            }}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['ogl']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={liquidChrome} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...liquidChrome} />
      </CliTab>
    </TabbedLayout>
  );
};

export default LiquidChromeDemo;