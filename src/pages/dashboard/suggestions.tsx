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
import { jsonrepair } from "jsonrepair";
import {
  getUsrInformation,
  updateUsrInformation,
} from "@/components/global/firestore";
import {
  clearObjectLocalStorage,
  setObjectLocalStorage,
} from "@/components/global/superglobal_utils";
import Overlay from "@/components/Widgets/atoms/Overlay";
import { toast } from "react-toastify";
import { useChatContext } from "@/components/global/useChatContext";
import { arrayUnion } from "firebase/firestore";
import SuggestionInputBox from "@/components/Widgets/atoms/SuggestionInputBox";
import WordsWorthLogo from "@/components/Widgets/atoms/WordsworthLogo";
import QuestionExample from "@/components/Widgets/molecules/QuestionExample";

interface SuggestionChatProps {}

const SuggestionChat = (props: SuggestionChatProps) => {
  const [playSound] = useSound("/Sfx/chat_pop.wav", {
    volume: 0.5,
  });

  const [responses, setResponses] = useState<
    {
      role: string;
      message: string | { type: string; content: string };
      history?: any;
      wait?: boolean;
    }[]
  >([]);
  const UsrData = useUserInformation();
  const UserAccount = useUserAccountInformation();
  const displayArea = useRef<HTMLDivElement | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const randomPrompts = useRandomPrompts();
  const chats = useChatContext();
  const [
    loadingPreloadConversation,
    setIsLoadingPreloadConversation,
  ] = useState(false);
  const { chat_id } = useRouter().query;
  const user_chatting_id = useRef(chat_id);
  const router = useRouter();

  useEffect(() => {
    if (!chat_id) return;
    user_chatting_id.current = chat_id;
  }, [chat_id]);

  useEffect(() => {
    if (!chat_id) return;
    setIsLoadingPreloadConversation(true);
    const BODY = JSON.stringify({
      chat_id: chat_id,
      usrstorageid: UsrData?.UserInfo?.userstorageid,
    });

    (async () => {
      try {
        const req = await fetch(
          "https://words-worth-backend.vercel.app/load_chat",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: BODY,
          }
        );
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

        await updateUsrInformation(UserAccount?.uid!, {
          AccessableChats: chats
            ?.chats!.filter((value) => value.id !== chat_id)
            .map((v) => v.id),
        });
        chats?.setChats(chats?.chats!.filter((value) => value.id !== chat_id));
        clearObjectLocalStorage();
        router.replace("/dashboard");
      }
    })();
  }, [chat_id, UsrData?.UserInfo?.userstorageid]);

  const handleRequest = (prompt: string, callback?: any) => {
    (async () => {
      if (!UserAccount?.uid) return;

      setResponses((prevResponses) => {
        const newResponses = [...prevResponses];
        if (newResponses.length > 0)
          newResponses[newResponses.length - 1].history = 0;
        return [
          ...newResponses,
          { role: "User", message: prompt },
          { role: "Wordsworth", message: "", wait: true },
        ];
      });

      if (!user_chatting_id.current && !chat_id) {
        const create_req = await fetch(
          "https://words-worth-backend.vercel.app/create_chat",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              usrstorageid: UsrData?.UserInfo?.userstorageid,
              chat_name: prompt,
            }),
          }
        );
        const chat_identifier = (await create_req.json())["chat_id"];
        user_chatting_id.current = chat_identifier;
        updateUsrInformation(UserAccount.uid, {
          AccessableChats: arrayUnion(chat_identifier),
        });
        clearObjectLocalStorage();
        chats?.setChats((prev) =>
          prev
            ? [...prev, { name: prompt, id: chat_identifier, isCustom: true }]
            : prev
        );
      }

      try {
        const ai_question = await fetch(
          "https://words-worth-backend.vercel.app/query",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              usrstorageid: UsrData?.UserInfo?.userstorageid,
              chat_id: user_chatting_id.current,
              question: prompt,
            }),
          }
        );
        const ai_response = await ai_question.json();
        const hist = ai_response["history"];

        try {
          setResponses((prevResponses) => {
            const newResponses = [...prevResponses];
            newResponses[newResponses.length - 1] = {
              ...newResponses[newResponses.length - 1],
              message: ai_response["response"],
              history: JSON.parse(jsonrepair(hist)),
              wait: false,
            };
            return newResponses;
          });
        } catch {
          setResponses((prevResponses) => {
            const newResponses = [...prevResponses];
            newResponses[newResponses.length - 1] = {
              ...newResponses[newResponses.length - 1],
              message:
                "It seems that there is a problem with your internet connection, kindly reconnect and reload.",
              history: ["I've fixed the error"],
              wait: false,
            };
            return newResponses;
          });
        }
      } catch (e) {
        setResponses((prevResponses) => {
          const newResponses = [...prevResponses];
          newResponses[newResponses.length - 1] = {
            ...newResponses[newResponses.length - 1],
            message:
              "It seems that there is a problem with your internet connection, kindly reconnect and reload.",
            history: ["I've fixed the error"],
            wait: false,
          };
          return newResponses;
        });
      }

      console.log(responses);
      if (typeof callback == "function") callback();
    })();
  };
  if (!loadingPreloadConversation)
    return (
      <DashboardSidebar className="p-2 pb-0">
        <div
          className={`flex flex-col p-10 overflow-auto bg-zinc-800 h-full w-full fadedScroll rounded-md rounded-b-none`}
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
                onFollowUp={(question) => handleRequest(question)}
              />
            ))
          ) : (
            <div>
              <WordsWorthLogo width={250} height={250} />
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
                  <QuestionExample
                    onClick={() => handleRequest(value)}
                    label={value}
                    key={key}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="p-2 w-full bg-zinc-700 rounded-b-md flex flex-row gap-1 shadow-lg">
          <SuggestionInputBox
            requestHandler={handleRequest}
            disabled={isGenerating}
          />
        </div>
      </DashboardSidebar>
    );
  else
    return (
      <DashboardSidebar>
        <ReactLoading type="bubbles" color="white" />
        <p>Loading your previous conversation...</p>
      </DashboardSidebar>
    );
};

export default SuggestionChat;
