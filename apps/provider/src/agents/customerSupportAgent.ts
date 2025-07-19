import { createReactAgent } from '@langchain/langgraph/prebuilt';

import llm from '../models/gemini';
import currentDateTimeTool from '../tools/calendarioTool';

const customerSupportAgent = createReactAgent({
  llm,
  tools: [currentDateTimeTool]
});

export default customerSupportAgent;
