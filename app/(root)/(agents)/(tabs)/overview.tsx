import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAppContext } from "@/context/AppContext";
import MyLineChart from "@/components/dashboard/MyLineChart";
import { Link } from "expo-router";
import icons from "@/constants/icons";
import { Feather } from "@expo/vector-icons";
import { greetingUser } from "@/lib";
const AgentsDashboard = () => {
  const { user: currentUser } = useAppContext();
  const greatings = greetingUser();
  return (
    <ScrollView className=' flex-1 bg-primary px-2'>
      <View className=' gap-2 '>
        <View className='p-2  gap-2 bg-white rounded-br-3xl rounded-b-3xl'>
          <View className='flex flex-row items-center justify-between mt-5'>
            <View className='flex flex-row items-center'>
              <Image
                source={{ uri: currentUser?.avatar.toString() }}
                className='rounded-full size-16'
              />
              <View className='flex flex-col items-start ml-2 justify-center'>
                <Text className='text-lg font-rubik text-black-100'>
                  {greatings}
                </Text>
                <Text className='text-xl font-rubik-medium text-black-300 capitalize'>
                  {currentUser?.name || "Guest"}
                </Text>
              </View>
            </View>
            <View className=' flex-row gap-4 items-center'>
              <Link asChild href={"/(root)/(stack)/notifications"}>
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
        <View className=' flex-row gap-2 py-4'>
          <TouchableOpacity
            activeOpacity={0.6}
            className=' bg-gray-300 rounded-lg flex-1  p-4'
          >
            <Text className=' font-rubik-semibold text-xl text-primary-300'>
              Total Houses
            </Text>
            <Text className=' font-bold text-lg'>10k orders</Text>
            <View className=' flex-row gap-0 items-center'>
              <AntDesign name='arrowup' size={10} color='green' />
              <AntDesign name='arrowup' size={10} color='green' />
              <Text className=' text-sm'>12% increase</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            className=' bg-gray-300 rounded-lg flex-1  p-4'
          >
            <Text className=' font-rubik-semibold text-xl text-primary-300'>
              Total users
            </Text>
            <Text className=' font-rubik-bold text-lg'>10k users</Text>
            <View className=' flex-row gap-0 items-center'>
              <AntDesign name='arrowup' size={10} color='green' />
              <AntDesign name='arrowup' size={10} color='green' />
              <Text className=' text-sm'>10% increase</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <View className=' flex-row justify-between p-2 gap-2'>
          <View className=' p-2 bg-gray-300 rounded-lg'>
            <Text>Category Distribution</Text>
            <MyPieChart />
          </View>
          <View className=' p-2 bg-gray-300 rounded-lg'>
            <Text>Category Distribution</Text>
            <MyPieChart />
          </View>
        </View> */}
        <MyLineChart />
      </View>
    </ScrollView>
  );
};

export default AgentsDashboard;
