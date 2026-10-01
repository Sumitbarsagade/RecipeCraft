import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import slugify from 'slugify';
import Recipe from '../models/Recipe.js';
import type {CreateRecipeRequestBody, UpdateRecipeRequestBody} from '../types/recipe.types'
// Extend Request to include the authenticated user
import type {AuthenticatedRequest} from '../types/auth.types';

import {validateRecipeForPublish} from '../helper/publishValidationHelper'
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

export const getRecipeBySlug = async (req: {params: {slug: any}}, res: Response): Promise<void> => {
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

export const createRecipe = async (
  req: AuthenticatedRequest<CreateRecipeRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      description,
      coverImage,

      category,
      cuisine,
      tags,

      prepTime,
      cookTime,
      servings,
      difficulty,

      ingredients,
      instructions,

      nutrition,

      tips,
      notes,

      status = "draft",
    } = req.body;


    /* =====================================================
       AUTHENTICATED USER
    ===================================================== */

    const userId =
      (req.user as { _id?: mongoose.Types.ObjectId | string; id?: string } | undefined)?._id ??
      (req.user as { _id?: mongoose.Types.ObjectId | string; id?: string } | undefined)?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Not authenticated.",
      });
      return;
    }


    /* =====================================================
       BASIC VALIDATION
    ===================================================== */

    if (!title?.trim()) {
      res.status(400).json({
        success: false,
        message: "Recipe title is required.",
      });

      return;
    }

    if (!category) {
      res.status(400).json({
        success: false,
        message: "Recipe category is required.",
      });

      return;
    }


    /* =====================================================
       STATUS VALIDATION
    ===================================================== */

    if (
      status !== "draft" &&
      status !== "published"
    ) {
      res.status(400).json({
        success: false,
        message:
          "Recipe status must be draft or published.",
      });

      return;
    }


    /* =====================================================
       PUBLISH VALIDATION
    ===================================================== */

    if (status === "published") {
      const validationError =
        validateRecipeForPublish({
          title,
          category,
          ingredients,
          instructions,
        });

      if (validationError) {
        res.status(400).json({
          success: false,
          message: validationError,
        });

        return;
      }
    }


    /* =====================================================
       GENERATE SLUG
    ===================================================== */

    const baseSlug = slugify(
      title,
      {
        lower: true,
        strict: true,
        trim: true,
      }
    );

    let slug = baseSlug;

    /*
     * Make sure the slug is unique.
     *
     * chicken-curry
     * chicken-curry-2
     * chicken-curry-3
     */
    let counter = 2;

    while (
      await Recipe.exists({ slug })
    ) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }


    /* =====================================================
       CREATE RECIPE
    ===================================================== */

    const recipe = await Recipe.create({
        title: title.trim(),

        slug,

        description:
          description?.trim(),

        author: userId,

        coverImage,

        category,

        cuisine,

        tags:
          Array.isArray(tags)
            ? tags
            : [],

        prepTime,

        cookTime,

        servings,

        difficulty,

        ingredients:
          Array.isArray(ingredients)
            ? ingredients
            : [],

        instructions:
          Array.isArray(instructions)
            ? instructions
            : [],

        nutrition,

        tips:
          tips?.trim(),

        notes:
          notes?.trim(),

        status,

        /*
         * Backend-managed fields
         */
        likes: [],
        views: 0,
      });


    /* =====================================================
       RESPONSE
    ===================================================== */

    res.status(201).json({
      success: true,

      message:
        status === "published"
          ? "Recipe published successfully."
          : "Recipe saved as draft.",

      data: {
        recipe,
      },
    });

  } catch (error) {
    console.error(
      "createRecipe error:",
      error
    );

    res.status(500).json({
      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Server error.",
    });
  }
};

export const updateRecipeById = async (
  req: AuthenticatedRequest<UpdateRecipeRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;


    /* =====================================================
       FIND RECIPE
    ===================================================== */

    const recipe =
      await Recipe.findById(id);

    if (!recipe) {
      res.status(404).json({
        success: false,
        message: "Recipe not found.",
      });

      return;
    }


    /* =====================================================
       AUTHORIZATION
    ===================================================== */

    const userId =
      (req.user as { _id?: mongoose.Types.ObjectId | string; id?: string } | undefined)?._id ??
      (req.user as { _id?: mongoose.Types.ObjectId | string; id?: string } | undefined)?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Not authenticated.",
      });
      return;
    }


    if (
      recipe.author.toString() !==
      userId.toString()
    ) {
      res.status(403).json({
        success: false,
        message:
          "You are not authorized to update this recipe.",
      });

      return;
    }


    /* =====================================================
       ALLOWED UPDATE FIELDS
    ===================================================== */

    const {
      title,
      description,
      coverImage,

      category,
      cuisine,
      tags,

      prepTime,
      cookTime,
      servings,
      difficulty,

      ingredients,
      instructions,

      nutrition,

      tips,
      notes,

      status,
    } = req.body;


    /* =====================================================
       STATUS VALIDATION
    ===================================================== */

    if (
      status !== undefined &&
      status !== "draft" &&
      status !== "published"
    ) {
      res.status(400).json({
        success: false,
        message:
          "Recipe status must be draft or published.",
      });

      return;
    }


    /* =====================================================
       BUILD FINAL RECIPE STATE
    ===================================================== */

    /*
     * This is important when publishing an existing draft.
     *
     * req.body may only contain changed fields, so validation
     * needs to consider both:
     *
     * existing DB values + incoming values.
     */

    const finalTitle =
      title !== undefined
        ? title
        : recipe.title;

    const finalCategory =
      category !== undefined
        ? category
        : recipe.category;

    const finalIngredients =
      ingredients !== undefined
        ? ingredients
        : recipe.ingredients;

    const finalInstructions =
      instructions !== undefined
        ? instructions
        : recipe.instructions;

    const finalStatus =
      status !== undefined
        ? status
        : recipe.status;


    /* =====================================================
       PUBLISH VALIDATION
    ===================================================== */

    if (finalStatus === "published") {
      const validationError =
        validateRecipeForPublish({
          title: finalTitle,
          category: finalCategory,
          ingredients:
            finalIngredients,
          instructions:
            finalInstructions,
        });

      if (validationError) {
        res.status(400).json({
          success: false,
          message: validationError,
        });

        return;
      }
    }


    /* =====================================================
       UPDATE ALLOWED FIELDS
    ===================================================== */

    if (title !== undefined) {
      recipe.title =
        title.trim();


      /* =============================
         REGENERATE SLUG
      ============================= */

      if (
        title.trim() !==
        recipe.title
      ) {
        // handled below
      }

      const baseSlug =
        slugify(title, {
          lower: true,
          strict: true,
          trim: true,
        });

      let newSlug =
        baseSlug;

      let counter = 2;

      while (
        await Recipe.exists({
          slug: newSlug,

          _id: {
            $ne: recipe._id,
          },
        })
      ) {
        newSlug =
          `${baseSlug}-${counter}`;

        counter++;
      }

      recipe.slug =
        newSlug;
    }


    if (description !== undefined) {
      recipe.description =
        description.trim();
    }


    if (coverImage !== undefined) {
      recipe.coverImage =
        coverImage;
    }


    if (category !== undefined) {
      recipe.category =
        category;
    }


    if (cuisine !== undefined) {
      recipe.cuisine =
        cuisine || undefined;
    }


    if (tags !== undefined) {
      recipe.tags =
        Array.isArray(tags)
          ? tags
          : [];
    }


    if (prepTime !== undefined) {
      recipe.prepTime =
        prepTime;
    }


    if (cookTime !== undefined) {
      recipe.cookTime =
        cookTime;
    }


    if (servings !== undefined) {
      recipe.servings =
        servings;
    }


    if (difficulty !== undefined) {
      recipe.difficulty =
        difficulty;
    }


    if (ingredients !== undefined) {
      recipe.ingredients =
        ingredients;
    }


    if (instructions !== undefined) {
      recipe.instructions =
        instructions;
    }


    if (nutrition !== undefined) {
      recipe.nutrition =
        nutrition;
    }


    if (tips !== undefined) {
      recipe.tips =
        tips.trim();
    }


    if (notes !== undefined) {
      recipe.notes =
        notes.trim();
    }


    if (status !== undefined) {
      recipe.status =
        status;
    }


    /* =====================================================
       SAVE
    ===================================================== */

    const updatedRecipe =
      await recipe.save();


    /* =====================================================
       RESPONSE
    ===================================================== */

    res.status(200).json({
      success: true,

      message:
        updatedRecipe.status ===
        "published"
          ? "Recipe updated successfully."
          : "Draft updated successfully.",

      data: {
        recipe:
          updatedRecipe,
      },
    });

  } catch (error) {
    console.error(
      "updateRecipeById error:",
      error
    );

    res.status(500).json({
      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Server error.",
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
      recipe.likes.push(new mongoose.Types.ObjectId(userId));
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

export const getRecipesByUserId = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    /* =====================================================
       AUTHENTICATED USER
    ===================================================== */

     const userId =
      (req.user as { _id?: mongoose.Types.ObjectId | string; id?: string } | undefined)?._id ??
      (req.user as { _id?: mongoose.Types.ObjectId | string; id?: string } | undefined)?.id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Not authenticated.",
      });

      return;
    }
   
     /* =====================================================
       QUERY PARAMETERS
    ===================================================== */

    const page = Math.max(
      Number(req.query.page) || 1,
      1
    );

    const limit = 20;

    const skip =
      (page - 1) * limit;

    const search =
      typeof req.query.search === "string"
        ? req.query.search.trim()
        : "";

    const status =
      typeof req.query.status === "string"
        ? req.query.status
        : "";

    const sort =
      typeof req.query.sort === "string"
        ? req.query.sort
        : "newest";


     /* =====================================================
       FILTER
    ===================================================== */

    const filter: Record<string, unknown> = {
      author: userId,
    };


    // Draft / Published
    if (
      status === "draft" ||
      status === "published"
    ) {
      filter.status = status;
    }


    // Search
    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }


    /* =====================================================
       SORT
    ===================================================== */

    let sortOption:
      Record<string, 1 | -1>;

    switch (sort) {
      case "oldest":
        sortOption = {
          createdAt: 1,
        };
        break;

      case "views":
        sortOption = {
          views: -1,
        };
        break;

      case "az":
        sortOption = {
          title: 1,
        };
        break;

      case "newest":
      default:
        sortOption = {
          createdAt: -1,
        };
        break;
    }


    /* =====================================================
       DATABASE QUERY
    ===================================================== */

    const [
      recipes,
      totalRecipes,
    ] = await Promise.all([
      Recipe.find(filter)
        .select(
          [
            "title",
            "slug",
            "description",
            "coverImage",
            "category",
            "prepTime",
            "cookTime",
            "difficulty",
            "status",
            "views",
            "createdAt",
            "updatedAt",
          ].join(" ")
        )
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .lean(),

      Recipe.countDocuments(filter),
    ]);


    /* =====================================================
       PAGINATION
    ===================================================== */

    const totalPages =
      Math.ceil(
        totalRecipes / limit
      );


    /* =====================================================
       RESPONSE
    ===================================================== */

    res.status(200).json({
      success: true,

      message:
        "Recipes fetched successfully.",

      data: {
        recipes,

        pagination: {
          currentPage: page,
          pageSize: limit,

          totalRecipes,
          totalPages,

          hasNextPage:
            page < totalPages,

          hasPreviousPage:
            page > 1,
        },
      },
    });

  } catch (error) {
    console.error(
      "getMyRecipes error:",
      error
    );
   
    console.log(error);
    res.status(500).json({
      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Server error.",
    });
  }
};
