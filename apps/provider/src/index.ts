import 'dotenv/config';

import { HumanMessage } from '@langchain/core/messages';

import customerSupportAgent from './agents/customerSupportAgent';

const agentFinalState = customerSupportAgent.invoke(
  { messages: [new HumanMessage('Que dia é amanhã?')] },
  { configurable: { thread_id: '42' } }
);

agentFinalState.then((state) => {
  console.log(state.messages[state.messages.length - 1].content);
});
