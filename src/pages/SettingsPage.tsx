import { Box, Heading, Text, Container } from '@chakra-ui/react';

const SettingsPage = () => {
  return (
    <Container maxW="container.md" py={8}>
      <Box bg="dark.800" p={8} borderRadius="lg" boxShadow="xl">
        <Heading size="xl" mb={4} color="dark.100">Settings</Heading>
        <Text color="dark.300">This is a placeholder for the settings page.</Text>
        {/* Add actual settings components here later */}
      </Box>
    </Container>
  );
};

export default SettingsPage; 