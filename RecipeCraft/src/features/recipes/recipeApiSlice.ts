import {
  createApi,
} from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "../../api/axiosBaseQuery";

import {
  formToRecipePayload,
} from "./recipeMappers";

import type {
  Recipe,
  RecipeFormData,
} from "./recipeTypes";

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

interface RecipeListResponse {
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

interface RecipeResponse {
  success: boolean;
  message?: string;
  data: Recipe;
}

interface DeleteRecipeResponse {
  success: boolean;
  message?: string;
}

export const recipeApi = createApi({
  reducerPath: "recipeApi",

  baseQuery: axiosBaseQuery(),

  tagTypes: ["Recipe"],

  endpoints: (builder) => ({
    getRecipes: builder.query<
      RecipeListResponse,
      RecipeQueryParams | void
    >({
      query: (params) => ({
        url: "/recipes",
        method: "GET",
        params: params ? { ...params } : undefined,
      }),

      providesTags: ["Recipe"],
    }),

    getRecipeById: builder.query<
      RecipeResponse,
      string
    >({
      query: (id) => ({
        url: `/recipes/${id}`,
        method: "GET",
      }),

      providesTags: (
        _result,
        _error,
        id
      ) => [
        {
          type: "Recipe",
          id,
        },
      ],
    }),

    createRecipe: builder.mutation<
  RecipeResponse,
  RecipeFormData
>({
  query: (formData) => ({
    url: "/recipes",
    method: "POST",
    data: formToRecipePayload(formData),
  }),

  invalidatesTags: ["Recipe"],
}),

    updateRecipe: builder.mutation<
      RecipeResponse,
      {
        id: string;
        data: RecipeFormData;
      }
    >({
      query: ({ id, data }) => ({
        url: `/recipes/${id}`,
        method: "PUT",
        data,
      }),

      invalidatesTags: (
        _result,
        _error,
        { id }
      ) => [
        "Recipe",
        {
          type: "Recipe",
          id,
        },
      ],
    }),

    deleteRecipe: builder.mutation<
      DeleteRecipeResponse,
      string
    >({
      query: (id) => ({
        url: `/recipes/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Recipe"],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipeByIdQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} = recipeApi;