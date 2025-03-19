import React from "react";
import { View, Text, TextInput } from "react-native";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "@/lib/data";

interface StepTwoProps {
  onSubmit: (data: z.infer<typeof schema>) => void;
  validationErrors: { [key: string]: string };
}

const StepTwo = ({ onSubmit, validationErrors }: StepTwoProps) => {
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
        {validationErrors.price && (
          <Text className='text-red-500 font-poppins-regular text-sm'>
            {validationErrors.price}
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
        {validationErrors.location && (
          <Text className='text-red-500 font-poppins-regular text-sm'>
            {validationErrors.location}
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
          {validationErrors.address && (
            <Text className='text-red-500 font-poppins-regular text-sm'>
              {validationErrors.address}
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
        {validationErrors.description && (
          <Text className='text-red-500 font-poppins-regular text-sm'>
            {validationErrors.description}
          </Text>
        )}
      </View>
    </View>
  );
};

export default StepTwo;
