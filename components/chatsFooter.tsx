import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import * as Notifications from "expo-notifications"
import { IMessege } from '@/typings';

const registerForPushNotifications = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") return;
  
    const token = await Notifications.getExpoPushTokenAsync();
    return token.data; // 🔥 Store this token in Appwrite for later use
  };
const ChatsFooter = ({ setMessages}:{ setMessages:React.Dispatch<React.SetStateAction<IMessege[]>>}) => {
     const [newMessage, setNewMessage] = useState("");
      const [isTyping, setIsTyping] = useState(false);
      // 🚀 6️⃣ Send Message & Push Notification
      const sendMessage = async () => {
        if (!newMessage.trim()) return;
    
        // Add message to Appwrite Database

setMessages(prev => [...prev,{text:newMessage,userId:"user_123",id: Date.now().toString()}])
    
setNewMessage("");
        // Clear input & stop typing indicator
        // handleTyping(false);
        // fetchMessages();
    
        // 📢 Send Push Notification
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `New Message from  guest`,
            body: newMessage,
          },
          trigger: { seconds: 1, repeats: false },
        });
      };
       const handleTyping = async (status: boolean): Promise<void> => {
          setIsTyping(status);
        //   await databases.updateDocument(
        //     "YOUR_DATABASE_ID",
        //     "YOUR_COLLECTION_ID",
        //     "typingIndicator",
        //     { isTyping: status }
        //   );
        };
        useEffect(() => {
            // fetchMessages();
            registerForPushNotifications();
          }, []);
  return (
    <View>
        <View className="flex-row items-center bg-white p-4 gap-2 rounded-lg shadow-md">
        <TextInput
          value={newMessage}
          onChangeText={(text) => {
              setNewMessage(text);
              handleTyping(text.length > 0);
            }}
            placeholder="Type a message..."
            className="flex-1 p-3 border border-gray-300 rounded-full"
            />
       
        <TouchableOpacity onPress={sendMessage} className="ml-3 p-3">
          <FontAwesome name="send" size={27} color="#0061FF" />
        </TouchableOpacity>
        
      </View>
    </View>
  )
}

export default ChatsFooter