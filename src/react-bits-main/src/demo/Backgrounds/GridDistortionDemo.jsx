import { useRef, useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box } from "@chakra-ui/react";

import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import Dependencies from '../../components/code/Dependencies';
import useForceRerender from "../../hooks/useForceRerender";
import Customize from "../../components/common/Preview/Customize";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import BackgroundContent from "../../components/common/Preview/BackgroundContent";

import GridDistortion from "../../content/Backgrounds/GridDistortion/GridDistortion";
import { gridDistortion } from "../../constants/code/Backgrounds/gridDistortionCode";

const GridDistortionDemo = () => {
  const [grid, setGrid] = useState(10);
  const [mouse, setMouse] = useState(0.25);

  const containerRef = useRef(null);

  const [key, forceRerender] = useForceRerender();

  const propData = [
    {
      name: "imgageSrc",
      type: "string",
      default: "",
      description: "The image you want to render inside the container."
    },
    {
      name: "grid",
      type: "number",
      default: "15",
      description: "The number of cells present in the distortion grid"
    },
    {
      name: "mouse",
      type: "number",
      default: "0.1",
      description: "The size of the distortion effect that follows the cursor."
    },
    {
      name: "relaxation",
      type: "number",
      default: "0.9",
      description: "The speed at which grid cells return to their initial state."
    },
    {
      name: "strength",
      type: "number",
      default: "0.15",
      description: "The overall strength of the distortion effect."
    },
    {
      name: "className",
      type: "string",
      default: "",
      description: "Any custom class(es) you want to apply to the container."
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} p={0} overflow="hidden" ref={containerRef}>
          <GridDistortion
            key={key}
            imageSrc="https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            grid={grid}
            mouse={mouse}
            strength={0.15}
            relaxation={0.9}
            className="grid-distortion"
          />

          {/* <Text pointerEvents="none" position="absolute" textAlign='center' fontSize="6rem" fontWeight={900} userSelect="none" mixBlendMode="overlay">Distortion.</Text> */}
          {/* For Demo Purposes Only */}
          <BackgroundContent
            pillText="New Background"
            headline="Don't just sit there, move your cursor!"
          />
        </Box>

        <Customize>
          <PreviewSlider
            title="Grid Size"
            min={6}
            max={200}
            step={1}
            value={grid}
            onChange={(val) => {
              setGrid(val);
              forceRerender();
            }}
            width={200}
          />

          <PreviewSlider
            title="Mouse Size"
            min={0.1}
            max={0.5}
            step={0.01}
            value={mouse}
            onChange={(val) => {
              setMouse(val);
              forceRerender();
            }}
            width={200}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['three']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={gridDistortion} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...gridDistortion} />
      </CliTab>
    </TabbedLayout >
  );
};

export default GridDistortionDemo;