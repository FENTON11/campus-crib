import { Amenity } from "@/typings";
import { z } from "zod";

export const amenitiesList: Amenity[] = [
  { id: 1, name: "Wi-Fi", icon: "wifi", iconSet: "Ionicons" },
  { id: 2, name: "Parking", icon: "local-parking", iconSet: "MaterialIcons" },
  { id: 3, name: "Pool", icon: "pool", iconSet: "MaterialIcons" },
  { id: 4, name: "Gym", icon: "sports-gymnastics", iconSet: "MaterialIcons" }, // Corrected icon
  { id: 5, name: "AC", icon: "snowflake-o", iconSet: "FontAwesome" },
  {
    id: 6,
    name: "Laundry",
    icon: "washing-machine",
    iconSet: "MaterialCommunityIcons",
  },
  {
    id: 7,
    name: "Elevator",
    icon: "elevator",
    iconSet: "MaterialCommunityIcons",
  },
  { id: 8, name: "Pet-Friendly", icon: "paw", iconSet: "FontAwesome" },
  { id: 9, name: "Balcony", icon: "view-carousel", iconSet: "MaterialIcons" },
  { id: 10, name: "Fireplace", icon: "fire", iconSet: "FontAwesome" },
  { id: 11, name: "Security", icon: "security", iconSet: "MaterialIcons" },
  {
    id: 12,
    name: "Furnished",
    icon: "sofa",
    iconSet: "MaterialCommunityIcons",
  }, // Corrected icon
  { id: 13, name: "Garden", icon: "tree", iconSet: "FontAwesome" },
  { id: 14, name: "Playground", icon: "slideshow", iconSet: "MaterialIcons" },
  {
    id: 15,
    name: "BBQ Area",
    icon: "grill",
    iconSet: "MaterialCommunityIcons",
  },
  { id: 16, name: "Sauna", icon: "hot-tub", iconSet: "MaterialIcons" },
  { id: 17, name: "Concierge", icon: "bell", iconSet: "Feather" },
  {
    id: 18,
    name: "Bike Storage",
    icon: "bike",
    iconSet: "MaterialCommunityIcons",
  },
  { id: 19, name: "Roof Terrace", icon: "deck", iconSet: "MaterialIcons" },
  {
    id: 20,
    name: "Smart Home",
    icon: "home-automation",
    iconSet: "MaterialCommunityIcons",
  },
  { id: 21, name: "CCTV", icon: "cctv", iconSet: "MaterialCommunityIcons" },
  { id: 22, name: "Library", icon: "book", iconSet: "FontAwesome" },
  {
    id: 23,
    name: "Theater",
    icon: "theater",
    iconSet: "MaterialCommunityIcons",
  },
  { id: 24, name: "Jacuzzi", icon: "hot-tub", iconSet: "MaterialIcons" },
  {
    id: 25,
    name: "Solar Panels",
    icon: "solar-panel",
    iconSet: "MaterialCommunityIcons",
  },
  {
    id: 26,
    name: "Wine Cellar",
    icon: "glass-wine",
    iconSet: "MaterialCommunityIcons",
  },
  {
    id: 27,
    name: "Home Office",
    icon: "desktop-mac",
    iconSet: "MaterialCommunityIcons",
  },
  {
    id: 28,
    name: "Game Room",
    icon: "gamepad-variant",
    iconSet: "MaterialCommunityIcons",
  },
  {
    id: 29,
    name: "Walk-in Closet",
    icon: "wardrobe",
    iconSet: "MaterialCommunityIcons",
  },
  {
    id: 30,
    name: "Central Heating",
    icon: "radiator",
    iconSet: "MaterialCommunityIcons",
  },
];

export const schema = z.object({
  name: z
    .string({ message: "Property name is required" })
    .min(3, "Property name cannot be less than 3 characters")
    .max(2200, "Property name cannot be more than 2200 characters"),
  price: z
    .number({ message: "Property price is required" })
    .min(1, "Property price cannot be less than 1"),
  bathrooms: z.number({ message: "Property bathrooms is required" }),
  beds: z
    .number({ message: "Property beds is required" })
    .min(0, "Property beds cannot be less than 0")
    .max(100, "Property beds cannot be more than 100"),
  area: z
    .number({ message: "Property area is required" })
    .min(0, "Property area cannot be less than 0"),
  address: z
    .string({ message: "Property address is required" })
    .min(3, "Property address cannot be less than 3 characters")
    .max(2200, "Property address cannot be more than 2200 characters"),
  code: z
    .string({ message: "Property address is required" })
    .min(3, "Property address cannot be less than 3 characters")
    .max(2200, "Property address cannot be more than 2200 characters"),
  description: z
    .string({ message: "Property description is required" })
    .min(1, "Property description cannot be less than 1 character")
    .max(2200, "Property description cannot be more than 2200 characters"),
});
