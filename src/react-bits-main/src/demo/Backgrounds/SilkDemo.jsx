import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Flex, Text, Input } from "@chakra-ui/react";

import Customize from "../../components/common/Preview/Customize";
import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import Dependencies from '../../components/code/Dependencies';
import useForceRerender from "../../hooks/useForceRerender";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import BackgroundContent from "../../components/common/Preview/BackgroundContent";

import { silkCode } from '../../constants/code/Backgrounds/silkCode';
import Silk from '../../content/Backgrounds/Silk/Silk';

const SilkDemo = () => {
  const [speed, setSpeed] = useState(5);
  const [scale, setScale] = useState(1);
  const [color, setColor] = useState("#5227FF");
  const [noiseIntensity, setNoiseIntensity] = useState(1.5);
  const [rotation, setRotation] = useState(0);

  const [key, forceRerender] = useForceRerender();

  const propData = [
    {
      name: "speed",
      type: "number",
      default: "5",
      description: "Controls the animation speed of the silk effect."
    },
    {
      name: "scale",
      type: "number",
      default: "1",
      description: "Controls the scale of the silk pattern."
    },
    {
      name: "color",
      type: "string",
      default: "'#7B7481'",
      description: "Hex color code for the silk pattern."
    },
    {
      name: "noiseIntensity",
      type: "number",
      default: "1.5",
      description: "Controls the intensity of the noise effect."
    },
    {
      name: "rotation",
      type: "number",
      default: "0",
      description: "Controls the rotation of the silk pattern (in radians)."
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} overflow="hidden" p={0}>
          <Silk
            key={key}
            speed={speed}
            scale={scale}
            color={color}
            noiseIntensity={noiseIntensity}
            rotation={rotation}
          />

          {/* For Demo Purposes Only */}
          <BackgroundContent
            pillText="New Background"
            headline="Silk touch is a good enhancement, Steve!"
          />
        </Box>

        <Customize>
          <PreviewSlider
            title="Speed"
            min={0.1}
            max={20}
            step={0.1}
            value={speed}
            onChange={(val) => {
              setSpeed(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Scale"
            min={0.1}
            max={5}
            step={0.1}
            value={scale}
            onChange={(val) => {
              setScale(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Noise Intensity"
            min={0}
            max={10}
            step={0.1}
            value={noiseIntensity}
            onChange={(val) => {
              setNoiseIntensity(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Rotation"
            min={0}
            max={Math.PI * 2}
            step={0.01}
            value={rotation}
            onChange={(val) => {
              setRotation(val);
              forceRerender();
            }}
          />

          <Flex align="center" gap={2} mt={4}>
            <Text fontSize="sm">Color</Text>
            <Input
              type="color"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
                forceRerender();
              }}
              width="100px"
            />
          </Flex>
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['three', '@react-three/fiber']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={silkCode} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...silkCode} />
      </CliTab>
    </TabbedLayout>
  );
};

export default SilkDemo;