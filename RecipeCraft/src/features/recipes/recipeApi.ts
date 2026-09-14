import axiosInstance from "../../api/axiosInstance";

import type {
  Recipe,
  RecipeFormData,
} from "./recipeTypes";

import {
  formToRecipePayload,
} from "./recipeMappers";

import {
  RECIPE_ENDPOINTS,
} from "./recipeEndpoints";

export interface RecipeListResponse {
  success: boolean;
  message?: string;
  data: Recipe[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface RecipeResponse {
  success: boolean;
  message?: string;
  data: Recipe;
}

export interface RecipeQueryParams {
  page?: number;
  limit?: number;

  search?: string;

  category?: string;

  cuisine?: string;

  status?: "draft" | "published";

  sort?:
    | "latest"
    | "oldest"
    | "rating"
    | "popular";
}

export const getRecipes = async (
  params?: RecipeQueryParams
): Promise<RecipeListResponse> => {
  const response =
    await axiosInstance.get<RecipeListResponse>(
      RECIPE_ENDPOINTS.all,
      {
        params,
      }
    );

  return response.data;
};

export const getRecipeById = async (
  id: string
): Promise<RecipeResponse> => {
  const response =
    await axiosInstance.get<RecipeResponse>(
      RECIPE_ENDPOINTS.byId(id)
    );

  return response.data;
};

export const createRecipe = async (
  formData: RecipeFormData
): Promise<RecipeResponse> => {
  const payload =
    formToRecipePayload(formData);

  const response =
    await axiosInstance.post<RecipeResponse>(
      RECIPE_ENDPOINTS.all,
      payload
    );

  return response.data;
};

export const updateRecipe = async (
  id: string,
  formData: RecipeFormData
): Promise<RecipeResponse> => {
  const payload =
    formToRecipePayload(formData);

  const response =
    await axiosInstance.put<RecipeResponse>(
      RECIPE_ENDPOINTS.byId(id),
      payload
    );

  return response.data;
};

export const deleteRecipe = async (
  id: string
): Promise<void> => {
  await axiosInstance.delete(
    RECIPE_ENDPOINTS.byId(id)
  );
};