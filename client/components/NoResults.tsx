import { View, Text, Image } from "react-native";
import React, { ReactNode } from "react";
import images from "@/constants/images";
const NoResults = ({
  children,
  title = "NoResults",
  description = "We could not find any results",
}: {
  children?: ReactNode;
  title?: string;
  description?: string;
}) => {
  return (
    <View className='flex items-center my-5'>
      <Image
        source={images.noResult}
        className='w-11/12 h-80'
        resizeMode='contain'
      />
      <Text className='text-2xl font-rubik-bold text-black-300 mt-5'>
        {title}
      </Text>
      <Text className='text-base text-black-100 mt-2'>{description}</Text>
      {children}
    </View>
  );
};

export default NoResults;
