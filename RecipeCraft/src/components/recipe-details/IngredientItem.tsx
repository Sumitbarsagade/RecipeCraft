import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface IngredientItemProps {
  name: string;
  quantity: number;
  unit: string;
  checked: boolean;
  onToggle: () => void;
}

function formatQuantity(quantity: number) {
  if (Number.isInteger(quantity)) {
    return quantity.toString();
  }

  return Number(quantity.toFixed(2)).toString();
}

export default function IngredientItem({
  name,
  quantity,
  unit,
  checked,
  onToggle,
}: IngredientItemProps) {
  return (
    <motion.button
      type="button"
      layout
      onClick={onToggle}
      whileTap={{ scale: 0.99 }}
      className="
        group
        flex
        w-full
        items-center
        gap-3
        border-b
        border-[#EEE8E1]
        py-3.5
        text-left
      "
    >
      {/* Checkbox */}

      <motion.span
        animate={{
          backgroundColor: checked
            ? "#C8501A"
            : "#FFFFFF",

          borderColor: checked
            ? "#C8501A"
            : "#D8D0C7",
        }}
        className="
          flex
          h-5
          w-5
          shrink-0
          items-center
          justify-center
          rounded-md
          border-2
        "
      >
        {checked && (
          <Check
            size={13}
            strokeWidth={3}
            className="text-white"
          />
        )}
      </motion.span>

      {/* Quantity */}

      <span
        className={`
          min-w-[80px]
          text-sm
          font-semibold
          transition-all
          ${
            checked
              ? "text-gray-400 line-through"
              : "text-[#2D4A3E]"
          }
        `}
      >
        {formatQuantity(quantity)} {unit}
      </span>

      {/* Name */}

      <span
        className={`
          text-sm
          transition-all
          ${
            checked
              ? "text-gray-400 line-through"
              : "text-gray-600"
          }
        `}
      >
        {name}
      </span>
    </motion.button>
  );
}