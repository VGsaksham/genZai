import { Box, VStack, Text, Flex, Button, Divider, Tooltip } from '@chakra-ui/react';
import { FiPlus, FiSettings, FiCompass, FiUser, FiMessageSquare } from 'react-icons/fi';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { predefinedBots } from '../config/bots';
import type { Bot } from '../config/bots';
import { getCustomBots } from '../utils/localStorageBots';
import AddBotModal from './AddBotModal';
import { useDisclosure } from '@chakra-ui/react';

interface SidebarProps {
  selectedBotId: string;
  onBotSelect: (botId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedBotId, onBotSelect }) => {
  const [bots, setBots] = useState<Bot[]>([]);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const allBots = [...predefinedBots, ...getCustomBots()];
    setBots(allBots);
  }, [isOpen]);

  const handleNewChatClick = () => {
    const defaultBotId = predefinedBots[0].id;
    onBotSelect(defaultBotId);
  };

  const handleBotAdded = () => {
    const allBots = [...predefinedBots, ...getCustomBots()];
    setBots(allBots);
  };

  return (
    <Box
      as="aside"
      position="fixed"
      top={0}
      left={0}
      h="100vh"
      w="260px"
      bg="linear-gradient(180deg, rgba(17, 17, 17, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)"
      backdropFilter="blur(20px)"
      color="white"
      zIndex={10}
      borderRight="1px solid"
      borderColor="rgba(255, 255, 255, 0.05)"
      display="flex"
      flexDirection="column"
      py={5}
      px={3}
      boxShadow="0 0 40px rgba(0, 0, 0, 0.3)"
    >
      {/* Logo */}
      <Flex alignItems="center" justifyContent="center" mb={6}>
        <Text 
          fontSize="xl" 
          fontWeight="bold" 
          bgGradient="linear(to-r, #E2E8F0, #A0AEC0)"
          bgClip="text"
          letterSpacing="tight"
        >
          GenZai
        </Text>
      </Flex>

      {/* New Chat/Select Default Bot Button with Tooltip */}
      <Tooltip label="Once reset, old chat cannot be returned" placement="right" hasArrow bg="black" color="white">
        <Button
          w="full"
          h="42px"
          bg="rgba(255, 255, 255, 0.03)"
          color="gray.300"
          _hover={{
            bg: 'rgba(255, 255, 255, 0.05)',
            transform: 'translateY(-1px)',
          }}
          _active={{
            bg: 'rgba(255, 255, 255, 0.07)',
          }}
          borderRadius="lg"
          leftIcon={<FiPlus size="16px" />}
          fontSize="sm"
          fontWeight="medium"
          transition="all 0.2s"
          mb={2}
          onClick={handleNewChatClick}
        >
          New Chat (Default Bot)
        </Button>
      </Tooltip>

      <Divider borderColor="rgba(255, 255, 255, 0.05)" my={2} />

      {/* Scrollable Bots List */}
      <Box flex="1" overflowY="auto" pr={1}
         css={{
          '&::-webkit-scrollbar': {
            width: '3px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '2px',
          },
        }}
      >
        <VStack align="stretch" spacing={1}>
          <Text fontSize="xs" color="gray.500" fontWeight="medium" mb={1} px={2}>
            BOTS
          </Text>
          {bots.length === 0 ? (
            <Text color="gray.500" px={2}>No bots available</Text>
          ) : (
            bots.map((bot) => (
              <ChakraLink
                key={bot.id}
                as={ReactRouterLink}
                to={`/chat/${bot.id}`}
                _hover={{ textDecoration: 'none' }}
                onClick={() => onBotSelect(bot.id)}
              >
                <Flex
                  alignItems="center"
                  p={2}
                  borderRadius="md"
                  bg={selectedBotId === bot.id ? 'rgba(255, 255, 255, 0.1)' : 'transparent'}
                  _hover={{
                    bg: selectedBotId === bot.id ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  }}
                  cursor="pointer"
                  transition="all 0.2s"
                >
                   <FiMessageSquare size="14px" style={{ marginRight: '10px' }} color="#718096" />
                  <Text fontSize="sm" color="gray.400" noOfLines={1}>
                    {bot.name}
                  </Text>
                </Flex>
              </ChakraLink>
            ))
          )}
        </VStack>
      </Box>

         {/* Add Bot Button */}
        <Button
          w="full"
          h="42px"
          bg="rgba(255, 255, 255, 0.03)"
          color="gray.300"
          _hover={{
            bg: 'rgba(255, 255, 255, 0.05)',
            transform: 'translateY(-1px)',
          }}
          _active={{
            bg: 'rgba(255, 255, 255, 0.07)',
          }}
          borderRadius="lg"
          leftIcon={<FiPlus size="16px" />}
          fontSize="sm"
          fontWeight="medium"
          transition="all 0.2s"
          mt={4}
          onClick={onOpen}
        >
          Add Custom Bot
        </Button>

      {/* Bottom Navigation */}
      <VStack align="stretch" spacing={0} pt={4} borderTop="1px solid" borderColor="rgba(255, 255, 255, 0.05)">
        {[
          { icon: FiCompass, text: 'Explore', to: '#' },
          { icon: FiSettings, text: 'Settings', to: '/settings' },
          { icon: FiUser, text: 'Account', to: '#' }
        ].map((item, index) => (
          <ChakraLink key={index} as={ReactRouterLink} to={item.to} _hover={{ textDecoration: 'none' }}>
            <Flex
              alignItems="center"
              p={2}
              borderRadius="md"
              _hover={{
                bg: 'rgba(255, 255, 255, 0.03)',
              }}
              transition="all 0.2s"
            >
              <item.icon size="16px" style={{ marginRight: '10px' }} color="#718096" />
              <Text fontSize="sm" color="gray.400">
                {item.text}
              </Text>
            </Flex>
          </ChakraLink>
        ))}
      </VStack>
      <AddBotModal isOpen={isOpen} onClose={onClose} onBotAdded={handleBotAdded} />
    </Box>
  );
};

export default Sidebar; 