import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { CliTab, CodeTab, PreviewTab, TabbedLayout } from "../../components/common/TabbedLayout";

import CliInstallation from "../../components/code/CliInstallation";
import CodeExample from "../../components/code/CodeExample";
import Dependencies from "../../components/code/Dependencies";
import Customize from "../../components/common/Preview/Customize";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";
import PropTable from "../../components/common/Preview/PropTable";
import useForceRerender from "../../hooks/useForceRerender";

import { circularGallery } from "../../constants/code/Components/circularGalleryCode";
import CircularGallery from "../../content/Components/CircularGallery/CircularGallery";

const CircularGalleryDemo = () => {
  const [bend, setBend] = useState(1);
  const [borderRadius, setBorderRadius] = useState(0.05);
  const [scrollSpeed, setScrollSpeed] = useState(2);
  const [scrollEase, setScrollEase] = useState(0.05);

  const [key, forceRerender] = useForceRerender();

  const propData = [
    {
      name: "items",
      type: "Array<{ image: string; text: string }>",
      default: "undefined",
      description: "List of items to display in the gallery. Each item should have an image URL and a text label.",
    },
    {
      name: "bend",
      type: "number",
      default: "3",
      description:
        "Determines the curvature of the gallery layout. A negative value bends in one direction, a positive value in the opposite.",
    },
    {
      name: "textColor",
      type: "string",
      default: '"#ffffff"',
      description: "Specifies the color of the text labels.",
    },
    {
      name: "borderRadius",
      type: "number",
      default: "0.05",
      description: "Sets the border radius for the media items to achieve rounded corners.",
    },
    {
      name: "scrollSpeed",
      type: "number",
      default: "2",
      description:
        "Controls how much the gallery moves per scroll event. Lower values result in slower scrolling, higher values in faster scrolling.",
    },
    {
      name: "scrollEase",
      type: "number",
      default: "0.05",
      description:
        "Controls the smoothness of scroll transitions. Lower values create smoother, more fluid motion, while higher values make it more responsive.",
    },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
          <CircularGallery
            key={key}
            bend={bend}
            borderRadius={borderRadius}
            scrollSpeed={scrollSpeed}
            scrollEase={scrollEase}
          />
        </Box>

        <Customize>
          <PreviewSlider
            title="Bend Level"
            min={-10}
            max={10}
            step={1}
            value={bend}
            onChange={(val) => {
              setBend(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Border Radius"
            min={0}
            max={0.5}
            step={0.01}
            value={borderRadius}
            onChange={(val) => {
              setBorderRadius(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Scroll Speed"
            min={0.5}
            max={5}
            step={0.1}
            value={scrollSpeed}
            onChange={(val) => {
              setScrollSpeed(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Scroll Ease"
            min={0.01}
            max={0.15}
            step={0.01}
            value={scrollEase}
            onChange={(val) => {
              setScrollEase(val);
              forceRerender();
            }}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={["ogl"]} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={circularGallery} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...circularGallery} />
      </CliTab>
    </TabbedLayout>
  );
};

export default CircularGalleryDemo;
