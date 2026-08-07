import {
  ChefHat,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";

import type { Equipment } from "../../utils/recipeDetails";

interface EquipmentListProps {
  equipment: Equipment[];
}

export default function EquipmentList({
  equipment,
}: EquipmentListProps) {
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
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-[#FFF0E7]
            text-[#C8501A]
          "
        >
          <ChefHat size={19} />
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C8501A]">
            Kitchen essentials
          </span>

          <h2 className="font-serif text-2xl font-bold text-[#1F2D27]">
            Equipment
          </h2>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {equipment.map(
          (item, index) => (
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                scale: 0.97,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.05,
              }}
              className="
                flex
                gap-3
                rounded-2xl
                bg-[#FAF8F4]
                p-4
              "
            >
              <span
                className="
                  flex
                  h-6
                  w-6
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#E8F1EB]
                  text-[#2D4A3E]
                "
              >
                <Check size={13} strokeWidth={3} />
              </span>

              <div>
                <h3 className="text-sm font-bold text-[#2D4A3E]">
                  {item.name}
                </h3>

                {item.description && (
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          )
        )}
      </div>
    </motion.section>
  );
}