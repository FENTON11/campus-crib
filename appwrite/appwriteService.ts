import {
  Client,
  Databases,
  ID,
  ImageGravity,
  Storage,
} from "react-native-appwrite";
import { appwriteConfig } from "./appwriteConfig";
class AppWriteService {
  private client = new Client();
  private database;
  private storage;
  constructor() {
    this.client
      .setEndpoint(appwriteConfig.appWriteEndPoint)
      .setProject(appwriteConfig.appWriteProject)
      .setPlatform(appwriteConfig.appWritePlatform);
    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }
  async seedProperties(data: any) {
    try {
      await this.database.createDocument(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWritePropertyCollectionID,
        ID.unique(),
        data
      );
    } catch (error) {
      console.log("Error seeding data:", error);
    }
  }
  async uploadFile(file: {
    name: string;
    type: string;
    size: number;
    uri: string;
  }) {
    try {
      const uploadedFile = this.storage.createFile(
        appwriteConfig.appWriteBucket,
        ID.unique(),
        {
          name: file.name,
          type: file.type,
          size: file.size,
          uri: file.uri,
        }
      );
      return uploadedFile;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to upload the file: ${error.message}`);
      } else {
        console.log(error);
        throw new Error("Failed to upload the file due to an unknown error");
      }
    }
  }
  async deleteFile(id: string) {
    try {
      console.log("deleting a file");
      return await this.storage.deleteFile(appwriteConfig.appWriteBucket, id);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to delete the file: ${error.message}`);
      } else {
        console.log(error);
        throw new Error("Failed to delete the file due to an unknown error");
      }
    }
  }
  getFilePreview(id: string) {
    try {
      return this.storage.getFilePreview(
        appwriteConfig.appWriteBucket,
        id,
        100,
        100,
        ImageGravity.Center,
        100
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to getFilePreview the file: ${error.message}`);
      } else {
        console.log(error);
        throw new Error(
          "Failed to getFilePreview the file due to an unknown error"
        );
      }
    }
  }
}

export const appwriteService: AppWriteService = new AppWriteService();
