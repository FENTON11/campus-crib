import { authService } from "@/appwrite/authService";
import { User } from "@/typings";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";

const AppContext = createContext<{
  user: User | null;
  mode: "light" | "dark";
}>({
  user: null,
  mode: "light",
});
const AppContextProvider = ({ children }: { children: ReactNode }) => {
  
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [user, setUser] = useState<User | null | any>(null);
  const [loading,setLoading] = useState(false);
  const getUser = async ()=>{
    try {
      setLoading(true)
      const session = await authService.getUser();
      if(session){
        setUser(session)
      }
      
    } catch (error) {
      const err = error as Error
      return Alert.alert('Error',err?.message || "failed to get user")
    }
    finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    getUser()
  },[])
  //  console.log(children)
  const share = {
    mode,
    setMode,
    user,
    setUser,
  };
  return (
    <AppContext.Provider value={{ ...share }}> { loading ? <ActivityIndicator/>: children} </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContextProvider;
