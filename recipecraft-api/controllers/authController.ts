import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import sendMail from '../utils/sendMail.js';

// ---------------------------------------------------------------------------
// Token helpers
// ---------------------------------------------------------------------------

const generateAccessToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
};

const generateRefreshToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '7d' });
};

// ---------------------------------------------------------------------------
// Register
// ---------------------------------------------------------------------------

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ success: false, message: 'All fields are required' });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: 'Email already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ username, email, password: hashedPassword });

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      accessToken,
    });
  } catch (error) {
    console.error('registerUser error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ---------------------------------------------------------------------------
// Login
// ---------------------------------------------------------------------------

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password are required' });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    user.refreshToken = refreshToken;
    await user.save();

    // Send refresh token as an httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ success: true, message: 'Login successful', accessToken });
  } catch (error) {
    console.error('loginUser error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ---------------------------------------------------------------------------
// Logout
// ---------------------------------------------------------------------------

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('logoutUser error:', error);
    res.status(500).json({ success: false, message: 'Logout failed' });
  }
};

// ---------------------------------------------------------------------------
// Refresh Token
// ---------------------------------------------------------------------------

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.cookies?.refreshToken;

    if (!token) {
      res.status(401).json({ success: false, message: 'No refresh token provided' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as { id: string };

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== token) {
      res.status(403).json({ success: false, message: 'Invalid refresh token' });
      return;
    }

    const newAccessToken = generateAccessToken(user._id.toString());

    res.status(200).json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    console.error('refreshToken error:', error);
    res.status(403).json({ success: false, message: 'Invalid or expired refresh token' });
  }
};

// ---------------------------------------------------------------------------
// Forgot Password
// ---------------------------------------------------------------------------

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ success: false, message: 'Email is required' });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Return a generic message to avoid user enumeration
      res.status(200).json({ success: true, message: 'If that email exists, an OTP has been sent' });
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.resetOtp = otp;
    user.resetOtpExpire = otpExpire;
    await user.save();

    await sendMail(user.email, 'Password Reset OTP', `Your OTP for password reset is: ${otp}. It expires in 10 minutes.`);

    res.status(200).json({ success: true, message: 'If that email exists, an OTP has been sent' });
  } catch (error) {
    console.error('forgotPassword error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ---------------------------------------------------------------------------
// Reset Password
// ---------------------------------------------------------------------------

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, newPassword, resetOtp } = req.body;

    if (!email || !newPassword || !resetOtp) {
      res.status(400).json({ success: false, message: 'All fields are required' });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    if (resetOtp !== user.resetOtp) {
      res.status(400).json({ success: false, message: 'Invalid OTP' });
      return;
    }

    if (!user.resetOtpExpire || user.resetOtpExpire < new Date()) {
      res.status(400).json({ success: false, message: 'OTP has expired' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Clear OTP fields after successful reset
    user.set('resetOtp', undefined);
    user.set('resetOtpExpire', undefined);

    await user.save();

    res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error('resetPassword error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
