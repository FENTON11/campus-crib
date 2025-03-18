import { View } from "react-native";
import React from "react";
import AgentProductSelector from "../agentProductSelector";
import { ImagePickerAsset } from "expo-image-picker";

const StepOne = ({
  images,
  setImages,
}: {
  images: ImagePickerAsset[];
  setImages: React.Dispatch<React.SetStateAction<ImagePickerAsset[]>>;
}) => {
  return (
    <View>
      <AgentProductSelector images={images} setImages={setImages} />
    </View>
  );
};

export default StepOne;
