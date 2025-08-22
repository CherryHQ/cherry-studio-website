import { Flex, Slider, Text } from "@chakra-ui/react";

const PreviewSlider = ({
  title = "",
  min = 0,
  max = 100,
  step = 1,
  value = 0,
  valueUnit = "",
  width = 150,
  isDisabled = false,
  onChange,
}) => {
  const handleChange = ({ value: next }) => onChange?.(next[0]);

  return (
    <Flex gap="4" align="center" my={6}>
      <Text fontSize="sm">{title}</Text>
      <Slider.Root
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={handleChange}
        width={`${width}px`}
        disabled={isDisabled}
      >
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>

      <Text fontSize="sm">
        {value}
        {valueUnit}
      </Text>
    </Flex>
  );
};

export default PreviewSlider;
