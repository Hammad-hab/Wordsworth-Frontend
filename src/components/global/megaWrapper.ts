import {BufferString, Storage} from "megajs"
import dotenv from "dotenv"
import { init } from "next/dist/compiled/webpack/webpack";
dotenv.config()


let globalStorage: Storage | null = null;

const initaliseMegaApp = async () => {
    if (globalStorage) {
        console.log("[APP_ERR]: GlobalStorage already initalised!")
        return globalStorage
    }

    // Global storage isn't initalised
    globalStorage = await (new Storage({
        email: "hammadalibutt30@gmail.com", // These null checks are only for tsc, they serve no use in production
        password:"_79aP2yNDjEPmfW",  // These null checks are only for tsc, they serve no use in production
        userAgent: null
    }).ready)
    return globalStorage
}

const uploadMegaApp = async (filename:string, buff:any) => {
    if (!globalStorage)
        await initaliseMegaApp()
    globalStorage?.upload(filename, buff)
}


export {
    initaliseMegaApp,
    uploadMegaApp,
    globalStorage
}