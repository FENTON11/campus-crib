import React, { useState, useEffect } from "react";
import { 
  View, Text, Image, FlatList, TouchableOpacity, Alert, ActivityIndicator 
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { appwriteService } from "@/appwrite/appwriteService";
import { authService } from "@/appwrite/authService";
import { User } from "@/typings";


interface Booking {
  id: string;
  propertyId: string;
  title: string;
  image: string;
  location: string;
  price: number;
  visitDate: string; 
}

const MyBookings = () => {
  const [user, setUser] = useState<User| null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load bookings from Appwrite
  useEffect(() => {
    const fetchUser = async () => {
      try{
        const user = await authService.getUser();
        setUser
      }
      catch(error){
        console.error("Error fetching user:", error);
      }
    }
    fetchUser();
  }, []);
  // fetch bookings for the logged in user
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      try {
        const userBookings = await appwriteService.getUserBookings(user.$id); // Fetch bookings
        setBookings(userBookings.map((doc: any) => ({
          id: doc.$id,
          propertyId: doc.propertyId,
          title: doc.title,
          image: doc.image,
          location: doc.location,
          price: doc.price,
          visitDate: doc.visitDate,
        })));
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);


  // Cancel a booking
  const cancelBooking = async (id: string) => {
    Alert.alert("Cancel Booking", "Are you sure you want to cancel this booking?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes, Cancel",
        onPress: async () => {
          try {
            await appwriteService.cancelBooking(id);
            setBookings(bookings.filter((booking) => booking.id !== id));
          } catch (error) {
            console.error("Error canceling booking:", error);
          }
        },
      },
    ]);
  };

  // Render booked property
  const renderBooking = ({ item }: { item: Booking }) => (
    <View className="bg-white p-4 rounded-lg shadow-md mb-3 flex-row items-center">
      <Image 
        source={{ uri: item.image || "https://via.placeholder.com/100" }} 
        className="w-24 h-24 rounded-md mr-4" 
      />
      <View className="flex-1">
        <Text className="text-lg font-bold">{item.title}</Text>
        <Text className="text-gray-600">{item.location}</Text>
        <Text className="text-primary-300 font-bold">${item.price} Total</Text>
        <Text className="text-sm text-gray-500">Visit: {item.visitDate}</Text>
      </View>
      <TouchableOpacity onPress={() => cancelBooking(item.id)} className="p-2 bg-red-500 rounded-full">
        <FontAwesome5 name="trash" size={18} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-4">My Bookings</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#ff014f" />
      ) : bookings.length === 0 ? (
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
