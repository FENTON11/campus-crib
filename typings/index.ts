import { Ref } from "react";
import { Models } from "react-native-appwrite";
export type appwriteConfiguration = {
  appWriteEndPoint: string;
  appWriteProject: string;
  appWriteBucket: string;
  appWriteDatabase: string;
  appWritePropertyCollectionID: string;
  appWriteUsersCollectionID: string;
  appWriteAgentCollectionID: string;
  appWriteReferencesCollectionID: string;
  appWriteMessegesCollectionID: string;
  appWriteRoomsCollectionID: string;
  appWritePlatform: string;
};
export interface User extends Models.Document {
  name: string;
  email: string;
  avatar: URL;
  account_id: string;
  favorites: string[];
  level: number;
  phone?: number;
  role: "admin" | "normal" | "super_admin";
  preferences: References;
}
export interface Agent extends Models.Document {
  properties: Property;
  type: "landlord" | "agent";
  user: User;
}
export interface References extends Models.Document {
  user: User;
  budget: number[];
  location: string;
  age_limit: number[];
  year_of_study: number;
  course: string;
  drinking: string;
  smoking: string;
  emergency_contact: string;
}
export interface IMessege extends Models.Document {
  text: string;
  sender: User;
  receiver: User;
  room: IChatRoom;
  pushNotification: boolean;
  status: "sent" | "unsent" | "read" | "unread";
}
export interface IChatRoom extends Models.Document {
  members: string[];
  last_Message: string;
}
export interface Property extends Models.Document {
  name: string;
  image: string;
  description: string;
  location: string;
  price: number;
  featured: boolean;
  bathrooms: number;
  address: string;
  area: number;
  type:
    | "Apartment"
    | "House"
    | "Townhouse"
    | "Duplex"
    | "Condo"
    | "Villa"
    | "Studio"
    | "Other";
  reviews?: number;
  beds: number;
  gallery: string[];
  amenities?: string[];
  agent: Agent;
}

export type Field = {
  name: string;
  type: "string" | "number" | "boolean" | "array" | "date" | "file";
  component:
    | "input"
    | "select"
    | "checkbox"
    | "checkboxGroup"
    | "datePicker"
    | "fileUpload"
    | "inputGroup";
  options?: string[]; // Optional property for fields that require options
};

export type Step = {
  label: string;
  fields: Field[];
};
export type NewMessage = {
  text: string;
  sender: string;
  receiver: string;
  room: string;
  status: "sent" | "unsent" | "read" | "unread";
};
