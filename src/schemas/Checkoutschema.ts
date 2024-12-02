import * as z from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "Email Address is required"),
  phone: z
    .string()
    .regex(/^\d{10,15}$/, "Enter a valid phone number")
    .min(1, "Phone Number is required"),
  address: z.string().min(1, "Street Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State/Province is required"),
  zip: z
    .string()
    .regex(/^\d{4,10}$/, "Enter a valid ZIP code")
    .min(1, "ZIP Code is required"),
});
