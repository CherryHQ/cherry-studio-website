import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { synthwave84 } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiCopy, FiCheckSquare } from "react-icons/fi";
import { RiEmotionSadLine } from 'react-icons/ri';

const CodeHighlighter = ({ language, codeString, showLineNumbers = true, maxLines = 25 }) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  };

  const codeLines = codeString?.split('\n').length;
  const shouldCollapse = codeLines > maxLines;

  return (
    <Box position="relative" mb={5}>
      <Box
        position="relative"
        overflow="hidden"
        maxHeight={shouldCollapse && !expanded ? 'calc(1.2em * ' + maxLines + ')' : 'none'}
      >
        {codeString &&
          <SyntaxHighlighter
            language={language}
            style={synthwave84}
            showLineNumbers={showLineNumbers}
            className="code-highlighter"
          >
            {codeString}
          </SyntaxHighlighter>
        }

        {!codeString &&
          <Flex alignItems="center" gap={2} my={2} color="#a1a1aa">
            <Text>Nothing here yet!</Text>
            <Icon as={RiEmotionSadLine} />
          </Flex>
        }

        {shouldCollapse && !expanded && (
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            height="60%"
            background="linear-gradient(to bottom, transparent, #060010)"
          />
        )}

        {shouldCollapse && (
          <Button
            position="absolute"
            bottom={shouldCollapse && !expanded ? '.75rem' : '2.25rem'}
            right={shouldCollapse && !expanded ? '.75rem' : '1.75rem'}
            rounded="xl"
            height='2.5rem'
            fontWeight={500}
            backgroundColor="#060010"
            border="1px solid #392e4e"
            color="white"
            _hover={{ backgroundColor: '#111' }}
            _active={{ backgroundColor: '#111' }}
            zIndex={2}
            onClick={() => setExpanded(prev => !prev)}
          >
            {expanded ? 'Collapse Snippet' : 'See Full Snippet'}
          </Button>
        )}
      </Box>

      {codeString &&
        <Button
          position="absolute"
          top={4}
          right=".6em"
          borderRadius="8px"
          fontWeight={500}
          backgroundColor={copied ? '#6CC75D' : '#060010'}
          border="1px solid #392e4e"
          color={copied ? 'black' : 'white'}
          _hover={{ backgroundColor: copied ? '#6CC75D' : '#271E37' }}
          _active={{ backgroundColor: '#5227FF' }}
          transition="background-color 0.3s ease"
          onClick={handleCopy}
        >
          {copied
            ? <Icon as={FiCheckSquare} color="#fff" boxSize={4}/>
            : <Icon as={FiCopy} color="#fff" boxSize={4}/>
          }
        </Button>
      }
    </Box>
  );
};

export default CodeHighlighter;
