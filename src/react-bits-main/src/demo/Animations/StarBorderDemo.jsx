import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";

import CodeExample from '../../components/code/CodeExample';
import PropTable from "../../components/common/Preview/PropTable";
import CliInstallation from "../../components/code/CliInstallation";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import PreviewSelect from "../../components/common/Preview/PreviewSelect";

import StarBorder from "../../content/Animations/StarBorder/StarBorder";
import { starBorder } from '../../constants/code/Animations/starBorderCode';
import Customize from "../../components/common/Preview/Customize";

const StarBorderDemo = () => {
  const [thickness, setThickness] = useState(1);
  const [speed, setSpeed] = useState(5);
  const [color, setColor] = useState("magenta");

  const colorOptions = [
    { value: "magenta", label: "Magenta" },
    { value: "cyan", label: "Cyan" },
    { value: "white", label: "White" },
  ];

  const propData = [
    {
      name: 'as',
      type: 'string',
      default: 'button',
      description: 'Allows specifying the type of the parent component to be rendered.',
    },
    {
      name: 'className',
      type: 'string',
      default: '-',
      description: 'Allows adding custom classes to the component.',
    },
    {
      name: 'color',
      type: 'string',
      default: 'white',
      description: 'Changes the main color of the border (fades to transparent)',
    },
    {
      name: 'speed',
      type: 'string',
      default: '6s',
      description: 'Changes the speed of the animation.',
    },
    {
      name: 'thickness',
      type: 'number',
      default: '3',
      description: 'Controls the thickness of the star border effect.',
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={400}>
          <StarBorder
            className="star-border-demo"
            color={color}
            thickness={thickness}
            speed={`${speed}s`}
          >
            <Text mx={0} fontSize={'1em'}>Star Border</Text>
          </StarBorder>
        </Box>

        <Customize>
          <PreviewSelect
            title="Color"
            options={colorOptions}
            value={color}
            width={120}
            onChange={setColor}
          />

          <PreviewSlider
            title="Thickness"
            min={0.5}
            max={8}
            step={0.5}
            value={thickness}
            valueUnit="px"
            width={200}
            onChange={setThickness}
          />

          <PreviewSlider
            title="Speed"
            min={1}
            max={10}
            step={0.5}
            value={speed}
            valueUnit="s"
            width={200}
            onChange={setSpeed}
          />
        </Customize>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={starBorder} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...starBorder} />
      </CliTab>
    </TabbedLayout>
  );
};

export default StarBorderDemo;
