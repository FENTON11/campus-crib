import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";
import { useAppContext } from "@/context/AppContext";
import { getItemFromSecureStore, saveItemToSecureStore } from "@/lib";

const OnboardingScreen: React.FC = () => {
  const router = useRouter();
  const { user } = useAppContext();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
// console.log('user from index',user);

  useEffect(() => {
    const checkOnboardingState = async () => {
      try {
        const onboardingCompleted = await getItemFromSecureStore("onboardingCompleted");
        if (onboardingCompleted) {
          // router.push(user ? user.level < 5 ?"/(root)/(onboarding)/personal-info" : "/(root)/(tabs)/home" : "/(auth)/auth");
          router.push(user ? "/(root)/(tabs)/home" : "/(auth)/auth");
        } else {
          setShowOnboarding(true);
        }
      } catch (error) {
        console.error("Error checking onboarding state:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingState();
  }, []);

  const handleComplete = async () => {
    await saveItemToSecureStore("onboardingCompleted", JSON.stringify(true));
      // router.push(user ? user.level < 5 ?"/(root)/(onboarding)/personal-info" : "/(root)/(tabs)/home" : "/(auth)/auth");
    router.push(user ? "/(root)/(tabs)/home" : "/(auth)/auth");
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (!showOnboarding) return null;

  return (
    <Onboarding
      onSkip={handleComplete}
      onDone={handleComplete}
      bottomBarHeight={60}
      SkipButtonComponent={(props) => <CustomButton {...props} text="Skip" />}
      NextButtonComponent={(props) => <CustomButton {...props} text="Next" />}
      DoneButtonComponent={(props) => <CustomButton {...props} text="Done" />}
      bottomBarHighlight={false}
      pages={[
        {
          backgroundColor: "#FFF",
          image: (
            <View style={styles.lottie}>
              <LottieView source={require("@/assets/lottie/find.json")} autoPlay loop />
            </View>
          ),
          title: "Find Your Perfect Home",
          subtitle: "Easily search and find the perfect house to rent with our app.",
        },
        {
          backgroundColor: "#9333ea",
          image: (
            <View style={styles.lottie}>
              <LottieView source={require("@/assets/lottie/connection.json")} autoPlay loop />
            </View>
          ),
          title: "Connect with Roommates",
          subtitle: "Find compatible roommates and share the perfect living space.",
        },
        {
          backgroundColor: "#0061FF",
          image: (
            <View style={styles.lottie}>
              <LottieView source={require("@/assets/lottie/house.json")} autoPlay loop />
            </View>
          ),
          title: "Safe and Secure",
          subtitle: "Ensure a safe and secure living environment with our verified listings.",
        },
      ]}
      controlStatusBar={false}
      containerStyles={{ paddingHorizontal: 20 }}
      titleStyles={{ fontSize: 24, color: "#000" }}
      subTitleStyles={{ fontSize: 16, color: "#666" }}
    />
  );
};

interface CustomButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  text: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, disabled, text }) => (
  <TouchableOpacity onPress={onPress} disabled={disabled} style={styles.button} activeOpacity={0.5}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OnboardingScreen;
