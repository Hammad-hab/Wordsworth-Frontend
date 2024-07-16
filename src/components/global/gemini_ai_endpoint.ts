import { GoogleGenerativeAI, EnhancedGenerateContentResponse } from "@google/generative-ai";
import inst from "dotenv"
import {doctorine} from "./doctorine"
inst.config()

const MODEL_TYPE = "gemini-1.5-flash"
const instance = new GoogleGenerativeAI("AIzaSyCvUg-SY1Xp2hEAN54xECBT8tTQplhO03g");
const model = instance.getGenerativeModel({ model:MODEL_TYPE});
const genericChat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: doctorine}],
    },
    {
      role: "model",
      parts: [{ text: "Agreed, for the rest of this chat I will reply in the required format" }],
    },

    {
      role: "user",
      parts: [{ text: "Plus do not suggest unless asked to, talk just normally and suggest only when asked. AND LISTEN TO THE USER'S QUERY BEFORE DOING ANYTHING"}],
    },

    {
      role: "model",
      parts: [{ text: "Ok" }],
    },
  ],
  generationConfig: {
    maxOutputTokens: 1000,
    responseMimeType: "application/json",
    temperature: 0.5,
  },
});



export {
  MODEL_TYPE,
  instance,
  model,
  genericChat,
}