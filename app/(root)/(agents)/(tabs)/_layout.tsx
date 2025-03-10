import { Tabs } from "expo-router";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AntDesign,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import TabBar from "@/components/tabBar/TabBar";
const AgentsTabLayout = () => {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} key={props.state.index} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          minHeight: 70,
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
