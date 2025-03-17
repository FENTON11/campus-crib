import { View, Text } from "react-native";
import React, { useState } from "react";
import { IMessege } from "@/typings";
import { useAppContext } from "@/context/AppContext";

const Messege = ({ text, sender }: IMessege) => {
  const { user } = useAppContext();
  const currentUserId = user?.$id;
  const [showMore, setShowMore] = useState(false); // Default to false
  const mine = currentUserId === sender.$id;
  const isLongText = text.length > 500;
  const displayText =
    isLongText && !showMore ? `${text.substring(0, 500)}...` : text;

  return (
    <View
      className={`p-3 max-w-[60%] rounded-lg ${
        mine ? "bg-blue-500 self-end" : "bg-gray-300 self-start"
      }`}
    >
      <Text
        onPress={() => isLongText && setShowMore((prev) => !prev)}
        className={`${mine ? "text-white" : "text-black"}`}
      >
        {displayText}{" "}
        {isLongText && (
          <Text className=' text-primary-300'>
            {showMore ? "Show Less" : "Show More"}{" "}
          </Text>
        )}
      </Text>
    </View>
  );
};

export default Messege;
