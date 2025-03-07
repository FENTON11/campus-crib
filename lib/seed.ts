// import { ID } from "react-native-appwrite";
// import { databases, config } from "./appwrite";
// import {
//   agentImages,
//   galleryImages,
//   propertiesImages,
//   reviewImages,
// } from "./data";

import { appwriteService } from "@/appwrite/appwriteService";

// const COLLECTIONS = {
//   AGENT: config.agentsCollectionId,
//   REVIEWS: config.reviewsCollectionId,
//   GALLERY: config.galleriesCollectionId,
//   PROPERTY: config.propertiesCollectionId,
// };

// const propertyTypes = [
//   "House",
//   "Townhomes",
//   "Condos",
//   "Duplexes",
//   "Studios",
//   "Villa",
//   "Apartments",
//   "Others",
// ];

// const facilities = [
//   "Laundry",
//   "Car Parking",
//   "Sports Center",
//   "Cutlery",
//   "Gym",
//   "Swimming pool",
//   "Wifi",
//   "Pet Center",
// ];

// function getRandomSubset<T>(
//   array: T[],
//   minItems: number,
//   maxItems: number
// ): T[] {
//   if (minItems > maxItems) {
//     throw new Error("minItems cannot be greater than maxItems");
//   }
//   if (minItems < 0 || maxItems > array.length) {
//     throw new Error(
//       "minItems or maxItems are out of valid range for the array"
//     );
//   }

//   // Generate a random size for the subset within the range [minItems, maxItems]
//   const subsetSize =
//     Math.floor(Math.random() * (maxItems - minItems + 1)) + minItems;

//   // Create a copy of the array to avoid modifying the original
//   const arrayCopy = [...array];

//   // Shuffle the array copy using Fisher-Yates algorithm
//   for (let i = arrayCopy.length - 1; i > 0; i--) {
//     const randomIndex = Math.floor(Math.random() * (i + 1));
//     [arrayCopy[i], arrayCopy[randomIndex]] = [
//       arrayCopy[randomIndex],
//       arrayCopy[i],
//     ];
//   }

//   // Return the first `subsetSize` elements of the shuffled array
//   return arrayCopy.slice(0, subsetSize);
// }

// async function seed() {
//   try {
//     // Clear existing data from all collections
//     for (const key in COLLECTIONS) {
//       const collectionId = COLLECTIONS[key as keyof typeof COLLECTIONS];
//       const documents = await databases.listDocuments(
//         config.databaseId!,
//         collectionId!
//       );
//       for (const doc of documents.documents) {
//         await databases.deleteDocument(
//           config.databaseId!,
//           collectionId!,
//           doc.$id
//         );
//       }
//     }

//     console.log("Cleared all existing data.");

//     // Seed Agents
//     const agents = [];
//     for (let i = 1; i <= 5; i++) {
//       const agent = await databases.createDocument(
//         config.databaseId!,
//         COLLECTIONS.AGENT!,
//         ID.unique(),
//         {
//           name: `Agent ${i}`,
//           email: `agent${i}@example.com`,
//           avatar: agentImages[Math.floor(Math.random() * agentImages.length)],
//         }
//       );
//       agents.push(agent);
//     }
//     console.log(`Seeded ${agents.length} agents.`);

//     // Seed Reviews
//     const reviews = [];
//     for (let i = 1; i <= 20; i++) {
//       const review = await databases.createDocument(
//         config.databaseId!,
//         COLLECTIONS.REVIEWS!,
//         ID.unique(),
//         {
//           name: `Reviewer ${i}`,
//           avatar: reviewImages[Math.floor(Math.random() * reviewImages.length)],
//           review: `This is a review by Reviewer ${i}.`,
//           rating: Math.floor(Math.random() * 5) + 1, // Rating between 1 and 5
//         }
//       );
//       reviews.push(review);
//     }
//     console.log(`Seeded ${reviews.length} reviews.`);

//     // Seed Galleries
//     const galleries = [];
//     for (const image of galleryImages) {
//       const gallery = await databases.createDocument(
//         config.databaseId!,
//         COLLECTIONS.GALLERY!,
//         ID.unique(),
//         { image }
//       );
//       galleries.push(gallery);
//     }

//     console.log(`Seeded ${galleries.length} galleries.`);

//     // Seed Properties
//     for (let i = 1; i <= 20; i++) {
//       const assignedAgent = agents[Math.floor(Math.random() * agents.length)];

//       const assignedReviews = getRandomSubset(reviews, 5, 7); // 5 to 7 reviews
//       const assignedGalleries = getRandomSubset(galleries, 3, 8); // 3 to 8 galleries

//       const selectedFacilities = facilities
//         .sort(() => 0.5 - Math.random())
//         .slice(0, Math.floor(Math.random() * facilities.length) + 1);

//       const image =
//         propertiesImages.length - 1 >= i
//           ? propertiesImages[i]
//           : propertiesImages[
//               Math.floor(Math.random() * propertiesImages.length)
//             ];

//       const property = await databases.createDocument(
//         config.databaseId!,
//         COLLECTIONS.PROPERTY!,
//         ID.unique(),
//         {
//           name: `Property ${i}`,
//           type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
//           description: `This is the description for Property ${i}.`,
//           address: `123 Property Street, City ${i}`,
//           geolocation: `192.168.1.${i}, 192.168.1.${i}`,
//           price: Math.floor(Math.random() * 9000) + 1000,
//           area: Math.floor(Math.random() * 3000) + 500,
//           bedrooms: Math.floor(Math.random() * 5) + 1,
//           bathrooms: Math.floor(Math.random() * 5) + 1,
//           rating: Math.floor(Math.random() * 5) + 1,
//           facilities: selectedFacilities,
//           image: image,
//           agent: assignedAgent.$id,
//           reviews: assignedReviews.map((review) => review.$id),
//           gallery: assignedGalleries.map((gallery) => gallery.$id),
//         }
//       );

//       console.log(`Seeded property: ${property.name}`);
//     }

//     console.log("Data seeding completed.");
//   } catch (error) {
//     console.error("Error seeding data:", error);
//   }
// }

// export default seed;

export async function seedProperties() {
  const agentId = "7cab34200061129d230"; // Agent ID
  const properties = [
    {
      name: "Luxury Apartment",
      image:
        "https://images.unsplash.com/photo-1517331671191-ddc2c6d3ebd1?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "A luxurious apartment with modern amenities.",
      location: "Nairobi, Kenya",
      price: 2500,
      bathrooms: 2,
      address: "123 Luxury Lane",
      area: 120,
      type: "Apartment",
      beds: 3,
      gallery: [
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://unsplash.com/photos/comfort-room-with-white-bathtub-and-brown-wooden-cabinets-CMejBwGAdGk",
        "https://images.unsplash.com/photo-1638799869566-b17fa794c4de?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1560185009-dddeb820c7b7?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1641910532059-ad684fd3049c?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1621293954908-907159247fc8?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1604328702728-d26d2062c20b?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1600435335786-d74d2bb6de37?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1635108198979-9806fdf275c6?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      amenities: ["Wi-Fi", "Pool", "Gym"],
      agent: agentId,
    },
    {
      name: "Cozy House",
      image:
        "https://images.unsplash.com/photo-1474176857210-7287d38d27c6?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "A cozy house with a beautiful garden.",
      location: "Mombasa, Kenya",
      price: 1800,
      bathrooms: 1,
      address: "456 Cozy Street",
      area: 100,
      type: "House",
      beds: 2,
      gallery: [
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://unsplash.com/photos/comfort-room-with-white-bathtub-and-brown-wooden-cabinets-CMejBwGAdGk",
        "https://images.unsplash.com/photo-1638799869566-b17fa794c4de?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1560185009-dddeb820c7b7?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1641910532059-ad684fd3049c?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1621293954908-907159247fc8?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1604328702728-d26d2062c20b?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1600435335786-d74d2bb6de37?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1635108198979-9806fdf275c6?q=60&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      amenities: ["Wi-Fi", "Garden"],
      agent: agentId,
    },
    // Add more properties as needed
  ];

  for (const property of properties) {
    try {
      await appwriteService.seedProperties(property);
      console.log(`Property ${property.name} added successfully.`);
    } catch (error) {
      console.error(`Error adding property ${property.name}:`, error);
    }
  }
}

// Call the seed function
seedProperties().catch(console.error);
