# Modern Chatbot with DeepSeek R1

A modern, configurable chatbot built with React and TypeScript that uses the DeepSeek R1 model through OpenRouter.

## Features

- Modern, responsive UI built with Chakra UI
- Configurable system prompt, temperature, and max tokens
- Real-time chat interface with message history
- Support for markdown formatting in messages
- Dark/light mode support

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenRouter API key:
   ```
   VITE_OPENROUTER_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Configuration

The chatbot can be configured through the settings panel (click the gear icon in the top right):

- **System Prompt**: The initial prompt that sets the behavior of the AI
- **Temperature**: Controls the randomness of the responses (0.0 to 2.0)
- **Max Tokens**: Maximum length of the response

## Usage

1. Type your message in the input field at the bottom
2. Press Enter or click the send button to send your message
3. The AI will respond in real-time
4. Use the settings panel to customize the AI's behavior

## Technologies Used

- React
- TypeScript
- Chakra UI
- OpenRouter API
- DeepSeek R1 Model

## License

MIT
