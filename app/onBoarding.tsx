import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { steps } from "@/constants/data";
import RenderStep from "@/components/onboarding/RenderStep";
import { stepsSchemas } from "@/constants/schema";

const OnboardingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(stepsSchemas[currentStep] as any),
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      className='flex-1 p-4 bg-gray-100'
    >
      <Text className='text-2xl font-bold mb-4'>
        {steps[currentStep].label}
      </Text>
      <RenderStep control={control} stepIndex={currentStep} />
      {errors && (
        <View className='mb-4'>
          {Object.keys(errors).map((field) => (
            <Text key={field} className='text-red-500'>
              {typeof errors[field]?.message === "string" &&
                errors[field]?.message}
            </Text>
          ))}
        </View>
      )}
      <View className='flex flex-row justify-between mt-4'>
        {currentStep > 0 && (
          <View
            style={{
              flex: 1,
              marginHorizontal: 8,
              backgroundColor: "blue",
              borderRadius: 8,
            }}
          >
            <Button title='Previous' onPress={prevStep} color='white' />
          </View>
        )}
        {currentStep < steps.length - 1 && (
          <View
            style={{
              flex: 1,
              marginHorizontal: 8,
              backgroundColor: "#3B82F6",
              borderRadius: 8,
            }}
          >
            <Button title='Next' onPress={nextStep} color='white' />
          </View>
        )}
        {currentStep === steps.length - 1 && (
          <Button title='Submit' onPress={handleSubmit(onSubmit)} />
        )}
      </View>
    </Animated.View>
  );
};

export default OnboardingScreen;
