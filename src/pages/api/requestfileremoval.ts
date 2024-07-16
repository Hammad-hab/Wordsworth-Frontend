import type { NextApiRequest, NextApiResponse } from "next";
import { getFilesAssociated, initaliseMegaApp } from "@/components/global/megaWrapper";
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
    res.status(400).send({errcode: "Bad Request: Unsupported HTTP method"})
    return
  }
  const {userDirId, name} = JSON.parse(req.body)
  if (!userDirId || !name) {
    res.status(400).send({errcode: "Bad Request: UDIR_ID_MS"})
    return
  }
  const files = getFilesAssociated(userDirId)
  let totalReturnSize = 0;
  let didRemoveFile = false
  files.forEach(({size}) => totalReturnSize += (size ?? 0))
  for (const file of files) {
      if (file.name === name) {
        file.delete(true).then(() => {
              totalReturnSize -= file.size!
              res.status(200).send({errcode: "Done", data: totalReturnSize})
              return
        }).catch((reason) => {
          res.status(500).send({errcode: reason})
        })
        return
      }
  }

}
