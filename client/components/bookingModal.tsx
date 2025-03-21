import { View, Text,Modal,TouchableOpacity,ActivityIndicator,Button } from 'react-native'
import React,{useState} from 'react'
import DatePicker from 'react-native-date-picker'
import { appwriteService } from '@/appwrite/appwriteService'
import { authService } from '@/appwrite/authService'

interface bookingModal {
    modalVisible: boolean;
    onClose: () => void;
    propertyId: string;
}
const bookingModal: React.FC<bookingModal> = ({modalVisible,onClose,propertyId}) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [isDatePickerVisible, setDatePickerVisible] = useState(false)
  

    const handleConfirmBooking = async () => {
        setLoading(true)
        setError(null)
        try {
            const user = await authService.getUser()
            if(!user) {
                setError('You need to log in to book a visit')
                return;
            }
             await appwriteService.bookVisit(user.$id,propertyId,selectedDate);
                onClose()
                alert("booking successful! The agent will contact you soon.");
        } catch (err) {
            setError("Failed to book visit. Please try again later.")
        } finally {
            setLoading(false)
        }
    }
   

  
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white w-4/5 p-6 rounded-lg">
          <Text className="text-xl font-bold">Confirm Your Visit</Text>
          <Text className="text-gray-600 mt-2">Select a date for your visit:</Text>

          {/* Date Picker Button */}
          <TouchableOpacity onPress={() => setDatePickerVisible(true)} className="mt-3 bg-gray-200 p-3 rounded">
            <Text className="text-lg">{selectedDate.toDateString()}</Text>
          </TouchableOpacity>

          {/* Date Picker Modal */}
          <DatePicker
            modal
            open={isDatePickerVisible}
            date={selectedDate}
            minimumDate={new Date()} // Prevent past dates
            onConfirm={(date) => {
              setDatePickerVisible(false);
              setSelectedDate(date);
            }}
            onCancel={() => setDatePickerVisible(false)}
          />

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
              {loading ? <ActivityIndicator color="blue" /> : <Text className="text-white">Confirm</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default bookingModal