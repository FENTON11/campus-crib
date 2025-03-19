import React from "react";
import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const Emptystate = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <FontAwesome5 name="bell-slash" size={40} color="#9E9E9E" />
      <Text className="text-gray-500 mt-2 text-lg">No new notifications</Text>
    </View>
  );
};

export default Emptystate;
