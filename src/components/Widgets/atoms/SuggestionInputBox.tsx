import { useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";

const SuggestionInputBox = (props: {
    requestHandler: (prompt: string, callback?:any) => void;
    disabled: boolean;
  }) => {
    const [userQuery, setUserQuery] = useState("");
    const inputRef = useRef<any>(null)
    return (
      <div className="w-full flex flex-row rounded-md">
        {/* border border-[#dddde0] */}
        <textarea
          ref={inputRef}
          autoFocus
          
          className={`w-full p-2 pl-4 pr-4 outline-none rounded-md rounded-r-none h-[48px] dm-sans resize-none bg-zinc-300 placeholder:text-zinc-500 text-black ${
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
            props.requestHandler(userQuery, ()=> inputRef.current.focus());
            setUserQuery("");
          }}
        />
      </div>
    );
  };


export default SuggestionInputBox;