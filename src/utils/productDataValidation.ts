import { z } from "zod";

const imageValidation = z
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
  });

const productDataValidationSchema = z.object({
  name: z
    .string({ required_error: "Product name is required" })
    .max(100, "Product name must be less than 100 characters"),
  price: z
    .number({ required_error: "Price is required" })
    .positive("Price must be a positive number"),
  quantity: z
    .number({ required_error: "Quantity is required" })
    .int("Quantity must be an integer")
    .nonnegative("Quantity cannot be negative"),
  description: z
    .string({ required_error: "Description is required" })
    .max(1000, "Description must be less than 1000 characters"),
  images: imageValidation,
  category: z
    .string({ required_error: "Category is required" })
    .regex(/^[a-fA-F0-9]{24}$/, "Category must be a valid ObjectId"),
});

export default productDataValidationSchema;
