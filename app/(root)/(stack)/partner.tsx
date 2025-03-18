import { Checkbox } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { appwriteService } from "@/appwrite/appwriteService";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "expo-router";

const Partner = () => {
  const [type, setType] = useState("");
  const router = useRouter();
  const { user, updateUser } = useAppContext();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const handleAgent = async () => {
    try {
      if (!user) throw new Error("you must be logged in");
      setLoading(true);
      const res = await appwriteService.becomeAnAgent({
        userID: user.$id,
        agentType: type,
      });
      updateUser(res);
    } catch (error) {
      const err = error as Error;
      Platform.OS === "web"
        ? alert(err.message || "Something went wrong. Try again later")
        : Alert.alert(
            "Error",
            err.message || "Something went wrong. Try again later"
          );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (type && acceptTerms && acceptPrivacy) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [type, acceptTerms, acceptPrivacy]);

  useEffect(() => {
    if (user && user.isAgent) {
      router.push("/(root)/(tabs)/profile");
    }
  }, [user]);

  return (
    <ScrollView className='flex-1 bg-white p-2'>
      <View className='items-center justify-center'>
        <Text className='text-2xl font-bold text-primary-300 p-2'>
          Become a Campus Crib Agent
        </Text>
        <Text className='text-base text-gray-600 mt-2 text-center p-2'>
          Join our elite team and unlock your potential in the real estate
          industry. Help clients find their dream homes and build a successful
          career.
        </Text>
        <Image
          source={require("@/assets/images/agent.jpeg")}
          className='w-full h-60 mb-4 object-contain object-center'
        />
      </View>
      <Text className='text-base text-primary-300 font-rubik-semibold mt-2 p-2'>
        What kind of agent are you?
      </Text>
      <View className='border border-primary-300 rounded-lg'>
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
        >
          <Picker.Item label='Agent type' value='' />
          <Picker.Item label='Agent' value='Agent' />
          <Picker.Item label='Landlord' value='Landlord' />
        </Picker>
      </View>
      <View className='mt-4'>
        <TouchableOpacity
          onPress={() => setAcceptTerms(!acceptTerms)}
          className='flex-row items-center'
        >
          <Checkbox
            status={acceptTerms ? "checked" : "unchecked"}
            onPress={() => setAcceptTerms(!acceptTerms)}
            color='blue' // Set the checkbox color to blue
          />
          <Text className='text-base text-gray-600 ml-2'>
            I accept the Terms and Conditions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setAcceptPrivacy(!acceptPrivacy)}
          className='flex-row items-center mt-2'
        >
          <Checkbox
            status={acceptPrivacy ? "checked" : "unchecked"}
            onPress={() => setAcceptPrivacy(!acceptPrivacy)}
            color='blue' // Set the checkbox color to blue
          />
          <Text className='text-base text-gray-600 ml-2'>
            I accept the Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={0.2}
        onPress={handleAgent}
        className={`p-4 mt-11 mb-11 rounded-3xl ${
          isButtonDisabled || loading ? "bg-gray-400" : "bg-primary-300/80"
        }`}
        disabled={isButtonDisabled}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text className='font-rubik-medium text-xl text-center text-white'>
            Partner
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Partner;
