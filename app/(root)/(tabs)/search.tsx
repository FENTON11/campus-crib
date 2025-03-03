import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card } from '@/components/Cards'
import { router } from 'expo-router'

const search = () => {
  
  // const handleCardPress =(id:string)=> router.push(`/(root)/(stack)/property-details/${id}`);
  return (
    <SafeAreaView>
      <FlatList
      data={[1,2,3]}
      numColumns={2}
      renderItem={({item})=>(
        <Card/>
      )}
      
      />
    </SafeAreaView>
  )
}

export default search