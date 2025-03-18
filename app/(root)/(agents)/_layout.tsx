import React from "react";
import { Redirect, Slot } from "expo-router";
import { useAppContext } from "@/context/AppContext";

const AgentsLayout = () => {
  const { user } = useAppContext();
  // TODO: check the user accessing this layout whether its an agent or not
  return user && user.isAgent ? (
    <Slot />
  ) : (
    <Redirect href={"/(root)/(tabs)/home"} />
  );
};

export default AgentsLayout;
