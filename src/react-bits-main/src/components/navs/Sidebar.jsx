import {
  Box,
  Flex,
  VStack,
  Text,
  Stack,
  Icon,
  IconButton,
  Drawer,
  Image,
  Separator,
} from "@chakra-ui/react";
import {
  FiArrowRight,
  FiMenu,
  FiSearch,
  FiX,
} from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
  useMemo,
  memo,
  useEffect,
} from "react";
import { CATEGORIES, NEW, UPDATED } from "../../constants/Categories";
import { componentMap } from "../../constants/Components";
import { useSearch } from "../context/SearchContext/useSearch";
import { useTransition } from "../../hooks/useTransition";
import Logo from "../../assets/logos/react-bits-logo.svg";

const HOVER_TIMEOUT_DELAY = 150;
const ICON_BUTTON_STYLES = {
  rounded: "10px",
  border: "1px solid #ffffff1c",
  bg: "#060010",
};
const ARROW_ICON_PROPS = {
  boxSize: 4,
  transform: "rotate(-45deg)",
};

const scrollToTop = () => window.scrollTo(0, 0);
const slug = (str) => str.replace(/\s+/g, "-").toLowerCase();

const Sidebar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [linePosition, setLinePosition] = useState(null);
  const [isLineVisible, setIsLineVisible] = useState(false);
  const [hoverLinePosition, setHoverLinePosition] = useState(null);
  const [isHoverLineVisible, setIsHoverLineVisible] = useState(false);
  const [pendingActivePath, setPendingActivePath] = useState(null);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  const searchBtnRef = useRef();
  const menuBtnRef = useRef();
  const sidebarRef = useRef(null);
  const sidebarContainerRef = useRef(null);
  const itemRefs = useRef({});
  const hoverTimeoutRef = useRef(null);
  const hoverDelayTimeoutRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { toggleSearch } = useSearch();
  const { startTransition, isTransitioning } = useTransition();

  const findActiveElement = useCallback(() => {
    const activePath = pendingActivePath || location.pathname;

    for (const category of CATEGORIES) {
      const activeItem = category.subcategories.find((sub) => {
        return activePath === `/${slug(category.name)}/${slug(sub)}`;
      });
      if (activeItem)
        return itemRefs.current[
          `/${slug(category.name)}/${slug(activeItem)}`
        ];
    }
    return null;
  }, [location.pathname, pendingActivePath]);

  const updateLinePosition = useCallback((el) => {
    if (!el || !sidebarRef.current || !sidebarRef.current.offsetParent) return null;
    const sidebarRect = sidebarRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    return elRect.top - sidebarRect.top + elRect.height / 2;
  }, []);

  const handleDrawerToggle = () => setDrawerOpen((p) => !p);
  const closeDrawer = () => setDrawerOpen(false);
  const onSearchClick = () => {
    closeDrawer();
    toggleSearch();
  };
  const onNavClick = () => {
    closeDrawer();
    scrollToTop();
  };

  const handleTransitionNavigation = useCallback(async (path, subcategory) => {
    if (isTransitioning || location.pathname === path) return;

    setPendingActivePath(path);

    await startTransition(subcategory, componentMap, () => {
      navigate(path);
      scrollToTop();
      setPendingActivePath(null);
    });
  }, [isTransitioning, location.pathname, startTransition, navigate]);

  const handleMobileTransitionNavigation = useCallback(async (path, subcategory) => {
    if (isTransitioning || location.pathname === path) return;

    closeDrawer();
    setPendingActivePath(path);

    await startTransition(subcategory, componentMap, () => {
      navigate(path);
      scrollToTop();
      setPendingActivePath(null);
    });
  }, [isTransitioning, location.pathname, startTransition, navigate]);

  const onItemEnter = (path, e) => {
    clearTimeout(hoverTimeoutRef.current);
    clearTimeout(hoverDelayTimeoutRef.current);

    const targetElement = e.currentTarget;

    const pos = updateLinePosition(targetElement);
    if (pos !== null) {
      setHoverLinePosition(pos);
    }

    hoverDelayTimeoutRef.current = setTimeout(() => {
      setIsHoverLineVisible(true);
    }, 200);
  };

  const onItemLeave = () => {
    clearTimeout(hoverDelayTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHoverLineVisible(false);
    }, HOVER_TIMEOUT_DELAY);
  };

  const scrollActiveItemIntoView = useCallback(() => {
    const activeEl = findActiveElement();
    if (activeEl && sidebarContainerRef.current) {
      const containerRect = sidebarContainerRef.current.getBoundingClientRect();
      const elementRect = activeEl.getBoundingClientRect();
      const offset = 100;

      const isElementAboveView = elementRect.top < containerRect.top + offset;
      const isElementBelowView = elementRect.bottom > containerRect.bottom - offset;

      if (isElementAboveView || isElementBelowView) {
        const scrollTop = sidebarContainerRef.current.scrollTop +
          (elementRect.top - containerRect.top) - offset;

        sidebarContainerRef.current.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });
      }
    }
  }, [findActiveElement]);

  useLayoutEffect(() => {
    const activeEl = findActiveElement();
    if (!activeEl) {
      setIsLineVisible(false);
      return;
    }
    const pos = updateLinePosition(activeEl);
    if (pos !== null) {
      setLinePosition(pos);
      setIsLineVisible(true);
    } else {
      setIsLineVisible(false);
    }
  }, [findActiveElement, updateLinePosition]);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollActiveItemIntoView();
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname, scrollActiveItemIntoView]);

  useEffect(() => () => {
    clearTimeout(hoverTimeoutRef.current);
    clearTimeout(hoverDelayTimeoutRef.current);
  }, []);

  useEffect(() => {
    if (pendingActivePath && location.pathname === pendingActivePath) {
      setPendingActivePath(null);
    }
  }, [location.pathname, pendingActivePath]);

  useEffect(() => {
    const sidebarElement = sidebarContainerRef.current;
    if (!sidebarElement) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = sidebarElement;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setIsScrolledToBottom(isAtBottom);
    };

    sidebarElement.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => sidebarElement.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Box
        display={{ md: "none" }}
        position="fixed"
        top={0}
        left={0}
        zIndex="overlay"
        w="100%"
        bg="#060010"
        p="1em"
      >
        <Flex
          align="center"
          justify="space-between"
          gap="1em"
        >
          <Link to="/">
            <Image src={Logo} h="32px" alt="React Bits logo" />
          </Link>

          <Flex gap={2}>
            <IconButton
              {...ICON_BUTTON_STYLES}
              ref={searchBtnRef}
              aria-label="Search"
              onClick={onSearchClick}
            >
              <Icon as={FiSearch} color='#fff' />
            </IconButton>
            <IconButton
              {...ICON_BUTTON_STYLES}
              ref={menuBtnRef}
              aria-label="Open Menu"
              onClick={handleDrawerToggle}
            >
              <Icon as={FiMenu} color='#fff' />
            </IconButton>
          </Flex>
        </Flex>
      </Box>

      <Drawer.Root
        open={isDrawerOpen}
        onOpenChange={closeDrawer}
        placement="left"
        size="full"
      >
        <Drawer.Backdrop />
        <Drawer.Positioner w="100vw"
          sx={{
            transition: "transform 0.3s ease",
            "&[data-state='closed']": { transform: "translateX(-100%)" },
            "&[data-state='open']": { transform: "translateX(0)" },
          }}
          maxW="100vw">
          <Drawer.Content bg="#060010">
            <Drawer.Header
              h="72px"
              py={2}
              borderBottom="1px solid #ffffff1c"
              className="sidebar-logo"
            >
              <Flex align="center" justify="space-between" w="100%">
                <Link to="/">
                  <Image src={Logo} alt="Logo" h="28px" />
                </Link>
                <IconButton
                  {...ICON_BUTTON_STYLES}
                  aria-label="Close"
                  onClick={closeDrawer}
                >
                  <Icon as={FiX} color='#fff' />
                </IconButton>
              </Flex>
            </Drawer.Header>

            <Drawer.Body pb="6em">
              <VStack align="stretch" spacing={5} mt={8}>
                {CATEGORIES.map((cat, index) => (
                  <Category
                    key={cat.name}
                    category={cat}
                    location={location}
                    pendingActivePath={pendingActivePath}
                    handleClick={onNavClick}
                    handleTransitionNavigation={handleMobileTransitionNavigation}
                    onItemMouseEnter={() => { }}
                    onItemMouseLeave={() => { }}
                    itemRefs={{}}
                    isTransitioning={isTransitioning}
                    isFirstCategory={index === 0}
                  />
                ))}
              </VStack>

              <Separator my={4} />
              <Text color="#a6a6a6" mb={3}>
                Useful Links
              </Text>
              <Flex direction="column" gap={2}>
                <Link
                  to="https://github.com/DavidHDev/react-bits"
                  target="_blank"
                  onClick={closeDrawer}
                  display="block"
                  mb={2}
                >
                  <Flex alignItems="center" gap='4px'><span>GitHub</span> <Icon as={FiArrowRight} {...ARROW_ICON_PROPS} /></Flex>
                </Link>
                <Link
                  to="/showcase"
                  onClick={closeDrawer}
                  display="block"
                  mb={2}
                >
                  <Flex alignItems="center" gap='4px'><span>Showcase</span> <Icon as={FiArrowRight} {...ARROW_ICON_PROPS} /></Flex>
                </Link>
                <Link
                  to="https://davidhaz.com/"
                  target="_blank"
                  onClick={closeDrawer}
                  display="block"
                  mb={2}
                >
                  <Flex alignItems="center" gap='4px'><span>Who made this?</span> <Icon as={FiArrowRight} {...ARROW_ICON_PROPS} /></Flex>
                </Link>
              </Flex>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>

      <Box
        as="nav"
        ref={sidebarContainerRef}
        position="fixed"
        top="57px"
        h="100vh"
        w={{ base: 0, md: 40 }}
        p={5}
        overflowY="auto"
        className={`sidebar ${isScrolledToBottom ? 'sidebar-no-fade' : ''}`}
      >
        <Box ref={sidebarRef} position="relative">
          <Box
            position="absolute"
            left="0"
            w="2px"
            h="16px"
            bg="#fff"
            rounded="1px"
            transform={
              isLineVisible && linePosition !== null
                ? `translateY(${linePosition - 8}px)`
                : "translateY(-100px)"
            }
            opacity={isLineVisible ? 1 : 0}
            transition="all 0.2s cubic-bezier(0.4,0,0.2,1)"
            pointerEvents="none"
            zIndex={2}
          />

          <Box
            position="absolute"
            left="0"
            w="2px"
            h="16px"
            bg="#ffffff66"
            rounded="1px"
            transform={
              hoverLinePosition !== null
                ? `translateY(${hoverLinePosition - 8}px)`
                : "translateY(-100px)"
            }
            opacity={isHoverLineVisible ? 1 : 0}
            transition="all 0.2s cubic-bezier(0.4,0,0.2,1)"
            pointerEvents="none"
            zIndex={1}
          />

          <VStack align="stretch" spacing={4}>
            {CATEGORIES.map((cat, index) => (
              <Category
                key={cat.name}
                category={cat}
                location={location}
                pendingActivePath={pendingActivePath}
                handleClick={scrollToTop}
                handleTransitionNavigation={handleTransitionNavigation}
                onItemMouseEnter={onItemEnter}
                onItemMouseLeave={onItemLeave}
                itemRefs={itemRefs}
                isTransitioning={isTransitioning}
                isFirstCategory={index === 0}
              />
            ))}
          </VStack>
        </Box>
      </Box>
    </>
  );
};

const Category = memo(
  ({
    category,
    handleClick,
    handleTransitionNavigation,
    location,
    pendingActivePath,
    onItemMouseEnter,
    onItemMouseLeave,
    itemRefs,
    isTransitioning,
    isFirstCategory,
  }) => {
    const items = useMemo(
      () =>
        category.subcategories.map((sub) => {
          const path = `/${slug(category.name)}/${slug(sub)}`;
          const activePath = pendingActivePath || location.pathname;
          return {
            sub,
            path,
            isActive: activePath === path,
            isNew: NEW.includes(sub),
            isUpdated: UPDATED.includes(sub),
          };
        }),
      [category.name, category.subcategories, location.pathname, pendingActivePath]
    );

    return (
      <Box>
        <Text className="category-name" mb={2} mt={isFirstCategory ? 0 : 4}>
          {category.name}
        </Text>
        <Stack
          spacing={0.5}
          pl={4}
          borderLeft="1px solid #392e4e"
          position="relative"
        >
          {items.map(({ sub, path, isActive, isNew, isUpdated }) => (
            <Link
              key={path}
              ref={(el) =>
                itemRefs.current && (itemRefs.current[path] = el)
              }
              to={path}
              className={`sidebar-item ${isActive ? 'active-sidebar-item' : ''} ${isTransitioning ? 'transitioning' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                if (handleTransitionNavigation) {
                  handleTransitionNavigation(path, sub);
                } else {
                  handleClick();
                }
              }}
              onMouseEnter={(e) => onItemMouseEnter(path, e)}
              onMouseLeave={onItemMouseLeave}
            >
              {sub}
              {isNew && <span className="new-tag">New</span>}
              {isUpdated && <span className="updated-tag">Updated</span>}
            </Link>
          ))}
        </Stack>
      </Box>
    );
  }
);

Category.displayName = "Category";

export default Sidebar;
