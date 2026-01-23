import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { LuComponent, LuImage, LuPlay, LuText } from "react-icons/lu";
import { Box, Text } from "@chakra-ui/react";

import Customize from "../../components/common/Preview/Customize";
import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import Dependencies from '../../components/code/Dependencies';
import RefreshButton from "../../components/common/Preview/RefreshButton";
import PreviewSelect from "../../components/common/Preview/PreviewSelect";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import useForceRerender from "../../hooks/useForceRerender";

import { scrollStack } from "../../constants/code/Components/scrollStackCode";
import ScrollStack, { ScrollStackItem } from "../../content/Components/ScrollStack/ScrollStack";

const ScrollStackDemo = () => {
  const [key, forceRerender] = useForceRerender();
  const [isCompleted, setIsCompleted] = useState(false);
  const [itemDistance, setItemDistance] = useState(200);
  const [itemStackDistance, setItemStackDistance] = useState(30);
  const [baseScale, setBaseScale] = useState(0.85);
  const [rotationAmount, setRotationAmount] = useState(0);
  const [blurAmount, setBlurAmount] = useState(0);
  const [stackPosition, setStackPosition] = useState("20%");

  const handleRefresh = () => {
    forceRerender();
    setIsCompleted(false);
  };

  const createSetter = (setter) => (value) => {
    setter(value);
    forceRerender();
  };

  const handleItemDistanceChange = createSetter(setItemDistance);
  const handleItemStackDistanceChange = createSetter(setItemStackDistance);
  const handleBaseScaleChange = createSetter(setBaseScale);
  const handleRotationAmountChange = createSetter(setRotationAmount);
  const handleBlurAmountChange = createSetter(setBlurAmount);
  const handleStackPositionChange = createSetter(setStackPosition);

  const handleStackComplete = () => {
    setIsCompleted(true);
  };

  const stackPositionOptions = [
    { value: "10%", label: "10%" },
    { value: "15%", label: "15%" },
    { value: "20%", label: "20%" },
    { value: "25%", label: "25%" },
    { value: "30%", label: "30%" },
    { value: "35%", label: "35%" },
  ];

  const propData = [
    {
      name: "children",
      type: "ReactNode",
      default: "required",
      description: "The content to be displayed in the scroll stack. Should contain ScrollStackItem components."
    },
    {
      name: "className",
      type: "string",
      default: '""',
      description: "Additional CSS classes to apply to the scroll stack container."
    },
    {
      name: "itemDistance",
      type: "number",
      default: "100",
      description: "Distance between stacked items in pixels."
    },
    {
      name: "itemScale",
      type: "number",
      default: "0.03",
      description: "Scale increment for each stacked item."
    },
    {
      name: "itemStackDistance",
      type: "number",
      default: "30",
      description: "Distance between items when they start stacking."
    },
    {
      name: "stackPosition",
      type: "string",
      default: '"20%"',
      description: "Position where the stacking effect begins as a percentage of viewport height."
    },
    {
      name: "scaleEndPosition",
      type: "string",
      default: '"10%"',
      description: "Position where the scaling effect ends as a percentage of viewport height."
    },
    {
      name: "baseScale",
      type: "number",
      default: "0.85",
      description: "Base scale value for the first item in the stack."
    },
    {
      name: "scaleDuration",
      type: "number",
      default: "0.5",
      description: "Duration of the scaling animation in seconds."
    },
    {
      name: "rotationAmount",
      type: "number",
      default: "0",
      description: "Rotation amount for each item in degrees."
    },
    {
      name: "blurAmount",
      type: "number",
      default: "0",
      description: "Blur amount for items that are further back in the stack."
    },
    {
      name: "onStackComplete",
      type: "function",
      default: "undefined",
      description: "Callback function called when the stack animation is complete."
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
          <RefreshButton onClick={handleRefresh} />
          <Text
            textAlign="center"
            color='#271E37'
            fontSize="clamp(2rem, 4vw, 3rem)"
            fontWeight={900}
            position="absolute"
            top="25%"
            transform='translate(-50%, -50%)'
            left="50%"
            pointerEvents="none"
            transition="all 0.3s ease"
          >
            {isCompleted ? "Stack Completed!" : "Scroll Down"}
          </Text>

          <ScrollStack 
            key={key}
            itemDistance={itemDistance}
            className="scroll-stack-demo-container"
            itemStackDistance={itemStackDistance}
            stackPosition={stackPosition}
            baseScale={baseScale}
            rotationAmount={rotationAmount}
            blurAmount={blurAmount}
            onStackComplete={handleStackComplete}
          >
            <ScrollStackItem itemClassName="scroll-stack-card-demo ssc-demo-1">
              <h3>Text Animations</h3>

              <div className="stack-img-container">
                <LuText />
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="scroll-stack-card-demo ssc-demo-2">
              <h3>Animations</h3>

              <div className="stack-img-container">
                <LuPlay />
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="scroll-stack-card-demo ssc-demo-3">
              <h3>Components</h3>

              <div className="stack-img-container">
                <LuComponent />
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="scroll-stack-card-demo ssc-demo-4">
              <h3>Backgrounds</h3>

              <div className="stack-img-container">
                <LuImage />
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="scroll-stack-card-demo ssc-demo-5">
              <h3>All on React Bits!</h3>
            </ScrollStackItem>
          </ScrollStack>
        </Box>

        <Customize>
          <PreviewSlider
            title="Item Distance"
            min={0}
            max={1000}
            step={10}
            value={itemDistance}
            valueUnit="px"
            onChange={handleItemDistanceChange}
          />

          <PreviewSlider
            title="Stack Distance"
            min={0}
            max={40}
            step={5}
            value={itemStackDistance}
            valueUnit="px"
            onChange={handleItemStackDistanceChange}
          />

          <PreviewSelect
            title="Stack Position"
            options={stackPositionOptions}
            value={stackPosition}
            width={100}
            onChange={handleStackPositionChange}
          />

          <PreviewSlider
            title="Base Scale"
            min={0.5}
            max={1.0}
            step={0.05}
            value={baseScale}
            onChange={handleBaseScaleChange}
          />

          <PreviewSlider
            title="Rotation Amount"
            min={0}
            max={1}
            step={0.1}
            value={rotationAmount}
            valueUnit="°"
            onChange={handleRotationAmountChange}
          />

          <PreviewSlider
            title="Blur Amount"
            min={0}
            max={10}
            step={0.5}
            value={blurAmount}
            valueUnit="px"
            onChange={handleBlurAmountChange}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['lenis']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={scrollStack} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...scrollStack} />
      </CliTab>
    </TabbedLayout>
  );
};

export default ScrollStackDemo;