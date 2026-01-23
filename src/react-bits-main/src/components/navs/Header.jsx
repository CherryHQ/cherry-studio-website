import { useRef, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  Drawer,
  Flex,
  Icon,
  IconButton,
  Image,
  Kbd,
  Portal,
  Select,
  Separator,
  Text,
  useDisclosure,
  createListCollection,
} from "@chakra-ui/react";

import { FiArrowRight, FiMenu, FiSearch, FiStopCircle } from "react-icons/fi";

import { useStars } from "../../hooks/useStars";
import { useSearch } from "../context/SearchContext/useSearch";
import { useLanguage } from "../context/LanguageContext/useLanguage";

import Logo from "../../assets/logos/react-bits-logo.svg";
import Star from "../../assets/common/star.svg";
import FadeContent from "../../content/Animations/FadeContent/FadeContent";

const Header = () => {
  const langCollection = useMemo(() => createListCollection({ items: ["JS", "TS"] }), []);
  const { languagePreset, setLanguagePreset } = useLanguage(); // “JS” | “TS”
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleSearch } = useSearch();
  const stars = useStars();
  const starCountRef = useRef(null);

  const LanguageSelect = (
    <Select.Root
      collection={langCollection}
      value={[languagePreset]}
      onValueChange={({ value }) => setLanguagePreset(value[0])}
      size="sm"
      width="80px"
    >
      <Select.HiddenSelect name="language" />

      <Select.Control>
        <Select.Trigger
          fontSize="12px"
          bg="#060010"
          border="1px solid #392e4e"
          rounded="full"
          h={10}
          fontWeight={600}
          cursor="pointer"
          transition="transform 0.3s"
          _hover={{ transform: "scale(0.98)" }}
        >
          <Select.ValueText color="#fff" pl={1} fontSize="12px" />
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
            borderRadius="25px"
            w="80px"
            px={2}
            py={2}
            zIndex="modal"
          >
            {langCollection.items.map((lang) => (
              <Select.Item
                item={lang}
                key={lang}
                rounded="full"
                px={3}
                py={2}
                cursor="pointer"
                _highlighted={{ bg: "#271E37" }}
              >
                {lang}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );

  return (
    <Box zIndex={100} className="main-nav">
      <Flex className="nav-items" h={20} alignItems="center" justifyContent="space-between" px={4}>
        <RouterLink to="/" className="logo">
          <Image src={Logo} alt="Logo" className="cursor-target" />
        </RouterLink>

        <IconButton
          aria-label="Open Menu"
          icon={<FiMenu size="1.3em" />}
          size="md"
          display={{ md: "none" }}
          onClick={onOpen}
        />

        <Flex display={{ base: "none", md: "flex" }} alignItems="center" gap={2}>
          <FadeContent blur>
            <Flex
              as="button"
              fontSize="12px"
              h={10}
              pr={2}
              pl={3}
              rounded="full"
              bg="#060010"
              border="1px solid #392e4e"
              fontWeight={600}
              align="center"
              gap={1}
              cursor="text"
              userSelect="none"
              transition="transform 0.3s"
              _hover={{ transform: "scale(0.98)" }}
              onClick={toggleSearch}
            >
              <Icon as={FiSearch} boxSize={4} color="#392e4e" />
              <Text mr={8} color="#a6a6a6">Search Docs</Text>
              <Kbd
                color="#B19EEF"
                fontSize="10px"
                borderColor="#271E37"
                borderRadius="50px"
                width="20px"
                height="20px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                backgroundColor="#170D27"
                fontWeight={800}
              >
                /
              </Kbd>
            </Flex>
          </FadeContent>

          <FadeContent blur>{LanguageSelect}</FadeContent>

          <FadeContent blur>
            <button
              className="cta-button-docs"
              onClick={() =>
                window.open("https://github.com/DavidHDev/react-bits", "_blank")
              }
            >
              Star On GitHub
              <span ref={starCountRef}>
                <img src={Star} alt="Star Icon" />
                {stars}
              </span>
            </button>
          </FadeContent>
        </Flex>
      </Flex>

      <Drawer.Root
        placement="top"
        open={isOpen}
        onOpenChange={(v) => (v ? onOpen() : onClose())}
      >
        <Drawer.Backdrop display={{ md: "none" }}>
          <Drawer.Content bg="black" h="100%">
            <Drawer.Body p={0}>
              <Flex direction="column">
                <Flex
                  align="center"
                  justify="space-between"
                  h="57px"
                  px={6}
                  mb={6}
                  borderBottom="1px solid #ffffff1c"
                >
                  <Image src={Logo} alt="Logo" h="25px" />
                  <IconButton
                    aria-label="Close Menu"
                    icon={<Icon as={FiStopCircle} boxSize={4} />}
                    size="md"
                    display={{ md: "none" }}
                    onClick={onClose}
                  />
                </Flex>

                <Flex direction="column" px={6} gap={2}>
                  <Text fontWeight="bold">Useful Links</Text>
                  <RouterLink to="/text-animations/split-text" onClick={onClose}>
                    Docs
                  </RouterLink>
                  <RouterLink
                    to="https://github.com/DavidHDev/react-bits"
                    target="_blank"
                    onClick={onClose}
                  >
                    GitHub <Icon as={FiArrowRight} transform="rotate(-45deg)" ml={1} />
                  </RouterLink>

                  <Separator my={4} />

                  <Text fontWeight="bold">Other</Text>
                  <RouterLink
                    to="https://davidhaz.com/"
                    target="_blank"
                    onClick={onClose}
                  >
                    Who made this?
                    <Icon as={FiArrowRight} transform="rotate(-45deg)" ml={1} />
                  </RouterLink>
                </Flex>
              </Flex>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer.Root>
    </Box>
  );
};

export default Header;
