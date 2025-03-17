import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useAppContext } from "@/context/AppContext";
import { Link, Redirect, useRouter } from "expo-router";
import { OAuthProvider } from "react-native-appwrite";
import { authService } from "@/appwrite/authService";

const AuthScreen: React.FC = () => {
  const { user, updateUser } = useAppContext();
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  const handleSocialLogin = async (provider: OAuthProvider) => {
    setIsAuthenticating(true);
    try {
      const newUser = await authService.login(provider);
      if (newUser) {
        updateUser(newUser);
        router.push(newUser.level >= 5 ? "/(root)/(tabs)/home" : "/(root)/(onboarding)/personal-info");
      }
    } catch (error) {
      const err = error as Error;
      if (Platform.OS === "web") {
        alert("Error: " + (err?.message || "Failed to login"));
      } else {
        Alert.alert("Error", err?.message || "Failed to login");
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  

  return (
    <ScrollView>
      <View className="h-screen bg-primary-300">
        <View className="p-2 flex-1 px-2 items-center justify-end pb-6 mb-4 bg-white rounded-b-[4rem]">
          <Image
            className="object-contain p-4 max-w-full max-h-full"
            resizeMode="contain"
            source={require("@/assets/images/logo.png")}
          />
          <Text className="text-4xl text-primary-300 font-rubik-extrabold">
            CAMPUS CRIB
          </Text>
          <Text className="text-xl font-rubik-medium">Home Hunting Made Easy</Text>
          <Text className="text-center p-2 text-lg font-rubik-light">Sign in to campus crib</Text>
        </View>
        
        {isAuthenticating ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          <View className="mb-6 gap-4 p-2">
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => handleSocialLogin(OAuthProvider.Google)}
              className="bg-white rounded-2xl flex-row items-center gap-4"
            >
              <Image
                resizeMode="contain"
                source={require("@/assets/images/google.png")}
                style={{ width: 40, height: 40 }}
              />
              <Text className="font-rubik-medium text-lg text-primary-300">Sign in with Google</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => handleSocialLogin(OAuthProvider.Facebook)}
              className="bg-white rounded-2xl flex-row items-center gap-4 p-2"
            >
              <Image
                source={require("@/assets/images/fb.svg")}
                style={{ width: 24, height: 24 }}
              />
              <Text className="font-rubik-medium text-lg text-primary-300">Sign in with Facebook</Text>
            </TouchableOpacity>
               <View className='flex-row items-center my-4'>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'white' }} />
                        <Text className='mx-2 text-white'>or sign in with</Text>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'white' }} />
                      </View>
            <Link href={'/(auth)/sign-in'}>
        <Text className="text-center underline underline-offset-4 p-2 text-lg font-rubik-light text-white">
          sign in with email and password
        </Text>
            </Link>
          </View>
        )}
        
        <Text className="text-center p-2 text-lg font-rubik-light text-white">
          &copy; {new Date().getFullYear()}. All rights reserved, Campus Crib
        </Text>
      </View>
    </ScrollView>
  );
};

export default AuthScreen;
