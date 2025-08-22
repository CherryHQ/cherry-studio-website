import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import {
  Box,
  Flex,
  Text,
  Input
} from "@chakra-ui/react";

import RefreshButton from "../../components/common/Preview/RefreshButton";
import CodeExample from "../../components/code/CodeExample";
import Dependencies from "../../components/code/Dependencies";
import useForceRerender from "../../hooks/useForceRerender";
import PropTable from "../../components/common/Preview/PropTable";
import CliInstallation from "../../components/code/CliInstallation";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import PreviewSwitch from "../../components/common/Preview/PreviewSwitch";
import Customize from "../../components/common/Preview/Customize";

import PixelTrail from "../../content/Animations/PixelTrail/PixelTrail";
import { pixelTrail } from "../../constants/code/Animations/pixelTrailCode";

const PixelTrailDemo = () => {
  const [gridSize, setGridSize] = useState(50);
  const [trailSize, setTrailSize] = useState(0.1);
  const [maxAge, setMaxAge] = useState(250);
  const [interpolate, setInterpolate] = useState(5);
  const [color, setColor] = useState("#5227FF");
  const [gooeyEnabled, setGooeyEnabled] = useState(true);
  const [gooStrength, setGooStrength] = useState(2);

  const [key, forceRerender] = useForceRerender();

  const propData = [
    { name: "gridSize", type: "number", default: "40", description: "Number of pixels in grid." },
    { name: "trailSize", type: "number", default: "0.1", description: "Size of each trail dot." },
    { name: "maxAge", type: "number", default: "500", description: "Duration of the trail effect." },
    { name: "interpolate", type: "number", default: "5", description: "Interpolation factor for pointer movement." },
    { name: "color", type: "string", default: "#ffffff", description: "Pixel color." },
    { name: "gooeyFilter", type: "object", default: "{ id: 'custom-goo-filter', strength: 5 }", description: "Configuration for gooey filter." },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
          <RefreshButton onClick={forceRerender} />
          <PixelTrail
            key={key}
            gridSize={gridSize}
            trailSize={trailSize}
            maxAge={maxAge}
            interpolate={interpolate}
            color={color}
            gooeyFilter={gooeyEnabled ? { id: "custom-goo-filter", strength: gooStrength } : undefined}
          />
          <Text
            position="absolute"
            zIndex={0}
            fontSize="clamp(2rem, 6vw, 6rem)"
            color="#271E37"
            fontWeight={900}
          >
            Move Cursor.
          </Text>
        </Box>

        <Customize>
          <PreviewSlider
            title="Grid Size"
            min={10}
            max={100}
            step={1}
            value={gridSize}
            onChange={(val) => { setGridSize(val); forceRerender(); }}
          />

          <PreviewSlider
            title="Trail Size"
            min={0.05}
            max={0.5}
            step={0.01}
            value={trailSize}
            onChange={(val) => { setTrailSize(val); forceRerender(); }}
          />

          <PreviewSlider
            title="Max Age"
            min={100}
            max={1000}
            step={50}
            value={maxAge}
            onChange={(val) => { setMaxAge(val); forceRerender(); }}
          />

          <PreviewSlider
            title="Interpolate"
            min={0}
            max={10}
            step={0.1}
            value={interpolate}
            onChange={(val) => { setInterpolate(val); forceRerender(); }}
          />

          <Flex gap={4} align="center" mt={4}>
            <Text fontSize="sm">Color</Text>
            <Input
              type="color"
              value={color}
              onChange={(e) => { setColor(e.target.value); forceRerender(); }}
              width="50px"
            />
            <Text fontSize="sm">{color}</Text>
          </Flex>

          <PreviewSwitch
            title="Gooey Filter"
            isChecked={gooeyEnabled}
            onChange={(checked) => { setGooeyEnabled(checked); forceRerender(); }}
          />

          {gooeyEnabled && (
            <PreviewSlider
              title="Gooey Strength"
              min={1}
              max={20}
              step={1}
              value={gooStrength}
              onChange={(val) => { setGooStrength(val); forceRerender(); }}
            />
          )}
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={["@react-three/fiber", "@react-three/drei", "three"]} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={pixelTrail} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...pixelTrail} />
      </CliTab>
    </TabbedLayout>
  );
};

export default PixelTrailDemo;
