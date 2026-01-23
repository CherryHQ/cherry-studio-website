import { useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";


import CodeExample from '../../components/code/CodeExample';
import Dependencies from "../../components/code/Dependencies";
import CliInstallation from "../../components/code/CliInstallation";
import Customize from "../../components/common/Preview/Customize";
import PropTable from "../../components/common/Preview/PropTable";

import Crosshair from "../../content/Animations/Crosshair/Crosshair";
import { crosshair } from '../../constants/code/Animations/crosshairCode';

const DEFAULT_TEXT = 'Aim... aand...';

const CrosshairDemo = () => {
  const [linkText, setLinkText] = useState(DEFAULT_TEXT)
  const [color, setColor] = useState('#ffffff');
  const [targeted, setTargeted] = useState(true);
  const linkRef  = useRef(null);
  
  const containerRef = useRef(null);
  const [minWidth, setMinWidth] = useState(0);
  const hiddenRef = useRef(null);

  const propData = [
    { name: "color", type: "string", default: "'white'", description: "Color of the crosshair lines." },
    { name: "containerRef", type: "RefObject<HTMLElement>", default: "null", description: "Optional container ref to limit crosshair to specific element. If null, crosshair will be active on entire viewport." },
  ];

  useEffect(() => {
    if (hiddenRef.current) {
      if(minWidth < hiddenRef.current.getBoundingClientRect().width){
        setMinWidth(hiddenRef.current.getBoundingClientRect().width);
      }
    }
  }, [linkText]);

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box ref={containerRef} position="relative" className="demo-container" minH={300} overflow="hidden">
          <Crosshair containerRef={targeted ? null : containerRef} color={color} />

          <Flex direction="column" justifyContent="center" alignItems="center">
            <Text _hover={{ color: 'magenta' }} transition=".3s ease" textAlign="center" fontWeight={900} fontSize={{ base: '2rem', md: '4rem' }} as="a" href="https://github.com/DavidHDev/react-bits"
            ref={linkRef}
              onMouseEnter={() => {
                setLinkText('Shoot!!!')
              }}
              onMouseLeave={() => {
                setLinkText(DEFAULT_TEXT)
              }}
              style={{ minWidth }}
            >
              {linkText}
            </Text>
            <Text position="relative" top="-10px" color="#444">(hover the text)</Text>
          </Flex>
          <Text
            ref={hiddenRef}
            style={{
              visibility: "hidden",
              position: "absolute",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              overflow: "hidden",
            }}
            aria-hidden="true"
            textAlign="center" fontWeight={900} fontSize={{ base: '2rem', md: '4rem' }}
          > 
            {linkText}
          </Text>
        </Box>

        <Customize>
          <Flex gap={4} align="center" mt={4} mb={4}>
            <Text fontSize="sm">Crosshair Color</Text>
            <Input
              type="color"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
              width="60px"
              p={0}
            />
          </Flex>

          <Button
            fontSize="xs"
            bg="#170D27"
            borderRadius="10px"
            border="1px solid #271E37"
            _hover={{ bg: "#271E37" }}
            color="#fff"
            h={8}
            onClick={() => {
              setTargeted(!targeted);
            }}
          >
            Cursor Container <Text color={targeted ? "lightgreen" : "coral"}>&nbsp;{targeted ? 'Viewport' : 'Targeted'}</Text>
          </Button>
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['gsap']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={crosshair} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...crosshair} />
      </CliTab>
    </TabbedLayout>
  );
};

export default CrosshairDemo;
