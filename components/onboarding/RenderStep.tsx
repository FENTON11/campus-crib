import React from "react";
import { View, ScrollView, Text, Button, TextInput } from "react-native";
import { Controller, Control } from "react-hook-form";

interface RenderStepProps {
  control: Control<any>;
  stepFields: string[];
}

const RenderStep: React.FC<RenderStepProps> = ({ control, stepFields }) => {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {stepFields.map((field) => (
        <Controller
          key={field}
          control={control}
          name={field}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <View className='mb-4' key={field}>
              <TextInput
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className='p-2 border rounded-lg bg-white'
              />
              {error && <Text className='text-red-500'>{error.message}</Text>}
              {field === "gender" && (
                <View className='flex flex-row justify-around mt-2'>
                  <Button title='Male' onPress={() => onChange("male")} />
                  <Button title='Female' onPress={() => onChange("female")} />
                  <Button title='Other' onPress={() => onChange("other")} />
                </View>
              )}
              {field === "roomType" && (
                <View className='flex flex-row justify-around mt-2'>
                  <Button
                    title='Single Room'
                    onPress={() => onChange("single")}
                  />
                  <Button
                    title='Shared Room'
                    onPress={() => onChange("shared")}
                  />
                  <Button
                    title='Apartment'
                    onPress={() => onChange("apartment")}
                  />
                </View>
              )}
              {field === "roommateGender" && (
                <View className='flex flex-row justify-around mt-2'>
                  <Button title='Male' onPress={() => onChange("male")} />
                  <Button title='Female' onPress={() => onChange("female")} />
                  <Button title='Any' onPress={() => onChange("any")} />
                </View>
              )}
              {field === "smoking" && (
                <View className='flex flex-row justify-around mt-2'>
                  <Button
                    title='Non-Smoker'
                    onPress={() => onChange("non-smoker")}
                  />
                  <Button title='Smoker' onPress={() => onChange("smoker")} />
                  <Button title='Any' onPress={() => onChange("any")} />
                </View>
              )}
              {field === "pets" && (
                <View className='flex flex-row justify-around mt-2'>
                  <Button title='No Pets' onPress={() => onChange("no-pets")} />
                  <Button
                    title='Pets Allowed'
                    onPress={() => onChange("pets-allowed")}
                  />
                  <Button title='Any' onPress={() => onChange("any")} />
                </View>
              )}
              {field === "notificationPreferences" && (
                <View className='flex flex-row justify-around mt-2'>
                  <Button title='Email' onPress={() => onChange("email")} />
                  <Button title='SMS' onPress={() => onChange("sms")} />
                  <Button
                    title='Push Notifications'
                    onPress={() => onChange("push")}
                  />
                </View>
              )}
              {field === "consent" && (
                <View className='flex flex-row items-center mt-2'>
                  <Text>
                    I consent to share my information with potential roommates.
                  </Text>
                  <Button title='Consent' onPress={() => onChange(!value)} />
                </View>
              )}
            </View>
          )}
        />
      ))}
    </ScrollView>
  );
};

export default RenderStep;
