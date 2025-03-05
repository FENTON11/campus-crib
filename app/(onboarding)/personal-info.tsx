import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import FileSelector from "@/components/onboarding/FileSelector";
import { z } from "zod";
import { useRouter } from "expo-router";
import { useImagePicker } from "@/hooks";

// Define types for form data and errors
interface FormData {
  fullName: string;
  phoneNumber: string;
}

interface Errors {
  fullName: string;
  phoneNumber: string;
}

const PersonalInfo: React.FC = () => {
  const { images } = useImagePicker();
  const router = useRouter();
  const schema = z.object({
    fullName: z
      .string({ message: "Full name must be a string" })
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be less than 20 characters"),
    phoneNumber: z
      .string()
      .regex(/^\d+$/, "Phone number must be a number")
      .min(10, "Phone number must be at least 10 characters")
      .max(13, "Phone number must be less than 13 characters"),
  });

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState<Errors>({
    fullName: "",
    phoneNumber: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const validateField = (name: keyof FormData, value: string) => {
    try {
      if (name === "fullName") {
        schema.shape.fullName.parse(value);
      } else if (name === "phoneNumber") {
        schema.shape.phoneNumber.parse(value);
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
    checkButtonStatus();
  };

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // Clear the error when the user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    checkButtonStatus();
  };

  const checkButtonStatus = () => {
    const isFormValid = schema.safeParse(formData).success;
    setIsButtonDisabled(!isFormValid);
    // setIsButtonDisabled(!isFormValid || images.length < 2);
  };

  useEffect(() => {
    checkButtonStatus();
    console.log(images, isButtonDisabled);
  }, [images, formData]);

  return (
    <ScrollView className='p-4 flex-1'>
      <Text className='font-rubik-semibold text-3xl text-primary-300 capitalize py-2'>
        Personal Information
      </Text>
      <Text className='font-rubik-light text-lg text-black-200 py-2'>
        Add at least two photos to help others recognize you
      </Text>
      <FileSelector />
      <View className='gap-3 p-4 h-2/3'>
        <View>
          <Text className='text-black-200 font-rubik-light text-lg capitalize'>
            Full Name*
          </Text>
          <TextInput
            placeholder='Full Name'
            className={`p-2 border rounded-lg outline-none bg-transparent font-rubik-light text-lg ${
              errors.fullName ? "border-red-500" : "border-primary-300"
            }`}
            value={formData.fullName}
            onChangeText={(text) => handleChange("fullName", text)}
            onBlur={() => handleBlur("fullName", formData.fullName)}
          />
          {errors.fullName && (
            <Text className='text-red-500'>{errors.fullName}</Text>
          )}
        </View>
        <View>
          <Text className='text-black-200 font-rubik-light text-lg capitalize'>
            Phone Number*
          </Text>
          <TextInput
            placeholder='Phone Number'
            inputMode='numeric'
            className={`p-2 border rounded-lg outline-none bg-transparent font-rubik-light text-lg ${
              errors.phoneNumber ? "border-red-500" : "border-primary-300"
            }`}
            value={formData.phoneNumber}
            onChangeText={(text) => handleChange("phoneNumber", text)}
            onBlur={() => handleBlur("phoneNumber", formData.phoneNumber)}
          />
          {errors.phoneNumber && (
            <Text className='text-red-500'>{errors.phoneNumber}</Text>
          )}
        </View>

        <TouchableOpacity
          onPress={() => router.push("/(onboarding)/house-preference")}
          activeOpacity={0.2}
          className={`p-4 rounded-3xl ${
            isButtonDisabled ? "bg-gray-400" : "bg-primary-300/80"
          }`}
          disabled={isButtonDisabled}
        >
          <Text className='font-rubik-medium text-xl text-center text-white'>
            Continue 1/5
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PersonalInfo;
