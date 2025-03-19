import { useAppContext } from "@/context/AppContext";
import { SocketContextProvider } from "@/context/SocketContext";
import { Redirect, Slot } from "expo-router";

export default function ProtectedLayout() {
  const { user } = useAppContext();
  if (user) {
    return (
      <SocketContextProvider>
        <Slot />
      </SocketContextProvider>
    );
  } else {
    return <Redirect href={"/(auth)/auth"} />;
  }
  // return user ? <Slot /> : <Redirect href={"/(auth)/auth"} />;
}
