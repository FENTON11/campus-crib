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
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, gap: 5 }}>
      <View className='h-1/2 p-1'>
        <Image
          className=' object-cover w-full h-full'
          resizeMode='cover'
          source={require("@/assets/images/banner.png")}
        />
      </View>
      <View className='mb-3 gap-2'>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => handleSocialLogin("google")}
          className='border border-primary_1  rounded-2xl flex-row items-center gap-2'
        >
          <Image
            resizeMode='contain'
            source={require("@/assets/images/google.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text className=' text-primary_1'>sign in with google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => handleSocialLogin("facebook")}
          className=' border border-primary_1  rounded-2xl flex-row items-center gap-2 p-2'
        >
          <Image
            source={require("@/assets/images/fb.svg")}
            style={{ width: 24, height: 24 }}
          />
          <Text className=' text-primary_1'>sign in with facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => handleSocialLogin("github")}
          className='border border-primary_1  rounded-2xl flex-row items-center gap-2 p-2'
        >
          <Image
            source={require("@/assets/images/github.svg")}
            style={{ width: 24, height: 24 }}
          />
          <Text className=' text-primary_1'>sign in with github</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default index;
