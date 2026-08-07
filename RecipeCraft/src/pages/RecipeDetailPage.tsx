import { motion } from "framer-motion";

import { recipeDetails } from "../utils/recipeDetails";
import IngredientsSection from "../components/recipe-details/IngredientsSection";
import InstructionsSection from "../components/recipe-details/InstructionsSection";
import RecipeHero from "../components/recipe-details/RecipeHero";
import RecipeMeta from "../components/recipe-details/RecipeMeta";
import JumpToRecipe from "../components/recipe-details/JumpToRecipe";
import RecipeIntro from "../components/recipe-details/RecipeIntro";

export default function RecipeDetailsPage() {
  const recipe = recipeDetails;

  return (
    <div className="min-h-screen bg-[#FFFCF8] text-[#1F2D27]">

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">

        {/* Hero */}

        <RecipeHero recipe={recipe} />

        {/* Meta */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.3,
          }}
          className="mt-6"
        >
          <RecipeMeta
            prepTime={recipe.prepTime}
            cookTime={recipe.cookTime}
            totalTime={recipe.totalTime}
            servings={recipe.servings}
            difficulty={recipe.difficulty}
            calories={recipe.calories}
          />
        </motion.div>

        {/* Jump */}

        <div className="flex justify-center py-10 sm:py-12">
          <JumpToRecipe />
        </div>

        {/* Intro */}

        <RecipeIntro
          title={recipe.title}
          description={recipe.description}
        />

        {/* ===================================================
            PHASE 2 PLACEHOLDER

            Ingredients + Instructions will be added here.
        ==================================================== */}

        <section
  id="recipe-cooking-section"
  className="
    mt-16
    scroll-mt-24
    sm:mt-20
  "
>
  <div className="mb-10 text-center">
    <span
      className="
        text-xs
        font-bold
        uppercase
        tracking-[0.2em]
        text-[#C8501A]
      "
    >
      The recipe
    </span>

    <h2
      className="
        mt-3
        font-serif
        text-3xl
        font-bold
        text-[#1F2D27]
        sm:text-4xl
      "
    >
      Let's get cooking
    </h2>

    <p
      className="
        mx-auto
        mt-3
        max-w-2xl
        text-sm
        leading-6
        text-gray-500
        sm:text-base
      "
    >
      Prepare your ingredients, follow each step,
      and enjoy creating something delicious.
    </p>
  </div>

  <div
    className="
      grid
      items-start
      gap-8
      lg:grid-cols-[380px_minmax(0,1fr)]
      lg:gap-10
      xl:grid-cols-[400px_minmax(0,1fr)]
    "
  >
    <IngredientsSection
      groups={recipe.ingredientGroups}
      baseServings={recipe.servings}
    />

    <InstructionsSection
      instructions={recipe.instructions}
    />
  </div>
</section>

      </main>
    </div>
  );
}