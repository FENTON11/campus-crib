import { View, TouchableOpacity, Image } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useImagePicker } from "@/hooks";

const FileSelector = () => {
  const { images, pickImage, removeImage } = useImagePicker();
  return (
    <View className=' p-4  flex-row gap-2'>
      {images[0] ? (
        <View className=' flex-1 relative'>
          <Image
            className='flex-1 h-44 rounded-lg  object-cover object-center'
            source={{ uri: images[0]?.uri }}
          />
          <TouchableOpacity
            onPress={() => removeImage(0)}
            className=' rounded-full absolute top-1 right-1 z-10'
          >
            <AntDesign name='closecircle' size={20} color='white' />
          </TouchableOpacity>
        </View>
      ) : (
        <View className=' flex-1 relative'>
          <TouchableOpacity
            onPress={pickImage}
            className=' bg-primary-200  flex-1 h-44 rounded-lg border border-dotted border-primary-300'
          />
          <TouchableOpacity className=' rounded-full absolute bottom-1 right-1 z-10'>
            <AntDesign name='pluscircle' size={24} color='#0062ffae' />
          </TouchableOpacity>
        </View>
      )}
      {images[1] ? (
        <View className=' flex-1 relative'>
          <Image
            className='flex-1 h-44 rounded-lg  object-cover'
            source={{ uri: images[1]?.uri }}
          />
          <TouchableOpacity
            onPress={() => removeImage(1)}
            className=' rounded-full absolute top-1 right-1 z-10'
          >
            <AntDesign name='closecircle' size={20} color='white' />
          </TouchableOpacity>
        </View>
      ) : (
        <View className=' flex-1 relative'>
          <TouchableOpacity
            onPress={pickImage}
            className=' bg-primary-200  flex-1 h-44 rounded-lg border border-dotted border-primary-300'
          />
          <TouchableOpacity className=' rounded-full absolute bottom-1 right-1 z-10'>
            <AntDesign name='pluscircle' size={24} color='#0062ffae' />
          </TouchableOpacity>
        </View>
      )}
      {images[2] ? (
        <View className=' flex-1 relative'>
          <Image
            className='flex-1 h-44 rounded-lg  object-cover'
            source={{ uri: images[2]?.uri }}
          />
          <TouchableOpacity
            onPress={() => removeImage(2)}
            className=' rounded-full absolute top-1 right-1 z-10'
          >
            <AntDesign name='closecircle' size={20} color='white' />
          </TouchableOpacity>
        </View>
      ) : (
        <View className=' flex-1 relative'>
          <TouchableOpacity
            onPress={pickImage}
            className=' bg-primary-200  flex-1 h-44 rounded-lg border border-dotted border-primary-300'
          />
          <TouchableOpacity className=' rounded-full absolute bottom-1 right-1 z-10'>
            <AntDesign name='pluscircle' size={24} color='#0062ffae' />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default FileSelector;
