import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box } from "@chakra-ui/react";

import Customize from "../../components/common/Preview/Customize";
import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import BackgroundContent from "../../components/common/Preview/BackgroundContent";
import PropTable from "../../components/common/Preview/PropTable";
import Dependencies from '../../components/code/Dependencies';
import PreviewSwitch from "../../components/common/Preview/PreviewSwitch";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";

import Galaxy from "../../content/Backgrounds/Galaxy/Galaxy";
import { galaxy } from "../../constants/code/Backgrounds/galaxyCode";
import { useState } from "react";

const GalaxyDemo = () => {
  const [density, setDensity] = useState(1);
  const [glowIntensity, setGlowIntensity] = useState(0.3);
  const [saturation, setSaturation] = useState(0.0);
  const [hueShift, setHueShift] = useState(140);
  const [twinkleIntensity, setTwinkleIntensity] = useState(0.3);
  const [rotationSpeed, setRotationSpeed] = useState(0.1);
  const [repulsionStrength, setRepulsionStrength] = useState(2);
  const [autoCenterRepulsion, setAutoCenterRepulsion] = useState(0);
  const [starSpeed, setStarSpeed] = useState(0.5);
  const [speed, setSpeed] = useState(1.0);
  const [mouseRepulsion, setMouseRepulsion] = useState(true);
  const [mouseInteraction, setMouseInteraction] = useState(true);

  const propData = [
    {
      name: "focal",
      type: "[number, number]",
      default: "[0.5, 0.5]",
      description: "Sets the focal point of the galaxy effect as [x, y] coordinates from 0 to 1"
    },
    {
      name: "rotation",
      type: "[number, number]",
      default: "[1.0, 0.0]",
      description: "Controls the rotation matrix of the galaxy as [x, y] rotation values"
    },
    {
      name: "starSpeed",
      type: "number",
      default: "0.5",
      description: "Controls the speed of star movement and animation"
    },
    {
      name: "density",
      type: "number",
      default: "1",
      description: "Controls the density of stars in the galaxy"
    },
    {
      name: "hueShift",
      type: "number",
      default: "140",
      description: "Shifts the hue of all stars by the specified degrees (0-360)"
    },
    {
      name: "disableAnimation",
      type: "boolean",
      default: "false",
      description: "When true, stops all time-based animations"
    },
    {
      name: "speed",
      type: "number",
      default: "1.0",
      description: "Global speed multiplier for all animations"
    },
    {
      name: "mouseInteraction",
      type: "boolean",
      default: "true",
      description: "Enables or disables mouse interaction with the galaxy"
    },
    {
      name: "glowIntensity",
      type: "number",
      default: "0.3",
      description: "Controls the intensity of the star glow effect"
    },
    {
      name: "saturation",
      type: "number",
      default: "0.0",
      description: "Controls color saturation of stars (0 = grayscale, 1 = full color)"
    },
    {
      name: "mouseRepulsion",
      type: "boolean",
      default: "true",
      description: "When true, stars are repelled by the mouse cursor"
    },
    {
      name: "twinkleIntensity",
      type: "number",
      default: "0.3",
      description: "Controls how much stars twinkle (0 = no twinkle, 1 = maximum twinkle)"
    },
    {
      name: "rotationSpeed",
      type: "number",
      default: "0.1",
      description: "Speed of automatic galaxy rotation"
    },
    {
      name: "repulsionStrength",
      type: "number",
      default: "2",
      description: "Strength of mouse repulsion effect when mouseRepulsion is enabled"
    },
    {
      name: "autoCenterRepulsion",
      type: "number",
      default: "0",
      description: "Creates repulsion from center of canvas. Overrides mouse repulsion when > 0"
    },
    {
      name: "transparent",
      type: "boolean",
      default: "true",
      description: "Makes the black background transparent, showing only stars"
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} overflow="hidden" p={0}>
          <Galaxy
            density={density}
            glowIntensity={glowIntensity}
            saturation={saturation}
            hueShift={hueShift}
            twinkleIntensity={twinkleIntensity}
            rotationSpeed={rotationSpeed}
            repulsionStrength={repulsionStrength}
            autoCenterRepulsion={autoCenterRepulsion}
            starSpeed={starSpeed}
            speed={speed}
            mouseRepulsion={mouseRepulsion}
            mouseInteraction={mouseInteraction}
          />

          <BackgroundContent headline="Components you shall have, young padawan." pillText="New Background" />
        </Box>

        <Customize>
          <PreviewSwitch
            title="Mouse Interaction"
            isChecked={mouseInteraction}
            onChange={setMouseInteraction}
          />

          <PreviewSwitch
            title="Mouse Repulsion"
            isChecked={mouseRepulsion}
            onChange={setMouseRepulsion}
          />

          <PreviewSlider
            title="Density"
            min={0.1}
            max={3}
            step={0.1}
            value={density}
            onChange={setDensity}
            width={200}
          />

          <PreviewSlider
            title="Glow Intensity"
            min={0}
            max={1}
            step={0.1}
            value={glowIntensity}
            onChange={setGlowIntensity}
            width={200}
          />

          <PreviewSlider
            title="Saturation"
            min={0}
            max={1}
            step={0.1}
            value={saturation}
            onChange={setSaturation}
            width={200}
          />

          <PreviewSlider
            title="Hue Shift"
            min={0}
            max={360}
            step={10}
            value={hueShift}
            valueUnit="°"
            onChange={setHueShift}
            width={200}
          />

          <PreviewSlider
            title="Twinkle Intensity"
            min={0}
            max={1}
            step={0.1}
            value={twinkleIntensity}
            onChange={setTwinkleIntensity}
            width={200}
          />

          <PreviewSlider
            title="Rotation Speed"
            min={0}
            max={0.5}
            step={0.05}
            value={rotationSpeed}
            onChange={setRotationSpeed}
            width={200}
          />

          <PreviewSlider
            title="Repulsion Strength"
            min={0}
            max={10}
            step={0.5}
            value={repulsionStrength}
            onChange={setRepulsionStrength}
            width={200}
          />

          <PreviewSlider
            title="Auto Center Repulsion"
            min={0}
            max={20}
            step={1}
            value={autoCenterRepulsion}
            onChange={setAutoCenterRepulsion}
            width={200}
          />

          <PreviewSlider
            title="Star Speed"
            min={0.1}
            max={2}
            step={0.1}
            value={starSpeed}
            onChange={setStarSpeed}
            width={200}
          />

          <PreviewSlider
            title="Animation Speed"
            min={0.1}
            max={3}
            step={0.1}
            value={speed}
            onChange={setSpeed}
            width={200}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['ogl']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={galaxy} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...galaxy} />
      </CliTab>
    </TabbedLayout>
  );
};

export default GalaxyDemo;