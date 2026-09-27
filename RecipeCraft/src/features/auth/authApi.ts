import axiosInstance from "../../api/axiosInstance";

import type {
  LoginRequest,
  SignupRequest,
  AuthResponse,
  CurrentUserResponse,
} from "./authTypes";

/* =========================================================
   LOGIN
========================================================= */

export const loginUser = async (
  credentials: LoginRequest
): Promise<AuthResponse> => {
  const response =
    await axiosInstance.post<AuthResponse>(
      "/auth/login",
      credentials
    );

  return response.data;
};




/* =========================================================
   SIGNUP
========================================================= */

export const signupUser = async (
  userData: SignupRequest
): Promise<AuthResponse> => {
  const response =
    await axiosInstance.post<AuthResponse>(
      "/auth/signup",
      userData
    );

  return response.data;
};


/* =========================================================
   GET CURRENT USER
========================================================= */

export const getCurrentUser =
  async (): Promise<CurrentUserResponse> => {
    const response =
      await axiosInstance.get<CurrentUserResponse>(
        "/auth/me"
      );
    console.log("response :",response);
    return response.data;
  };


/* =========================================================
   LOGOUT
========================================================= */

export const logoutUser =
  async (): Promise<void> => {
    await axiosInstance.post(
      "/auth/logout"
    );
  };


/* =========================================================
   REFRESH ACCESS TOKEN
========================================================= */

export const refreshAccessToken =
  async (): Promise<AuthResponse> => {
    const response =
      await axiosInstance.post<AuthResponse>(
        "/auth/refresh-token"
      );
  console.log(response)
    return response.data;
  };