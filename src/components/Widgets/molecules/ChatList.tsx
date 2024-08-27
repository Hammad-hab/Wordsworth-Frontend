import { useChatContext } from "@/components/global/useChatContext";
import {
  useUserAccountInformation,
  useUserInformation,
} from "@/components/global/userStandardContext";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { IoMdTrash } from "react-icons/io";
import Dropdown from "./Dropdown";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";
import { clearObjectLocalStorage } from "@/components/global/superglobal_utils";
import { setUsrInformation, updateUsrInformation } from "@/components/global/firestore";

interface ChatListProps {}
interface ChatListItemProps {
  chat: { name: string; chat_id: string };
  orginalId: any
}

const ChatListItem = (props: ChatListItemProps) => {
  const [showDots, setShowDots] = useState(false);
  const [hasBeenDeleted, setDeletionState] = useState(false)
  const acc = useUserInformation();
  const acc_info = useUserAccountInformation();
  const chats = useChatContext();
  const router = useRouter()
  console.log(props.chat)
  return (
    <>
      <Link
        href={`/dashboard/suggestions?chat_id=${props.chat.chat_id}`}
        className="flex flex-row items-center w-full"
        onMouseOver={() => setShowDots(true)}
        onMouseLeave={() => setShowDots(false)}
        hidden={hasBeenDeleted}
      >
        <li className={`cursor-pointer ml-5 transition-all p-2 indent-2 ${props.orginalId === props.chat.chat_id ? "bg-[#01223958]" : "hover:bg-[#01223958]"} rounded-md w-full`} title={props.chat.name}  hidden={hasBeenDeleted}>
          {props.chat.name.length > 18
            ? props.chat.name.slice(0, 17) + "..."
            : props.chat.name}
        </li>
        {showDots ?   <IoMdTrash
          className="text-2xl hover:text-red-500"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            toast.promise(
              async () => {
                try {
                  const res = await fetch("https://words-worth-backend.vercel.app/delete_chat", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      usrstorageid: acc?.UserInfo?.userstorageid,
                      chat_id: props.chat.chat_id,
                    }),
                  });
                  // if (res.status !== 200) throw `err`;
                  chats?.setChats((prev) =>
                    prev?.filter((value) => value.id !== props.chat.chat_id && value.name !==  props.chat.name)
                  );
                  await updateUsrInformation(acc_info?.uid!, {
                    "AccessableChats": chats?.chats!.filter(value => value.id !== props.chat.chat_id).map(v => v.id)
                  })
                  clearObjectLocalStorage()
                  setDeletionState(true)
                  if (router.query.chat_id == props.chat.chat_id)
                      router.replace("/dashboard")
                } catch(e) {
                  console.log(e)
                  if (acc?.UserInfo?.AccessableChats) {
                    acc.UserInfo.AccessableChats = chats?.chats?.filter((value:any) => value.id !== props.chat.chat_id).map((v:any) => v.id)
                    acc.setUserInfo(acc.UserInfo)
                    await setUsrInformation(acc_info?.uid!, acc.UserInfo)
                    clearObjectLocalStorage()
                  } else {
                    toast.error("ERROR, Core-Level FAILURE, please report this.")
                  }
                  if (router.query.chat_id == props.chat.chat_id)
                    router.replace("/dashboard")
                }
               },
              {
                error: "Failed to delete chat, please try again",
                success: `Successfully deleted ${props.chat.name}`,
                pending: "Deleting chat...",
              }
            );
            
          }}
        /> : ""}
      
      </Link>
    </>
  );
};

const ChatList = (props: ChatListProps) => {
  const usrdata: any = useUserInformation();
  const chats = useChatContext();
  const router = useRouter()
  const {chat_id} = router.query
  const [hasDoneRequest, setHasDoneRequest] = useState(chats?.chats?.length! > 0 ? true : false);
  useEffect(() => {
    if (!usrdata?.UserInfo?.AccessableChats) return
    if (usrdata.UserInfo && usrdata.UserInfo.AccessableChats.length <= 0)  {
      setHasDoneRequest(true)
      return
    };
    try {
      (async () => {
        const promsie = await (await fetch(`https://words-worth-backend.vercel.app/get_chat_names`, {
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_ids: usrdata?.UserInfo?.AccessableChats
          }),
        })).json()
        chats?.setChats((prev: any) => {
          return [...(chats.chats?.filter(v => v.isCustom) ?? []), ...(promsie["results"] ?? [])];
        });
        setHasDoneRequest(true);
      })();
    } catch (e) {
      toast.error(
        "It seems that we have run into an error while loading your chats!"
      );
      setHasDoneRequest(true);
      console.log(chats, hasDoneRequest)
    }
  }, [usrdata?.UserInfo?.AccessableChats]);
  if (!chats?.chats?.length && hasDoneRequest)
    return <p className="opacity-50 ml-2 indent-5">You have no chats</p>
  return (
    <ul>
      
      {chats?.chats?.length && hasDoneRequest? (
          chats?.chats?.map((chat: any, k: any) => (
            <ChatListItem key={k} chat={chat} orginalId={chat_id} /> 
          ))
      ) : (
        <>
        <li className="skel_animation cursor-pointer ml-5 transition-all p-3 border-l-2 border-[#0c2638d3] rounded-md opacity-50"></li>
        <li className="skel_animation cursor-pointer ml-5 transition-all p-3 border-l-2 border-[#0c2638d3] rounded-md mt-2 opacity-50"></li>
        <li className="skel_animation cursor-pointer ml-5 transition-all p-3 border-l-2 border-[#0c2638d3] rounded-md mt-2 opacity-50"></li>
      </>
      )}
    </ul>
  );
};

export default ChatList;
