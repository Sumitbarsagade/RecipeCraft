interface RecipePublishData {
  title?: string;
  category?: string;
  ingredients?: unknown[];
  instructions?: unknown[];
}

export const validateRecipeForPublish = (
  recipe: RecipePublishData
): string | null => {
  if (!recipe.title?.trim()) {
    return "Title is required to publish a recipe.";
  }

  if (!recipe.category) {
    return "Category is required to publish a recipe.";
  }

  if (
    !recipe.ingredients ||
    recipe.ingredients.length === 0
  ) {
    return "At least one ingredient is required to publish a recipe.";
  }

  if (
    !recipe.instructions ||
    recipe.instructions.length === 0
  ) {
    return "At least one instruction is required to publish a recipe.";
  }

  return null;
};