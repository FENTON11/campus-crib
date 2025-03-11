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

type AppContextProps = {
  user: User | null;
  mode: "light" | "dark";
  setUser: (user: User | null) => void;
  updateUser: (user: User) => void;
};

const AppContext = createContext<AppContextProps>({
  user: null,
  mode: "light",
  setUser: (user: User | null) => {},
  updateUser: (user: User) => {},
});

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const updateUser = (user: User) => {
    setUser(user);
  };
  const logout = () => {
    setUser(null);
  };

  const getUser = async () => {
    try {
      setLoading(true);
      let user = await getItemFromSecureStore("campus-crib-user");
      // console.log("saved user", user);
      if (!user) {
        const user = await authService.getUser();

        console.log("user from db", user);
        if (user) {
          await saveItemToSecureStore("campus-crib-user", user);
        }
      }
      if (user) {
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
