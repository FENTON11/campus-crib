import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useAppContext } from "@/context/AppContext";
import { authService } from "@/appwrite/authService";
const Profile = () => {
  const { user: currentUser } = useAppContext();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className='bg-primary p-2 flex-1 gap-3'
    >
      {/* header start */}
      <View className=' flex-row items-center justify-between'>
        <TouchableOpacity className=' p-2 rounded-full bg-gray-3/80'>
          <Ionicons name='chevron-back' size={24} color='#0061FF' />
        </TouchableOpacity>
        <Text className=' text-secondary font-poppins-regular text-xl'>
          Profile
        </Text>
        <TouchableOpacity className=' p-2 rounded-full bg-gray-3/80'>
          <Feather name='more-horizontal' size={24} color='#0061FF' />
        </TouchableOpacity>
      </View>
      {/* heading end */}
      {/* user profile end */}
      <View className='items-center justify-center gap-3 p-2 mb-4'>
        <View className=' relative'>
          <Image
            source={
              currentUser
                ? currentUser?.avatar
                : require("@/assets/images/cover.png")
            }
            style={{ width: 100, height: 100 }}
            resizeMode='cover'
            className=' rounded-full'
          />
          <TouchableOpacity
            activeOpacity={0.5}
            className=' absolute -bottom-1  -right-1 bg-primary-300 rounded-md px-[5px] z-20 p-1'
          >
            <Feather name='edit-2' size={20} color='white' />
          </TouchableOpacity>
        </View>
        <Text className=' font-poppins-bold text-2xl'>
          {" "}
          {currentUser?.username || "username"}
        </Text>
      </View>
      {/* user profile end */}
      {/* controls start */}
      <View className=' gap-4'>
        <Link asChild href={"/(root)/(stack)/personal-details"}>
          <TouchableOpacity
            activeOpacity={0.8}
            className=' bg-gray-3 p2 rounded-lg flex-row items-center gap-4'
          >
            <View className=' flex-row gap-4 items-center p-4 flex-1'>
              <AntDesign name='user' size={24} color='#0061FF' />
              <Text className=' font-rubik-medium text-lg'>
                personal information
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.8} className=' p-2'>
              <Entypo name='chevron-right' size={24} color='#0061FF' />
            </TouchableOpacity>
          </TouchableOpacity>
        </Link>
        <Link href={"/(root)/(stack)/favorites"} asChild>
          <TouchableOpacity
            activeOpacity={0.8}
            className=' bg-gray-3 p2 rounded-lg flex-row items-center gap-4'
          >
            <View className=' flex-row gap-4 items-center p-4 flex-1'>
              <MaterialIcons name='favorite-border' size={24} color='#0061FF' />
              <Text className=' font-rubik-medium text-lg'>favourites</Text>
            </View>
            <TouchableOpacity activeOpacity={0.8} className=' p-2'>
              <Entypo name='chevron-right' size={24} color='#0061FF' />
            </TouchableOpacity>
          </TouchableOpacity>
        </Link>
        <Link asChild href={"/(root)/(stack)/myBooking"}>
          <TouchableOpacity
            activeOpacity={0.8}
            className=' bg-gray-3 p2 rounded-lg flex-row items-center gap-4'
          >
            <View className=' flex-row gap-4 items-center p-4 flex-1'>
              <FontAwesome5 name='calendar-alt' size={24} color='#0061FF' />
              <Text className=' font-rubik-medium text-lg'>my booking</Text>
            </View>
            <TouchableOpacity activeOpacity={0.8} className=' p-2'>
              <Entypo name='chevron-right' size={24} color='#0061FF' />
            </TouchableOpacity>
          </TouchableOpacity>
        </Link>
        <Link asChild href={"/(root)/(stack)/notifications"}>
          <TouchableOpacity
            activeOpacity={0.8}
            className=' bg-gray-3 p2 rounded-lg flex-row items-center gap-4'
          >
            <View className=' flex-row gap-4 items-center p-4 flex-1'>
              <Ionicons name='notifications-sharp' size={24} color='#0061FF' />
              <Text className=' font-rubik-medium text-lg'>Notifications</Text>
            </View>

            <TouchableOpacity activeOpacity={0.8} className=' p-2'>
              <Entypo name='chevron-right' size={24} color='#0061FF' />
            </TouchableOpacity>
          </TouchableOpacity>
        </Link>
        <Link asChild href={"/(root)/(stack)/notifications"}>
          <TouchableOpacity
            activeOpacity={0.8}
            className=' bg-gray-3 p2 rounded-lg flex-row items-center gap-4'
          >
            <View className=' flex-row gap-4 items-center p-4 flex-1'>
              <Ionicons name='people' size={20} color='#0061FF' />
              <Text className=' font-rubik-medium text-lg'>Roommates</Text>
            </View>

            <TouchableOpacity activeOpacity={0.8} className=' p-2'>
              <Entypo name='chevron-right' size={24} color='#0061FF' />
            </TouchableOpacity>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={async ()=>  await authService.logout()}
          className=' bg-gray-3 p2 rounded-lg flex-row items-center gap-4'
        >
          <View className=' flex-row gap-4 items-center p-4 flex-1 bg-primary-300'>
            <MaterialIcons name='logout' size={24} color='white' />
            <Text className='  font-rubik-medium text-lg text-white'>
              logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* controls end */}
    </ScrollView>
  );
};

export default Profile;
