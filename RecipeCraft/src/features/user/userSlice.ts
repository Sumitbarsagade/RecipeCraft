import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import {
  getUserProfile,
  editUserProfile,
  deleteUserProfile,
} from "./userApi";

import type {
  UpdateUserProfileRequest,
} from "./userTypes";

import type { User }
  from "../../types/user.types";

import {
  syncAuthUser,
} from "../auth/authSlice";


import {
  clearAuth,
} from "../auth/authSlice";

interface UserState {
  profile: User | null;

  isLoading: boolean;
  isUpdating: boolean;
  isDeleting: boolean;

  error: string | null;
}


const initialState: UserState = {
  profile: null,

  isLoading: false,
  isUpdating: false,
  isDeleting: false,

  error: null,
};


/* GET */

export const fetchUserProfile =
  createAsyncThunk<
    User,
    void,
    { rejectValue: string }
  >(
    "user/fetchProfile",
    async (_, thunkAPI) => {
      try {
        const response =
          await getUserProfile();

        return response.data.user;
      } catch {
        return thunkAPI.rejectWithValue(
          "Unable to load profile."
        );
      }
    }
  );


/* PUT */

export const updateUserProfile =
  createAsyncThunk<
    User,
    UpdateUserProfileRequest,
    { rejectValue: string }
  >(
    "user/updateProfile",
    async (data, thunkAPI) => {
      try {
        const response =
          await editUserProfile(data);
        const updatedUser = response.data.user;
          // Synchronize auth user
        thunkAPI.dispatch(
          syncAuthUser({
            username: updatedUser.username,
            fullName: updatedUser.fullName,
            profileImage:
              updatedUser.profileImage,
            email: updatedUser.email,
          })
        );

        return response.data.user;
      } catch {
        return thunkAPI.rejectWithValue(
          "Unable to update profile."
        );
      }
    }
  );


/* DELETE */

export const deleteUserAccount =
  createAsyncThunk<
    string,
    void,
    { rejectValue: string }
  >(
    "user/deleteAccount",
    async (_, thunkAPI) => {
      try {
        const response =
          await deleteUserProfile();

        localStorage.removeItem(
          "accessToken"
        );

        thunkAPI.dispatch(
          clearAuth()
        );

        return response.message;
      } catch {
        return thunkAPI.rejectWithValue(
          "Unable to delete account."
        );
      }
    }
  );


const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    clearUserProfile: (state) => {
      state.profile = null;
      state.error = null;
    },

    clearUserError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // GET
      .addCase(
        fetchUserProfile.pending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchUserProfile.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.profile = action.payload;
        }
      )

      .addCase(
        fetchUserProfile.rejected,
        (state, action) => {
          state.isLoading = false;

          state.error =
            action.payload ??
            "Unable to load profile.";
        }
      )


      // PUT
      .addCase(
        updateUserProfile.pending,
        (state) => {
          state.isUpdating = true;
          state.error = null;
        }
      )

      .addCase(
        updateUserProfile.fulfilled,
        (state, action) => {
          state.isUpdating = false;
          state.profile = action.payload;
        }
      )

      .addCase(
        updateUserProfile.rejected,
        (state, action) => {
          state.isUpdating = false;

          state.error =
            action.payload ??
            "Unable to update profile.";
        }
      )


      // DELETE
      .addCase(
        deleteUserAccount.pending,
        (state) => {
          state.isDeleting = true;
          state.error = null;
        }
      )

      .addCase(
        deleteUserAccount.fulfilled,
        (state) => {
          state.isDeleting = false;
          state.profile = null;
        }
      )

      .addCase(
        deleteUserAccount.rejected,
        (state, action) => {
          state.isDeleting = false;
          state.profile= null;
          state.error =
            action.payload ??
            "Unable to delete account.";
        }
      );
  },
});


export const {
  clearUserProfile,
  clearUserError,
} = userSlice.actions;

export default userSlice.reducer;