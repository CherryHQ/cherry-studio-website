import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Flex, Input, Text } from "@chakra-ui/react";

import Customize from "../../components/common/Preview/Customize";
import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import BackgroundContent from "../../components/common/Preview/BackgroundContent";
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import PreviewSwitch from "../../components/common/Preview/PreviewSwitch";
import PreviewSelect from "../../components/common/Preview/PreviewSelect";
import useForceRerender from "../../hooks/useForceRerender";

import { lightRays } from "../../constants/code/Backgrounds/lightRaysCode";
import LightRays from "../../content/Backgrounds/LightRays/LightRays";

const LightRaysDemo = () => {
  const [key, forceRerender] = useForceRerender();

  const [raysOrigin, setRaysOrigin] = useState("top-center");
  const [raysColor, setRaysColor] = useState("#ffffff");
  const [raysSpeed, setRaysSpeed] = useState(1);
  const [lightSpread, setLightSpread] = useState(0.5);
  const [rayLength, setRayLength] = useState(3.0);
  const [pulsating, setPulsating] = useState(false);
  const [fadeDistance, setFadeDistance] = useState(1.0);
  const [saturation, setSaturation] = useState(1.0);
  const [mouseInfluence, setMouseInfluence] = useState(0.1);
  const [noiseAmount, setNoiseAmount] = useState(0.0);
  const [distortion, setDistortion] = useState(0.0);

  const raysOriginOptions = [
    { value: "top-center", label: "Top" },
    { value: "right", label: "Right" },
    { value: "left", label: "Left" },
    { value: "bottom-center", label: "Bottom" },
  ];

  const propData = [
    {
      name: "raysOrigin",
      type: "RaysOrigin",
      default: '"top-center"',
      description: "Origin position of the light rays. Options: 'top-center', 'top-left', 'top-right', 'right', 'left', 'bottom-center', 'bottom-right', 'bottom-left'"
    },
    {
      name: "raysColor",
      type: "string",
      default: '"#ffffff"',
      description: "Color of the light rays in hex format"
    },
    {
      name: "raysSpeed",
      type: "number",
      default: "1",
      description: "Animation speed of the rays"
    },
    {
      name: "lightSpread",
      type: "number",
      default: "0.5",
      description: "How wide the light rays spread. Lower values = tighter rays, higher values = wider spread"
    },
    {
      name: "rayLength",
      type: "number",
      default: "1.0",
      description: "Maximum length/reach of the rays"
    },
    {
      name: "pulsating",
      type: "boolean",
      default: "false",
      description: "Enable pulsing animation effect"
    },
    {
      name: "fadeDistance",
      type: "number",
      default: "1.0",
      description: "How far rays fade out from origin"
    },
    {
      name: "saturation",
      type: "number",
      default: "1.0",
      description: "Color saturation level (0-1)"
    },
    {
      name: "followMouse",
      type: "boolean",
      default: "false",
      description: "Make rays rotate towards the mouse cursor"
    },
    {
      name: "mouseInfluence",
      type: "number",
      default: "0.5",
      description: "How much mouse affects rays (0-1)"
    },
    {
      name: "noiseAmount",
      type: "number",
      default: "0.0",
      description: "Add noise/grain to rays (0-1)"
    },
    {
      name: "distortion",
      type: "number",
      default: "0.0",
      description: "Apply wave distortion to rays"
    },
    {
      name: "className",
      type: "string",
      default: '""',
      description: "Additional CSS classes to apply to the container"
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} p={0} overflow="hidden">
          <LightRays
            key={key}
            raysOrigin={raysOrigin}
            raysColor={raysColor}
            raysSpeed={raysSpeed}
            lightSpread={lightSpread}
            rayLength={rayLength}
            pulsating={pulsating}
            fadeDistance={fadeDistance}
            saturation={saturation}
            mouseInfluence={mouseInfluence}
            noiseAmount={noiseAmount}
            distortion={distortion}
          />

          <BackgroundContent pillText="New Background" headline="May these lights guide you on your path" />
        </Box>

        <Customize>
          <Flex alignItems="center" mb={4}>
            <Text fontSize="sm" mr={2}>Rays Color</Text>
            <Input
              type="color"
              value={raysColor}
              onChange={(e) => { setRaysColor(e.target.value); forceRerender(); }}
              width="50px"
            />
          </Flex>

          <PreviewSelect
            title="Rays Origin"
            value={raysOrigin}
            onChange={(value) => { setRaysOrigin(value); forceRerender(); }}
            width={160}
            options={raysOriginOptions}
          />

          <PreviewSlider
            title="Rays Speed"
            min={0.1}
            max={3}
            step={0.1}
            value={raysSpeed}
            onChange={(value) => { setRaysSpeed(value); forceRerender(); }}
          />

          <PreviewSlider
            title="Light Spread"
            min={0.1}
            max={2}
            step={0.1}
            value={lightSpread}
            onChange={(value) => { setLightSpread(value); forceRerender(); }}
          />

          <PreviewSlider
            title="Ray Length"
            min={0.5}
            max={3}
            step={0.1}
            value={rayLength}
            onChange={(value) => { setRayLength(value); forceRerender(); }}
          />

          <PreviewSlider
            title="Fade Distance"
            min={0.5}
            max={2}
            step={0.1}
            value={fadeDistance}
            onChange={(value) => { setFadeDistance(value); forceRerender(); }}
          />

          <PreviewSlider
            title="Saturation"
            min={0}
            max={2}
            step={0.1}
            value={saturation}
            onChange={(value) => { setSaturation(value); forceRerender(); }}
          />

          <PreviewSlider
            title="Mouse Influence"
            min={0}
            max={1}
            step={0.1}
            value={mouseInfluence}
            onChange={(value) => { setMouseInfluence(value); forceRerender(); }}
          />

          <PreviewSlider
            title="Noise Amount"
            min={0}
            max={0.5}
            step={0.01}
            value={noiseAmount}
            onChange={(value) => { setNoiseAmount(value); forceRerender(); }}
          />

          <PreviewSlider
            title="Distortion"
            min={0}
            max={1}
            step={0.1}
            value={distortion}
            onChange={(value) => { setDistortion(value); forceRerender(); }}
          />

          <PreviewSwitch
            title="Pulsating"
            checked={pulsating}
            onChange={(value) => { setPulsating(value); forceRerender(); }}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['ogl']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={lightRays} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...lightRays} />
      </CliTab>
    </TabbedLayout>
  );
};

export default LightRaysDemo;