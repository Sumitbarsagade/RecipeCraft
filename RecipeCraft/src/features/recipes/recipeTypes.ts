
import type{ RecipeFormData, RecipeStatus, RecipeCardSummary, Pagination } from "../../types/recipe.types";
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

export interface UserRecipesResponse {
  success: boolean;
  message: string;

  data: {
    recipes: RecipeCardSummary[];
    pagination: Pagination;
  };
}

export interface MyRecipesQueryParams {
  page: number;
  search?: string;
  status?: "draft" | "published";
  sort?: "newest" | "oldest" | "views" | "az";
}