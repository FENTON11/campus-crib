import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from "@expo/vector-icons";

interface Booking {
  id: string;
  title: string;
  image: string;
  location: string;
  price: number;
}

const MyBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Load bookings from AsyncStorage
  useEffect(() => {
    const loadBookings = async () => {
      try {
        const storedBookings = await AsyncStorage.getItem("bookings");
        if (storedBookings) {
          setBookings(JSON.parse(storedBookings));
        }
      } catch (error) {
        console.error("Error loading bookings:", error);
      }
    };
    loadBookings();
  }, []);

  // Save bookings to AsyncStorage
  const saveBookings = async (newBookings: Booking[]) => {
    try {
      await AsyncStorage.setItem("bookings", JSON.stringify(newBookings));
      setBookings(newBookings);
    } catch (error) {
      console.error("Error saving bookings:", error);
    }
  };

  // Cancel a booking
  const cancelBooking = (id: string) => {
    Alert.alert("Cancel Booking", "Are you sure you want to cancel this booking?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes, Cancel",
        onPress: () => {
          const updatedBookings = bookings.filter((booking) => booking.id !== id);
          saveBookings(updatedBookings);
        },
      },
    ]);
  };

  // Render each booked house
  const renderBooking = ({ item }: { item: Booking }) => (
    <View className="bg-white p-4 rounded-lg shadow-md mb-3 flex-row items-center">
      <Image source={{ uri: item.image }} className="w-24 h-24 rounded-md mr-4" />
      <View className="flex-1">
        <Text className="text-lg font-bold">{item.title}</Text>
        <Text className="text-gray-600">{item.location}</Text>
        <Text className="text-primary-300 font-bold">${item.price} Total</Text>
      </View>
      <TouchableOpacity onPress={() => cancelBooking(item.id)} className="p-2 bg-red-500 rounded-full">
        <FontAwesome5 name="trash" size={18} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-200 p-4">
      <Text className="text-2xl font-bold mb-4">My Bookings</Text>
      {bookings.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <FontAwesome5 name="calendar-times" size={48} color="gray" />
          <Text className="text-gray-600 mt-4">No bookings yet.</Text>
        </View>
      ) : (
        <FlatList data={bookings} keyExtractor={(item) => item.id} renderItem={renderBooking} />
      )}
    </View>
  );
};

export default MyBookings;
