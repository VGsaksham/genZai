import OpenAI from 'openai';
import { OPENROUTER_API_KEY, MODEL } from '../config/api';
import type { Message, ChatConfig } from '../config/api';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    'HTTP-Referer': window.location.origin,
    'X-Title': 'GenZai Chat',
  },
});

export const sendMessage = async (
  messages: Message[],
  config: ChatConfig
) => {
  try {
    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: config.systemPrompt },
        ...messages,
      ],
      temperature: config.temperature,
      max_tokens: config.maxTokens,
    });

    if (!completion.choices[0]?.message) {
      throw new Error('Invalid response format from API');
    }

    return {
      role: 'assistant',
      content: completion.choices[0].message.content,
    } as Message;
  } catch (error) {
    console.error('Error sending message:', error);
    if (error instanceof Error) {
      throw new Error(error.message || 'Failed to send message');
    }
    throw error;
  }
}; 