import { View, Text, Alert, Image, TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FontAwesome5 } from '@expo/vector-icons';
import { SwipeListView } from "react-native-swipe-list-view";
const favorites = () => {
  interface House{
    id:string;
    title:string;
    price:number;
    image: string;
    location:string;
  }
  const [favorites, setFavorites] = useState<House[]>([])
  useEffect(() => {
    const loadFavorites = async () => {
     try {
      const favorites = await AsyncStorage.getItem("favorites");
      if (favorites) {
        setFavorites(JSON.parse(favorites));
      }
     } catch (error) {
       console.error("Error loading favorites", error);
     }
     };
     loadFavorites();
  }, []);
  // save favorites to async storage
  const saveFavorites = async (newFavorites: House[]) => {
    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error("Error saving favorites", error);
    }
  };
  // remove a house from favorites
  const removeFavorite = (id: string) => {
    Alert.alert("Remove Favorite", "Are you sure  you want to remove this house from favorites?", [
      { text: "Cancel", style: "cancel" },  
      {
        text: "Remove",
        onPress:()=>{
          const updatedFavorites = favorites.filter((house)=>house.id !== id);
          saveFavorites(updatedFavorites);
        }
      }
   ])
  }
  const renderHouse = ({ item }: { item: House }) => (
    <View className="bg-white p-4 rounded-lg shadow-md mb-3 flex-row items-center">
     <Image
      source={
        item.image && typeof item.image === "string"
          ? { uri: item.image }
          : require("@/assets/images/default-house.jpg") // Use a fallback image
      }
      className="w-24 h-24 rounded-md mr-4"
    />
      <View className="flex-1">
        <Text className="text-lg font-rubik-semibold">{item.title}</Text>
        <Text className="text-gray-600">{item.location}</Text>
        <Text className="text-primary-300 font-bold">{item.price}</Text>
      </View>
    </View>
  );

  return (
    <View className='flex-1 bg-gray-300 p-4'>
      <Text className='text-2xl font-rubik-bold mb-4'>Favorites</Text>

      {favorites.length === 0?(
        <View className='flex-1 items-center justify-center'>
          <FontAwesome5 name="heart-broken" size={48} color='gray'/>
          <Text className='text-gray-600 mt-4 '>No favorite house yet.</Text>
          </View>

      ):(
        <SwipeListView
        data={favorites}
        keyExtractor={(item)=>item.id}
        renderItem={renderHouse}
        renderHiddenItem={({item})=>(
          <TouchableOpacity
          onPress={()=> removeFavorite(item.id)}
          className='bg-primary-300 px-5 items-end rounded-r-lg flex-1 justify-center'
          >
           <FontAwesome5 name="trash" size={24} color="white" />
          </TouchableOpacity>
        )}
        rightOpenValue={-75}
        />
      )}
    </View>
  )
}

export default favorites