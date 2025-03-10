import { authService } from "@/appwrite/authService";
import { getItemFromSecureStore, saveItemToSecureStore } from "@/lib";
import { seedProperties } from "@/lib/seed";
import { User } from "@/typings";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ActivityIndicator, Alert, Platform, View } from "react-native";

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
  const [loading, setLoading] = useState(true);

  const updateUser = (user:User)=>{
    setUser(user)
  }

  const getUser = async () => {
    try {
      setLoading(true);
      const user = await authService.getUser();
      // let user = await getItemFromSecureStore("user");
      // console.log("saved user", user);
      if (!user) {
        console.log("user from db", user);

        // if (user) {
        //   await saveItemToSecureStore("user", null);
        // }
      }
      // if (user) {
      //   console.log("user", user);
      //   setUser(user);
      // }
    } catch (error) {
      const err = error as Error;
      if (Platform.OS === "web") {
        alert("Error: " + (err?.message || "Failed to get user"));
      } else {
        Alert.alert("Error", err?.message || "Failed to get user");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  // useEffect(() => {
  //   seedProperties();
  // }, []);

  const share = {
    mode,
    setMode,
    updateUser,
    user,
    setUser,
  };

  return (
    <AppContext.Provider value={{ ...share }}>
      {loading ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : (
        children
      )}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContextProvider;
