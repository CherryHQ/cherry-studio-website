import { Box, Flex } from '@chakra-ui/react';
import '../../../css/skeleton.css';

export const SkeletonLoader = () => {
  return (
    <Box className="skeleton-loader">
      {/* Tabs */}
      <Flex
        height="36px"
        borderRadius="md"
        mb={6}
        gap={2}
        maxWidth="300px"
      >
        <Box borderRadius="10px" maxWidth="92px" flex="1" height="100%" bg="#0D0716" className="skeleton-pulse" />
        <Box borderRadius="10px" maxWidth="92px" flex="1" height="100%" bg="#0D0716" className="skeleton-pulse" />
        <Box borderRadius="10px" maxWidth="80px" flex="1" height="100%" bg="#0D0716" className="skeleton-pulse" />
      </Flex>

      <Box className="skeleton-content">
        <Box mb={8}>
          <Box
            height="500px"
            bg="#0D0716"
            borderRadius="20px"
            mb={3}
            className="skeleton-pulse"
          />
        </Box>

        <Box
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={4}
          className="skeleton-pulse"
          maxWidth="200px"
        />

        <Box
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={4}
          className="skeleton-pulse"
          maxWidth="300px"
        />

        <Box
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={12}
          className="skeleton-pulse"
          maxWidth="230px"
        />

        <Box
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={4}
          className="skeleton-pulse"
          maxWidth="100px"
        />

        <Box mb={8}>
          <Box
            height="500px"
            bg="#0D0716"
            borderRadius="20px"
            mb={3}
            className="skeleton-pulse"
          />
        </Box>
      </Box>
    </Box>
  );
};

export const GetStartedLoader = () => {
  return (
    <Box className="skeleton-loader">
      <Box className="skeleton-content">
        <Box
          mt={6}
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={4}
          className="skeleton-pulse"
          maxWidth="600px"
        />

        <Box
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={4}
          className="skeleton-pulse"
          maxWidth="500px"
        />

        <Box
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={12}
          className="skeleton-pulse"
          maxWidth="550px"
        />

        <Box
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={4}
          className="skeleton-pulse"
          maxWidth="500px"
        />

        <Box
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={4}
          className="skeleton-pulse"
          maxWidth="400px"
        />

        <Box
          height="60px"
          bg="#0D0716"
          borderRadius="20px"
          mb={4}
          className="skeleton-pulse"
          maxWidth="600px"
        />

        <Box
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={4}
          className="skeleton-pulse"
          maxWidth="450px"
        />

        <Box
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={12}
          className="skeleton-pulse"
          maxWidth="200px"
        />

        <Box
          mt={6}
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={4}
          className="skeleton-pulse"
          maxWidth="350px"
        />

        <Box
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={4}
          className="skeleton-pulse"
          maxWidth="590px"
        />

        <Box
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={12}
          className="skeleton-pulse"
          maxWidth="520px"
        />

        <Box
          height="100px"
          bg="#0D0716"
          borderRadius="20px"
          mb={6}
          className="skeleton-pulse"
          maxWidth="600px"
        />

        <Box
          mt={6}
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={4}
          className="skeleton-pulse"
          maxWidth="600px"
        />

        <Box
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={4}
          className="skeleton-pulse"
          maxWidth="500px"
        />

        <Box
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={12}
          className="skeleton-pulse"
          maxWidth="550px"
        />

        <Box
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={4}
          className="skeleton-pulse"
          maxWidth="500px"
        />

        <Box
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={4}
          className="skeleton-pulse"
          maxWidth="400px"
        />

        <Box
          height="60px"
          bg="#0D0716"
          borderRadius="20px"
          mb={4}
          className="skeleton-pulse"
          maxWidth="600px"
        />

        <Box
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={4}
          className="skeleton-pulse"
          maxWidth="450px"
        />

        <Box
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={12}
          className="skeleton-pulse"
          maxWidth="200px"
        />

        <Box
          mt={6}
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={4}
          className="skeleton-pulse"
          maxWidth="350px"
        />

        <Box
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={4}
          className="skeleton-pulse"
          maxWidth="590px"
        />

        <Box
          height="24px"
          bg="#0D0716"
          borderRadius="20px"
          mb={12}
          className="skeleton-pulse"
          maxWidth="520px"
        />

        <Box
          height="100px"
          bg="#0D0716"
          borderRadius="20px"
          mb={6}
          className="skeleton-pulse"
          maxWidth="600px"
        />

        <Flex
          height="36px"
          borderRadius="md"
          justifyContent="space-between"
          mb={6}
          gap={2}
        >
          <Box borderRadius="10px" maxWidth="92px" flex="1" height="100%" bg="#0D0716" className="skeleton-pulse" />
        </Flex>
      </Box>
    </Box>
  );
};