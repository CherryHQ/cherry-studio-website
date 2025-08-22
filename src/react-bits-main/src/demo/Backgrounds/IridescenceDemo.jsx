import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Flex, Text } from "@chakra-ui/react";

import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import Dependencies from '../../components/code/Dependencies';
import useForceRerender from "../../hooks/useForceRerender";
import Customize from "../../components/common/Preview/Customize";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import PreviewSwitch from "../../components/common/Preview/PreviewSwitch";
import BackgroundContent from "../../components/common/Preview/BackgroundContent";

import Iridescence from "../../content/Backgrounds/Iridescence/Iridescence";
import { iridescence } from "../../constants/code/Backgrounds/iridescenceCode";

const IridescenceDemo = () => {
  const [colors, setColors] = useState([0.5, 0.6, 0.8]);

  const [speed, setSpeed] = useState(1);
  const [mouseInteraction, setMouseInteraction] = useState(true);

  const [key, forceRerender] = useForceRerender();

  const propData = [
    {
      name: "color",
      type: "Array<number>",
      default: "[0.3, 0.2, 0.5]",
      description: "Base color as an array of RGB values (each between 0 and 1)."
    },
    {
      name: "speed",
      type: "number",
      default: "1.0",
      description: "Speed multiplier for the animation."
    },
    {
      name: "amplitude",
      type: "number",
      default: "0.1",
      description: "Amplitude for the mouse-driven effect."
    },
    {
      name: "mouseReact",
      type: "boolean",
      default: "false",
      description: "Enable or disable mouse interaction with the shader."
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} p={0} overflow="hidden">
          <Iridescence key={key} speed={speed} color={colors} mouseReact={mouseInteraction} />

          {/* For Demo Purposes Only */}
          <BackgroundContent
            pillText="New Background"
            headline="Radiant iridescence with customizable colors"
          />
        </Box>

        <Customize className="preview-options">
          <Text fontSize="sm">Colors</Text>
          <Flex gap={4} wrap="wrap">
            <Flex gap={4} align="center" mt={2} background="#170D27" px={4} borderRadius={16} position="relative">
              <PreviewSlider
                min={0}
                max={1}
                width={50}
                step={0.1}
                value={colors[0]}
                title="Red"
                onChange={(val) => {
                  setColors(prev => {
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
                value={colors[1]}
                title="Green"
                onChange={(val) => {
                  setColors(prev => {
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
                value={colors[2]}
                title="Blue"
                onChange={(val) => {
                  setColors(prev => {
                    const newColors = [...prev];
                    newColors[2] = val;
                    return newColors;
                  });
                }}
                minWidth="60px"
                maxWidth="60px"
              />
            </Flex>
          </Flex>


          <PreviewSlider
            min={0}
            max={2}
            title="Speed"
            step={0.1}
            value={speed}
            onChange={(val) => {
              setSpeed(val);
              forceRerender();
            }}
          />

          <PreviewSwitch
            title="Enable Mouse Interaction"
            isChecked={mouseInteraction}
            onChange={(checked) => {
              setMouseInteraction(checked);
              forceRerender();
            }}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['ogl']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={iridescence} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...iridescence} />
      </CliTab>
    </TabbedLayout>
  );
};

export default IridescenceDemo;