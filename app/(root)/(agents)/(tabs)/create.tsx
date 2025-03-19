import Amenities from "@/components/create/Amenities";
import StepOne from "@/components/create/StepOne";
import StepTwo from "@/components/create/StepTwo";
import { schema } from "@/lib/data";
import { ImagePickerAsset } from "expo-image-picker";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Alert, Platform } from "react-native";
import { z } from "zod";

const Create = () => {
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<ImagePickerAsset[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>([]);
  const [stepTwoData, setStepTwoData] = useState<z.infer<typeof schema>>();
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const handlePrev = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleNext = () => {
    try {
      if (step === 1 && images.length < 3) {
        throw new Error("Select at least 3 images");
      }
      if (step === 2) {
        const result = schema.safeParse(stepTwoData);
        // if (!result.success) {
        //   const errors = result.error.errors.reduce((acc, err) => {
        //     acc[err.path.join(".")] = err.message;
        //     return acc;
        //   }, {} as { [key: string]: string });
        //   setValidationErrors(errors);
        //   throw new Error("Please fill out all required fields correctly");
        // }
      }
      setStep((prev) => prev + 1);
      setValidationErrors({}); // Clear validation errors when moving to the next step
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

  const handleStepTwoSubmit = (data: z.infer<typeof schema>) => {
    setStepTwoData(data); // Save StepTwo form data
    handleNext(); // Proceed to the next step
  };

  const handleSubmit = () => {
    if (selectedAmenities.length === 0) {
      Alert.alert("Information", "Please select at least one amenity");
      return;
    }
    // Handle final submission
    console.log("Form submitted with:", { stepTwoData, selectedAmenities });
  };

  return (
    <ScrollView
      className='gap-6 flex-1 bg-gray-3 py-4 px-2'
      showsVerticalScrollIndicator={false}
    >
      {step === 1 ? (
        <StepOne images={images} setImages={setImages} />
      ) : step === 2 ? (
        <StepTwo
          onSubmit={handleStepTwoSubmit}
          validationErrors={validationErrors}
        />
      ) : (
        <Amenities
          selectedAmenities={selectedAmenities}
          setSelectedAmenities={setSelectedAmenities}
          onSubmit={handleSubmit}
        />
      )}
      <View className='flex-row justify-between p-4 items-center'>
        <TouchableOpacity
          onPress={handlePrev}
          activeOpacity={0.3}
          className={`py-2 px-4 rounded-lg ${
            step > 1 ? "bg-primary-300" : "bg-gray-300"
          }`}
        >
          <Text className='font-rubik-semibold text-white'>PREV</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.3}
          className={`py-2 px-4 rounded-lg ${
            step <= 2 ? "bg-primary-300" : "bg-gray-300"
          }`}
        >
          <Text className='font-rubik-semibold text-white'>NEXT</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Create;
