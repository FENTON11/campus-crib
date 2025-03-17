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

const signUpSchema = z.object({
  username: z
    .string({ message: "Username is required" })
    .min(3, "Username must be at least 3 characters long"),
  email: z
    .string({ message: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ message: "Password is required" })
    .min(8, "Password must be at least 8 characters long"),
});

const ValidationRules = ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  const usernameValid =
    username === "" ? null : z.string().min(3).safeParse(username).success;
  const emailValid =
    email === "" ? null : z.string().email().safeParse(email).success;
  const passwordValid =
    password === "" ? null : z.string().min(6).safeParse(password).success;

  return (
    <View className='mt-4'>
      <View className='flex-row items-center justify-center'>
        <Ionicons
          name={
            usernameValid === null
              ? "information-circle-outline"
              : usernameValid
              ? "checkmark-circle"
              : "close-circle"
          }
          size={20}
          color={
            usernameValid === null ? "gray" : usernameValid ? "green" : "red"
          }
        />
        <Text
          style={{
            color:
              usernameValid === null ? "gray" : usernameValid ? "green" : "red",
            marginLeft: 8,
          }}
        >
          Username must be at least 3 characters long
        </Text>
      </View>
      <View className='flex-row items-center justify-center mt-2'>
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

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameValid, setUsernameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const { user, updateUser } = useAppContext();
  const router = useRouter();

  const handleSignUp = async () => {
    const result = signUpSchema.safeParse({ username, email, password });
    console.log("Trying to validate:", result);

    if (!result.success) {
      const usernameError = result.error.errors.find(
        (e) => e.path[0] === "username"
      );
      const emailError = result.error.errors.find((e) => e.path[0] === "email");
      const passwordError = result.error.errors.find(
        (e) => e.path[0] === "password"
      );
      setUsernameError(usernameError ? usernameError.message : "");
      setEmailError(emailError ? emailError.message : "");
      setPasswordError(passwordError ? passwordError.message : "");
      setUsernameValid(!usernameError);
      setEmailValid(!emailError);
      setPasswordValid(!passwordError);
      return;
    }
    try {
      setLoading(true);
      console.log("Signing up...");

      const { username, email, password } = result.data;

      if (!email || !password || !username) {
        return Platform.OS === "web"
          ? alert("Provide all required fields")
          : Alert.alert("Error", "Provide all required fields");
      }
      console.log({ username, email, password });

      const res = await authService.createAccountWithCredentials({
        username,
        email,
        password,
      });
      if (!res) return;
      router.push("/(auth)/sign-in");
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

  const handleUsernameChange = (text: string) => {
    setUsername(text);
    const isValid = z.string().min(3).safeParse(text).success;
    setUsernameValid(isValid);
    if (isValid) setUsernameError("");
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

  const handleUsernameBlur = () => {
    const isValid = z.string().min(3).safeParse(username).success;
    setUsernameValid(isValid);
    if (!isValid)
      setUsernameError("Username must be at least 3 characters long");
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
              Sign up to campus crib
            </Text>
          </View>
          <View className='p-4'>
            {usernameError ? (
              <Text className='text-red-500 mb-3'>{usernameError}</Text>
            ) : null}
            <TextInput
              className={`border placeholder:text-white ${
                usernameValid ? "border-white" : "border-red-500"
              } text-white mb-3 px-2 rounded-2xl outline-none`}
              placeholder='Username'
              value={username}
              onChangeText={handleUsernameChange}
              onBlur={handleUsernameBlur}
              autoCapitalize='none'
              selectionColor='white'
              cursorColor='white' // Set cursor color to white
            />
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
              onPress={handleSignUp}
            >
              <Text className='text-primary-300 text-center font-poppins-regular'>
                {loading ? <ActivityIndicator /> : "Sign Up"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/sign-in")}>
              <Text className='text-center text-white'>
                Already have an account? Sign In
              </Text>
            </TouchableOpacity>
            <ValidationRules
              username={username}
              email={email}
              password={password}
            />
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

export default SignUp;
