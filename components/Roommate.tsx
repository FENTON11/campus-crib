import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { User } from '@/typings'
import icons from '@/constants/icons'
import { Link } from 'expo-router'

const Roommate = ({name, phone, avatar, preferences:{budget}}: User) => {
  return (
       <View className="bg-white rounded-xl shadow-md p-4 mx-2 mb-4 flex-1 items-center">
          <Image source={{ uri: avatar.toString() }} className="w-20 h-20 rounded-full" />
          <Text className="text-lg font-rubik-semibold text-black-300 mt-2">{name}</Text>
          <Text className="text-sm text-gray-500">kenyatta university</Text>
          <Text className="text-sm text-black-300">Budget: {budget|| '500-700'}</Text>
          <Text className="text-primary-300 font-rubik-bold">Match: 70%</Text>
          <View className="flex-row   w-full mt-2 justify-between">
            <TouchableOpacity className="p-2 ">
              <Image source={phone} className='size-8'/>
              </TouchableOpacity>
               <Link href={'/(root)/(stack)/messeger'} asChild>
            <TouchableOpacity className="p-2 ">
             <Image source={icons.chat} className='size-8'/>
            </TouchableOpacity>
               </Link>
          </View>
        </View>
  )
}

export default Roommate