import type { NextApiRequest, NextApiResponse } from "next";
import { getFilesAssociated, initaliseMegaApp } from "@/components/global/megaWrapper";
import { MegaFile } from "@/components/global/interfaces";

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
  const { userDirId } = JSON.parse(req.body)
  if (!userDirId) {
    res.status(400).send({ errcode: "Bad Request: UDIR_ID_MS" })
    return
  }
  const files = getFilesAssociated(userDirId)
  let filelist: MegaFile[] = []

  for (const file of files) {
      filelist.push({
        name: file.name!,
        size: file.size!,
      })
  }
  res.status(200).send({errcode: "None", data: filelist})
}
