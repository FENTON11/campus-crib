import { View, Text, Modal, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import DatePicker from 'expo-datepicker';
import moment from 'moment';
import { appwriteService } from '@/appwrite/appwriteService';
import { authService } from '@/appwrite/authService';

interface BookingModalProps {
  modalVisible: boolean;
  onClose: () => void;
  propertyId: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ modalVisible, onClose, propertyId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: Date) => {
    // console.log("🚀 handleDateChange triggered with:", date);
  
    if (isNaN(date.getTime())) {
      Alert.alert("Date Error", "Invalid date selected. Please try again.");
      return;
    }
  
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize time for accurate comparison
  
    if (date >= today) {
      setSelectedDate(date);
    } else {
      Alert.alert("Date Error", "You can't select a past date.");
    }
  };
const handleConfirmBooking = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await authService.getUser();
      if (!user) {
        setError('You need to log in to book a visit');
        return;
      }
      // Add booking to the database
      await appwriteService.bookVisit(user.$id, propertyId, selectedDate);
      onClose();
      Alert.alert('Booking successful!', 'The agent will contact you soon.');
    } catch (err) {
      const error = err as Error;
      Alert.alert('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white w-4/5 p-6 rounded-lg">
          <Text className="text-xl font-bold">Confirm Your Visit</Text>
          <Text className="text-gray-600 mt-2">Select a date for your visit:</Text>

          {/* Date Picker Component */}
          <DatePicker
            date={selectedDate.toISOString().split("T")[0]} // Format as "YYYY-MM-DD"
             onChange={(dateString) => {
            //  console.log("Raw date from picker:", dateString);

             if (dateString) {
              // Replace slashes with hyphens
                const formattedDateString = dateString.replace(/\//g, "-");
                //  console.log("Formatted date string:", formattedDateString);

                const parsedDate = new Date(formattedDateString);
                //    console.log("Parsed selected date:", parsedDate);

                   if (!isNaN(parsedDate.getTime())) {
                    handleDateChange(parsedDate);
               } else {
                   Alert.alert("Date Error", "Invalid date selected. Please try again.");
                }
                } else {
                 Alert.alert("Date Error", "Date is undefined.");
               }
             }}
            />

         
          
          <Text className="mt-3 text-lg">{moment(selectedDate).format('MMMM D, YYYY')}</Text>

          {error && <Text className="text-red-500 mt-2">{error}</Text>}

          <View className="mt-4 flex-row justify-between">
            <TouchableOpacity onPress={onClose} className="bg-gray-300 px-4 py-2 rounded">
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirmBooking}
              className="bg-blue-500 px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="white" /> : <Text className="text-white">Confirm</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BookingModal;
