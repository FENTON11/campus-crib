import {
  Client,
  Databases,
  ID,
  ImageGravity,
  Query,
  Storage,
} from "react-native-appwrite";
import { appwriteConfig } from "./appwriteConfig";
import {
  chatRoomsFormatter,
  messagesFormatter,
  propertiesFormatter,
  propertyFormatter,
  singleMessageFormatter,
  userFormatter,
  usersFormatter,
  bookingsFormatter
} from "@/lib";
import { authService } from "./authService";
import { NewMessage } from "@/typings";
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

  async getFeaturedProperties() {
    try {
      const res = await this.database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWritePropertyCollectionID,
        [Query.equal("featured", true)]
      );
      return propertiesFormatter(res.documents);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get featured properties");
    }
  }
  async getProperties() {
    try {
      const res = await this.database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWritePropertyCollectionID
      );
      return propertiesFormatter(res.documents);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get properties");
    }
  }
  async getAgentProperties(agentID: string) {
    try {
      const res = await this.database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWritePropertyCollectionID,
        [Query.equal("agent", agentID)]
      );
      return propertiesFormatter(res.documents);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get properties");
    }
  }
  async getRoommates() {
    try {
      const user = await authService.getUser();
      if (!user) throw new Error("you need to be logged in ");
      const res = await this.database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteUsersCollectionID,
        [Query.notEqual("$id", user.$id)]
      );
      return usersFormatter(res.documents);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get properties");
    }
  }
  async search(searchTerm?: string) {
    try {
      if (searchTerm) {
        const res = await this.database.listDocuments(
          appwriteConfig.appWriteDatabase,
          appwriteConfig.appWritePropertyCollectionID,
          [
            Query.or([
              Query.search("name", searchTerm),
              Query.search("address", searchTerm),
              Query.search("type", searchTerm),
            ]),
          ]
        );
        return propertiesFormatter(res.documents);
      } else {
        return this.getProperties();
      }
    } catch (error) {
      console.error(error);
      throw new Error("Failed to search");
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
  async sendMessage(messege: NewMessage) {
    try {
      let newMessege = await this.database.createDocument(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteMessegesCollectionID,
        ID.unique(),
        messege
      );
      return singleMessageFormatter(newMessege);
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }
  async getRoomMesseges(roomID: string) {
    try {
      let messeges = await this.database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteMessegesCollectionID,
        [Query.equal("room", roomID)]
      );
      return messagesFormatter(messeges.documents);
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }
  async getUserRooms(userID: string) {
    try {
      let rooms = await this.database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteRoomsCollectionID,
        [Query.contains("members", userID)]
      );
      return chatRoomsFormatter(rooms.documents);
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }
  async getUserById(userID: string) {
    try {
      let res = await this.database.getDocument(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteUsersCollectionID,
        userID
      );
      return userFormatter(res);
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }
  async becomeAnAgent({
    userID,
    agentType,
  }: {
    userID: string;
    agentType: string;
  }) {
    try {
      const user = await this.database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteAgentCollectionID,
        [Query.equal("user", userID)]
      );
      if (user.total > 0) throw new Error("you are already an agent🙌🙌");
      await this.database.createDocument(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteAgentCollectionID,
        ID.unique(),
        { type: agentType, user: userID }
      );
      const res = await this.database.updateDocument(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteUsersCollectionID,
        userID,
        { isAgent: true }
      );
      return userFormatter(res);
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }
  async createRoom(members: string[]) {
    try {
      console.log(members);
      
      let room = await this.database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteRoomsCollectionID,
        [
          Query.contains("members", members[0]),
          Query.contains("members", members[1]),
        ]
      );
      if (room.total === 0) {
        const newRoom = await this.database.createDocument(
          appwriteConfig.appWriteDatabase,
          appwriteConfig.appWriteRoomsCollectionID,
          ID.unique(),
          { members }
        );
        console.log("created a new room");
        return { created: true, room: newRoom };
      } else {
        console.log("room alreday exists");
        return { created: false, room: room.documents[0] };
      }
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }
  async getProperty({ id }: { id: string }) {
    try {
      const res = await this.database.getDocument(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWritePropertyCollectionID,
        id
      );
      return propertyFormatter(res);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get property");
    }
  }
  async bookVisit(userId: string, propertyId: string,visitDate:Date) {
    try {
      const res = await this.database.createDocument(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appwriteBookingsCollectionID,
        ID.unique(),
        {
         user: userId,
         property: propertyId,
          visitDate: visitDate.toISOString(),
        }
      );
      return res;
    } catch (error) {
      const err =error as Error;
      throw new Error(err?.message ||"Failed to book a visit.");
    }

  }
  async getUserBookings(userId: string) {
    try {
      const res = await this.database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appwriteBookingsCollectionID,
        [Query.equal("user", userId)]
      );
      return bookingsFormatter(res.documents);
    } catch (error) {
      const err =error as Error;
      throw new Error(err?.message ||"Failed to fetch bookings");
    }
  }
  async cancelBooking(bookingId: string) {
    try {
      await this.database.deleteDocument(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appwriteBookingsCollectionID,
        bookingId
      );
    } catch (error) {
      const err =error as Error;
      throw new Error(err?.message ||"Failed to cancel booking");
    }
  }
}

export const appwriteService = new AppWriteService();
