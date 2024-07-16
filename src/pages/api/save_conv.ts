import type { NextApiRequest, NextApiResponse } from "next";
import { initaliseMegaApp } from "@/components/global/megaWrapper";
import fs from "fs"

type Response = {
  httpcode: string;
  data?: any
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  if (req.method != "POST") {
    // Frontend send an invalid request, PANIC
    res.status(400).send({ httpcode: "Bad Request: Unsupported HTTP method" })
    return
  }
  
  await initaliseMegaApp()

}


export const config = {
  maxDuration: 60
}
