import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";

import Customize from "../../components/common/Preview/Customize";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import logo from '../../assets/logos/react-bits-sticker.png';
import Dependencies from '../../components/code/Dependencies';

import StickerPeel from "../../content/Animations/StickerPeel/StickerPeel";
import { stickerPeel } from "../../constants/code/Animations/stickerPeelCode";

const StickerPeelDemo = () => {
  const [rotate, setRotate] = useState(0);
  const [width, setWidth] = useState(200);
  const [peelBackHoverPct, setPeelBackHoverPct] = useState(30);
  const [peelBackActivePct, setPeelBackActivePct] = useState(40);
  const [lightingIntensity, setLightingIntensity] = useState(0.1);
  const [shadowIntensity, setShadowIntensity] = useState(0.5);
  const [peelDirection, setPeelDirection] = useState(0);

  const propData = [
    {
      name: "imageSrc",
      type: "string",
      default: "required",
      description: "The source URL for the sticker image"
    },
    {
      name: "rotate",
      type: "number",
      default: "30",
      description: "The rotation angle in degrees when dragging"
    },
    {
      name: "peelBackHoverPct",
      type: "number",
      default: "30",
      description: "Percentage of peel effect on hover (0-100)"
    },
    {
      name: "peelBackActivePct",
      type: "number",
      default: "40",
      description: "Percentage of peel effect when active/clicked (0-100)"
    },
    {
      name: "peelDirection",
      type: "number",
      default: "0",
      description: "Direction of the peel effect in degrees (0-360)"
    },
    {
      name: "peelEasing",
      type: "string",
      default: "power3.out",
      description: "GSAP easing function for peel animations"
    },
    {
      name: "peelHoverEasing",
      type: "string",
      default: "power2.out",
      description: "GSAP easing function for hover transitions"
    },
    {
      name: "width",
      type: "number",
      default: "200",
      description: "Width of the sticker in pixels"
    },
    {
      name: "shadowIntensity",
      type: "number",
      default: "0.6",
      description: "Intensity of the shadow effect (0-1)"
    },
    {
      name: "lightingIntensity",
      type: "number",
      default: "0.1",
      description: "Intensity of the lighting effect (0-1)"
    },
    {
      name: "initialPosition",
      type: "string",
      default: "center",
      description: "Initial position of the sticker ('center', 'top-left', 'top-right', 'bottom-left', 'bottom-right')"
    },
    {
      name: 'className',
      type: 'string',
      default: '',
      description: 'Custom class name for additional styling'
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={500} overflow="hidden" bg="linear-gradient(to bottom, #060010, #0D0716, #0D0716 , #060010)">
          <StickerPeel
            imageSrc={logo}
            rotate={rotate}
            width={width}
            peelBackHoverPct={peelBackHoverPct}
            peelBackActivePct={peelBackActivePct}
            lightingIntensity={lightingIntensity}
            shadowIntensity={shadowIntensity}
            peelDirection={peelDirection}
            className="sticker-peel-demo"
          />

          <Text position="absolute" zIndex={0} left='50%' top='1em' transform='translateX(-50%)' fontSize='clamp(1.5rem, 4vw, 3rem)' fontWeight={900} color='#271E37'>
            Try dragging it!
          </Text>
        </Box>

        <Customize>
          <PreviewSlider
            title="Peel Direction"
            min={0}
            max={360}
            step={1}
            value={peelDirection}
            valueUnit="°"
            width={200}
            onChange={setPeelDirection}
          />

          <PreviewSlider
            title="Rotate"
            min={0}
            max={60}
            step={1}
            value={rotate}
            valueUnit="°"
            width={200}
            onChange={setRotate}
          />

          <PreviewSlider
            title="Width"
            min={100}
            max={300}
            step={10}
            value={width}
            valueUnit="px"
            width={200}
            onChange={setWidth}
          />

          <PreviewSlider
            title="Peel Hover %"
            min={0}
            max={50}
            step={1}
            value={peelBackHoverPct}
            valueUnit="%"
            width={200}
            onChange={setPeelBackHoverPct}
          />

          <PreviewSlider
            title="Peel Active %"
            min={0}
            max={70}
            step={1}
            value={peelBackActivePct}
            valueUnit="%"
            width={200}
            onChange={setPeelBackActivePct}
          />

          <PreviewSlider
            title="Lighting Intensity"
            min={0}
            max={0.5}
            step={0.01}
            value={lightingIntensity}
            valueUnit=""
            width={200}
            onChange={setLightingIntensity}
          />

          <PreviewSlider
            title="Shadow Intensity"
            min={0}
            max={1}
            step={0.01}
            value={shadowIntensity}
            valueUnit=""
            width={200}
            onChange={setShadowIntensity}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['gsap']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={stickerPeel} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...stickerPeel} />
      </CliTab>
    </TabbedLayout>
  );
};

export default StickerPeelDemo;