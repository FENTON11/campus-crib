import { View, Text, Platform, Alert } from "react-native";
import React from "react";

const MyAlert = ({ error }: { error: Error }) => {
  if (Platform.OS === "web") {
    return alert("Error: " + (error?.message || "Failed to get user"));
  } else {
    return Alert.alert("Error", error?.message || "Failed to get user");
  }
};

export default MyAlert;
