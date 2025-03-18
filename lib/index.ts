import { IChatRoom, IMessege, Property, User } from "@/typings";
import { Models } from "react-native-appwrite";
import * as SecureStore from "expo-secure-store";

import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

export const greetingUser = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  return greeting;
};

export const saveItemToSecureStore = async <T>(
  key: string,
  data: T
): Promise<void> => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(data));
  } catch (error) {
    console.error(
      `Error saving data to Secure Store with key "${key}":`,
      error
    );
  }
};
export const getItemFromSecureStore = async (key: string) => {
  try {
    const userString = await SecureStore.getItemAsync(key);
    return userString ? JSON.parse(userString) : null;
  } catch (error) {
    console.error("Error getting item from Secure Store:", error);
    return null;
  }
};
export const deleteItemFromSecureStore = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log(`Item with key "${key}" deleted successfully.`);
  } catch (error) {
    console.error("Error deleting item from Secure Store:", error);
  }
};
export const userFormatter = (doc: Models.Document): User => {
  return {
    name: doc?.name,
    username: doc?.username,
    email: doc?.email,
    avatar: doc?.avatar,
    account_id: doc?.accountId,
    phone: doc?.phone,
    role: doc?.role,
    level: doc?.level,
    favorites: doc?.favorites,
    $id: doc?.$id,
    preferences: doc?.preferences,
    $collectionId: doc?.$collectionId,
    $databaseId: doc?.$databaseId,
    $createdAt: doc?.$createdAt,
    $updatedAt: doc?.$updatedAt,
    $permissions: doc?.$permissions,
  };
};
export const usersFormatter = (docs: Models.Document[]): User[] => {
  return docs.map((doc) => ({
    name: doc?.name,
    username: doc?.username,
    email: doc?.email,
    avatar: doc?.avatar,
    account_id: doc?.accountId,
    phone: doc?.phone,
    role: doc?.role,
    level: doc?.level,
    favorites: doc?.favorites,
    $id: doc?.$id,
    preferences: doc?.preferences,
    $collectionId: doc?.$collectionId,
    $databaseId: doc?.$databaseId,
    $createdAt: doc?.$createdAt,
    $updatedAt: doc?.$updatedAt,
    $permissions: doc?.$permissions,
  }));
};
export const chatRoomsFormatter = (docs: Models.Document[]): IChatRoom[] => {
  return docs.map((doc) => ({
    last_Message: doc.last_Message,
    members: doc?.members,
    $id: doc?.$id,
    $collectionId: doc?.$collectionId,
    $databaseId: doc?.$databaseId,
    $createdAt: doc?.$createdAt,
    $updatedAt: doc?.$updatedAt,
    $permissions: doc?.$permissions,
  }));
};
export const messagesFormatter = (docs: Models.Document[]): IMessege[] => {
  return docs.map((doc) => ({
    text: doc?.text,
    sender: doc?.sender,
    receiver: doc?.receiver,
    status: doc?.status,
    room: doc?.room,
    pushNotification: doc?.pushNotification,
    $id: doc?.$id,
    $collectionId: doc?.$collectionId,
    $databaseId: doc?.$databaseId,
    $createdAt: doc?.$createdAt,
    $updatedAt: doc?.$updatedAt,
    $permissions: doc?.$permissions,
  }));
};
export const singleMessageFormatter = (doc: Models.Document): IMessege => {
  return {
    text: doc?.text,
    sender: doc?.sender,
    receiver: doc?.receiver,
    status: doc?.status,
    room: doc?.room,
    pushNotification: doc?.pushNotification,
    $id: doc?.$id,
    $collectionId: doc?.$collectionId,
    $databaseId: doc?.$databaseId,
    $createdAt: doc?.$createdAt,
    $updatedAt: doc?.$updatedAt,
    $permissions: doc?.$permissions,
  };
};
export const propertyFormatter = (doc: Models.Document): Property => {
  return {
    name: doc?.name,
    image: doc?.image,
    agent: doc?.agent,
    gallery: doc?.gallery,
    location: doc?.location,
    type: doc?.type,
    beds: doc?.beds,
    bathrooms: doc?.bathrooms,
    area: doc?.area,
    price: doc?.price,
    featured: doc?.featured,
    address: doc?.address,
    description: doc?.description,
    $id: doc?.$id,
    $collectionId: doc?.$collectionId,
    $databaseId: doc?.$databaseId,
    $createdAt: doc?.$createdAt,
    $updatedAt: doc?.$updatedAt,
    $permissions: doc?.$permissions,
  };
};
export const propertiesFormatter = (docs: Models.Document[]): Property[] => {
  return docs.map((doc) => ({
    name: doc?.name,
    image: doc?.image,
    agent: doc?.agent,
    gallery: doc?.gallery,
    location: doc?.location,
    type: doc?.type,
    beds: doc?.beds,
    bathrooms: doc?.bathrooms,
    area: doc?.area,
    price: doc?.price,
    featured: doc?.featured,
    address: doc?.address,
    description: doc?.description,
    $id: doc?.$id,
    $collectionId: doc?.$collectionId,
    $databaseId: doc?.$databaseId,
    $createdAt: doc?.$createdAt,
    $updatedAt: doc?.$updatedAt,
    $permissions: doc?.$permissions,
  }));
};
