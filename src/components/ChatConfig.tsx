import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  VStack,
} from '@chakra-ui/react';
import type { ChatConfig } from '../config/api';

interface ChatConfigProps {
  isOpen: boolean;
  onClose: () => void;
  config: ChatConfig;
  onSave: (config: ChatConfig) => void;
}

const ChatConfigModal = ({ isOpen, onClose, config, onSave }: ChatConfigProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newConfig: ChatConfig = {
      systemPrompt: formData.get('systemPrompt') as string,
      temperature: Number(formData.get('temperature')),
      maxTokens: Number(formData.get('maxTokens')),
    };
    onSave(newConfig);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Chat Configuration</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <VStack gap={4} pb={4}>
              <FormControl>
                <FormLabel>System Prompt</FormLabel>
                <Input
                  name="systemPrompt"
                  defaultValue={config.systemPrompt}
                  placeholder="Enter system prompt"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Temperature</FormLabel>
                <NumberInput
                  name="temperature"
                  defaultValue={config.temperature}
                  min={0}
                  max={2}
                  step={0.1}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>Max Tokens</FormLabel>
                <NumberInput
                  name="maxTokens"
                  defaultValue={config.maxTokens}
                  min={1}
                  max={4000}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <Button type="submit" colorScheme="blue" width="full">
                Save Configuration
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ChatConfigModal; 