import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Animated } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";

const Notification = () => {
  interface Notification {
    id: string;
    type: string;
    message: string;
    time: string;
    read: boolean;
  }

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = [
        {
          id: "1",
          type: "message",
          message: "You have a new message from John Doe.",
          time: "2 mins ago",
          read: false,
        },
        {
          id: "2",
          type: "house",
          message: "A new house listing matches your preferences!",
          time: "1 hour ago",
          read: true,
        },
        {
          id: "3",
          type: "roommate",
          message: "Alex sent you a roommate request.",
          time: "3 hours ago",
          read: false,
        },
      ];
      setNotifications(data);
      playNotificationSound();
    };

    fetchNotifications();
  }, []);

  async function playNotificationSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/notifications/mixkit-software-interface-back-2575.wav") 
    );
    setSound(sound);
    await sound.playAsync();
  }

  const renderIcon = (type: string) => {
    switch (type) {
      case "message":
        return <FontAwesome5 name="comment-alt" size={24} color="#4CAF50" />;
      case "house":
        return <FontAwesome5 name="home" size={24} color="#FF9800" />;
      case "roommate":
        return <FontAwesome5 name="user-friends" size={24} color="#3F51B5" />;
      default:
        return <FontAwesome5 name="bell" size={24} color="#9E9E9E" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const renderRightActions = (progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>, id: string) => {
    const opacity = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <Animated.View style={{ flexDirection: "row", opacity }}>
        <TouchableOpacity
          onPress={() => deleteNotification(id)}
          className="bg-red-500 justify-center px-5 rounded-r-lg"
        >
          <FontAwesome5 name="trash" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <GestureHandlerRootView className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-rubik-bold mb-4">Notifications</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Swipeable renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item.id)}>
            <TouchableOpacity
              className={`flex-row items-center p-4 bg-white rounded-lg shadow-md mb-3 ${
                item.read ? "opacity-60" : ""
              }`}
              onPress={() => markAsRead(item.id)}
            >
              <View className="mr-4">{renderIcon(item.type)}</View>
              <View className="flex-1">
                <Text className="text-lg font-rubik-medium">{item.message}</Text>
                <Text className="text-gray-500 text-sm">{item.time}</Text>
              </View>
              {!item.read && <View className="w-3 h-3 bg-red-500 rounded-full" />}
            </TouchableOpacity>
          </Swipeable>
        )}
      />
    </GestureHandlerRootView>
  );
};

export default Notification;
