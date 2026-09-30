import type { CreateRecipeRequest } from "./recipeTypes";

import type { RecipeFormData, RecipeIngredient } from "../../types/recipe.types";

const optionalNumber = (value: string): string | undefined => {
  if (!value.trim()) {
    return undefined;
  }

  const number = Number(value);

  return Number.isNaN(number) ? undefined : String(number);
};

// const timeToMinutes = (
//   value: number
// ): number | undefined => {
//   if (!value) {
//     return undefined;
//   }

//   const [hours, minutes] =
//     value.split(":").map(Number);

//   if (
//     Number.isNaN(hours) ||
//     Number.isNaN(minutes)
//   ) {
//     return undefined;
//   }

//   return hours * 60 + minutes;
// };

export const prepareRecipePayload = (
  form: RecipeFormData,
  status: "draft" | "published",
): CreateRecipeRequest => {
  const hasNutrition =
    form.nutrition.calories ||
    form.nutrition.protein ||
    form.nutrition.carbohydrates ||
    form.nutrition.fat;

  return {
    title: form.title.trim(),

    description: form.description.trim(),

    coverImage: form.coverImage,

    category: form.category,

    cuisine: form.cuisine,

    tags: form.tags.map((tag) => tag.trim()).filter(Boolean),

    prepTime: form.prepTime ?? "",

    cookTime: form.cookTime ?? "",

    servings: form.servings ?? "",

    difficulty: form.difficulty || undefined,

    ingredients: form.ingredients
      .filter((ingredient) => ingredient.name.trim())
      .map((ingredient, index) => ({
        id: String(index + 1),

        name: ingredient.name.trim(),

        quantity: ingredient.quantity.trim(),

        unit: ingredient.unit.trim() as RecipeIngredient["unit"],
      })),

    instructions: form.instructions
      .filter((instruction) => instruction.description.trim())
      .map((instruction, index) => ({
        id: String(index + 1),

        step: index + 1,

        description: instruction.description.trim(),
      })),

    nutrition: hasNutrition
      ? {
          calories: optionalNumber(form.nutrition.calories) ?? "",

          protein: optionalNumber(form.nutrition.protein) ?? "",

          carbohydrates: optionalNumber(form.nutrition.carbohydrates) ?? "",

          fat: optionalNumber(form.nutrition.fat) ?? "",
        }
      : { calories: "", protein: "", carbohydrates: "", fat: "" },

    tips: form.tips.trim(),

    notes: form.notes.trim(),

    status,
  };
};
