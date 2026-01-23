import React from "react";
import { Tabs, Icon, Flex } from "@chakra-ui/react";
import { FiCode, FiEye, FiHeart, FiTerminal } from "react-icons/fi";
import ContributionSection from "./GitHub/ContributionSection";

const TAB_STYLE_PROPS = {
  flex: "0 0 auto",
  border: "1px solid #392e4e",
  borderRadius: "10px",
  fontSize: "14px",
  h: 9,
  px: 4,
  color: "#ffffff",
  justifyContent: "center",
  _hover: { bg: "#271E37" },
  _selected: { bg: "#170D27", color: "#B19EEF" },
};

const TabbedLayout = ({ children, className }) => {
  const contentMap = {
    PreviewTab: null,
    CodeTab: null,
    CliTab: null,
  };

  React.Children.forEach(children, (child) => {
    if (!child) return;
    if (child.type === PreviewTab) contentMap.PreviewTab = child;
    if (child.type === CodeTab) contentMap.CodeTab = child;
    if (child.type === CliTab) contentMap.CliTab = child;
  });

  return (
    <Tabs.Root
      w="100%"
      variant="plain"
      lazyMount
      defaultValue="preview"
      className={className}
    >
      <Tabs.List w="100%">
        <Flex gap={2} justifyContent="space-between" alignItems="flex-start" w="100%" wrap="wrap">
          <Flex gap={2} wrap="wrap" minW="0" flex="1">
            <Tabs.Trigger value="preview" {...TAB_STYLE_PROPS}>
              <Icon as={FiEye} /> Preview
            </Tabs.Trigger>

            <Tabs.Trigger value="code" {...TAB_STYLE_PROPS}>
              <Icon as={FiCode} /> Code
            </Tabs.Trigger>

            <Tabs.Trigger value="cli" {...TAB_STYLE_PROPS} className="cli-tab">
              <Icon as={FiTerminal} /> CLI
            </Tabs.Trigger>
          </Flex>

          <Tabs.Trigger
            className="contribute-tab"
            value="contribute"
            {...TAB_STYLE_PROPS}
            flexShrink={0}
          >
            <Icon as={FiHeart} /> Contribute
          </Tabs.Trigger>
        </Flex>
      </Tabs.List>

      <Tabs.Content pt={0} value="preview">{contentMap.PreviewTab}</Tabs.Content>
      <Tabs.Content pt={0} value="code">{contentMap.CodeTab}</Tabs.Content>
      <Tabs.Content pt={0} value="cli">{contentMap.CliTab}</Tabs.Content>

      <Tabs.Content pt={0} value="contribute">
        <ContributionSection />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export const PreviewTab = ({ children }) => <>{children}</>;
export const CodeTab = ({ children }) => <>{children}</>;
export const CliTab = ({ children }) => <>{children}</>;

export { TabbedLayout };
