import { useAppContext } from "@/context/AppContext";
import { Redirect, Slot} from "expo-router";

export default function ProtectedLayout() {
    const {user} = useAppContext()

    return user ? <Slot/>:<Redirect href={'/(auth)/sign-in'} />
}
