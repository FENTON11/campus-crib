import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";
import { useAppContext } from "@/context/AppContext";

const OnboardingScreen = () => {
  const router = useRouter();
  const { user } = useAppContext();

  const handleSkip = () => {
    if (user) {
      router.push("/(root)/(tabs)/home");
      return;
    }
    router.push("/(auth)/auth");
  };

  const handleDone = () => {
    if (user) {
      router.push("/(root)/(tabs)/home");
      return;
    }
    router.push("/(auth)/auth");
  };

  interface ControlProps {
    onPress?: () => void;
    disabled?: boolean;
  }

  const renderControl = (props: ControlProps, text: string) => {
    return (
      <TouchableOpacity {...props} style={styles.button} activeOpacity={0.5}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const renderDots = (props: { isActive: boolean }) => {
    const { isActive } = props;
    return (
      <View
        style={[styles.dot, { backgroundColor: isActive ? "#FFF" : "#000" }]}
      />
    );
  };

  return (
    <Onboarding
      onSkip={handleSkip}
      onDone={handleDone}
      bottomBarHeight={60}
      SkipButtonComponent={({ ...props }) => renderControl(props, "Skip")}
      NextButtonComponent={({ ...props }) => renderControl(props, "Next")}
      DoneButtonComponent={({ ...props }) => renderControl(props, "Done")}
      // DotComponent={renderDots}
      bottomBarHighlight={false}
      pages={[
        {
          backgroundColor: "#FFF",
          image: (
            <View style={styles.lottie}>
              <LottieView
                source={require("@/assets/lottie/find.json")}
                autoPlay
                loop
              />
            </View>
          ),
          title: "Find Your Perfect Home",
          subtitle:
            "Easily search and find the perfect house to rent with our app.",
        },
        {
          backgroundColor: "#9333ea",
          image: (
            <View style={styles.lottie}>
              <LottieView
                source={require("@/assets/lottie/connection.json")}
                autoPlay
                loop
              />
            </View>
          ),
          title: "Connect with Roommates",
          subtitle:
            "Find compatible roommates and share the perfect living space.",
        },
        {
          backgroundColor: "#0061FF",
          image: (
            <View style={styles.lottie}>
              <LottieView
                source={require("@/assets/lottie/house.json")}
                autoPlay
                loop
              />
            </View>
          ),
          title: "Safe and Secure",
          subtitle:
            "Ensure a safe and secure living environment with our verified listings.",
        },
      ]}
      controlStatusBar={false}
      nextLabel='Next'
      skipLabel='Skip'
      containerStyles={{ paddingHorizontal: 20 }}
      titleStyles={{ fontSize: 24, color: "#000" }}
      subTitleStyles={{ fontSize: 16, color: "#666" }}
    />
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: 300,
    height: 300,
  },
  button: {
    padding: 10,
    paddingHorizontal: 12,
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    margin: 8,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default OnboardingScreen;
