import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Text } from "@chakra-ui/react";

import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import Customize from "../../components/common/Preview/Customize";

import ShapeBlur from "../../content/Animations/ShapeBlur/ShapeBlur";
import { shapeBlur } from '../../constants/code/Animations/shapeBlurCode';

const ShapeBlurDemo = () => {
  const [shapeSize, setShapeSize] = useState(1.0);
  const [roundness, setRoundness] = useState(0.5);
  const [borderSize, setBorderSize] = useState(0.05);
  const [circleSize, setCircleSize] = useState(0.25);
  const [circleEdge, setCircleEdge] = useState(1);

  const propData = [
    {
      name: "variation",
      type: "number",
      default: "0",
      description: "Selects the shape variation (0-3) used by the shader."
    },
    {
      name: "pixelRatioProp",
      type: "number",
      default: "2",
      description: "Overrides the pixel ratio, typically set to the device pixel ratio."
    },
    {
      name: "shapeSize",
      type: "number",
      default: "1.2",
      description: "Controls the size of the shape."
    },
    {
      name: "roundness",
      type: "number",
      default: "0.4",
      description: "Determines the roundness of the shape's corners."
    },
    {
      name: "borderSize",
      type: "number",
      default: "0.05",
      description: "Sets the thickness of the border."
    },
    {
      name: "circleSize",
      type: "number",
      default: "0.3",
      description: "Determines the size of the hover circle effect."
    },
    {
      name: "circleEdge",
      type: "number",
      default: "0.5",
      description: "Controls the edge softness of the hover circle."
    }
  ];


  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          className="demo-container"
          background='#060010'
          height={500}
          overflow="hidden"
          p={0}
        >
          <ShapeBlur
            className="shapeblur-demo"
            variation={0}
            pixelRatioProp={window.devicePixelRatio || 1}
            shapeSize={shapeSize}
            roundness={roundness}
            borderSize={borderSize}
            circleSize={circleSize}
            circleEdge={circleEdge}
          />
          <Text position="absolute" left='50%' top='50%' transform='translate(-50%, -50%)' fontSize='6rem' fontWeight={900} zIndex={0} color='#271E37'>
            Hover Me.
          </Text>
        </Box>

        <Customize>
          <PreviewSlider
            title="Shape Size"
            min={0.1}
            max={2}
            step={0.1}
            value={shapeSize}
            onChange={setShapeSize}
          />

          <PreviewSlider
            title="Roundness"
            min={0}
            max={1}
            step={0.05}
            value={roundness}
            onChange={setRoundness}
          />

          <PreviewSlider
            title="Border Size"
            min={0.01}
            max={0.2}
            step={0.005}
            value={borderSize}
            onChange={setBorderSize}
          />

          <PreviewSlider
            title="Circle Size"
            min={0.1}
            max={0.5}
            step={0.01}
            value={circleSize}
            onChange={setCircleSize}
          />

          <PreviewSlider
            title="Circle Edge"
            min={0.1}
            max={2}
            step={0.1}
            value={circleEdge}
            onChange={setCircleEdge}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['three']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={shapeBlur} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...shapeBlur} />
      </CliTab>
    </TabbedLayout>
  );
};

export default ShapeBlurDemo;