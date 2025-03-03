import { z } from "zod";

export const personalInformationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
});

export const academicInformationSchema = z.object({
  university: z.string().min(1, "University is required"),
  course: z.string().min(1, "Course is required"),
  yearOfStudy: z.string().min(1, "Year of study is required"),
});

export const preferencesSchema = z.object({
  preferredLocation: z.string().min(1, "Preferred location is required"),
  budgetRange: z.string().min(1, "Budget range is required"),
  roomType: z.string().min(1, "Room type is required"),
  amenities: z.string().optional(),
});

export const roommatePreferencesSchema = z.object({
  roommateGender: z.string().min(1, "Roommate gender is required"),
  roommateAgeRange: z.string().min(1, "Roommate age range is required"),
  lifestyle: z.string().optional(),
  studyHabits: z.string().optional(),
  cleanliness: z.string().optional(),
  smoking: z.string().optional(),
  pets: z.string().optional(),
});

export const additionalInformationSchema = z.object({
  hobbies: z.string().optional(),
  dietaryPreferences: z.string().optional(),
  languagePreferences: z.string().optional(),
  specialNeeds: z.string().optional(),
  moveInDate: z.string().min(1, "Move-in date is required"),
  leaseDuration: z.string().min(1, "Lease duration is required"),
});

export const emergencyContactSchema = z.object({
  emergencyContactName: z.string().min(1, "Emergency contact name is required"),
  emergencyContactPhone: z
    .string()
    .min(1, "Emergency contact phone is required"),
  emergencyContactRelation: z
    .string()
    .min(1, "Emergency contact relation is required"),
});

export const finalStepSchema = z.object({
  idProof: z.string().min(1, "ID proof is required"),
  profilePicture: z.string().optional(),
  socialMediaLinks: z.string().optional(),
  references: z.string().optional(),
  consent: z.boolean().refine((value) => value === true, "Consent is required"),
  notificationPreferences: z.string().optional(),
});

export const stepsSchemas = [
  personalInformationSchema,
  academicInformationSchema,
  preferencesSchema,
  roommatePreferencesSchema,
  additionalInformationSchema,
  emergencyContactSchema,
  finalStepSchema,
];
