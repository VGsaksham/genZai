export function generateChatName(firstMessage: string): string {
  // Take first 30 characters of the first message
  const baseName = firstMessage.slice(0, 30).trim();
  
  // Add a random adjective
  const adjectives = [
    'Cool', 'Epic', 'Lit', 'Fire', 'Sick', 'Dope', 'Rad', 'Chill',
    'Wild', 'Crazy', 'Fresh', 'Smooth', 'Clean', 'Sharp', 'Crisp'
  ];
  
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  
  // Add a random emoji
  const emojis = ['🔥', '💯', '✨', '🚀', '💪', '👊', '🎯', '💫', '⚡', '🌟'];
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  
  return `${randomAdjective} ${baseName} ${randomEmoji}`;
} 