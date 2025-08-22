import {
  createSystem,
  defaultConfig,
  defineSlotRecipe,
} from "@chakra-ui/react";

const drawerRecipe = defineSlotRecipe({
  className: "drawer",
  slots: ["content"],
  base: {
    content: {
      w: "100vw",
      h: "100vh",
    },
  },
});

const tabsRecipe = defineSlotRecipe({
  className: "tabs",
  slots: ["trigger"],
  base: {
    trigger: {
      flex: "0 0 auto",
      bg: "#060010",
      borderRadius: "10px",
      fontSize: "14px",
      border: "1px solid #392e4e",
      h: 9,
      px: "1rem",
      transition: "background-color .3s",

      _hover: { bg: "#271E37" },

      "&[data-state='active']": {
        color: "#fff",
        bg: "#170D27",
      },
    },
  },
});

export const toastStyles = {
  style: {
    fontSize: "12px",
    borderRadius: "0.75rem",
    border: "1px solid #392e4e",
    color: "#fff",
    backgroundColor: "#060010",
  },
};

export const customTheme = createSystem(defaultConfig, {
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },

  styles: {
    global: {
      "html, body": {
        minHeight: "100vh",
        fontFamily: '"Figtree", sans-serif',
        backgroundColor: "#060010",
      },
    },
  },

  components: {
    Slider: {
      baseStyle: {
        thumb: { bg: "#fff", _focus: { boxShadow: "none" } },
      },
      variants: {
        solid: {
          track: { bg: "#271E37" },
          filledTrack: { bg: "#fff" },
        },
      },
      defaultProps: { variant: "solid" },
    },
    Switch: {
      baseStyle: {
        track: {
          bg: "#271E37",
          _checked: { bg: "#5227FF" },
          _focus: { boxShadow: "0 0 0 3px #271E37" },
          _active: { bg: "#5227FF" },
        },
        thumb: {
          _checked: { bg: "white" },
          _active: { bg: "white" },
        },
      },
    },
  },

  recipes: {
    drawer: drawerRecipe,
    tabs: tabsRecipe,
  },
});
