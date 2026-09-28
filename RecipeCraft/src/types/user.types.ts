export interface User {
  _id: string;
  name?: string;

  username: string;
  email: string;

  bio?: string;
  avatar?: string;

  location?: string;
  website?: string;

  followers?: string[];
  following?: string[];
  isVerified?: boolean;

  role?: "user" | "admin";

  createdAt?: string;
  updatedAt?: string;
}


export interface ProfileInformationProps {
  isEditing: boolean;
  name?: string;
  username: string;
  email: string;
  bio?: string;
  location?: string;
  website?: string;


  setName: (value: string) => void;
  setUsername: (value: string) => void;
  setBio: (value: string) => void;
  setLocation: (value: string) => void;
  setWebsite: (value: string) => void;

}