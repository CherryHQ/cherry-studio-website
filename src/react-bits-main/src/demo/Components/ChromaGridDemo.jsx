import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box } from "@chakra-ui/react";

import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import Dependencies from '../../components/code/Dependencies';

import { chromaGrid } from "../../constants/code/Components/chromaGridCode";
import ChromaGrid from "../../content/Components/ChromaGrid/ChromaGrid";

const ChromaGridDemo = () => {
  const propData = [
    {
      name: "items",
      type: "Array",
      default: "Demo []",
      description: "Array of ChromaItem objects to display in the grid"
    },
    {
      name: "className",
      type: "string",
      default: "''",
      description: "Additional CSS classes to apply to the grid container"
    },
    {
      name: "radius",
      type: "number",
      default: "300",
      description: "Size of the spotlight effect in pixels"
    },
    {
      name: "damping",
      type: "number",
      default: "0.45",
      description: "Cursor follow animation duration in seconds"
    },
    {
      name: "fadeOut",
      type: "number",
      default: "0.6",
      description: "Fade-out animation duration in seconds when mouse leaves"
    },
    {
      name: "ease",
      type: "string",
      default: "'power3.out'",
      description: "GSAP easing function for animations"
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h='auto' overflow="hidden" p={0} py={6}>
          <ChromaGrid />
        </Box>

        <PropTable data={propData} />
        <Dependencies dependencyList={['gsap']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={chromaGrid} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...chromaGrid} />
      </CliTab>
    </TabbedLayout>
  );
};

export default ChromaGridDemo;