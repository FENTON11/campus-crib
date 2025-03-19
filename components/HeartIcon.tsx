import React, { useState, useEffect } from "react";
import { Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import icons from "@/constants/icons";
import defaultHouse from "@/assets/images/default-house.jpg";
interface HeartIcon {
   house: {
    id: string;
    title: string;
    price: number;
    location: string;
    image: string;
  };
  onFavoriteChange?: () => void; // Callback function to update Favorites screen
}

const HeartIcon = ({ house, onFavoriteChange }: HeartIcon) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkIfFavorite();
  }, []);

  // Check if the house is already a favorite
  const checkIfFavorite = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      const alreadyFavorited = favorites.some((fav: any) => fav.id === house.id);
      setIsFavorite(alreadyFavorited);
    } catch (error) {
      console.error("Error checking favorites:", error);
    }
  };

  // Toggle favorite status
  const toggleFavorite = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      const newHouse = {
        id: house.id,
        title: house.title,
        price: house.price,
        location: house.location,
        image: house.image ? house.image : defaultHouse,
      };

      if (isFavorite) {
        // Remove from favorites
        favorites = favorites.filter((fav: any) => fav.id !== house.id);
      } else {
        // Add to favorites
        favorites.push(newHouse);
      }

      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(!isFavorite);

      // Notify the Favorites screen to refresh
      if (onFavoriteChange) {
        onFavoriteChange();
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <TouchableOpacity onPress={toggleFavorite}>
        <Image 
        source={icons.heart} 
        className="size-8" 
        style={{ tintColor: isFavorite ? "red" : "#191d31" }} 
      />
      {/* <FontAwesome name={isFavorite ? "heart" : "heart-o"} size={24} color="red" /> */}
    </TouchableOpacity>
  );
};

export default HeartIcon;
