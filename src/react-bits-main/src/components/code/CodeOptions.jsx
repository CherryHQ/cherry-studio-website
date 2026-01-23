import { Children, useMemo } from "react";
import {
  Tabs,
  Select,
  Flex,
  Text,
  Icon,
  Box,
  Portal,
  createListCollection,
} from "@chakra-ui/react";
import { FiCode } from "react-icons/fi";
import { RiTailwindCssFill, RiEmotionSadLine } from "react-icons/ri";
import { useLanguage } from "../context/LanguageContext/useLanguage";

export const CSSTab = ({ children }) => <>{children}</>;
export const TailwindTab = ({ children }) => <>{children}</>;
export const TSCSSTab = ({ children }) => <>{children}</>;
export const TSTailwindTab = ({ children }) => <>{children}</>;

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

const CodeOptions = ({ children }) => {
  const { languagePreset, setLanguagePreset } = useLanguage();
  const currentLang = languagePreset || "JS";

  const buckets = { JS: { css: null, tailwind: null }, TS: { css: null, tailwind: null } };
  Children.forEach(children, (child) => {
    if (!child) return;
    if (child.type === CSSTab) buckets.JS.css = child;
    if (child.type === TailwindTab) buckets.JS.tailwind = child;
    if (child.type === TSCSSTab) buckets.TS.css = child;
    if (child.type === TSTailwindTab) buckets.TS.tailwind = child;
  });

  const renderContent = (variant) => {
    const node = currentLang === "JS" ? buckets.JS[variant] : buckets.TS[variant];
    return node?.props?.children ? (
      node
    ) : (
      <Flex alignItems="center" gap={2} my={6} color="#a1a1aa">
        <Text>Nothing here yet!</Text>
        <Icon as={RiEmotionSadLine} />
      </Flex>
    );
  };

  const langCollection = useMemo(
    () => createListCollection({ items: ["JS", "TS"] }),
    []
  );

  const LanguageSelect = (
    <Select.Root
      collection={langCollection}
      value={[currentLang]}
      onValueChange={({ value }) => setLanguagePreset(value[0])}
      size="sm"
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger
          fontSize="14px"
          h={8}
          w={16}
          bg="#060010"
          border="1px solid #392e4e"
          borderRadius="10px"
        >
          <Select.ValueText fontSize="14px" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>

      <Portal>
        <Select.Positioner>
          <Select.Content
            bg="#060010"
            border="1px solid #392e4e"
            borderRadius="10px"
          >
            {langCollection.items.map((lang) => (
              <Select.Item
                key={lang}
                item={lang}
                fontSize="14px"
                borderRadius="10px"
                cursor="pointer"
                _highlighted={{ bg: "#271E37" }}
              >
                <Select.ItemText>{lang}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );

  return (
    <Tabs.Root mt={4} w="100%" variant="plain" defaultValue="default">
      <Tabs.List
        mb={2}
        w="100%"
        display="flex"
        alignItems="center"
        gap={2}
      >
        <Flex gap={2}>
          <Tabs.Trigger value="default" {...TAB_STYLE_PROPS}>
            <Icon as={FiCode} /> Default
          </Tabs.Trigger>
          <Tabs.Trigger value="tailwind" {...TAB_STYLE_PROPS}>
            <Flex alignItems="center" gap={2}>
              <Icon as={RiTailwindCssFill} /> Tailwind
            </Flex>
          </Tabs.Trigger>
        </Flex>

        <Box ml="auto">{LanguageSelect}</Box>
      </Tabs.List>

      <Tabs.Content pt={0} value="default">{renderContent("css")}</Tabs.Content>
      <Tabs.Content pt={0} value="tailwind">{renderContent("tailwind")}</Tabs.Content>
    </Tabs.Root>
  );
};

export default CodeOptions;
