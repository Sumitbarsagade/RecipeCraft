import { motion } from "framer-motion";

interface FilterChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function FilterChip({
  label,
  active,
  onClick,
}: FilterChipProps) {
  return (
    <motion.button
      whileHover={{
        y: -2,
        scale: 1.04,
      }}
      whileTap={{
        scale: 0.95,
      }}
      onClick={onClick}
      className={`rounded-full px-5 py-2  w-fit text-sm font-medium transition-all duration-300

      ${
        active
          ? "bg-[#C8501A] text-white shadow-lg"
          : "bg-white text-gray-700 border border-gray-200 hover:border-[#C8501A] hover:text-[#C8501A]"
      }`}
    >
      {label}
    </motion.button>
  );
}