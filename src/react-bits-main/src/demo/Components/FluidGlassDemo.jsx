import { CodeTab, PreviewTab, CliTab, TabbedLayout } from "../../components/common/TabbedLayout";
import { Box } from "@chakra-ui/react";
import { useState } from "react";

import Customize from "../../components/common/Preview/Customize";
import CodeExample from "../../components/code/CodeExample";
import CliInstallation from "../../components/code/CliInstallation";
import PropTable from "../../components/common/Preview/PropTable";
import Dependencies from '../../components/code/Dependencies';
import useForceRerender from "../../hooks/useForceRerender";
import PreviewSelect from "../../components/common/Preview/PreviewSelect";
import PreviewSlider from "../../components/common/Preview/PreviewSlider";

import { fluidGlass } from '../../constants/code/Components/fluidGlassCode';
import FluidGlass from "../../content/Components/FluidGlass/FluidGlass";

const FluidGlassDemo = () => {
  const [key, forceRerender] = useForceRerender();
  const [mode, setMode] = useState('lens');

  const [scale, setScale] = useState(0.25);
  const [ior, setIor] = useState(1.15);
  const [thickness, setThickness] = useState(2);
  const [transmission, setTransmission] = useState(1);
  const [roughness, setRoughness] = useState(0);
  const [chromaticAberration, setChromaticAberration] = useState(0.05);
  const [anisotropy, setAnisotropy] = useState(0.01);

  const modeOptions = [
    { value: 'lens', label: 'Lens' },
    { value: 'bar', label: 'Bar' },
    { value: 'cube', label: 'Cube' }
  ];

  const handleModeChange = (newMode) => {
    setMode(newMode);

    if (newMode === 'bar') {
      setScale(0.15);
      setTransmission(1);
      setRoughness(0);
      setThickness(10);
      setIor(1.15);
    } else if (newMode === 'lens' || newMode === 'cube') {
      setScale(0.25);
      setIor(1.15);
      setThickness(5);
      setChromaticAberration(0.1);
      setAnisotropy(0.01);
    }

    forceRerender();
  };

  const getModeProps = () => {
    const baseProps = {
      scale,
      ior,
      thickness,
      chromaticAberration,
      anisotropy,
    };

    if (mode === 'bar') {
      return {
        ...baseProps,
        transmission,
        roughness,
        color: '#ffffff',
        attenuationColor: '#ffffff',
        attenuationDistance: 0.25,
      };
    }

    return baseProps;
  };

  const propData = [
    {
      name: "mode",
      type: "string",
      default: "'lens'",
      description: "Display mode of the fluid glass effect. Options: 'lens', 'bar', 'cube'"
    },
    {
      name: "lensProps",
      type: "object",
      default: "{}",
      description: "Props specific to lens mode including material properties like ior, thickness, transmission"
    },
    {
      name: "barProps",
      type: "object",
      default: "{}",
      description: "Props specific to bar mode including navItems array and material properties"
    },
    {
      name: "cubeProps",
      type: "object",
      default: "{}",
      description: "Props specific to cube mode including material properties and interaction settings"
    }
  ];

  return (
    <TabbedLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} p={0} overflow="hidden">
          <FluidGlass
            key={key}
            mode={mode}
            lensProps={mode === 'lens' ? getModeProps() : {}}
            barProps={mode === 'bar' ? getModeProps() : {}}
            cubeProps={mode === 'cube' ? getModeProps() : {}}
          />
        </Box>

        <Customize>
          <PreviewSelect
            title="Mode:"
            options={modeOptions}
            value={mode}
            onChange={handleModeChange}
            width={120}
          />

          <PreviewSlider
            title="Scale:"
            min={0.05}
            max={0.5}
            step={0.05}
            value={scale}
            onChange={setScale}
            width={150}
          />

          <PreviewSlider
            title="IOR:"
            min={1.0}
            max={2.0}
            step={0.05}
            value={ior}
            onChange={setIor}
            width={150}
          />

          <PreviewSlider
            title="Thickness:"
            min={1}
            max={20}
            step={1}
            value={thickness}
            onChange={setThickness}
            width={150}
          />

          <PreviewSlider
            title="Chromatic Aberration:"
            min={0}
            max={0.5}
            step={0.01}
            value={chromaticAberration}
            onChange={setChromaticAberration}
            width={150}
          />

          <PreviewSlider
            title="Anisotropy:"
            min={0}
            max={0.1}
            step={0.01}
            value={anisotropy}
            onChange={setAnisotropy}
            width={150}
          />

          {mode === 'bar' && (
            <>
              <PreviewSlider
                title="Transmission:"
                min={0}
                max={1}
                step={0.1}
                value={transmission}
                onChange={setTransmission}
                width={150}
              />

              <PreviewSlider
                title="Roughness:"
                min={0}
                max={1}
                step={0.1}
                value={roughness}
                onChange={setRoughness}
                width={150}
              />
            </>
          )}
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['three', '@react-three/fiber', '@react-three/drei', 'maath']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={fluidGlass} />
      </CodeTab>

      <CliTab>
        <CliInstallation {...fluidGlass} />
      </CliTab>
    </TabbedLayout>
  );
};

export default FluidGlassDemo;