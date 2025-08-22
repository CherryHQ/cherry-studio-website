import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box } from "@chakra-ui/react";

import Customize from "../../components/common/Preview/Customize";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import useForceRerender from "../../hooks/useForceRerender";
import PropTable from "../../components/common/Preview/PropTable";
import BackgroundContent from "../../components/common/Preview/BackgroundContent";

import Lightning from "../../content/Backgrounds/Lightning/Lightning";
import { lightning } from "../../constants/code/Backgrounds/lightningCode";

const LightningDemo = () => {
  const [hue, setHue] = useState(260);
  const [xOffset, setXOffset] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [intensity, setIntensity] = useState(1);
  const [size, setSize] = useState(1);

  const [key, forceRerender] = useForceRerender();

  const propData = [
    {
      name: "hue",
      type: "number",
      default: "230",
      description: "Hue of the lightning in degrees (0 to 360)."
    },
    {
      name: "xOffset",
      type: "number",
      default: "0",
      description: "Horizontal offset of the lightning in normalized units."
    },
    {
      name: "speed",
      type: "number",
      default: "1",
      description: "Animation speed multiplier for the lightning."
    },
    {
      name: "intensity",
      type: "number",
      default: "1",
      description: "Brightness multiplier for the lightning."
    },
    {
      name: "size",
      type: "number",
      default: "1",
      description: "Scale factor for the bolt size."
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} p={0} overflow="hidden">
          <Lightning
            key={key}
            hue={hue}
            xOffset={xOffset}
            speed={speed}
            intensity={intensity}
            size={size}
          />

          {/* For Demo Purposes Only */}
          <BackgroundContent
            pillText="New Background"
            headline="The power of nature's fury, with React Bits!"
          />
        </Box>

        <Customize>
          <PreviewSlider
            title="Hue"
            min={0}
            max={360}
            step={1}
            value={hue}
            onChange={(val) => {
              setHue(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="X Offset"
            min={-2}
            max={2}
            step={0.1}
            value={xOffset}
            onChange={(val) => {
              setXOffset(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Speed"
            min={0.5}
            max={2}
            step={0.1}
            value={speed}
            onChange={(val) => {
              setSpeed(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Intensity"
            min={0.1}
            max={2}
            step={0.1}
            value={intensity}
            onChange={(val) => {
              setIntensity(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Size"
            min={0.1}
            max={3}
            step={0.1}
            value={size}
            onChange={(val) => {
              setSize(val);
              forceRerender();
            }}
          />
        </Customize>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={lightning} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...lightning} />
      </CliTab>
    </TabbedLayout>
  );
};

export default LightningDemo;