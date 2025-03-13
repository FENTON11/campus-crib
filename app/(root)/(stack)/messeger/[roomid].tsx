import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Client, Databases, ID, Query, Models } from "appwrite";
import { Link } from "expo-router";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatsFooter from "@/components/chatsFooter";
import Chats from "@/components/chats";
import ChatsHeader from "@/components/chatsHeader";
import { IMessege } from "@/typings";

//  Initialize Appwrite Client
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("YOUR_PROJECT_ID"); // 🔥 Replace with your project ID

const databases = new Databases(client);

// Register for Push Notifications


// Chat Screen Component
interface Roommate {
  id: string;
  name: string;
}

const Conversation = () => {
  const roommate ={
    name:'Guest',
    id:'1234455'
  }
  const [messages, setMessages] = useState<IMessege[]>( [
          { id: '1', text: 'Hey, how are you? a really long message to display, ', userId: 'user_123' },
          { id: '2', text: 'I am good, thanks!Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia et magnam omnis ipsa veniam soluta amet ad necessitatibus cumque eligendi consequuntur quibusdam, sint dolorem asperiores neque, non maiores ullam exercitationem!Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia et magnam omnis ipsa veniam soluta amet ad necessitatibus cumque eligendi consequuntur quibusdam, sint dolorem asperiores neque, non maiores ullam exercitationem!Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia et magnam omnis ipsa veniam soluta amet ad necessitatibus cumque eligendi consequuntur quibusdam, sint dolorem asperiores neque, non maiores ullam exercitationem!Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia et magnam omnis ipsa veniam soluta amet ad necessitatibus cumque eligendi consequuntur quibusdam, sint dolorem asperiores neque, non maiores ullam exercitationem!Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia et magnam omnis ipsa veniam soluta amet ad necessitatibus cumque eligendi consequuntur quibusdam, sint dolorem asperiores neque, non maiores ullam exercitationem!Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia et magnam omnis ipsa veniam soluta amet ad necessitatibus cumque eligendi consequuntur quibusdam, sint dolorem asperiores neque, non maiores ullam exercitationem!', userId: 'user_456' },
          { id: '3', text: 'Great to hear!', userId: 'user_123' },
        ]);
 

 

  // Fetch Chat Messages from Appwrite
//   const fetchMessages = async () => {
//     const response = await databases.listDocuments(
//       "YOUR_DATABASE_ID",
//       "YOUR_COLLECTION_ID",
//       [Query.orderDesc("createdAt"), Query.limit(50)]
//     );
//     setMessages(response.documents.reverse());
//   };

  // 📝 5️⃣ Handle Typing Indicator
  interface TypingIndicator {
    isTyping: boolean;
  }

 



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1  bg-gray-100"
    >
        <SafeAreaView className=" flex-1  " >
      <ChatsHeader/>
      {/* Typing Indicator */}
      {/* {isTyping && (
          <Text className="text-gray-500 italic">💬 {roommate.name} is typing...</Text>
        )} */}
    
        <Chats chats={messages}/>
      <ChatsFooter  setMessages={ setMessages} />
        </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Conversation;
