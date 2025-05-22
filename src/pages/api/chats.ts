import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../lib/db';
import { Chat } from '../../models/Chat';
import { generateChatName } from '../../utils/chatUtils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  switch (req.method) {
    case 'GET':
      try {
        const chats = await Chat.find({ ipAddress: ip })
          .sort({ updatedAt: -1 })
          .select('name createdAt updatedAt')
          .limit(10);
        res.status(200).json(chats);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch chats' });
      }
      break;

    case 'POST':
      try {
        const { messages } = req.body;
        const chatName = generateChatName(messages[0]?.content || 'New Chat');
        
        const chat = await Chat.create({
          name: chatName,
          messages,
          ipAddress: ip,
        });
        
        res.status(201).json(chat);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create chat' });
      }
      break;

    case 'PUT':
      try {
        const { chatId, messages } = req.body;
        const chat = await Chat.findOneAndUpdate(
          { _id: chatId, ipAddress: ip },
          { messages, updatedAt: new Date() },
          { new: true }
        );
        
        if (!chat) {
          return res.status(404).json({ error: 'Chat not found' });
        }
        
        res.status(200).json(chat);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update chat' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 