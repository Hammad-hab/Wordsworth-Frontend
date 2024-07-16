import "react-tooltip/dist/react-tooltip.css";
import type { AppProps } from "next/app";
import { Provider } from "@/components/global/userStandardContext";
import { useState, useEffect } from "react";
import { UserInformation } from "@/components/global/interfaces";
import { getUsrInformation } from "@/components/global/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/components/global/firebase";
import { useRouter } from "next/router";
import LoadingScreen from "@/components/Widgets/molecules/LoadingScreen";
import "@/styles/globals.css";
import "react-toastify/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  createProfilePic,
  getObjectLocalStorage,
  isNotNULL,
  setObjectLocalStorage,
} from "@/components/global/superglobal_utils";
export default function App({ Component, pageProps }: AppProps) {
  const [UserInfo, setUserInfo] = useState<UserInformation>();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [userIsOnline, setUserConnectionStatus] = useState(true);
  const router = useRouter();
  useEffect(() => {
    setUserConnectionStatus(navigator.onLine);
    const handleOffline = () => {
      if (userIsOnline) setUserConnectionStatus(false);
    };
    const handleOnline = () => {
      if (!userIsOnline) setUserConnectionStatus(true);
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    router.events.on("routeChangeStart", () => {
      setIsTransitioning(true);
    });

    router.events.on("routeChangeComplete", () => {
      setIsTransitioning(false);
    });

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (usr) => {
      try {
        /*
          Often when the user isn't signed in, the following code attempts to access information from firebase 
          which rasies an auth error. The try-catch prevents that from happening.
        */
        if (auth.currentUser) {
          const data = getObjectLocalStorage(auth.currentUser.uid);
          if (!data || Object.keys(data).length <= 0)
            getUsrInformation(auth.currentUser.uid).then((creds) => {
              creds.profilePicture = isNotNULL(usr?.photoURL)
                ? usr?.photoURL
                : createProfilePic(creds.displayName ?? "Anon Buddy");
              setUserInfo(creds);
              setObjectLocalStorage(creds, auth.currentUser?.uid!);
              setIsTransitioning(false); // Stop loading once the loader is done
            });
          else {
            setUserInfo(data);
            setIsTransitioning(false);
          }
        } else {
          setIsTransitioning(false);
        }
      } catch (e) {
        console.log(e);
        setIsTransitioning(false);
      }
    });
  }, []);
  return (
    <Provider value={{ UserInfo: UserInfo, setUserInfo }}>
      <ToastContainer />
      <div
        className={
          !isTransitioning ? "OpacityAnimation" : "OpacityAnimationLeave"
        }
      >
        <LoadingScreen isLoading={isTransitioning} />
        {!isTransitioning ? <Component {...pageProps} /> : <></>}
      </div>
    </Provider>
  );
}
