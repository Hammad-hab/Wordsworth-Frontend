// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { genericChat } from "@/components/global/gemini_ai_endpoint"
import { Dateify, toJSON, yearsBetween } from "@/components/global/interfaces";
import { Prompt } from "@/components/global/ai_endpoint/GoogleBooksEndpoint";
type Data = {
  ai_prompt: string | { type: string, content: string }[]
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
    if (req.method !== "POST") {
      res.status(400).send({ ai_prompt: "Bad Request: Unsupported HTTP method" })
      return
    }
    const { prompt, user_information } = JSON.parse(req.body)
    if (!user_information.birthdate || !user_information) {
      res.status(400).send({ai_prompt: "Bad Request, incomplete user information"})
    }
    const promptObject = new Prompt(prompt)
    promptObject.insertHint("User Information", JSON.stringify(user_information)) // App Hints allow the app to insert information into the prompt
    promptObject.insertHint("User Age", yearsBetween(Dateify(user_information.birthdate))) // App Hints allow the app to insert information into the prompt
    const chat_response = await genericChat.sendMessage(promptObject.getValue)
    if (chat_response.response.text().trim().startsWith("REQ_BOOK_INFO")) {
       // the AI needs more information

    }

    res.status(200).send({ai_prompt: toJSON(chat_response.response.text())})
}
