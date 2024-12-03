import { z } from "zod";
export const imageValidation = z.object({
  images: z
    .array(
      z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
        message: "Each file must be an image",
      })
    )
    .refine((files) => files.length > 0, {
      message: "At least one image is required",
    })
    .refine((files) => files.length <= 3, {
      message: "You can upload a maximum of 3 images",
    }),
});

export const productDataValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z
    .union([z.string(), z.number()]) // Allows both string and number
    .refine((value) => !isNaN(Number(value)), "Price must be a number") // Ensures the value is a valid number
    .transform((value) =>
      typeof value === "string" ? parseFloat(value) : value
    ), // Converts string to number if necessary
  category: z.string().min(1, "Category is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  quantity: z
    .union([z.string(), z.number()]) // Allows both string and number
    .refine((value) => !isNaN(Number(value)), "Quantity must be a number") // Ensures the value is a valid number
    .transform((value) =>
      typeof value === "string" ? parseInt(value, 10) : value
    ), // Converts string to number if necessary
  images: z.any().optional(),
});
