import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { TbBug, TbBulb } from "react-icons/tb";
import { useParams } from "react-router-dom";

const ContributionSection = () => {
  const { subcategory, category } = useParams();

  return (
    <Box className="contribute-container">
      <Text fontSize={{ base: '1rem', md: '1.65rem' }} color="#B19EEF" className="demo-title-contribute">Help improve this component!</Text>
      <Flex
        gap={2}
        justifyContent="center"
        alignItems="center"
        direction={{ base: "column", md: "row" }}
      >
        <Button
          cursor="pointer"
          as="a"
          href={`https://github.com/DavidHDev/react-bits/issues/new?template=1-bug-report.yml&title=${encodeURIComponent(`[BUG]: ${category}/${subcategory}`)}&labels=bug`}
          rel="noreferrer"
          target="_blank"
          fontSize="xs"
          bg="#170D27"
          borderRadius="10px"
          border="1px solid #271E37"
          _hover={{ bg: "#271E37" }}
          color="#fff"
          h={10}
          w={{ base: '90%', md: 'auto' }}
        >
          <Icon as={TbBug} />
          &nbsp;Report an issue
        </Button>
        <Text mx={2} color="#a1a1aa" display={{ base: 'none', md: 'inline' }}>
          or
        </Text>
        <Button
          cursor="pointer"
          as="a"
          href={`https://github.com/DavidHDev/react-bits/issues/new?template=2-feature-request.yml&title=${encodeURIComponent(`[FEAT]: ${category}/${subcategory}`)}&labels=enhancement`}
          rel="noreferrer"
          target="_blank"
          fontSize="xs"
          bg="#170D27"
          borderRadius="10px"
          border="1px solid #271E37"
          _hover={{ bg: "#271E37" }}
          color="#fff"
          h={10}
          w={{ base: '90%', md: 'auto' }}
        >
          <Icon as={TbBulb} />
          &nbsp;Request a feature
        </Button>
      </Flex>
    </Box>
  );
};

export default ContributionSection;
