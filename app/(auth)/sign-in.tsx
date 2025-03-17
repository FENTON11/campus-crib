import React, { useEffect } from "react";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { z } from "zod";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "@/context/AppContext";
import { authService } from "@/appwrite/authService";

const signInSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ message: "Password is required" })
    .min(8, "Password must be at least 8 characters long"),
});

const ValidationRules = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const emailValid =
    email === "" ? null : z.string().email().safeParse(email).success;
  const passwordValid =
    password === "" ? null : z.string().min(6).safeParse(password).success;

  return (
    <View className='mt-4'>
      <View className='flex-row items-center justify-center'>
        <Ionicons
          name={
            emailValid === null
              ? "information-circle-outline"
              : emailValid
              ? "checkmark-circle"
              : "close-circle"
          }
          size={20}
          color={emailValid === null ? "gray" : emailValid ? "green" : "red"}
        />
        <Text
          style={{
            color: emailValid === null ? "gray" : emailValid ? "green" : "red",
            marginLeft: 8,
          }}
        >
          Email must be a valid email address
        </Text>
      </View>
      <View className='flex-row items-center justify-center mt-2'>
        <Ionicons
          name={
            passwordValid === null
              ? "information-circle-outline"
              : passwordValid
              ? "checkmark-circle"
              : "close-circle"
          }
          size={20}
          color={
            passwordValid === null ? "gray" : passwordValid ? "green" : "red"
          }
        />
        <Text
          style={{
            color:
              passwordValid === null ? "gray" : passwordValid ? "green" : "red",
            marginLeft: 8,
          }}
        >
          Password must be at least 6 characters long
        </Text>
      </View>
    </View>
  );
};

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const { user, updateUser } = useAppContext();
  const router = useRouter();

  const handleSignIn = async () => {
    const result = signInSchema.safeParse({ email, password });
    console.log("Trying to validate:", result);

    if (!result.success) {
      const emailError = result.error.errors.find((e) => e.path[0] === "email");
      const passwordError = result.error.errors.find(
        (e) => e.path[0] === "password"
      );
      setEmailError(emailError ? emailError.message : "");
      setPasswordError(passwordError ? passwordError.message : "");
      setEmailValid(!emailError);
      setPasswordValid(!passwordError);
      return;
    }
    try {
      setLoading(true);
      console.log("Logging in...");

      const { email, password } = result.data;

      if (!email || !password) {
        return Platform.OS === "web"
          ? alert("Provide both email and password")
          : Alert.alert("Error", "Provide both email and password");
      }
      console.log({ email, password });

      const res = await authService.loginWithCredentials({
        email,
        password,
      });
      console.log("res:", res);

      if (!res) return;
      updateUser(res);
    } catch (error) {
      const err = error as Error;
      Platform.OS === "web"
        ? alert(err.message || "Something went wrong")
        : Alert.alert("Error", err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    const isValid = z.string().email().safeParse(text).success;
    setEmailValid(isValid);
    if (isValid) setEmailError("");
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    const isValid = z.string().min(6).safeParse(text).success;
    setPasswordValid(isValid);
    if (isValid) setPasswordError("");
  };

  const handleEmailBlur = () => {
    const isValid = z.string().email().safeParse(email).success;
    setEmailValid(isValid);
    if (!isValid) setEmailError("Invalid email address");
  };

  const handlePasswordBlur = () => {
    const isValid = z.string().min(6).safeParse(password).success;
    setPasswordValid(isValid);
    if (!isValid)
      setPasswordError("Password must be at least 6 characters long");
  };

  useEffect(() => {
    if (user) {
      router.push(`/(root)/(tabs)/home`);
    }
  }, [user]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View className='flex-1 justify-center bg-primary-300/90'>
          <View className='p-2 flex-1 px-2 items-center justify-end pb-6 mb-4 bg-white rounded-b-[4rem]'>
            <Image
              className='object-contain p-4 max-w-full max-h-full'
              resizeMode='contain'
              source={require("@/assets/images/logo.png")}
            />
            <Text className='text-4xl text-primary-300 font-rubik-extrabold'>
              CAMPUS CRIB
            </Text>
            <Text className='text-xl font-rubik-medium'>
              Home Hunting Made Easy
            </Text>
            <Text className='text-center p-2 text-lg font-rubik-light'>
              Sign in to campus crib
            </Text>
          </View>
          <View className='p-4'>
            {emailError ? (
              <Text className='text-red-500 mb-3'>{emailError}</Text>
            ) : null}
            <TextInput
              className={`border placeholder:text-white ${
                emailValid ? "border-white" : "border-red-500"
              } text-white mb-3 px-2 rounded-2xl outline-none`}
              placeholder='Email'
              value={email}
              onChangeText={handleEmailChange}
              onBlur={handleEmailBlur}
              keyboardType='email-address'
              autoCapitalize='none'
              selectionColor='white'
              cursorColor='white' // Set cursor color to white
            />
            {passwordError ? (
              <Text className='text-red-500 mb-3'>{passwordError}</Text>
            ) : null}
            <TextInput
              className={`border placeholder:text-white ${
                passwordValid ? "border-white" : "border-red-500"
              } text-white mb-3 px-2 rounded-2xl outline-none`}
              placeholder='Password'
              value={password}
              onChangeText={handlePasswordChange}
              onBlur={handlePasswordBlur}
              secureTextEntry
              selectionColor='white'
              cursorColor='white' // Set cursor color to white
            />
            <TouchableOpacity
              disabled={loading}
              className='bg-white rounded-3xl p-4 disabled:bg-gray-500'
              onPress={handleSignIn}
            >
              <Text className='text-primary-300 text-center font-poppins-regular'>
                {loading ? <ActivityIndicator /> : "Sign In"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/sign-up")}>
              <Text className='text-center text-white'>
                Don't have an account? Sign Up
              </Text>
            </TouchableOpacity>
            <ValidationRules email={email} password={password} />
            <Text className='text-center p-2 text-lg font-rubik-light text-white'>
              &copy; {new Date().getFullYear()}. All rights reserved, Campus
              Crib
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
