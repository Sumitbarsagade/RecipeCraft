import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import {
  loginUser,
  signupUser,
  logoutUser,
  getCurrentUser,
} from "./authApi";

import type {
  User,
  LoginRequest,
  SignupRequest,
} from "./authTypes";


/* =========================================================
   STATE
========================================================= */

interface AuthState {
  user: User | null;

  isAuthenticated: boolean;

  isLoading: boolean;

  error: string | null;

  initialized: boolean;
}


const initialState: AuthState = {
  user: null,

  isAuthenticated: false,

  isLoading: false,

  error: null,

  initialized: false,
};


/* =========================================================
   LOGIN
========================================================= */

export const login = createAsyncThunk<
  User,
  LoginRequest,
  { rejectValue: string }
>(
  "auth/login",

  async (credentials, thunkAPI) => {
    try {
      const response =
        await loginUser(credentials);

      if (
        response.data.accessToken
      ) {
        localStorage.setItem(
          "accessToken",
          response.data.accessToken
        );
      }

      return response.data.user;

    } catch (error: any) {

      const message =
        error?.response?.data?.message ||
        "Unable to login. Please try again.";

      return thunkAPI.rejectWithValue(
        message
      );
    }
  }
);


/* =========================================================
   SIGNUP
========================================================= */

export const signup = createAsyncThunk<
  User,
  SignupRequest,
  { rejectValue: string }
>(
  "auth/signup",

  async (userData, thunkAPI) => {
    try {
      const response =
        await signupUser(userData);

      if (
        response.data.accessToken
      ) {
        localStorage.setItem(
          "accessToken",
          response.data.accessToken
        );
      }

      return response.data.user;

    } catch (error: any) {

      const message =
        error?.response?.data?.message ||
        "Unable to create your account.";

      return thunkAPI.rejectWithValue(
        message
      );
    }
  }
);


/* =========================================================
   GET CURRENT USER
========================================================= */

export const fetchCurrentUser =
  createAsyncThunk<
    User,
    void,
    { rejectValue: string }
  >(
    "auth/fetchCurrentUser",

    async (_, thunkAPI) => {
      try {

        const response =
          await getCurrentUser();

        return response.data.user;

      } catch (error: any) {

        const message =
          error?.response?.data?.message ||
          "Unable to fetch user.";

        return thunkAPI.rejectWithValue(
          message
        );
      }
    }
  );


/* =========================================================
   LOGOUT
========================================================= */

export const logout =
  createAsyncThunk<
    void,
    void,
    { rejectValue: string }
  >(
    "auth/logout",

    async (_, thunkAPI) => {
      try {

        await logoutUser();

        localStorage.removeItem(
          "accessToken"
        );

      } catch (error: any) {

        /*
         * Even if the backend logout fails,
         * remove the local access token.
         */

        localStorage.removeItem(
          "accessToken"
        );

        const message =
          error?.response?.data?.message ||
          "Logout failed.";

        return thunkAPI.rejectWithValue(
          message
        );
      }
    }
  );


/* =========================================================
   SLICE
========================================================= */

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {

    clearAuthError: (state) => {
      state.error = null;
    },

    markAuthInitialized: (state) => {
      state.initialized = true;
    },

    setUser: (
      state,
      action: PayloadAction<User | null>
    ) => {
      state.user = action.payload;

      state.isAuthenticated =
        Boolean(action.payload);
    },

    clearAuth: (state) => {

      state.user = null;

      state.isAuthenticated = false;

      state.error = null;
    },
  },


  /* =======================================================
     ASYNC ACTIONS
  ======================================================= */

  extraReducers: (builder) => {

    /* ================= LOGIN ================= */

    builder

      .addCase(
        login.pending,
        (state) => {

          state.isLoading = true;

          state.error = null;
        }
      )

      .addCase(
        login.fulfilled,
        (state, action) => {

          state.isLoading = false;

          state.user =
            action.payload;

          state.isAuthenticated = true;

          state.error = null;
        }
      )

      .addCase(
        login.rejected,
        (state, action) => {

          state.isLoading = false;

          state.isAuthenticated = false;

          state.error =
            action.payload ||
            "Login failed.";
        }
      );


    /* ================= SIGNUP ================= */

    builder

      .addCase(
        signup.pending,
        (state) => {

          state.isLoading = true;

          state.error = null;
        }
      )

      .addCase(
        signup.fulfilled,
        (state, action) => {

          state.isLoading = false;

          state.user =
            action.payload;

          state.isAuthenticated = true;

          state.error = null;
        }
      )

      .addCase(
        signup.rejected,
        (state, action) => {

          state.isLoading = false;

          state.isAuthenticated = false;

          state.error =
            action.payload ||
            "Signup failed.";
        }
      );


    /* ============ CURRENT USER ============ */

    builder

      .addCase(
        fetchCurrentUser.pending,
        (state) => {

          state.isLoading = true;
        }
      )

      .addCase(
        fetchCurrentUser.fulfilled,
        (state, action) => {

          state.isLoading = false;

          state.initialized = true;

          state.user =
            action.payload;

          state.isAuthenticated = true;

          state.error = null;
        }
      )

      .addCase(
        fetchCurrentUser.rejected,
        (state) => {

          state.isLoading = false;

          state.initialized = true;

          state.user = null;

          state.isAuthenticated = false;
        }
      );


    /* ================= LOGOUT ================= */

    builder

      .addCase(
        logout.pending,
        (state) => {

          state.isLoading = true;
        }
      )

      .addCase(
        logout.fulfilled,
        (state) => {

          state.isLoading = false;

          state.user = null;

          state.isAuthenticated = false;

          state.error = null;
        }
      )

      .addCase(
        logout.rejected,
        (state) => {

          state.isLoading = false;

          state.user = null;

          state.isAuthenticated = false;
        }
      );
  },
});


export const {
  clearAuthError,
  setUser,
  clearAuth,
  markAuthInitialized
} = authSlice.actions;


export default authSlice.reducer;