import { DocumentData, addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import {app, auth} from "./firebase"
import { User, onAuthStateChanged } from "firebase/auth";
import { UserInformation } from "./interfaces";

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

const updateUsrInformation = async (usrId: string, information: UserInformation | any) => {
    const res = await updateDoc(doc(usrInformation, usrId), information)
    return res
}

const deleteUsrInformation = async (usrId: string) => {
    const res = await deleteDoc(doc(usrInformation, usrId))
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

const asyncOnAuthStateChanged = () => {
    return new Promise((res: (value: User | null) => void, rej) => {
        try {
            onAuthStateChanged(auth, (usr) =>{
                res(usr)
            })
        } catch (e) {
            rej(e)
        }
    })
}

export {
    addUsrInformation,
    setUsrInformation,
    readUsrsInformation,
    getUsrInformation,
    updateUsrInformation,
    asyncOnAuthStateChanged,
    deleteUsrInformation
}
