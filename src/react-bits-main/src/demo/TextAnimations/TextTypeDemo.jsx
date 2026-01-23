import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box } from "@chakra-ui/react";
import { useState } from "react";

import Customize from "../../components/common/Preview/Customize";
import PreviewSwitch from "../../components/common/Preview/PreviewSwitch";
import PreviewSelect from "../../components/common/Preview/PreviewSelect";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import Dependencies from '../../components/code/Dependencies';
import useForceRerender from "../../hooks/useForceRerender";

import TextType from "../../content/TextAnimations/TextType/TextType";
import { textType } from "../../constants/code/TextAnimations/textTypeCode";

const TextTypeDemo = () => {
  const [key, forceRerender] = useForceRerender();

  const [texts] = useState(["Welcome to React Bits! It's great to have you here!", "Build some amazing experiences!"]);
  const [typingSpeed, setTypingSpeed] = useState(75);
  const [pauseDuration, setPauseDuration] = useState(1500);
  const [deletingSpeed, setDeletingSpeed] = useState(50);
  const [showCursor, setShowCursor] = useState(true);
  const [cursorCharacter, setCursorCharacter] = useState("_");
  const [variableSpeedEnabled, setVariableSpeedEnabled] = useState(false);
  const [variableSpeedMin, setVariableSpeedMin] = useState(60);
  const [variableSpeedMax, setVariableSpeedMax] = useState(120);
  const [cursorBlinkDuration, setCursorBlinkDuration] = useState(0.5);

  const cursorOptions = [
    { value: "_", label: "Underscore (_)" },
    { value: "|", label: "Pipe (|)" },
    { value: "▎", label: "Block (▎)" },
    { value: "●", label: "Dot (●)" },
    { value: "█", label: "Full Block (█)" }
  ]

  const propData = [
    {
      name: "text",
      type: "string | string[]",
      default: "-",
      description: "Text or array of texts to type out"
    },
    {
      name: "as",
      type: "ElementType",
      default: "div",
      description: "HTML tag to render the component as"
    },
    {
      name: "typingSpeed",
      type: "number",
      default: "50",
      description: "Speed of typing in milliseconds"
    },
    {
      name: "initialDelay",
      type: "number",
      default: "0",
      description: "Initial delay before typing starts"
    },
    {
      name: "pauseDuration",
      type: "number",
      default: "2000",
      description: "Time to wait between typing and deleting"
    },
    {
      name: "deletingSpeed",
      type: "number",
      default: "30",
      description: "Speed of deleting characters"
    },
    {
      name: "loop",
      type: "boolean",
      default: "true",
      description: "Whether to loop through texts array"
    },
    {
      name: "className",
      type: "string",
      default: "''",
      description: "Optional class name for styling"
    },
    {
      name: "showCursor",
      type: "boolean",
      default: "true",
      description: "Whether to show the cursor"
    },
    {
      name: "hideCursorWhileTyping",
      type: "boolean",
      default: "false",
      description: "Hide cursor while typing"
    },
    {
      name: "cursorCharacter",
      type: "string | React.ReactNode",
      default: "|",
      description: "Character or React node to use as cursor"
    },
    {
      name: "cursorBlinkDuration",
      type: "number",
      default: "0.5",
      description: "Animation duration for cursor blinking"
    },
    {
      name: "cursorClassName",
      type: "string",
      default: "''",
      description: "Optional class name for cursor styling"
    },
    {
      name: "textColors",
      type: "string[]",
      default: "[]",
      description: "Array of colors for each sentence"
    },
    {
      name: "variableSpeed",
      type: "{min: number, max: number}",
      default: "undefined",
      description: "Random typing speed within range for human-like feel"
    },
    {
      name: "onSentenceComplete",
      type: "(sentence: string, index: number) => void",
      default: "undefined",
      description: "Callback fired after each sentence is finished"
    },
    {
      name: "startOnVisible",
      type: "boolean",
      default: "false",
      description: "Start typing when component is visible in viewport"
    },
    {
      name: "reverseMode",
      type: "boolean",
      default: "false",
      description: "Type backwards (right to left)"
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={350} p={16} overflow="hidden" alignItems="flex-start" justifyContent="flex-start">
          <TextType
            key={key}
            text={texts}
            typingSpeed={typingSpeed}
            pauseDuration={pauseDuration}
            deletingSpeed={deletingSpeed}
            showCursor={showCursor}
            cursorCharacter={cursorCharacter}
            cursorBlinkDuration={cursorBlinkDuration}
            variableSpeed={variableSpeedEnabled ? { min: variableSpeedMin, max: variableSpeedMax } : undefined}
            className="custom-text-type"
          />
        </Box>

        <Customize>
          <PreviewSelect
            title="Cursor Character"
            options={cursorOptions}
            value={cursorCharacter}
            width={150}
            onChange={(value) => {
              setCursorCharacter(value);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Typing Speed"
            min={10}
            max={200}
            step={5}
            value={typingSpeed}
            valueUnit="ms"
            width={200}
            onChange={(value) => {
              setTypingSpeed(value);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Pause Duration"
            min={500}
            max={5000}
            step={100}
            value={pauseDuration}
            valueUnit="ms"
            width={200}
            onChange={(value) => {
              setPauseDuration(value);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Deleting Speed"
            min={10}
            max={100}
            step={5}
            value={deletingSpeed}
            valueUnit="ms"
            width={200}
            onChange={(value) => {
              setDeletingSpeed(value);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Cursor Blink Duration"
            min={0.1}
            max={2}
            step={0.1}
            value={cursorBlinkDuration}
            valueUnit="s"
            width={200}
            onChange={(value) => {
              setCursorBlinkDuration(value);
              forceRerender();
            }}
          />

          <PreviewSwitch
            title="Show Cursor"
            isChecked={showCursor}
            onChange={(checked) => {
              setShowCursor(checked);
              forceRerender();
            }}
          />

          <PreviewSwitch
            title="Variable Speed"
            isChecked={variableSpeedEnabled}
            onChange={(checked) => {
              setVariableSpeedEnabled(checked);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Variable Speed Min"
            isDisabled={!variableSpeedEnabled}
            min={10}
            max={150}
            step={5}
            value={variableSpeedMin}
            valueUnit="ms"
            width={200}
            onChange={(value) => {
              setVariableSpeedMin(value);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Variable Speed Max"
            isDisabled={!variableSpeedEnabled}
            min={50}
            max={300}
            step={5}
            value={variableSpeedMax}
            valueUnit="ms"
            width={200}
            onChange={(value) => {
              setVariableSpeedMax(value);
              forceRerender();
            }}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['gsap']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={textType} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...textType} />
      </CliTab>
    </TabbedLayout>
  );
};

export default TextTypeDemo;