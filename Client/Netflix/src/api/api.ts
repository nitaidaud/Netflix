import axios from 'axios';
import { apiBaseUrl } from '@/config/config';
import { SigninFormData, SignupFormData } from '@/schemas/auth.schema';


const api = axios.create({
    baseURL: apiBaseUrl,
    timeout: 1000 * 60,
    withCredentials: true
})

export interface BaseApiResponse {
    message: string
}

export interface AuthResponse extends BaseApiResponse {
    token: string
}

export const signinRequest = async (
    formData : SigninFormData
): Promise<AuthResponse> => {
    const { data } = await api.post("/api/users/signin", formData);
    return data;
};

export const signupRequest = async (
    formData: SignupFormData
): Promise<AuthResponse> => {
    const { data } = await api.post("/api/users/signup", {
        email: formData.email,
        name: formData.name,
        password: formData.password,
    });
    return data;
};

