import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import StepOne from "@/components/create/StepOne";
import StepTwo from "@/components/create/StepTwo";
import { ImagePickerAsset } from "expo-image-picker";

const Create = () => {
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<ImagePickerAsset[]>([]);
  const handleNext = () => {
    try {
      if (images.length < 3) throw new Error("select atleast 3 images");
      setStep(2);
    } catch (error) {
      const err = error as Error;
      Platform.OS === "web"
        ? alert(err.message || "Something went wrong. Try again later")
        : Alert.alert(
            "Information",
            err.message || "Something went wrong. Try again later"
          );
    }
  };
  return (
    <ScrollView
      className=' gap-6 flex-1 bg-gray-3 py-4 px-2'
      showsVerticalScrollIndicator={false}
    >
      {step === 1 ? (
        <StepOne images={images} setImages={setImages} />
      ) : (
        <StepTwo />
      )}
      <View className=' flex-row justify-between p-4 items-center'>
        <TouchableOpacity
          onPress={() => setStep(1)}
          activeOpacity={0.3}
          className={` py-2 px-4 rounded-lg ${
            step > 1 ? "bg-primary-300" : "bg-gray-300"
          }`}
        >
          <Text className=' font-rubik-semibold text-white'>PREV</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.3}
          className={` py-2 px-4 rounded-lg ${
            step <= 1 ? "bg-primary-300" : "bg-gray-300"
          }`}
        >
          <Text className=' font-rubik-semibold text-white'>NEXT</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Create;
