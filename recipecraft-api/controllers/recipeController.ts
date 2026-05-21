import type { Request, Response } from 'express';
import slugify from 'slugify';
import Recipe from '../models/Recipe.js';

// Extend Request to include the authenticated user
interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

// ---------------------------------------------------------------------------
// GET ALL RECIPES
// ---------------------------------------------------------------------------

export const getAllRecipes = async (_req: Request, res: Response): Promise<void> => {
  try {
    const recipes = await Recipe.find({ isPublished: true })
      .populate('author', 'username email')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: recipes.length, recipes });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error',
    });
  }
};

// ---------------------------------------------------------------------------
// SEARCH RECIPES
// ---------------------------------------------------------------------------

export const searchRecipes = async (req: Request, res: Response): Promise<void> => {
  try {
    const { keyword, category, cuisine, difficulty } = req.query;

    const query: Record<string, unknown> = { isPublished: true };

    if (keyword) {
      query['$or'] = [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { tags: { $regex: keyword, $options: 'i' } },
      ];
    }

    if (category) query['category'] = category;
    if (cuisine) query['cuisine'] = cuisine;
    if (difficulty) query['difficulty'] = difficulty;

    const recipes = await Recipe.find(query)
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, recipes });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error',
    });
  }
};

// ---------------------------------------------------------------------------
// TRENDING RECIPES
// ---------------------------------------------------------------------------

export const getTrendingRecipes = async (_req: Request, res: Response): Promise<void> => {
  try {
    const recipes = await Recipe.find({ isPublished: true })
      .sort({ views: -1, createdAt: -1 })
      .limit(10);

    res.status(200).json({ success: true, recipes });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error',
    });
  }
};

// ---------------------------------------------------------------------------
// RECIPE FEED (paginated)
// ---------------------------------------------------------------------------

export const getRecipeFeed = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Math.max(1, Number(req.query['page']) || 1);
    const limit = Math.min(50, Math.max(1, Number(req.query['limit']) || 10));
    const skip = (page - 1) * limit;

    const [recipes, total] = await Promise.all([
      Recipe.find({ isPublished: true })
        .populate('author', 'username')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Recipe.countDocuments({ isPublished: true }),
    ]);

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      total,
      recipes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error',
    });
  }
};

// ---------------------------------------------------------------------------
// GET RECIPE BY SLUG
// ---------------------------------------------------------------------------

export const getRecipeBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;

    const recipe = await Recipe.findOne({ slug }).populate('author', 'username email');

    if (!recipe) {
      res.status(404).json({ success: false, message: 'Recipe not found' });
      return;
    }

    recipe.views = (recipe.views || 0) + 1;
    await recipe.save();

    res.status(200).json({ success: true, recipe });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error',
    });
  }
};

// ---------------------------------------------------------------------------
// CREATE RECIPE
// ---------------------------------------------------------------------------

export const createRecipe = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
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

    if (!title || !description || !ingredients) {
      res.status(400).json({ success: false, message: 'Title, description, and ingredients are required' });
      return;
    }

    const slug = slugify(title as string, { lower: true, strict: true });

    const recipe = await Recipe.create({
      title,
      slug,
      description,
      author: req.user?.id,
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

    res.status(201).json({ success: true, message: 'Recipe created successfully', recipe });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error',
    });
  }
};

// ---------------------------------------------------------------------------
// UPDATE RECIPE
// ---------------------------------------------------------------------------

export const updateRecipeById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      res.status(404).json({ success: false, message: 'Recipe not found' });
      return;
    }

    if (recipe.author.toString() !== req.user?.id) {
      res.status(403).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const updates = { ...req.body } as Record<string, unknown>;
    if (updates['title']) {
      updates['slug'] = slugify(updates['title'] as string, { lower: true, strict: true });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, message: 'Recipe updated successfully', recipe: updatedRecipe });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error',
    });
  }
};

// ---------------------------------------------------------------------------
// DELETE RECIPE
// ---------------------------------------------------------------------------

export const deleteRecipeById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      res.status(404).json({ success: false, message: 'Recipe not found' });
      return;
    }

    if (recipe.author.toString() !== req.user?.id) {
      res.status(403).json({ success: false, message: 'Unauthorized' });
      return;
    }

    await Recipe.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error',
    });
  }
};

// ---------------------------------------------------------------------------
// LIKE / UNLIKE RECIPE
// ---------------------------------------------------------------------------

export const likeRecipeById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      res.status(404).json({ success: false, message: 'Recipe not found' });
      return;
    }

    if (!recipe.likes) recipe.likes = [];

    const alreadyLiked = recipe.likes.some(
      (likeId: { toString: () => string }) => likeId.toString() === userId
    );

    if (alreadyLiked) {
      recipe.likes = recipe.likes.filter(
        (likeId: { toString: () => string }) => likeId.toString() !== userId
      );
    } else {
      recipe.likes.push(userId);
    }

    await recipe.save();

    res.status(200).json({ success: true, likesCount: recipe.likes.length, liked: !alreadyLiked });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error',
    });
  }
};

// ---------------------------------------------------------------------------
// SAVE RECIPE
// ---------------------------------------------------------------------------

export const saveRecipeById = async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
  // TODO: requires savedRecipes field in User model
  res.status(501).json({ success: false, message: 'Save recipe feature not yet implemented' });
};

// ---------------------------------------------------------------------------
// GET RECIPES BY USER ID
// ---------------------------------------------------------------------------

export const getRecipesByUserId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    const recipes = await Recipe.find({ author: userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, recipes });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error',
    });
  }
};
