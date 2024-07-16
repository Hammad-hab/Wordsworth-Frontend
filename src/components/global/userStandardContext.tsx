import { createContext, useContext, useEffect, useState } from "react";
import { UserInformation } from "./interfaces";
import { Dispatch, SetStateAction } from "react";
import { asyncOnAuthStateChanged } from "./firestore";
import { User } from "firebase/auth";

interface UserContextType {
  UserInfo: UserInformation | undefined;
  setUserInfo: Dispatch<SetStateAction<UserInformation | undefined>>;
}

const UserContext = createContext<UserContextType | null>(null);
const useUserInformation = () => {
  const context = useContext(UserContext);
  return context;
};

const useUserAccountInformation = () => {
  const [context, setContext] = useState<User | null>();
  useEffect(() => {
    (async () => {
      const ncontext = await asyncOnAuthStateChanged();
      setContext(ncontext);
    })()
  }, []);
  return context;
};
interface ProviderProps {
  value: UserContextType;
  children: any;
}

const Provider = (props: ProviderProps) => {
  return (
    <UserContext.Provider value={props.value}>
      {props.children}
    </UserContext.Provider>
  );
};

export { Provider, UserContext, useUserInformation, useUserAccountInformation };

export type { UserContextType };
