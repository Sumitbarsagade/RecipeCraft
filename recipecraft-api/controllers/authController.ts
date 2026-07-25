import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { otpStore } from '../middleware/otpStore';
import crypto from 'crypto'; // Import crypto module
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

export const registerUser = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      res.status(400).json({
        success: false,
        message: "Request body is missing",
      });
      return;
    }
    


    const { username, email, password } = req.body;
    console.log("userName" ,username);
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

    const hashedToken = await bcrypt.hash(refreshToken, salt);
    
    user.refreshToken = hashedToken;

    await user.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      accessToken, hashedToken
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

export const requestOtp = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });


    // Generate OTP (e.g., 6 digits)
    const otp = crypto.randomInt(100000, 999999);


    // Store OTP temporarily with an expiry time (e.g., 10 minutes)
    otpStore.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 }); // 10 minutes expiration
  
    

    // Generate password reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetOtpExpire = new Date(Date.now() + 3600000); // 1 hour expiry
    await user.save();

    const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;

    // Set up email transport (replace with real service credentials)
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_APP_PASSWORD
      }
    });

    const mailOptions = {
      to: user.email,
      from: userEmail,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);


    res.status(200).json({ message: 'OTP sent to email' });
  } catch (error) {
    console.error('Error sending OTP: ', error);
    res.status(500).json({ message: 'Error sending OTP' });
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

// Validate OTP
export const validateOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
   
  const user = await User.findOne({email});

  if (!user) return res.status(400).json({ message: 'Invalid email or password' });

  try {
    const storedOtp = otpStore.get(email);

    // Check if OTP exists and is valid
    if (!storedOtp || storedOtp.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'OTP expired or invalid' });
    }

    // Check if OTP matches
    if (parseInt(otp) !== storedOtp.otp) {
      return res.status(400).json({ message: 'Incorrect OTP' });
    }

    res.status(200).json({ message: 'OTP validated successfully' });
  } catch (error) {
    console.error('Error validating OTP:', error);
    res.status(500).json({ message: 'Error validating OTP' });
  }
};