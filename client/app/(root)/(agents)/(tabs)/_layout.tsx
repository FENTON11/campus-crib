import { Tabs } from "expo-router";
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
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
  <View className='flex-1 flex gap-1 flex-col items-center '>
    <Image
      source={icon}
      tintColor={focused ? "#0061FF" : "#666876"}
      resizeMode='contain'
      className={`${focused ? "size-6" : "size-6"} `}
    />
    <Text
      className={` ${
        focused
          ? "text-primary-300 font-rubik-medium"
          : "text-black-200 font-rubik"
      } text-xs w-full text-center `}
    >
      {title}
    </Text>
  </View>
);

interface TabButtonProps extends TouchableOpacityProps {
  focused: boolean;
  children: React.ReactNode;
}
const TabButton: React.FC<TabButtonProps> = ({
  focused,
  children,
  ...props
}) => (
  <TouchableOpacity
    {...props}
    style={[
      {
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: focused ? "white" : "gray",
        elevation: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      props.style as StyleProp<ViewStyle>,
    ]}
  >
    {children}
  </TouchableOpacity>
);
const AgentsTabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          borderRadius: 30,
          paddingHorizontal: 15,
          paddingVertical: 5,
          // backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // position: "absolute",
          // minHeight: 70,
        },
        tabBarStyle: {
          marginHorizontal: 35,
          borderRadius: 30,
          marginVertical: 15,
          display: "flex",
          padding: 10,
          alignItems: "center",
          backgroundColor: "white",

          // position: "absolute",
          // minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name='overview'
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.dashboard}
              title='Dashboard'
            />
          ),
        }}
      />
      <Tabs.Screen
        name='create'
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.add} title='Create' />
          ),
        }}
      />

      <Tabs.Screen
        name='properties'
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.home}
              title='my Properties'
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default AgentsTabLayout;
