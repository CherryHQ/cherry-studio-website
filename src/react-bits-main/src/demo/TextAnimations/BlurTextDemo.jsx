import { useState } from "react";
import { toast } from "sonner";
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

import RefreshButton from "../../components/common/Preview/RefreshButton";
import CodeExample from "../../components/code/CodeExample";
import Dependencies from "../../components/code/Dependencies";
import useForceRerender from "../../hooks/useForceRerender";
import PropTable from "../../components/common/Preview/PropTable";
import CliInstallation from "../../components/code/CliInstallation";
import Customize from "../../components/common/Preview/Customize";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";

import BlurText from "../../content/TextAnimations/BlurText/BlurText";
import { blurText } from "../../constants/code/TextAnimations/blurTextCode";

const BlurTextDemo = () => {
  const [animateBy, setAnimateBy] = useState("words");
  const [direction, setDirection] = useState("top");
  const [delay, setDelay] = useState(200);

  const [key, forceRerender] = useForceRerender();

  const propData = [
    {
      name: "text",
      type: "string",
      default: '""',
      description: "The text content to animate.",
    },
    {
      name: "animateBy",
      type: "string",
      default: '"words"',
      description: "Determines whether to animate by 'words' or 'letters'.",
    },
    {
      name: "direction",
      type: "string",
      default: '"top"',
      description:
        "Direction from which the words/letters appear ('top' or 'bottom').",
    },
    {
      name: "delay",
      type: "number",
      default: "200",
      description: "Delay between animations for each word/letter (in ms).",
    },
    {
      name: "stepDuration",
      type: "number",
      default: "0.35",
      description: "The time taken for each letter/word to animate (in seconds).",
    },
    {
      name: "threshold",
      type: "number",
      default: "0.1",
      description: "Intersection threshold for triggering the animation.",
    },
    {
      name: "rootMargin",
      type: "string",
      default: '"0px"',
      description: "Root margin for the intersection observer.",
    },
    {
      name: "onAnimationComplete",
      type: "function",
      default: "undefined",
      description: "Callback function triggered when all animations complete.",
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          className="demo-container"
          minH={400}
          overflow="hidden"
        >
          <RefreshButton onClick={forceRerender} />
          <BlurText
            key={key}
            text="Isn't this so cool?!"
            animateBy={animateBy}
            direction={direction}
            delay={delay}
            onAnimationComplete={() => toast("✅ Animation Finished!")}
            className="blur-text-demo"
          />
        </Box>
        <Customize>
          <Flex gap={4} wrap="wrap">
            <Button
              fontSize="xs"
              bg="#170D27"
              borderRadius="10px"
              border="1px solid #271E37"
              _hover={{ bg: "#271E37" }}
              color="#fff"
              h={8}
              onClick={() => {
                setAnimateBy(animateBy === "words" ? "letters" : "words");
                forceRerender();
              }}
            >
              Animate By: <Text color={"#a1a1aa"}>&nbsp;{animateBy}</Text>
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
                setDirection(direction === "top" ? "bottom" : "top");
                forceRerender();
              }}
            >
              Direction: <Text color={"#a1a1aa"}>&nbsp;{direction}</Text>
            </Button>
          </Flex>

          <PreviewSlider
            title="Delay"
            min={50}
            max={500}
            step={10}
            value={delay}
            valueUnit="ms"
            onChange={(val) => {
              setDelay(val);
              forceRerender();
            }}
            width={200}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={["motion"]} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={blurText} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...blurText} />
      </CliTab>
    </TabbedLayout>
  );
};

export default BlurTextDemo;
