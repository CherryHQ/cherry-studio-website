import { Flex, Switch, Text } from "@chakra-ui/react";

const PreviewSwitch = ({ title, isChecked, onChange, isDisabled }) => {
  const handleChange = ({ checked }) => onChange?.(checked);

  return (
    <Flex align="center" gap="4" my={6}>
      <Text fontSize="sm">{title}</Text>

      <Switch.Root
        checked={isChecked}
        onCheckedChange={handleChange}
        disabled={isDisabled}
      >
        <Switch.HiddenInput />
        <Switch.Control />
      </Switch.Root>
    </Flex>
  );
};

export default PreviewSwitch;
