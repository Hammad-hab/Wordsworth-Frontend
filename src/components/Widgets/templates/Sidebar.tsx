import { ButtonBorder } from "@/components/Widgets/atoms/StandardBorderButton";
import { auth } from "@/components/global/firebase";
import { CiLogout } from "react-icons/ci";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useUserInformation } from "@/components/global/userStandardContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import useSingleActionGuard from "@/components/hooks/useSingleActionGuard";
import { btmb } from "@/components/global/superglobals";
import { IoLibrary, IoReaderSharp } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
import Image from "next/image";
import { IoMdMore } from "react-icons/io";
import { RiRobot2Fill } from "react-icons/ri";
import 'animate.css';
import { clearObjectLocalStorage } from "@/components/global/superglobal_utils";
import Light from "../Light";
interface DashboardSidebarProps {
  children?: any;
  className?:string
}

const DashboardSidebar = (props: DashboardSidebarProps) => {
  const router = useRouter();
  const usrdata = useUserInformation();
  const singleExecutionGuard = useSingleActionGuard();
  const [showSideBar, setShowSidebar] = useState(true);
  const [storage, setStorage] = useState(usrdata?.UserInfo?.storageUsed!);

  useEffect(() => {
    if (
      usrdata?.UserInfo?.storageUsed !== undefined &&
      usrdata?.UserInfo?.storageUsed !== null
    )
      setStorage(usrdata?.UserInfo?.storageUsed!);
  }, [usrdata?.UserInfo?.storageUsed]);
  return (
    <div className="h-screen w-full flex flex-row">
      <p className="flex flex-col w-full p-2 sidebarShowButton absolute">
        <IoMdMore
          className="text-xl self-end"
          onClick={() => setShowSidebar(!showSideBar)}
        />
      </p>
      <Light color="#264A52" blurRadius={150} className="w-[500px] h-[500px] zindexn50 fixed"/>
      <Light color="#04bd82" blurRadius={50} className="w-[500px] h-[500px] zindexn50 fixed mt-[250px]"/>
      <div
        className={`bg-[#003459c6] w-1/6 h-full flex flex-col text-white border-none sidebar transition-all ${
          showSideBar ? "" : "-translate-x-full"
        }`}
      >
        <div className="h-1/2 text-sm">
          <div className="w-[64px] h-[64px] rounded-full block m-auto mt-10 mb-10 z-50">
            <Image
              src={usrdata?.UserInfo?.profilePicture ?? ""}
              alt="Profile Picture"
              width={64}
              height={64}
              className="rounded-full skel_animation"
            />
          </div>

          {/* </Link> */}
          <Link href={"/dashboard/account"}>
            <div className="hover:bg-[#01223958] p-3 hover:indent-2 transition-all cursor-pointer">
              <MdManageAccounts className="inline-block text-2xl m-2 mb-2 mr-5" />
              Account
            </div>
          </Link>

          <div className="p-3">
            <p className="mb-2 cursor-pointer">
              <RiRobot2Fill className="inline-block text-2xl m-2 mb-2 mr-5" />
              AI Features{" "}
            </p>
            <ul>
              <Link href={"/dashboard/suggestions"}>
                <li className="cursor-pointer ml-2 hover:indent-2 transition-all p-3 hover:bg-[#01223958] border-l-2 border-[#0c2638d3] hover:border-l-8">
                  <BsFillChatSquareQuoteFill className="inline-block m-2"/>
                  Suggestions
                </li>
              </Link>
              <li className="cursor-pointer ml-2 hover:indent-2 transition-all p-3 hover:bg-[#01223958] border-l-2 border-[#0c2638d3] hover:border-l-8">
                <FaBookmark className="inline-block m-2"/>
                Discuss
              </li>
              <li className="cursor-pointer ml-2 hover:indent-2 transition-all p-3 hover:bg-[#01223958] border-l-2 border-[#0c2638d3] hover:border-l-8">
                <IoReaderSharp className="inline-block m-2"/>
                AI Assisted Reader
              </li>
            </ul>
          </div>

          <Link href={"/dashboard/mylibrary"}>
            <div className="hover:bg-[#01223958] p-3 hover:indent-2 transition-all cursor-pointer">
              <IoLibrary className="inline-block text-2xl m-2 mb-2 mr-5" />
              My Library
            </div>
          </Link>
        
        </div>

        <div className="h-1/2 flex flex-col-reverse mt-16">
          <ButtonBorder
            className="w-fit m-5"
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
            retargetRef={singleExecutionGuard}
          >
            <CiLogout className="inline" /> Logout
          </ButtonBorder>
          <p className="text-zinc-200 font-semibold font-nunito text-sm">
            <meter
              value={btmb(storage, 3, true, true)}
              max={50}
              className="ml-2 mr-2 w-1/2 inline outline-none"
            />
            {btmb(storage, 3)} used
          </p>
        </div>
      </div>
      <div className={`w-full p-2 flex flex-col items-center justify-center bg-zinc-200 overflow-y-auto ${props.className}`}>
        {props.children}
      </div>
    </div>
  );
};

export default DashboardSidebar;
