import type { ChatConfig } from './api';

// Import individual bot configurations
import { genzaiBot } from './predefinedBots/genzai';
import { brainRotBot } from './predefinedBots/brainRot';
import { cringyBot } from './predefinedBots/cringy';
import { genZBibleBot } from './predefinedBots/genZBible';

export interface Bot {
  id: string;
  name: string;
  description: string;
  config: ChatConfig;
}

// Export predefined bots as an array
export const predefinedBots: Bot[] = [
  genzaiBot,
  brainRotBot,
  cringyBot,
  genZBibleBot,
];

// Removed direct bot definitions 