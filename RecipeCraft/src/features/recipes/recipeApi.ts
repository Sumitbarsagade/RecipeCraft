import {
  createApi,
} from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "../../api/axiosBaseQuery";

import type { CreateRecipeRequest, RecipeResponse } from "./recipeTypes";



export const recipeApi =
  createApi({
    reducerPath:
      "recipeApi",

    baseQuery:
      axiosBaseQuery(),

    tagTypes: [
      "Recipe",
    ],

    endpoints: (builder) => ({

      /* =========================
         CREATE RECIPE
      ========================= */

      createRecipe:
        builder.mutation<RecipeResponse,CreateRecipeRequest>({
          query: (recipe) => ({
            url: "/recipes",
            method: "POST",
            data: recipe,
          }),

          invalidatesTags: [
            "Recipe",
          ],
        }),

    }),
  });


export const {
  useCreateRecipeMutation,
} = recipeApi;