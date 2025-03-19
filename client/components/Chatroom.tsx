import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { Link, useRouter } from "expo-router";
import { IChatRoom, User } from "@/typings";
import { useAppContext } from "@/context/AppContext";
import { appwriteService } from "@/appwrite/appwriteService";
import { useCustomFetch } from "@/hooks";

const Chatroom = ({ $id, members }: IChatRoom) => {
  const { user } = useAppContext();
  const router = useRouter();
  const [otherUser, setOtherUser] = React.useState<User | null>(null);
  const otherUserID = members.find((item) => item !== user?.$id);
  const startCon = () => {
    router.push({
      pathname: `/(root)/(stack)/messeger/[roomid]`,
      params: {
        roomid: $id,
        username: otherUser?.name,
        receiverID: otherUser?.$id,
        avatar: otherUser?.avatar.toString(),
      },
    });
  };
  const getOtherUser = async () => {
    if (!otherUserID) throw new Error("Failed to find user");
    const user = await appwriteService.getUserById(otherUserID);
    return user;
  };
  const { loading, data } = useCustomFetch(getOtherUser);
  useEffect(() => {
    if (data) {
      setOtherUser(data);
    }
  }, [data]);
  if (loading) return <ActivityIndicator />;
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={startCon}
      className=' flex-row  gap-4 items-center '
    >
      <View>
        <Image
          source={{ uri: otherUser?.avatar.toString() }}
          className=' size-16 rounded-full object-contain'
        />
      </View>
      <View className=''>
        <Text className=' text-xl font-rubik-semibold'>
          {" "}
          {otherUser?.name}{" "}
        </Text>
        <View className=' flex-row items-center  flex-1 gap-3'>
          <Text className=' font-rubik-light'>last message</Text>
          <Text className=' text-sm font-rubik-light text-black-300'>1hr</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Chatroom;
