import Image from "next/image";
import ReactLoading from "react-loading";
import "animate.css";
import { BadTag } from "./Tags";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ChatBoxProps {
  sender?: string;
  message: string | any;
  direction: "Left" | "Right";
  picture?: string | any;
  isLoading?: boolean;
  history?:any
  className?: string;
}

const ModifiedImage = (props: {
  content: string;
  name: string;
  caption?: string;
}) => {
  if (props.name !== "author_name")
    return (
      <div className="flex flex-col m-2 w-full rounded-md items-center">
        <Image
          className="block skel_animation rounded-md"
          src={props.content}
          alt={props.name}
          width={250}
          height={250}
        />
        <div className="p-2">{props.name}</div>
      </div>
    );
};

const Parseify = (props: {
  contents: { type: string; content: string; label?: string }[];
}) => {
  return (
    <>
      {props.contents.map((x, key) => {
        if (x.type === "Heading")
          return (
            <h1
              key={key}
              className="font-semibold text-2xl mb-5 border-b-2 w-fit border-double mt-2"
            >
              {x.content}
            </h1>
          );
        if (x.type === "Paragraph" || x.type === "Text") {
          return (
            <span key={key} className="block">
              {x.content}
            </span>
          );
        }

        if (x.type === "Inappropriate")
          return (
            <BadTag
              key={key}
              text={x.content}
            />
          );
      })}
    </>
  );
};

const ChatBox = (props: ChatBoxProps) => {
  return (
    <div className={`w-full flex flex-col mt-2 ${props.className}`}>
      <p className="bg-red-500">
          {(props.history)}
        </p>
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
        className={`m-2 bg-[#eaeaea] p-2 rounded-lg w-fit ${
          props.direction === "Left"
            ? "rounded-tl-none"
            : props.direction === "Right"
            ? "rounded-tr-none self-end"
            : ""
        }`}
      >
        {!props.isLoading ? (
          <div className={`text-md dm-sans text-black`}>
           <Markdown remarkPlugins={[remarkGfm]} components={{
            a: (props) => {
              return <a href={props.href} className="text-blue-500 hover:underline">{props.children}</a>
            }
           }}>{props.message}</Markdown>
          </div>
        ) : (
          <ReactLoading type="bubbles" width={30} height={30} color="black" />
        )}
      </div>
        
    </div>
  );
};

export default ChatBox;
