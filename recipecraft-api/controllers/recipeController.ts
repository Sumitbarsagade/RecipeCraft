const Recipe = require("../models/Recipe");
const mongoose = require("mongoose");
const slugify = require("slugify");

// GET ALL RECIPES
const getAllRecipes = async (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; count?: any; recipes?: any; message?: any; }): any; new(): any; }; }; }) => {
  try {
    const recipes = await Recipe.find({ isPublished: true })
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: recipes.length,
      recipes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
};

// SEARCH RECIPES
const searchRecipes = async (req: { query: { keyword: any; category: any; cuisine: any; difficulty: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; recipes?: any; message?: any; }): any; new(): any; }; }; }) => {
  try {
    const { keyword, category, cuisine, difficulty } = req.query;

    let query: any = {
      isPublished: true,
    };

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { tags: { $regex: keyword, $options: "i" } },
      ];
    }

    if (category) query.category = category;
    if (cuisine) query.cuisine = cuisine;
    if (difficulty) query.difficulty = difficulty;

    const recipes = await Recipe.find(query)
      .populate("author", "username")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      recipes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
};

// TRENDING RECIPES
const getTrendingRecipes = async (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; recipes?: any; message?: any; }): any; new(): any; }; }; }) => {
  try {
    const recipes = await Recipe.find({ isPublished: true })
      .sort({ views: -1, createdAt: -1 })
      .limit(10);

    return res.status(200).json({
      success: true,
      recipes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
};

// RECIPE FEED
const getRecipeFeed = async (req: { query: { page: any; limit: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; page?: number; recipes?: any; message?: any; }): any; new(): any; }; }; }) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const recipes = await Recipe.find({ isPublished: true })
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      page,
      recipes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
};

// GET RECIPE BY SLUG
const getRecipeBySlug = async (req: { params: { slug: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message?: any; recipe?: any; }): any; new(): any; }; }; }) => {
  try {
    const { slug } = req.params;

    const recipe = await Recipe.findOne({ slug }).populate(
      "author",
      "username email"
    );

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    recipe.views = (recipe.views || 0) + 1;
    await recipe.save();

    return res.status(200).json({
      success: true,
      recipe,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
};

// CREATE RECIPE
const createRecipe = async (req: { body: { title: any; description: any; coverImage: any; ingredients: any; step: any; category: any; cuisine: any; tags: any; prepTime: any; cookTime: any; servings: any; difficulty: any; isPublished: any; }; user: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message: any; recipe?: any; }): any; new(): any; }; }; }) => {
  try {
    const {
      title,
      description,
      coverImage,
      ingredients,
      step,
      category,
      cuisine,
      tags,
      prepTime,
      cookTime,
      servings,
      difficulty,
      isPublished,
    } = req.body;

    const slug = slugify(title, {
      lower: true,
      strict: true,
    });

    const recipe = await Recipe.create({
      title,
      slug,
      description,
      author: req.user.id,
      coverImage,
      ingredients,
      step,
      category,
      cuisine,
      tags,
      prepTime,
      cookTime,
      servings,
      difficulty,
      isPublished,
      views: 0,
    });

    return res.status(201).json({
      success: true,
      message: "Recipe created successfully",
      recipe,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
};

// UPDATE RECIPE
const updateRecipeById = async (req: { params: { id: any; }; user: { id: any; }; body: { title: any; slug: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message: any; recipe?: any; }): any; new(): any; }; }; }) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    // Only author can update
    if (recipe.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (req.body.title) {
      req.body.slug = slugify(req.body.title, {
        lower: true,
        strict: true,
      });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      recipe: updatedRecipe,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
};

// DELETE RECIPE
const deleteRecipeById = async (req: { params: { id: any; }; user: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message: any; }): any; new(): any; }; }; }) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    if (recipe.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Recipe.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
};

// LIKE RECIPE
const likeRecipeById = async (req: { params: { id: any; }; user: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message?: any; likesCount?: any; liked?: boolean; }): any; new(): any; }; }; }) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    if (!recipe.likes) {
      recipe.likes = [];
    }

    const alreadyLiked = recipe.likes.includes(req.user.id);

    if (alreadyLiked) {
      recipe.likes = recipe.likes.filter(
        (userId: { toString: () => any; }) => userId.toString() !== req.user.id
      );
    } else {
      recipe.likes.push(req.user.id);
    }

    await recipe.save();

    return res.status(200).json({
      success: true,
      likesCount: recipe.likes.length,
      liked: !alreadyLiked,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
};

// SAVE RECIPE
const saveRecipeById = async (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message: any; }): any; new(): any; }; }; }) => {
  try {
    // Requires savedRecipes field in User model
    return res.status(200).json({
      success: true,
      message: "Save recipe feature pending in User model",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
};

// GET RECIPES BY USER ID
const getRecipesByUserId = async (req: { params: { userId: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; recipes?: any; message?: any; }): any; new(): any; }; }; }) => {
  try {
    const { userId } = req.params;

    const recipes = await Recipe.find({
      author: userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      recipes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
};

module.exports = {
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
};