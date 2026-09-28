import type {
  CreateRecipeRequest,
  RecipeFormData,
} from "./recipeTypes";


const optionalNumber = (
  value: string
): number | undefined => {
  if (!value.trim()) {
    return undefined;
  }

  const number = Number(value);

  return Number.isNaN(number)
    ? undefined
    : number;
};


export const prepareRecipePayload = (
  form: RecipeFormData,
  status: "draft" | "published"
): CreateRecipeRequest => {
  const hasNutrition =
    form.nutrition.calories ||
    form.nutrition.protein ||
    form.nutrition.carbohydrates ||
    form.nutrition.fat;

  return {
    title: form.title.trim(),

    description:
      form.description.trim() ||
      undefined,

    coverImage:
      form.coverImage ||
      undefined,

    category:
      form.category,

    cuisine:
      form.cuisine ||
      undefined,

    tags: form.tags
      .map((tag) => tag.trim())
      .filter(Boolean),

    prepTime:
      optionalNumber(
        form.prepTime
      ),

    cookTime:
      optionalNumber(
        form.cookTime
      ),

    servings:
      optionalNumber(
        form.servings
      ),

    difficulty:
      form.difficulty ||
      undefined,

    ingredients:
      form.ingredients
        .filter(
          (ingredient) =>
            ingredient.name.trim()
        )
        .map((ingredient) => ({
          name:
            ingredient.name.trim(),

          quantity:
            ingredient.quantity.trim(),

          unit:
            ingredient.unit.trim(),
        })),

    instructions:
      form.instructions
        .filter(
          (instruction) =>
            instruction.description.trim()
        )
        .map(
          (instruction, index) => ({
            step: index + 1,

            description:
              instruction.description.trim(),
          })
        ),

    nutrition:
      hasNutrition
        ? {
            calories:
              optionalNumber(
                form.nutrition.calories
              ),

            protein:
              optionalNumber(
                form.nutrition.protein
              ),

            carbohydrates:
              optionalNumber(
                form.nutrition
                  .carbohydrates
              ),

            fat:
              optionalNumber(
                form.nutrition.fat
              ),
          }
        : undefined,

    tips:
      form.tips.trim() ||
      undefined,

    notes:
      form.notes.trim() ||
      undefined,

    status,
  };
};