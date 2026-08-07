import { Apple, Info } from "lucide-react";
import { motion } from "framer-motion";

import type { NutritionItem } from "../../utils/recipeDetails";

interface NutritionCardProps {
  nutrition: NutritionItem[];
}

export default function NutritionCard({
  nutrition,
}: NutritionCardProps) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        rounded-[28px]
        border
        border-[#DCE6DF]
        bg-[#F3F8F4]
        p-6
        sm:p-8
      "
    >
      {/* Header */}

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-white
              text-[#2D4A3E]
            "
          >
            <Apple size={19} />
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C8501A]">
              Per serving
            </span>

            <h2 className="font-serif text-2xl font-bold text-[#1F2D27]">
              Nutrition
            </h2>
          </div>
        </div>

        <div
          className="
            flex
            items-center
            gap-1.5
            text-xs
            text-gray-400
          "
        >
          <Info size={14} />

          Estimated values
        </div>
      </div>

      {/* Nutrition grid */}

      <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {nutrition.map(
          (item, index) => (
            <motion.div
              key={item.label}
              initial={{
                opacity: 0,
                y: 10,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.05,
              }}
              className="
                rounded-2xl
                bg-white
                p-4
                text-center
              "
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {item.label}
              </p>

              <p className="mt-2 text-xl font-bold text-[#2D4A3E]">
                {item.value}
                {item.unit && (
                  <span className="ml-1 text-xs font-medium text-gray-400">
                    {item.unit}
                  </span>
                )}
              </p>
            </motion.div>
          )
        )}
      </div>
    </motion.section>
  );
}