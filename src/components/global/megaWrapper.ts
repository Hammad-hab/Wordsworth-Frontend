import {MutableFile, Storage} from "megajs"
import dotenv from "dotenv"
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
        password:"ovinwejkarsfckjwedrasfjrdakfbcdkjgbabdkas",  // These null checks are only for tsc, they serve no use in production
        userAgent: null,
    }).ready)
    return globalStorage
}

const uploadMegaApp = async (filename:any, buff:any) => {
    /**@deprecated */
    if (!globalStorage)
        await initaliseMegaApp()
    return globalStorage?.upload(filename, buff,)
}

const getFilesAssociated = (userId: string): MutableFile[] => {
    const folder = globalStorage?.root.children?.find(folder => folder.name === userId && folder.directory)
    const files = folder?.children ?? []
    return files
}

export {
    initaliseMegaApp,
    uploadMegaApp,
    globalStorage,
    getFilesAssociated
}