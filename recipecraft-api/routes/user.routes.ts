import { Router } from 'express';
import {
  getProfile,
  updateProfile,
  deleteProfile,
  getFollowersById,
  getFollowingById,
  getUserByUsername,
  followUserById,
  getSavedRecipes,
} from '../controllers/userController.js';

const router = Router();

// Private routes (auth middleware to be added)
router.get('/me', getProfile);
router.put('/me', updateProfile);
router.delete('/me', deleteProfile);
router.get('/me/saved-recipes', getSavedRecipes);  // must be before /:username

// Public routes
router.get('/:username', getUserByUsername);
router.get('/:id/followers', getFollowersById);
router.get('/:id/following', getFollowingById);

// Private routes
router.post('/:id/follow', followUserById);

export default router;
