import { Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

import type { ChefTip } from "../../utils/recipeDetails";

interface ChefTipsProps {
  tips: ChefTip[];
}

export default function ChefTips({
  tips,
}: ChefTipsProps) {
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
        overflow-hidden
        rounded-[28px]
        border
        border-[#E7D8C8]
        bg-[#FFF8EF]
      "
    >
      {/* Header */}

      <div className="flex items-center gap-3 border-b border-[#EADCCA] px-6 py-5 sm:px-8">
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-[#FFE9D5]
            text-[#C8501A]
          "
        >
          <Lightbulb size={20} />
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C8501A]">
            Pro tips
          </span>

          <h2 className="font-serif text-2xl font-bold text-[#1F2D27]">
            Chef's Tips
          </h2>
        </div>
      </div>

      {/* Tips */}

      <div className="divide-y divide-[#EADCCA]">
        {tips.map((tip, index) => (
          <motion.div
            key={tip.id}
            initial={{
              opacity: 0,
              x: -10,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: index * 0.06,
            }}
            className="flex gap-4 px-6 py-5 sm:px-8"
          >
            <span
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-white
                text-xs
                font-bold
                text-[#C8501A]
                shadow-sm
              "
            >
              {index + 1}
            </span>

            <div>
              <h3 className="font-semibold text-[#2D4A3E]">
                {tip.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-gray-600">
                {tip.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}