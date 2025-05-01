import {
  addMovieToFavoriteListRequest,
  checkLoggedInProfileRequest,
  createProfileRequest,
  deleteProfileRequest,
  getProfileByIdRequest,
  loginProfileRequest,
  logoutProfileRequest,
  removeMovieFromFavoriteListRequest,
  updateProfileRequest,
} from "@/api/api";
import IBaseMovie from "@/api/interfaces/IBaseMovie";
import IProfile from "@/api/interfaces/IProfile";
import { ProfileFormData } from "@/schemas/profile.schema";
import { getErrorMessage } from "@/utils/axios.error.handler";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ProfileState {
  profile: IProfile | null;
  isProfileLoggedIn: boolean;
  error: string | null;
  isSuccess: boolean;
}

const initialState: ProfileState = {
  profile: null,
  isProfileLoggedIn: false,
  error: null,
  isSuccess: false,
};

export const createNewProfile = createAsyncThunk(
  "profile/createProfile",
  async (profileData: ProfileFormData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", profileData.name);
      if (profileData.image) {
        formData.append("image", profileData.image);
      }

      const { profile } = await createProfileRequest({
        name: profileData.name,
        image: profileData.image,
      });
      return {
        name: profile.name,
        image: profile.image,
        moviesFavoriteList: profile.moviesFavoriteList,
      };
    } catch (error) {
      const errorMessage: string = getErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const loginProfile = createAsyncThunk(
  "profile/loginProfile",
  async (profile: IProfile, { rejectWithValue }) => {
    try {
      await loginProfileRequest(profile);
      const { profile: newProfile } = await getProfileByIdRequest();

      return {
        name: newProfile.name,
        image: newProfile.image,
        moviesFavoriteList: newProfile.moviesFavoriteList,
      };
    } catch (error) {
      const errorMessage: string = getErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const logoutProfile = createAsyncThunk(
  "profile/logoutProfile",
  async (_, { rejectWithValue }) => {
    try {
      await logoutProfileRequest();
    } catch (error) {
      const errorMessage: string = getErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const checkLoggedInProfile = createAsyncThunk(
  "profile/checkLoggedInProfile",
  async (_, { rejectWithValue }) => {
    try {
      const { profile } = await checkLoggedInProfileRequest();

      return {
        name: profile.name,
        image: profile.image,
        moviesFavoriteList: profile.moviesFavoriteList,
      };
    } catch (error) {
      const errorMessage: string = getErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const getProfileById = createAsyncThunk(
  "profile/getProfileById",
  async (_, { rejectWithValue }) => {
    try {
      const { profile } = await getProfileByIdRequest();
      return {
        name: profile.name,
        image: profile.image,
        moviesFavoriteList: profile.moviesFavoriteList,
      };
    } catch (error) {
      const errorMessage: string = getErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (profileData: ProfileFormData, { rejectWithValue }) => {
    try {
      const { profile } = await updateProfileRequest(profileData);

      return {
        name: profile.name,
        image: profile.image,
        moviesFavoriteList: profile.moviesFavoriteList,
      };
    } catch (error) {
      const errorMessage: string = getErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const addMovieToFavoriteList = createAsyncThunk(
  "profile/addMovieToFavoriteList",
  async (movie: IBaseMovie, { rejectWithValue }) => {
    try {
      const res = await addMovieToFavoriteListRequest(movie);
      return {
        moviesFavoriteList: res.myList,
      };
    } catch (error) {
      const errorMessage: string = getErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const removeMovieFromFavoriteList = createAsyncThunk(
  "profile/removeMovieFromFavoriteList",
  async (movieId: number, { rejectWithValue }) => {
    try {
      const res = await removeMovieFromFavoriteListRequest(movieId);

      return {
        moviesFavoriteList: res.myList,
      };
    } catch (error) {
      const errorMessage: string = getErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const deleteProfile = createAsyncThunk(
  "profile/deleteProfile",
  async (profileName: string, { rejectWithValue }) => {
    try {
      await deleteProfileRequest(profileName);
    } catch (error) {
      const errorMessage: string = getErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfileErrors: (state) => {
      state.error = null;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewProfile.pending, (state) => {
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(createNewProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isProfileLoggedIn = true;
        state.error = null;
        state.isSuccess = true;
      })
      .addCase(createNewProfile.rejected, (state, action) => {
        state.profile = null;
        state.isProfileLoggedIn = false;
        state.error = action.payload as string;
        state.isSuccess = false;
      })
      .addCase(loginProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isProfileLoggedIn = true;
        state.error = null;
        state.isSuccess = true;
      })
      .addCase(loginProfile.rejected, (state, action) => {
        state.profile = null;
        state.isProfileLoggedIn = false;
        state.error = action.payload as string;
        state.isSuccess = false;
      })
      .addCase(logoutProfile.fulfilled, (state) => {
        state.profile = null;
        state.isProfileLoggedIn = false;
        state.error = null;
        state.isSuccess = true;
      })
      .addCase(logoutProfile.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isSuccess = false;
      })
      .addCase(checkLoggedInProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isProfileLoggedIn = true;
        state.error = null;
        state.isSuccess = true;
      })
      .addCase(checkLoggedInProfile.rejected, (state) => {
        state.profile = null;
        state.isProfileLoggedIn = false;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(getProfileById.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isProfileLoggedIn = true;
        state.error = null;
        state.isSuccess = true;
      })
      .addCase(getProfileById.rejected, (state, action) => {
        state.profile = null;
        state.isProfileLoggedIn = false;
        state.error = action.payload as string;
        state.isSuccess = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isProfileLoggedIn = true;
        state.error = null;
        state.isSuccess = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.profile = null;
        state.isProfileLoggedIn = false;
        state.error = action.payload as string;
        state.isSuccess = false;
      })
      .addCase(addMovieToFavoriteList.fulfilled, (state, action) => {
        const updatedProfile = state.profile;
        if (updatedProfile) {
          updatedProfile.moviesFavoriteList = action.payload.moviesFavoriteList;
        }
        state.profile = updatedProfile;
        state.isProfileLoggedIn = true;
        state.error = null;
        state.isSuccess = true;
      })
      .addCase(addMovieToFavoriteList.rejected, (state, action) => {
        state.profile = null;
        state.isProfileLoggedIn = false;
        state.error = action.payload as string;
        state.isSuccess = false;
      })
      .addCase(removeMovieFromFavoriteList.fulfilled, (state, action) => {
        const updatedProfile = state.profile;
        if (updatedProfile) {
          updatedProfile.moviesFavoriteList = action.payload.moviesFavoriteList;
        }
        state.profile = updatedProfile;
        state.isProfileLoggedIn = true;
        state.error = null;
        state.isSuccess = true;
      })
      .addCase(removeMovieFromFavoriteList.rejected, (state, action) => {
        state.profile = null;
        state.isProfileLoggedIn = false;
        state.error = action.payload as string;
        state.isSuccess = false;
      })
      .addCase(deleteProfile.fulfilled, (state) => {
        state.profile = null;
        state.isProfileLoggedIn = false;
        state.error = null;
        state.isSuccess = true;
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.profile = null;
        state.isProfileLoggedIn = false;
        state.error = action.payload as string;
        state.isSuccess = false;
      });
  },
});

export const { clearProfileErrors } = profileSlice.actions;

export default profileSlice.reducer;
