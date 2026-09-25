import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  requestOtp,
  resetPassword,
  getCurrentUser,
} from "../controllers/authController";
import protect from "../middleware/authMiddleware";

const router = Router();

// Public routes
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getCurrentUser)
router.post("/refresh-token", refreshToken);
router.post("/request-otp", requestOtp);
router.post("/reset-password", resetPassword);

// Private routes (auth middleware to be added)
router.post("/logout", logoutUser);

export default router;
