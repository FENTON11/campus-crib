import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "@/lib/data";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon library
import { useLocation } from "@/hooks";
import { ICity, ICountry, IState } from "country-state-city";
import { Picker } from "@react-native-picker/picker";
interface StepTwoProps {
  handlePrev: (value: number) => void;
  step: number;
  onSubmit: (data: z.infer<typeof schema>) => void;
  validationErrors: { [key: string]: string };
}

const StepTwo = ({
  step,
  handlePrev,
  onSubmit,
  validationErrors,
}: StepTwoProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      price: 0,
      bathrooms: 0,
      beds: 0,
      area: 0,
      address: "",
      description: "",
    },
  });
  const { countries, getCountryStates, getStatesCities } = useLocation();
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [country, setCountry] = useState<ICountry | null>(null);
  const [state, setState] = useState<IState | null>(null);
  const [city, setCity] = useState<ICity | null>(null);
  const [stateLoading, setStateLoading] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [street, setStreet] = useState("");

  useEffect(() => {
    if (country) {
      setStateLoading(true);
      const tempStates = getCountryStates(country.isoCode);
      setStates(tempStates);
      setStateLoading(false);
    }
  }, [country]);
  useEffect(() => {
    if (state && country) {
      setCitiesLoading(true);
      const tempCities = getStatesCities(country?.isoCode, state.isoCode);
      setCities(tempCities);
      setCitiesLoading(false);
    }
  }, [state, country]);

  return (
    <View className='gap-6 flex-1 bg-gray-3 py-4 px-2'>
      <View className='p-2'>
        <Text className='font-rubik-semibold text-2xl text-primary-300'>
          Property Details
        </Text>
      </View>

      {/* Property Name Field */}
      <View className='gap-1'>
        <Text className='text-black-100 font-rubik-light'>Property Name</Text>
        <Controller
          control={control}
          name='name'
          render={({ field: { onChange, onBlur, value } }) => (
            <View className='flex-row items-center gap-2 border border-gray-400 rounded-lg'>
              <View className='p-2 bg-gray-300 rounded-l-lg border-gray-400 border-r-[1px] items-center justify-center'>
                <Icon name='home' size={24} color='gray' />
              </View>
              <TextInput
                className='flex-1 p-2 text-black outline-none bg-transparent'
                placeholder='Property Name'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
        />
        {errors.name && (
          <Text className='text-red-500 font-poppins-regular text-sm'>
            {errors.name.message}
          </Text>
        )}
        {validationErrors.name && (
          <Text className='text-red-500 font-poppins-regular text-sm'>
            {validationErrors.name}
          </Text>
        )}
      </View>

      {/* Property Price Field */}
      <View className='gap-1'>
        <Text className='text-black-100 font-rubik-light'>Property Price</Text>
        <Controller
          control={control}
          name='price'
          render={({ field: { onChange, onBlur, value } }) => (
            <View className='flex-row items-center gap-2 border border-gray-400 rounded-lg'>
              <View className='p-2 bg-gray-300 rounded-l-lg border-gray-400 border-r-[1px] items-center justify-center'>
                <Icon name='attach-money' size={24} color='gray' />
              </View>
              <TextInput
                className='flex-1 p-2 text-black outline-none bg-transparent'
                inputMode='numeric'
                placeholder='Property Price'
                onBlur={onBlur}
                onChangeText={(text) => onChange(Number(text))}
                value={value.toString()}
              />
            </View>
          )}
        />
        {errors.price && (
          <Text className='text-red-500 font-poppins-regular text-sm'>
            {errors.price.message}
          </Text>
        )}
        {validationErrors.price && (
          <Text className='text-red-500 font-poppins-regular text-sm'>
            {validationErrors.price}
          </Text>
        )}
      </View>

      {/* Property Bathrooms Field */}
      <View className='flex-row gap-2 items-center'>
        <View className='gap-1 flex-1'>
          <Text className='text-black-100 font-rubik-light'>
            Property Bathroom(s)
          </Text>
          <Controller
            control={control}
            name='bathrooms'
            render={({ field: { onChange, onBlur, value } }) => (
              <View className='flex-row items-center gap-2 border border-gray-400 rounded-lg'>
                <View className='p-2 bg-gray-300 rounded-l-lg border-gray-400 border-r-[1px] items-center justify-center'>
                  <Icon name='bathtub' size={24} color='gray' />
                </View>
                <TextInput
                  inputMode='numeric'
                  className='flex-1 p-2 text-black outline-none bg-transparent'
                  placeholder='Property Bathroom(s)'
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(Number(text))}
                  value={value.toString()}
                />
              </View>
            )}
          />
          {errors.bathrooms && (
            <Text className='text-red-500 font-poppins-regular text-sm'>
              {errors.bathrooms.message}
            </Text>
          )}
          {validationErrors.bathrooms && (
            <Text className='text-red-500 font-poppins-regular text-sm'>
              {validationErrors.bathrooms}
            </Text>
          )}
        </View>

        {/* Property Beds Field */}
        <View className='gap-1 flex-1'>
          <Text className='text-black-100 font-rubik-light'>
            Property Bed(s)
          </Text>
          <Controller
            control={control}
            name='beds'
            render={({ field: { onChange, onBlur, value } }) => (
              <View className='flex-row items-center gap-2 border border-gray-400 rounded-lg'>
                <View className='p-2 bg-gray-300 rounded-l-lg border-gray-400 border-r-[1px] items-center justify-center'>
                  <Icon name='bed' size={24} color='gray' />
                </View>
                <TextInput
                  inputMode='numeric'
                  className='flex-1 p-2 text-black outline-none bg-transparent'
                  placeholder='Property Bed(s)'
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(Number(text))}
                  value={value.toString()}
                />
              </View>
            )}
          />
          {errors.beds && (
            <Text className='text-red-500 font-poppins-regular text-sm'>
              {errors.beds.message}
            </Text>
          )}
          {validationErrors.beds && (
            <Text className='text-red-500 font-poppins-regular text-sm'>
              {validationErrors.beds}
            </Text>
          )}
        </View>
      </View>

      {/* Property Area Field */}
      <View className='flex-row gap-2 items-center'>
        <View className='gap-1 flex-1'>
          <Text className='text-black-100 font-rubik-light'>
            Property Area (m²)
          </Text>
          <Controller
            control={control}
            name='area'
            render={({ field: { onChange, onBlur, value } }) => (
              <View className='flex-row items-center gap-2 border border-gray-400 rounded-lg'>
                <View className='p-2 bg-gray-300 rounded-l-lg border-gray-400 border-r-[1px] items-center justify-center'>
                  <Icon name='square-foot' size={24} color='gray' />
                </View>
                <TextInput
                  inputMode='numeric'
                  className='flex-1 p-2 text-black outline-none bg-transparent'
                  placeholder='Property Area (m²)'
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(Number(text))}
                  value={value.toString()}
                />
              </View>
            )}
          />
          {errors.area && (
            <Text className='text-red-500 font-poppins-regular text-sm'>
              {errors.area.message}
            </Text>
          )}
          {validationErrors.area && (
            <Text className='text-red-500 font-poppins-regular text-sm'>
              {validationErrors.area}
            </Text>
          )}
        </View>

        {/* Property Address Field */}
        <View className='gap-1 flex-1'>
          <Text className='text-black-100 font-rubik-light'>
            Property Address
          </Text>
          <Controller
            control={control}
            name='address'
            render={({ field: { onChange, onBlur, value } }) => (
              <View className='flex-row items-center gap-2 border border-gray-400 rounded-lg'>
                <View className='p-2 bg-gray-300 rounded-l-lg border-gray-400 border-r-[1px] items-center justify-center'>
                  <Icon name='location-on' size={24} color='gray' />
                </View>
                <TextInput
                  className='flex-1 p-2 text-black outline-none bg-transparent'
                  placeholder='Property Address'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
          />
          {errors.address && (
            <Text className='text-red-500 font-poppins-regular text-sm'>
              {errors.address.message}
            </Text>
          )}
          {validationErrors.address && (
            <Text className='text-red-500 font-poppins-regular text-sm'>
              {validationErrors.address}
            </Text>
          )}
        </View>
      </View>
      <View className=' flex-row gap-2 items-center '>
        {/* Property country Field */}
        <View className='gap-1 flex-1'>
          <Text className='text-black-100 font-rubik-light'>
            Select country
          </Text>
          <Picker
            selectedValue={country}
            onValueChange={(itemValue) => setCountry(itemValue)}
            className={`border rounded-lg border-primary-300`}
          >
            {countries.map((country) => (
              <Picker.Item
                key={country.isoCode}
                label={country.name}
                value={country}
              />
            ))}
          </Picker>
        </View>
        {/* Property county */}
        <View className='gap-1 flex-1'>
          <Text className='text-black-100 font-rubik-light'>select county</Text>
          {stateLoading ? (
            <ActivityIndicator />
          ) : (
            <Picker
              selectedValue={state}
              onValueChange={(itemValue) => setState(itemValue as IState)}
              className={`border rounded-lg border-primary-300`}
            >
              {states.map((state) => (
                <Picker.Item
                  key={state.isoCode}
                  label={state.name}
                  value={state}
                />
              ))}
            </Picker>
          )}
        </View>
      </View>
      <View className=' flex-row gap-2 items-center '>
        {/* Property country Field */}
        <View className='gap-1 flex-1'>
          <Text className='text-black-100 font-rubik-light'>Select citiy</Text>
          <Picker
            selectedValue={city}
            onValueChange={(itemValue) => setCity(itemValue as ICity)}
            className={`border rounded-lg border-primary-300`}
          >
            {cities.map((city) => (
              <Picker.Item
                key={city.stateCode}
                label={city.name}
                value={city}
              />
            ))}
          </Picker>
        </View>
        {/* Property county */}
        <View className='gap-1 flex-1'>
          <Text className='text-black-100 font-rubik-light'>
            Property zip code
          </Text>
          <Controller
            control={control}
            name='code'
            render={({ field: { onChange, onBlur, value } }) => (
              <View className='flex-row items-center gap-2 border border-gray-400 rounded-lg'>
                <View className='p-2 bg-gray-300 rounded-l-lg border-gray-400 border-r-[1px] items-center justify-center'>
                  <Icon name='description' size={24} color='gray' />
                </View>
                <TextInput
                  className='flex-1 p-2 text-black outline-none bg-transparent min-h-10'
                  placeholder='Property zip code'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
          />
          {errors.code && (
            <Text className='text-red-500 font-poppins-regular text-sm'>
              {errors.code.message}
            </Text>
          )}
          {validationErrors.description && (
            <Text className='text-red-500 font-poppins-regular text-sm'>
              {validationErrors.street}
            </Text>
          )}
        </View>
      </View>

      {/* Property Description Field */}
      <View className='gap-1'>
        <Text className='text-black-100 font-rubik-light'>
          Property Description
        </Text>
        <Controller
          control={control}
          name='description'
          render={({ field: { onChange, onBlur, value } }) => (
            <View className='flex-row items-center gap-2 border border-gray-400 rounded-lg'>
              <View className='p-2 bg-gray-300 rounded-l-lg border-gray-400 border-r-[1px] items-center justify-center'>
                <Icon name='description' size={24} color='gray' />
              </View>
              <TextInput
                multiline={true}
                numberOfLines={10}
                className='flex-1 p-2 text-black outline-none bg-transparent min-h-10'
                placeholder='Property Description'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
        />
        {errors.description && (
          <Text className='text-red-500 font-poppins-regular text-sm'>
            {errors.description.message}
          </Text>
        )}
        {validationErrors.description && (
          <Text className='text-red-500 font-poppins-regular text-sm'>
            {validationErrors.description}
          </Text>
        )}
      </View>
      <View className='flex-row justify-between p-4 items-center'>
        <TouchableOpacity
          onPress={() => handlePrev(step - 1)}
          activeOpacity={0.3}
          className={`py-2 px-4 rounded-lg ${
            step > 1 ? "bg-primary-300" : "bg-gray-300"
          }`}
        >
          <Text className='font-rubik-semibold text-white'>PREV</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          activeOpacity={0.3}
          className='py-2 px-4 rounded-lg bg-primary-300'
        >
          <Text className='font-rubik-semibold text-white'>NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StepTwo;
