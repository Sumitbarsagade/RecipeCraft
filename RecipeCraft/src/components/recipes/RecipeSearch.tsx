import { Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface RecipeSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RecipeSearch({
  value,
  onChange,
}: RecipeSearchProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mx-auto max-w-4xl"
    >
      <Search
        className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"
        size={22}
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search recipes, ingredients or chefs..."
        className="w-full rounded-full border border-gray-200 bg-white py-5 pl-16 pr-40 text-lg shadow-xl outline-none transition-all duration-300 focus:border-[#C8501A] focus:ring-4 focus:ring-orange-100"
      />

      <button
        className="absolute right-2 top-2 rounded-full bg-[#C8501A] px-6 py-3 text-white transition hover:bg-[#a63f13]"
      >
        Search
      </button>

      <div className="absolute -bottom-8 left-4 flex items-center gap-2 text-sm text-gray-500">
        <Sparkles size={16} />
        AI understands ingredients too
      </div>
    </motion.div>
  );
}