import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import images from '@/constants/images'
import icons from '@/constants/icons'
import { AntDesign, Entypo, FontAwesome6 } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const ChatsHeader = () => {
    const router = useRouter()
  return (
    <View className=" flex-row items-center gap-4 justify-between border-b border-gray-300" >

    <View className=" flex-row gap-4 items-center p-4 " >
        <TouchableOpacity onPress={()=> router.back()} className=' p-2' >

    <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      <Image source={images.avatar} className=' size-20 rounded-full object-contain' />
      <View className="justify-center" >
    <Text className="text-xl font-rubik-bold text-black-300 ">
     username
    </Text>
    <Text className=" text-sm text-green-500" >online</Text>

      </View>
      
    </View>
    <View className=' flex-row items-center gap-4' >

    <TouchableOpacity className=" p-4 px-6" >
      <Image source={icons.phone} className=' size-10 rounded-full object-contain' />
      <FontAwesome6 name="video" size={24} color="#0061FF" />
      <Entypo name="info-with-circle" size={24} color="#0061FF" />
    </TouchableOpacity>
    </View>
    </View>
  )
}

export default ChatsHeader