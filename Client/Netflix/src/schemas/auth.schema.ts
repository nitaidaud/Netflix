import { z } from "zod";

export const signinSchema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(6, "Password must be a least 6 characters"),
});

export const signupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid Email"),
    password: z.string().min(6, "Password must be a least 6 characters")
});

export type SigninFormData = z.infer<typeof signinSchema>
export type SignupFormData = z.infer<typeof signupSchema>;
