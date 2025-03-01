import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import "./global.css";
import { useFonts } from "expo-font";
import AppContextProvider from "@/context/AppContext";
export default function RootLayout() {
  const [fontLoaded] = useFonts({
    "poppins-black": require("@/assets/fonts/Poppins-Black.ttf"),
    "poppins-regular": require("@/assets/fonts/Poppins-Regular.ttf"),
    "poppins-thin": require("@/assets/fonts/Poppins-Thin.ttf"),
    "poppins-bold": require("@/assets/fonts/Poppins-ExtraBold.ttf"),
    "poppins-semi-bold": require("@/assets/fonts/Poppins-SemiBold.ttf"),
    "poppins-light": require("@/assets/fonts/Poppins-Light.ttf"),
    "poppins-italic": require("@/assets/fonts/Poppins-Italic.ttf"),
  });
  useEffect(() => {
    if (fontLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded]);

  if (!fontLoaded) {
    return null;
  }
  return (
      <AppContextProvider>
       <Stack screenOptions={{headerShown:false}}/>
      </AppContextProvider>
  );
}