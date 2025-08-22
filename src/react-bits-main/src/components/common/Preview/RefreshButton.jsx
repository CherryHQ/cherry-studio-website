import { Button, Icon } from '@chakra-ui/react';
import { FiRefreshCw } from 'react-icons/fi';

const RefreshButton = ({ onClick }) => {
  return (
    <Button
      transition="background-color 0.3s ease"
      _active={{ backgroundColor: '#271E37' }}
      _hover={{ backgroundColor: '#271E37' }}
      backgroundColor='#170D27'
      position="absolute"
      onClick={onClick}
      border="1px solid #392e4e"
      zIndex={2}
      color="white"
      rounded="xl"
      right={3}
      size="md"
      top={3}
      p={2}
    >
      <Icon as={FiRefreshCw} boxSize={4} />
    </Button>
  );
}

export default RefreshButton;