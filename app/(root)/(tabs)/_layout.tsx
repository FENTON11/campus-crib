import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, Text, View } from "react-native";

import icons from "@/constants/icons";

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}) => (
  <View className='flex-1 flex flex-col items-center'>
    <Image
      source={icon}
      tintColor={focused ? "#0061FF" : "#666876"}
      resizeMode='contain'
      className={`${focused ? "size-8" : "size-6"} `}
    />
    <Text
      className={`${
        focused
          ? "text-primary-300 font-rubik-medium"
          : "text-black-200 font-rubik"
      } text-xs w-full text-center `}
    >
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          marginHorizontal: 40,
          borderRadius: 30,
          marginVertical: 15,
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          // position: "absolute",
          // minHeight: 70,
        },
        // tabBarStyle: {
        //   backgroundColor: "white",
        //   position: "absolute",
        //   borderTopColor: "#0061FF1A",
        //   borderTopWidth: 1,
        //   // height: 50,
        //   minHeight: 70,
        // },
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title='Home' />
          ),
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} title='Explore' />
          ),
        }}
      />
      <Tabs.Screen
        name='roommate'
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.roommate}
              title='roommate finder'
            />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title='Profile' />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
