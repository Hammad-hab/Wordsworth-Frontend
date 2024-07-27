import { createContext, useContext, useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { User } from "firebase/auth";


interface UserContextType {
    didLevelUp: boolean ;
    setDidLevelUp: Dispatch<SetStateAction<boolean>>;
  }
  

const LevelUp = createContext<UserContextType | null>(null)
const useUserDidLevelUp = () => useContext(LevelUp)

export {
    LevelUp,
    useUserDidLevelUp
}