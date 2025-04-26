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
import IProfileData from "@/api/interfaces/IProfileData";
import { ProfileFormData } from "@/schemas/profile.schema";
import { getErrorMessage } from "@/utils/axios.error.handler";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ProfileState {
  profile: IProfile | null;
  isProfileLoggedIn: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  isProfileLoggedIn: false,
  error: null,
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
  async (profileData: IProfileData, { rejectWithValue }) => {
    try {
      const res = await updateProfileRequest(profileData);
      return {
        name: res.name,
        image: res.image,
        moviesFavoriteList: res.moviesFavoriteList,
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
        name: res.name,
        image: res.image,
        moviesFavoriteList: res.moviesFavoriteList,
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
        name: res.name,
        image: res.image,
        moviesFavoriteList: res.moviesFavoriteList,
      };
    } catch (error) {
      const errorMessage: string = getErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const deleteProfile = createAsyncThunk(
  "profile/deleteProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await deleteProfileRequest();
      return {
        name: res.name,
        image: res.image,
        moviesFavoriteList: res.moviesFavoriteList,
      };
    } catch (error) {
      const errorMessage: string = getErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isProfileLoggedIn = true;
        state.error = null;
      })
      .addCase(createNewProfile.rejected, (state, action) => {
        state.profile = null;
        state.isProfileLoggedIn = false;
        state.error = action.payload as string;
      })
      .addCase(loginProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isProfileLoggedIn = true;
        state.error = null;
      })
      .addCase(loginProfile.rejected, (state, action) => {
        state.profile = null;
        state.isProfileLoggedIn = false;
        state.error = action.payload as string;
      })
      .addCase(logoutProfile.fulfilled, (state) => {
        state.profile = null;
        state.isProfileLoggedIn = false;
        state.error = null;
      })
      .addCase(logoutProfile.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(checkLoggedInProfile.fulfilled, (state, action) => {
        console.log("action payload", action.payload);

        state.profile = action.payload;
        state.isProfileLoggedIn = true;
        state.error = null;
      })
      .addCase(checkLoggedInProfile.rejected, (state, action) => {
        state.profile = null;
        state.isProfileLoggedIn = false;
        state.error = action.payload as string;
      })
      .addCase(getProfileById.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isProfileLoggedIn = true;
        state.error = null;
      })
      .addCase(getProfileById.rejected, (state, action) => {
        state.profile = null;
        state.isProfileLoggedIn = false;
        state.error = action.payload as string;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isProfileLoggedIn = true;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.profile = null;
        state.isProfileLoggedIn = false;
        state.error = action.payload as string;
      })
      .addCase(addMovieToFavoriteList.fulfilled, (state, action) => {
        const updatedProfile = state.profile;
        if (updatedProfile) {
          updatedProfile.moviesFavoriteList = action.payload.moviesFavoriteList;
        }
        state.profile = updatedProfile;
        state.isProfileLoggedIn = true;
        state.error = null;
      })
      .addCase(addMovieToFavoriteList.rejected, (state, action) => {
        state.profile = null;
        state.isProfileLoggedIn = false;
        state.error = action.payload as string;
      })
      .addCase(removeMovieFromFavoriteList.fulfilled, (state, action) => {
        const updatedProfile = state.profile;
        if (updatedProfile) {
          updatedProfile.moviesFavoriteList = action.payload.moviesFavoriteList;
        }
        state.profile = updatedProfile;
        state.isProfileLoggedIn = true;
        state.error = null;
      })
      .addCase(removeMovieFromFavoriteList.rejected, (state, action) => {
        state.profile = null;
        state.isProfileLoggedIn = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProfile.fulfilled, (state) => {
        state.profile = null;
        state.isProfileLoggedIn = false;
        state.error = null;
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.profile = null;
        state.isProfileLoggedIn = false;
        state.error = action.payload as string;
      });
  },
});

export default profileSlice.reducer;
