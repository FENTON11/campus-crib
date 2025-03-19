import { useAppContext } from "@/context/AppContext";
import { Redirect, Slot } from "expo-router";

export default function ProtectedLayout() {
  const { user } = useAppContext();
  if(user){
    return <Slot/>
  }else{
    return <Redirect href={"/(auth)/auth"} />;
  }
  // return user ? <Slot /> : <Redirect href={"/(auth)/auth"} />;
}
