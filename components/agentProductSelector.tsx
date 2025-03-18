import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const AgentProductSelector = ({
  images,
  setImages,
}: {
  images: ImagePicker.ImagePickerAsset[];
  setImages: React.Dispatch<
    React.SetStateAction<ImagePicker.ImagePickerAsset[]>
  >;
}) => {
  // const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImages((prev) => [...prev, result.assets[0]]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <View className='p-2 gap-2'>
      <TouchableWithoutFeedback className='relative w-full flex-row'>
        {images[0] ? (
          <View style={{ position: "relative" }} className=' w-full'>
            <Image
              source={{ uri: images[0].uri }}
              style={{ height: 250 }}
              resizeMode='cover'
              className='rounded-xl w-full '
            />
            <TouchableOpacity
              onPress={() => removeImage(0)}
              className='bg-gray-400 rounded-full'
              style={{ position: "absolute", top: 5, right: 5 }}
            >
              <MaterialIcons name='close' size={24} color='white' />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={pickImage}
            className='p-2 bg-primary-200 rounded-2xl border border-dashed flex-1 h-[250] border-primary-300 items-center justify-center'
          >
            <Text className='text-gray-400'>click to select product image</Text>
          </TouchableOpacity>
        )}
      </TouchableWithoutFeedback>
      <View className='flex flex-row gap-2 p-2 flex-wrap'>
        {images
          .filter((_, index) => index > 0)
          .map((image, index) => (
            <View key={index} style={{ position: "relative" }}>
              <TouchableWithoutFeedback>
                <Image
                  source={{ uri: image.uri }}
                  style={{ width: 100, height: 100 }}
                  resizeMode='cover'
                  className='rounded-xl w-full shrink-0'
                />
              </TouchableWithoutFeedback>
              <TouchableOpacity
                onPress={() => removeImage(index + 1)}
                className=' absolute z-10 top-1  right-1 bg-black-100 rounded-full'
              >
                <MaterialIcons name='close' size={20} color='white' />
              </TouchableOpacity>
            </View>
          ))}
        <TouchableOpacity
          onPress={pickImage}
          activeOpacity={0.3}
          className='relative w-28 flex-row'
        >
          {images.length < 7 && (
            <View className='p-2 bg-primary-200 rounded-2xl border border-dashed flex-1 h-[100] border-primary-300 items-center justify-center'>
              <Text className='text-gray-400'>gallery image(s)</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AgentProductSelector;
