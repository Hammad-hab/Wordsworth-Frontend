import { DocumentData, addDoc, collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import {app} from "./firebase"

type Preferences = "adventure" | 'science-fiction' | "fiction" | "non-fiction" | "historic-fiction" | "fantasy" | "romance" | "young-adult" | "mystery" | "comedy"
type Gender = "M" | "F" | "NA"
interface UserInformation {
    displayName?:string,
    gender?: Gender,
    birthdate?: Date,
    preferences?: string[]
    hobbies?: string[],
    additionalInformation?: string,
    customisedMarkdown?: string[]
    profilePicture?: string,
    isProUser:boolean
    userIsCustomised:boolean,
    userstorageid:string

}

const db = getFirestore(app);
const usrInformation = collection(db, "usr_information")

const addUsrInformation = async (information: UserInformation) => {
    const res = await addDoc(usrInformation, information)
    return res
}

const setUsrInformation = async (usrId: string, information: UserInformation) => {
    const res = await setDoc(doc(usrInformation, usrId), information)
    return res
}

const readUsrsInformation = async (information: UserInformation) => {
    const res = await getDocs(usrInformation)
    return res
}

const getUsrInformation = async (usrId:string): Promise<UserInformation> => {
    const res = await getDoc(doc(usrInformation, usrId))
    const data: any = res.data()
    return data
}


export {
    addUsrInformation,
    setUsrInformation,
    readUsrsInformation,
    getUsrInformation,
}

export type {
    UserInformation,
    Preferences,
    Gender
}