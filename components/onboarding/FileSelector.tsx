import { View, TouchableOpacity, Image } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ImagePickerAsset } from "expo-image-picker";
const FileSelector = (files: ImagePickerAsset[]) => {
  return (
    <View className=' p-4  flex-row gap-2'>
      {files[0] ? (
        <Image source={{ uri: files[0]?.uri }} />
      ) : (
        <View className=' flex-1 relative'>
          <TouchableOpacity className=' bg-primary-200  flex-1 h-44 rounded-lg border border-dotted border-primary-300' />
          <TouchableOpacity className=' rounded-full absolute bottom-1 right-1 z-10'>
            <AntDesign name='pluscircle' size={24} color='#0062ffae' />
          </TouchableOpacity>
        </View>
      )}
      {files[1] ? (
        <Image source={{ uri: files[1]?.uri }} />
      ) : (
        <View className=' flex-1 relative'>
          <TouchableOpacity className=' bg-primary-200  flex-1 h-44 rounded-lg border border-dotted border-primary-300' />
          <TouchableOpacity className=' rounded-full absolute bottom-1 right-1 z-10'>
            <AntDesign name='pluscircle' size={24} color='#0062ffae' />
          </TouchableOpacity>
        </View>
      )}
      {files[2] ? (
        <Image source={{ uri: files[2]?.uri }} />
      ) : (
        <View className=' flex-1 relative'>
          <TouchableOpacity className=' bg-primary-200  flex-1 h-44 rounded-lg border border-dotted border-primary-300' />
          <TouchableOpacity className=' rounded-full absolute bottom-1 right-1 z-10'>
            <AntDesign name='pluscircle' size={24} color='#0062ffae' />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default FileSelector;
