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
  Octicons,
} from "@expo/vector-icons";
import TabBar from "@/components/tabBar/TabBar";

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
      // tabBar={(props) => <TabBar {...props} key={props.state.index} />}
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
          marginHorizontal: 40,
          borderRadius: 30,
          marginVertical: 15,
          display: "flex",
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
            <MaterialCommunityIcons
              name='home-analytics'
              size={focused ? 25 : 23}
              color={focused ? "#0061FF" : "#52555A"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='create'
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name='pluscircleo'
              size={focused ? 25 : 23}
              color={focused ? "#0061FF" : "#52555A"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name='properties'
        options={{
          tabBarIcon: ({ focused }) => (
            <Octicons
              name='home'
              size={focused ? 25 : 23}
              color={focused ? "#0061FF" : "#52555A"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default AgentsTabLayout;
