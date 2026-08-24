import { ChatMistralAI } from "@langchain/mistralai";
import dotenv from "dotenv";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";

dotenv.config();

const model = new ChatMistralAI({
  model: "mistral-large-latest",
  temperature: 0.5,
  apiKey: process.env.MISTRAL_API_KEY,
  maxRetries: 2
})

async function generateResponse(messages){
    let response = await model.invoke(
        messages.map((message)=>{
            if(message.role==="user"){
                return new HumanMessage(message.content)
            }
            else if(message.role==="ai"){
                return new AIMessage(message.content)
            }
        })
        );
    return response.content;
}

async function generateChatTitle(message){
     let response = await model.invoke(
        [new SystemMessage(`The user will provide you message, based on the message generate a title which should be concise and should be describing the thing in the message.
            The generate title should be for 3-4 words.
            `),
            new HumanMessage(`
                Generate a title based on this message:
                ${message}`)
        ]
        );
    return response.content;
}

export {
    generateResponse,
    generateChatTitle
}





