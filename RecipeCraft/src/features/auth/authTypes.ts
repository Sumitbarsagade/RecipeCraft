import type { ApiResponse } from "../../api/apiTypes";

export interface User {
  success: any;
  _id: string;
  name: string;
  email: string;
  username?: string;
  profileImage?: string;
  bio?: string;
  role?: string;
  isEmailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
 
  username?: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse  {

  data: {
    user: User;
    accessToken?: string;
    
  };
}

export interface CurrentUserResponse {
  success: boolean;
  message?: string;
  data: {
    user: User;
  };
}




export type LoginResponse =
  ApiResponse<AuthResponse>;

export interface LoginResult {
  success: boolean;
  status: number;
  message: string;
  user: User;
}  