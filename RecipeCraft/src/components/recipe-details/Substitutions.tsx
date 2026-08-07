import { ArrowRightLeft } from "lucide-react";
import { motion } from "framer-motion";

import type { Substitution } from "../../utils/recipeDetails";

interface SubstitutionsProps {
  substitutions: Substitution[];
}

export default function Substitutions({
  substitutions,
}: SubstitutionsProps) {
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
        border-[#E7E0D8]
        bg-white
        p-6
        sm:p-8
      "
    >
      {/* Header */}

      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-[#EEF3EF]
            text-[#2D4A3E]
          "
        >
          <ArrowRightLeft size={19} />
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C8501A]">
            Flexible cooking
          </span>

          <h2 className="font-serif text-2xl font-bold text-[#1F2D27]">
            Substitutions
          </h2>
        </div>
      </div>

      {/* List */}

      <div className="mt-6 space-y-3">
        {substitutions.map(
          (substitution, index) => (
            <motion.div
              key={substitution.id}
              initial={{
                opacity: 0,
                x: 10,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.05,
              }}
              className="
                rounded-2xl
                bg-[#FAF8F4]
                p-4
              "
            >
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="font-semibold text-gray-500">
                  {substitution.original}
                </span>

                <ArrowRightLeft
                  size={14}
                  className="text-[#C8501A]"
                />

                <span className="font-bold text-[#2D4A3E]">
                  {substitution.replacement}
                </span>
              </div>

              {substitution.note && (
                <p className="mt-1.5 text-xs leading-5 text-gray-500">
                  {substitution.note}
                </p>
              )}
            </motion.div>
          )
        )}
      </div>
    </motion.section>
  );
}