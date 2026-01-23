import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

import RefreshButton from "../../components/common/Preview/RefreshButton";
import CodeExample from "../../components/code/CodeExample";
import Dependencies from "../../components/code/Dependencies";
import useForceRerender from "../../hooks/useForceRerender";
import PropTable from '../../components/common/Preview/PropTable';
import CliInstallation from "../../components/code/CliInstallation";
import Customize from "../../components/common/Preview/Customize";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import PreviewSwitch from "../../components/common/Preview/PreviewSwitch";

import AnimatedContent from '../../content/Animations/AnimatedContent/AnimatedContent';
import { animatedContent } from '../../constants/code/Animations/animatedContentCode';

const AnimatedContentDemo = () => {
  const [direction, setDirection] = useState("vertical");
  const [distance, setDistance] = useState(100);
  const [delay, setDelay] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [duration, setDuration] = useState(0.8);
  const [ease, setEase] = useState("power3.out");
  const [initialOpacity, setInitialOpacity] = useState(0);
  const [animateOpacity, setAnimateOpacity] = useState(true);
  const [scale, setScale] = useState(1);
  const [threshold, setThreshold] = useState(0.1);

  const [key, forceRerender] = useForceRerender();

  const propData = [
    { name: 'children', type: 'ReactNode', default: '', description: 'The content to be animated.' },
    { name: 'distance', type: 'number', default: '100', description: 'Distance (in pixels) the component moves during animation.' },
    { name: 'direction', type: 'string', default: '"vertical"', description: 'Animation direction. Can be "vertical" or "horizontal".' },
    { name: 'reverse', type: 'boolean', default: 'false', description: 'Whether the animation moves in the reverse direction.' },
    { name: 'duration', type: 'number', default: '0.8', description: 'Duration of the animation in seconds.' },
    { name: 'ease', type: 'string', default: '"power3.out"', description: 'GSAP easing function for the animation.' },
    { name: 'initialOpacity', type: 'number', default: '0', description: 'Initial opacity before animation begins.' },
    { name: 'animateOpacity', type: 'boolean', default: 'true', description: 'Whether to animate opacity during transition.' },
    { name: 'scale', type: 'number', default: '1', description: 'Initial scale of the component.' },
    { name: 'threshold', type: 'number', default: '0.1', description: 'Intersection threshold to trigger animation (0-1).' },
    { name: 'delay', type: 'number', default: '0', description: 'Delay before animation starts (in seconds).' },
    { name: 'onComplete', type: 'function', default: 'undefined', description: 'Callback function called when animation completes.' },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" minH={400} overflow="hidden">
          <RefreshButton onClick={forceRerender} />
          <AnimatedContent
            key={key}
            direction={direction}
            delay={delay}
            distance={distance}
            reverse={reverse}
            duration={duration}
            ease={ease}
            initialOpacity={initialOpacity}
            animateOpacity={animateOpacity}
            scale={scale}
            threshold={threshold}
          >
            <Flex
              fontSize="xl"
              fontWeight="bolder"
              justifyContent="center"
              alignItems="center"
              color="#fff"
              h={100}
              borderRadius="25px"
              border="1px solid #392e4e"
              w={200}
              bg={"#060010"}
            >
              Animate Me
            </Flex>
          </AnimatedContent>
        </Box>

        <Customize>
          <Flex gap={2} wrap="wrap">
            <Button
              fontSize="xs"
              bg="#170D27"
              borderRadius="10px"
              border="1px solid #271E37"
              _hover={{ bg: "#271E37" }}
              color="#fff"
              h={8}
              onClick={() => {
                setDirection(direction === "vertical" ? "horizontal" : "vertical");
                forceRerender();
              }}
            >
              Direction: <Text color={"#a1a1aa"}>&nbsp;{String(direction)}</Text>
            </Button>
            <Button
              fontSize="xs"
              bg="#170D27"
              borderRadius="10px"
              border="1px solid #271E37"
              _hover={{ bg: "#271E37" }}
              color="#fff"
              h={8}
              onClick={() => {
                setEase(ease === "power3.out" ? "bounce.out" : ease === "bounce.out" ? "elastic.out(1, 0.3)" : "power3.out");
                forceRerender();
              }}
            >
              Ease: <Text color={"#a1a1aa"}>&nbsp;{ease}</Text>
            </Button>
          </Flex>

          <PreviewSwitch
            title="Reverse Direction"
            isChecked={reverse}
            onChange={(checked) => {
              setReverse(checked);
              forceRerender();
            }}
          />

          <PreviewSwitch
            title="Animate Opacity"
            isChecked={animateOpacity}
            onChange={(checked) => {
              setAnimateOpacity(checked);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Distance"
            min={50}
            max={300}
            step={10}
            value={distance}
            onChange={(val) => {
              setDistance(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Duration"
            min={0.1}
            max={3}
            step={0.1}
            value={duration}
            onChange={(val) => {
              setDuration(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Delay"
            min={0}
            max={2}
            step={0.1}
            value={delay}
            onChange={(val) => {
              setDelay(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Initial Opacity"
            min={0}
            max={1}
            step={0.1}
            value={initialOpacity}
            onChange={(val) => {
              setInitialOpacity(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Initial Scale"
            min={0.1}
            max={2}
            step={0.1}
            value={scale}
            onChange={(val) => {
              setScale(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Threshold"
            min={0.1}
            max={1}
            step={0.1}
            value={threshold}
            onChange={(val) => {
              setThreshold(val);
              forceRerender();
            }}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={["gsap"]} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={animatedContent} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...animatedContent} />
      </CliTab>
    </TabbedLayout>
  );
};

export default AnimatedContentDemo;
