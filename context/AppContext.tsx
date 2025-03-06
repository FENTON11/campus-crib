import { authService } from "@/appwrite/authService";
import { getItemFromSecureStore, saveItemToSecureStore } from "@/lib";
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
  const [user, setUser] = useState<User | null | any>();
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      setLoading(true);
      let user = await getItemFromSecureStore("user");
      if (!user) {
        user = await authService.getUser();
        if (user) {
          await saveItemToSecureStore("user", user);
        }
      }
      if (user) {
        console.log("user", user);
        setUser(user);
      }
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

  const share = {
    mode,
    setMode,
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
