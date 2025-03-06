import { View, Text, TouchableOpacity, SectionList } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Preference = {
  label: string;
  option: string[];
};

type UserPreferences = {
  [key: string]: string[];
};

const Preferences = () => {
  const router = useRouter();
  const preferences: Preference[] = [
    {
      label: "Social Level",
      option: ["Introvert", "Ambivert", "Extrovert"],
    },
    {
      label: "Smoking & Drinking Habits",
      option: [
        "Smoker",
        "Non-smoker",
        "Social drinker",
        "Non-drinker",
        "Both",
        "Occasionally",
      ],
    },
    {
      label: "Gender Preference",
      option: ["Male", "Female", "Others", "Any"],
    },
  ];

  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    "Social Level": [],
    "Smoking & Drinking Habits": [],
    "Gender Preference": [],
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const toggleSelection = (section: string, option: string) => {
    setUserPreferences((prevPreferences) => {
      const updatedPreferences = {
        ...prevPreferences,
        [section]: prevPreferences[section].includes(option)
          ? prevPreferences[section].filter((item) => item !== option)
          : [...prevPreferences[section], option],
      };

      // Check if at least one option is selected in each section
      const isValid = preferences.every(
        (pref) => updatedPreferences[pref.label].length > 0
      );
      setIsButtonDisabled(!isValid);

      return updatedPreferences;
    });
  };

  return (
    <View className='p-4 flex-1'>
      <View className='flex-row items-center gap-4'>
        <TouchableOpacity activeOpacity={0.2} onPress={() => router.back()}>
          <MaterialIcons name='arrow-back-ios' size={24} color='black' />
        </TouchableOpacity>
        <Text className='font-rubik-semibold text-3xl text-primary-300 capitalize py-2'>
          Lifestyle & Personality
        </Text>
      </View>
      <SectionList
        sections={preferences.map((pref) => ({
          title: pref.label,
          data: pref.option,
        }))}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, section }) => (
          <View className='flex-row flex-wrap gap-2'>
            <TouchableOpacity
              onPress={() => toggleSelection(section.title, item)}
              className={`p-2 border rounded-xl inline ${
                userPreferences[section.title].includes(item)
                  ? "border-primary-300"
                  : "border-blue-200"
              }`}
            >
              <Text className='text-lg font-rubik-medium text-black-200 lowercase'>
                {item}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View className='p-2'>
            <Text className='font-rubik-medium text-black-200 text-lg'>
              {title}
            </Text>
          </View>
        )}
      />
      <TouchableOpacity
        activeOpacity={0.2}
        onPress={() => router.push("/(onboarding)/acadamic")}
        className={`p-4 mt-11 rounded-3xl ${
          isButtonDisabled ? "bg-gray-400" : "bg-primary-300/80"
        }`}
        disabled={isButtonDisabled}
      >
        <Text className='font-rubik-medium text-xl text-center text-white'>
          Continue 3/5
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Preferences;
