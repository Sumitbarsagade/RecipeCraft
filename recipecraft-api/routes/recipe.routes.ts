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

import { recipes, searchTrendingRecipes, recipesSearch, recipesFeed, getRecipe, postRecipe, updateRecipe, deleteRecipe, likeRecipe, saveRecipe, getRecipes} from '../controllers/recipeController'

const express = require('express');

const router = express.Router();

router.get('/', recipes);

router.get('/search?q=', recipesSearch);

router.get('/trending', searchTrendingRecipes);

router.get('/feed', recipesFeed);

router.get('/:slug', getRecipe);

router.post('/', postRecipe);

router.put('/:id', updateRecipe);

router.Delete('/:id', deleteRecipe);

router.post('/:id/like', likeRecipe);

router.post('/:id/save',saveRecipe);

router.get('/user/:userId', getRecipes );


module.exports = router;