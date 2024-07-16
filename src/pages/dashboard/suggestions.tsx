import ChatBox from "@/components/Widgets/atoms/Chat";
import DashboardSidebar from "@/components/Widgets/templates/Sidebar";
import ReactLoading from "react-loading";
import { useUserInformation } from "@/components/global/userStandardContext";
import { useRef, useState } from "react";
import useSound from "use-sound";
import GradientHeading from "@/components/Widgets/GradientHeading";
import useRandomPrompts from "@/components/hooks/useRandomPrompt";
import Image from "next/image";
import { BadTag } from "@/components/Widgets/atoms/Tags";
import Light from "@/components/Widgets/Light";
import { IoMdSend } from "react-icons/io";

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
      wait?: boolean;
    }[]
  >([]);
  const UsrData = useUserInformation();
  const displayArea = useRef<HTMLDivElement | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const randomPrompts = useRandomPrompts();
  const handleRequest = (prompt: string): void => {
    (async () => {
      if (displayArea.current instanceof HTMLDivElement) {
        displayArea.current.scrollTo({
          top: window.innerHeight + displayArea.current.scrollHeight,
          behavior: "smooth",
        });
      }
      setResponses((prevResponses) => [
        ...prevResponses,
        { role: "User", message: prompt },
        { role: "Wordsworth", message: "", wait: true },
      ]);
      const body = JSON.stringify({
        prompt: prompt,
        user_information: UsrData?.UserInfo,
      });
      setIsGenerating(true);
      // Push user query to responses
      // Clear input field

      const req = await fetch("/api/ai_access_point", {
        method: "POST",
        body: body,
      });
      const responseJson = (await req.json())["ai_prompt"];
      setResponses((prevResponses) => {
        playSound();
        prevResponses[prevResponses.length - 1].wait = false;
        prevResponses[prevResponses.length - 1].message = responseJson;
        return [...prevResponses];
      });
      if (displayArea.current instanceof HTMLDivElement) {
        displayArea.current.scrollTo({
          top: window.innerHeight + displayArea.current.scrollHeight,
          behavior: "smooth",
        });
      }
      setIsGenerating(false);
      // Push AI response to responses
      return responseJson;
    })();
  };

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
                msg.role === "User" ? UsrData?.UserInfo?.displayName : msg.role
              }
              className={`animate__animated animate__fadeInUp ${
                msg.role !== "User" ? "animate__delay-2s" : ""
              }`}
              message={msg.message}
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
            <GradientHeading className="text-5xl from-orange-500 to-pink-500 from-20% to-80% via-amber-500 via-30% transition-all">
              Hi, I{"'"}m Wordsworth
            </GradientHeading>
            <div className="w-full text-center mt-5">
              <small className="block mb-2">
                Your personal AI reading companion, let{"'"}s have a chat!
              </small>
              <BadTag
                text={"You will unlock conversation saving at level 10!"}
                className="block"
              />
            </div>
            <div className="w-full flex flex-col gap-5 justify-center md:flex-col lg:flex-row xl:flex-row">
              {randomPrompts.map((value, key) => (
                <div
                  className="mt-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 p-[2px] rounded-md"
                  key={key}
                  onClick={() => handleRequest(value)}
                >
                  <Light
                    color="#00BCD4"
                    blurRadius={100}
                    className="w-[100px] h-[100px] absolute z-20"
                  />
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
      {/* <small
        className={`w-full mt-1 text-gray-400 font-semibold indent-5 flex flex-row transition-all ${
          isGenerating ? "opacity-1" : "opacity-0"
        }`}
      >
        Words worth is typing{" "}
        <ReactLoading
          type="bubbles"
          width={20}
          height={20}
          className="align-middle"
          color="#BDBDBD"
        />
      </small> */}
      <div className="p-2 w-full bg-white rounded-b-md flex flex-row gap-1 shadow-lg">
        <Input requestHandler={handleRequest} disabled={isGenerating} />
      </div>
    </DashboardSidebar>
  );
};

export default SuggestionChat;
