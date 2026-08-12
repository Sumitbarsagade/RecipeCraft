import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import RecipeForm from "../../components/dashboard/recipe-form/RecipeForm";

import { dashboardRecipes } from "../../utils/dashboardRecipes";

export default function EditRecipePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const recipe = dashboardRecipes.find(
    (item) => item.id === id
  );

  if (!recipe) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F4]">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold text-[#1F2D27]">
            Recipe not found
          </h1>

          <button
            onClick={() =>
              navigate("/dashboard/recipes")
            }
            className="mt-4 text-sm font-semibold text-[#C8501A]"
          >
            Back to Recipes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

      <div className="mx-auto max-w-5xl">

        <button
          onClick={() =>
            navigate("/dashboard/recipes")
          }
          className="mb-5 flex items-center gap-2 text-sm font-semibold text-[#69736D] hover:text-[#C8501A]"
        >
          <ArrowLeft size={17} />
          Back to Recipes
        </button>

        <div className="mb-8">
          <p className="text-sm font-semibold text-[#C8501A]">
            Recipe Studio
          </p>

          <h1 className="font-serif text-3xl font-bold text-[#1F2D27] sm:text-4xl">
            Edit Recipe
          </h1>

          <p className="mt-2 text-sm text-[#737D77]">
            Update your recipe and keep it fresh.
          </p>
        </div>

        <RecipeForm
          isEditing
          initialData={{
            title: recipe.title,
            description: recipe.description,
            image: recipe.image,
            category: recipe.category,
            prepTime: recipe.cookTime,
            cookTime: recipe.cookTime,
            difficulty: recipe.difficulty,
            status: recipe.status,
          }}
        />

      </div>

    </div>
  );
}