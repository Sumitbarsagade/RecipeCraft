export interface RecipeIngredient {
  id: string;
  name: string;
  quantity: string;
  unit: IngredientUnits;
}

export const ingredientUnits = [
  "tsp", "tbsp", "cup", "ml", "l", "g", "kg", "mg",
  "oz", "lb", "piece", "slice", "clove", "pinch",
  "handful", "can", "packet", "bunch"
] as const;





// 2. Derive the union type from the array
export type IngredientUnits = typeof ingredientUnits[number];

export type RecipeCategory =
  | "Appetizer"
  | "Snack"
  | "Breakfast"
  | "Main Course"
  | "Dessert"
  | "Beverage"
  | "Lunch"
  | "Other";

export type RecipeCuisine =
  | "Italian"
  | "Mexican"
  | "Chinese"
  | "American"
  | "French"
  | "Indian"
  | "Thai"
  | "Mediterrarian"
  | "Other";

export type RecipeDifficulty =
  | "Easy"
  | "Medium"
  | "Hard";

export interface RecipeInstruction {
  id: string;
  step: number;
  description: string;
}

export type RecipeStatus = "draft" | "published";

export interface RecipeAuthor {
  _id: string;
  name: string;
  username?: string;
  profileImage?: string;
}

export interface RecipeFormData {
  title: string;
  description: string;
  coverImage: string;

  category: RecipeCategory;
  cuisine: RecipeCuisine;

  tags: string[];

  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty:  RecipeDifficulty;

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

}

export interface RecipeCardSummary {
  _id: string;

  title: string;
  slug: string;

  description?: string;

  coverImage?: string;

  category: RecipeCategory;

  prepTime?: number;
  cookTime?: number;

  difficulty?: RecipeDifficulty;

  status: RecipeStatus;

  views: number;

  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  currentPage: number;
  pageSize: number;

  totalRecipes: number;
  totalPages: number;

  hasNextPage: boolean;
  hasPreviousPage: boolean;
}






