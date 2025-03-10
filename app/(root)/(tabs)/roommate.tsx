import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';

const Roommate = () => {
  interface Roommate {
    id: string;
    name: string;
    university: string;
    budget: string;
    similarityScore: number;
    profilePic: string;
  }

  const [roommates, setRoommates] = useState<Roommate[]>([]);

  useEffect(() => {
    // Fetch AI-recommended roommates (Replace with actual API call)
    const fetchRoommates = async () => {
      // Simulated API data
      const data = [
        {
          id: '1',
          name: 'John Doe',
          university: 'University of Nairobi',
          budget: '$200 - $300',
          similarityScore: 92,
          profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
        {
          id: '2',
          name: 'Jane Smith',
          university: 'Strathmore University',
          budget: '$250 - $350',
          similarityScore: 87,
          profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
        },
        {
          id: '3',
          name: 'Alex Kimani',
          university: 'Kenyatta University',
          budget: '$180 - $260',
          similarityScore: 89,
          profilePic: 'https://randomuser.me/api/portraits/men/3.jpg',
        },
        {
          id: '4',
          name: 'Sophia Wanjiru',
          university: 'Moi University',
          budget: '$220 - $300',
          similarityScore: 90,
          profilePic: 'https://randomuser.me/api/portraits/women/4.jpg',
        },
        {
          id: '5',
          name: 'Brian Otieno',
          university: 'JKUAT',
          budget: '$230 - $320',
          similarityScore: 85,
          profilePic: 'https://randomuser.me/api/portraits/men/5.jpg',
        },
        {
          id: '6',
          name: 'Lisa Mwangi',
          university: 'USIU Africa',
          budget: '$200 - $280',
          similarityScore: 88,
          profilePic: 'https://randomuser.me/api/portraits/women/6.jpg',
        },
      ];
      setRoommates(data);
    };

    fetchRoommates();
  }, []);

  const renderRoommate = ({ item }: { item: Roommate }) => (
    <View className="bg-white p-4 mb-3 rounded-lg shadow-md flex-row items-center">
      <Image source={{ uri: item.profilePic }} className="w-16 h-16 rounded-full mr-4" />
      <View className="flex-1">
        <Text className="text-lg font-rubik-semibold text-black-300">{item.name}</Text>
        <Text className="text-black-300">{item.university}</Text>
        <Text className="text-black-300">Budget: {item.budget}</Text>
        <Text className="text-primary-300 font-rubik-bold">Match: {item.similarityScore}%</Text>
      </View>
      <TouchableOpacity className="mr-3">
        <FontAwesome name="user" size={20} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome name="comment" size={20} color="blue" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="p-4 bg-gray-100 flex-1">
      <Text className="text-xl font-rubik-bold text-black-300 mb-4">AI-Powered Roommate Suggestions</Text>
      <FlatList
        data={roommates}
        renderItem={renderRoommate}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Roommate;
