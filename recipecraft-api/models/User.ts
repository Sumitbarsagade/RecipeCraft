//id, username, email, password, avatar, bio, followers, following, isVerifed, refreshToken, role, createdAt

import mongoose = require("mongoose");
import crypto = require("crypto");


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  avatar:{
    type: String
  },

  bio:{
    type: String,
    length: 250
  },
  followers:{
    type: [String]
  },
  following:{
    type: [String]
  },
  isVerified:{
    type: Boolean,
    default: false
  },
  refreshToken:{
    type: String
  },
  role:{
    type: String,
    default: 'user'
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
  resetPasswordExpires:Date,
  resetOtp:String,
  resetOtpExpire: Date,

}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;
