export interface RecipeIngredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
}

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

  prepTime: string;
  cookTime: string;
  servings: string;
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






