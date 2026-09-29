
import type{ RecipeFormData, RecipeStatus } from "../../types/recipe.types";
export interface CreateRecipeRequest extends RecipeFormData{
  
  status: RecipeStatus;
}

export interface RecipeResponse {
   success: boolean;
  status: number;
  message: string;
  data:{
    recipe: RecipeFormData;
  }
}

