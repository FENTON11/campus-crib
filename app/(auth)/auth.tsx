import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from "react-native";
import React from "react";
import { useAppContext } from "@/context/AppContext";
import { Redirect, useRouter } from "expo-router";
import { OAuthProvider } from "react-native-appwrite";
import { authService } from "@/appwrite/authService";

const auth = () => {
  const { user,updateUser} = useAppContext();
  console.log(user);

  const router = useRouter();
  const handleSocialLogin = async (provider: OAuthProvider) => {
    try {
      const newUser = await authService.login(provider);
      if(newUser){
        updateUser(newUser)
        router.push("/(root)/(onboarding)/personal-info");

      }
    } catch (error) {
      const err = error as Error;
      if (Platform.OS === "web") {
        alert("Error: " + (err?.message || "Failed to login"));
      } else {
        Alert.alert("Error", err?.message || "Failed to login");
      }
    }
  };
  return user ? (
    <Redirect href='/(root)/(tabs)/home' />
  ) : (
    <ScrollView>
      <View className=' h-screen bg-primary-300'>
        <View className='p-2  flex-1 px-2 items-center justify-end pb-6 mb-4 bg-white rounded-b-[4rem]'>
          <Image
            className=' object-contain p-4 max-w-full max-h-full'
            resizeMode='contain'
            source={require("@/assets/images/logo.png")}
          />
          <Text className=' text-4xl text-primary-300 font-rubik-extrabold'>
            CAMPUS CRIB
          </Text>
          <Text className=' text-xl font-rubik-medium'>
            Home Hunting Made Easy
          </Text>
          <Text className=' text-center p-2 text-lg font-rubik-light'>
            Sign in to campus crib
          </Text>
        </View>
        <View>
          <View className='mb-6 gap-4 p-2'>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => handleSocialLogin(OAuthProvider.Google)}
              className='bg-white rounded-2xl flex-row items-center gap-4'
            >
              <Image
                resizeMode='contain'
                source={require("@/assets/images/google.png")}
                style={{ width: 40, height: 40 }}
              />
              <Text className=' font-rubik-medium text-lg text-primary-300'>
                sign in with google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => handleSocialLogin(OAuthProvider.Facebook)}
              className='bg-white rounded-2xl flex-row items-center gap-4 p-2'
            >
              <Image
                source={require("@/assets/images/fb.svg")}
                style={{ width: 24, height: 24 }}
              />
              <Text className=' font-rubik-medium text-lg  text-primary-300'>
                sign in with facebook
              </Text>
            </TouchableOpacity>
          </View>
          <Text className=' text-center p-2 text-lg font-rubik-light text-white'>
            &copy; {new Date().getFullYear()}. all right reserved,campus crib
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default auth;
