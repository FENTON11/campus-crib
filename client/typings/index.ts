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
  appwriteBookingsCollectionID: string;
};
export interface User extends Models.Document {
  name: string;
  email: string;
  avatar: URL;
  account_id: string;
  favorites: string[];
  level: number;
  phone?: number;
  isAgent: boolean;
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
  booked: boolean;
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
export interface Booking extends Models.Document {
 visitDate: Date;
 userId: string;
 propertyId: string;
 status: "pending" | "confirmed" | "cancelled";
 
}
export interface FilterModal{
 visible: boolean;
   onClose: () => void;
   onApplyFilters: (filters: {
     priceRange: number;
     location: string;
     bedrooms: number;
     bathrooms: number;
     propertyType: string;
     furnished: boolean;
     petFriendly: boolean;
     parking: boolean;
     security: boolean;
     roommatesAllowed: boolean;
   }) => void;
   onReset: () => void;
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

export type Amenity = {
  id: number;
  name: string;
  icon: string;
  iconSet:
    | "MaterialIcons"
    | "FontAwesome"
    | "Ionicons"
    | "MaterialCommunityIcons"
    | "Feather";
};

export interface INotification {
  type: { target: string; type: string; ALLOW_DUPLICATE: boolean };
  postID?: string;
  senderID: string;
  receiverID: string;
  username: string;
  messege: string;
  id: string;
  read: boolean;
  createAt: Date;
}

export interface Booking extends Models.Document {
  user:User,
  property: Property;
  visitDate: Date; 
  status: "pending" | "confirmed" | "cancelled";
}