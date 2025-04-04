import axios from "axios";
import { apiBaseUrl } from "@/config/config";
import { SigninFormData, SignupFormData } from "@/schemas/auth.schema";
import ISendMailResponse from "./interfaces/IVerifyMailResponse";
import IAuthResponse from "./interfaces/IAuthResponse";
import IUser from "./interfaces/IUser";

const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 1000 * 60,
  withCredentials: true,
});

export interface BaseApiResponse {
  message: string;
}

export interface AuthResponse extends BaseApiResponse {
  token: string;
}

export const signinRequest = async (
  formData: SigninFormData,
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/api/users/login", formData);
  return data;
};

export const signupRequest = async (
  formData: SignupFormData,
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/api/users/signup", {
    email: formData.email,
    name: formData.name,
    password: formData.password,
  });

  if (data.token) {
    await api.post(`/api/users/send-email`, {
      email: formData.email,
    });
  }

  return data;
};

export const newVerificationRequest = async () => {
  const { data: userData } = await api.get<IUser | null>("/api/users/get-user");

  if (!userData) {
    throw new Error("User not found");
  }
  console.log("userData", userData);

  const { email } = userData;
  console.log("email", email);

  const { data } = await api.post<ISendMailResponse>(`/api/users/send-email`, {
    email,
  });

  return data;
};

export const verifyEmailRequest = async (
  token: string,
): Promise<ISendMailResponse> => {
  const { data } = await api.post<ISendMailResponse>(
    `/api/users/verify-email/${token}`,
  );

  return data;
};

export const forgotPassword = async (
  email: string,
): Promise<ISendMailResponse> => {
  const { data } = await api.post<ISendMailResponse>(
    `/api/users/forgot-password`,
    {
      email,
    },
  );
  return data;
};

export const resetPassword = async (
  token: string,
  password: string,
): Promise<ISendMailResponse> => {
  const { data } = await api.post<ISendMailResponse>(
    `/api/users/reset-password/${token}`,
    {
      password,
    },
  );
  return data;
};

export const logoutRequest = async () => {
  await api.post("/api/users/logout");
};

export const checkAuthRequest = async () => {
  const { data } = await api.post<IAuthResponse>("/api/users/check-auth");

  return data;
};
