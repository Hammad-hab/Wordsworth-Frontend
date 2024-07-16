import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./superglobals";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const authProvider = new GoogleAuthProvider()
const initializeAuthProviderPopup =  async (): Promise<UserCredential> => {
    const res = await signInWithPopup(auth, authProvider)
    return res
}

const signIn = async(email:string|string[], password: string|string[]): Promise<UserCredential> => {
    const creds = await signInWithEmailAndPassword(auth, email?.toString(), password?.toString())
    return creds
}


const createAccount = async (email:string|string[], password: string|string[]): Promise<UserCredential> => {
   const creds = createUserWithEmailAndPassword(auth, email?.toString(), password?.toString())

   return creds
}


// const firestore = firestore

export {
    initializeAuthProviderPopup,
    signIn,
    createAccount,
    auth,
    app
}
