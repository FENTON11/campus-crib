import { User } from '@/typings';
import React, { createContext, ReactNode, useContext, useState } from 'react'

const AppContext = createContext<{
    user: User | null;
    mode: "light" | "dark";
}>({
    user: null,
    mode: 'light'
});
const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<"light" | "dark">('light');
    const [user, setUser] = useState<User | null>(null);
  //  console.log(children)
    const share = {
        mode,setMode,user, setUser
    }
  return (
    <AppContext.Provider value={{...share}} > {children} </AppContext.Provider>
   
  )
}

export const useAppContext = ()=>{
    return useContext(AppContext)
    
}

export default AppContextProvider