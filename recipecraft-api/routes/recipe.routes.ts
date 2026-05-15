/*
GET
/api/recipes
Get all published recipes (pagination, filter, sort)
Public
GET
/api/recipes/search?q=
Full-text search by title, tag, ingredient
Public
GET
/api/recipes/trending
Get trending recipes (by likes + views)
Public
GET
/api/recipes/feed
Personalized feed from followed users
Private
GET
/api/recipes/:slug
Get single recipe by slug, increment views
Public
POST
/api/recipes
Create new recipe (with image upload)
Private
PUT
/api/recipes/:id
Update recipe (author only)
Private
DELETE
/api/recipes/:id
Delete recipe and its comments (author only)
Private
POST
/api/recipes/:id/like
Like or unlike recipe (toggle)
Private
POST
/api/recipes/:id/save
Save or unsave recipe to bookmarks (toggle)
Private
GET
/api/recipes/user/:userId
Get all recipes by a specific user
Public


*/

const {
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
  getRecipesByUserId
} = require('../controllers/recipeController');


const { protect } = require('../middleware/authMiddleware');
const upload  = require('../middleware/multer')



const express = require('express');

const router = express.Router();

// Get all recipes
router.get('/', getAllRecipes);

// Search recipes
router.get('/search', searchRecipes);

// Trending recipes
router.get('/trending', getTrendingRecipes);

// Recipe feed
router.get('/feed', getRecipeFeed);

// Get single recipe by slug
router.get('/:slug', getRecipeBySlug);

// Create recipe
router.post('/', upload.single('image') ,createRecipe);

// Update recipe
router.put('/:id', protect, updateRecipeById);

// Delete recipe
router.delete('/:id',protect, deleteRecipeById);

// Like recipe
router.post('/:id/like', protect, likeRecipeById);

// Save recipe
router.post('/:id/save', protect, saveRecipeById);

// Get recipes by user
router.get('/user/:userId',  getRecipesByUserId);

module.exports = router;