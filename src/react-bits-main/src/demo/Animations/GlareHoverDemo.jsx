import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Text, Flex } from "@chakra-ui/react";

import Customize from "../../components/common/Preview/Customize";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import PreviewSwitch from "../../components/common/Preview/PreviewSwitch";
import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";

import { glareHover } from '../../constants/code/Animations/glareHoverCode';
import GlareHover from "../../content/Animations/GlareHover/GlareHover";

const GlareHoverDemo = () => {
  const [glareColor, setGlareColor] = useState("#ffffff");
  const [glareOpacity, setGlareOpacity] = useState(0.3);
  const [glareSize, setGlareSize] = useState(300);
  const [transitionDuration, setTransitionDuration] = useState(800);
  const [playOnce, setPlayOnce] = useState(false);

  const propData = [
    {
      name: "width",
      type: "string",
      default: "500px",
      description: "The width of the hover element."
    },
    {
      name: "height",
      type: "string",
      default: "500px",
      description: "The height of the hover element."
    },
    {
      name: "background",
      type: "string",
      default: "#000",
      description: "The background color of the element."
    },
    {
      name: "borderRadius",
      type: "string",
      default: "10px",
      description: "The border radius of the element."
    },
    {
      name: "borderColor",
      type: "string",
      default: "#333",
      description: "The border color of the element."
    },
    {
      name: "children",
      type: "React.ReactNode",
      default: "undefined",
      description: "The content to display inside the glare hover element."
    },
    {
      name: "glareColor",
      type: "string",
      default: "#ffffff",
      description: "The color of the glare effect (hex format)."
    },
    {
      name: "glareOpacity",
      type: "number",
      default: "0.5",
      description: "The opacity of the glare effect (0-1)."
    },
    {
      name: "glareAngle",
      type: "number",
      default: "-45",
      description: "The angle of the glare effect in degrees."
    },
    {
      name: "glareSize",
      type: "number",
      default: "250",
      description: "The size of the glare effect as a percentage (e.g. 250 = 250%)."
    },
    {
      name: "transitionDuration",
      type: "number",
      default: "650",
      description: "The duration of the transition in milliseconds."
    },
    {
      name: "playOnce",
      type: "boolean",
      default: "false",
      description: "If true, the glare only animates on hover and doesn't return on mouse leave."
    },
    {
      name: "className",
      type: "string",
      default: '""',
      description: "Additional CSS class names."
    },
    {
      name: "style",
      type: "React.CSSProperties",
      default: "{}",
      description: "Additional inline styles."
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} overflow="hidden">
          <GlareHover
            background="#060010"
            borderColor="#271E37"
            borderRadius="20px"
            width="400px"
            height="300px"
            glareColor={glareColor}
            glareOpacity={glareOpacity}
            glareSize={glareSize}
            transitionDuration={transitionDuration}
            playOnce={playOnce}
          >
            <Text textAlign="center" fontSize='3rem' fontWeight="900" color="#271E37" m={0}>Hover Me</Text>
          </GlareHover>
        </Box>

        <Customize>
          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Glare Color</Text>
            <input
              type="color"
              value={glareColor}
              onChange={(e) => setGlareColor(e.target.value)}
              style={{ height: '22px', outline: 'none', border: 'none', width: '50px' }}
            />
          </Flex>

          <PreviewSlider
            title="Glare Opacity"
            min={0}
            max={1}
            step={0.1}
            value={glareOpacity}
            onChange={setGlareOpacity}
          />

          <PreviewSlider
            title="Glare Size"
            min={100}
            max={500}
            step={25}
            value={glareSize}
            onChange={setGlareSize}
            valueUnit="%"
          />

          <PreviewSlider
            title="Transition Duration"
            min={200}
            max={2000}
            step={50}
            value={transitionDuration}
            onChange={setTransitionDuration}
            valueUnit="ms"
          />

          <PreviewSwitch
            title="Play Once"
            isChecked={playOnce}
            onChange={(checked) => setPlayOnce(checked)}
          />
        </Customize>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={glareHover} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...glareHover} />
      </CliTab>
    </TabbedLayout>
  );
};

export default GlareHoverDemo;