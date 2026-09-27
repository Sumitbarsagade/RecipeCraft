export interface User {
  _id: string;
   name: string;
  fullName?: string;
  username: string;
  email: string;

  bio?: string;
  profileImage?: string;

  location?: string;
  website?: string;

  followers?: string[];
  following?: string[];
  isVerified?: boolean;

  role?: "user" | "admin";

  createdAt?: string;
  updatedAt?: string;
}