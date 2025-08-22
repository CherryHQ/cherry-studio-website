import { useState } from "react";
import { FiInfo } from "react-icons/fi";
import { Box, Flex, Text } from "@chakra-ui/react";
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";

import CodeExample from "../../components/code/CodeExample";
import PropTable from "../../components/common/Preview/PropTable";
import CliInstallation from "../../components/code/CliInstallation";
import Customize from "../../components/common/Preview/Customize";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import PreviewInput from "../../components/common/Preview/PreviewInput";

import GradientText from "../../content/TextAnimations/GradientText/GradientText";
import { gradientText } from '../../constants/code/TextAnimations/gradientTextCode';

const GradientTextDemo = () => {
  const [colors, setColors] = useState('#40ffaa, #4079ff, #40ffaa, #4079ff, #40ffaa');
  const [speed, setSpeed] = useState(3);

  const gradientPreview = colors.split(',').map(color => color.trim());

  const propData = [
    {
      name: 'children',
      type: 'ReactNode',
      default: '-',
      description: 'The content to be displayed inside the gradient text.',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Adds custom classes to the root element for additional styling.',
    },
    {
      name: 'colors',
      type: 'string[]',
      default: `["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]`,
      description: 'Defines the gradient colors for the text or border.',
    },
    {
      name: 'animationSpeed',
      type: 'number',
      default: '8',
      description: 'The duration of the gradient animation in seconds.',
    },
    {
      name: 'showBorder',
      type: 'boolean',
      default: 'false',
      description: 'Determines whether a border with the gradient effect is displayed.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <h2 className="demo-title-extra">Default</h2>
        <Box position="relative" className="demo-container" minH={150}>
          <Text fontSize={'2rem'} as='div'>
            <GradientText
              colors={colors.split(',')}
              animationSpeed={speed}
              showBorder={false}
            >
              Add a splash of color!
            </GradientText>
          </Text>
        </Box>

        <h2 className="demo-title-extra">Border Animation</h2>
        <Box position="relative" className="demo-container" minH={150}>
          <Text fontSize={'2rem'} as='div'>
            <GradientText
              colors={colors.split(',')}
              animationSpeed={speed}
              className="custom-gradient-class"
            >
              Now with a cool border!
            </GradientText>
          </Text>
        </Box>

        <Customize>
          <PreviewSlider
            title="Loop Duration"
            min={1}
            max={10}
            step={0.5}
            value={speed}
            onChange={setSpeed}
            valueUnit="s"
          />

          <Flex gap={0} direction="column">
            <PreviewInput
              title="Colors"
              maxLength={100}
              placeholder="Enter colors separated by commas"
              onChange={(val) => setColors(val)}
              value={colors}
            />
            <Box
              bg={`linear-gradient(to right, ${gradientPreview.join(", ")})`}
              w="300px"
              marginLeft="calc(2rem + 24px)"
              h="12px"
              borderRadius="md"
              border="1px solid #271E37"
            />
          </Flex>
        </Customize>

        <p className="demo-extra-info" style={{ marginTop: "1rem" }}>
          <FiInfo position="relative" /> For a smoother animation, the gradient should start and end with the same color.
        </p>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={gradientText} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...gradientText} />
      </CliTab>
    </TabbedLayout>
  );
};

export default GradientTextDemo;
