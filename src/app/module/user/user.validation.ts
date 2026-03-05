import z from "zod";
import { Gender } from "../../../generated/prisma/browser";

export const createDoctorZodSchema = z.object({
  password: z.string().min(6).max(20),

  doctor: z.object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters long")
      .max(20, "Name must be less than 20 characters long"),

    email: z.string().email("Invalid email address"),

    contactNumber: z
      .string()
      .min(10, "Contact number must be at least 10 digits long").optional(),

    address: z
      .string()
      .min(10, "Address must be at least 10 characters long")
      .max(100, "Address must be less than 100 characters long")
      .optional(),

    registrationNumber: z.string(),

    experience: z
      .number()
      .int("Experience must be an integer")
      .nonnegative("Experience cannot be negative")
      .optional(),

    gender: z.nativeEnum(Gender),

    appointmentFee: z
      .number()
      .nonnegative("Appointment fee cannot be negative"),

    qualification: z.string().min(2).max(50),

    currentWorkingPlace: z.string().min(2).max(50),

    designation: z.string().min(2).max(50),
  }),

  specialties: z
    .array(z.string().uuid())
    .min(1, "At least one specialty is required"),
});


export const createAdminZodSchema = z.object({
    password: z.string("Password is required").min(6, "Password must be at least 6 characters").max(20, "Password must be at most 20 characters"),
    admin: z.object({
        name: z.string("Name is required and must be string").min(5, "Name must be at least 5 characters").max(30, "Name must be at most 30 characters"),
        email: z.email("Invalid email address"),
        contactNumber: z.string("Contact number is required").min(11, "Contact number must be at least 11 characters").max(14, "Contact number must be at most 15 characters").optional(),
        profilePhoto: z.url("Profile photo must be a valid URL").optional(),
    }),
    role: z.enum(["ADMIN", "SUPER_ADMIN"], "Role must be either ADMIN or SUPER_ADMIN")
})