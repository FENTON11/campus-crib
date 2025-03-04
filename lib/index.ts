import { Property, User } from "@/typings";
import { Models } from "react-native-appwrite";

export const userFormatter = (doc: Models.Document): User => {
  return {
    name: doc?.name,
    username: doc?.username,
    email: doc?.email,
    avatar: doc?.avatar,
    accountId: doc?.accountId,
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
    price: doc?.price,
    rating: doc?.rating,
    description: doc?.description,
    $id: doc?.$id,
    $collectionId: doc?.$collectionId,
    $databaseId: doc?.$databaseId,
    $createdAt: doc?.$createdAt,
    $updatedAt: doc?.$updatedAt,
    $permissions: doc?.$permissions,
  };
};
