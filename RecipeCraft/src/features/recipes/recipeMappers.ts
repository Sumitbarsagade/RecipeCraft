import type {
  Recipe,
  RecipeFormData,
} from "./recipeTypes";

export const formToRecipePayload = (
  form: RecipeFormData
) => {
  return {
    title: form.title.trim(),

    description: form.description.trim(),

    image: form.image,

    category: form.category,

    cuisine: form.cuisine,

    tags: form.tags,

    prepTime: Number(form.prepTime) || 0,

    cookTime: Number(form.cookTime) || 0,

    servings: Number(form.servings) || 1,

    difficulty: form.difficulty,

    ingredients: form.ingredients.map(
      (ingredient) => ({
        id: ingredient.id,
        name: ingredient.name.trim(),
        quantity: ingredient.quantity.trim(),
        unit: ingredient.unit.trim(),
      })
    ),

    instructions: form.instructions.map(
      (instruction, index) => ({
        id: instruction.id,
        step: index + 1,
        description:
          instruction.description.trim(),
      })
    ),

    nutrition: {
      calories:
        Number(form.nutrition.calories) || 0,

      protein:
        Number(form.nutrition.protein) || 0,

      carbohydrates:
        Number(form.nutrition.carbohydrates) || 0,

      fat:
        Number(form.nutrition.fat) || 0,
    },

    tips: form.tips.trim(),

    notes: form.notes.trim(),

    status: form.status,
  };
};

export const recipeToFormData = (
  recipe: Recipe
): RecipeFormData => {
  return {
    title: recipe.title,

    description: recipe.description,

    image: recipe.image,

    category: recipe.category,

    cuisine: recipe.cuisine,

    tags: recipe.tags,

    prepTime: String(recipe.prepTime),

    cookTime: String(recipe.cookTime),

    servings: String(recipe.servings),

    difficulty: recipe.difficulty,

    ingredients: recipe.ingredients,

    instructions: recipe.instructions,

    nutrition: {
      calories:
        String(recipe.nutrition.calories),

      protein:
        String(recipe.nutrition.protein),

      carbohydrates:
        String(
          recipe.nutrition.carbohydrates
        ),

      fat:
        String(recipe.nutrition.fat),
    },

    tips: recipe.tips ?? "",

    notes: recipe.notes ?? "",

    status: recipe.status,
  };
};