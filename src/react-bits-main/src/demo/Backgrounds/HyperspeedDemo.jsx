import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { hyperspeedPresets } from "../../content/Backgrounds/Hyperspeed/HyperSpeedPresets";

import PropTable from "../../components/common/Preview/PropTable";
import CodeExample from "../../components/code/CodeExample";
import Dependencies from "../../components/code/Dependencies";
import PreviewSelect from "../../components/common/Preview/PreviewSelect";
import Customize from "../../components/common/Preview/Customize";
import CliInstallation from "../../components/code/CliInstallation";
import BackgroundContent from "../../components/common/Preview/BackgroundContent";

import Hyperspeed from "../../content/Backgrounds/Hyperspeed/Hyperspeed";
import { hyperspeed } from '../../constants/code/Backgrounds/hyperspeedCode';

const HyperspeedDemo = () => {
  const [activePreset, setActivePreset] = useState('one');

  const propData = [
    {
      name: 'effectOptions',
      type: 'object',
      default: 'See the "code" tab for default values and presets.',
      description: 'The highly customizable configuration object for the effect, controls things like colors, distortion, line properties, etc.',
    },
  ];

  const options = [
    { value: 'one', label: 'Cyberpunk' },
    { value: 'two', label: 'Akira' },
    { value: 'three', label: 'Golden' },
    { value: 'four', label: 'Split' },
    { value: 'five', label: 'Highway' }
  ]

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} cursor="pointer" p={0} mb={4}>
          <Hyperspeed effectOptions={hyperspeedPresets[activePreset]} />

          {/* For Demo Purposes Only */}
          <BackgroundContent
            pillText="New Background"
            headline="Cick & hold to see the real magic of hyperspeed!"
          />
        </Box>

        <Customize>
          <PreviewSelect
            title="Animation Preset"
            options={options}
            value={activePreset}
            name="tiltDirection"
            width={150}
            onChange={(val) => {
              setActivePreset(val);
            }}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['three', 'postprocessing']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={hyperspeed} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...hyperspeed} />
      </CliTab>
    </TabbedLayout>
  );
};

export default HyperspeedDemo;
