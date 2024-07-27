import GradientHeading from "@/components/Widgets/GradientHeading";
import InputBox from "@/components/Widgets/Input";
import BorderButton, {
  ButtonBorder,
} from "@/components/Widgets/atoms/StandardBorderButton";
import { BadTag, GoodTag } from "@/components/Widgets/atoms/Tags";
import Modal from "@/components/Widgets/molecules/Modal";
import DashboardSidebar from "@/components/Widgets/templates/Sidebar";
import { auth } from "@/components/global/firebase";
import {
  asyncOnAuthStateChanged,
  deleteUsrInformation,
  updateUsrInformation,
} from "@/components/global/firestore";
import {
  useUserAccountInformation,
  useUserInformation,
} from "@/components/global/userStandardContext";
import {
  deleteUser,
  onAuthStateChanged,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-circular-progressbar/dist/styles.css";
import { clearObjectLocalStorage } from "@/components/global/superglobal_utils";

const AccountInformation = (props: any) => {
  const Usrdata = useUserInformation();
  const UsrAccount = useUserAccountInformation();
  const [nusername, setNUsername] = useState("");
  const [nemail, setNEmail] = useState("");
  const [showDeleteDialog, setDialogAppearence] = useState(false);
  const navigator = useRouter();

  const handleUserNameChange = (): Promise<unknown> => {
    return new Promise((res: (args: any) => void, rej) => {
      onAuthStateChanged(auth, (usr) => {
        try {
          if (usr)
            updateUsrInformation(usr?.uid, {
              displayName: nusername,
            }).then(() => res(usr));
        } catch (e) {
          rej(e);
        }
      });
    });
  };

  const handleEmailChange = (): Promise<unknown> => {
    return new Promise((res: (args: any) => void, rej) => {
      onAuthStateChanged(auth, (usr) => {
        try {
          if (usr) updateEmail(usr, nemail).then(() => res(usr));
        } catch (e) {
          rej(e);
        }
      });
    });
  };

  const handleUserDeletion = async () => {
    const userInformation = await asyncOnAuthStateChanged();
    if (!userInformation) throw "Bad usrdata, evil usrdata!";
    try {
      const void_ = await deleteUsrInformation(userInformation.uid);
      const deletion = await deleteUser(userInformation);
    } catch (e) {
      signOut(auth);
      navigator.replace("/account/login?returnTo=/dashboard/account/delete");
      throw `Failure`;
    }
    signOut(auth);
    navigator.replace("/account/login");
  };

  const resetUserInformation = () => {
    return new Promise((res, rej) => {
      onAuthStateChanged(auth, (usr) => {
        try {
          if (usr)
            updateUsrInformation(usr?.uid, {
              userIsCustomised: false,
            }).then(() => {
              clearObjectLocalStorage();
              navigator.replace("/dashboard/getstarted?force=true");
              res(usr);
            });
        } catch (e) {
          rej(e);
        }
      });
    });
  };
  return (
    <DashboardSidebar>
      <div className="h-full w-full mt-10">
        <GradientHeading className="mb-10 text-4xl">
          Your Account
        </GradientHeading>
        <fieldset className="border-2 border-zinc-300 p-3 mr-5 ml-5 select-none">
          <legend className="text-zinc-500 font-semibold p-5 pb-0 pt-0">
            Account Information
          </legend>
          <ul>
            <li>
              <b className="font-semibold select-none">Current Name:</b>{" "}
              <span>{Usrdata?.UserInfo?.displayName}</span>
            </li>
            <li>
              <b className="font-semibold select-none">Email:</b>{" "}
              <span>{UsrAccount?.email}</span>
            </li>
            <li>
              <b className="font-semibold select-none">Account Storage Key:</b>{" "}
              <span>{Usrdata?.UserInfo?.userstorageid}</span>{" "}
              <BadTag text="Private Information: Keep Secure." />
            </li>

            <li>
              <b className="font-semibold select-none">Known Hobbies:</b>{" "}
              <ul className="list-disc ml-14">
                {Usrdata?.UserInfo?.hobbies?.map((value, k) => (
                  <li key={k}>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <b className="font-semibold select-none mt-5">Favorite Genres:</b>{" "}
              <ul className="list-disc ml-14">
                {Usrdata?.UserInfo?.preferences?.map((value, k) => (
                  <li key={k}>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <b className="font-semibold select-none mt-5">Pro User:</b>{" "}
              {Usrdata?.UserInfo?.isProUser ? (
                <GoodTag text="True" className="mt-5" />
              ) : (
                <BadTag text="False" className="mt-5" />
              )}
            </li>
          </ul>

          <p
            className="mt-5 text-gray-400 hover:text-red-500 transition-all w-fit cursor-pointer"
            onClick={() => {
              toast.promise(resetUserInformation, {
                pending: "Please wait as we purge your old data...",
                success: "Successfully Cleared existing data, redirecting...",
                error: "Data reset failed, please try again later.",
              });
            }}
          >
            Reconfigure account information
          </p>
        </fieldset>

        <fieldset className="border-2 border-zinc-300 p-3 mt-5 mr-5 ml-5">
          <legend className="text-zinc-500 font-semibold p-5 pb-0 pt-0">
            User Information
          </legend>

          <small className="text-gray-400 ml-2 mb-3">Change User Name</small>
          <InputBox
            tag="Change username"
            autoClickDisable={true}
            className="border border-r-0"
            containerClassName="mb-0"
            minLength={6}
            maxLength={20}
            theme="Light"
            onChange={(e) => setNUsername(e.target.value)}
            value={nusername}
            placeHolder="New Display Name"
            onTagClicked={(e) => {
              toast.promise(handleUserNameChange, {
                success: "Successfully Altered your username",
                error: "Oh no, it seems we failed. Please try again",
                pending: "Please wait...",
              });
            }}
          />

          <small className="text-gray-400 ml-2 mb-3 mt-2">Change Email</small>
          <InputBox
            tag="Change email"
            autoClickDisable={true}
            className="border border-r-0"
            minLength={6}
            maxLength={20}
            theme="Light"
            onChange={(e) => setNEmail(e.target.value)}
            value={nemail}
            placeHolder="New Email"
            onTagClicked={(e) => {
              toast.promise(handleEmailChange, {
                success: "Successfully Altered your username",
                error: "Oh no, it seems we failed. Please try again",
                pending: "Please wait...",
              });
            }}
          />
        </fieldset>

        <fieldset className="border-2 border-red-500 p-3 mt-3 mr-5 ml-5">
          <legend className="text-red-400 font-semibold p-5 pb-0 pt-0">
            Danger Zone
          </legend>
          <ButtonBorder onClick={() => setDialogAppearence(true)}>
            Delete My Account
          </ButtonBorder>
        </fieldset>
        <br />
      </div>
      <Modal
        title="Account Deletion"
        show={showDeleteDialog}
        content={
          "Due to security reasons, we require you to log in again if your session is older than an hour"
        }
      >
        {/* <div className="flex flex-row mt-5 w-full gap-5"> */}
        <p
          className="hover:bg-gray-100 text-gray-400 hover:text-gray-500 cursor-pointer p-1 transition-all"
          onClick={() => setDialogAppearence(false)}
        >
          Exit
        </p>
        <p
          className="hover:bg-red-600 text-white hover:text-white cursor-pointer rounded-b-md p-1 transition-all bg-red-500"
          onClick={() => {
            toast.promise(handleUserDeletion, {
              success: `Goodbye ${Usrdata?.UserInfo?.displayName}!`,
              pending: `Packing your bags for you to leave...`,
              error:
                "It seems that you have not logged in recently. Due to security reasons, we require you login again.",
            });
          }}
        >
          Yes continue
        </p>
        {/* <BorderButton
            
          >
            Continue
          </BorderButton>
          <ButtonBorder
            onClick={() => {
              
            }}
          >
            No Cancel!
          </ButtonBorder> */}
        {/* </div> */}
      </Modal>
    </DashboardSidebar>
  );
};

export default AccountInformation;
