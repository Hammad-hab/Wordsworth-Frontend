// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {generateContent} from "@/components/global/gemini_ai_endpoint"
import {auth} from "@/components/global/firebase"
import { UserInformation } from "@/components/global/firestore";

type Data = {
  errcode: string;
  data?: any
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method != "POST") {
    res.status(400).send({errcode: "Bad Request: Unsupported HTTP method"})
    return
  }
  const requestData: UserInformation = (req.body)

  
  auth.onAuthStateChanged((usr) => {
    if (auth.currentUser) {
       generateContent(`Guess the hobbies of a ${requestData.gender} Gender person who was born on ${requestData.birthdate} who likes ${JSON.stringify(requestData.preferences)} novels at least 20 and include an \`None of these\` option. Return as a JSON list. Don't provide anything else. No other text, just a json list. They should be at least 20. Beware of inappropriate date and genres.`, false)
      .then(hobbies => {

        res.status(200).send({data: hobbies, errcode: ""})
      })
    } else  {
      console.log(auth.currentUser)
      res.status(400).send({errcode: "Bad request: User not signed in!"})
      return
    } 
  })
}
