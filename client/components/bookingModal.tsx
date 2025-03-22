import { View, Text, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
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

  const handleConfirmBooking = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await authService.getUser();
      if (!user) {
        setError('You need to log in to book a visit');
        return;
      }
      await appwriteService.bookVisit(user.$id, propertyId, selectedDate);
      onClose();
      alert('Booking successful! The agent will contact you soon.');
    } catch (err) {
      setError('Failed to book visit. Please try again later.');
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
            date={selectedDate.toISOString()}
            onChange={(date) => {
              if (date && new Date(date) >= new Date()) {
                setSelectedDate(new Date(date));
              } else {
                alert('Please select a valid future date.');
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
