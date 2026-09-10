export interface User {
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
  name: string;
  username?: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;

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