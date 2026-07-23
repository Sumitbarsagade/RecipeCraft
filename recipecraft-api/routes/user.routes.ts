import { Router } from 'express';
import {
  getProfile,
  updateProfile,
  deleteProfile,

  getUserByUsername,

  getSavedRecipes,
} from '../controllers/userController';

const router = Router();

// Private routes (auth middleware to be added)
router.get('/me', getProfile);
router.put('/me', updateProfile);
router.delete('/me', deleteProfile);
router.get('/me/saved-recipes', getSavedRecipes);  // must be before /:username

// Public routes
router.get('/:username', getUserByUsername);


export default router;
