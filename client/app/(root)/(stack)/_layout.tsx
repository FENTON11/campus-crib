import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

//added it because i want to display a scren as a model
const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='filters'
        options={{
          headerShown: true,
          presentation: "containedTransparentModal",
          animationTypeForReplace: "push",
        }}
      />
    </Stack>
  );
};

export default StackLayout;
