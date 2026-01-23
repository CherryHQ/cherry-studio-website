import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Text, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";

import Customize from "../../components/common/Preview/Customize";
import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import PreviewSwitch from "../../components/common/Preview/PreviewSwitch";

import TargetCursor from "../../content/Animations/TargetCursor/TargetCursor";
import { targetCursor } from "../../constants/code/Animations/targetCursorCode";

const TargetCursorDemo = () => {
  const [spinDuration, setSpinDuration] = useState(2);
  const [hideDefaultCursor, setHideDefaultCursor] = useState(true);

  const propData = [
    {
      name: "targetSelector",
      type: "string",
      default: '".cursor-target"',
      description: "CSS selector for elements that should trigger the cursor targeting effect"
    },
    {
      name: "spinDuration",
      type: "number",
      default: "2",
      description: "Duration in seconds for the cursor's spinning animation when not targeting"
    },
    {
      name: "hideDefaultCursor",
      type: "boolean",
      default: "true",
      description: "Whether to hide the default browser cursor when the component is active"
    }
  ];

  return (
    <>
      <TabbedLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" flexDirection="column" h={500} overflow="hidden">
            <Text fontSize="clamp(2rem, 6vw, 3rem)" fontWeight={900} mb={6} color="#271E37">Hover Below.</Text>

            <Grid templateColumns="repeat(3, 1fr)" gap={4} mb={2}>
              <GridItem>
                <Text borderRadius="15px" color="#B19EEF" border="1px dashed #B19EEF" fontWeight={900} fontSize='2rem' className="cursor-target" py={2} px={6} textAlign="center">THIS</Text>
              </GridItem>
              <GridItem>
                <Text borderRadius="15px" color="#B19EEF" border="1px dashed #B19EEF" fontWeight={900} fontSize='2rem' className="cursor-target" py={2} px={6} textAlign="center">FEELS</Text>
              </GridItem>
              <GridItem>
                <Text borderRadius="15px" color="#B19EEF" border="1px dashed #B19EEF" fontWeight={900} fontSize='2rem' className="cursor-target" py={2} px={6} textAlign="center">QUITE</Text>
              </GridItem>
              <GridItem colSpan={3}>
                <Text textAlign="center" borderRadius="15px" color="#B19EEF" border="1px dashed #B19EEF" fontWeight={900} fontSize='2rem' className="cursor-target" py={2} px={6}>SNAPPY!</Text>
              </GridItem>
            </Grid>
          </Box>

          <Customize>
            <PreviewSlider
              title="Spin Duration"
              min={0.5}
              max={5}
              step={0.1}
              value={spinDuration}
              valueUnit="s"
              width={200}
              onChange={setSpinDuration}
            />

            <PreviewSwitch
              title="Hide Default Cursor"
              isChecked={hideDefaultCursor}
              onChange={setHideDefaultCursor}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['gsap']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={targetCursor} />
        </CodeTab>

        <CliTab>
          <CliInstallation {...targetCursor} />
        </CliTab>
      </TabbedLayout>

      <TargetCursor
        spinDuration={spinDuration}
        hideDefaultCursor={hideDefaultCursor}
      />
    </>
  );
};

export default TargetCursorDemo;