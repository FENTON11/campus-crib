import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Your provided schema
const schema = z.object({
  name: z
    .string({ message: "Property name is required" })
    .min(3, "Property name cannot be less than 3 characters")
    .max(2200, "Property name cannot be more than 2200 characters"),
  price: z
    .number({ message: "Property price is required" })
    .min(1, "Property price cannot be less than 1"),
  location: z.string({ message: "Property location is required" }),
  bathrooms: z.number({ message: "Property bathrooms is required" }),
  beds: z
    .number({ message: "Property beds is required" })
    .min(0, "Property beds cannot be less than 0")
    .max(100, "Property beds cannot be more than 100"),
  area: z
    .number({ message: "Property area is required" })
    .min(0, "Property area cannot be less than 0")
    .max(20, "Property area cannot be more than 20"),
  address: z
    .string({ message: "Property address is required" })
    .min(3, "Property address cannot be less than 3 characters")
    .max(2200, "Property address cannot be more than 2200 characters"),
  description: z
    .string({ message: "Property description is required" })
    .min(1, "Property description cannot be less than 1 character")
    .max(2200, "Property description cannot be more than 2200 characters"),
});

const StepTwo = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      price: 0,
      location: "",
      bathrooms: 0,
      beds: 0,
      area: 0,
      address: "",
      description: "",
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data); // Handle form submission
  };

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
            <TextInput
              className='border border-primary-300 p-2 text-black rounded-2xl outline-none bg-transparent'
              placeholder='Property Name'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.name && (
          <Text className='text-red-500 font-poppins-regular text-sm'>
            {errors.name.message}
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
            <TextInput
              className='border border-primary-300 p-3 text-black rounded-lg outline-none'
              inputMode='numeric'
              placeholder='Property Price'
              onBlur={onBlur}
              onChangeText={(text) => onChange(Number(text))}
              value={value.toString()}
            />
          )}
        />
        {errors.price && (
          <Text className='text-red-500 font-poppins-regular text-sm'>
            {errors.price.message}
          </Text>
        )}
      </View>

      {/* Property Location Field */}
      <View className='gap-1'>
        <Text className='text-black-100 font-rubik-light'>
          Property Location
        </Text>
        <Controller
          control={control}
          name='location'
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className='border border-primary-300 p-3 text-black rounded-lg outline-none'
              placeholder='Property Location'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.location && (
          <Text className='text-red-500 font-poppins-regular text-sm'>
            {errors.location.message}
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
              <TextInput
                inputMode='numeric'
                className='border border-primary-300 p-3 text-black rounded-lg outline-none'
                placeholder='Property Bathroom(s)'
                onBlur={onBlur}
                onChangeText={(text) => onChange(Number(text))}
                value={value.toString()}
              />
            )}
          />
          {errors.bathrooms && (
            <Text className='text-red-500 font-poppins-regular text-sm'>
              {errors.bathrooms.message}
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
              <TextInput
                inputMode='numeric'
                className='border border-primary-300 p-3 text-black rounded-lg outline-none'
                placeholder='Property Bed(s)'
                onBlur={onBlur}
                onChangeText={(text) => onChange(Number(text))}
                value={value.toString()}
              />
            )}
          />
          {errors.beds && (
            <Text className='text-red-500 font-poppins-regular text-sm'>
              {errors.beds.message}
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
              <TextInput
                inputMode='numeric'
                className='border border-primary-300 p-3 text-black rounded-lg outline-none'
                placeholder='Property Area (m²)'
                onBlur={onBlur}
                onChangeText={(text) => onChange(Number(text))}
                value={value.toString()}
              />
            )}
          />
          {errors.area && (
            <Text className='text-red-500 font-poppins-regular text-sm'>
              {errors.area.message}
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
              <TextInput
                className='border border-primary-300 p-3 text-black rounded-lg outline-none'
                placeholder='Property Address'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.address && (
            <Text className='text-red-500 font-poppins-regular text-sm'>
              {errors.address.message}
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
            <TextInput
              multiline={true}
              numberOfLines={4}
              className='border border-primary-300 p-3 text-black rounded-lg outline-none'
              placeholder='Property Description'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.description && (
          <Text className='text-red-500 font-poppins-regular text-sm'>
            {errors.description.message}
          </Text>
        )}
      </View>

      {/* Submit Button */}
      <View>
        <TouchableOpacity
          className='bg-primary-300 p-2 rounded-lg m-4 flex-1 flex-row justify-center items-center gap-4'
          onPress={handleSubmit(onSubmit)}
        >
          <MaterialIcons name='real-estate-agent' size={24} color='white' />

          <Text className='text-white font-poppins-regular text-lg text-center'>
            Create Property
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StepTwo;
