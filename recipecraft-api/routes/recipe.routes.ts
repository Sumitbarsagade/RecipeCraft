import { Router } from 'express';
import {
  getAllRecipes,
  searchRecipes,
  getTrendingRecipes,
  getRecipeFeed,
  getRecipeBySlug,
  createRecipe,
  updateRecipeById,
  deleteRecipeById,
  likeRecipeById,
  saveRecipeById,
  getRecipesByUserId,
} from '../controllers/recipeController';
import protect from '../middleware/authMiddleware';


const router = Router();

// Private routes (auth middleware to be added)
router.get("/my",protect, getRecipesByUserId);

// Public routes
router.get('/', getAllRecipes);
router.get('/search', searchRecipes);
router.get('/trending', getTrendingRecipes);
  // must be before /:slug
router.get('/:slug', getRecipeBySlug);




export default router;
