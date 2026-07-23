import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  requestOtp,
  resetPassword,
} from '../controllers/authController';

const router = Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);
router.post('/request-otp', requestOtp);
router.post('/reset-password', resetPassword);

// Private routes (auth middleware to be added)
router.post('/logout', logoutUser);

export default router;
