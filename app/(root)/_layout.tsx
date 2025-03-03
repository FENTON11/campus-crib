import { useAppContext } from "@/context/AppContext";
import { Redirect, Slot } from "expo-router";

export default function ProtectedLayout() {
  const { user } = useAppContext();
  console.log("user", user);

  return user ? <Slot /> : <Redirect href={"/"} />;
}
