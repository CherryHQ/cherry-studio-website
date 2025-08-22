import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box, Icon, Text, Button } from "@chakra-ui/react";
import { FaCircle, FaCode, FaSliders } from "react-icons/fa6";

import Customize from "../../components/common/Preview/Customize";
import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import PreviewSwitch from "../../components/common/Preview/PreviewSwitch";
import useForceRerender from "../../hooks/useForceRerender";

import { cardSwap } from "../../constants/code/Components/cardSwapCode";
import CardSwap, { Card } from "../../content/Components/CardSwap/CardSwap";

const CardSwapDemo = () => {
  const [key, forceRerender] = useForceRerender();
  const [cardDistance, setCardDistance] = useState(60);
  const [verticalDistance, setVerticalDistance] = useState(70);
  const [delay, setDelay] = useState(5000);
  const [skewAmount, setSkewAmount] = useState(6);
  const [easing, setEasing] = useState('elastic');
  const [pauseOnHover, setPauseOnHover] = useState(false);

  const propData = [
    {
      name: "width",
      type: "number | string",
      default: "500",
      description: "Width of the card container"
    },
    {
      name: "height",
      type: "number | string",
      default: "400",
      description: "Height of the card container"
    },
    {
      name: "cardDistance",
      type: "number",
      default: "60",
      description: "X-axis spacing between cards"
    },
    {
      name: "verticalDistance",
      type: "number",
      default: "70",
      description: "Y-axis spacing between cards"
    },
    {
      name: "delay",
      type: "number",
      default: "5000",
      description: "Milliseconds between card swaps"
    },
    {
      name: "pauseOnHover",
      type: "boolean",
      default: "false",
      description: "Whether to pause animation on hover"
    },
    {
      name: "onCardClick",
      type: "(idx: number) => void",
      default: "undefined",
      description: "Callback function when a card is clicked"
    },
    {
      name: "skewAmount",
      type: "number",
      default: "6",
      description: "Degree of slope for top/bottom edges"
    },
    {
      name: "easing",
      type: "'linear' | 'elastic'",
      default: "'elastic'",
      description: "Animation easing type"
    },
    {
      name: "children",
      type: "ReactNode",
      default: "required",
      description: "Card components to display in the stack"
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box className="demo-container" h={500} overflow="hidden" display="flex" flexDirection={{ base: "column", lg: "row" }} position="relative">
          <Box
            pl={{ base: 0, lg: 0 }}
            w={{ base: "100%", lg: "50%" }}
            h={{ base: "auto", lg: "100%" }}
            display="flex"
            flexDirection="column"
            justifyContent={{ base: "flex-start", lg: "center" }}
            alignItems={{ base: "center", lg: "flex-start" }}
            textAlign={{ base: "center", lg: "left" }}
            pt={{ base: 8, lg: 0 }}
            pb={{ base: 4, lg: 0 }}
            px={{ base: 4, lg: 4 }}
          >
            <Text
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              mb={4}
              fontWeight={500}
              lineHeight={1.1}
              pl={{ base: 0, lg: '6rem' }}
            >
              Card stacks have never{" "}
              <Box as="span" display={{ base: "inline", lg: "block" }}>
                looked so good
              </Box>
            </Text>
            <Text
              fontSize={{ base: "lg", lg: "xl" }}
              mb={4}
              fontWeight={400}
              lineHeight={1.1}
              color="#999"
              pl={{ base: 0, lg: '6rem' }}
            >
              Just look at it go!
            </Text>
          </Box>
          <Box
            w={{ base: "100%", lg: "50%" }}
            h={{ base: "400px", lg: "100%" }}
            position="relative"
          >
            <CardSwap
              key={key}
              cardDistance={cardDistance}
              verticalDistance={verticalDistance}
              delay={delay}
              skewAmount={skewAmount}
              easing={easing}
              pauseOnHover={pauseOnHover}
            >
              <Card customClass="one">
                <Box borderBottom="1px solid #fff" bg="linear-gradient(to top, #271E37, #060606)">
                  <Text m={2}>
                    <Icon as={FaCircle} mr={2} />
                    Smooth
                  </Text>
                </Box>
                <Box position="relative" p={2}>
                  <video autoPlay loop muted playsInline style={{ borderRadius: '15px' }}>
                    <source src="https://cdn.dribbble.com/userupload/7053861/file/original-7956be57144058795db6bb24875bdab9.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Box>
              </Card>
              <Card customClass="two">
                <Box borderBottom="1px solid #fff" bg="linear-gradient(to top, #271E37, #060606)">
                  <Text m={2}>
                    <Icon as={FaCode} mr={2} />
                    Reliable
                  </Text>
                </Box>
                <Box position="relative" p={2}>
                  <video autoPlay loop muted playsInline style={{ borderRadius: '15px' }}>
                    <source src="https://cdn.dribbble.com/userupload/7078020/file/original-b071e9063d9e3ba86a85a61b9d5a7c42.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Box>
              </Card>
              <Card customClass="three">
                <Box borderBottom="1px solid #fff" bg="linear-gradient(to top, #271E37, #060606)">
                  <Text m={2}>
                    <Icon as={FaSliders} mr={2} />
                    Customizable
                  </Text>
                </Box>
                <Box position="relative" p={2}>
                  <video autoPlay loop muted playsInline style={{ borderRadius: '15px' }}>
                    <source src="https://cdn.dribbble.com/userupload/7098541/file/original-0b063b12ca835421580e6034368ad95a.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Box>
              </Card>
            </CardSwap>
          </Box>
        </Box>

        <Customize>
          <PreviewSwitch
            title="Pause On Hover"
            isChecked={pauseOnHover}
            onChange={(checked) => {
              setPauseOnHover(checked);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Card Distance"
            min={30}
            max={100}
            step={5}
            value={cardDistance}
            onChange={(val) => {
              setCardDistance(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Vertical Distance"
            min={40}
            max={120}
            step={5}
            value={verticalDistance}
            onChange={(val) => {
              setVerticalDistance(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Delay (ms)"
            min={3000}
            max={8000}
            step={500}
            value={delay}
            onChange={(val) => {
              setDelay(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Skew Amount"
            min={0}
            max={12}
            step={1}
            value={skewAmount}
            onChange={(val) => {
              setSkewAmount(val);
              forceRerender();
            }}
          />

          <Button
            fontSize="xs"
            bg="#170D27"
            borderRadius="10px"
            border="1px solid #271E37"
            _hover={{ bg: "#271E37" }}
            color="#fff"
            h={8}
            onClick={() => {
              setEasing(easing === 'elastic' ? 'linear' : 'elastic');
              forceRerender();
            }}
          >
            Easing: <Text color={"#a1a1aa"}>&nbsp;{easing}</Text>
          </Button>
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['gsap']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={cardSwap} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...cardSwap} />
      </CliTab>
    </TabbedLayout>
  );
};

export default CardSwapDemo;