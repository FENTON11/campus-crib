import { View, Text,Modal,TouchableOpacity,ScrollView } from 'react-native'
import React,{useState} from 'react'
import Slider from "@react-native-community/slider"
import { Picker } from '@react-native-picker/picker'
import { Ionicons } from '@expo/vector-icons'

import { FilterModal as IFilterModel } from '@/typings'

  


const FilterModal: React.FC<IFilterModel> = ({ visible, onClose, onApplyFilters, onReset }) => {
    const [priceRange,setPriceRange] = useState(5000);
    const [location,setLocation] = useState("");
    const [bedrooms,setBedrooms] = useState(1);
    const [bathrooms,setBathrooms] = useState(1);
    const [propertyType,setPropertyType] = useState("");
    const [furnished,setFurnished] = useState(false);
    const [petFriendly,setPetFriendly] = useState(false);
    const [parking,setParking] = useState(false);
    const [security,setSecurity] = useState(false);
    const [roommatesAllowed,setRoommatesAllowed] = useState(true);

  return (
    <Modal visible={visible} animationType='slide' transparent onRequestClose={onClose}>
     <View className='flex-1 justify-center bg-slate-200'>
        <View className='bg-white p-6 w-4/5 rounded-3xl self-center'> 
         {/* Header */}
            <View className='flex flex-row justify-between'>
                <TouchableOpacity onPress={onClose}>
                    <Ionicons name='arrow-back' size={24} color='blue' />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text className='text-primary-300 font-rubik-bold'>Filter</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onReset}>
                    <Text className='text-primary-300 font-rubik-semibold'>Reset</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                {/* Price Range  slider*/}
                <Text className='mt-4 font-rubik-semibold'>Price Range</Text>
                <Slider
                    minimumValue={1000}
                    maximumValue={50000}
                    step={500}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value)}
                />
                <Text className='text-center'>${priceRange}</Text>

                {/* Location */}
                <Text className='mt-4  font-rubik-semibold'>Location</Text>
                <Picker selectedValue={location} onValueChange={(value) => setLocation(value)}>
                    <Picker.Item label='Nairobi' value='Nairobi' />
                    <Picker.Item label='Mombasa' value='Mombasa' />
                    <Picker.Item label='Port Harcourt' value='Port Harcourt' />
                    <Picker.Item label='Ibadan' value='Ibadan' />
                </Picker>
                
                {/* Bedrooms  & Bathrooms*/}
                <Text className='mt-4  font-rubik-semibold'>Bedrooms</Text>
                <Picker selectedValue={bedrooms} onValueChange={(value) => setBedrooms(value)}>
                    {[1,2,3,4,5].map((num) => (
                        <Picker.Item key={num} label={`${num}`} value={num}/>
                    ))}
                </Picker>
                <Text className='mt-4  font-rubik-semibold'>Bathrooms</Text>
                <Picker selectedValue={bathrooms} onValueChange={(value) => setBathrooms(value)}>
                    {[1,2,3,4,5].map((num) => (
                        <Picker.Item key={num} label={`${num}`} value={num}/>
                    ))}
                </Picker>

                {/* Property Type*/}
                <Text className='mt-4  font-rubik-semibold'>Property Type</Text>
                <Picker selectedValue={propertyType} onValueChange={(value) => setPropertyType(value)}>
                  <Picker.Item label='Apartment' value='Apartment' />
                  <Picker.Item label='Condos' value='Condos' />
                  <Picker.Item label='House' value='House' /> 
                  <Picker.Item label='Duplexes' value='Duplexes' />
                  <Picker.Item label='Studio' value='Studio' />
                  <Picker.Item label='Townhouse' value='Townhouse' />
                </Picker>
                {/* Extra Features */}
                <View className="mt-4">
              <TouchableOpacity onPress={() => setFurnished(!furnished)}>
                <Text>{furnished ? '✅' : '⬜'} Furnished</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setPetFriendly(!petFriendly)}>
                <Text>{petFriendly ? '✅' : '⬜'} Pet Friendly</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setParking(!parking)}>
                <Text>{parking ? '✅' : '⬜'} Parking Available</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSecurity(!security)}>
                <Text>{security ? '✅' : '⬜'} Security Features</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setRoommatesAllowed(!roommatesAllowed)}>
                <Text>{roommatesAllowed ? '✅' : '⬜'} Roommates Allowed</Text>
              </TouchableOpacity>
            </View>
            </ScrollView>

            {/* Apply Filters Button */}
          <TouchableOpacity onPress={() => onApplyFilters({ priceRange, location, bedrooms, bathrooms, propertyType, furnished, petFriendly, parking, security, roommatesAllowed })} 
           className="mt-4 bg-primary-300 p-3 rounded-3xl">
            <Text className="text-white text-center font-rubik-bold">Set Filters</Text>
          </TouchableOpacity>
        </View>

     </View>
    </Modal>
  )
}

export default FilterModal