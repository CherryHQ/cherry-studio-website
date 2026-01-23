import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { FiMinus, FiPlus } from "react-icons/fi";

import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import PreviewSwitch from "../../components/common/Preview/PreviewSwitch";
import Customize from "../../components/common/Preview/Customize";

import Ribbons from "../../content/Animations/Ribbons/Ribbons";
import { ribbons } from "../../constants/code/Animations/ribbonsCode";

const RibbonsDemo = () => {
  const [baseThickness, setBaseThickness] = useState(30);
  const [colors, setColors] = useState(['#5227FF']);
  const [speedMultiplier, setSpeedMultiplier] = useState(0.5);
  const [maxAge, setMaxAge] = useState(500);

  const [enableFade, setEnableFade] = useState(false);
  const [enableWaves, setEnableWaves] = useState(false);

  const propData = [
    {
      name: "colors",
      type: "string[]",
      default: "['#5227FF']",
      description: "An array of color strings to be used for the ribbons."
    },
    {
      name: "baseSpring",
      type: "number",
      default: "0.03",
      description: "Base spring factor for the physics controlling ribbon motion."
    },
    {
      name: "baseFriction",
      type: "number",
      default: "0.9",
      description: "Base friction factor that dampens the ribbon motion."
    },
    {
      name: "baseThickness",
      type: "number",
      default: "30",
      description: "The base thickness of the ribbons."
    },
    {
      name: "offsetFactor",
      type: "number",
      default: "0.02",
      description: "A factor to horizontally offset the starting positions of the ribbons."
    },
    {
      name: "maxAge",
      type: "number",
      default: "500",
      description: "Delay in milliseconds controlling how long the ribbon trails extend."
    },
    {
      name: "pointCount",
      type: "number",
      default: "50",
      description: "The number of points that make up each ribbon."
    },
    {
      name: "speedMultiplier",
      type: "number",
      default: "0.5",
      description: "Multiplier that adjusts how fast trailing points interpolate towards the head."
    },
    {
      name: "enableFade",
      type: "boolean",
      default: "true",
      description: "If true, a fade effect is applied along the length of the ribbon."
    },
    {
      name: "enableShaderEffect",
      type: "boolean",
      default: "true",
      description: "If true, an additional sine-wave shader effect is applied to the ribbons."
    },
    {
      name: "effectAmplitude",
      type: "number",
      default: "2",
      description: "The amplitude of the shader displacement effect."
    },
    {
      name: "backgroundColor",
      type: "number[]",
      default: "[0, 0, 0, 0]",
      description: "An RGBA array specifying the clear color for the renderer."
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
          <Text position="absolute" fontSize="clamp(2rem, 6vw, 6rem)" fontWeight={900} color="#271E37">Hover Me.</Text>
          <Ribbons
            baseThickness={baseThickness}
            colors={colors}
            speedMultiplier={speedMultiplier}
            maxAge={maxAge}
            enableFade={enableFade}
            enableShaderEffect={enableWaves}
          />
        </Box>

        <Customize>
          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Count</Text>
            <IconButton
              onClick={() => colors.length > 1 && setColors(colors.slice(0, -1))}
              fontSize="xs"
              bg="#170D27"
              borderRadius="10px"
              border="1px solid #271E37"
              _hover={{ bg: "#271E37" }}
              color="#fff"
              h={10}
            >
              <FiMinus />
            </IconButton>
            <Text>{colors.length}</Text>
            <IconButton
              fontSize="xs"
              bg="#170D27"
              borderRadius="10px"
              border="1px solid #271E37"
              _hover={{ bg: "#271E37" }}
              color="#fff"
              h={10}
              onClick={() => {
                if (colors.length < 10) {
                  const newColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
                  setColors([...colors, newColor]);
                }
              }} >
              <FiPlus />
            </IconButton>
          </Flex>

          <PreviewSlider
            title="Thickness"
            min={1}
            max={60}
            step={1}
            value={baseThickness}
            onChange={setBaseThickness}
          />

          <PreviewSlider
            title="Speed"
            min={0.3}
            max={0.7}
            step={0.01}
            value={speedMultiplier}
            onChange={setSpeedMultiplier}
          />

          <PreviewSlider
            title="Max Age"
            min={300}
            max={1000}
            step={100}
            value={maxAge}
            onChange={setMaxAge}
          />

          <PreviewSwitch
            title="Enable Fade"
            isChecked={enableFade}
            onChange={(checked) => setEnableFade(checked)}
          />

          <PreviewSwitch
            title="Enable Waves"
            isChecked={enableWaves}
            onChange={(checked) => setEnableWaves(checked)}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['ogl']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={ribbons} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...ribbons} />
      </CliTab>
    </TabbedLayout>
  );
};

export default RibbonsDemo;