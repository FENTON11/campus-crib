import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { User } from "@/typings";
import icons from "@/constants/icons";
import { useRouter } from "expo-router";
import { appwriteService } from "@/appwrite/appwriteService";
import { useAppContext } from "@/context/AppContext";

const Roommate = ({ name, phone, avatar, preferences, $id }: User) => {
  const [creating, setCreating] = useState(false);
  const router = useRouter();
  const { user } = useAppContext();
  const createRoom = async () => {
    try {
      setCreating(true);
      if (!user) throw new Error("You must be logged in");
      const created = await appwriteService.createRoom([user?.$id, $id]);
      if (created) {
        router.push("/(root)/(stack)/messeger");
      }
    } catch (error) {
      const err = error as Error;
      if (Platform.OS === "web") {
        alert("Error: " + (err?.message || "Somethingwent wrong"));
      } else {
        Alert.alert("Error", err?.message || "Somethingwent wrong");
      }
    } finally {
      setCreating(false);
    }
  };
  return (
    <View className='bg-white rounded-xl shadow-md p-4 mx-2 mb-4 flex-1 items-center'>
      <Image
        source={{ uri: avatar.toString() }}
        className='w-20 h-20 rounded-full'
      />
      <Text className='text-lg font-rubik-semibold text-black-300 mt-2'>
        {name}
      </Text>
      <Text className='text-sm text-gray-500'>kenyatta university</Text>
      <Text className='text-sm text-black-300'>
        Budget: {preferences?.budget || "500-700"}
      </Text>
      <Text className='text-primary-300 font-rubik-bold'>Match: 70%</Text>
      <View className='flex-row   w-full mt-2 justify-between'>
        <TouchableOpacity className='p-2 '>
          <Image source={phone} className='size-8' />
        </TouchableOpacity>

        <TouchableOpacity onPress={createRoom} className='p-2 '>
          {creating ? (
            <ActivityIndicator />
          ) : (
            <Image source={icons.chat} className='size-8' />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Roommate;
