import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

export default new ChatGoogleGenerativeAI({
  model: 'gemini-2.0-flash',
  temperature: 0,
  maxRetries: 2,
});
