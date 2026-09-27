import axiosInstance
  from "../../api/axiosInstance";

import type {
  UserResponse,
  UpdateUserProfileRequest,
  DeleteUserResponse,
} from "./userTypes";


export const getUserProfile =
  async (): Promise<UserResponse> => {
    const response =
      await axiosInstance.get<UserResponse>(
        "/users/me"
      );

    return response.data;
  };


export const editUserProfile = async (
  data: UpdateUserProfileRequest
): Promise<UserResponse> => {
  const response =
    await axiosInstance.put<UserResponse>(
      "/users/me",
      data
    );

  return response.data;
};


export const deleteUserProfile =
  async (): Promise<DeleteUserResponse> => {
    const response =
      await axiosInstance.delete<DeleteUserResponse>(
        "/users/me"
      );

    return response.data;
  };