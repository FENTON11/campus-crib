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
  appWritePlatform: string;
};
export interface User extends Models.Document {
  name: string;
  email: string;
  avatar: string;
  account_id: string;
  favorites: string[];
  phone: number;
  role: "admin" | "normal" | "super_admin";
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
