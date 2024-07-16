import type { NextApiRequest, NextApiResponse } from "next";
import { getFilesAssociated, initaliseMegaApp } from "@/components/global/megaWrapper";
import { File } from "megajs";
import { Readable } from "stream";

type Data = {
  errcode: string;
  data?: any
};

export const config = {
  maxDuration: 60,
};
 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  await initaliseMegaApp()
  if (req.method != "POST") {
    res.status(400).send({ errcode: "Bad Request: Unsupported HTTP method" })
    return
  }
  const { userDirId, name } = JSON.parse(req.body)
  if (!userDirId || !name) {
    res.status(400).send({ errcode: "Bad Request: UDIR_ID_MS" })
    return
  }
  const files = getFilesAssociated(userDirId)
  const file = files.filter(file => file.name === name)
  const link = await file[0].link({})
  const x = File.fromURL(link)
  const buffer = await x.downloadBuffer({ forceHttps: false })
  res.setHeader("Content-Type", "application/pdf")
  const stream = Readable.from(buffer);
  stream.pipe(res)
}
