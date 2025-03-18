import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import StepOne from "@/components/create/StepOne";
import StepTwo from "@/components/create/StepTwo";

const create = () => {
  const [step, setStep] = useState(1);
  return (
    <ScrollView
      className=' gap-6 flex-1 bg-gray-3 py-4 px-2'
      showsVerticalScrollIndicator={false}
    >
      {step === 1 ? <StepOne /> : <StepTwo />}
    </ScrollView>
  );
};

export default create;
