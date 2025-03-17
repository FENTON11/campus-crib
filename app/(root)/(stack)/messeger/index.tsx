import { View, Text, FlatList, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Chatroom from '@/components/Chatroom'
import Search from '@/components/Search'
import icons from '@/constants/icons'
import { AntDesign } from '@expo/vector-icons'

const ChatRooms = () => {
      const [searchQuery, setSearchQuery] = useState("");
      const data = [
        { id: '1', name: 'John Doe', university: 'UoN', budget: '$200 - $300', similarityScore: 92, profilePic: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: '2', name: 'Jane Smith', university: 'Strathmore', budget: '$250 - $350', similarityScore: 87, profilePic: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { id: '3', name: 'Alex Kimani', university: 'KU', budget: '$180 - $260', similarityScore: 89, profilePic: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { id: '4', name: 'Sophia Wanjiru', university: 'Moi University', budget: '$220 - $300', similarityScore: 90, profilePic: 'https://randomuser.me/api/portraits/women/4.jpg' },
        { id: '5', name: 'Brian Otieno', university: 'JKUAT', budget: '$230 - $320', similarityScore: 85, profilePic: 'https://randomuser.me/api/portraits/men/5.jpg' },
        { id: '6', name: 'Lisa Mwangi', university: 'USIU Africa', budget: '$200 - $280', similarityScore: 88, profilePic: 'https://randomuser.me/api/portraits/women/6.jpg' },
      ];
  return (
      <SafeAreaView className=' p-4 gap-4' > 
      <View className=' justify-between gap-2 p-4' >
      <Text className=' text-2xl font-rubik-semibold' >Inbox</Text>
      <View
      className='flex flex-row items-center justify-between w-full
    px-4 rounded-lg bg-black-100/15  border border-primary-100 mt-5 py-1'
    >
      <View className='flex-1 flex flex-row items-center justify-start z-50'>
        <TouchableOpacity >
          <Image source={icons.search} className='size-9 object-contain' />
        </TouchableOpacity>
        <TextInput
          placeholder='Search...'
          className='text-sm font-rubik text-black-300 ml-2 flex-1'
       
        />
      </View>
      {searchQuery && (
        <TouchableOpacity className=' pr-4' >
          <AntDesign name='closecircle' size={22} color='#8C8E98' />
        </TouchableOpacity>
      )}
    </View>

        </View> 
             <FlatList
             showsVerticalScrollIndicator={false}
            //  ItemSeparatorComponent={() => <View className=' border border-black-300'  />}
                data={data}
                contentContainerStyle={{gap:20}}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Chatroom {...item} />
                )}
              />
      </SafeAreaView>
  )
}

export default ChatRooms