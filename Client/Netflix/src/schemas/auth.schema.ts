import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email("Invalid Email"),
  password: z.string().min(6, "Password must be a least 6 characters"),
});

export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid Email"),
  password: z.string().min(6, "Password must be a least 6 characters"),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid mail address",
  }),
});

export const ResetPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export type SigninFormData = z.infer<typeof signinSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ForgotPasswordSchema = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;
