import { useState } from 'react';
import {
  CliTab,
  CodeTab,
  PreviewTab,
  TabbedLayout
} from '../../components/common/TabbedLayout';
import {
  Box,
  Flex,
  Text
} from '@chakra-ui/react';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';

import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import CliInstallation from '../../components/code/CliInstallation';
import useForceRerender from '../../hooks/useForceRerender';
import RefreshButton from '../../components/common/Preview/RefreshButton';

import TextPressure from '../../content/TextAnimations/TextPressure/TextPressure';
import { textPressure } from '../../constants/code/TextAnimations/textPressureCode';
import Customize from '../../components/common/Preview/Customize';
import PreviewInput from '../../components/common/Preview/PreviewInput';

const propData = [
  {
    name: 'text',
    type: 'string',
    default: '"Hello!"',
    description: 'Text content that will be displayed and animated.'
  },
  {
    name: 'fontFamily',
    type: 'string',
    default: '',
    description: 'Name of the variable font family.'
  },
  {
    name: 'fontUrl',
    type: 'string',
    default: 'URL to a .woff2 or .ttf file',
    description: 'URL for the variable font file (needed)'
  },
  {
    name: 'flex',
    type: 'boolean',
    default: 'true',
    description: 'Whether the characters are spaced using flex layout.'
  },
  {
    name: 'scale',
    type: 'boolean',
    default: 'false',
    description: 'If true, vertically scales the text to fill its container height.'
  },
  {
    name: 'alpha',
    type: 'boolean',
    default: 'false',
    description: 'If true, applies an opacity effect based on cursor distance.'
  },
  {
    name: 'stroke',
    type: 'boolean',
    default: 'false',
    description: 'If true, adds a stroke effect around characters.'
  },
  {
    name: 'width',
    type: 'boolean',
    default: 'true',
    description: 'If true, varies the variable-font "width" axis.'
  },
  {
    name: 'weight',
    type: 'boolean',
    default: 'true',
    description: 'If true, varies the variable-font "weight" axis.'
  },
  {
    name: 'italic',
    type: 'boolean',
    default: 'true',
    description: 'If true, varies the variable-font "italics" axis.'
  },
  {
    name: 'textColor',
    type: 'string',
    default: 'true',
    description: 'The fill color of the text'
  },
  {
    name: 'strokeColor',
    type: 'string',
    default: '#FFFFFF',
    description: 'The stroke color that will be applied to the text when "stroke" is set to true'
  },
  {
    name: 'className',
    type: 'string',
    default: '#FF0000',
    description: 'Additional class for styling the <h1> wrapper.'
  },
  {
    name: 'minFontSize',
    type: 'number',
    default: '24',
    description: 'Sets a minimum font-size to avoid overly tiny text on smaller screens.'
  }
];

const TextPressureDemo = () => {
  const [text, setText] = useState('Hello!');
  const [flex, setFlex] = useState(true);
  const [alpha, setAlpha] = useState(false);
  const [stroke, setStroke] = useState(false);
  const [width, setWidth] = useState(true);
  const [weight, setWeight] = useState(true);
  const [italic, setItalic] = useState(true);
  const [textColor, setTextColor] = useState('#ffffff');
  const [strokeColor, setStrokeColor] = useState('#5227FF');

  const [key, forceRerender] = useForceRerender();

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" bg='#060010' minH={400} maxH={450} overflow="hidden" mb={6}>
          <RefreshButton onClick={forceRerender} />
          <Box w="100%" h="100%">
            <TextPressure
              key={key}
              text={text}
              flex={flex}
              alpha={alpha}
              stroke={stroke}
              width={width}
              weight={weight}
              italic={italic}
              textColor={textColor}
              strokeColor={strokeColor}
              minFontSize={36}
            />
          </Box>
        </Box>

        <Customize>
          <PreviewInput
            title="Text"
            value={text}
            placeholder="Your text here..."
            width={200}
            maxLength={10}
            onChange={setText}
          />

          <Flex alignItems='center' gap={4} flexWrap="wrap" mt={6}>
            <Flex gap={4} align="center">
              <Text fontSize="sm">Text Color</Text>
              <input
                type="color"
                value={textColor}
                width="60px"
                onChange={(e) => {
                  setTextColor(e.target.value);
                  forceRerender();
                }}
              />
            </Flex>

            <Flex gap={4} align="center">
              <Text fontSize="sm">Stroke Color</Text>
              <input
                type="color"
                value={strokeColor}
                width="60px"
                onChange={(e) => {
                  setStrokeColor(e.target.value);
                  forceRerender();
                }}
              />
            </Flex>
          </Flex>

          <Text mt={6} color='#999'>Animation Settings</Text>
          <Flex gap={4} flexWrap="wrap">
            <PreviewSwitch
              title="Flex"
              isChecked={flex}
              onChange={(checked) => {
                setFlex(checked);
                forceRerender();
              }}
            />
            <PreviewSwitch
              title="Alpha"
              isChecked={alpha}
              onChange={(checked) => {
                setAlpha(checked);
                forceRerender();
              }}
            />
            <PreviewSwitch
              title="Stroke"
              isChecked={stroke}
              onChange={(checked) => {
                setStroke(checked);
                forceRerender();
              }}
            />
            <PreviewSwitch
              title="Width"
              isChecked={width}
              onChange={(checked) => {
                setWidth(checked);
                forceRerender();
              }}
            />
            <PreviewSwitch
              title="Weight"
              isChecked={weight}
              onChange={(checked) => {
                setWeight(checked);
                forceRerender();
              }}
            />
            <PreviewSwitch
              title="Italic"
              isChecked={italic}
              onChange={(checked) => {
                setItalic(checked);
                forceRerender();
              }}
            />
          </Flex>
        </Customize>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={textPressure} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...textPressure} />
      </CliTab>
    </TabbedLayout>
  );
};

export default TextPressureDemo;
