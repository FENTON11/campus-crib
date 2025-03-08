import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { z } from "zod";
import AgentProductSelector from "@/components/agentProductSelector";

const NewRestaurant = () => {
  const schema = z.object({
    name: z
      .string({ message: "restaurant name is required" })
      .min(3, "restaurant name cannot be less than 3 charactors")
      .max(2200, "restaurant name cannot be more than 2200 charactors"),
    short_desc: z
      .string({ message: "restaurant short_desc is required" })
      .min(10, "restaurant short_desc cannot be less than 10 charactors")
      .max(200, "restaurant short_desc cannot be more than 200 charactors"),
    description: z
      .string({ message: "restaurant description is required" })
      .min(1, "restaurant description cannot be less than 1 charactors")
      .max(2200, "restaurant description cannot be more than 2200 charactors"),
    street: z
      .string({ message: "restaurant street is required" })
      .min(3, "restaurant street cannot be less than 3 charactors")
      .max(200, "restaurant street cannot be more than 200 charactors"),
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className=' gap-6 flex-1 bg-gray-3 py-4 px-2'
    >
      <AgentProductSelector />
      <View className='  gap-1'>
        <Text className=' text-black-100 font-poppins-regular text-lg'>
          property name
        </Text>
        <TextInput
          className=' border border-primary-300 p-3 text-black rounded-lg outline-none'
          placeholder='property name'
        />
        <Text className=' text-red-500 font-poppins-regular text-sm'>
          property name
        </Text>
      </View>

      <View className='  gap-1'>
        <Text className=' text-black-100 font-poppins-regular text-lg'>
          property price
        </Text>
        <TextInput
          className=' border border-primary-300 p-3 text-black rounded-lg outline-none'
          inputMode='numeric'
          placeholder='property price'
        />
        <Text className=' text-red-500 font-poppins-regular text-sm'>
          property price
        </Text>
      </View>
      <View className='  gap-1'>
        <Text className=' text-black-100 font-poppins-regular text-lg'>
          property location
        </Text>
        <TextInput
          className=' border border-primary-300 p-3 text-black rounded-lg outline-none'
          placeholder='property location'
        />
        <Text className=' text-red-500 font-poppins-regular text-sm'>
          property location
        </Text>
      </View>
      <View className=' flex-row gap-2 items-center'>
        <View className='  gap-1 flex-1'>
          <Text className=' text-black-100 font-poppins-regular text-lg'>
            property bathroom(s)
          </Text>
          <TextInput
            inputMode='numeric'
            className=' border border-primary-300 p-3 text-black rounded-lg outline-none'
            placeholder='property bathroom(s)'
          />
          <Text className=' text-red-500 font-poppins-regular text-sm'>
            property bathroom(s)
          </Text>
        </View>
        <View className='  gap-1 flex-1'>
          <Text className=' text-black-100 font-poppins-regular text-lg'>
            property bed(s)
          </Text>
          <TextInput
            inputMode='numeric'
            className=' border border-primary-300 p-3 text-black rounded-lg outline-none'
            placeholder='property bed(s)'
          />
          <Text className=' text-red-500 font-poppins-regular text-sm'>
            property bed(s)
          </Text>
        </View>
      </View>
      <View className=' flex-row gap-2 items-center'>
        <View className='  gap-1 flex-1'>
          <Text className=' text-black-100 font-poppins-regular text-lg'>
            property area(m2)
          </Text>
          <TextInput
            inputMode='numeric'
            className=' border border-primary-300 p-3 text-black rounded-lg outline-none'
            placeholder='  property area(m2)'
          />
          <Text className=' text-red-500 font-poppins-regular text-sm'>
            property area(m2)
          </Text>
        </View>
        <View className='  gap-1 flex-1'>
          <Text className=' text-black-100 font-poppins-regular text-lg'>
            property address
          </Text>
          <TextInput
            className=' border border-primary-300 p-3 text-black rounded-lg outline-none'
            placeholder='property address'
          />
          <Text className=' text-red-500 font-poppins-regular text-sm'>
            property address
          </Text>
        </View>
      </View>
      <View className='  gap-1'>
        <Text className=' text-black-100 font-poppins-regular text-lg'>
          property description
        </Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          className=' border border-primary-300 p-3 text-black rounded-lg outline-none'
          placeholder='property description'
        />
        <Text className=' text-red-500 font-poppins-regular text-sm'>
          property description
        </Text>
      </View>
      <View>
        <TouchableOpacity className=' bg-primary-300 p-2 rounded-lg m-4 flex-1 flex-row justify-center items-center gap-4'>
          <Ionicons name='restaurant-sharp' size={24} color='white' />
          <Text className=' text-white font-poppins-regular text-lg text-center'>
            create property
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NewRestaurant;
