import React from "react";
import {
  View,
  ScrollView,
  Text,
  Button,
  TextInput,
  Switch,
} from "react-native";
import { Controller, Control } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
// import DateTimePicker from "@react-native-community/datetimepicker";
import { steps } from "@/constants/data";
import { Field } from "@/typings";

interface RenderStepProps {
  control: Control<any>;
  stepIndex: number; // Add stepIndex to determine which step to render
}

const RenderStep: React.FC<RenderStepProps> = ({ control, stepIndex }) => {
  const stepFields = steps[stepIndex].fields;

  const renderField = (
    field: Field,
    onChange: any,
    onBlur: any,
    value: any,
    error?: any
  ) => {
    switch (field.component) {
      case "input":
        return (
          <TextInput
            placeholder={
              field.name.charAt(0).toUpperCase() + field.name.slice(1)
            }
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            className='p-2 border rounded-lg bg-white'
          />
        );
      case "select":
        return (
          <Picker
            selectedValue={value}
            onValueChange={onChange}
            onBlur={onBlur}
          >
            {field.options?.map((option, index) => (
              <Picker.Item key={index} label={option} value={option} />
            ))}
          </Picker>
        );
      case "checkbox":
        return <Switch value={value} onValueChange={onChange} />;
      case "checkboxGroup":
        return (
          <View className='flex flex-row justify-around mt-2'>
            {field.options?.map((option, index) => (
              <Button
                key={index}
                title={option}
                onPress={() => onChange([option])}
              />
            ))}
          </View>
        );
      // case "datePicker":
      //   return (
      //     <DateTimePicker
      //       value={value || new Date()}
      //       mode='date'
      //       display='default'
      //       onChange={(event, date) => onChange(date)}
      //     />
      //   );
      case "fileUpload":
        return (
          <Button
            title='Upload File'
            onPress={() => {
              /* Handle file upload */
            }}
          />
        );
      case "inputGroup":
        return (
          <View>
            {field.options?.map((option, index) => (
              <TextInput
                key={index}
                placeholder={`${field.name} ${index + 1}`}
                onBlur={onBlur}
                onChangeText={(text) => onChange([...(value || []), text])}
                value={value ? value[index] : ""}
                className='p-2 border rounded-lg bg-white'
              />
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {stepFields.map((field) => (
        <Controller
          key={field.name}
          control={control}
          name={field.name}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <View className='mb-4' key={field.name}>
              {renderField(field, onChange, onBlur, value, error)}
              {error && <Text className='text-red-500'>{error.message}</Text>}
            </View>
          )}
        />
      ))}
    </ScrollView>
  );
};

export default RenderStep;
