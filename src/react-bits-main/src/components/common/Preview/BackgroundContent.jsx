import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { TbBackground, TbMenu } from "react-icons/tb";

import PreviewSwitch from "./PreviewSwitch";
import logo from '../../../assets/logos/react-bits-logo.svg';

const BackgroundContent = ({
  pillText = "New Component",
  pillIcon = <TbBackground />,
  headline = "Explore the depths of creativity",
  mainCtaText = "Get Started",
  secondCtaText = "Learn More",
}) => {
  const [showContent, setShowContent] = useState(true);

  return (
    <Box userSelect="none">
      <Box position="absolute" bottom={0} right={6} zIndex={10} opacity={0.5} _hover={{ opacity: 1 }} transition="opacity 0.3s ease" userSelect="none">
        <PreviewSwitch
          title="Demo Content"
          isChecked={showContent}
          onChange={setShowContent}
        />
      </Box>

      {showContent && (
        <>
          <Box position="absolute" top="2em" left={0} width="100%" height="60px" zIndex={0} pointerEvents="none">
            <Box
              margin="0 auto"
              width={{ base: "90%", md: "60%" }}
              height="100%"
              borderRadius="50px"
              py={4}
              px={6}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              bg="rgba(255, 255, 255, 0.05)"
              backdropFilter="blur(10px)"
              border="1px solid rgba(255, 255, 255, 0.2)"
              sx={{
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              }}
            >
              <img src={logo} alt="React Bits Logo" style={{ height: '24px', borderRadius: '50px' }} />

              <Box display={{ base: "flex", md: "none" }} alignItems="center" color="white">
                <TbMenu size={20} />
              </Box>

              <Box display={{ base: "none", md: "flex" }} alignItems="center" gap={6} fontWeight={600}>
                <Text color="white" fontSize="14px" display="flex" alignItems="center">Home</Text>
                <Text color="white" fontSize="14px" display="flex" alignItems="center">Docs</Text>
              </Box>
            </Box>
          </Box>

          <Box position="absolute" top={0} left={0} display="flex" alignItems="center" justifyContent="center" flexDirection="column" width="100%" height="100%" zIndex={1} pointerEvents="none">
            <Box
              color="#fff"
              w="auto"
              px={4} h="34px"
              display="flex"
              fontSize={{ base: "12px", md: "14px" }}
              justifyContent="center"
              alignItems="center"
              borderRadius="50px"
              fontWeight="500"
              bg="rgba(255, 255, 255, 0.05)"
              backdropFilter="blur(10px)"
              border="1px solid rgba(255, 255, 255, 0.2)"
              sx={{
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              }}
            >
              {pillIcon}
              <Text ml={1}>{pillText}</Text>
            </Box>
            <Text textShadow="0 0 16px rgba(0, 0, 0, 0.5)" mt={4} color="white" fontSize="clamp(2rem, 4vw, 2.6rem)" lineHeight="1.2" textAlign="center" letterSpacing="-2px" maxWidth="18ch" fontWeight="bold">
              {headline}
            </Text>

            <Box display="flex" gap={4} mt={8} alignItems="center">
              <Box
                as="button"
                px={{ base: 6, md: 10 }}
                py={{ base: 2, md: 3 }}
                bg="white"
                color="black"
                borderRadius="50px"
                fontSize={{ base: "12px", md: "14px" }}
                fontWeight="500"
                border="none"
                cursor="pointer"
                _hover={{
                  bg: 'gray.100',
                  transform: 'translateY(-1px)',
                }}
                transition="all 0.2s ease"
              >
                {mainCtaText}
              </Box>
              <Box
                as="button"
                px={{ base: 6, md: 10 }}
                py={{ base: 2, md: 3 }}
                borderRadius="50px"
                fontSize={{ base: "12px", md: "14px" }}
                fontWeight="500"
                bg="rgba(255, 255, 255, 0.05)"
                backdropFilter="blur(10px)"
                border="1px solid rgba(255, 255, 255, 0.2)"
                sx={{
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                }}
                color="rgba(255, 255, 255, 0.5)"
                cursor="pointer"
                _hover={{
                  bg: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateY(-1px)',
                }}
                transition="all 0.2s ease"
              >
                {secondCtaText}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default BackgroundContent;