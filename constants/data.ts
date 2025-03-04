import { Step } from "@/typings";
import icons from "./icons";
import images from "./images";

export const cards = [
  {
    title: "Card 1",
    location: "Location 1",
    price: "$100",
    rating: 4.8,
    category: "house",
    image: images.newYork,
  },
  {
    title: "Card 2",
    location: "Location 2",
    price: "$200",
    rating: 3,
    category: "house",
    image: images.japan,
  },
  {
    title: "Card 3",
    location: "Location 3",
    price: "$300",
    rating: 2,
    category: "flat",
    image: images.newYork,
  },
  {
    title: "Card 4",
    location: "Location 4",
    price: "$400",
    rating: 5,
    category: "villa",
    image: images.japan,
  },
];

export const featuredCards = [
  {
    title: "Featured 1",
    location: "Location 1",
    price: "$100",
    rating: 4.8,
    image: images.newYork,
    category: "house",
  },
  {
    title: "Featured 2",
    location: "Location 2",
    price: "$200",
    rating: 3,
    image: images.japan,
    category: "flat",
  },
];

export const categories = [
  { title: "All", category: "All" },
  { title: "Houses", category: "House" },
  { title: "Condos", category: "Condos" },
  { title: "Duplexes", category: "Duplexes" },
  { title: "Studios", category: "Studios" },
  { title: "Villas", category: "Villa" },
  { title: "Apartments", category: "Apartments" },
  { title: "Townhomes", category: "Townhomes" },
  { title: "Others", category: "Others" },
];

export const settings = [
  {
    title: "My Bookings",
    icon: icons.calendar,
  },
  {
    title: "Payments",
    icon: icons.wallet,
  },
  {
    title: "Profile",
    icon: icons.person,
  },
  {
    title: "Notifications",
    icon: icons.bell,
  },
  {
    title: "Security",
    icon: icons.shield,
  },
  {
    title: "Language",
    icon: icons.language,
  },
  {
    title: "Help Center",
    icon: icons.info,
  },
  {
    title: "Invite Friends",
    icon: icons.people,
  },
];

export const facilities = [
  {
    title: "Laundry",
    icon: icons.laundry,
  },
  {
    title: "Car Parking",
    icon: icons.carPark,
  },
  {
    title: "Sports Center",
    icon: icons.run,
  },
  {
    title: "Cutlery",
    icon: icons.cutlery,
  },
  {
    title: "Gym",
    icon: icons.dumbell,
  },
  {
    title: "Swimming pool",
    icon: icons.swim,
  },
  {
    title: "Wifi",
    icon: icons.wifi,
  },
  {
    title: "Pet Center",
    icon: icons.dog,
  },
];

export const gallery = [
  {
    id: 1,
    image: images.newYork,
  },
  {
    id: 2,
    image: images.japan,
  },
  {
    id: 3,
    image: images.newYork,
  },
  {
    id: 4,
    image: images.japan,
  },
  {
    id: 5,
    image: images.newYork,
  },
  {
    id: 6,
    image: images.japan,
  },
];

export const steps: Step[] = [
  {
    label: "Preferences",
    fields: [
      { name: "preferredLocation", type: "string", component: "input" },
      { name: "budgetRange", type: "number", component: "input" },
      {
        name: "roomType",
        type: "string",
        component: "select",
        options: ["Single Room", "Shared Room", "Apartment"],
      },
      {
        name: "amenities",
        type: "array",
        component: "checkboxGroup",
        options: ["Wifi", "Parking", "Gym", "Swimming Pool"],
      },
    ],
  },
  {
    label: "Roommate Preferences",
    fields: [
      {
        name: "roommateGender",
        type: "string",
        component: "select",
        options: ["Male", "Female", "Any"],
      },
      {
        name: "roommateAgeRange",
        type: "string",
        component: "select",
        options: ["18-25", "26-35", "36-45", "46+"],
      },
      { name: "lifestyle", type: "string", component: "input" },
      { name: "studyHabits", type: "string", component: "input" },
      {
        name: "cleanliness",
        type: "string",
        component: "select",
        options: ["Very Clean", "Clean", "Moderate", "Messy"],
      },
      { name: "smoking", type: "boolean", component: "checkbox" },
      { name: "pets", type: "boolean", component: "checkbox" },
    ],
  },
  {
    label: "Additional Information",
    fields: [
      {
        name: "hobbies",
        type: "array",
        component: "checkboxGroup",
        options: ["Reading", "Sports", "Music", "Travel"],
      },
      { name: "dietaryPreferences", type: "string", component: "input" },
      { name: "languagePreferences", type: "string", component: "input" },
      { name: "specialNeeds", type: "string", component: "input" },
      { name: "moveInDate", type: "date", component: "datePicker" },
      { name: "leaseDuration", type: "number", component: "input" },
    ],
  },
  {
    label: "Emergency Contact",
    fields: [
      { name: "emergencyContactName", type: "string", component: "input" },
      { name: "emergencyContactPhone", type: "string", component: "input" },
      { name: "emergencyContactRelation", type: "string", component: "input" },
    ],
  },
  {
    label: "Final Step",
    fields: [
      { name: "idProof", type: "file", component: "fileUpload" },
      { name: "profilePicture", type: "file", component: "fileUpload" },
      {
        name: "socialMediaLinks",
        type: "array",
        component: "inputGroup",
        options: ["Facebook", "Twitter", "Instagram"],
      },
      {
        name: "references",
        type: "array",
        component: "inputGroup",
        options: ["Reference 1", "Reference 2"],
      },
      { name: "consent", type: "boolean", component: "checkbox" },
      {
        name: "notificationPreferences",
        type: "array",
        component: "checkboxGroup",
        options: ["Email", "SMS", "Push Notifications"],
      },
    ],
  },
];
