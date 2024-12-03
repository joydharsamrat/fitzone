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
    .string()
    .refine((value) => !isNaN(parseFloat(value)), "Price must be a number")
    .transform((value) => parseFloat(value)),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  quantity: z
    .string()
    .refine((value) => !isNaN(parseInt(value, 10)), "Quantity must be a number")
    .transform((value) => parseInt(value, 10)),
  images: z.any().optional(),
});
