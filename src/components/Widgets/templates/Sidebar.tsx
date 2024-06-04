import {ButtonBorder} from "@/components/Widgets/atoms/StandardBorderButton";
import { auth } from "@/components/global/firebase";
import { CiLogout } from "react-icons/ci";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import Link from "next/link";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import useSingleActionGuard from "@/components/hooks/useSingleActionGuard";

interface DashboardSidebarProps {
    children?:any
}

const DashboardSidebar = (props: DashboardSidebarProps) => {
  const router = useRouter()
  const singleExecutionGuard = useSingleActionGuard()
  return (
    <div className="h-screen w-full flex flex-row">
        <div className="bg-orange-300 w-1/6 flex flex-col">
          <div className="h-1/2">
            <div className="hover:bg-orange-200 p-3">Chat</div>
            <div className="hover:bg-orange-200 p-3">Account</div>
            
            <Link href={"/dashboard/mylibrary"}>
              <div className="hover:bg-orange-200 p-3">My Library</div>
            </Link>
          </div>
          <div className="h-1/2 flex flex-col-reverse">

            <ButtonBorder className="w-fit m-2" onClick={() => {
              try {
                signOut(auth).then(() => {
                  router.replace("/account/login")
                })
              } catch (e) {
                console.log("ERR_IGNRED")
              }
            }} retargetRef={singleExecutionGuard}><CiLogout className="inline"/> Logout</ButtonBorder>
            <p className="text-orange-200 font-semibold font-nunito">
              <meter value={0} max={100} className="ml-2 mr-2 w-1/2 inline outline-none"/>
              0% used <BsFillQuestionCircleFill className="inline"/>
            </p>
          </div>
       </div>
       <div className="w-full p-2 flex flex-col items-center justify-center">
            {props.children}
       </div>
    </div>
  );
};

export default DashboardSidebar;