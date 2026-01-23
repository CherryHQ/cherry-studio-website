import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box } from "@chakra-ui/react";

import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import Dependencies from '../../components/code/Dependencies';
import Customize from "../../components/common/Preview/Customize";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import PreviewSelect from "../../components/common/Preview/PreviewSelect";
import PreviewInput from "../../components/common/Preview/PreviewInput";

import CircularText from "../../content/TextAnimations/CircularText/CircularText";
import { circularText } from "../../constants/code/TextAnimations/circularTextCode";

const CircularTextDemo = () => {
  const [text, setText] = useState("REACT*BITS*COMPONENTS*");
  const [onHover, setOnHover] = useState("speedUp");
  const [spinDuration, setSpinDuration] = useState(20);

  const propData = [
    {
      name: "text",
      type: "string",
      default: "''",
      description: "The text to display in a circular layout."
    },
    {
      name: "spinDuration",
      type: "number",
      default: "20",
      description: "The duration (in seconds) for one full rotation."
    },
    {
      name: "onHover",
      type: "'slowDown' | 'speedUp' | 'pause' | 'goBonkers'",
      default: "undefined",
      description: "Specifies the hover behavior variant. Options include 'slowDown', 'speedUp', 'pause', and 'goBonkers'."
    },
    {
      name: "className",
      type: "string",
      default: "''",
      description: "Optional additional CSS classes to apply to the component."
    }
  ];

  const options = [
    { label: 'Slow Down', value: 'slowDown' },
    { label: 'Speed Up', value: 'speedUp' },
    { label: 'Pause', value: 'pause' },
    { label: 'Go Bonkers', value: 'goBonkers' }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={400} overflow="hidden">
          <CircularText text={text} onHover={onHover} spinDuration={spinDuration} />
        </Box>


        <Customize className="preview-options">
          <PreviewInput
            title="Text"
            value={text}
            placeholder="Enter text..."
            width={220}
            maxLength={25}
            onChange={setText}
          />

          <PreviewSelect
            title="On Hover"
            options={options}
            value={onHover}
            name="setOnHover"
            width={150}
            onChange={(val) => {
              setOnHover(val);
            }}
          />

          <PreviewSlider
            min={1}
            title="Spin Duration (s)"
            max={60}
            step={1}
            value={spinDuration}
            onChange={(val) => {
              setSpinDuration(val);
            }}
          />

        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['motion']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={circularText} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...circularText} />
      </CliTab>
    </TabbedLayout>
  );
};

export default CircularTextDemo;