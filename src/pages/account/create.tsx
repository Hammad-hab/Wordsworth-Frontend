/*
	The following code is for /account/create route. It is for the register form 
	present in WordsWorth website
*/
import {
  FirebaseAuthenticationErrors,
  classifyFirebaseAuthError,
} from "@/components/global/interfaces";
import {
  initializeAuthProviderPopup,
  auth,
  createAccount,
} from "@/components/global/firebase";
import { ButtonBorder } from "@/components/Widgets/atoms/StandardBorderButton";
import GradientHeading from "@/components/Widgets/GradientHeading";
import FormInput from "@/components/Widgets/atoms/FormInput";
import { User, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import Light from "@/components/Widgets/Light";
import {
  useEffect,
  useState,
  useReducer,
  useCallback,
  MouseEvent,
} from "react";
import {
  CreateFormReducer,
  initialState,
} from "@/components/hooks/reducers/CreateFormReducer";
import { FcGoogle } from "react-icons/fc";
import LoadingScreen from "@/components/Widgets/molecules/LoadingScreen";
import { useRouter } from "next/router";
import "animate.css";
import { setUsrInformation } from "@/components/global/firestore";
import { UserInformation } from "@/components/global/interfaces";
import { useUserInformation } from "@/components/global/userStandardContext";
import AccountForms from "@/components/Widgets/templates/AccountForms";
import useSingleActionGuard from "@/components/hooks/useSingleActionGuard";
import Link from "next/link";
import { v4 } from "uuid";
import {
  genStdUsrTemplate,
  generateReadingUsername,
} from "@/components/global/superglobals";
import { stringIsValid } from "@/components/global/superglobal_utils";

interface CreateAccountUIProps {
  /* Component is a Page so it doesn't require nor does it recive props*/
}

const CreateAccountUI = (props: CreateAccountUIProps) => {
  const [credentials, dispatch] = useReducer(CreateFormReducer, initialState);
  const [isLoading, setIsLoading] = useState(true); // Maintains Loading Logic
  const [error, setError] = useState<string>("");
  const navigator = useRouter();
  const singleExecutionHandlerRef = useSingleActionGuard();
  const { usemail, uspass } = navigator.query;
  const usrdata = useUserInformation()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      if (auth.currentUser) {
          navigator.replace("/dashboard/getstarted");
      } else {
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (usemail) dispatch({ type: "email_change", email: usemail.toString() });
    if (uspass)
      dispatch({ type: "password_change", password: uspass.toString() });
  }, [usemail, uspass]);

  const submitHandler = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      (async (e) => {
        setError("");
        try {
          if (
            credentials.password != credentials.confirmedPassword ||
            !stringIsValid(credentials.password)
          ) {
            setError("passwords do not match!");
          } else if (!stringIsValid(credentials.displayName)) {
            setError("Username too short, must be at least 6 characters!");
          } else {
            const creds = await createAccount(
              credentials.email,
              credentials.password
            );

            const userInformation: UserInformation = genStdUsrTemplate(
              creds.user,
              { displayName: credentials.displayName.toString(), XP: 0, Level: 1, AccessableChats:[] }
            );

            setUsrInformation(creds.user.uid, userInformation);
            usrdata?.setUserInfo(userInformation);
            setIsLoading(true);
          }
        } catch (e) {
          const error: string = String(e);
          const errorKind: FirebaseAuthenticationErrors = classifyFirebaseAuthError(
            error
          );
          setError(errorKind);
        }
      })(e);
    },
    [credentials, usrdata]
  );

  return (
    <AccountForms
      isLoading={isLoading}
      Error={error}
      Heading="Create WordsWorth Account"
    >
      <FormInput
        inputType="email"
        placeHolder="Enter Email"
        onChange={(e) =>
          dispatch({ type: "email_change", email: e.target.value })
        }
        value={credentials.email}
        inputHasError={error}
      />

      <FormInput
        inputType="text"
        placeHolder="Display name"
        onChange={(e) =>
          dispatch({ type: "username_change", displayName: e.target.value })
        }
        value={credentials.displayName}
        className="mt-5"
        inputHasError={error}
      />

      <FormInput
        inputType="password"
        placeHolder="Password"
        onChange={(e) =>
          dispatch({ type: "password_change", password: e.target.value })
        }
        value={credentials.password}
        className="mt-10"
        inputHasError={error}
      />

      <FormInput
        inputType="password"
        placeHolder="Confirm Password"
        onChange={(e) =>
          dispatch({
            type: "cpassword_change",
            confirmedPassword: e.target.value,
          })
        }
        value={credentials.confirmedPassword}
        className="mt-5"
        inputHasError={error}
      />
      <hr className="opacity-50 mt-5 w-full" />
      <div className="flex flex-col items-center justify-center">
        <ButtonBorder
          className="mt-10 w-1/2"
          retargetRef={singleExecutionHandlerRef}
          onClick={submitHandler}
        >
          Register
        </ButtonBorder>
        <button
          className="mt-5 bg-white p-2 rounded-full text-sm pt-[0.65rem] pr-5 pl-5"
          onClick={async () => {
            const auths = await initializeAuthProviderPopup();
            setIsLoading(true);
            const userInformation: UserInformation = genStdUsrTemplate(
              auths.user,
              {
                XP: 0,
                Level: 1,
                AccessableChats: []
              }
            );
            const userId = auths.user.uid;
            setUsrInformation(userId, userInformation);
            usrdata?.setUserInfo(userInformation);
          }}
        >
          Create with Google <FcGoogle className="inline text-2xl" />
        </button>
      </div>
      <small className="text-gray-300 text-left mt-5 w-full">
        Already have an account?{" "}
        <Link href={"/account/login"} className="text-blue-700 hover:underline">
          Login to Wordworth
        </Link>
      </small>
    </AccountForms>
  );
};

export default CreateAccountUI;
