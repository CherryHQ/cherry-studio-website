import { useState } from "react";
import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box } from "@chakra-ui/react";

import Customize from "../../components/common/Preview/Customize";
import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import PreviewSelect from "../../components/common/Preview/PreviewSelect";
import PreviewSwitch from "../../components/common/Preview/PreviewSwitch";
import Dependencies from '../../components/code/Dependencies';

import logoDark from "../../assets/logos/react-bits-logo-small-black.svg";
import logoLight from "../../assets/logos/react-bits-logo-small.svg";

import PillNav from "../../content/Components/PillNav/PillNav";
import { pillNav } from "../../constants/code/Components/pillNavCode";

const PillNavDemo = () => {
  const propData = [
    {
      name: "logo",
      type: "string",
      default: "-",
      description: "URL for the logo image"
    },
    {
      name: "logoAlt",
      type: "string",
      default: "Logo",
      description: "Alt text for the logo image"
    },
    {
      name: "items",
      type: "PillNavItem[]",
      default: "-",
      description: "Array of navigation items with label, href, and optional ariaLabel"
    },
    {
      name: "activeHref",
      type: "string",
      default: "undefined",
      description: "The href of the currently active navigation item"
    },
    {
      name: "className",
      type: "string",
      default: "''",
      description: "Additional CSS classes for the navigation container"
    },
    {
      name: "ease",
      type: "string",
      default: "power3.easeOut",
      description: "GSAP easing function for animations"
    },
    {
      name: "baseColor",
      type: "string",
      default: "#fff",
      description: "Base background color for the navigation"
    },
    {
      name: "pillColor",
      type: "string",
      default: "#060010",
      description: "Background color for navigation pills"
    },
    {
      name: "hoveredPillTextColor",
      type: "string",
      default: "#060010",
      description: "Text color when hovering over pills"
    },
    {
      name: "pillTextColor",
      type: "string",
      default: "baseColor",
      description: "Text color for navigation pills"
    },
    {
      name: "onMobileMenuClick",
      type: "() => void",
      default: "undefined",
      description: "Callback function triggered when mobile menu button is clicked"
    },
    {
      name: "initialLoadAnimation",
      type: "boolean",
      default: "false",
      description: "Enable initial load animation for logo scale and nav items reveal"
    }
  ];

  const [theme, setTheme] = useState('light');
  const [initialLoadAnimation, setInitialLoadAnimation] = useState(false);

  const themeConfigs = {
    light: {
      logo: logoLight,
      baseColor: "#000",
      pillColor: "#f0f0f0",
      hoveredPillTextColor: "#fff",
      pillTextColor: "#000",
      backgroundColor: "#f0f0f0"
    },
    dark: {
      logo: logoDark,
      baseColor: "#fff",
      pillColor: "#060010",
      hoveredPillTextColor: "#000",
      pillTextColor: "#fff",
      backgroundColor: "#060010"
    },
    color: {
      logo: logoDark,
      baseColor: "#B19EEF",
      pillColor: "#060010",
      hoveredPillTextColor: "#060010",
      pillTextColor: "#fff",
      backgroundColor: "#060010"
    }
  };

  const currentTheme = themeConfigs[theme];

  const themeOptions = [
    { value: "light", label: "Light Mode" },
    { value: "dark", label: "Dark Mode" },
    { value: "color", label: "Colorful" },
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container demo-container-dots" h={300} overflow="hidden" bg={currentTheme.backgroundColor}>
          <PillNav
            logo={currentTheme.logo}
            baseColor={currentTheme.baseColor}
            pillColor={currentTheme.pillColor}
            hoveredPillTextColor={currentTheme.hoveredPillTextColor}
            pillTextColor={currentTheme.pillTextColor}
            initialLoadAnimation={initialLoadAnimation}
            items={[
              { label: 'Home' },
              { label: 'About' },
              { label: 'Contact' }
            ]}
            activeHref="/"
          />
        </Box>

        <Customize>
          <PreviewSelect
            title="Example"
            options={themeOptions}
            value={theme}
            onChange={setTheme}
            width={150}
          />
          <PreviewSwitch
            title="Initial Load Animation"
            value={initialLoadAnimation}
            onChange={setInitialLoadAnimation}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['gsap']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={pillNav} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...pillNav} />
      </CliTab>
    </TabbedLayout>
  );
};

export default PillNavDemo;