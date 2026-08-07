import { Minus, Plus, Users } from "lucide-react";
import { motion } from "framer-motion";

interface ServingAdjusterProps {
  servings: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export default function ServingAdjuster({
  servings,
  onDecrease,
  onIncrease,
}: ServingAdjusterProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Users
          size={18}
          className="text-[#C8501A]"
        />

        <div>
          <p className="text-sm font-bold text-[#1F2D27]">
            Servings
          </p>

          <p className="text-xs text-gray-400">
            Adjust ingredients
          </p>
        </div>
      </div>

      <div
        className="
          flex
          items-center
          rounded-full
          border
          border-[#E4DDD5]
          bg-[#FAF8F4]
          p-1
        "
      >
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={onDecrease}
          disabled={servings <= 1}
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            text-[#2D4A3E]
            transition
            hover:bg-white
            disabled:cursor-not-allowed
            disabled:opacity-30
          "
          aria-label="Decrease servings"
        >
          <Minus size={15} />
        </motion.button>

        <span className="min-w-[38px] text-center text-sm font-bold text-[#1F2D27]">
          {servings}
        </span>

        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={onIncrease}
          disabled={servings >= 20}
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            text-[#2D4A3E]
            transition
            hover:bg-white
            disabled:cursor-not-allowed
            disabled:opacity-30
          "
          aria-label="Increase servings"
        >
          <Plus size={15} />
        </motion.button>
      </div>
    </div>
  );
}