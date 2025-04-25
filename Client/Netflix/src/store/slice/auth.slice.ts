import { SigninFormData, SignupFormData } from "@/schemas/auth.schema";
import { getErrorMessage } from "@/utils/axios.error.handler";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AuthResponse,
  checkAuthRequest,
  logoutUserRequest,
  signinRequest,
  signupRequest,
  verifyEmailRequest,
} from "../../api/api";

interface AuthState {
  name: string;
  email: string;
  token: string;
  isAuthenticated: boolean;
  emailVerified: boolean;
  success: string | null;
  error: string | null;
}

// Define a type for the verification response
interface VerifyEmailResponse {
  success: boolean;
  message: string;
  emailVerified: boolean;
}

const initialState: AuthState = {
  name: "",
  email: "",
  token: "",
  isAuthenticated: false,
  emailVerified: false,
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

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUserRequest();
    } catch (error) {
      const errorMessage: string = getErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const verifyEmail = createAsyncThunk<
  VerifyEmailResponse,
  string,
  { rejectValue: string }
>("auth/verify-email", async (token: string, { rejectWithValue }) => {
  try {
    console.log("in verify email thunk", token);
    const res = await verifyEmailRequest(token);

    // Return both the API response and our custom field
    return {
      ...res,
      emailVerified: res.success,
    };
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const checkAuth = createAsyncThunk(
  "auth/check-auth",
  async (_, { rejectWithValue }) => {
    try {
      const authCheck = await checkAuthRequest();

      return authCheck;
    } catch (error) {
      console.log("error in check auth", error);

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
        state.isAuthenticated = false;
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
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = "";
        state.email = "";
        state.name = "";
        state.success = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
        state.emailVerified = action.payload.emailVerified ?? false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.emailVerified = false;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.emailVerified = action.payload.emailVerified;
        state.success = action.payload.message;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.error = action.payload as string;
        state.emailVerified = false;
      });
  },
});

export default authSlice.reducer;
