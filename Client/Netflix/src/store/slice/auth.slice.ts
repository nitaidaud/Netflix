import { SigninFormData, SignupFormData } from "@/schemas/auth.schema";
import { getErrorMessage } from "@/utils/axios.error.handler";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AuthResponse,
  checkAuthRequest,
  logoutRequest,
  signinRequest,
  signupRequest,
} from "../../api/api";

interface AuthState {
  name: string;
  email: string;
  token: string;
  isAuthenticated: boolean;
  success: string | null;
  error: string | null;
}

const initialState: AuthState = {
  name: "",
  email: "",
  token: "",
  isAuthenticated: false,
  success: null,
  error: null,
};

export const signin = createAsyncThunk(
  "auth/signin",
  async (formData: SigninFormData, { rejectWithValue }) => {
    try {
      const response: AuthResponse = await signinRequest(formData);
      return {
        token: response.token,
        email: formData.email,
      };
    } catch (error) {
      const errorMessage: string = getErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (formData: SignupFormData, { rejectWithValue }) => {
    try {
      const response: AuthResponse = await signupRequest(formData);
      return {
        token: response.token,
        email: formData.email,
        name: formData.name,
      };
    } catch (error) {
      const errorMessage: string = getErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutRequest();
    } catch (error) {
      const errorMessage: string = getErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const checkAuth = createAsyncThunk(
  "auth/check-auth",
  async (_, { rejectWithValue }) => {
    try {
      const isAuthenticated = await checkAuthRequest();

      console.log("isAuthenticated in checkAuth", isAuthenticated);
      

      return isAuthenticated;
    } catch (error) {
      const errorMessage: string = getErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  },
);

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
        state.success = "success";
        state.error = null;
      })
      .addCase(signin.rejected, (state, action) => {
        state.token = "";
        state.email = "";
        state.name = "";
        state.isAuthenticated = false;
        state.success = null;
        state.error = action.payload as string;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.isAuthenticated = true;
        state.success = "Email Sent Successfully";
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.token = "";
        state.email = "";
        state.name = "";
        state.isAuthenticated = false;
        state.success = null;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = "";
        state.email = "";
        state.name = "";
        state.success = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
