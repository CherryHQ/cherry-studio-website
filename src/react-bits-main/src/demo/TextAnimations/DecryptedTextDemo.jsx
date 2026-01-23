import { useState } from "react";
import { Box, Flex, Separator } from "@chakra-ui/react";
import { toast } from "sonner";
import { TabbedLayout, PreviewTab, CodeTab, CliTab } from "../../components/common/TabbedLayout";

import CliInstallation from "../../components/code/CliInstallation";
import CodeExample from "../../components/code/CodeExample";
import Dependencies from "../../components/code/Dependencies";
import PropTable from "../../components/common/Preview/PropTable";
import RefreshButton from "../../components/common/Preview/RefreshButton";
import useForceRerender from "../../hooks/useForceRerender";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import PreviewSwitch from "../../components/common/Preview/PreviewSwitch";
import PreviewSelect from "../../components/common/Preview/PreviewSelect";
import Customize from "../../components/common/Preview/Customize";

import DecryptedText from "../../content/TextAnimations/DecryptedText/DecryptedText";
import { decryptedText } from "../../constants/code/TextAnimations/decryptedTextCode";

const DecryptedTextDemo = () => {
  const [speed, setSpeed] = useState(60);
  const [maxIterations, setMaxIterations] = useState(10);
  const [sequential, setSequential] = useState(true);
  const [useOriginalCharsOnly, setUseOriginalCharsOnly] = useState(false);
  const [revealDirection, setRevealDirection] = useState("start");
  const [animateOn, setAnimateOn] = useState("view");

  const [key, forceRerender] = useForceRerender();

  const propData = [
    {
      name: "text",
      type: "string",
      default: '""',
      description: "The text content to decrypt.",
    },
    {
      name: "speed",
      type: "number",
      default: "50",
      description: "Time in ms between each iteration.",
    },
    {
      name: "maxIterations",
      type: "number",
      default: "10",
      description: "Max # of random iterations (non-sequential mode).",
    },
    {
      name: "sequential",
      type: "boolean",
      default: "false",
      description: "Whether to reveal one character at a time in sequence.",
    },
    {
      name: "revealDirection",
      type: `"start" | "end" | "center"`,
      default: `"start"`,
      description:
        "From which position characters begin to reveal in sequential mode.",
    },
    {
      name: "useOriginalCharsOnly",
      type: "boolean",
      default: "false",
      description:
        "Restrict scrambling to only the characters already in the text.",
    },
    {
      name: "className",
      type: "string",
      default: '""',
      description: "CSS class for revealed characters.",
    },
    {
      name: "parentClassName",
      type: "string",
      default: '""',
      description: "CSS class for the main characters container.",
    },
    {
      name: "encryptedClassName",
      type: "string",
      default: '""',
      description: "CSS class for encrypted characters.",
    },
    {
      name: "animateOn",
      type: `"view" | "hover"`,
      default: `"hover"`,
      description: "Trigger scrambling on hover or scroll-into-view.",
    },
  ];

  const animateOptions = [{ label: "View", value: "view" }, { label: "Hover", value: "hover" }];
  const directionOptions = [{ label: "Start", value: "start" }, { label: "End", value: "end" }, { label: "Center", value: "center" }];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box
          position="relative"
          py={{ md: 6, sm: 4 }}
          className="demo-container"
          overflow="hidden"
        >
          <RefreshButton onClick={forceRerender} />
          <Flex
            pl={{ md: 6, sm: 3 }}
            m={{ md: 8, sm: 2 }}
            w="100%"
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            key={key}
          >
            <DecryptedText
              speed={speed}
              text="Ahoy, matey!"
              maxIterations={maxIterations}
              sequential={sequential}
              revealDirection={revealDirection}
              parentClassName="decrypted-text"
              useOriginalCharsOnly={useOriginalCharsOnly}
              animateOn={animateOn}
            />
            <DecryptedText
              speed={speed}
              text="Set yer eyes on this"
              maxIterations={maxIterations}
              sequential={sequential}
              revealDirection={revealDirection}
              parentClassName="decrypted-text"
              useOriginalCharsOnly={useOriginalCharsOnly}
              animateOn={animateOn}
            />
            <DecryptedText
              speed={speed}
              text="And try tinkerin' round'"
              maxIterations={maxIterations}
              sequential={sequential}
              revealDirection={revealDirection}
              parentClassName="decrypted-text"
              useOriginalCharsOnly={useOriginalCharsOnly}
              animateOn={animateOn}
            />
            <DecryptedText
              speed={speed}
              text="with these here props, arr!"
              maxIterations={maxIterations}
              sequential={sequential}
              revealDirection={revealDirection}
              parentClassName="decrypted-text"
              useOriginalCharsOnly={useOriginalCharsOnly}
              animateOn={animateOn}
              onAnimationComplete={() => toast("✅ Animation Finished!")}
            />
          </Flex>
        </Box>

        <Customize>
          <Flex wrap="wrap" gap={4} mb={4}>
            <PreviewSwitch
              title="Sequential"
              isChecked={sequential}
              onChange={(checked) => {
                setSequential(checked);
                forceRerender();
              }}
            />

            <PreviewSwitch
              title="Original Chars"
              isChecked={useOriginalCharsOnly}
              onChange={(checked) => {
                setUseOriginalCharsOnly(checked);
                forceRerender();
              }}
            />
          </Flex>

          <Separator borderColor="#271E37" my={4} />

          <Flex wrap="wrap" direction="column" gap={4}>
            <PreviewSelect
              title="Animate On"
              options={animateOptions}
              value={animateOn}
              name="animateOn"
              width={100}
              onChange={(val) => {
                setAnimateOn(val);
                forceRerender();
              }}
            />

            <PreviewSelect
              title="Direction"
              options={directionOptions}
              value={revealDirection}
              name="direction"
              width={100}
              onChange={(val) => {
                setRevealDirection(val);
                forceRerender();
              }}
            />
          </Flex>

          <Separator borderColor="#271E37" my={4} />

          <Flex wrap="wrap" direction="column" gap={4} mb={4}>
            <PreviewSlider
              title="Speed"
              min={10}
              max={200}
              step={10}
              value={speed}
              valueUnit="ms"
              onChange={(val) => {
                setSpeed(val);
                forceRerender();
              }}
            />

            <PreviewSlider
              title="Iterations"
              min={1}
              max={50}
              step={1}
              value={maxIterations}
              onChange={(val) => {
                setMaxIterations(val);
                forceRerender();
              }}
            />
          </Flex>
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={["motion"]} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={decryptedText} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...decryptedText} />
      </CliTab>
    </TabbedLayout>
  );
};

export default DecryptedTextDemo;
