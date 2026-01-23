import { Box } from "@chakra-ui/react";
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";

import CodeExample from '../../components/code/CodeExample';
import PropTable from "../../components/common/Preview/PropTable";
import Dependencies from "../../components/code/Dependencies";
import CliInstallation from "../../components/code/CliInstallation";

import GridMotion from "../../content/Backgrounds/GridMotion/GridMotion";
import { gridMotion } from '../../constants/code/Backgrounds/gridMotionCode';

const GridMotionDemo = () => {
  const propData = [
    {
      name: 'items',
      type: 'array',
      default: '[]',
      description: 'An array of items to display in the grid. Each item can be a string, JSX element, or an image URL.',
    },
    {
      name: 'gradientColor',
      type: 'string',
      default: 'black',
      description: 'Controls the color of the radial gradient used as the background.',
    }
  ];

  const images = Array.from({ length: 30 }, () =>
    'https://images.unsplash.com/photo-1748370987492-eb390a61dcda?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  );

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} p={0} rounded="3xl" overflow="hidden">
          <GridMotion items={images} />
        </Box>

        <PropTable data={propData} />
        <Dependencies dependencyList={['gsap']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={gridMotion} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...gridMotion} />
      </CliTab>
    </TabbedLayout>
  );
};

export default GridMotionDemo;
