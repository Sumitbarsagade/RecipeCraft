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

// Public routes
router.get('/', getAllRecipes);
router.get('/search', searchRecipes);
router.get('/trending', getTrendingRecipes);
router.get('/user/:userId', getRecipesByUserId);  // must be before /:slug
router.get('/:slug', getRecipeBySlug);

// Private routes (auth middleware to be added)
router.use(protect)
router.get('/feed', getRecipeFeed);
router.post('/', createRecipe);
router.put('/:id', updateRecipeById);
router.delete('/:id', deleteRecipeById);
router.post('/:id/like', likeRecipeById);
router.post('/:id/save', saveRecipeById);

export default router;
