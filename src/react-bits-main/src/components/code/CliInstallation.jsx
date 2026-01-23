import { Box, Text, Separator, Accordion } from "@chakra-ui/react";
import CodeHighlighter from "./CodeHighlighter";

const CliInstallation = ({
  cliDefault,
  cliTailwind,
  cliTsDefault,
  cliTsTailwind,
}) => {
  const installConfigs = [
    { title: "JS + CSS", code: cliDefault },
    { title: "JS + Tailwind", code: cliTailwind },
    { title: "TS + CSS", code: cliTsDefault },
    { title: "TS + Tailwind", code: cliTsTailwind },
  ].filter(({ code }) => code);

  return (
    <Box>
      <Text as="h2" className="demo-title" color={"#B19EEF"}>
        One-Time Installation
      </Text>

      {installConfigs.map(({ title, code }) => (
        <Box key={title} mb={6}>
          <Text
            mb={0}
            fontWeight="600"
            fontSize="1.4rem"
            color="#a6a6a6"
            className="demo-title-extra"
          >
            {title}
          </Text>
          <CodeHighlighter language="bash" codeString={code} />
        </Box>
      ))}

      <Box className="cli-divider" my={8} />

      <Text as="h2" className="demo-title" color={"#B19EEF"}>
        Full CLI Setup
      </Text>
      <Text className="jsrepo-info" mb={4} mt={4} color="#a1a1aa" fontSize="sm">
        React Bits uses{" "}
        <a href="https://jsrepo.dev/" target="_blank" rel="noreferrer">
          jsrepo
        </a>{" "}
        to help you install components via CLI— you can set it up project-wide following the steps below.
      </Text>

      <Accordion.Root type="single" collapsible defaultValue="setup">
        <Accordion.Item
          value="setup"
          bg="#060010"
          border="1px solid #392e4e"
          borderRadius="20px"
        >
          <Accordion.ItemTrigger pb={4} px={6}>
            <Box flex="1" textAlign="left" className="demo-title" fontSize="1rem">
              Setup Steps
            </Box>
            <Accordion.ItemIndicator pt="0.6em" />
          </Accordion.ItemTrigger>

          <Accordion.ItemContent px={6} pb={1}>
            <Text className="demo-extra-info">
              1. Initialize a config file for your project
            </Text>

            {[
              { label: "JavaScript (Default)", path: "default" },
              { label: "JavaScript (Tailwind)", path: "tailwind" },
              { label: "TypeScript (Default)", path: "ts/default" },
              { label: "TypeScript (Tailwind)", path: "ts/tailwind" },
            ].map(({ label, path }) => (
              <Box key={path} mb={4}>
                <Text className="demo-extra-info">{label}</Text>
                <CodeHighlighter
                  language="bash"
                  codeString={`npx jsrepo init https://reactbits.dev/${path}`}
                />
              </Box>
            ))}

            <Separator my={8} borderWidth='1px' borderColor="#392e4e" />

            <Text className="demo-extra-info">
              2. Browse &amp; add components from the list
            </Text>
            <CodeHighlighter language="bash" codeString="npx jsrepo add" />

            <Text className="demo-extra-info" mt={6}>
              3. Or just add a specific component
            </Text>
            <CodeHighlighter
              language="bash"
              codeString="npx jsrepo add Animations/AnimatedContent"
            />
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    </Box>
  );
};

export default CliInstallation;
