import { View, Text, ScrollView, Image,TouchableOpacity } from 'react-native'
import React, { useState, useEffect} from 'react'
import { FontAwesome } from '@expo/vector-icons'
const Roommate = () => {
  interface Roommate {
    id: string;
    name: string;
    university: string;
    budget: string;
    similarityScore: number;
    profilePic: string;
  }

  const [roommates, setRoommates] = useState<Roommate[]>([])
  useEffect(() => {
    // Fetch AI-recommended roommates (Replace with actual API call)
    const fetchRoommates = async () => {
      // Simulated API data
      const data = [
        {
          id: "1",
          name: "John Doe",
          university: "University of Nairobi",
          budget: "$200 - $300",
          similarityScore: 92,
          profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        {
          id: "2",
          name: "Jane Smith",
          university: "Strathmore University",
          budget: "$250 - $350",
          similarityScore: 87,
          profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
        },
      ];
      setRoommates(data);
    };

    fetchRoommates();
  }, []);

  return (
   <ScrollView className='p-4 bg-gray-100'>
     <Text className='text-xl font-rubik-bold text-black-300 mb-4'>
        AI-Powered Roommate Suggestions
     </Text>
     {roommates.map((roommate) => (
        <View
          key={roommate.id}
          className="bg-white p-4 mb-3 rounded-lg shadow-md flex-row items-center"
        >
          <Image
            source={{ uri: roommate.profilePic }}
            className="w-16 h-16 rounded-full mr-4"
          />
          <View className="flex-1">
            <Text className="text-lg font-rubik-semibold text-black-300">
              {roommate.name}
            </Text>
            <Text className="text-black-300">{roommate.university}</Text>
            <Text className="text-black-300">Budget: {roommate.budget}</Text>
            <Text className="text-primary-300 font-rubik-bold">
              Match: {roommate.similarityScore}%
            </Text>
          </View>
          <TouchableOpacity className="mr-3">
            <FontAwesome name="user" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="comment" size={20} color="blue" />
          </TouchableOpacity>
        </View>
      ))}
     
   </ScrollView>
  )
}

export default Roommate