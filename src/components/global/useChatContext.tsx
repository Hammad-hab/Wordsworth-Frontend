import { createContext, useContext, useEffect, useState } from "react";
import { UserInformation } from "./interfaces";
import { Dispatch, SetStateAction } from "react";
import { asyncOnAuthStateChanged } from "./firestore";
import { User } from "firebase/auth";


interface ChatContextType {
    chats: {name:string, id:string}[] | undefined;
    setChats: Dispatch<SetStateAction<{name:string, id:string}[]  | undefined>>;
}

const ChatContext = createContext<ChatContextType | null>(null)

interface ProviderProps {
    value: ChatContextType;
    children: any;
  }
const ChatProvider = (props: ProviderProps) => {
    return (
      <ChatContext.Provider value={props.value}>
        {props.children}
      </ChatContext.Provider>
    );
  };

const useChatContext = () => useContext(ChatContext)

export {
    ChatProvider,
    ChatContext,
    useChatContext
}