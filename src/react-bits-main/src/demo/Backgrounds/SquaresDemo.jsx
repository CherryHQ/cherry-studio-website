import { useState } from "react";
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Button, ButtonGroup, Flex, Input, Text } from "@chakra-ui/react";

import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import Customize from "../../components/common/Preview/Customize";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import PropTable from "../../components/common/Preview/PropTable";
import BackgroundContent from "../../components/common/Preview/BackgroundContent";

import Squares from "../../content/Backgrounds/Squares/Squares";
import { squares } from '../../constants/code/Backgrounds/squaresCode';

const SquaresDemo = () => {
  const [direction, setDirection] = useState('diagonal');
  const [borderColor, setBorderColor] = useState('#271E37');
  const [hoverColor, setHoverColor] = useState('#222222');
  const [size, setSize] = useState(40);
  const [speed, setSpeed] = useState(0.5);

  const propData = [
    { name: "direction", type: "string", default: "'right'", description: "Direction of square animation. Options: 'diagonal', 'up', 'right', 'down', 'left'." },
    { name: "speed", type: "number", default: "1", description: "Animation speed multiplier." },
    { name: "borderColor", type: "string", default: "'#999'", description: "Color of the square borders." },
    { name: "squareSize", type: "number", default: "40", description: "Size of individual squares in pixels." },
    { name: "hoverFillColor", type: "string", default: "'#222'", description: "Fill color when hovering over squares." },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" h={600} className="demo-container" overflow="hidden" p={0}>
          <Squares
            squareSize={size} s
            speed={speed}
            direction={direction}
            borderColor={borderColor}
            hoverFillColor={hoverColor}
          />

          {/* For Demo Purposes Only */}
          <BackgroundContent
            pillText="New Background"
            headline="Customizable squares moving around smoothly"
          />
        </Box>

        <Customize>
          <ButtonGroup isAttached size="sm">
            <Text fontSize="sm" mr={2}>
              Direction
            </Text>
            <Button
              bg={direction === 'diagonal' ? '#5227FF' : '#170D27'}
              _hover={{ backgroundColor: `${direction === "diagonal" ? '#5227FF' : '#170D27'}` }}
              color='white'
              fontSize="xs"
              h={8}
              onClick={() => {
                setDirection('diagonal');
              }}
            >
              Diagonal
            </Button>
            <Button
              bg={direction === 'up' ? '#5227FF' : '#170D27'}
              _hover={{ backgroundColor: `${direction === "up" ? '#5227FF' : '#170D27'}` }}
              color='white'
              fontSize="xs"
              h={8}
              onClick={() => {
                setDirection('up');
              }}
            >
              Up
            </Button>
            <Button
              bg={direction === 'right' ? '#5227FF' : '#170D27'}
              _hover={{ backgroundColor: `${direction === "right" ? '#5227FF' : '#170D27'}` }}
              color='white'
              fontSize="xs"
              h={8}
              onClick={() => {
                setDirection('right');
              }}
            >
              Right
            </Button>
            <Button
              bg={direction === 'down' ? '#5227FF' : '#170D27'}
              _hover={{ backgroundColor: `${direction === "down" ? '#5227FF' : '#170D27'}` }}
              color='white'
              fontSize="xs"
              h={8}
              onClick={() => {
                setDirection('down');
              }}
            >
              Down
            </Button>
            <Button
              bg={direction === 'left' ? '#5227FF' : '#170D27'}
              _hover={{ backgroundColor: `${direction === "left" ? '#5227FF' : '#170D27'}` }}
              color='white'
              fontSize="xs"
              h={8}
              onClick={() => {
                setDirection('left');
              }}
            >
              Left
            </Button>
          </ButtonGroup>

          <PreviewSlider
            min={10}
            max={100}
            step={1}
            value={size}
            title="Square Size"
            onChange={(val) => {
              setSize(val);
            }}
          />

          <PreviewSlider
            min={0.1}
            max={2}
            step={0.01}
            value={speed}
            title="Animation Speed"
            onChange={(val) => {
              setSpeed(val);
            }}
          />

          <Flex alignItems="center" mb={6}>
            <Text mr={4}>Border Color</Text>
            <Input
              type="color"
              value={borderColor}
              onChange={(e) => { setBorderColor(e.target.value); }}
              width="50px"
            />
          </Flex>

          <Flex alignItems="center" mb={6}>
            <Text mr={4}>Hover Color</Text>
            <Input
              type="color"
              value={hoverColor}
              onChange={(e) => { setHoverColor(e.target.value); }}
              width="50px"
            />
          </Flex>
        </Customize>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={squares} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...squares} />
      </CliTab>
    </TabbedLayout >

  );
}

export default SquaresDemo;