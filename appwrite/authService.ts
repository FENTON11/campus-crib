import {
  Client,
  Account,
  Databases,
  Avatars,
  OAuthProvider,
  Query,
} from "react-native-appwrite";
import { appwriteConfig } from "./appwriteConfig";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
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
  async login(provider: OAuthProvider) {
    try {
      const redirectUri = Linking.createURL("/");
      const response = this.account.createOAuth2Token(provider, redirectUri);

      if (!response) throw new Error("Failed to login");
      const browserResult = await openAuthSessionAsync(
        response.toString(),
        redirectUri
      );
      if (browserResult.type !== "success")
        throw new Error("Create OAuth2 token failed");

      const url = new URL(browserResult.url);
      const secret = url.searchParams.get("secret")?.toString();
      const userId = url.searchParams.get("userId")?.toString();
      if (!secret || !userId) throw new Error("Create OAuth2 token failed");

      const session = await this.account.createSession(userId, secret);
      console.log('session',session);
      
      if (!session) throw new Error("Failed to create session");
      return session;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  async logout() {
    try {
      await this.account.deleteSession('current');
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
  async getFeaturedProperties(){
    try {
      

      
    } catch (error) {
      console.error(error)
    }
  }
  async getProperties({filter,query, limit} :{
    filter: string;
    query: string;
    limit?: number;
  }){
    try {
     
      
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export const authService: AuthService = new AuthService();
