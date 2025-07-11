// src/lib/validation/profile.ts
import * as z from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required"),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain uppercase, lowercase, number, and special character"
      ),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

export const apiKeySchema = z.object({
  name: z
    .string()
    .min(1, "API key name is required")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z0-9\s-_]+$/, "Name can only contain letters, numbers, spaces, hyphens, and underscores"),
});

export const depositSchema = z.object({
  amount: z
    .number()
    .min(5, "Minimum deposit amount is $5.00")
    .max(10000, "Maximum deposit amount is $10,000.00"),
  currency: z
    .string()
    .default("USD"),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type ApiKeyFormData = z.infer<typeof apiKeySchema>;
export type DepositFormData = z.infer<typeof depositSchema>;