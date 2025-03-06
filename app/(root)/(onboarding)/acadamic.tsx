import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { z } from "zod";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

// Define types for form data and errors
interface FormData {
  campus: string;
  year_of_study: string;
  course: string;
}

interface Errors {
  campus: string;
  year_of_study: string;
  course: string;
}

const Acadamics: React.FC = () => {
  const router = useRouter();
  const schema = z.object({
    campus: z
      .string({ message: "Campus must be a string" })
      .min(3, "Campus must be at least 3 characters"),
    year_of_study: z
      .number()
      .min(1, "Year of study must be at least 1")
      .max(7, "Year of study must be less than 7"),
    course: z.string().min(3, "Course must be at least 3 characters"),
  });

  const [formData, setFormData] = useState<FormData>({
    campus: "",
    course: "",
    year_of_study: "",
  });

  const [errors, setErrors] = useState<Errors>({
    campus: "",
    course: "",
    year_of_study: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const validateField = (name: keyof FormData, value: string) => {
    try {
      if (name === "campus") {
        schema.shape.campus.parse(value);
      } else if (name === "year_of_study") {
        schema.shape.year_of_study.parse(value);
      } else if (name === "course") {
        schema.shape.course.parse(value);
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
          Acadamic Preferences
        </Text>
      </View>
      <View className='gap-3 p-4 h-2/3'>
        <View>
          <Text className='text-black-200 font-rubik-light text-lg capitalize'>
            University/College Name
          </Text>
          <TextInput
            placeholder='University/College Name'
            className={`p-2 border rounded-lg outline-none bg-transparent font-rubik-light text-lg ${
              errors.campus ? "border-red-500" : "border-primary-300"
            }`}
            value={formData.campus}
            onChangeText={(text) => handleChange("campus", text)}
            onBlur={() => handleBlur("campus", formData.campus)}
          />
          {errors.campus && (
            <Text className='text-red-500'>{errors.campus}</Text>
          )}
        </View>
        <View>
          <Text className='text-black-200 font-rubik-light text-lg capitalize'>
            Course of study
          </Text>
          <TextInput
            placeholder='Course of study'
            className={`p-2 border rounded-lg outline-none bg-transparent font-rubik-light text-lg ${
              errors.course ? "border-red-500" : "border-primary-300"
            }`}
            value={formData.course}
            onChangeText={(text) => handleChange("course", text)}
            onBlur={() => handleBlur("course", formData.course)}
          />
          {errors.course && (
            <Text className='text-red-500'>{errors.course}</Text>
          )}
        </View>
        <View>
          <Text className='text-black-200 font-rubik-light text-lg capitalize'>
            Yeah of study
          </Text>
          <TextInput
            placeholder='Yeah of study'
            inputMode='numeric'
            className={`p-2 border rounded-lg outline-none bg-transparent font-rubik-light text-lg ${
              errors.year_of_study ? "border-red-500" : "border-primary-300"
            }`}
            value={formData.year_of_study}
            onChangeText={(text) => handleChange("year_of_study", text)}
            onBlur={() => handleBlur("year_of_study", formData.year_of_study)}
          />
          {errors.year_of_study && (
            <Text className='text-red-500'>{errors.year_of_study}</Text>
          )}
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
            Continue 4/5
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Acadamics;
