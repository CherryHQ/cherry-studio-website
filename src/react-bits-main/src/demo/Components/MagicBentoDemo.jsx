import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box } from "@chakra-ui/react";

import Customize from "../../components/common/Preview/Customize";
import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import PreviewSwitch from "../../components/common/Preview/PreviewSwitch";
import Dependencies from "../../components/code/Dependencies";

import { magicBento } from "../../constants/code/Components/magicBentoCode";
import MagicBento from "../../content/Components/MagicBento/MagicBento";

const MagicBentoDemo = () => {
  const [enableStars, setEnableStars] = useState(true);
  const [enableSpotlight, setEnableSpotlight] = useState(true);
  const [disableAnimations, setDisableAnimations] = useState(false);
  const [spotlightRadius, setSpotlightRadius] = useState(400);
  const [enableTilt, setEnableTilt] = useState(false);
  const [clickEffect, setClickEffect] = useState(true);
  const [enableMagnetism, setEnableMagnetism] = useState(false);

  const propData = [
    {
      name: "textAutoHide",
      type: "boolean",
      default: "true",
      description: "Whether text content should auto-hide on hover"
    },
    {
      name: "enableStars",
      type: "boolean",
      default: "true",
      description: "Enable particle star animation effect"
    },
    {
      name: "enableSpotlight",
      type: "boolean",
      default: "true",
      description: "Enable spotlight cursor following effect"
    },
    {
      name: "enableBorderGlow",
      type: "boolean",
      default: "true",
      description: "Enable border glow effect that follows cursor"
    },
    {
      name: "disableAnimations",
      type: "boolean",
      default: "false",
      description: "Disable all animations (automatically enabled on mobile)"
    },
    {
      name: "spotlightRadius",
      type: "number",
      default: "300",
      description: "Radius of the spotlight effect in pixels"
    },
    {
      name: "particleCount",
      type: "number",
      default: "12",
      description: "Number of particles in the star animation"
    },
    {
      name: "enableTilt",
      type: "boolean",
      default: "false",
      description: "Enable 3D tilt effect on card hover"
    },
    {
      name: "glowColor",
      type: "string",
      default: "\"132, 0, 255\"",
      description: "RGB color values for glow effects (without rgba wrapper)"
    },
    {
      name: "clickEffect",
      type: "boolean",
      default: "true",
      description: "Enable ripple effect on card click"
    },
    {
      name: "enableMagnetism",
      type: "boolean",
      default: "true",
      description: "Enable subtle card attraction to cursor"
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" py={8} className="demo-container" h="auto" overflow="hidden">
          <MagicBento
            enableStars={enableStars}
            enableSpotlight={enableSpotlight}
            disableAnimations={disableAnimations}
            spotlightRadius={spotlightRadius}
            enableTilt={enableTilt}
            clickEffect={clickEffect}
            enableMagnetism={enableMagnetism}
          />
        </Box>

        <Customize>
          <PreviewSlider
            title="Spotlight Radius"
            min={50}
            max={800}
            step={10}
            value={spotlightRadius}
            onChange={setSpotlightRadius}
          />

          <PreviewSwitch
            title="Stars Effect"
            isChecked={enableStars}
            onChange={setEnableStars}
          />

          <PreviewSwitch
            title="Spotlight Effect"
            isChecked={enableSpotlight}
            onChange={setEnableSpotlight}
          />

          <PreviewSwitch
            title="Tilt Effect"
            isChecked={enableTilt}
            onChange={setEnableTilt}
          />

          <PreviewSwitch
            title="Click Effect"
            isChecked={clickEffect}
            onChange={setClickEffect}
          />

          <PreviewSwitch
            title="Magnetism"
            isChecked={enableMagnetism}
            onChange={setEnableMagnetism}
          />

          <PreviewSwitch
            title="Disable All Animations"
            isChecked={disableAnimations}
            onChange={setDisableAnimations}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['gsap']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={magicBento} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...magicBento} />
      </CliTab>
    </TabbedLayout>
  );
};

export default MagicBentoDemo;