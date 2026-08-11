import { MoreHorizontal, Pencil, Eye } from "lucide-react";
import { motion } from "framer-motion";

export interface DashboardRecipe {
  id: string;
  title: string;
  category: string;
  time: string;
  difficulty: string;
  rating: number;
  saves: number;
  image: string;
  status: "Published" | "Draft";
}

interface DashboardRecipeRowProps {
  recipe: DashboardRecipe;
  onEdit?: (id: string) => void;
  onPreview?: (id: string) => void;
}

export default function DashboardRecipeRow({
  recipe,
  onEdit,
  onPreview,
}: DashboardRecipeRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ backgroundColor: "#FCFAF7" }}
      className="
        group
        flex
        items-center
        gap-4
        border-b border-[#EEE9E2]
        px-5
        py-4
        last:border-b-0
      "
    >
      {/* Image */}
      <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-[#F2ECE5]">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* Recipe details */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-[#1F2D27]">
          {recipe.title}
        </h3>

        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#8A918C]">
          <span>{recipe.category}</span>

          <span>•</span>

          <span>{recipe.time}</span>

          <span>•</span>

          <span>{recipe.difficulty}</span>
        </div>
      </div>

      {/* Rating */}
      <div className="hidden text-center sm:block">
        <p className="text-sm font-semibold text-[#1F2D27]">
          ★ {recipe.rating}
        </p>

        <p className="text-[11px] text-[#8A918C]">
          {recipe.saves} saves
        </p>
      </div>

      {/* Status */}
      <div className="hidden md:block">
        <span
          className={`
            inline-flex rounded-full px-3 py-1 text-[11px] font-semibold
            ${
              recipe.status === "Published"
                ? "bg-[#EAF6EF] text-[#318153]"
                : "bg-[#FFF3D9] text-[#9A6B13]"
            }
          `}
        >
          {recipe.status}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPreview?.(recipe.id)}
          className="hidden rounded-lg p-2 text-[#8A918C] transition hover:bg-[#F2ECE5] hover:text-[#1F2D27] sm:block"
          aria-label={`Preview ${recipe.title}`}
        >
          <Eye size={17} />
        </button>

        <button
          type="button"
          onClick={() => onEdit?.(recipe.id)}
          className="rounded-lg p-2 text-[#8A918C] transition hover:bg-[#F2ECE5] hover:text-[#C8501A]"
          aria-label={`Edit ${recipe.title}`}
        >
          <Pencil size={17} />
        </button>

        <button
          type="button"
          className="rounded-lg p-2 text-[#8A918C] transition hover:bg-[#F2ECE5] hover:text-[#1F2D27]"
          aria-label="More options"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>
    </motion.div>
  );
}