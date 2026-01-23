import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Text } from "@chakra-ui/react";

import Customize from "../../components/common/Preview/Customize";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import PreviewSwitch from "../../components/common/Preview/PreviewSwitch";
import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import Dependencies from '../../components/code/Dependencies';
import RefreshButton from "../../components/common/Preview/RefreshButton";
import useForceRerender from "../../hooks/useForceRerender";

import Lanyard from '../../content/Components/Lanyard/Lanyard';
import { lanyard } from "../../constants/code/Components/lanyardCode";

const LanyardDemo = () => {
  const [cameraDistance, setCameraDistance] = useState(24);
  const [stopGravity, setStopGravity] = useState(false);

  const [key, forceRerender] = useForceRerender();

  const propData = [
    {
      name: "position",
      type: "array",
      default: "[0, 0, 30]",
      description: "Initial camera position for the canvas."
    },
    {
      name: "gravity",
      type: "array",
      default: "[0, -40, 0]",
      description: "Gravity vector for the physics simulation."
    },
    {
      name: "fov",
      type: "number",
      default: "20",
      description: "Camera field of view."
    },
    {
      name: "transparent",
      type: "boolean",
      default: "true",
      description: "Enables a transparent background for the canvas."
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} p={0} overflow="hidden" bg="linear-gradient(180deg, #271E37 0%, #060010 100%)">
          <RefreshButton onClick={forceRerender} />
          <Text position="absolute" fontSize="clamp(2rem, 6vw, 6rem)" fontWeight={900} color="#271E37">Drag It!</Text>
          <Lanyard key={key} position={[0, 0, cameraDistance]} gravity={stopGravity ? [0, 0, 0] : [0, -40, 0]} />
        </Box>

        <Customize>
          <PreviewSlider
            title="Camera Distance"
            min={20}
            max={50}
            step={1}
            value={cameraDistance}
            onChange={(val) => {
              setCameraDistance(val);
              forceRerender();
            }}
          />

          <PreviewSwitch
            title="Disable Gravity"
            isChecked={stopGravity}
            onChange={(checked) => setStopGravity(checked)}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['three', 'meshline', '@react-three/fiber', '@react-three/drei', '@react-three/rapier']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={lanyard} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...lanyard} />
      </CliTab>
    </TabbedLayout>
  );
};

export default LanyardDemo;