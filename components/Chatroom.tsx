import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images'
import { Link } from 'expo-router'

const Chatroom = ({id,profilePic,name}:{id:string,profilePic:string,name:string}) => {
  return (
    <Link href={`/(root)/(stack)/messeger/${id}`} asChild >
    <TouchableOpacity activeOpacity={.5} className=' flex-row  gap-4 items-center ' >
        <View>
            <Image source={{uri:profilePic}} className=' size-20 rounded-full object-contain' />
        </View>
        <View  className=''>
      <Text className=' text-xl font-rubik-semibold' > {name} </Text>
      <View className=' flex-row items-center  flex-1 gap-3' >
      <Text className=' font-rubik-light' >last message</Text>
      <Text className=' text-sm font-rubik-light text-black-300' >1hr</Text>

      </View>

        </View>
    </TouchableOpacity>
    </Link>
  )
}

export default Chatroom