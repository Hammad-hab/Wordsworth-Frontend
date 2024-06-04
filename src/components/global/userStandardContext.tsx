import { createContext } from "react";
import { UserInformation } from "./firestore";
import {Dispatch, SetStateAction} from "react"

interface UserContextType {
    UserInfo: UserInformation | undefined,
    setUserInfo: Dispatch<SetStateAction<UserInformation | undefined>>
}

const UserContext = createContext<UserContextType|null>(null)


interface ProviderProps {
    value: UserContextType,
    children: any
}

const Provider = (props:ProviderProps) => {
    return <UserContext.Provider value={props.value}>{props.children}</UserContext.Provider>
}

export {
    Provider,
    UserContext
}

export type {
    UserContextType
}