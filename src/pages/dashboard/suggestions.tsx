import ChatBox from "@/components/Widgets/atoms/Chat";
import DashboardSidebar from "@/components/Widgets/templates/Sidebar";
import ReactLoading from "react-loading";
import {
  useUserAccountInformation,
  useUserInformation,
} from "@/components/global/userStandardContext";
import { useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import GradientHeading from "@/components/Widgets/GradientHeading";
import useRandomPrompts from "@/components/hooks/useRandomPrompt";
import Image from "next/image";
import { BadTag } from "@/components/Widgets/atoms/Tags";
import Light from "@/components/Widgets/Light";
import { IoMdSend } from "react-icons/io";
import { useUserDidLevelUp } from "@/components/hooks/contexts/userDidLevelup";
import { useRouter } from "next/router";
import {
  getUsrInformation,
  updateUsrInformation,
} from "@/components/global/firestore";
import { clearObjectLocalStorage, setObjectLocalStorage } from "@/components/global/superglobal_utils";
import Overlay from "@/components/Widgets/atoms/Overlay";
import { toast } from "react-toastify";
import { useChatContext } from "@/components/global/useChatContext";

interface SuggestionChatProps {}
const Input = (props: {
  requestHandler: (prompt: string) => void;
  disabled: boolean;
}) => {
  const [userQuery, setUserQuery] = useState("");
  return (
    <div className="w-full flex flex-row border border-[#dddde0] rounded-md">
      {/* border border-[#dddde0] */}
      <textarea
        className={`w-full p-2 mt-1 pl-4 pr-4 outline-none rounded-md h-[45px] dm-sans resize-none ${
          props.disabled ? "cursor-not-allowed" : ""
        } placeholder:text-md`}
        placeholder="Type message"
        value={userQuery}
        contentEditable={props.disabled}
        onChange={(e) =>
          !props.disabled
            ? setUserQuery(e.target.value)
            : e.currentTarget.blur()
        }
        onFocus={(e) => (props.disabled ? e.currentTarget.blur() : "")}
        onKeyDown={(e) => {
          if (
            e.key === "Enter" &&
            userQuery.trim().length > 0 &&
            !props.disabled
          ) {
            e.preventDefault();
            const nil = props.requestHandler(userQuery);
            setUserQuery("");
            e.currentTarget.blur();
          }
        }}
      />
      <IoMdSend
        className={`text-5xl p-3 rounded-md  transition-all rounded-l-none ${
          !userQuery ? "bg-cyan-600" : "bg-cyan-500 hover:bg-cyan-600"
        }`}
        onClick={() => {
          props.requestHandler(userQuery);
          setUserQuery("");
        }}
      />
    </div>
  );
};

const SuggestionChat = (props: SuggestionChatProps) => {
  const [playSound] = useSound("/Sfx/chat_pop.wav", {
    volume: 0.5,
  });

  const [responses, setResponses] = useState<
    {
      role: string;
      message: string | { type: string; content: string };
      history?: any
      wait?: boolean;
    }[]
  >([]);
  const UsrData = useUserInformation();
  const UserAccount = useUserAccountInformation();
  const displayArea = useRef<HTMLDivElement | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const randomPrompts = useRandomPrompts();
  const [hasLoadedConversation, setHasLoadedConversation] = useState(false);
  const chats = useChatContext()
  const [
    loadingPreloadConversation,
    setIsLoadingPreloadConversation,
  ] = useState(false);
  const { chat_id } = useRouter().query;
  const user_chatting_id = useRef(chat_id)
  const router = useRouter();

  useEffect(() => {
    if (!chat_id) return;
    setIsLoadingPreloadConversation(true);
    const BODY = JSON.stringify({
      chat_id: chat_id,
      usrstorageid: UsrData?.UserInfo?.userstorageid,
    });

    (async () => {
      try {
        const req = await fetch("http://0.0.0.0:8000/load_chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: BODY,
        });
        const history = (await req.json())["chat_id"];
        console.log(history);
        const valid_hist: any = [];
        for (const hist of history) {
          if (hist.role === "user")
            valid_hist.push({ role: "User", message: hist.parts[0]["text"] });
          else if (hist.role === "model")
            valid_hist.push({
              role: "Wordsworth",
              message: hist.parts[0]["text"],
            });
        }
        setResponses(valid_hist);
        setIsLoadingPreloadConversation(false);
      } catch (e) {
        toast.error("Chat not found!");
        router.replace("/dashboard");
      }
    })();
  }, [chat_id, UsrData?.UserInfo?.userstorageid]);

  // const handleRequest = (prompt:string) => {
  //   (async () => {
  //         if (displayArea.current instanceof HTMLDivElement) {
  //           displayArea.current.scrollTo({
  //             top: window.innerHeight + displayArea.current.scrollHeight,
  //             behavior: "smooth",
  //           });
  //         }
  //         if (!UserAccount?.uid) return;
  //
  //         let alt_id = ""
  //         if (!chat_id) {
  //           const req = await fetch("http://0.0.0.0:8000/create_chat", {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({
  //               usrstorageid: UsrData?.UserInfo?.userstorageid,
  //               chat_name: prompt,
  //             }),
  //           })
  //           alt_id = (await req.json())["chat_id"]
  //           if (req.status !== 200) {
  //             toast.error("Error trying to create chat. Please reload and try again")
  //             return
  //           }
  //           updateUsrInformation(UserAccount.uid, {
  //             "AccessableChats": [alt_id]
  //           })
  //         }

  //         const req = await fetch("http://0.0.0.0:8000/query", {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({
  //               usrstorageid: UsrData?.UserInfo?.userstorageid,
  //               chat_id: chat_id ? chat_id : alt_id,
  //               question: prompt
  //             }),
  //           })
  //         const repsonse = (await req.json())["response"]
  //         console.log(repsonse)
  //         setResponses((prevResponses: any) => {
  //           prevResponses[prevResponses.length - 1].wait = false
  //           prevResponses[prevResponses.length - 1].message = repsonse
  //           return prevResponses
  //         });

  //         setIsGenerating(false);
  //         // // Push AI response to responses
  //         // return responseJson;
  //       })();
  // }
  const handleRequest = (prompt: string) => {
   (async () => {
      if (!UserAccount?.uid) return;

      
      setResponses((prevResponses) => [
        ...prevResponses,
        { role: "User", message: prompt },
        { role: "Wordsworth", message: "", wait: true },
      ]);

      if (!user_chatting_id.current)
      {
        const create_req = await fetch("http://0.0.0.0:8000/create_chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usrstorageid: UsrData?.UserInfo?.userstorageid,
            chat_name: prompt,
          }),
        });
        const chat_identifier = (await create_req.json())["chat_id"]
        user_chatting_id.current = chat_identifier
        updateUsrInformation(UserAccount.uid, {
            "AccessableChats": [...(UsrData?.UserInfo?.AccessableChats ?? []), user_chatting_id.current]
        })
        clearObjectLocalStorage()
        chats?.setChats(prev => prev ? [
          ...prev,
          {name: prompt, id: chat_identifier}
        ] : prev)
      }

      const ai_question = await fetch("http://0.0.0.0:8000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usrstorageid: UsrData?.UserInfo?.userstorageid,
          chat_id: user_chatting_id.current,
          question: prompt
        }),
      });

      const ai_response = (await ai_question.json())
      // console.log(ai_response)
      // setResponses(prev => {
      //   prev[prev.length - 1].message = ai_response
      //   prev[prev.length - 1].wait = false
      //   return prev
      // })

      setResponses((prevResponses) => {
        const newResponses = [...prevResponses];
        newResponses[newResponses.length - 1] = {
          ...newResponses[newResponses.length - 1],
          message: ai_response["response"],
          history: ai_response["history"],
          wait: false,
        };
        return newResponses;
      });
      
      console.log(responses)
    })()
  };
  // const handleRequest = (...props) => props;
  if (!loadingPreloadConversation)
    return (
      <DashboardSidebar className="p-2 unov-white pb-0">
        <div
          className={`flex flex-col p-10 overflow-auto bg-white h-full w-full fadedScroll rounded-md`}
          ref={displayArea}
        >
          {responses.length > 0 ? (
            responses.map((msg, key) => (
              <ChatBox
                key={key}
                sender={
                  msg.role === "User"
                    ? UsrData?.UserInfo?.displayName
                    : msg.role
                }
                className={`${
                  !chat_id ? "animate__animated animate__fadeInUp" : ""
                } ${
                  msg.role !== "User" && !chat_id ? "animate__delay-2s" : ""
                }`}
                message={msg.message}
                history={msg.history}
                picture={
                  msg.role === "User"
                    ? UsrData?.UserInfo?.profilePicture
                    : "/Images/logo.jpeg"
                }
                direction={msg.role === "User" ? "Right" : "Left"}
                isLoading={msg.wait}
              />
            ))
          ) : (
            <div>
              <Image
                src="/Images/logo.jpeg"
                width={250}
                height={250}
                alt="Wordsworth"
                className="rounded-full block m-auto"
              />
              <GradientHeading className="text-4xl from-orange-500 to-pink-500 from-20% to-80% via-amber-500 via-30% transition-all">
                Hi, I{"'"}m Wordsworth
              </GradientHeading>
              <div className="w-full text-center mt-5">
                <small className="block mb-2">
                  Your personal AI reading companion, let{"'"}s have a chat!
                </small>
              </div>
              <div className="w-full flex flex-col gap-5 justify-center md:flex-col lg:flex-row xl:flex-row">
                {randomPrompts.map((value, key) => (
                  <div
                    className="mt-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 p-[2px] rounded-md"
                    key={key}
                    onClick={() => handleRequest(value)}
                  >
                    <div
                      className={`bg-gray-400 p-5 rounded-sm shadow-md hover:opacity-80 transition-all card cursor-pointer`}
                    >
                      {/* <Light color=""/> */}
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="p-2 w-full bg-white rounded-b-md flex flex-row gap-1 shadow-lg">
          <Input requestHandler={handleRequest} disabled={isGenerating} />
        </div>
      </DashboardSidebar>
    );
  else
    return (
      <DashboardSidebar>
        <ReactLoading type="cylon" color="black" />
        <p>Loading your previous conversation...</p>
      </DashboardSidebar>
    );
};

export default SuggestionChat;
