import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Clock3,
  Star,
  Bookmark,
  ArrowUpRight,
  ChefHat,
} from "lucide-react";

import type { Recipe } from "../../utils/recipes";

interface RecipeCardProps extends Recipe {}

const difficultyStyles = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Medium: "bg-amber-50 text-amber-700 border-amber-100",
  Hard: "bg-red-50 text-red-700 border-red-100",
};

const formatSaves = (count: number) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}k`;
  }

  return count.toString();
};

export default function RecipeCard({
  id,
  title,
  image,
  chef,
  chefAvatar,
  category,
  difficulty,
  rating,
  reviewCount = 0,
  time,
  saves,
  description,
}: RecipeCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  const difficultyClass =
    difficultyStyles[difficulty] ??
    "bg-gray-50 text-gray-700 border-gray-100";

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-gray-100
        bg-white
        shadow-[0_4px_20px_rgba(0,0,0,0.05)]
        transition-shadow
        duration-300
        hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)]
      "
    >
      {/* =========================================================
          IMAGE
      ========================================================== */}

      <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F1EC]">

        {!imageError ? (
          <motion.img
            src={image}
            alt={title}
            onError={() => setImageError(true)}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-110
            "
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#FFF3E9] to-[#E8F0EB]">
            <ChefHat
              size={52}
              strokeWidth={1.4}
              className="text-[#C8501A]/50"
            />
          </div>
        )}

        {/* Image gradient */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/40
            via-transparent
            to-black/10
            opacity-60
          "
        />

        {/* =====================================================
            CATEGORY
        ====================================================== */}

        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="
            absolute
            left-4
            top-4
            rounded-full
            bg-white/95
            px-3.5
            py-1.5
            text-xs
            font-semibold
            text-[#2D4A3E]
            shadow-sm
            backdrop-blur-sm
          "
        >
          {category}
        </motion.span>

        {/* =====================================================
            FAVORITE
        ====================================================== */}

        <motion.button
          type="button"
          aria-label={
            isFavorite
              ? `Remove ${title} from favorites`
              : `Add ${title} to favorites`
          }
          aria-pressed={isFavorite}
          onClick={() => setIsFavorite((prev) => !prev)}
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.88,
          }}
          className="
            absolute
            right-4
            top-4
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white/95
            text-gray-700
            shadow-md
            backdrop-blur-sm
            transition-colors
            hover:text-[#C8501A]
          "
        >
          <motion.div
            animate={
              isFavorite
                ? {
                    scale: [1, 1.3, 1],
                  }
                : {
                    scale: 1,
                  }
            }
            transition={{
              duration: 0.3,
            }}
          >
            <Heart
              size={19}
              strokeWidth={1.8}
              className={
                isFavorite
                  ? "fill-[#C8501A] text-[#C8501A]"
                  : ""
              }
            />
          </motion.div>
        </motion.button>

        {/* =====================================================
            DIFFICULTY
        ====================================================== */}

        <span
          className={`
            absolute
            bottom-4
            left-4
            rounded-full
            border
            px-3
            py-1
            text-xs
            font-semibold
            backdrop-blur-sm
            ${difficultyClass}
          `}
        >
          {difficulty}
        </span>
      </div>

      {/* =========================================================
          CONTENT
      ========================================================== */}

      <div className="p-5">

        {/* Rating + Time */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-1.5">

            <Star
              size={16}
              className="fill-[#D4A843] text-[#D4A843]"
            />

            <span className="text-sm font-semibold text-gray-800">
              {rating.toFixed(1)}
            </span>

            {reviewCount > 0 && (
              <span className="text-sm text-gray-400">
                ({reviewCount})
              </span>
            )}

          </div>

          <div className="flex items-center gap-1.5 text-sm text-gray-500">

            <Clock3 size={15} />

            <span>{time}</span>

          </div>

        </div>

        {/* Title */}

        <h3
          className="
            mt-3
            line-clamp-1
            font-serif
            text-[22px]
            font-bold
            leading-tight
            text-[#1F2D27]
            transition-colors
            duration-200
            group-hover:text-[#C8501A]
          "
        >
          {title}
        </h3>

        {/* Description */}

        {description && (
          <p
            className="
              mt-2
              line-clamp-2
              text-sm
              leading-6
              text-gray-500
            "
          >
            {description}
          </p>
        )}

        {/* =====================================================
            CHEF
        ====================================================== */}

        <div className="mt-5 flex items-center justify-between">

          <div className="flex min-w-0 items-center gap-3">

            {chefAvatar ? (
              <img
                src={chefAvatar}
                alt={chef}
                className="
                  h-9
                  w-9
                  shrink-0
                  rounded-full
                  object-cover
                  ring-2
                  ring-[#F5F1EC]
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#E7EFEA]
                  text-xs
                  font-bold
                  text-[#2D4A3E]
                "
              >
                {chef
                  .split(" ")
                  .map((name) => name[0])
                  .slice(0, 2)
                  .join("")}
              </div>
            )}

            <div className="min-w-0">

              <p className="text-[11px] uppercase tracking-wider text-gray-400">
                Recipe by
              </p>

              <p className="truncate text-sm font-semibold text-gray-700">
                {chef}
              </p>

            </div>

          </div>

          {/* Saves */}

          <div className="flex shrink-0 items-center gap-1.5 text-sm text-gray-400">

            <Bookmark size={15} />

            <span>
              {formatSaves(saves)}
            </span>

          </div>

        </div>

        {/* =====================================================
            CTA
        ====================================================== */}

        <motion.button
          type="button"
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={() => {
            window.location.href = `/recipes/${id}`;
          }}
          className="
            mt-5
            flex
            w-full
            items-center
            justify-between
            rounded-xl
            bg-[#2D4A3E]
            px-4
            py-3
            text-sm
            font-semibold
            text-white
            transition-colors
            duration-300
            hover:bg-[#233B32]
          "
        >
          <span>View Recipe</span>

          <motion.span
            className="flex"
            whileHover={{
              x: 3,
              y: -3,
            }}
          >
            <ArrowUpRight size={18} />
          </motion.span>
        </motion.button>

      </div>
    </motion.article>
  );
}