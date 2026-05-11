const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const userEmail = process.env.EMAIL_USERNAME;
// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register a new user
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  
  const lowercaseUsername = username.toLowerCase();
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username: lowercaseUsername, email, password: hashedPassword });
    
    await newUser.save();
    
    const token = generateToken(newUser._id);
    res.status(201).json({ token: token, message: 'User registered successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error'});
    console.log(error)
  }
};

// User login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid email or password' });

    const token = generateToken(user._id);
    res.status(200).json({ token:token, message:"login Successfully" });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


  // Store OTP temporarily (for demo purposes, you can store this in Redis or DB)
  let otpStore = {};

// Forgot password
exports.requestOtp = async (req, res) => {


  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });


    // Generate OTP (e.g., 6 digits)
    const otp = crypto.randomInt(100000, 999999);

    // Store OTP temporarily with an expiry time (e.g., 10 minutes)
    otpStore[email] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 }; // 10 minutes expiration
  
     // Store OTP temporarily with an expiry time (e.g., 10 minutes)
     otpStore[email] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 }; // 10 minutes expiration

    // Generate password reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry
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

// Validate OTP
exports.validateOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const storedOtp = otpStore[email];

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

// Reset Password
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const storedOtp = otpStore[email];

    // Validate OTP again before allowing password reset
    if (!storedOtp || storedOtp.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'OTP expired or invalid' });
    }

    if (parseInt(otp) !== storedOtp.otp) {
      return res.status(400).json({ message: 'Incorrect OTP' });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    // Clear OTP after successful password reset
    delete otpStore[email];

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Error resetting password' });
  }
};