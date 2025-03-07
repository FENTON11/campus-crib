import {
  Client,
  Account,
  Databases,
  Avatars,
  OAuthProvider,
  Query,
  ID,
} from "react-native-appwrite";
import { appwriteConfig } from "./appwriteConfig";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import { User } from "@/typings";
import { userFormatter } from "@/lib";
class AuthService {
  private client = new Client();
  private account;
  private database;
  private avatars;
  constructor() {
    this.client
      .setEndpoint(appwriteConfig.appWriteEndPoint)
      .setProject(appwriteConfig.appWriteProject)
      .setPlatform(appwriteConfig.appWritePlatform);
    this.account = new Account(this.client);
    this.database = new Databases(this.client);
    this.avatars = new Avatars(this.client);
  }
  async checkUser (id:string){
    try {
      return await this.database.getDocument(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteUsersCollectionID,
        id
      );
    } catch (error) {
      return false
    }
  }
  async login(provider: OAuthProvider) {
    try {
      const redirectUri = Linking.createURL("/(auth)/auth");
      const response = this.account.createOAuth2Token(provider, redirectUri);
      if (!response) throw new Error("Failed to login");
      const browserResult = await openAuthSessionAsync(
        response.toString(),
        redirectUri
      );
      console.log("loggin in");

      if (browserResult.type !== "success")
        throw new Error("Create OAuth2 token failed");
      const url = new URL(browserResult.url);
      const secret = url.searchParams.get("secret")?.toString();
      const userId = url.searchParams.get("userId")?.toString();
      if (!secret || !userId) throw new Error("Create OAuth2 token failed");
      const session = await this.account.createSession(userId, secret);

      if (!session) throw new Error("Failed to create session");
      console.log("new session", session);

      const user = await this.account.get();
      console.log('user test test',user);
      
      if (!user) throw new Error("Failed to get user");
      const savedUser = await this.checkUser(user.$id)
      if (savedUser) {
    
        return userFormatter(savedUser);
      } else {
        const newUser:User = {
          name:user.name,
          email:user.email,
          account_id:user.$id,
          avatar:this.avatars.getInitials(user.name)

        }
        const res = await this.database.createDocument(appwriteConfig.appWriteDatabase,appwriteConfig.appWriteUsersCollectionID,ID.unique(),newUser)
        return userFormatter(res)
      }
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message || 'Failed to login in')
    }
  }

  async logout() {
    try {
      await this.account.deleteSession("current");
      return true;
    } catch (error) {
      // console.error(error);
      return false;
    }
  }
  async getUser() {
    try {
      return await this.account.get();
    } catch (error) {
      // console.error(error);
      return null;
    }
  }
}

export const authService: AuthService = new AuthService();
