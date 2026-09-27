import type { User }
  from "../../types/user.types";

export interface UpdateUserProfileRequest {
  fullName?: string;
  username?: string;
  bio?: string;
  profileImage?: string;
  location?: string;
  website?: string;
}

export interface UserResponse {
  success: boolean;
  message: string;

  data: {
    user: User;
  };
}

export interface DeleteUserResponse {
  success: boolean;
  message: string;
}