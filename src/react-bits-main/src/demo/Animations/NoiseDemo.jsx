import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";

import RefreshButton from "../../components/common/Preview/RefreshButton";
import CodeExample from "../../components/code/CodeExample";
import useForceRerender from "../../hooks/useForceRerender";
import PropTable from "../../components/common/Preview/PropTable";
import CliInstallation from "../../components/code/CliInstallation";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import Customize from "../../components/common/Preview/Customize";

import Noise from "../../content/Animations/Noise/Noise";
import { noise } from '../../constants/code/Animations/noiseCode';

const NoiseDemo = () => {
  const [patternSize, setPatternSize] = useState(250);
  const [patternScaleX, setPatternScaleX] = useState(2);
  const [patternScaleY, setPatternScaleY] = useState(2);
  const [patternAlpha, setPatternAlpha] = useState(15);

  const [key, forceRerender] = useForceRerender();

  const propData = [
    {
      name: "patternSize",
      type: "number",
      default: 250,
      description: "Defines the size of the grain pattern.",
    },
    {
      name: "patternScaleX",
      type: "number",
      default: 1,
      description: "Scaling factor for the X-axis of the grain pattern.",
    },
    {
      name: "patternScaleY",
      type: "number",
      default: 1,
      description: "Scaling factor for the Y-axis of the grain pattern.",
    },
    {
      name: "patternRefreshInterval",
      type: "number",
      default: 2,
      description: "Number of frames before the grain pattern refreshes.",
    },
    {
      name: "patternAlpha",
      type: "number",
      default: 15,
      description: "Opacity of the grain pattern (0-255).",
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" background='#060010' minH={400} overflow="hidden">
          <Text color="#271E37" fontSize="6rem" fontWeight={900} textAlign={'center'}>
            Ooh, edgy!
          </Text>
          <Noise
            key={key}
            patternSize={patternSize}
            patternScaleX={patternScaleX}
            patternScaleY={patternScaleY}
            patternAlpha={patternAlpha}
          />
          <RefreshButton onClick={forceRerender} />
        </Box>

        <Customize>
          <PreviewSlider
            title="Pattern Size"
            min={50}
            max={500}
            step={10}
            value={patternSize}
            valueUnit="px"
            onChange={(val) => {
              setPatternSize(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Scale X"
            min={0.1}
            max={5}
            step={0.1}
            value={patternScaleX}
            onChange={(val) => {
              setPatternScaleX(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Scale Y"
            min={0.1}
            max={5}
            step={0.1}
            value={patternScaleY}
            onChange={(val) => {
              setPatternScaleY(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Pattern Alpha"
            min={0}
            max={25}
            step={5}
            value={patternAlpha}
            onChange={(val) => {
              setPatternAlpha(val);
              forceRerender();
            }}
          />
        </Customize>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={noise} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...noise} />
      </CliTab>
    </TabbedLayout>
  );
};

export default NoiseDemo;