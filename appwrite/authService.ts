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
import * as WebBrowser from "expo-web-browser";
import { User } from "@/typings";
import { deleteItemFromSecureStore, userFormatter } from "@/lib";
import { Models } from "appwrite";
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
  checkUser = async (accountID: string) => {
    try {
      const res =  await this.database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteUsersCollectionID,
        [Query.equal('account_id',accountID)]
      )
      if(res.total > 0){

        return  userFormatter(res.documents[0])
      }
      return null
    } catch (error) {
      return false;
    }
  };

  async login(provider: OAuthProvider) {
    try {
      const oldSession = await this.getSession();
      if(oldSession){
        console.log('arleady logged in');
        return this.getUser()
        
      }
      const successRedirect = Linking.createURL("/(root)/(onboarding)/personal-info");
      const failureRedirect = Linking.createURL("/(auth)/auth");
      // 🔹 Get OAuth login URL with success & failure redirects
      const authURL = await this.account.createOAuth2Token(provider, successRedirect, failureRedirect);
      if (!authURL) throw new Error("Failed to get OAuth login URL");
  
      // 🔹 Open OAuth session inside the app
      const browserResult = await WebBrowser.openAuthSessionAsync(authURL.toString(), successRedirect);
  
      if (browserResult.type !== "success") {
        await WebBrowser.openBrowserAsync(failureRedirect);
        throw new Error("OAuth2 login failed");
      }
  
      // 🔹 Capture OAuth response from deep link
      const url = new URL(browserResult.url);
      const secret = url.searchParams.get("secret");
      const userId = url.searchParams.get("userId");
  
      if (!secret || !userId) {
        await WebBrowser.openBrowserAsync(failureRedirect);
        throw new Error("Invalid OAuth response");
      }
  
      // 🔹 Create user session
      const session = await this.account.createSession(userId, secret);
      if (!session) throw new Error("Failed to create session");
  
      // console.log("New session:", session);
      // 🔹 Get user data
      const account = await this.getSession();
      if (!account) throw new Error("Failed to retrieve user");
  
      // console.log("account data:", account);
  
      // 🔹 Check if user exists in database
      const savedUser = await this.checkUser(account.$id);
      if (savedUser) {
        return userFormatter(savedUser);
      }
      // 🔹 Create a new user if not found
      const newSavedUser = await this.createUser(account);
      return newSavedUser;

    } catch (error) {
      console.error("Login error:", error);
      
    }
  }
  

  
  async logout() {
    try {
      await this.account.deleteSession("current");
      await deleteItemFromSecureStore("campus-crib-user")
      return true;
    } catch (error) {
      // console.error(error);
      return false;
    }
  }
  async createUser(account:Models.User<Models.Preferences> ){
    type TempUser = {
      name: string,
      email: string,
      account_id:string,
      avatar:URL,
    }
    const newUser: TempUser = {
      name: account.name,
      email: account.email,
      account_id: account.$id,
      avatar: this.avatars.getInitials(account.name),
    };

    const res = await this.database.createDocument(
      appwriteConfig.appWriteDatabase,
      appwriteConfig.appWriteUsersCollectionID,
      ID.unique(),
      newUser
    );
      return userFormatter(res);
  }
  async loginWithCredentials({email,password}:{email:string,password:string}) {
    try {
      console.log('Trying to login with credentials');
      const arleadyExists = await this.getUserByEmailAdrress(email);
      if(arleadyExists){
        const session = await  this.account.createEmailPasswordSession(email, password);
        if(!session) throw new Error("Invalid Password")
          const user = await this.getUser();
        if(user){
          return userFormatter(user)
        }
      }
      
       // 🔹 Create a new user if not found
       const account = await this.getSession();
       console.log('account:',account);
       
       if (!account) throw new Error("Failed to retrieve user");
       const newSavedUser = await this.createUser(account);
       console.log('newSavedUser:',newSavedUser);
       
       return newSavedUser;
    } catch (error) {
      throw error
      console.error(error);
      return null;
    }
  }
  async getSession() {
    try {
      return await this.account.get();
    } catch (error) {
      // console.error(error);
      return null;
    }
  }
  async getUser() {
    try {
      const session = await this.getSession();
      if(session){
        const user = this.checkUser(session.$id)
        return user
      }
      return null
    } catch (error) {
      // console.error(error);
      return null;
    }
  }
  async getUserByEmailAdrress(email:string) {
    try {
      const res =  await this.database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteUsersCollectionID,
        [Query.equal('email',email)]
      )
      if(res.total > 0){

        return  userFormatter(res.documents[0])
      }
      return null
    } catch (error) {
      // console.error(error);
      return null;
    }
  }
}

export const authService: AuthService = new AuthService();
