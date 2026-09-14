export interface RecipeIngredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
}

export interface RecipeInstruction {
  id: string;
  step: number;
  description: string;
}

export type RecipeStatus = "draft" | "published";

export type RecipeDifficulty = "Easy" | "Medium" | "Hard";

export interface RecipeFormData {
  title: string;
  description: string;
  image: string;

  category: string;
  cuisine: string;
  tags: string[];

  prepTime: string;
  cookTime: string;
  servings: string;
  difficulty: RecipeDifficulty;

  ingredients: RecipeIngredient[];
  instructions: RecipeInstruction[];

  nutrition: {
    calories: string;
    protein: string;
    carbohydrates: string;
    fat: string;
  };

  tips: string;
  notes: string;

  status: RecipeStatus;
}

export interface RecipeAuthor {
  _id: string;
  name: string;
  username?: string;
  profileImage?: string;
}

export interface Recipe {
  _id: string;

  title: string;
  description: string;
  image: string;

  category: string;
  cuisine: string;
  tags: string[];

  prepTime: number;
  cookTime: number;
  servings: number;

  difficulty: RecipeDifficulty;

  ingredients: RecipeIngredient[];
  instructions: RecipeInstruction[];

  nutrition: {
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
  };

  tips?: string;
  notes?: string;

  status: RecipeStatus;

  author: RecipeAuthor;

  rating: number;
  reviewCount: number;
  saveCount: number;

  createdAt: string;
  updatedAt: string;
}