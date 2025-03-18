import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { AntDesign, Entypo, FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ChatsHeader = ({
  username,
  receiverID,
  avatar,
}: {
  username: string;
  receiverID: string;
  avatar: string;
}) => {
  const router = useRouter();
  const handleAudioCall = () => {
    // Call functionality goes here
    console.log("Calling...");
  };
  const handleVideoCall = () => {
    // Call functionality goes here
    console.log("Calling...");
  };
  return (
    <View className=' flex-row items-center gap-2 justify-between border-b border-gray-300 pr-2'>
      <View className=' flex-row gap-2 items-center p-4 '>
        <TouchableOpacity onPress={() => router.back()} className=' p-2'>
          <AntDesign name='arrowleft' size={24} color='black' />
        </TouchableOpacity>
        <Image
          source={{ uri: avatar.toString() }}
          className=' size-12 rounded-full object-contain'
        />
        <View className='justify-center'>
          <Text className='text-lg font-rubik-bold text-black-300  line-clamp-1'>
            {username}
          </Text>
          <Text className=' text-sm text-green-500'>online</Text>
        </View>
      </View>
      <View className=' flex-row items-center'>
        <TouchableOpacity className=' p-2'>
          <Image
            source={icons.phone}
            className=' size-7 rounded-full object-contain'
          />
        </TouchableOpacity>
        <TouchableOpacity className=' p-2'>
          <FontAwesome6 name='video' size={20} color='#0061FF' />
        </TouchableOpacity>
        <TouchableOpacity className=' p-2'>
          <Entypo name='info-with-circle' size={20} color='#0061FF' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatsHeader;
