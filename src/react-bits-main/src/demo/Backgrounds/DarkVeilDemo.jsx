import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box } from "@chakra-ui/react";

import Customize from "../../components/common/Preview/Customize";
import CodeExample from "../../components/code/CodeExample";
import BackgroundContent from "../../components/common/Preview/BackgroundContent";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from "../../components/common/Preview/PreviewSlider";

import { darkVeil } from "../../constants/code/Backgrounds/darkVeilCode";
import DarkVeil from "../../content/Backgrounds/DarkVeil/DarkVeil";

const DarkVeilDemo = () => {
  const [hueShift, setHueShift] = useState(0);
  const [noiseIntensity, setNoiseIntensity] = useState(0);
  const [scanlineIntensity, setScanlineIntensity] = useState(0);
  const [speed, setSpeed] = useState(0.5);
  const [scanlineFrequency, setScanlineFrequency] = useState(0);
  const [warpAmount, setWarpAmount] = useState(0);

  const propData = [
    {
      name: "hueShift",
      type: "number",
      default: "0",
      description: "Shifts the hue of the entire animation."
    },
    {
      name: "noiseIntensity",
      type: "number",
      default: "0",
      description: "Intensity of the noise/grain effect."
    },
    {
      name: "scanlineIntensity",
      type: "number",
      default: "0",
      description: "Intensity of the scanline effect."
    },
    {
      name: "speed",
      type: "number",
      default: "0.5",
      description: "Speed of the animation."
    },
    {
      name: "scanlineFrequency",
      type: "number",
      default: "0",
      description: "Frequency of the scanlines."
    },
    {
      name: "warpAmount",
      type: "number",
      default: "0",
      description: "Amount of warp distortion applied to the effect."
    },
    {
      name: "resolutionScale",
      type: "number",
      default: "1",
      description: "Scale factor for the resolution."
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} overflow="hidden">
          <DarkVeil
            hueShift={hueShift}
            noiseIntensity={noiseIntensity}
            scanlineIntensity={scanlineIntensity}
            speed={speed}
            scanlineFrequency={scanlineFrequency}
            warpAmount={warpAmount}
          />

          {/* For Demo Purposes Only */}
          <BackgroundContent
            pillText="New Background"
            headline="Become emboldened by the flame of ambition"
          />
        </Box>

        <Customize>
          <PreviewSlider title="Speed" min={0} max={3} step={0.1} value={speed} onChange={setSpeed} />
          <PreviewSlider title="Hue Shift" min={0} max={360} step={1} value={hueShift} onChange={setHueShift} />
          <PreviewSlider title="Noise Intensity" min={0} max={0.2} step={0.01} value={noiseIntensity} onChange={setNoiseIntensity} />
          <PreviewSlider title="Scanline Frequency" min={0.5} max={5} step={0.1} value={scanlineFrequency} onChange={setScanlineFrequency} />
          <PreviewSlider title="Scanline Intensity" min={0} max={1} step={0.01} value={scanlineIntensity} onChange={setScanlineIntensity} />
          <PreviewSlider title="Warp Amount" min={0} max={5} step={0.1} value={warpAmount} onChange={setWarpAmount} />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['ogl']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={darkVeil} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...darkVeil} />
      </CliTab>
    </TabbedLayout>
  );
};

export default DarkVeilDemo;