import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Chatroom from "@/components/Chatroom";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { IChatRoom } from "@/typings";
import { appwriteService } from "@/appwrite/appwriteService";
import { useAppContext } from "@/context/AppContext";
import { useCustomFetch } from "@/hooks";

const ChatRooms = () => {
  const router = useRouter();
  const { user } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [rooms, setRooms] = useState<IChatRoom[]>([]);
  const getRooms = async () => {
    if (!user) throw new Error("You must be logged in");
    return await appwriteService.getUserRooms(user.$id);
  };
  const { data, loading } = useCustomFetch(getRooms);
  useEffect(() => {
    if (data) {
      setRooms(data);
    }
  }, [data]);
  if (loading) return <ActivityIndicator />;
  return (
    <SafeAreaView className=' p-4 gap-4'>
      <View className=' justify-between gap-2 p-4'>
        <View className=' flex-row gap-5 items-center'>
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name='arrowleft' size={24} color='black' />
          </TouchableOpacity>
          <Text className=' text-2xl font-rubik-semibold'>Inbox</Text>
        </View>
        <View
          className='flex flex-row items-center justify-between w-full
    px-4 rounded-lg bg-black-100/15  border border-primary-100 mt-5 py-1'
        >
          <View className='flex-1 flex flex-row items-center justify-start z-50'>
            <TouchableOpacity>
              <Image source={icons.search} className='size-8 object-contain' />
            </TouchableOpacity>
            <TextInput
              placeholder='Search...'
              className='text-sm font-rubik text-black-300 ml-2 flex-1'
            />
          </View>
          {searchQuery && (
            <TouchableOpacity className=' pr-4'>
              <AntDesign name='closecircle' size={22} color='#8C8E98' />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={rooms}
        ListEmptyComponent={
          <View className=' items-center gap-4 justify-center flex-1'>
            <Entypo name='chat' size={50} color='#0061FF' />
            <Text className=' text-lg font-rubik-semibold'>
              no conversation yet
            </Text>
            <Text className=' font-rubik-light  mx-2 text-center'>
              when you message with users, you conversations will appear here
            </Text>
          </View>
        }
        contentContainerStyle={{ gap: 20 }}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Chatroom {...item} />}
      />
    </SafeAreaView>
  );
};

export default ChatRooms;
