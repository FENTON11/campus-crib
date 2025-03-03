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
      <TouchableOpacity
        {...props}
        className=' p-2 px-3 bg-primary-300  rounded-lg m-2'
        activeOpacity={0.5}
      >
        <Text className=' text-white font-rubik-medium text-lg'> {text} </Text>
      </TouchableOpacity>
    );
  };
  const renderDots = (props: { isActive: boolean }) => {
    const { isActive } = props;
    return (
      <View
        className={`${
          isActive ? "bg-white" : "bg-black-100"
        } p-[4px] mx-1 rounded-full`}
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
            <View>
              <Text>helloe</Text>
            </View>
          ),
          title: "Find Your Perfect Home",
          subtitle:
            "Easily search and find the perfect house to rent with our app.",
        },
        {
          backgroundColor: "#9333ea",
          image: (
            <View>
              <Text>welcome</Text>
            </View>
          ),
          title: "Connect with Roommates",
          subtitle:
            "Find compatible roommates and share the perfect living space.",
        },
        {
          backgroundColor: "#0061FF",
          image: (
            <View>
              <Text>here</Text>
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
      // doneLabel='Done'
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
});

export default OnboardingScreen;
