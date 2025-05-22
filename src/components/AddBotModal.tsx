import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { addCustomBot, generateBotId } from '../utils/localStorageBots';

interface AddBotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBotAdded: () => void; // Callback to notify parent when a bot is added
}

const AddBotModal: React.FC<AddBotModalProps> = ({ isOpen, onClose, onBotAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState(''); // Add description field
  const [systemPrompt, setSystemPrompt] = useState('');
  const toast = useToast();

  const handleSaveBot = () => {
    if (!name || !systemPrompt) {
      toast({
        title: 'Missing Information',
        description: 'Please provide both a name and a system prompt for the bot.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });
      return;
    }

    const newBot = {
      id: generateBotId(name), // Generate a unique ID
      name: name,
      description: description, // Include description
      config: {
        systemPrompt: systemPrompt,
        temperature: 0.7, // Default temperature, could be added to form later
        maxTokens: 500, // Default maxTokens, could be added to form later
      },
    };

    addCustomBot(newBot);

    toast({
      title: 'Bot Added!',
      description: `Custom bot \'${name}\' has been added.`, // Use name in toast
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'bottom-right',
    });

    // Reset form fields
    setName('');
    setDescription('');
    setSystemPrompt('');
    onBotAdded(); // Notify parent to refresh the list
    onClose(); // Close the modal
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'
      />
      <ModalContent bg="dark.700" color="dark.50" borderRadius="md" boxShadow="lg">
        <ModalHeader borderBottom="1px solid" borderColor="dark.600">Add Custom Bot</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Bot Name</FormLabel>
              <Input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                bg="dark.800"
                borderColor="dark.600"
                _hover={{ borderColor: "dark.500" }}
                _focus={{ borderColor: "accent.500", boxShadow: "0 0 0 1px accent.500" }}
                color="dark.100"
                placeholder="e.g., Sarcastic Bot"
              />
            </FormControl>
            <FormControl>
               <FormLabel>Description (Optional)</FormLabel>
               <Input 
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 bg="dark.800"
                 borderColor="dark.600"
                 _hover={{ borderColor: "dark.500" }}
                 _focus={{ borderColor: "accent.500", boxShadow: "0 0 0 1px accent.500" }}
                 color="dark.100"
                 placeholder="A brief description of the bot."
               />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>System Prompt</FormLabel>
              <Textarea 
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                bg="dark.800"
                borderColor="dark.600"
                _hover={{ borderColor: "dark.500" }}
                _focus={{ borderColor: "accent.500", boxShadow: "0 0 0 1px accent.500" }}
                color="dark.100"
                placeholder="Define the bot's personality and instructions..."
                size="sm"
                rows={6}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter borderTop="1px solid" borderColor="dark.600">
          <Button variant="ghost" onClick={onClose} color="dark.200" _hover={{ bg: "dark.600" }}>Cancel</Button>
          <Button colorScheme="accent" ml={3} onClick={handleSaveBot}>
            Save Bot
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddBotModal; 