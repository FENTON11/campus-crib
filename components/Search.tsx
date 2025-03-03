import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'
const Search = () => {
  return (
    <View className='flex flex-row items-center justify-between w-full
    px-4 rounded-lg bg-accent-100  border border-primary-100 mt-5 py-2'>
     <View className='flex-1 flex flex-row items-center justify-start z-50'>
      <Image source={icons.search} className='size-8 object-contain'/>
      <TextInput 
        placeholder='Search for houses'
        className='text-sm font-rubik text-black-300 ml-2 flex-1'
      />
     </View>
     <TouchableOpacity>
        <Image source={icons.filter} className=''/>
     </TouchableOpacity>
    </View>
  )
}

export default Search