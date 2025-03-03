import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useAppContext } from "@/context/AppContext";
import { Redirect } from "expo-router";

const index = () => {
  const { user } = useAppContext();
  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
  };
  return user ? (
    <Redirect href='/(root)/(tabs)/home' />
  ) : (
    <ScrollView>
      <View className=' h-screen'>
        <View className='p-2  flex-1 px-2 items-center justify-center'>
          <Image
            className=' object-cover w-full h-full'
            resizeMode='cover'
            source={require("@/assets/images/logo.png")}
          />
          <Text className=' text-4xl text-primary-300 font-rubik-extrabold'>
            CAMPUS CRIB
          </Text>
          <Text className=' text-xl font-rubik-medium'>
            Home Hunting Made Easy
          </Text>
        </View>
        <Text className=' text-center p-2 text-lg font-rubik-light'>
          Sign in to campus crib
        </Text>
        <View className='mb-6 gap-4 p-2'>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => handleSocialLogin("google")}
            className='border border-primary-300 rounded-2xl flex-row items-center gap-4'
          >
            <Image
              resizeMode='contain'
              source={require("@/assets/images/google.png")}
              style={{ width: 40, height: 40 }}
            />
            <Text className=' font-rubik-medium text-lg'>
              sign in with google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => handleSocialLogin("facebook")}
            className='border p-2 border-primary-300 rounded-2xl flex-row items-center gap-4'
          >
            <Image
              source={require("@/assets/images/fb.svg")}
              style={{ width: 24, height: 24 }}
            />
            <Text className=' font-rubik-medium text-lg'>
              sign in with facebook
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => handleSocialLogin("github")}
            className='border p-2 border-primary-300 rounded-2xl flex-row items-center gap-4'
          >
            <Image
              source={require("@/assets/images/github.svg")}
              style={{ width: 24, height: 24 }}
            />
            <Text className=' font-rubik-medium text-lg'>
              sign in with github
            </Text>
          </TouchableOpacity>
        </View>
        <Text className=' text-center p-2 text-lg font-rubik-light'>
          &copy; 2025- {new Date().getFullYear()}. all right reserved,campus
          crib
        </Text>
      </View>
    </ScrollView>
  );
};

export default index;
