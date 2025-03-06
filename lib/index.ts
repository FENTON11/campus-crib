import { Property, User } from "@/typings";
import { Models } from "react-native-appwrite";
import * as SecureStore from "expo-secure-store";

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
export const userFormatter = (doc: Models.Document): User => {
  return {
    name: doc?.name,
    username: doc?.username,
    email: doc?.email,
    avatar: doc?.avatar,
    account_id: doc?.accountId,
    phone: doc?.phone,
    role: doc?.role,
    favorites: doc?.favorites,
    $id: doc?.$id,
    $collectionId: doc?.$collectionId,
    $databaseId: doc?.$databaseId,
    $createdAt: doc?.$createdAt,
    $updatedAt: doc?.$updatedAt,
    $permissions: doc?.$permissions,
  };
};
export const propertyormatter = (doc: Models.Document): Property => {
  return {
    name: doc?.name,
    image: doc?.image,
    agent: doc?.agent,
    gallery: doc?.gallery,
    location: doc?.location,
    type: doc?.type,
    beds: doc?.beds,
    bathroom: doc?.bathroom,
    area: doc?.area,
    price: doc?.price,
    rating: doc?.rating,
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
