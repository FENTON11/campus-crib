import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Use this package for the select component
import { z } from "zod";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

// Define types for form data and errors
interface FormData {
  minBudget: string;
  maxBudget: string;
  location: string;
  house: string;
}

interface Errors {
  minBudget: string;
  maxBudget: string;
  location: string;
  house: string;
}

const PersonalInfo: React.FC = () => {
  const router = useRouter();
  const schema = z.object({
    minBudget: z
      .string()
      .regex(/^\d+$/, "Min budget must be a number")
      .min(1, "Min budget is required"),
    maxBudget: z
      .string()
      .regex(/^\d+$/, "Max budget must be a number")
      .min(1, "Max budget is required"),
    location: z.string().min(1, "Location is required"),
    house: z.string().min(1, "Apartment type is required"),
  });

  const [formData, setFormData] = useState<FormData>({
    minBudget: "",
    maxBudget: "",
    location: "",
    house: "",
  });

  const [errors, setErrors] = useState<Errors>({
    minBudget: "",
    maxBudget: "",
    location: "",
    house: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const validateField = (name: keyof FormData, value: string) => {
    try {
      if (name === "minBudget") {
        schema.shape.minBudget.parse(value);
      } else if (name === "maxBudget") {
        schema.shape.maxBudget.parse(value);
      } else if (name === "location") {
        schema.shape.location.parse(value);
      } else if (name === "house") {
        schema.shape.house.parse(value);
      }
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error.errors[0].message,
        }));
      }
    }
  };

  const handleBlur = (name: keyof FormData, value: string) => {
    validateField(name, value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setIsButtonDisabled(
      !schema.safeParse({ ...formData, [name]: value }).success
    );
  };

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // Clear the error when the user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setIsButtonDisabled(
      !schema.safeParse({ ...formData, [name]: value }).success
    );
  };

  return (
    <ScrollView className='p-4 flex-1'>
      <View className=' flex-row items-center gap-4'>
        <TouchableOpacity activeOpacity={0.2} onPress={() => router.back()}>
          <MaterialIcons name='arrow-back-ios' size={24} color='black' />
        </TouchableOpacity>
        <Text className='font-rubik-semibold text-3xl text-primary-300 capitalize py-2'>
          House Preferences
        </Text>
      </View>
      <View className='gap-3 p-4 h-2/3'>
        <View>
          <Text className='text-black-200 font-rubik-light text-lg capitalize'>
            Budget Range*
          </Text>
          <View className='flex-row gap-2'>
            <View className='flex-1'>
              <TextInput
                placeholder='Min Range'
                inputMode='numeric'
                className={`p-2 border rounded-lg outline-none bg-transparent font-rubik-light text-lg ${
                  errors.minBudget ? "border-red-500" : "border-primary-300"
                }`}
                value={formData.minBudget}
                onChangeText={(text) => handleChange("minBudget", text)}
                onBlur={() => handleBlur("minBudget", formData.minBudget)}
              />
              {errors.minBudget && (
                <Text className='text-red-500'>{errors.minBudget}</Text>
              )}
            </View>
            <View className='flex-1'>
              <TextInput
                inputMode='numeric'
                placeholder='Max Range'
                className={`p-2 border rounded-lg outline-none bg-transparent font-rubik-light text-lg ${
                  errors.maxBudget ? "border-red-500" : "border-primary-300"
                }`}
                value={formData.maxBudget}
                onChangeText={(text) => handleChange("maxBudget", text)}
                onBlur={() => handleBlur("maxBudget", formData.maxBudget)}
              />
              {errors.maxBudget && (
                <Text className='text-red-500'>{errors.maxBudget}</Text>
              )}
            </View>
          </View>
        </View>
        <View>
          <Text className='text-black-200 font-rubik-light text-lg capitalize'>
            Preferred Location*
          </Text>
          <TextInput
            placeholder='Location'
            className={`p-2 border rounded-lg outline-none bg-transparent font-rubik-light text-lg ${
              errors.location ? "border-red-500" : "border-primary-300"
            }`}
            value={formData.location}
            onChangeText={(text) => handleChange("location", text)}
            onBlur={() => handleBlur("location", formData.location)}
          />
          {errors.location && (
            <Text className='text-red-500'>{errors.location}</Text>
          )}
        </View>
        <View>
          <Text className='text-black-200 font-rubik-light text-lg capitalize'>
            Apartment Type*
          </Text>
          <Picker
            selectedValue={formData.house}
            onValueChange={(itemValue) => handleChange("house", itemValue)}
            onBlur={() => handleBlur("house", formData.house)}
            className={`border rounded-lg ${
              errors.house ? "border-red-500" : "border-primary-300"
            }`}
          >
            <Picker.Item label='Select house Type' value='' />
            <Picker.Item label='Single Room' value='single' />
            <Picker.Item label='apartment' value='apartment' />
            <Picker.Item label='Two bed room house' value='2-bed' />
            <Picker.Item label='Three bed room house' value='3-bed' />
            <Picker.Item label='Shared Room(2 people)' value='shared-2' />
            <Picker.Item label='Shared Room(2 people)' value='shared-2' />
            <Picker.Item label='Shared Room(2 people)' value='shared-2' />
            <Picker.Item label='Shared Room(4 people)' value='shared-4' />
            <Picker.Item label='Shared Room(6 people)' value='shared-6' />
            <Picker.Item label='Shared Room(8 people)' value='shared-8' />
          </Picker>
          {errors.house && <Text className='text-red-500'>{errors.house}</Text>}
        </View>

        <TouchableOpacity
          activeOpacity={0.2}
          onPress={() => router.push("/(onboarding)/preferences")}
          className={`p-4 mt-11 rounded-3xl ${
            isButtonDisabled ? "bg-gray-400" : "bg-primary-300/80"
          }`}
          disabled={isButtonDisabled}
        >
          <Text className='font-rubik-medium text-xl text-center text-white'>
            Continue 2/5
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PersonalInfo;
