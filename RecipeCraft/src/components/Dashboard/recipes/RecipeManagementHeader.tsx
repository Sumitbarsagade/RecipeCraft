import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RecipeManagementHeader() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <p className="mb-1 text-sm font-medium text-[#C8501A]">
          Recipe Management
        </p>

        <h1 className="font-serif text-3xl font-bold text-[#1F2D27] sm:text-4xl">
          My Recipes
        </h1>

        <p className="mt-2 max-w-xl text-sm text-[#6B756F] sm:text-base">
          Create, manage and organize all your recipes from one place.
        </p>
      </div>

      <button
        onClick={() => navigate("/dashboard/recipes/new")}
        className="flex items-center justify-center gap-2 rounded-xl bg-[#C8501A] px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-[#A94314] hover:shadow-md"
      >
        <Plus size={19} />
        Add New Recipe
      </button>
    </motion.div>
  );
}