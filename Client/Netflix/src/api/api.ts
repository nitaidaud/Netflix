import IHomeContent from "@/api/interfaces/IHomeContent";
import { apiBaseUrl } from "@/config/config";
import { SigninFormData, SignupFormData } from "@/schemas/auth.schema";
import { ProfileFormData } from "@/schemas/profile.schema";
import axios from "axios";
import IAuthResponse from "./interfaces/IAuthResponse";
import IBaseMovie from "./interfaces/IBaseMovie";
import IBaseResponse from "./interfaces/IBaseRespone";
import IMyListResponse from "./interfaces/IMyListResponse";
import IProfile from "./interfaces/IProfile";
import IProfileResponse from "./interfaces/IProfileResponse";
import IProfilesResponse from "./interfaces/IProfilesResponse";
import ITrailerResponse from "./interfaces/ITrailerResponse";
import IUser from "./interfaces/IUser";
import ISendMailResponse from "./interfaces/IVerifyMailResponse";

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
  const { data } = await api.patch<ISendMailResponse>(
    `/api/users/reset-password/${token}`,
    {
      password,
    },
  );
  return data;
};

export const logoutUserRequest = async () => {
  await api.post("/api/users/logout");
};

export const checkAuthRequest = async () => {
  const { data } = await api.post<IAuthResponse>("/api/users/check-auth");

  return data;
};

export const getHomeContentRequest = async () => {
  const { data } = await api.get<IHomeContent>(`/api/movies/home`);
  return data;
};

export const getMoviesByCategoryRequest = async (
  category: string,
  page: number,
) => {
  const categoryLower = category.toLowerCase();
  const { data } = await api.get<IBaseMovie[]>(
    `/api/movies/genre/${categoryLower}`,
    {
      params: { page },
    },
  );
  return data;
};

export const searchMoviesRequest = async (
  query: string,
  page: number = 1,
): Promise<IBaseMovie[]> => {
  const { data } = await api.get<IBaseMovie[]>(`/api/movies/search`, {
    params: { title: query, page },
  });
  console.log("data", data);

  return data;
};

export const getMovieTrailerRequest = async (id: number) => {
  const { data } = await api.get<ITrailerResponse>(`/api/movies/${id}/trailer`);
  return data;
};

export const createProfileRequest = async (profileData: ProfileFormData) => {
  const { data } = await api.post<IProfileResponse>(
    `/api/profiles/create-profile`,
    profileData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return data;
};

export const loginProfileRequest = async (profile: IProfile) => {
  const { data } = await api.post<IBaseResponse>(`/api/profiles/login`, {
    ...profile,
  });
  return data;
};

export const logoutProfileRequest = async () => {
  const { data } = await api.post<IBaseResponse>(`/api/profiles/logout`);
  return data;
};

export const checkLoggedInProfileRequest = async () => {
  const { data } = await api.get<IProfileResponse>(
    `/api/profiles/check-logged-in`,
  );
  return data;
};

export const getProfileByIdRequest = async () => {
  const { data } = await api.get<IProfileResponse>(`/api/profiles/get-profile`);
  return data;
};

export const updateProfileRequest = async (profileData: ProfileFormData) => {
  const { data } = await api.patch<IProfileResponse>(
    `/api/profiles/update-profile`,
    profileData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return data;
};

export const addMovieToFavoriteListRequest = async (movie: IBaseMovie) => {
  const { data } = await api.patch<IMyListResponse>(
    `/api/profiles/add-movie`,
    movie,
  );
  return data;
};

export const removeMovieFromFavoriteListRequest = async (movieId: number) => {
  const { data } = await api.patch<IMyListResponse>(
    `/api/profiles/remove-movie`,
    { movieId: movieId },
  );
  return data;
};

export const deleteProfileRequest = async () => {
  const { data } = await api.delete<IBaseResponse>(
    `/api/profiles/delete-profile`,
  );
  return data;
};

export const getFavoriteListRequest = async () => {
  const { data } = await api.get<IBaseMovie[]>(
    `/api/profiles/get-favorites-list`,
  );
  return data;
};

export const getProfilesRequest = async () => {
  const { data } = await api.get<IProfilesResponse>(
    `/api/profiles/get-all-profiles`,
  );
  return data;
};

export const getMoviesByPageRequest = async (pageParam: number = 1) => {
  const { data } = await api.get<IBaseMovie[]>(
    `/api/movies/getMovies/page/${pageParam}`,
  );

  return data;
};

export const getMovieByIdRequest = async (id: number) => {
  const { data } = await api.get<IBaseMovie>(`/api/movies/getMovieById/${id}`);
  return data;
};

type SearchResponse = {
  message: string;
  url: string;
};

export const getMovieRequest = async () => {
  const { data } = await axios.get<SearchResponse>(
    "localhost:3000/api/stream/get-movie",
  );

  return data;
};
