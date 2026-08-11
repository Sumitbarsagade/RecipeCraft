import { motion } from "framer-motion";
import {
  Clock3,
  Eye,
  ExternalLink,
  Pencil,
  Trash2,
} from "lucide-react";

import type { DashboardRecipe } from "../../../utils/dashboardRecipes";

interface Props {
  recipe: DashboardRecipe;
  onEdit: (recipe: DashboardRecipe) => void;
  onDelete: (recipe: DashboardRecipe) => void;
  onPreview: (recipe: DashboardRecipe) => void;
}

export default function DashboardRecipeListItem({
  recipe,
  onEdit,
  onDelete,
  onPreview,
}: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-4 rounded-2xl border border-[#E8E1D8] bg-white p-4 shadow-sm sm:flex-row"
    >
      <img
        src={recipe.image}
        alt={recipe.title}
        className="h-32 w-full rounded-xl object-cover sm:h-28 sm:w-44"
      />

      <div className="min-w-0 flex-1">

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#C8501A]">
            {recipe.category}
          </span>

          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
              recipe.status === "published"
                ? "bg-[#DCF5E6] text-[#277044]"
                : "bg-[#FFF1D8] text-[#9A6614]"
            }`}
          >
            {recipe.status}
          </span>
        </div>

        <h3 className="mt-1 font-serif text-xl font-bold text-[#1F2D27]">
          {recipe.title}
        </h3>

        <p className="mt-1 line-clamp-1 text-sm text-[#747D78]">
          {recipe.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-4 text-xs text-[#78817B]">
          <span className="flex items-center gap-1">
            <Clock3 size={14} />
            {recipe.cookTime}
          </span>

          <span className="flex items-center gap-1">
            <Eye size={14} />
            {recipe.views.toLocaleString()} views
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:self-center">
        <button
          onClick={() => onPreview(recipe)}
          className="rounded-lg p-2 text-[#68736D] hover:bg-[#F5F2ED]"
          title="Preview"
        >
          <ExternalLink size={17} />
        </button>

        <button
          onClick={() => onEdit(recipe)}
          className="rounded-lg p-2 text-[#68736D] hover:bg-[#FCE8DD] hover:text-[#C8501A]"
          title="Edit"
        >
          <Pencil size={17} />
        </button>

        <button
          onClick={() => onDelete(recipe)}
          className="rounded-lg p-2 text-[#68736D] hover:bg-red-50 hover:text-red-600"
          title="Delete"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </motion.div>
  );
}