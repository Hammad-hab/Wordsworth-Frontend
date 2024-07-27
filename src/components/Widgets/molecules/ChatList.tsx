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

interface ChatListProps {}
interface ChatListItemProps {
  chat: { name: string; id: string };
}

const ChatListItem = (props: ChatListItemProps) => {
  const [showDots, setShowDots] = useState(false);
  const acc = useUserInformation();
  const chats = useChatContext();
  const router = useRouter()
  return (
    <>
      <Link
        href={`/dashboard/suggestions?chat_id=${props.chat.id}`}
        className="flex flex-row items-center w-full"
        onMouseOver={() => setShowDots(true)}
        onMouseLeave={() => setShowDots(false)}
      >
        <li className="cursor-pointer ml-5 transition-all p-2 indent-2 hover:bg-[#01223958] rounded-md w-full">
          {props.chat.name.length > 11
            ? props.chat.name.slice(0, 10) + "..."
            : props.chat.name}
        </li>
        {showDots ?   <IoMdTrash
          className="text-2xl hover:text-red-500"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            toast.promise(
              async () => {
                const res = await fetch("http://0.0.0.0:8000/delete_chat", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    usrstorageid: acc?.UserInfo?.userstorageid,
                    chat_id: props.chat.id,
                  }),
                });
                if (res.status !== 200) throw `err`;
                chats?.setChats((prev) =>
                  prev?.filter((value) => value.id != props.chat.id)
                );
                router.replace("/dashboard")
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
  const [hasDoneRequest, setHasDoneRequest] = useState(chats?.chats?.length! > 0 ? true : false);
  useEffect(() => {
    if (!usrdata?.UserInfo?.AccessableChats) return
    if (usrdata.UserInfo && usrdata.UserInfo.AccessableChats.length <= 0)  {
      setHasDoneRequest(true)
      return
    };
    try {
      (async () => {
        const CHATS: any[] = [];
        for await (const chat of usrdata?.UserInfo?.AccessableChats) {
          try {
            const promise = (
              await (
                await fetch(`http://0.0.0.0:8000/get_chat_name?chat_id=${chat}`)
              ).json()
            )["results"];

            if (
              promise &&
              !chats?.chats?.includes({ name: promise.name, id: chat })
            ) {
              if (CHATS.includes({ name: promise.name, id: chat })) continue;
              CHATS.push({ name: promise.name, id: chat });
            }
          } catch (e) {
            toast.error(`Error while looking up chat@${chat}`);
          }
        }
        chats?.setChats((prev: any) => {
          return CHATS;
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
    return <p className="opacity-50 ml-2">You have no chats</p>
  return (
    <ul>
      
      {chats?.chats?.length && hasDoneRequest? (
          chats?.chats?.map((chat: any, k: any) => (
            <ChatListItem key={k} chat={chat} />
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
