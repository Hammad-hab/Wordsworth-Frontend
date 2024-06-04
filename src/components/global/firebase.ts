import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCbdjz-JelBwKewufk3y3CgjM-N1uIlfXs",
    authDomain: "bigqserver.firebaseapp.com",
    projectId: "bigqserver",
    storageBucket: "bigqserver.appspot.com",
    messagingSenderId: "665695844751",
    appId: "1:665695844751:web:c0c4fd3d71837e7f1073fa",
    measurementId: "G-Q6GXL6PXN3"
};
  

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
