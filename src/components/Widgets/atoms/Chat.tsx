import Image from "next/image";
import ReactLoading from "react-loading";
import "animate.css";
import { BadTag } from "./Tags";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useRef, useState } from "react";
import { MdReadMore } from "react-icons/md";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

interface ChatBoxProps {
  sender?: string;
  message: string | any;
  direction: "Left" | "Right";
  picture?: string | any;
  isLoading?: boolean;
  history?: any;
  className?: string;
  onFollowUp?: (question:string) => void;
}

interface SuggestedQuestionProps {
  q:string,
  onClick: () => any
}
const SuggestedQuestion = (props: SuggestedQuestionProps) => {

  return (
    <span className="block m-2 border-b p-2 hover:text-blue-900 transition-all cursor-pointer hover:indent-2" onClick={() => props.onClick()}>
      {typeof props.q === "string" ? props.q : props.q["question"]}
    </span>
  );
};



const ChatBox = (props: ChatBoxProps) => {
  const [showRelated, setShowRelated] = useState(true) 
  const wrappedClickedEvent = (question:string) => {
    if (props.onFollowUp)
       props.onFollowUp(typeof question == "string" ? question : question["question"])
    setShowRelated(false)
  }
  const this_chat = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
     if (props.isLoading === false) {
      if (this_chat.current instanceof HTMLDivElement) {
          this_chat.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
    }
  }, [props.isLoading, this_chat])
  return (
    <div className={`w-full flex flex-col mt-2 ${props.className}`} >
      <div
        className={`flex gap-2 ${
          props.direction === "Left"
            ? "flex-row"
            : props.direction === "Right"
            ? " flex-row-reverse self-end"
            : ""
        }`}
      >
        <Image
          src={props.picture ?? ""}
          alt="profile"
          width={25}
          height={25}
          className={`self-end rounded-full`}
        />
        <small className={`w-full noto-sans`}>{props.sender}</small>
      </div>

      <div
        className={`m-2 bg-[#eaeaea] p-2 rounded-lg w-fit max-w-[800px] ${
          props.direction === "Left"
            ? "rounded-tl-none"
            : props.direction === "Right"
            ? "rounded-tr-none self-end"
            : ""
        }`}
      >
        {!props.isLoading ? (
          <div className={`text-md dm-sans text-black`} ref={this_chat}>
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: (props) => {
                  return (
                    <a
                      href={props.href}
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      {props.children}
                    </a>
                  );
                },
                p: (props) => {
                  return <p className="m-2 mb-3">{props.children}</p>
                },
                li: (props) => {
                  return <li className="list-disc m-6">{props.children}</li>
                },
                strong: (props) => {
                  return <b className="font-extrabold md-li-bold">{props.children}</b>
                }
              }}
            >
              {props.message}
             
            </Markdown>
          </div>
        ) : (
          <ReactLoading type="bubbles" width={30} height={30} color="black" />
        )}
      </div>
      {props.history && showRelated ? (
        <p className="mt-5 ml-2">
          <h1 className="font-semibold text-2xl"><MdReadMore className="inline-block"/> Related Questions</h1>
          {props.history.map((question: any, key: number) => (
            <SuggestedQuestion q={question} onClick={() => wrappedClickedEvent(question)} key={key}/>
          ))}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default ChatBox;
