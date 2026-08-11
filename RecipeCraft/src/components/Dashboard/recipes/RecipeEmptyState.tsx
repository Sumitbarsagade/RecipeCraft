import { motion } from "framer-motion";
import { ChefHat, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  search: string;
  filter: string;
}

export default function RecipeEmptyState({
  search,
  filter,
}: Props) {
  const navigate = useNavigate();

  const filtered =
    search.length > 0 || filter !== "all";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#DCD4CA] bg-white px-6 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FCE8DD] text-[#C8501A]">
        <ChefHat size={29} />
      </div>

      <h2 className="mt-5 font-serif text-2xl font-bold text-[#1F2D27]">
        {filtered
          ? "No recipes found"
          : "Your recipe collection is empty"}
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-[#737D77]">
        {filtered
          ? "Try changing your search or filters to find what you're looking for."
          : "Start sharing your favorite recipes with the RecipeCraft community."}
      </p>

      {!filtered && (
        <button
          onClick={() => navigate("/dashboard/recipes/new")}
          className="mt-6 flex items-center gap-2 rounded-xl bg-[#C8501A] px-5 py-3 text-sm font-semibold text-white hover:bg-[#A94314]"
        >
          <Plus size={17} />
          Create Your First Recipe
        </button>
      )}
    </motion.div>
  );
}