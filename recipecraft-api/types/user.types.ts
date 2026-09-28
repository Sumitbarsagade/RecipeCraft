export interface IUser {
  username: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  location?: string;
  bio?: string;
  website?: string;
  followers: string[];
  following: string[];
  isVerified: boolean;
  refreshToken?: string;
  role: 'user' | 'admin';
  resetOtp?: string;
  resetOtpExpire?: Date;
  resetPasswordToken?: string;
}