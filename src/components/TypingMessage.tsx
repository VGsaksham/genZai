import { useState, useEffect, useRef } from 'react';
import { Box, Text, keyframes } from '@chakra-ui/react';
import type { Message } from '../config/api';

interface TypingMessageProps {
  content: string;
  role: Message['role'];
  onComplete: () => void;
}

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const TypingMessage = ({ content, role, onComplete }: TypingMessageProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const typingSpeed = 30; // milliseconds per character
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentIndex < content.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + content[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [currentIndex, content, onComplete, typingSpeed]);

  return (
    <Box
      ref={boxRef}
      maxW="85%"
      bg={role === 'user' ? 'accent.700' : 'dark.700'}
      color="dark.50"
      p={3}
      borderRadius="xl"
      whiteSpace="pre-wrap"
      fontSize="sm"
      boxShadow="md"
      border="1px solid"
      borderColor={role === 'user' ? 'accent.600' : 'dark.600'}
      minH="40px"
      display="flex"
      alignItems="center"
    >
      <Text>
        {displayedText}
        <Text
          as="span"
          animation={`${blink} 1s step-end infinite`}
          ml={1}
        >
          |
        </Text>
      </Text>
    </Box>
  );
};

export default TypingMessage; 