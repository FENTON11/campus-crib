import { appwriteConfiguration } from "@/typings";

export const appwriteConfig: appwriteConfiguration = {
  appWriteEndPoint: String(process.env.EXPO_PUBLIC_APPWRITE_END_POINT),
  appWriteProject: String(process.env.EXPO_PUBLIC_APPWRITE_PROJECT),
  appWriteBucket: String(process.env.EXPO_PUBLIC_APPWRITE_BUCKET),
  appWriteDatabase: String(process.env.EXPO_PUBLIC_APPWRITE_DATABASE),
  appWritePropertyCollectionID: String(
    process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID
  ),
  appWriteUsersCollectionID: String(
    process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID
  ),
  appWriteAgentCollectionID: String(
    process.env.EXPO_PUBLIC_APPWRITE_AGENT_COLLECTION_ID
  ),
  appWriteReferencesCollectionID: String(
    process.env.EXPO_PUBLIC_APPWRITE_REFERENCES_COLLECTION_ID
  ),
  appWriteMessegesCollectionID: String(
    process.env.EXPO_PUBLIC_APPWRITE_MESSEGES_COLLECTION_ID
  ),
  appWriteRoomsCollectionID: String(
    process.env.EXPO_PUBLIC_APPWRITE_ROOMS_COLLECTION_ID
  ),
  appWritePlatform: String(
    process.env.EXPO_PUBLIC_APPWRITE_PLATFORM
  ),
};
