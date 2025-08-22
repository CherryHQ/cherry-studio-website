import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Flex, Input, Text } from "@chakra-ui/react";

import Customize from "../../components/common/Preview/Customize";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import Dependencies from '../../components/code/Dependencies';
import BackgroundContent from "../../components/common/Preview/BackgroundContent";

import { beams } from '../../constants/code/Backgrounds/beamsCode';
import Beams from "../../content/Backgrounds/Beams/Beams";

const BeamsDemo = () => {
  const [beamWidth, setBeamWidth] = useState(3);
  const [beamHeight, setBeamHeight] = useState(30);
  const [beamNumber, setBeamNumber] = useState(20);
  const [lightColor, setLightColor] = useState("#ffffff");
  const [speed, setSpeed] = useState(2);
  const [noiseIntensity, setNoiseIntensity] = useState(1.75);
  const [scale, setScale] = useState(0.2);
  const [rotation, setRotation] = useState(30);

  const propData = [
    {
      name: "beamWidth",
      type: "number",
      default: "2",
      description: "Width of each beam."
    },
    {
      name: "beamHeight",
      type: "number",
      default: "15",
      description: "Height of each beam."
    },
    {
      name: "beamNumber",
      type: "number",
      default: "12",
      description: "Number of beams to display."
    },
    {
      name: "lightColor",
      type: "string",
      default: "'#ffffff'",
      description: "Color of the directional light."
    },
    {
      name: "speed",
      type: "number",
      default: "2",
      description: "Speed of the animation."
    },
    {
      name: "noiseIntensity",
      type: "number",
      default: "1.75",
      description: "Intensity of the noise effect overlay."
    },
    {
      name: "scale",
      type: "number",
      default: "0.2",
      description: "Scale of the noise pattern."
    },
    {
      name: "rotation",
      type: "number",
      default: "0",
      description: "Rotation of the entire beams system in degrees."
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} overflow="hidden" p={0}>
          <Beams
            beamWidth={beamWidth}
            beamHeight={beamHeight}
            beamNumber={beamNumber}
            lightColor={lightColor}
            speed={speed}
            noiseIntensity={noiseIntensity}
            scale={scale}
            rotation={rotation}
          />

          {/* For Demo Purposes Only */}
          <BackgroundContent 
            pillText="New Background"
            headline="Radiant beams for creative user interfaces"
          />
        </Box>

        <Customize>
          <Flex align="center" gap={2}>
            <Text fontSize="sm" mr={1}>Color:</Text>
            <Input
              type="color"
              value={lightColor}
              onChange={(e) => {
                setLightColor(e.target.value);
              }}
              width="100px"
            />
          </Flex>
          <PreviewSlider
            title="Beam Width"
            min={0.1}
            max={10}
            step={0.1}
            value={beamWidth}
            onChange={setBeamWidth}
          />
          <PreviewSlider
            title="Beam Height"
            min={1}
            max={25}
            step={1}
            value={beamHeight}
            onChange={setBeamHeight}
          />
          <PreviewSlider
            title="Beam Count"
            min={1}
            max={50}
            step={1}
            value={beamNumber}
            onChange={setBeamNumber}
          />
          <PreviewSlider
            title="Speed"
            min={0.1}
            max={10}
            step={0.1}
            value={speed}
            onChange={setSpeed}
          />
          <PreviewSlider
            title="Noise Intensity"
            min={0}
            max={5}
            step={0.05}
            value={noiseIntensity}
            onChange={setNoiseIntensity}
          />
          <PreviewSlider
            title="Noise Scale"
            min={0.01}
            max={1}
            step={0.01}
            value={scale}
            onChange={setScale}
          />
          <PreviewSlider
            title="Rotation"
            min={0}
            max={360}
            step={1}
            value={rotation}
            onChange={setRotation}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['three', '@react-three/fiber', '@react-three/drei']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={beams} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...beams} />
      </CliTab>
    </TabbedLayout>
  );
};

export default BeamsDemo;