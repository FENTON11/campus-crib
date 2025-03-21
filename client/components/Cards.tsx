import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { Property } from "@/typings";
import { useRouter } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useAppContext } from "@/context/AppContext";
import HeartIcon from "./HeartIcon";
interface Props {
  onPress?: () => void;
}

export const FeaturedCard = ({ price, name, location,image, $id }: Property & { $id: string }) => {
  const onPress = () => {};
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      className='flex flex-col items-start
    w-64 h-72 relative'
    >
      <Image source={{uri:image.toString()}} className='size-full rounded-2xl' />
      <Image
        source={images.cardGradient}
        className='size-full rounded-2xl absolute bottom-0'
      />

      <View className='flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5'>
        <Image source={icons.star} className='size-3.5' />
        <Text className='text-xs font-rubik-bold text-primary-300 ml-1'>
          4.4
        </Text>
      </View>
      <View className='flex flex-col items-start absolute bottom-5 inset-x-5'>
        <Text className='text-lg font-rubik-extrabold text-white '>{name}</Text>
        <Text className='text-base font-rubik text-white'>{location}</Text>
        <View className='flex flex-row items-center justify-between w-full'>
          <Text className='text-xl font-rubik-extrabold text-white'>
            $ {price}
          </Text>
          <HeartIcon house={{ id: $id, title: name, price, location, image }} />
          {/* <Image source={icons.heart} className='size-8' /> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

interface CardProps extends Property {
  showMore?: boolean;
}
export const Card = ({
  price,
  name,
  location,
  $id,
  showMore,
  image,
  agent,
}: CardProps) => {
  const router = useRouter();
  const { user } = useAppContext();
  const show = showMore && user?.$id === agent.user.$id ? true : false;
  const onPress = () => {
    router.push({
      pathname: "/(root)/(stack)/property-details/[id]",
      params: { id: $id },
    });
  };
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      className=' w-1/2 mt-4 px-3 py-4 rounded-lg
     bg-white shadow-lg shadow-black-100/70 relative'
    >
      <View className='flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50 '>
        <Image source={icons.star} className='size-2.5' />
        <Text className='text-xs font-rubik-bold text-primary-300 ml-0.5'>
          4.4
        </Text>
      </View>
      <Image source={{uri:image.toString()}} className='w-full h-40 rounded-lg' />
      <View className='flex flex-col mt-2'>
        <Text className='text-base font-rubik-bold text-black-300'>{name}</Text>

        <Text className='text-xs font-rubik text-black-200'>{location}</Text>
        <View className='flex flex-row items-center justify-between mt-2'>
          <Text className='text-base font-rubik-bold text-primary-300'>
            $ {price}
          </Text>
          <HeartIcon house={{ id: $id, title: name, price, location, image}} />
          {/* <Image source={icons.heart} className='size-8' /> */}
        </View>
        {show && (
          <View className=' py-2 flex-row justify-between items-center'>
            <TouchableOpacity className='' activeOpacity={0.5}>
              <AntDesign name='delete' size={20} color='#ef4444' />
            </TouchableOpacity>
            <TouchableOpacity className='' activeOpacity={0.5}>
              <Feather name='edit' size={20} color='#0061FF' />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
