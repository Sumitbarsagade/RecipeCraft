import mongoose, { Document, Schema } from 'mongoose';

import type { IUser } from '../types/user.types';

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: 250,
    },
    location: {
      type: String,
      maxlength: 250
    },
    website: {
      type: String,
      maxLength: 160
    },
    followers: {
      type: [String],
      default: [],
    },
    following: {
      type: [String],
      default: [],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    resetOtp: {
      type: String,
    },
    resetOtpExpire: {
      type: Date,
    },
    resetPasswordToken:{
      type: String,
    }
  },
  { timestamps: true },


);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
