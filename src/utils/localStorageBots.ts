import type { Bot } from '../config/bots';

const CUSTOM_BOTS_STORAGE_KEY = 'customBots';

export const getCustomBots = (): Bot[] => {
  const storedBots = localStorage.getItem(CUSTOM_BOTS_STORAGE_KEY);
  if (storedBots) {
    try {
      // Validate if the parsed data is an array of Bots (basic check)
      const bots = JSON.parse(storedBots);
      if (Array.isArray(bots) && bots.every(bot => typeof bot.id === 'string' && typeof bot.name === 'string' && typeof bot.description === 'string' && typeof bot.config === 'object')) {
        return bots;
      } else {
        console.error('Invalid data found in localStorage for custom bots.');
        return [];
      }
    } catch (error) {
      console.error('Error parsing custom bots from localStorage:', error);
      return [];
    }
  }
  return [];
};

export const addCustomBot = (bot: Bot) => {
  const currentBots = getCustomBots();
  // Prevent adding bots with duplicate IDs
  if (currentBots.some(existingBot => existingBot.id === bot.id)) {
      console.warn(`Bot with ID ${bot.id} already exists.`);
      return;
  }
  const newBots = [...currentBots, bot];
  localStorage.setItem(CUSTOM_BOTS_STORAGE_KEY, JSON.stringify(newBots));
};

export const removeCustomBot = (botId: string) => {
  const currentBots = getCustomBots();
  const filteredBots = currentBots.filter(bot => bot.id !== botId);
  localStorage.setItem(CUSTOM_BOTS_STORAGE_KEY, JSON.stringify(filteredBots));
};

// Helper to generate a simple unique ID (for custom bots)
export const generateBotId = (name: string): string => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') + '-' + Date.now();
}; 