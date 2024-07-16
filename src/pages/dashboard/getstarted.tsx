import GradientHeading from "@/components/Widgets/GradientHeading";
import { ButtonBorderBlue } from "@/components/Widgets/atoms/StandardBorderButton";
import { useEffect, useReducer, useState } from "react";
import withAccountPrevention from "@/components/h-components/withAccountPrevention";
import "animate.css";
import { useUserInformation } from "@/components/global/userStandardContext";
import { useRouter } from "next/router";
import LoadingScreen from "@/components/Widgets/molecules/LoadingScreen";
import {
  GetStartedReducer,
  initialState,
} from "@/components/hooks/reducers/GetStartedReducer";
import { ReactTags } from "react-tag-autocomplete";
import { yearsBetween } from "@/components/global/interfaces";
import {
  HobbiesSuggetions,
  PreferencesSuggestion,
} from "@/components/global/superglobals";
import { toast } from "react-toastify";
import { updateUsrInformation } from "@/components/global/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/components/global/firebase";
import { clearObjectLocalStorage } from "@/components/global/superglobal_utils";

const GetStarted = (props: any) => {
  const [custom, dispatch] = useReducer(GetStartedReducer, initialState);
  const [validation, setValidation] = useState(false);
  const navigator = useRouter();
  const User = useUserInformation();
  useEffect(() => {
    if (!custom?.gender) dispatch({ type: "gender", gender: "-" });
  }, [custom]);

  useEffect(() => {
    if (User?.UserInfo?.userIsCustomised) navigator.replace("/dashboard");
  }, [User?.UserInfo?.userIsCustomised, navigator]);

  return (
    <div
      className={`mt-5 p-2 ${validation ? "select-none blur-sm" : ""}`}
      aria-disabled
    >
      <small className="block text-gray-400">Gender</small>
      <select
        className="border outline-none p-2 w-1/2 rounded"
        contentEditable={validation}
        onChange={(e) => dispatch({ type: "gender", gender: e.target.value })}
        value={custom?.gender}
      >
        <option> - </option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <small className="block text-gray-400 mt-5">Birthdate</small>
      <input
        contentEditable={validation}
        type="date"
        className="border outline-none p-2 w-1/2 rounded"
        min={1}
        max={125}
        onChange={(e) =>
          dispatch({
            type: "birthdate",
            birthdate: e.target.valueAsDate ?? new Date(),
          })
        }
      />

      <small className="block text-gray-400 mt-5">Preferences</small>
      <ReactTags
        selected={
          custom?.preferences?.map((v: string) => {
            return { label: v, value: v };
          }) ?? []
        }
        isDisabled={validation}
        onAdd={(Tag) =>
          dispatch({
            type: "preferences",
            preferences: [...(custom?.preferences ?? []), Tag.value],
          })
        }
        suggestions={PreferencesSuggestion}
        onDelete={(index: number) =>
          dispatch({
            type: "preferences",
            preferences: custom?.preferences?.filter((_, i) => i !== index),
          })
        }
      />
      <small className="block text-gray-400 mt-5">Hobbies</small>

      <ReactTags
        selected={
          custom?.hobbies?.map((v: string) => {
            return { label: v, value: v };
          }) ?? []
        }
        isDisabled={validation}
        onAdd={(Tag) =>
          dispatch({
            type: "hobbies",
            hobbies: [...(custom?.hobbies ?? []), Tag.value as string],
          })
        }
        suggestions={HobbiesSuggetions}
        onDelete={(index: number) =>
          dispatch({
            type: "hobbies",
            hobbies: custom?.hobbies?.filter((_, i) => i !== index),
          })
        }
      />

      <ButtonBorderBlue
        className="mt-2 w-full"
        disabled={
          !custom?.birthdate ||
          !custom.gender ||
          !custom?.hobbies?.length ||
          !custom.preferences?.length
        }
        onClick={() => {
          setValidation(true);
          const age = yearsBetween(custom?.birthdate);
          if (age && age < 10) {
            toast.error(
              "You're too young to sign up! Users need to be at least 10 years old!"
            );
            setValidation(false);
          } else {
            onAuthStateChanged(auth, (usr) => {
              if (usr) {
                const uid = usr?.uid;
                const updateInfo = async () => {
                  const usrinfo = await updateUsrInformation(uid, {
                    gender: custom?.gender,
                    birthdate: custom?.birthdate,
                    hobbies: custom?.hobbies,
                    userIsCustomised: true,
                    preferences: custom?.preferences,
                  });
                };
                toast.promise(updateInfo, {
                  success: {
                    render: () => "Okey Dokey! You're good to go",
                    autoClose: 2000,
                    onClose: () => {
                      clearObjectLocalStorage()
                      navigator.replace("/dashboard")
                    },
                  },
                  pending: "Please wait, we're setting you up!",
                  error:
                    "It seems that we have run into an error, please try again.",
                });
              }
            });
          }
        }}
      >
        Let{"'"}s go!
      </ButtonBorderBlue>
    </div>
  );
};

interface CustomizationUIProps {}

const CustomizationUI = (props: CustomizationUIProps) => {
  const [userAgrees, setAgreement] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const userContext = useUserInformation();
  const navigator = useRouter();
  const {force} = navigator.query
  useEffect(() => {
    if (userContext?.UserInfo?.userIsCustomised && !force) {
      navigator.replace("/dashboard");
    } else {
      setLoading(false);
    }
  }, [userContext?.UserInfo?.userIsCustomised, force, navigator]);
  return (
    <div className="flex flex-col items-center justify-items-center justify-center h-screen">
      <LoadingScreen isLoading={isLoading} />
      <div
        className={`p-10 rounded-md border flex flex-col overflow-visible bg-white w-1/3`}
      >
        <div className={`transition-all duration-500 flex flex-col`}>
          <GradientHeading className="text-2xl border-b-4 border-double pb-2">
            Let{"'"}s Get Started!
          </GradientHeading>
          {!userAgrees ? (
            <div>
              <p className="mt-5 font-nunito border-b-4 border-double mb-2 pb-2">
                <b className="font-extrabold block">Disclaimer:</b>
                In order to make sure you get the right content, we need a few
                details regarding you and your interests. This information is
                mandatory as without it, finding the right books for you will be
                difficult for the AI. If you are not comfortable with providing
                this information, you can ask questions at:
                <span className="text-blue-500 ml-1">
                  arcade.acme.org@gmail.com
                </span>
              </p>

              <ButtonBorderBlue
                onClick={(e) => setAgreement(true)}
                className="mt-2"
              >
                I agree with the conditions above
              </ButtonBorderBlue>
            </div>
          ) : (
            <GetStarted />
          )}
        </div>
      </div>
    </div>
  );
};

export default withAccountPrevention(CustomizationUI);
