import {
  createApi,
} from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "../../api/axiosBaseQuery";

import type { CreateRecipeRequest, UserRecipesResponse, RecipeResponse, MyRecipesQueryParams } from "./recipeTypes";



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

      /* =========================
         GET USER RECIPES LIST
      ========================= */
      
      getMyRecipes:
  builder.query<UserRecipesResponse,MyRecipesQueryParams >({
    query: ({
      page,
      search,
      status,
      sort,
    }) => ({
      url: "/recipes/my",
      method: "GET",

      params: {
        page,

        ...(search && {
          search,
        }),

        ...(status && {
          status,
        }),

        ...(sort && {
          sort,
        }),
      },
    }),

    providesTags: (result) =>
      result
        ? [
            {
              type: "Recipe",
              id: "MY_LIST",
            },

            ...result.data.recipes.map(
              (recipe) => ({
                type: "Recipe" as const,
                id: recipe._id,
              })
            ),
          ]
        : [
            {
              type: "Recipe",
              id: "MY_LIST",
            },
          ],
  }),
  
   getRecipeData:
    builder.query<UserRecipesResponse,MyRecipesQueryParams >({
      query: (recipe) => ({
            url: "/recipes/:slug",
            method: "GET",
            data: recipe,
          }),
       
          providesTags: [
            "Recipe",
          ],
    })
   
    }),
  });


export const {
  useCreateRecipeMutation,
  useGetMyRecipesQuery,
  useGetRecipeDataQuery
  
} = recipeApi;