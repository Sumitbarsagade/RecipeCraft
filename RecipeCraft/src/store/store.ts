import {
  configureStore,
} from "@reduxjs/toolkit";

import authReducer
  from "../features/auth/authSlice";

import {
  recipeApi,
} from "../features/recipes/recipeApiSlice";  

export const store =
  configureStore({

    reducer: {

      auth: authReducer,

       [recipeApi.reducerPath]:
      recipeApi.reducer,

    },

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      recipeApi.middleware
    ),

  });


export type RootState =
  ReturnType<
    typeof store.getState
  >;


export type AppDispatch =
  typeof store.dispatch;