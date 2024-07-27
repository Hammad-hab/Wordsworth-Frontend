import {
  FirebaseAuthenticationErrors,
  classifyFirebaseAuthError,
} from "@/components/global/interfaces";
import {
  initializeAuthProviderPopup,
  auth,
  signIn,
} from "@/components/global/firebase";
import { ButtonBorder } from "@/components/Widgets/atoms/StandardBorderButton";
import { getUsrInformation, setUsrInformation } from "@/components/global/firestore";
import {
  useCallback,
  useEffect,
  useState,
  useReducer,
  MouseEvent
} from "react";
import FormInput from "@/components/Widgets/atoms/FormInput";
import { onAuthStateChanged } from "firebase/auth";
import Light from "@/components/Widgets/Light";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import { useUserInformation } from "@/components/global/userStandardContext";
import LoadingScreen from "@/components/Widgets/molecules/LoadingScreen";
import "animate.css";
import {
  LoginReducer,
  initialState,
} from "@/components/hooks/reducers/UserFormReducer";
import AccountForms from "@/components/Widgets/templates/AccountForms";
import useSingleActionGuard from "@/components/hooks/useSingleActionGuard";
import Link from "next/link";
import { genStdUsrTemplate, getCookie, setCookie } from "@/components/global/superglobals";

interface LoginUIProps {}

const LoginUI = (props: LoginUIProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<FirebaseAuthenticationErrors | string>("");
  const [credentials, dispatch] = useReducer(LoginReducer, initialState);
  const navigator = useRouter();
  const singleExecutionHandlerRef = useSingleActionGuard()
  const { usemail, uspass, returnTo } = navigator.query;
  const usrdata = useUserInformation()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      if (auth.currentUser) {
        if (usrdata?.UserInfo?.userIsCustomised && !returnTo?.includes("/dashboard/account/")) {
          navigator.replace("/dashboard");
        } else if (returnTo?.includes("/dashboard/account/")) {
          navigator.replace("/dashboard/account");
        } else if (!usrdata?.UserInfo?.userIsCustomised)  {
          navigator.replace("/dashboard/getstarted");
        }
      } else {
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (usemail)
      dispatch({ type: "username_change", username: usemail.toString() });
    if (uspass)
      dispatch({ type: "password_change", password: uspass.toString() });
  }, [usemail, uspass]);

  const handleSubmit = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      (async () => {
        try {
          const creds = await signIn(
            credentials?.username,
            credentials?.password
          );
          setIsLoading(true);
          const userInformation = await getUsrInformation(creds.user.uid);
          usrdata?.setUserInfo(userInformation);
        } catch (e) {
          const error: string = String(e);
          const errorKind: FirebaseAuthenticationErrors = classifyFirebaseAuthError(
            error
          );
          setError(errorKind);
        }
      })();
    },
    [credentials?.username, credentials?.password, usrdata]
  );

  return (
    <AccountForms isLoading={isLoading} Error={error} Heading="Login" classNameSidebar="h-screen">
      <FormInput
        inputType="text"
        placeHolder="Email"
        onChange={(e) =>
          dispatch({ type: "username_change", username: e.target.value })
        }
        value={credentials?.username}
        inputHasError={error}
      />

      <FormInput
        className="mt-5"
        inputType="password"
        placeHolder="Password"
        onChange={(e) =>
          dispatch({ type: "password_change", password: e.target.value })
        }
        value={credentials?.password}
        inputHasError={error}
      />

      <hr className="mt-5 w-full opacity-50" />
      <div className="flex flex-col items-center justify-center">
        <ButtonBorder className="mt-10 w-1/2" onClick={handleSubmit} retargetRef={singleExecutionHandlerRef}>
          Login
        </ButtonBorder>
        <button
          className="mt-5 bg-white p-2 rounded-full text-sm pt-[0.65rem] pr-5 pl-5"
          onClick={async () => {
            const auths = await initializeAuthProviderPopup();
            setIsLoading(true);
            const userInformation = await getUsrInformation(auths.user.uid);
            if (!userInformation) {
                const userInformation = genStdUsrTemplate(auths.user, {})
                await setUsrInformation(auths.user.uid, userInformation)
                usrdata?.setUserInfo(userInformation)
                return
            } 
            usrdata?.setUserInfo(userInformation);
          }}
        >
          Sign in with Google <FcGoogle className="inline text-2xl" />
        </button>
      </div>
	  <small className="text-white text-left mt-5 w-full">
		  Don{"'"}t have an account? <Link href={"/account/create"} className="text-blue-600 hover:underline">Create one here</Link>
	  </small>
    </AccountForms>
  );
};

export default LoginUI;
