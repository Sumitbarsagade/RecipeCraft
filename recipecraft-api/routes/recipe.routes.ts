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
  // must be before /:slug
router.get('/:slug', getRecipeBySlug);

// Private routes (auth middleware to be added)
router.get('/user', (req, res) => {
    console.log("MY RECIPES ROUTE HIT");
    
    res.status(200).json({
      success: true,
      message: "My recipes route works",
    });
  });
router.get('/feed',protect, getRecipeFeed);
router.post('/', protect, createRecipe);
router.put('/:id', protect, updateRecipeById);
router.delete('/:id', protect, deleteRecipeById);
router.post('/:id/like', protect,  likeRecipeById);
router.post('/:id/save', protect, saveRecipeById);

export default router;
