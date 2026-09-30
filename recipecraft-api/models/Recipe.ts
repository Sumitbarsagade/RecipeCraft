import mongoose, { Schema } from "mongoose";

import type {
  IRecipe,
  IRecipeIngredient,
  IRecipeInstruction,
  IRecipeNutrition,
  

} from "../types/recipe.types";

import {RECIPE_CATEGORIES,
  RECIPE_CUISINES, RECIPE_DIFFICULTIES} from "../types/recipe.types";

/* =========================================================
   INGREDIENT SCHEMA
========================================================= */

const ingredientSchema =
  new Schema<IRecipeIngredient>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      quantity: {
        type: String,
        required: true,
        trim: true,
      },

      unit: {
        type: String,
        required: true,
        trim: true,
      },
    },
    {
      _id: false,
    }
  );


/* =========================================================
   INSTRUCTION SCHEMA
========================================================= */

const instructionSchema =
  new Schema<IRecipeInstruction>(
    {
      step: {
        type: Number,
        required: true,
        min: 1,
      },

      description: {
        type: String,
        required: true,
        trim: true,
      },
    },
    {
      _id: false,
    }
  );


/* =========================================================
   NUTRITION SCHEMA
========================================================= */

const nutritionSchema =
  new Schema<IRecipeNutrition>(
    {
      calories: {
        type: Number,
        min: 0,
      },

      protein: {
        type: Number,
        min: 0,
      },

      carbohydrates: {
        type: Number,
        min: 0,
      },

      fat: {
        type: Number,
        min: 0,
      },
    },
    {
      _id: false,
    }
  );


/* =========================================================
   RECIPE SCHEMA
========================================================= */

const recipeSchema = new Schema<IRecipe>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    coverImage: {
      type: String,
      trim: true,
    },


    /* ===============================
       RECIPE DETAILS
    =============================== */

    category: {
      type: String,
      required: true,

      enum: RECIPE_CATEGORIES
    },

    cuisine: {
      type: String,

      enum: RECIPE_CUISINES
    },

    tags: {
      type: [String],
      default: [],
    },

    prepTime: {
      type: Number,
      min: 0,
    },

    cookTime: {
      type: Number,
      min: 0,
    },

    servings: {
      type: Number,
      min: 1,
    },

    difficulty: {
      type: String,

      enum: RECIPE_DIFFICULTIES,
    },


    /* ===============================
       INGREDIENTS
    =============================== */

    ingredients: {
      type: [ingredientSchema],
   
       default: [],
    },


    /* ===============================
       INSTRUCTIONS
    =============================== */

    instructions: {
      type: [instructionSchema],
    
      default: [],
    },


    /* ===============================
       NUTRITION
    =============================== */

    nutrition: {
      type: nutritionSchema,
      default: undefined,
    },


    /* ===============================
       EXTRA INFORMATION
    =============================== */

    tips: {
      type: String,
      trim: true,
    },

    notes: {
      type: String,
      trim: true,
    },


    /* ===============================
       STATUS
    =============================== */

    status: {
      type: String,

      enum: [
        "draft",
        "published",
      ],

      default: "draft",
      required: true,
    },


    /* ===============================
       ENGAGEMENT
    =============================== */

    likes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],

      default: [],
    },

    views: {
      type: Number,
      default: 0,
      min: 0,
    },
  },

  {
    timestamps: true,
  }
);


/* =========================================================
   MODEL
========================================================= */

const Recipe =
  mongoose.model<IRecipe>(
    "Recipe",
    recipeSchema
  );

export default Recipe;