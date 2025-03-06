import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@/components/Cards";
import { router } from "expo-router";

import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import Filters from "@/components/Filters";
const icons = {
  backArrow: require("@/assets/icons/back-arrow.png"),
  bell: require("@/assets/icons/bell.png"),
};

const search = () => {
  const [loading, setLoading] = useState(false);

  // const handleCardPress =(id:string)=> router.push(`/(root)/(stack)/property-details/${id}`);
  return (
    <SafeAreaView>
      <FlatList
        // data=   {properties}
        data={[1, 2, 3]}
        numColumns={2}
        renderItem={({ item }) => (
          // <Card item={item} onPress={() => handleCardPress(item.$id)} />
          <Card />
        )}
        // keyExtractor={(item) => item.$id}
        keyExtractor={(item) => item.toString()}
        contentContainerClassName='pb-32'
        columnWrapperClassName='flex gap-5 px-5'
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size='large' className='text-primary-300 mt-5' />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={() => (
          <View className='px-5'>
            <View className='flex flex-row items-center justify-between mt-5'>
              <TouchableOpacity
                onPress={() => router.back()}
                className='flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center'
              >
                <Image source={icons.backArrow} className='size-5' />
              </TouchableOpacity>

              <Text className='text-base mr-2 text-center font-rubik-medium text-black-300'>
                Search for Your Ideal Home
              </Text>
              <Image source={icons.bell} className='w-6 h-6' />
            </View>

            <Search />

            <View className='mt-5'>
              <Filters />

              <Text className='text-xl font-rubik-bold text-black-300 mt-5'>
                {/* Found {properties?.length} Properties */}
                Found Properties
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default search;
