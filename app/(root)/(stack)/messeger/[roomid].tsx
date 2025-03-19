import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatsFooter from "@/components/chatsFooter";
import Chats from "@/components/chats";
import ChatsHeader from "@/components/chatsHeader";
import { IMessege } from "@/typings";
import { useLocalSearchParams } from "expo-router";
import { appwriteService } from "@/appwrite/appwriteService";
import { useCustomFetch } from "@/hooks";

const Conversation = () => {
  const [messages, setMessages] = useState<IMessege[]>([]);
  const params = useLocalSearchParams();
  const { username, recieverID, roomid, avatar } = params as {
    username: string;
    recieverID: string;
    roomid: string;
    avatar: string;
  };
  const getRoomChats = async () => {
    return await appwriteService.getRoomMesseges(roomid);
  };
  const { loading, data } = useCustomFetch(getRoomChats);
  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data]);
  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className='flex-1  bg-gray-100'
    >
      <SafeAreaView className=' flex-1  '>
        <ChatsHeader
          username={username}
          avatar={avatar}
          receiverID={recieverID}
        />
        <Chats chats={messages} />
        <ChatsFooter
          roomID={roomid}
          receiverID={recieverID}
          setMessages={setMessages}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Conversation;
