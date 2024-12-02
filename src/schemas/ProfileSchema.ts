import z from "zod";

export const editProfileSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  email: z.string().email("Invalid email address"),
  address: z.string().optional(),
  phone: z
    .string()
    .optional()
    .refine(
      (value) => !value || value.length >= 11,
      "Phone number must be at least 11 characters"
    ),
});
