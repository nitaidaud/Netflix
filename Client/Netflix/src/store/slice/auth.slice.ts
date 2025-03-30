import { SigninFormData, SignupFormData } from '@/schemas/auth.schema';
import { getErrorMessage } from '@/utils/axios.error.handler';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthResponse, signinRequest, signupRequest } from '../../api/api';

interface AuthState { 
    name: string;
    email: string;
    token: string;
    isAuthenticated: boolean;
    error: string | null;
}

const initialState: AuthState = {
    name: '',
    email: '',
    token: '',
    isAuthenticated: false,
    error: null,
}

export const signin = createAsyncThunk(
    'auth/signin',
    async (formData: SigninFormData, { rejectWithValue }) => {
        try{
            const response: AuthResponse = await signinRequest(formData);
            return {
                token: response.token,
                email: formData.email
            }
        } catch (error) {
            const errorMessage: string = getErrorMessage(error);
            return rejectWithValue(errorMessage);
        }
    }
);

export const signup = createAsyncThunk(
    "auth/signup",
    async (formData: SignupFormData, {rejectWithValue}) => {
        try {
            const response: AuthResponse = await signupRequest(formData);
            return {
                token: response.token,
                email: formData.email,
                name: formData.name
            }
        } catch (error) {
            const errorMessage: string = getErrorMessage(error);
            return rejectWithValue(errorMessage);
        }
    })


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(signin.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signin.rejected, (state, action) => {
        state.token = "";
        state.email = "";
        state.name = "";
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.token = "";
        state.email = "";
        state.name = "";
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
    },});

    export default authSlice.reducer;