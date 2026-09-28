import mongoose, {
  Document,
} from "mongoose";

export type RecipeCategory =
  | "appetizer"
  | "snack"
  | "breakfast"
  | "main course"
  | "dessert"
  | "beverage"
  | "other";

export type RecipeCuisine =
  | "Italian"
  | "Mexican"
  | "Chinese"
  | "American"
  | "French"
  | "Indian"
  | "other";

export type RecipeDifficulty =
  | "easy"
  | "medium"
  | "hard";

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