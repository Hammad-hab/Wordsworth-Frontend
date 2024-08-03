import { ButtonBorder } from "@/components/Widgets/atoms/StandardBorderButton";
import { auth } from "@/components/global/firebase";
import { CiLogout } from "react-icons/ci";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import ConfettiCursor from "@/components/Widgets/atoms/ConfettiCursor";
import {
  useUserAccountInformation,
  useUserInformation,
} from "@/components/global/userStandardContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import useSingleActionGuard from "@/components/hooks/useSingleActionGuard";
import { btmb } from "@/components/global/superglobals";
import { IoLibrary, IoReaderSharp } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { GiTalk } from "react-icons/gi";
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
import Image from "next/image";
import { IoMdMore } from "react-icons/io";
import { RiRobot2Fill } from "react-icons/ri";
import "animate.css";
import { IoOptionsOutline } from "react-icons/io5";
import { clearObjectLocalStorage } from "@/components/global/superglobal_utils";
import Light from "../Light";
import Dropdown from "../molecules/Dropdown";
import { useUserDidLevelUp } from "@/components/hooks/contexts/userDidLevelup";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "animate.css";
import ChatList from "../molecules/ChatList";
import { FaPlusCircle } from "react-icons/fa";
interface DashboardSidebarProps {
  children?: any;
  className?: string;
}

const DashboardSidebar = (props: DashboardSidebarProps) => {
  const router = useRouter();
  const usrdata = useUserInformation();
  const usraccount = useUserAccountInformation();
  const singleExecutionGuard = useSingleActionGuard();
  const [showSideBar, setShowSidebar] = useState(true);
  const [showActions, setShowActions] = useState(false);
  const [storage, setStorage] = useState(usrdata?.UserInfo?.storageUsed!);
  const level = useUserDidLevelUp();
  const [showLevelUpDialog, setShowLevelUpDialog] = useState(level?.didLevelUp);

  useEffect(() => {
    setShowLevelUpDialog(level?.didLevelUp);
  }, [level?.didLevelUp]);
  useEffect(() => {
    if (
      usrdata?.UserInfo?.storageUsed !== undefined &&
      usrdata?.UserInfo?.storageUsed !== null
    )
      setStorage(usrdata?.UserInfo?.storageUsed!);
  }, [usrdata?.UserInfo?.storageUsed]);
  return (
    <div className="h-screen w-full flex flex-row overflow-hidden">
      <p className="flex flex-col w-full p-2 sidebarShowButton absolute">
        <IoMdMore
          className="text-xl self-end"
          onClick={() => setShowSidebar(!showSideBar)}
        />
      </p>
      <Light
        color="#264A52"
        blurRadius={150}
        className="w-[500px] h-[500px] zindexn50 fixed sidebar_light"
      />
      <Light
        color="#04bd82"
        blurRadius={50}
        className="w-[500px] h-[500px] zindexn50 fixed mt-[250px] sidebar_light"
      />
      <div
        className={`bg-[#003459c6] w-1/6 h-full flex flex-col text-white border-none sidebar transition-all z-20 ${
          showSideBar ? "" : "hide_slide"
        }`}
      >
        <div className="h-full text-sm flex flex-col">
          <div className="self-end">
            <IoOptionsOutline
              className="m-2 mb-0 text-2xl self-end cursor-pointer"
              onClick={() => setShowActions(!showActions)}
            />
            <Dropdown show={showActions} onBlur={() => setShowActions(false)} >
              <li className="p-2 text-sm">
                <b className="font-semibold block">
                  {usrdata?.UserInfo?.displayName}
                </b>
                <small>{usraccount?.email}</small>

              </li>
              <li className="p-2">
                <meter
                  value={btmb(storage, 3, true, true)}
                  max={50}
                  className="ml-2 mr-2 w-1/2 inline outline-none"
                />
                <small>{btmb(storage, 3)} used</small>
              </li>
              <hr />
              <Link href={"/dashboard/account"}>
                <li className="p-4 pt-2 pb-2 pr-20 text-left hover:bg-slate-200">
                  <MdManageAccounts className="inline-block text-2xl m-2 mb-2 mr-2" />
                  Account
                </li>
              </Link>
              <Link href={"/dashboard/mylibrary"}>
                <li className="p-4 pt-2 pb-2 pr-20 text-left hover:bg-slate-200">
                  <IoLibrary className="inline-block text-2xl m-2 mb-2 mr-2" />
                  My Library
                </li>
              </Link>
              <hr />
              <li
                className="p-4 pt-2 pb-2 pr-20 text-left hover:bg-slate-200 cursor-pointer"
                onClick={() => {
                  try {
                    signOut(auth).then(() => {
                      clearObjectLocalStorage();
                      router.replace("/account/login");
                    });
                  } catch (e) {
                    console.log("ERR_IGNRED");
                  }
                }}
                ref={singleExecutionGuard}
              >
                <CiLogout className="inline" /> Logout
              </li>
            </Dropdown>
          </div>
          <div className="w-[64px] h-[64px] rounded-full block m-auto mt-5 mb-10 z-50">
            <div className="absolute w-[64px] h-[64px] z-10" id="LevelIndigator">
              <CircularProgressbar
                value={usrdata?.UserInfo?.XP ?? 1}
                text={`${usrdata?.UserInfo?.Level}`}
                styles={buildStyles({
                  pathColor: `#FFA000`,
                  textColor: "#FFA000",
                })}
              />
            </div>
            {usrdata?.UserInfo?.profilePicture  ? <Image
              src={usrdata?.UserInfo?.profilePicture}
              alt="Profile Picture"
              width={64}
              height={64}
              className="rounded-full skel_animation"
            /> : <div className="w-[64px] h-[64px] rounded-full skel_animation"></div>}
            
          </div>

          {/* </Link> */}
          {/* <Link href={"/dashboard/account"}>
            <div className="hover:bg-[#01223958] p-3 hover:indent-2 transition-all cursor-pointer">
              <MdManageAccounts className="inline-block text-2xl m-2 mb-2 mr-5" />
              Account
            </div>
          </Link> */}

          <div className="p-3">
          <Link href={"/dashboard/mylibrary"}>
            <div className="hover:bg-[#0122391c] transition-all cursor-pointer rounded-md mb-2" id="LibraryLink">
              <IoLibrary className="inline-block text-2xl m-2 mb-2 mr-5" />
              My Library
            </div>
          </Link>
            <Link href={"/dashboard/suggestions"}>
              <p className="hover:bg-[#0122391c] transition-all cursor-pointer mb-2 rounded-md" id="YourChats">
                <GiTalk className="inline-block text-2xl m-2 mb-2 mr-5" />
                Your Chats{" "}
                <FaPlusCircle className="inline-block text-xl m-2 mb-2 mr-5 h"/>
              </p>
            </Link>
            <ChatList/>
            {/* <ul> */}
              

              {/*             
              <Link href={"/dashboard/suggestions"}>
                <li className="cursor-pointer ml-2 hover:indent-2 transition-all p-3 hover:bg-[#01223958] border-l-2 border-[#0c2638d3] hover:border-l-8">
                  <BsFillChatSquareQuoteFill className="inline-block m-2" />
                  New Chat
                </li>
              </Link>
              <li className="cursor-pointer ml-2 hover:indent-2 transition-all p-3 hover:bg-[#01223958] border-l-2 border-[#0c2638d3] hover:border-l-8">
                <FaBookmark className="inline-block m-2" />
                Discuss
              </li>
              <li className="cursor-pointer ml-2 hover:indent-2 transition-all p-3 hover:bg-[#01223958] border-l-2 border-[#0c2638d3] hover:border-l-8">
                <IoReaderSharp className="inline-block m-2" />
                AI Assisted Reader
              </li> */}
            {/* </ul> */}
          </div>

          
        </div>

        {/* <div className="flex flex-col-reverse mt-16"> */}
      </div>

      {/* </div> */}
      <div
        className={`w-full p-2 flex flex-col items-center justify-center bg-zinc-200 overflow-y-auto ${props.className}`}
        onClick={() => setShowSidebar(false)}
      >
        {props.children}

        <div
          id="levelup"
          className={`fixed top-0 left-0 w-screen h-screen bg-[#689981b8] flex flex-col items-center z-30 ${
            showLevelUpDialog ? "" : "hidden"
          }`}
        >
          <div className="m-auto bg-white w-fit rounded-md shadow-md select-none">
            <div className="p-2">
              <div
                className="flex flex-col justify-center items-center p-2 animate__animated animate__tada"
                style={{ zIndex: "999999 !important" }}
              >
                <h1 className="text-center text-2xl">Congratulations</h1>
                <h2 className="text-center text-lg">
                  You are now on Level 50!
                </h2>
                <small>
                  <i>You are a Literary Genius!</i>
                </small>
                <Image
                  src={"/Images/levelup.gif"}
                  width={250}
                  height={250}
                  alt="level up"
                />
              </div>
              <small className="block m-2">
                Move the cursor around and enjoy the confetti
              </small>
            </div>
            <div className="flex flex-col text-center text-sm">
              <p
                className="hover:bg-red-500 text-gray-400 hover:text-white cursor-pointer rounded-b-md p-1 transition-all"
                onClick={() => setShowLevelUpDialog(false)}
              >
                Exit
              </p>
            </div>
          </div>
          <ConfettiCursor />
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
