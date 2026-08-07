import {
  Clock3,
  ChefHat,
  Flame,
  Gauge,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

interface RecipeMetaProps {
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  calories?: number;
}

const difficultyStyles = {
  Easy: "text-emerald-700 bg-emerald-50",
  Medium: "text-amber-700 bg-amber-50",
  Hard: "text-red-700 bg-red-50",
};

export default function RecipeMeta({
  prepTime,
  cookTime,
  totalTime,
  servings,
  difficulty,
  calories,
}: RecipeMetaProps) {
  const items = [
    {
      icon: Clock3,
      label: "Prep Time",
      value: prepTime,
    },
    {
      icon: ChefHat,
      label: "Cook Time",
      value: cookTime,
    },
    {
      icon: Clock3,
      label: "Total Time",
      value: totalTime,
    },
    {
      icon: Users,
      label: "Servings",
      value: `${servings}`,
    },
    {
      icon: Gauge,
      label: "Difficulty",
      value: difficulty,
      special: true,
    },
    ...(calories
      ? [
          {
            icon: Flame,
            label: "Calories",
            value: `${calories} kcal`,
          },
        ]
      : []),
  ];

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.06,
          },
        },
      }}
      className="
        grid
        grid-cols-2
        overflow-hidden
        rounded-3xl
        border
        border-[#E9E4DE]
        bg-white
        sm:grid-cols-3
        lg:grid-cols-6
      "
    >
      {items.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.label}
            variants={{
              hidden: {
                opacity: 0,
                y: 10,
              },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            className={`
              flex
              min-h-[105px]
              flex-col
              items-center
              justify-center
              gap-2
              border-gray-100
              p-4
              text-center
              ${
                index !== items.length - 1
                  ? "border-b sm:border-r lg:border-b-0"
                  : ""
              }
            `}
          >
            <Icon
              size={20}
              strokeWidth={1.8}
              className="text-[#C8501A]"
            />

            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              {item.label}
            </span>

            {item.special ? (
              <span
                className={`
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-bold
                  ${difficultyStyles[difficulty]}
                `}
              >
                {item.value}
              </span>
            ) : (
              <span className="text-sm font-bold text-[#1F2D27]">
                {item.value}
              </span>
            )}
          </motion.div>
        );
      })}
    </motion.section>
  );
}