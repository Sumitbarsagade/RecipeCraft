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
  difficulty: "Easy" | "Medium" | "Hard";

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