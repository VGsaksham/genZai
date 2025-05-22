import React, { useState, useEffect } from 'react';
import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useParams } from 'react-router-dom';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import SettingsPage from './pages/SettingsPage';
import {
  defaultConfig
} from './config/api';
import type { ChatConfig } from './config/api';
import { predefinedBots } from './config/bots';
import type { Bot } from './config/bots';
import { getCustomBots } from './utils/localStorageBots';

function App() {
  const [selectedBotId, setSelectedBotId] = useState<string>(predefinedBots[0].id);
  const [currentBotConfig, setCurrentBotConfig] = useState<ChatConfig>(defaultConfig);
  const navigate = useNavigate();
  const params = useParams();
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const bots = [...predefinedBots, ...getCustomBots()];
    const selectedBot = bots.find(bot => bot.id === selectedBotId);

    if (selectedBot) {
      setCurrentBotConfig(selectedBot.config);
    } else {
        console.warn(`Bot with ID ${selectedBotId} not found. Falling back to default.`);
        setSelectedBotId(predefinedBots[0].id);
        setCurrentBotConfig(predefinedBots[0].config);
         navigate(`/chat/${predefinedBots[0].id}`);
    }

    if (params.botId && params.botId !== selectedBotId) {
        setSelectedBotId(params.botId);
    }

  }, [selectedBotId, params.botId, navigate]);

  const handleBotSelect = (botId: string) => {
    setSelectedBotId(botId);
    navigate(`/chat/${botId}`);
  };

  return (
    <Flex h="100vh" w="100vw" overflow="hidden">
      {/* Sidebar - Hidden on mobile */}
      {!isMobile && (
        <Box
          w="260px"
          h="100vh"
          borderRight="1px solid"
          borderColor="dark.700"
        >
          <Sidebar
            selectedBotId={selectedBotId}
            onBotSelect={handleBotSelect}
          />
        </Box>
      )}

      {/* Main Content */}
      <Box flex="1" h="100vh">
        <Routes>
          <Route 
            path="/chat/:botId"
            element={
              <Chat 
                 key={selectedBotId}
                 config={currentBotConfig}
                 onConfigChange={setCurrentBotConfig}
                 selectedBotId={selectedBotId}
                 onBotSelect={handleBotSelect}
               />
            }
          />
          <Route path="/" element={<Navigate to={`/chat/${selectedBotId}`} replace />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Box>
    </Flex>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
