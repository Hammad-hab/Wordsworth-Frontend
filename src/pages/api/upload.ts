import type { NextApiRequest, NextApiResponse } from "next";
import { globalStorage,initaliseMegaApp,uploadMegaApp } from "@/components/global/megaWrapper";
import { IncomingForm } from 'formidable';
import { btmb_legacy as btmb, extractFormidableFileData } from "@/components/global/superglobals";
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

  const form = new IncomingForm();
  // initalise the app
  await initaliseMegaApp()
  /* there are saftey mechanisms within this functions implementing a singlton, allowing only one instance
    of the app to exist at the same time, redundant calls will not be noticed*/
  try {
    const [fields, raw_files] = await form.parse(req) // parse the request and get the files contained within
    // Helper function defined in superglobals.ts
    const files = extractFormidableFileData(raw_files)

    /* Section: Validation */
    if (files.size <= 0) 
       // if the client sends an empty formData element, 
       return res.status(400).send({httpcode: "Client sent invalid request. Files are missing"})
    
    if (!fields?.userDirId && !fields?.userDirId?.length || fields?.userDirId[0] === 'undefined') 
        // TODO: Create a better validation method to prevent attackers from uploading files //
        // Sender of the request did not provide the proper directory id, fail request.
        return res.status(401).send({httpcode: "Unauthorised access to server filesystem, please try again with proper privileges"})

    // Extracting main information from the userDirId
    const userDirId: any = fields?.userDirId ? fields.userDirId[0] : ""
  
    // Checking if the User already has a dedicated folder
    let container = globalStorage?.root.children?.find((folder) => folder.name === userDirId)
    if (!container) 
       // If the user does not have a dedicated folder, create one.
       container = await globalStorage?.mkdir({name: userDirId})
    
    // calculating the size of the files.
    let size:any = 0
    container?.children?.forEach(value => {
      size += value?.size 
    })
    if (parseFloat(btmb(size)) >= 50) {
        res.status(403).send({httpcode: "You no longer have space in your account", data: "SPP"})
        return
    }

    for (const [_, value] of files) {
        /* Iterating through all the files sent by the frontend and uploading them to the Mega filesystem
        By creating individual streams. */ 
        const fileReadStream:any = fs.createReadStream(value?.filepath ?? "")
        if (!value?.originalFilename)
           return res.status(500).send({httpcode: "Invalid data, file has missing information."})
        if (parseFloat(btmb(value.size + size)) > 50) {
            res.status(403).send({httpcode: "You don't have enough space for storing this file.", data: "FPP"})
            return
        }
        const stream = await container?.upload({
          name: value?.originalFilename,
          size: value?.size,  
        }, fileReadStream).complete
        size += value?.size
    }
    // Everything went well, return 200
    res.status(200).json({ httpcode: "Successfully Complete", data: {size: size, type: "bytes"}})
    return // Termination
  } catch (err) {
      // Server Raised an error, PANIC!
      console.log(err)
      res.status(500).send({ httpcode: `Internal Server Error: ${err}` })
      return // Termination
  }
}


export const config = {
  api: {
    externalResolver: true,
    bodyParser: false
  },
  maxDuration: 60
}
