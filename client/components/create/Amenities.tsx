import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  MaterialIcons,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { Amenity } from "@/typings";
import { amenitiesList } from "@/lib/data";

interface AmenitiesProps {
  selectedAmenities: number[];
  setSelectedAmenities: React.Dispatch<React.SetStateAction<number[]>>;
  onSubmit: () => void;
}

const Amenities = ({
  selectedAmenities,
  setSelectedAmenities,
  onSubmit,
}: AmenitiesProps) => {
  const toggleAmenity = (amenityId: number) => {
    if (selectedAmenities.includes(amenityId)) {
      setSelectedAmenities(selectedAmenities.filter((id) => id !== amenityId));
    } else {
      setSelectedAmenities([...selectedAmenities, amenityId]);
    }
  };

  const renderIcon = (
    iconSet: Amenity["iconSet"],
    iconName: string,
    isSelected: boolean
  ) => {
    switch (iconSet) {
      case "MaterialIcons":
        return (
          <MaterialIcons
            name={iconName as any}
            size={24}
            color={isSelected ? "white" : "gray"}
          />
        );
      case "FontAwesome":
        return (
          <FontAwesome
            name={iconName as any}
            size={24}
            color={isSelected ? "white" : "gray"}
          />
        );
      case "Ionicons":
        return (
          <Ionicons
            name={iconName as any}
            size={24}
            color={isSelected ? "white" : "gray"}
          />
        );
      case "MaterialCommunityIcons":
        return (
          <MaterialCommunityIcons
            name={iconName as any}
            size={24}
            color={isSelected ? "white" : "gray"}
          />
        );
      case "Feather":
        return (
          <Feather
            name={iconName as any}
            size={24}
            color={isSelected ? "white" : "gray"}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View className='p-4'>
      <Text className='font-rubik-semibold text-2xl text-primary-300 py-4'>
        Select Amenities
      </Text>
      <View className='flex flex-row flex-wrap gap-2'>
        {amenitiesList.map((amenity) => {
          const isSelected = selectedAmenities.includes(amenity.id);
          return (
            <TouchableOpacity
              key={amenity.id}
              className={`flex-row items-center p-2 rounded-full ${
                isSelected ? "bg-blue-500" : "border border-gray-300"
              }`}
              onPress={() => toggleAmenity(amenity.id)}
            >
              {renderIcon(amenity.iconSet, amenity.icon, isSelected)}
              <Text
                className={`ml-2 font-rubik-light ${
                  isSelected ? "text-white" : "text-gray-700"
                }`}
              >
                {amenity.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View className='mt-8'>
        <TouchableOpacity
          className='bg-primary-300 p-2 rounded-lg m-4 flex-1 flex-row justify-center items-center gap-4'
          onPress={onSubmit}
        >
          <MaterialIcons name='real-estate-agent' size={24} color='white' />
          <Text className='text-white font-poppins-regular text-lg text-center'>
            Create Property
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Amenities;
