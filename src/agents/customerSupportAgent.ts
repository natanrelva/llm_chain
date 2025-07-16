import { createReactAgent } from "@langchain/langgraph/prebuilt";

import llm from "../models/gemini"
import { HumanMessage } from "@langchain/core/messages";

const customerSupportAgent = createReactAgent({
  llm,
  tools: []
})

export default customerSupportAgent