import mongoose, {
  Document,
} from "mongoose";

export const RECIPE_CATEGORIES = [
  "Appetizer",
  "Snack",
  "Breakfast",
  "Main Course",
  "Dessert",
  "Beverage",
  "Lunch",
  "Dinner",
  "Other",
] as const;

export const RECIPE_CUISINES = [
  "Italian",
  "Mexican",
  "Chinese",
  "American",
  "French",
  "Indian",
  "Thai",
  "Mediterranean",
  "Other",
] as const;


export type RecipeCategory =
  typeof RECIPE_CATEGORIES[number];

export type RecipeCuisine =
  typeof RECIPE_CUISINES[number];

export type RecipeDifficulty =
  typeof RECIPE_DIFFICULTIES[number];

export const RECIPE_DIFFICULTIES = [
  "Easy",
  "Medium",
  "Hard",
] as const;

export type RecipeStatus =
  | "draft"
  | "published";


export interface IRecipeIngredient {
  name: string;
  quantity: string;
  unit: string;
}


export interface IRecipeInstruction {
  step: number;
  description: string;
}


export interface IRecipeNutrition {
  calories?: number;
  protein?: number;
  carbohydrates?: number;
  fat?: number;
}


export interface IRecipe extends Document {
  title: string;

  slug: string;

  description?: string;

  author: mongoose.Types.ObjectId;

  coverImage?: string;

  category: RecipeCategory;

  cuisine?: RecipeCuisine;

  tags: string[];

  prepTime?: number;

  cookTime?: number;

  servings?: number;

  difficulty?: RecipeDifficulty;

  ingredients: IRecipeIngredient[];

  instructions: IRecipeInstruction[];

  nutrition?: IRecipeNutrition;

  tips?: string;

  notes?: string;

  status: RecipeStatus;

  likes: mongoose.Types.ObjectId[];

  views: number;

  createdAt: Date;
  updatedAt: Date;
}

// types/recipe.types.ts

export interface CreateRecipeRequestBody {
  title: string;

  description?: string;
  coverImage?: string;

  category: RecipeCategory;
  cuisine?: RecipeCuisine;

  tags?: string[];

  prepTime?: number;
  cookTime?: number;
  servings?: number;

  difficulty?: RecipeDifficulty;

  ingredients?: IRecipeIngredient[];
  instructions?: IRecipeInstruction[];

  nutrition?: IRecipeNutrition;

  tips?: string;
  notes?: string;

  status?: RecipeStatus;
}

export type UpdateRecipeRequestBody = Partial<CreateRecipeRequestBody>;