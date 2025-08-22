import { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";

import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import PreviewSwitch from "../../components/common/Preview/PreviewSwitch";
import Customize from "../../components/common/Preview/Customize";

import Magnet from "../../content/Animations/Magnet/Magnet";
import { magnet } from '../../constants/code/Animations/magnetCode';

const MagnetDemo = () => {
  const [disabled, setDisabled] = useState(false);
  const [padding, setPadding] = useState(100);
  const [magnetStrength, setMagnetStrength] = useState(2);

  const propData = [
    {
      name: 'padding',
      type: 'number',
      default: 100,
      description: 'Specifies the distance (in pixels) around the element that activates the magnet pull.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: false,
      description: 'Disables the magnet effect when set to true.',
    },
    {
      name: 'magnetStrength',
      type: 'number',
      default: 2,
      description: 'Controls the strength of the pull; higher values reduce movement, lower values increase it.',
    },
    {
      name: 'activeTransition',
      type: 'string',
      default: '"transform 0.3s ease-out"',
      description: 'CSS transition applied to the element when the magnet is active.',
    },
    {
      name: 'inactiveTransition',
      type: 'string',
      default: '"transform 0.5s ease-in-out"',
      description: 'CSS transition applied when the magnet is inactive (mouse out of range).',
    },
    {
      name: 'wrapperClassName',
      type: 'string',
      default: '""',
      description: 'Optional CSS class name for the outermost wrapper element.',
    },
    {
      name: 'innerClassName',
      type: 'string',
      default: '""',
      description: 'Optional CSS class name for the moving (inner) element.',
    },
    {
      name: 'children',
      type: 'ReactNode',
      default: '',
      description: 'The content (JSX) to be displayed inside the magnetized element.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <h2 className="demo-title-extra">Container</h2>
        <Box position="relative" className="demo-container" minH={300}>
          <Magnet
            padding={padding}
            disabled={disabled}
            magnetStrength={magnetStrength}
          >
            <Flex
              w={200}
              h={100}
              fontSize="xl"
              fontWeight="bolder"
              color="#fff"
              bg="#060010"
              border='1px solid #222'
              borderRadius="20px"
              justifyContent="center"
              alignItems="center"
            >
              Hover Me!
            </Flex>
          </Magnet>
        </Box>

        <h2 className="demo-title-extra">Link</h2>
        <Box position="relative" className="demo-container" minH={300}>
          <Magnet
            padding={Math.floor(padding / 2)}
            disabled={disabled}
            magnetStrength={magnetStrength}
          >
            <a href="https://github.com/DavidHDev/react-bits" target="_blank" rel="noreferrer">
              <Flex fontSize="lg" color="#fff">
                Star&nbsp;<Text color="#5227FF">React Bits</Text>&nbsp;on GitHub!
              </Flex>
            </a>
          </Magnet>
        </Box>

        <Customize>
          <PreviewSwitch
            title="Disabled"
            isChecked={disabled}
            onChange={(checked) => setDisabled(checked)}
          />

          <PreviewSlider
            title="Padding"
            min={0}
            max={300}
            step={10}
            value={padding}
            valueUnit="px"
            onChange={setPadding}
          />

          <PreviewSlider
            title="Strength"
            min={1}
            max={10}
            step={1}
            value={magnetStrength}
            onChange={setMagnetStrength}
          />
        </Customize>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={magnet} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...magnet} />
      </CliTab>
    </TabbedLayout>
  );
};

export default MagnetDemo;
