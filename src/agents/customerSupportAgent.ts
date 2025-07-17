import { createReactAgent } from "@langchain/langgraph/prebuilt";

import currentDateTimeTool from "../tools/calendarioTool"

import llm from "../models/gemini"

const customerSupportAgent = createReactAgent({
  llm,
  tools: [currentDateTimeTool]
})

export default customerSupportAgent