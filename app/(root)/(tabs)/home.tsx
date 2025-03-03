import {  FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import  { Card, } from "@/components/Cards";

import { useAppContext } from "@/context/AppContext";
import ListHeader from "@/components/ListHeader";

export default function Index() {
  const {user} = useAppContext()
  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
       data={[1, 2, 3, 4]}
       renderItem={({item})=> <Card/>}
       keyExtractor={(item)=>item.toString()}
       numColumns={2}
       contentContainerClassName="pb-32"
       columnWrapperClassName="flex gap-5 px-5"
       showsVerticalScrollIndicator={false}
       ListHeaderComponent={<ListHeader/>}
       />
     
      
    </SafeAreaView>
  );
}
