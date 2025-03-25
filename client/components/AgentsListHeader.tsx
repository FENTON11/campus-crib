import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { FeaturedCard } from "./Cards";
import Filters from "@/components/Filters";
import { useCustomFetch } from "@/hooks";
import { appwriteService } from "@/appwrite/appwriteService";
import { Property } from "@/typings";
import { useAppContext } from "@/context/AppContext";
import { greetingUser } from "@/lib";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
const AgentsListHeader = () => {
  const { user } = useAppContext();
  const greatings = greetingUser();
  const [featured, setFeatured] = useState<Property[]>([]);
  const getData = async () => {
    return await appwriteService.getFeaturedProperties();
  };
  const { loading, data } = useCustomFetch(getData);

  useEffect(() => {
    if (data) {
      setFeatured(data);
    }
  }, [data]);

  if (loading)
    return <ActivityIndicator size='large' className='text-primary-300 mt-5' />;
  return (
    <View className='px-5'>
      <View className='flex flex-row items-center justify-between mt-5'>
        <View className='flex flex-row items-center'>
          <Image
            source={{ uri: user?.avatar.toString() }}
            className='rounded-full size-16'
          />
          <View className='flex flex-col items-start ml-2 justify-center'>
            <Text className='text-lg font-rubik text-black-100'>
              {greatings}
            </Text>
            <Text className='text-xl font-rubik-medium text-black-300 capitalize'>
              {user?.name || "Guest"}
            </Text>
          </View>
        </View>
        <View className=' flex-row gap-4 items-center'>
          <Link asChild href={"/(root)/(stack)/Notification"}>
            <TouchableOpacity>
              <Image source={icons.bell} className=' size-7' />
            </TouchableOpacity>
          </Link>
          <Link asChild href={"/(root)/(stack)/messeger"}>
            <TouchableOpacity>
              <Feather name='send' size={24} color='black' />
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default AgentsListHeader;
