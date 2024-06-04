import { GoogleGenerativeAI, EnhancedGenerateContentResponse } from "@google/generative-ai";
import inst from "dotenv"
// import * as fs from "fs"
inst.config()
// const fileToGenerativePart = (path: string, mimeType: any) => {
//     return {
//       inlineData: {
//         data: Buffer.from(fs.readFileSync(path)).toString("base64"),
//         mimeType
//       },
//     };
// }

const MODEL_TYPE = "gemini-1.5-flash"
const instance = new GoogleGenerativeAI(process.env.API_KEY ?? "");
const model = instance.getGenerativeModel({ model: MODEL_TYPE});
const genericChat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "For the rest of the conversation you will reply in XML. The response should be in the following manner: <response><reply><!--Your reply here---></reply></response>. If the content includes lists, use ol or ul and li respectively and if the reply includes images, insert an <img> tag in the reply to show that there is an image. Do not include anything else." }],
      },
      {
        role: "model",
        parts: [{ text: "<response><reply>Agreed, for the rest of this chat I will reply in XML</reply></response>" }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 500,
    },
});

async function generateContent(request: string, embed:boolean=true): Promise<EnhancedGenerateContentResponse> {
  const instance = new GoogleGenerativeAI("AIzaSyCvUg-SY1Xp2hEAN54xECBT8tTQplhO03g");
  const model = instance.getGenerativeModel({ model: MODEL_TYPE});
    const pre_req = `For the rest of the conversation you will reply in XML. The response should be in the following manner: <response><reply><!--Your reply here---></reply></response>. If the content includes lists, use ol or ul and li respectively and if the reply includes images, insert an <img> tag in the reply to show that there is an image. Do not include anything else. Now tell me:`
    if (embed) {
      const res = await model.generateContent(pre_req + request)
      return res.response;
    } else {
      const res = await model.generateContent(request)
      return res.response
    }
      
}

async function PromptAIConversation(request:string): Promise<EnhancedGenerateContentResponse> {
    const res = await genericChat.sendMessage(request)
    const response_ = await res.response;
    return response_
}

export {
    MODEL_TYPE,
    instance,
    model,
    // fileToGenerativePart,
    PromptAIConversation,
    generateContent
}