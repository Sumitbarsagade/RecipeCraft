import { ArrowLeft, ChefHat } from "lucide-react";
import { useNavigate } from "react-router-dom";

import RecipeForm from "../../components/dashboard/recipe-form/RecipeForm";

export default function CreateRecipePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF8F4] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">

          <button
            onClick={() => navigate("/dashboard/recipes")}
            className="mb-5 flex items-center gap-2 text-sm font-semibold text-[#69736D] transition hover:text-[#C8501A]"
          >
            <ArrowLeft size={17} />
            Back to Recipes
          </button>

          <div className="flex items-start gap-4">

            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#C8501A] text-white sm:flex">
              <ChefHat size={23} />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#C8501A]">
                Recipe Studio
              </p>

              <h1 className="font-serif text-3xl font-bold text-[#1F2D27] sm:text-4xl">
                Create a New Recipe
              </h1>

              <p className="mt-2 text-sm text-[#737D77] sm:text-base">
                Share your favorite recipe with the RecipeCraft community.
              </p>
            </div>

          </div>

        </div>

        <RecipeForm />

      </div>

    </div>
  );
}