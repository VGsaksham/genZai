import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box,
  VStack,
  Text,
  Container,
  Flex,
  IconButton,
  Textarea,
  useToast,
  Heading,
  keyframes,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiSend, FiMenu } from 'react-icons/fi';
import type { Message, ChatConfig } from '../config/api';
import { sendMessage } from '../services/chatService';
import TypingMessage from './TypingMessage';
import Sidebar from './Sidebar';

// Keyframes for the pulsing animation
const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

// Keyframes for the cursor blink
const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

interface ChatProps {
  config: ChatConfig;
  onConfigChange: (config: ChatConfig) => void;
  selectedBotId: string;
  onBotSelect: (botId: string) => void;
}

const Chat = ({ config, onConfigChange, selectedBotId, onBotSelect }: ChatProps) => {
  // State hooks
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typingMessages, setTypingMessages] = useState<{ [key: number]: boolean }>({});

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Chakra hooks
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Responsive values
  const isMobile = useBreakpointValue({ base: true, md: false });
  const containerMaxW = useBreakpointValue({ base: '100%', md: 'container.md' });
  const messageMaxW = useBreakpointValue({ base: '85%', md: '75%' });
  const padding = useBreakpointValue({ base: 2, md: 6 });
  const fontSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const headingSize = useBreakpointValue({ base: '2xl', md: '3xl' });
  const messagePadding = useBreakpointValue({ base: 2, md: 4 });
  const inputPadding = useBreakpointValue({ base: 2, md: 4 });
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'lg' });
  const welcomeTextMaxW = useBreakpointValue({ base: '90%', md: '80%' });
  const inputPy = useBreakpointValue({ base: 2, md: 3 });
  const drawerWidth = useBreakpointValue({ base: '85%', md: 'full' });

  // Callbacks
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSend = useCallback(async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await sendMessage(newMessages, config);
      const messagesWithAiResponse = [...newMessages, aiResponse];
      setMessages(messagesWithAiResponse);
      setTypingMessages(prev => ({ ...prev, [messagesWithAiResponse.length - 1]: true }));
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send message',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  }, [input, messages, config, toast]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const handleTypingComplete = useCallback((index: number) => {
    setTypingMessages(prev => ({ ...prev, [index]: false }));
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  }, []);

  // Effects
  useEffect(() => {
    scrollToBottom();
  }, [messages, typingMessages, scrollToBottom]);

  useEffect(() => {
    if (inputRef.current && input === '') {
      inputRef.current.focus();
    }
  }, [input]);

  const messageBoxStyles = {
    maxW: messageMaxW,
    p: messagePadding,
    borderRadius: 'xl',
    whiteSpace: 'pre-wrap' as const,
    fontSize: fontSize,
    boxShadow: 'md',
    border: '1px solid',
    minH: '40px',
    display: 'flex',
    alignItems: 'center',
  };

  // Render
  return (
    <Container h="100vh" maxW={containerMaxW} py={0} px={0} position="relative">
      <VStack h="full" w="full" spacing={0} bg="dark.900">
        <Flex w="full" justifyContent="space-between" alignItems="center" p={3} bg="dark.900" borderBottom="1px solid" borderColor="dark.700">
          {isMobile && (
            <IconButton
              aria-label="Open menu"
              icon={<FiMenu />}
              variant="ghost"
              colorScheme="accent"
              onClick={onOpen}
              mr={2}
              size="sm"
            />
          )}
          <Heading size="md" color="dark.100">GenZai</Heading>
        </Flex>

        <Box
          flex={1}
          w="full"
          overflowY="auto"
          p={padding}
          css={{
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'dark.800',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'dark.600',
              borderRadius: '3px',
            },
          }}
        >
          {messages.length === 0 ? (
            <Flex h="full" alignItems="center" justifyContent="center">
              <VStack spacing={4}>
                <Heading 
                  color="dark.200" 
                  textAlign="center" 
                  fontSize={headingSize}
                >
                  GenZai Chat
                </Heading>
                <Text 
                  color="dark.400" 
                  textAlign="center" 
                  fontSize="md"
                  maxW={welcomeTextMaxW}
                >
                  Welcome! This is your unique AI chat experience. Feel free to ask anything.
                </Text>
              </VStack>
            </Flex>
          ) : (
            messages.map((message, index) => (
              <Flex
                key={index}
                justifyContent={message.role === 'user' ? 'flex-end' : 'flex-start'}
                mb={6}
                px={inputPadding}
              >
                {typingMessages[index] ? (
                  <TypingMessage
                    content={message.content}
                    role={message.role}
                    onComplete={() => handleTypingComplete(index)}
                  />
                ) : (
                  <Box
                    {...messageBoxStyles}
                    bg={message.role === 'user' ? 'accent.700' : 'dark.700'}
                    color="dark.50"
                    borderColor={message.role === 'user' ? 'accent.600' : 'dark.600'}
                  >
                    {message.content}
                  </Box>
                )}
              </Flex>
            ))
          )}
          {isLoading && (
            <Flex justifyContent="flex-start" mb={6} px={inputPadding}>
              <Box
                {...messageBoxStyles}
                bg="dark.700"
                color="dark.50"
                borderColor="dark.600"
              >
                <Text animation={`${pulse} 1.5s ease-in-out infinite`}>yapping...</Text>
              </Box>
            </Flex>
          )}
          <div ref={messagesEndRef} />
        </Box>

        <Box
          w="full"
          p={inputPadding}
          borderTop="1px solid"
          borderColor="dark.700"
          position="sticky"
          bottom={0}
          bg="dark.900"
          zIndex={1}
        >
          <Flex
            alignItems="center"
            bg="dark.800"
            borderRadius="xl"
            px={inputPadding}
            py={inputPy}
            border="1px solid"
            borderColor="dark.600"
            _focusWithin={{
              borderColor: 'accent.500',
            }}
          >
            <Textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Send a message..."
              resize="none"
              rows={1}
              bg="transparent"
              disabled={isLoading}
              border="none"
              _focus={{ boxShadow: 'none' }}
              color="dark.100"
              _placeholder={{ color: 'dark.400' }}
              p={0}
              fontSize={fontSize}
              minH="unset"
              overflow="hidden"
            />
            <IconButton
              aria-label="Send message"
              icon={<FiSend />}
              onClick={handleSend}
              isLoading={isLoading}
              colorScheme="accent"
              variant="ghost"
              isDisabled={!input.trim() || isLoading}
              size={buttonSize}
              borderRadius="full"
            />
          </Flex>
        </Box>
      </VStack>

      {/* Mobile Sidebar Drawer */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size={drawerWidth}
      >
        <DrawerOverlay />
        <DrawerContent bg="dark.900">
          <DrawerCloseButton color="dark.100" />
          <DrawerHeader borderBottomWidth="1px" borderColor="dark.700">
            <Text color="dark.100">Menu</Text>
          </DrawerHeader>
          <DrawerBody p={0}>
            <Sidebar
              selectedBotId={selectedBotId}
              onBotSelect={(botId) => {
                onBotSelect(botId);
                onClose();
              }}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  );
};

export default Chat; 