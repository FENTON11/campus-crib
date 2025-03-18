import {
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { IMessege, NewMessage } from "@/typings";
import { useAppContext } from "@/context/AppContext";
import { appwriteService } from "@/appwrite/appwriteService";
import { Platform } from "react-native";

const registerForPushNotifications = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") return;

  const token = await Notifications.getExpoPushTokenAsync();
  return token.data; // 🔥 Store this token in Appwrite for later use
};
const ChatsFooter = ({
  setMessages,
  roomID,
  receiverID,
}: {
  setMessages: React.Dispatch<React.SetStateAction<IMessege[]>>;
  roomID: string;
  receiverID: string;
}) => {
  const { user } = useAppContext();
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sending, setSending] = useState(false);
  // 🚀 6️⃣ Send Message & Push Notification
  const sendMessage = async () => {
    try {
      if (!newMessage.trim()) return;
      setSending(true);
      if (!user) throw new Error("must be logged in");
      const message: NewMessage = {
        text: newMessage,
        receiver: receiverID,
        sender: user?.$id,
        room: roomID,
        status: "sent",
      };
      const res = await appwriteService.sendMessage(message);
      setMessages((prev) => [...prev, res]);
      setNewMessage("");
    } catch (error) {
      const err = error as Error;
      Platform.OS === "web"
        ? alert(err.message)
        : Alert.alert(
            "Error",
            err.message || "Something went wrong. Try again later"
          );
    } finally {
      setSending(false);
    }
  };
  const handleTyping = async (status: boolean): Promise<void> => {
    setIsTyping(status);
  };
  useEffect(() => {
    // fetchMessages();
    registerForPushNotifications();
  }, []);
  return (
    <View>
      <View className='flex-row items-center bg-white p-4 gap-2 rounded-lg shadow-md'>
        <TextInput
          value={newMessage}
          onChangeText={(text) => {
            setNewMessage(text);
            handleTyping(text.length > 0);
          }}
          placeholder='Type a message...'
          className='flex-1 p-3 border border-gray-300 rounded-full'
        />

        {newMessage.length > 0 && sending ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity onPress={sendMessage} className='ml-3 p-3'>
            <FontAwesome name='send' size={27} color='#0061FF' />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ChatsFooter;
