import { Router } from "express";
import protect from "../middleware/authMiddleware";

import {
  getProfile,
  updateProfile,
  deleteProfile,
  getSavedRecipes,
  getUserByUsername,
} from "../controllers/userController";

const router = Router();

/* =========================================================
   PRIVATE ROUTES
========================================================= */

router.get(
  "/me",
  protect,
  getProfile
);

router.put(
  "/me",
  protect,
  updateProfile
);

router.delete(
  "/me",
  protect,
  deleteProfile
);




/* =========================================================
   PUBLIC ROUTES
========================================================= */

// Keep dynamic route LAST
router.get(
  "/:username",
  getUserByUsername
);

export default router;