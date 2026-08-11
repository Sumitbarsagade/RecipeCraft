import { motion } from "framer-motion";
import {
  Clock3,
  Eye,
  MoreVertical,
  Pencil,
  Trash2,
  ExternalLink,
} from "lucide-react";

import type { DashboardRecipe } from "../../../utils/dashboardRecipes";

interface Props {
  recipe: DashboardRecipe;
  onEdit: (recipe: DashboardRecipe) => void;
  onDelete: (recipe: DashboardRecipe) => void;
  onPreview: (recipe: DashboardRecipe) => void;
}

export default function DashboardRecipeCard({
  recipe,
  onEdit,
  onDelete,
  onPreview,
}: Props) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group overflow-hidden rounded-2xl border border-[#E8E1D8] bg-white shadow-sm transition hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#37433D] backdrop-blur">
            {recipe.category}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold backdrop-blur ${
              recipe.status === "published"
                ? "bg-[#DCF5E6]/95 text-[#277044]"
                : "bg-[#FFF1D8]/95 text-[#9A6614]"
            }`}
          >
            {recipe.status === "published"
              ? "Published"
              : "Draft"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">

        <h3 className="line-clamp-1 font-serif text-xl font-bold text-[#1F2D27]">
          {recipe.title}
        </h3>

        <p className="mt-1 line-clamp-2 text-sm leading-5 text-[#707A74]">
          {recipe.description}
        </p>

        <div className="mt-4 flex items-center gap-4 text-xs text-[#77817B]">
          <span className="flex items-center gap-1.5">
            <Clock3 size={14} />
            {recipe.cookTime}
          </span>

          <span className="flex items-center gap-1.5">
            <Eye size={14} />
            {recipe.views.toLocaleString()}
          </span>
        </div>

        <div className="my-4 h-px bg-[#EEE8E0]" />

        <div className="flex items-center justify-between">

          <button
            onClick={() => onPreview(recipe)}
            className="flex items-center gap-1.5 text-sm font-semibold text-[#52605A] transition hover:text-[#C8501A]"
          >
            <ExternalLink size={15} />
            Preview
          </button>

          <div className="flex items-center gap-1">

            <button
              onClick={() => onEdit(recipe)}
              className="rounded-lg p-2 text-[#66716B] transition hover:bg-[#F4F1EC] hover:text-[#C8501A]"
              aria-label="Edit recipe"
            >
              <Pencil size={17} />
            </button>

            <button
              onClick={() => onDelete(recipe)}
              className="rounded-lg p-2 text-[#66716B] transition hover:bg-red-50 hover:text-red-600"
              aria-label="Delete recipe"
            >
              <Trash2 size={17} />
            </button>

            <button
              className="rounded-lg p-2 text-[#66716B] transition hover:bg-[#F4F1EC]"
              aria-label="More options"
            >
              <MoreVertical size={17} />
            </button>

          </div>
        </div>

      </div>
    </motion.article>
  );
}