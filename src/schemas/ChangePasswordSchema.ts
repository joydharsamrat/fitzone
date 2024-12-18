import { z } from "zod";

export const changePasswordSchema = z
  .object({
    oldPassword: z.string(),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password cannot exceed 100 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
