import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { useDebounce } from "use-debounce";
import { useNavigation } from "@react-navigation/native";
import icons from "@/constants/icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchTerm } = useLocalSearchParams();
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const router = useRouter();

  const handleSearch = () => {
    router.push({
      pathname: "/search",
      params: { searchTerm: debouncedSearchQuery },
    });
    // Navigate to the explore screen with the debounced search query
    // navigation.navigate("Explore", { searchQuery: debouncedSearchQuery });
  };

  // useEffect(() => {
  //   const searchQuery = Array.isArray(searchTerm) ? searchTerm[0] : searchTerm;
  //   if (searchQuery) {
  //     setSearchQuery(searchQuery);
  //   }
  // }, [searchQuery]);

  return (
    <View
      className='flex flex-row items-center justify-between w-full
    px-4 rounded-lg bg-black-100/15  border border-primary-100 mt-5 py-1'
    >
      <View className='flex-1 flex flex-row items-center justify-start z-50'>
        <TouchableOpacity onPress={handleSearch}>
          <Image source={icons.search} className='size-9 object-contain' />
        </TouchableOpacity>
        <TextInput
          placeholder='Search for houses'
          className='text-sm font-rubik text-black-300 ml-2 flex-1'
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      </View>
      {searchQuery && (
        <TouchableOpacity className=' pr-4' onPress={handleSearch}>
          <AntDesign name='closecircle' size={22} color='#8C8E98' />
        </TouchableOpacity>
      )}
     { <TouchableOpacity onPress={handleSearch}>
        <Image source={icons.filter} className='size-7' />
      </TouchableOpacity>}
    </View>
  );
};

export default Search;


