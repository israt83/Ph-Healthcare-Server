import z from "zod";
import { Gender } from "../../../generated/prisma/enums";


export const updateDoctorZodSchema = z.object({
    doctor : z.object({
    name: z.string("Name must be a string").min(3, "Name must be at least 3 characters long").max(20, "Name must be less than 20 characters long").optional(),
    profilePhoto: z.url("Profile photo must be a valid URL").optional(),
    contactNumber: z.string("Contact number must be a string").min(10, "Contact number must be at least 10 digits long").optional(),
    address: z.string("Address must be a string").min(10, "Address must be at least 10 characters long").max(100, "Address must be less than 100 characters long").optional(),
    experience: z.int("Experience must be an integer").nonnegative("Experience cannot be negative").optional(),
    gender: z.enum([Gender.MALE, Gender.FEMALE],"Gender must be either MALE or FEMALE").optional(),
    appointmentFee: z.number("Appointment fee must be a number").nonnegative("Appointment fee cannot be negative").optional(),
    qualification: z.string("Qualification must be a string").min(3, "Qualification must be at least 3 characters long").max(50, "Qualification must be less than 50 characters long").optional(),
    currentWorkingPlace: z.string("Current working place must be a string").min(3, "Current working place must be at least 3 characters long").max(50, "Current working place must be less than 50 characters long").optional(),
    designation: z.string("Designation must be a string").min(3, "Designation must be at least 3 characters long").max(50, "Designation must be less than 50 characters long").optional(), 
    })
});
// .partial();