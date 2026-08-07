import { motion } from "framer-motion";
import {
  ChevronRight,
  Star,
} from "lucide-react";

import type { RecipeDetail } from "../../utils/recipeDetails";

import RecipeActions from "./RecipeActions";

interface RecipeHeroProps {
  recipe: RecipeDetail;
}

export default function RecipeHero({
  recipe,
}: RecipeHeroProps) {
  return (
    <section className="pt-6 sm:pt-8">
      {/* Breadcrumb */}

      <motion.nav
        initial={{
          opacity: 0,
          y: -10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          mb-6
          flex
          items-center
          gap-1.5
          overflow-hidden
          whitespace-nowrap
          text-sm
          text-gray-400
        "
        aria-label="Breadcrumb"
      >
        <span className="hover:text-[#C8501A]">
          Home
        </span>

        <ChevronRight size={15} />

        <span className="hover:text-[#C8501A]">
          Recipes
        </span>

        <ChevronRight size={15} />

        <span className="hover:text-[#C8501A]">
          {recipe.cuisine}
        </span>

        <ChevronRight size={15} />

        <span className="font-medium text-[#2D4A3E]">
          {recipe.title}
        </span>
      </motion.nav>

      {/* Hero */}

      <div
        className="
          grid
          overflow-hidden
          rounded-[32px]
          border
          border-[#E9E4DE]
          bg-[#FAF8F4]
          lg:grid-cols-[1.08fr_0.92fr]
        "
      >
        {/* Image */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="
            group
            relative
            min-h-[300px]
            overflow-hidden
            sm:min-h-[430px]
            lg:min-h-[560px]
          "
        >
          <motion.img
            initial={{
              scale: 1.05,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.04,
            }}
            src={recipe.image}
            alt={recipe.title}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
            "
          />

          {/* Gradient */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/35
              via-transparent
              to-black/5
            "
          />

          {/* Category */}

          <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
            <span
              className="
                rounded-full
                bg-white/95
                px-4
                py-2
                text-xs
                font-bold
                text-[#2D4A3E]
                shadow-lg
                backdrop-blur-sm
              "
            >
              {recipe.category}
            </span>
          </div>
        </motion.div>

        {/* Information */}

        <motion.div
          initial={{
            opacity: 0,
            x: 30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.15,
          }}
          className="
            flex
            flex-col
            justify-center
            p-6
            sm:p-10
            lg:p-12
            xl:p-14
          "
        >
          {/* Cuisine */}

          <span
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.2em]
              text-[#C8501A]
            "
          >
            {recipe.cuisine} Cuisine
          </span>

          {/* Title */}

          <h1
            className="
              mt-4
              max-w-xl
              font-serif
              text-4xl
              font-bold
              leading-[1.05]
              tracking-tight
              text-[#1F2D27]
              sm:text-5xl
              xl:text-6xl
            "
          >
            {recipe.title}
          </h1>

          {/* Rating */}

          <button
            type="button"
            onClick={() => {
              document
                .getElementById("reviews")
                ?.scrollIntoView({
                  behavior: "smooth",
                });
            }}
            className="
              mt-6
              flex
              w-fit
              items-center
              gap-2
              rounded-full
              py-1
              text-sm
              transition-colors
              hover:text-[#C8501A]
            "
          >
            <span className="flex items-center gap-1">
              <Star
                size={18}
                className="fill-[#D4A843] text-[#D4A843]"
              />

              <span className="font-bold text-[#1F2D27]">
                {recipe.rating.toFixed(1)}
              </span>
            </span>

            <span className="text-gray-500">
              · {recipe.reviewCount} reviews
            </span>
          </button>

          {/* Description */}

          <p
            className="
              mt-5
              max-w-xl
              text-base
              leading-7
              text-gray-600
              sm:text-lg
              sm:leading-8
            "
          >
            {recipe.description}
          </p>

          {/* Chef */}

          <div className="mt-7 flex items-center gap-3">
            {recipe.chef.avatar ? (
              <img
                src={recipe.chef.avatar}
                alt={recipe.chef.name}
                className="
                  h-11
                  w-11
                  rounded-full
                  object-cover
                  ring-2
                  ring-white
                  shadow-sm
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-[#E7EFEA]
                  font-bold
                  text-[#2D4A3E]
                "
              >
                {recipe.chef.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)}
              </div>
            )}

            <div>
              <p className="text-[11px] uppercase tracking-wider text-gray-400">
                Recipe by
              </p>

              <p className="text-sm font-bold text-[#1F2D27]">
                {recipe.chef.name}
              </p>

              {recipe.chef.role && (
                <p className="text-xs text-gray-500">
                  {recipe.chef.role}
                </p>
              )}
            </div>
          </div>

          {/* Divider */}

          <div className="my-7 h-px bg-[#E5DED6]" />

          {/* Actions */}

          <RecipeActions recipeTitle={recipe.title} />

          {/* Tags */}

          <div className="mt-6 flex flex-wrap gap-2">
            {recipe.tags.map((tag:any) => (
              <span
                key={tag}
                className="
                  rounded-full
                  bg-white
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  text-gray-500
                  ring-1
                  ring-[#E7E0D8]
                "
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}