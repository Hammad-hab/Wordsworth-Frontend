import 'react-tooltip/dist/react-tooltip.css'
import type { AppProps } from "next/app";
import { Provider } from "@/components/global/userStandardContext";
import { useState, useEffect } from "react";
import { UserInformation, getUsrInformation } from "@/components/global/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/components/global/firebase";
import { useRouter } from "next/router";
import LoadingScreen from "@/components/Widgets/molecules/LoadingScreen";
import "@/styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  const [UserInfo, setUserInfo] = useState<UserInformation>()
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter()
  useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, () => {
      try {
        /*
          Often when the user isn't signed in, the following code attempts to access information from firebase 
          which rasies an auth error. The try-catch prevents that from happening.
        */
        if (auth.currentUser) {
            getUsrInformation(auth.currentUser.uid).then((creds) => {
              setUserInfo(creds)
            })
        } 

        router.events.on("routeChangeStart", () => {
          setIsTransitioning(true)
        })

        router.events.on("routeChangeComplete", () => {
          setIsTransitioning(false)
        })
      } catch(e) {
        console.log("ERR_FETCH_DAT")
      } 
		})
		return unsubscribe
	}, [])
  return (
    <Provider value={{UserInfo: UserInfo, setUserInfo}}> 
      <div className={!isTransitioning ? "OpacityAnimation" : "OpacityAnimationLeave"}>
          <LoadingScreen isLoading={isTransitioning}/>
          <Component {...pageProps} />
      </div>
    </Provider>
      
    )
}
