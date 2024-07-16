import { useUserInformation } from "@/components/global/userStandardContext";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect } from "react"
import { auth } from "../global/firebase";



const withAccountPrevention = (WrappedComponent: any) => {
    /*
        Allows any component to be wrapped with a safety controller that prevents
        any user (who is not logged in) from accessing that specific page.
    */
    const AccountPreventionWrapper = (props:any) => {
        const UserInfoContext = useUserInformation()
        const navigator = useRouter()
        useEffect(() => {
            if (UserInfoContext === null) {
                navigator.replace("/account/login")
            } 
            onAuthStateChanged(auth, () => {
                if (!auth.currentUser) {
                    navigator.replace("/account/login")
                }
            })
        }, [])
        return  <WrappedComponent {...props}/>
    }

    return AccountPreventionWrapper
}

export default withAccountPrevention