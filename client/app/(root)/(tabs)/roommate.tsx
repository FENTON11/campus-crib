import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import icons from '@/constants/icons';
import { Link } from 'expo-router';
import { appwriteService } from '@/appwrite/appwriteService';
import { useCustomFetch } from '@/hooks';
import { User } from '@/typings';
import Roommate from '@/components/Roommate';

const RoommateFinder = () => {
  // interface Roommate {
  //   id: string;
  //   name: string;
  //   university: string;
  //   budget: string;
  //   similarityScore: number;
  //   profilePic: string;
  // }

  const [roommates, setRoommates] = useState<User[]>([]);
  const fetchRoommates = async () =>{
    return await appwriteService.getRoommates()
  }
  const {loading,data} = useCustomFetch(fetchRoommates)

  useEffect(() => {
    if(data){
      setRoommates(data)
    }
  }, [data]);


  if(loading){
    return <ActivityIndicator/>
  }
  return (
    <View className="p-4 bg-gray-100 flex-1">
      <Text className="text-xl font-rubik-bold text-black-300 mb-4">AI-Powered Roommate Suggestions</Text>
      <FlatList
        data={roommates}
        renderItem={({ item }) => (<Roommate {...item} />)}
        keyExtractor={(item) => item.$id}
        numColumns={2} 
        columnWrapperStyle={{ justifyContent: "space-between" }} 
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default RoommateFinder;
